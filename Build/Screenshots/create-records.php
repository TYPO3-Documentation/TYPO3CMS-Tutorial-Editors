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

// The hidden content element of the hiding example
$process(['tt_content' => [$uids['extras'] => ['hidden' => 1]]]);

// The uids differ between TYPO3 versions, so screenshots.mjs reads them here
GeneralUtility::mkdir_deep(Environment::getVarPath());
file_put_contents(Environment::getVarPath() . '/screenshot-records.json', json_encode($uids, JSON_PRETTY_PRINT) . "\n");
