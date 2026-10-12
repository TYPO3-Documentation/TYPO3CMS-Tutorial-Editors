<?php

declare(strict_types=1);

/*
 * Prepares the demo site of the Camino theme for the screenshots. The pages
 * and content elements come from the theme. This file changes or adds only
 * what a screenshot needs on top, and finds the records by their title, as
 * the uids can differ between TYPO3 versions.
 *
 * Runs after "typo3 setup" and "typo3 extension:setup".
 */

use TYPO3\CMS\Core\Authentication\CommandLineUserAuthentication;
use TYPO3\CMS\Core\Cache\CacheManager;
use TYPO3\CMS\Core\Configuration\SiteWriter;
use TYPO3\CMS\Core\Core\Bootstrap;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Core\SystemEnvironmentBuilder;
use TYPO3\CMS\Core\Crypto\PasswordHashing\PasswordHashFactory;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\DataHandling\DataHandler;
use TYPO3\CMS\Core\Localization\LanguageServiceFactory;
use TYPO3\CMS\Core\Site\SiteFinder;
use TYPO3\CMS\Core\Utility\GeneralUtility;

$classLoader = require __DIR__ . '/../../.Build/vendor/autoload.php';
SystemEnvironmentBuilder::run(0, SystemEnvironmentBuilder::REQUESTTYPE_CLI);
$container = Bootstrap::init($classLoader);
Bootstrap::initializeBackendUser(CommandLineUserAuthentication::class);
$GLOBALS['BE_USER']->authenticate();
$GLOBALS['LANG'] = $container->get(LanguageServiceFactory::class)
    ->createFromUserPreferences($GLOBALS['BE_USER']);

$process = static function (array $data): DataHandler {
    $dataHandler = GeneralUtility::makeInstance(DataHandler::class);
    $dataHandler->start($data, []);
    $dataHandler->process_datamap();
    if ($dataHandler->errorLog !== []) {
        throw new RuntimeException(implode("\n", $dataHandler->errorLog));
    }
    return $dataHandler;
};

// The uid of a record of the theme, found by its title
$find = static function (string $table, string $field, string $value, ?int $pid = null): int {
    $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)->getQueryBuilderForTable($table);
    $queryBuilder->select('uid')->from($table)
        ->where($queryBuilder->expr()->eq($field, $queryBuilder->createNamedParameter($value)));
    if ($pid !== null) {
        $queryBuilder->andWhere($queryBuilder->expr()->eq('pid', $queryBuilder->createNamedParameter($pid)));
    }
    $uid = $queryBuilder->executeQuery()->fetchOne();
    if ($uid === false) {
        throw new RuntimeException(sprintf('No %s with %s "%s" in the Camino demo site', $table, $field, $value));
    }
    return (int)$uid;
};

$uids = [
    'root' => $find('pages', 'title', 'Camino', 0),
];
$uids['routeComparison'] = $find('pages', 'title', 'Camino Route Comparison', $uids['root']);
$uids['packingList'] = $find('pages', 'title', 'Packing List', $uids['root']);
$uids['toiletries'] = $find('tt_content', 'header', 'Toiletries', $uids['packingList']);
$uids['extras'] = $find('tt_content', 'header', 'Extras', $uids['packingList']);
$uids['essentialItems'] = $find('tt_content', 'header', 'Essential Items', $uids['packingList']);

// More languages for the chapter about languages: Spanish
$site = GeneralUtility::makeInstance(SiteFinder::class)->getSiteByRootPageId($uids['root']);
$configuration = $site->getConfiguration();
$configuration['languages'][] = [
    'title' => 'Español',
    'enabled' => true,
    'languageId' => 1,
    'base' => '/es/',
    'locale' => 'es-ES',
    'hreflang' => 'es-ES',
    'navigationTitle' => 'Español',
    'websiteTitle' => '',
    'flag' => 'es',
    'fallbackType' => 'strict',
    'fallbacks' => '',
];
// Arabic, which was spoken in Spain for centuries, and which is written
// from right to left
$configuration['languages'][] = [
    'title' => 'العربية',
    'enabled' => true,
    'languageId' => 2,
    'base' => '/ar/',
    'locale' => 'ar',
    'hreflang' => 'ar',
    'navigationTitle' => 'العربية',
    'websiteTitle' => '',
    'flag' => 'ma',
    'fallbackType' => 'strict',
    'fallbacks' => '',
];
GeneralUtility::makeInstance(SiteWriter::class)->write($site->getIdentifier(), $configuration);
GeneralUtility::makeInstance(CacheManager::class)->flushCaches();

// The packing list in Arabic: the page and its header, which show the
// right-to-left text next to the English one. The Spanish translation is
// made in the screenshots, with the wizard that the chapter describes.
// It comes before the history is cleared, so the history does not show it.
$localize = static function (string $table, int $uid, int $language): int {
    $dataHandler = GeneralUtility::makeInstance(DataHandler::class);
    $dataHandler->start([], [$table => [$uid => ['localize' => $language]]]);
    $dataHandler->process_cmdmap();
    if ($dataHandler->errorLog !== []) {
        throw new RuntimeException(implode("\n", $dataHandler->errorLog));
    }
    return (int)$dataHandler->copyMappingArray_merged[$table][$uid];
};
$arabicPage = $localize('pages', $uids['packingList'], 2);
$process(['pages' => [$arabicPage => ['title' => 'قائمة الأمتعة', 'hidden' => 0]]]);
$hero = $find('tt_content', 'CType', 'camino_hero_small', $uids['packingList']);
$arabicHero = $localize('tt_content', $hero, 2);
$process(['tt_content' => [$arabicHero => [
    'header' => 'قائمة الأمتعة',
    'subheader' => 'لطريق سانتياغو',
    'hidden' => 0,
]]]);

// The import of the demo site leaves a history of its own, which no editor
// made and which would fill the history screenshots
$connectionPool = GeneralUtility::makeInstance(ConnectionPool::class);
$connectionPool->getConnectionForTable('sys_history')->truncate('sys_history');

// The changes are made by the administrator who logs in for the
// screenshots, so the history shows their name instead of "_cli_"
$GLOBALS['BE_USER']->setBeUserByName('j.doe');

// The hidden content element of the hiding example
$process(['tt_content' => [$uids['extras'] => ['hidden' => 1]]]);

// The history and the Recycler: a content element is changed and deleted
$uids['faqs'] = $find('pages', 'title', 'FAQs', $uids['root']);
$uids['optionalItems'] = $find('tt_content', 'header', 'Optional Items', $uids['packingList']);
$process(['tt_content' => [$uids['optionalItems'] => ['header' => 'Nice to have']]]);
$delete = GeneralUtility::makeInstance(DataHandler::class);
$delete->start([], ['tt_content' => [$uids['optionalItems'] => ['delete' => 1]]]);
$delete->process_cmdmap();
if ($delete->errorLog !== []) {
    throw new RuntimeException(implode("\n", $delete->errorLog));
}

// An element in a column that the backend layout of the page does not have
$dataHandler = $process(['tt_content' => ['NEWunused' => [
    'pid' => $uids['faqs'],
    'colPos' => 99,
    'CType' => 'text',
    'header' => 'Opening hours of the pilgrim office',
]]]);
$uids['unused'] = $dataHandler->substNEWwithIDs['NEWunused'];

// The history and the Recycler show the times of the changes, which are
// fixed, so the screenshots do not change with every run
$changedAt = (new DateTimeImmutable('2026-04-08 13:43:06'))->getTimestamp();
$history = $connectionPool->getConnectionForTable('sys_history');
foreach ($history->select(['uid'], 'sys_history', [], [], ['uid' => 'ASC'])->fetchFirstColumn() as $index => $uid) {
    $history->update('sys_history', ['tstamp' => $changedAt + 45 * $index], ['uid' => $uid]);
}
$connectionPool->getConnectionForTable('tt_content')
    ->update('tt_content', ['tstamp' => $changedAt + 90], ['uid' => $uids['optionalItems']]);
// The file lists show the dates of the files, which the import of the demo
// site sets to the day of the run
$connectionPool->getConnectionForTable('sys_file')
    ->update('sys_file', ['creation_date' => $changedAt, 'modification_date' => $changedAt], ['storage' => 1]);

// A page for creating content, as a standard installation offers it. Camino
// replaces the standard content types with its own, and the columns of its
// layouts allow a few of them each. This page swaps the types back and has
// a layout of its own, with one column that allows all of them.
// It comes last in the page tree, so the pages above keep their place.
$dataHandler = $process(['pages' => ['NEWstories' => [
    'pid' => -$find('pages', 'title', 'Footer navigation', $uids['root']),
    'title' => 'Pilgrim stories',
    'hidden' => 0,
    'backend_layout' => 'pagets__editorsTutorial',
]]]);
$uids['stories'] = $dataHandler->substNEWwithIDs['NEWstories'];
// Camino hides the TSconfig field from the form, which the DataHandler
// respects, so the field is written directly
$connectionPool->getConnectionForTable('pages')->update('pages', ['TSconfig' => <<<'TSCONFIG'
    mod.web_layout.BackendLayouts.editorsTutorial {
      title = One column
      config.backend_layout {
        colCount = 1
        rowCount = 1
        rows.1.columns.1 {
          name = Content area
          colPos = 0
        }
      }
    }
    # A copy gets "(copy 1)" appended, which Camino switches off
    TCEMAIN.default.disablePrependAtCopy = 0
    TCEFORM.tt_content.CType.removeItems = camino_hero, camino_hero_small, camino_hero_text_only, camino_textteaser, camino_testimonial, camino_author, camino_textmedia_teaser, camino_textmedia_teaser_grid, camino_linklist, camino_sociallinks
    # The media adjustments, which Camino hides, for the example of an input error
    TCEFORM.tt_content {
      imagewidth.disabled = 0
      imageheight.disabled = 0
      imageborder.disabled = 0
    }
    TSCONFIG], ['uid' => $uids['stories']]);
$dataHandler = $process(['tt_content' => ['NEWstory' => [
    'pid' => $uids['stories'],
    'colPos' => 0,
    'CType' => 'textmedia',
    'header' => 'Arriving in Santiago',
    'bodytext' => '<p>After weeks on the road, the first view of the cathedral towers makes every blister worth it.</p>',
]]]);
$uids['story'] = $dataHandler->substNEWwithIDs['NEWstory'];
// An element of a type that the common editor below may not edit. It comes
// after the story, so the screenshots of creating content are not affected.
$dataHandler = $process(['tt_content' => ['NEWmap' => [
    'pid' => -$uids['story'],
    'colPos' => 0,
    'CType' => 'html',
    'header' => 'Map of the stages',
    'bodytext' => '<iframe src="https://example.org/map" title="Map of the stages"></iframe>',
]]]);
$uids['map'] = $dataHandler->substNEWwithIDs['NEWmap'];
// A text for the rich text editor, with a link, a non-breaking space and a
// soft hyphen. It comes last, after the elements above.
$dataHandler = $process(['tt_content' => ['NEWoffice' => [
    'pid' => -$uids['map'],
    'colPos' => 0,
    'CType' => 'text',
    'header' => 'The pilgrim office',
    'bodytext' => '<p>In Santiago, the <a href="https://example.org/pilgrim-office">pilgrim office</a> '
        . 'checks the stamps in your credential and issues the Compostela. Plan about 30&nbsp;minutes '
        . 'for the queue in the summer, and keep your credential dry: a soaked page of stamps is '
        . 'hard to read for the office&shy;workers.</p>',
]]]);
$uids['office'] = $dataHandler->substNEWwithIDs['NEWoffice'];
// A text with an image of the demo site, for the screenshots of working
// with images. It comes last, after the elements above.
$uids['shellsFile'] = $find('sys_file', 'identifier', '/camino/bernard-wortelboer-l5zWzwYnt_s-unsplash.webp');
$dataHandler = $process([
    'tt_content' => ['NEWshells' => [
        'pid' => -$uids['office'],
        'colPos' => 0,
        'CType' => 'textpic',
        'header' => 'The scallop shell',
        'bodytext' => '<p>Most pilgrims carry a scallop shell on their backpack, the sign of the Camino.</p>',
        'image' => 'NEWshellsImage',
    ]],
    'sys_file_reference' => ['NEWshellsImage' => [
        'pid' => $uids['stories'],
        'uid_local' => $uids['shellsFile'],
        'uid_foreign' => 'NEWshells',
        'tablenames' => 'tt_content',
        'fieldname' => 'image',
    ]],
]);
$uids['shells'] = $dataHandler->substNEWwithIDs['NEWshells'];

// Website users and groups, which have no module of their own, for the
// screenshots of the Records module. Their folder is in the folder of the
// footer navigation, which the page tree shows closed, so the screenshots
// of the page tree do not change.
$dataHandler = $process(['pages' => ['NEWusers' => [
    'pid' => $find('pages', 'title', 'Footer navigation', $uids['root']),
    'title' => 'Website users',
    'doktype' => 254,
    'hidden' => 0,
]]]);
$uids['websiteUsers'] = $dataHandler->substNEWwithIDs['NEWusers'];
$dataHandler = $process(['fe_groups' => [
    'NEWpilgrims' => ['pid' => $uids['websiteUsers'], 'title' => 'Pilgrims', 'description' => 'Pilgrims who receive the newsletter'],
    'NEWvolunteers' => ['pid' => $uids['websiteUsers'], 'title' => 'Volunteers', 'description' => 'Volunteers of the pilgrim hostels'],
]]);
$process(['fe_users' => [
    'NEWrosa' => [
        'pid' => $uids['websiteUsers'],
        'username' => 'rosa',
        'name' => 'Rosa Martín',
        'email' => 'rosa@example.org',
        'password' => 'Screenshots-2026!',
        'usergroup' => (string)$dataHandler->substNEWwithIDs['NEWpilgrims'],
    ],
    'NEWtomas' => [
        'pid' => $uids['websiteUsers'],
        'username' => 'tomas',
        'name' => 'Tomás Ferreira',
        'email' => 'tomas@example.org',
        'password' => 'Screenshots-2026!',
        'usergroup' => (string)$dataHandler->substNEWwithIDs['NEWvolunteers'],
    ],
]]);

// The author card of the theme, whose name is a required field
$uids['author'] = $find('tt_content', 'header', 'Elena Vásquez', $uids['routeComparison']);

// The group of a common editor, who creates the typical content types,
// lists and dividers, but no forms, menus, or plugins, and who manages the
// website users in the Records module and the files of the demo site. Like
// every editor, they change their own settings in the User Settings module.
$contentTypes = ['header', 'text', 'textpic', 'image', 'textmedia', 'bullets', 'table', 'uploads', 'div'];
// The folder of the demo site, which the editors manage in the Media module
$dataHandler = $process(['sys_filemounts' => ['NEWmount' => [
    'pid' => 0,
    'title' => 'Camino',
    'identifier' => '1:/camino/',
]]]);
$fileMount = $dataHandler->substNEWwithIDs['NEWmount'];
$dataHandler = $process(['be_groups' => ['NEWeditors' => [
    'pid' => 0,
    'title' => 'Editors',
    'db_mountpoints' => (string)$uids['root'],
    'groupMods' => 'web_layout,records,media_management,user_setup',
    'file_mountpoints' => (string)$fileMount,
    'file_permissions' => 'readFolder,writeFolder,addFolder,renameFolder,moveFolder,readFile,writeFile,addFile,renameFile,replaceFile,moveFile,copyFile',
    'tables_select' => 'pages,tt_content,fe_users,fe_groups',
    'tables_modify' => 'tt_content,fe_users,fe_groups',
    'explicit_allowdeny' => implode(',', array_map(static fn(string $type): string => 'tt_content:CType:' . $type, $contentTypes)),
]]]);
$editors = $dataHandler->substNEWwithIDs['NEWeditors'];
// The editors may edit the content of every page of the site
$connectionPool->getConnectionForTable('pages')->update('pages', ['perms_groupid' => $editors, 'perms_group' => 31], ['deleted' => 0]);

// Redirects, a QR code, and a short URL for the chapter about link
// management, with the paths of the scenarios in the text. The QR code and
// the short URL get a random path, and every record shows when it was
// created, so both are fixed.
$imprint = $find('pages', 'title', 'Imprint');
$dataHandler = $process(['sys_redirect' => [
    'NEWcontact' => [
        'pid' => 0,
        'source_host' => '*',
        'source_path' => '/contact-us.aspx',
        'description' => 'The contact page of the old website, which flyers still name.',
        'target' => 't3://page?uid=' . $imprint,
        'target_statuscode' => 301,
    ],
    'NEWexpo' => [
        'pid' => 0,
        'source_host' => '*',
        'source_path' => '/expo-2027',
        'target' => 't3://page?uid=' . $uids['root'],
        'target_statuscode' => 307,
    ],
    'NEWqrcode' => [
        'pid' => 0,
        'redirect_type' => 'qrcode',
        'target' => 't3://page?uid=' . $uids['packingList'],
        'description' => 'This QR code is used on our Christmas 2026 print flyers.',
    ],
    // A short URL is only saved with its path
    'NEWshorturl' => [
        'pid' => 0,
        'redirect_type' => 'short_url',
        'source_host' => 'camino.example.org',
        'source_path' => '/s/Kq7Wz2',
        'target' => 't3://page?uid=' . $uids['stories'],
    ],
]]);
$uids['redirect'] = $dataHandler->substNEWwithIDs['NEWcontact'];
$uids['qrcode'] = $dataHandler->substNEWwithIDs['NEWqrcode'];
$uids['shortUrl'] = $dataHandler->substNEWwithIDs['NEWshorturl'];
$redirects = $connectionPool->getConnectionForTable('sys_redirect');
// The site of the demo has no domain of its own, so the QR code and the
// short URL get one from the domain reserved for examples
$redirects->update('sys_redirect', ['source_host' => 'camino.example.org', 'source_path' => '/_redirect/6a229e83e6a65366790351'], ['uid' => $uids['qrcode']]);
$redirects->update('sys_redirect', ['createdon' => $changedAt, 'updatedon' => $changedAt], ['deleted' => 0]);

// A second editor, who is a member of the group above, and who is editing
// the element of the locking example. The Layout module marks a locked
// element, so it is one that no other screenshot shows. The warning names
// the age of the lock in the largest unit only, so 90 minutes read "1 hour"
// for half an hour, longer than the screenshots take.
$connectionPool->getConnectionForTable('be_users')->insert('be_users', [
    'pid' => 0,
    'username' => 'e.doe',
    'realName' => 'Erika Doe',
    'email' => 'erika.doe@example.org',
    'password' => GeneralUtility::makeInstance(PasswordHashFactory::class)
        ->getDefaultHashInstance('BE')->getHashedPassword('Screenshots-2026!'),
    'usergroup' => (string)$editors,
    'tstamp' => $changedAt,
    'crdate' => $changedAt,
]);
$connectionPool->getConnectionForTable('sys_lockedrecords')->insert('sys_lockedrecords', [
    'userid' => (int)$connectionPool->getConnectionForTable('be_users')->lastInsertId(),
    'tstamp' => time() - 90 * 60,
    'record_table' => 'tt_content',
    'record_uid' => $uids['essentialItems'],
    'record_pid' => $uids['packingList'],
]);

// The uids differ between TYPO3 versions, so screenshots.mjs reads them here
GeneralUtility::mkdir_deep(Environment::getVarPath());
file_put_contents(Environment::getVarPath() . '/screenshot-records.json', json_encode($uids, JSON_PRETTY_PRINT) . "\n");
