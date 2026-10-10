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
use TYPO3\CMS\Core\Core\Bootstrap;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Core\SystemEnvironmentBuilder;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\DataHandling\DataHandler;
use TYPO3\CMS\Core\Localization\LanguageServiceFactory;
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
$uids['packingList'] = $find('pages', 'title', 'Packing List', $uids['root']);
$uids['toiletries'] = $find('tt_content', 'header', 'Toiletries', $uids['packingList']);
$uids['extras'] = $find('tt_content', 'header', 'Extras', $uids['packingList']);
$uids['essentialItems'] = $find('tt_content', 'header', 'Essential Items', $uids['packingList']);

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

// A second editor, who is editing the element of the locking example. The
// Layout module marks a locked element, so it is one that no other
// screenshot shows. The warning names the age of the lock in the largest
// unit only, so 90 minutes read "1 hour" for half an hour, longer than the
// screenshots take.
$connectionPool->getConnectionForTable('be_users')->insert('be_users', [
    'pid' => 0,
    'username' => 'e.doe',
    'realName' => 'Erika Doe',
    'password' => '',
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
