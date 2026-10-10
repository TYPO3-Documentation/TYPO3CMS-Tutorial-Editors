// Takes the backend screenshots of the Editors Tutorial from a running TYPO3
// instance with the demo site of the Camino theme.
//
// Usage: node screenshots.mjs [name ...]
// Without names, all screenshots are taken. A name is the path of the image
// below Documentation/Images/GeneratedScreenshots, without ".png". With DUMP
// set, the HTML of each screen is also written to var/, to look up selectors.

import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const baseUrl = process.env.TYPO3_BASE_URL ?? 'http://localhost:8080';
const target = process.env.SCREENSHOT_TARGET ?? '../../Documentation/Images/GeneratedScreenshots';
const username = process.env.TYPO3_USERNAME ?? 'j.doe';
const password = process.env.TYPO3_PASSWORD ?? 'Screenshots-2026!';

const moduleUrl = (path, id) => `${baseUrl}/typo3/module/${path}?id=${id}`;
const editUrl = (table, uid) => `${baseUrl}/typo3/record/edit?edit[${table}][${uid}]=edit`;
// Space around an element, so its border does not touch the edge
const margin = 12;

// The uids of the records that create-records.php looked up
const { packingList, toiletries, extras, essentialItems, faqs } =
  JSON.parse(readFileSync('../../var/screenshot-records.json', 'utf8'));

// A content element in the Content > Layout module
const contentElement = (uid) => `.t3js-page-ce[data-uid="${uid}"]`;

// Opens the context menu of a content element in the Content > Layout module
const openContextMenu = (uid) => async (frame) => {
  await frame.locator(`${contentElement(uid)} [data-contextmenu-trigger]`).first().click();
  await frame.page().locator('.context-menu').first().waitFor();
  await frame.page().waitForTimeout(500);
  // The menu focuses its first item, which would look selected
  await frame.page().evaluate(() => document.activeElement?.blur());
};

// Opens the history of the page. The route needs a token, which only a link
// in the backend has: the context menu opens the history of a content
// element, which is then switched to the page that holds it.
const openPageHistory = (uid, page) => async (frame) => {
  await openContextMenu(uid)(frame);
  await frame.page().locator('.context-menu >> visible=true').getByText('History/Undo', { exact: true }).click();
  await frame.waitForURL(/record\/history/);
  const url = new URL(frame.url());
  url.searchParams.set('element', `pages:${page}`);
  await frame.goto(url.toString());
  await frame.waitForLoadState('networkidle');
};

const screenshots = {
  // First, as the warning names the age of the lock that create-records.php
  // set: the sooner, the safer
  'ContentElements/ContentElementEdited': {
    url: editUrl('tt_content', essentialItems),
    from: '.alert-warning',
    to: '[role="tablist"]',
  },
  'ContentElements/PageModule': {
    // Wide, so that the page tree leaves the module enough room
    width: 1440,
    url: moduleUrl('web/layout', packingList),
    window: true,
    // The page tree shows where the page is, so it stays open
    pageTree: true,
    // The first content element: the module, not the page, is the subject
    until: '.t3js-page-ce-sortable >> nth=0',
  },
  'ContentElements/HideContent': {
    url: moduleUrl('web/layout', packingList),
    prepare: async (frame) => {
      await frame.locator(`${contentElement(toiletries)} [data-action="content-element-visibility-toggle"]`).hover();
    },
    hover: true,
    from: contentElement(toiletries),
    to: contentElement(extras),
  },
  'ContentElements/CopyContent': {
    url: moduleUrl('web/layout', packingList),
    prepare: openContextMenu(toiletries),
    from: contentElement(toiletries),
    // The context menu is outside of the module frame
    toOutside: '.context-menu >> visible=true',
  },
  // The beginning of the context menu, as the introduction of the page
  'ContentElements/ManageContent': {
    url: moduleUrl('web/layout', packingList),
    prepare: openContextMenu(toiletries),
    from: contentElement(toiletries),
  },
  'ContentElements/PasteContent': {
    url: moduleUrl('web/layout', packingList),
    prepare: async (frame) => {
      await openContextMenu(toiletries)(frame);
      await frame.page().locator('.context-menu >> visible=true').getByText('Copy', { exact: true }).click();
      await frame.waitForLoadState('networkidle');
      await frame.locator('.t3js-paste-into').first().hover();
    },
    hover: true,
    from: '.t3-page-column-header >> nth=1',
    to: '.t3js-page-ce-sortable >> nth=1',
  },
  'ContentElements/LiveSearch': {
    url: moduleUrl('web/layout', packingList),
    prepare: async (frame) => {
      await frame.page().locator('.t3js-topbar-button-search:visible').first().click();
      const search = frame.page().locator('typo3-backend-modal dialog[open] input[type="search"]');
      await search.fill('#content:items');
      await frame.page().waitForTimeout(1500);
      // The first result shows its details next to the list
      await search.press('ArrowDown');
      await frame.page().waitForTimeout(500);
    },
    // The dialog grows with the window
    width: 1024,
    height: 700,
    modal: true,
  },
  'ContentElements/UnusedContent': {
    url: moduleUrl('web/layout', faqs),
    from: '.alert-warning',
  },
  'ContentElements/RestoreContentRecycler': {
    url: moduleUrl('web/recycler', packingList),
    window: true,
    until: '#itemsInRecycler tr[data-uid]',
  },
  'ContentElements/RestoreContent': {
    width: 1440,
    url: moduleUrl('web/layout', packingList),
    prepare: openPageHistory(toiletries, packingList),
    window: true,
    pageTree: true,
    until: 'table tbody tr >> nth=1',
  },
  'ContentElements/ContentElementHistoryDifferences': {
    url: moduleUrl('web/layout', packingList),
    prepare: openPageHistory(toiletries, packingList),
    from: 'table thead',
    to: 'table tbody tr:has-text("modified") >> nth=0',
  },
};

// Hides the page tree, unless the screenshot needs it, and collapses the
// groups of the module menu, except the one of the module, which stays open:
// the screenshot shows where to find the module and stays narrow enough for
// the documentation page. The group is named, because not every view marks
// its module as active in time, such as the history.
const collapseNavigation = async (pageTree, menu) => {
  const hideTree = page.locator('typo3-backend-content-navigation-toggle[action="collapse"]');
  if (!pageTree && await hideTree.isVisible()) {
    await hideTree.click();
  }
  const groups = page.locator('button[data-modulemenu-collapsible="true"]');
  for (let index = 0; index < await groups.count(); index++) {
    const group = groups.nth(index);
    const open = await group.getAttribute('aria-expanded') === 'true';
    const keep = (await group.innerText()).trim() === menu;
    if (open !== keep) {
      await group.click();
    }
  }
  // The clicked buttons would look selected
  await page.evaluate(() => document.activeElement?.blur());
};

// Tall, so that most pages fit without scrolling
const viewportHeight = 2000;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: viewportHeight } });
await page.goto(`${baseUrl}/typo3/`);
await page.fill('#t3-username', username);
await page.fill('#t3-password', password);
await page.click('#t3-login-submit');
await page.waitForURL(/\/typo3\/(main|module)/);

const names = process.argv.length > 2 ? process.argv.slice(2) : Object.keys(screenshots);
for (const name of names) {
  const screenshot = screenshots[name];
  if (screenshot === undefined) {
    throw new Error(`Unknown screenshot "${name}"`);
  }
  await page.setViewportSize({
    width: screenshot.width ?? 1280,
    height: screenshot.height ?? viewportHeight,
  });
  await page.goto(screenshot.url);
  await page.waitForLoadState('networkidle');
  const frame = page.frame({ name: 'list_frame' });
  await frame.waitForLoadState('networkidle');
  // Also for a part of a module: the module frame is too narrow for the
  // columns of the Layout module next to the page tree
  await collapseNavigation(screenshot.pageTree, screenshot.menu ?? 'Content');
  // A hovered button would look selected, unless hovering is the point
  if (!screenshot.hover) {
    await page.mouse.move(0, 0);
  }
  if (screenshot.prepare) {
    await screenshot.prepare(frame);
    // A view opened by "prepare" can change the menu again. Clicks would
    // close a context menu, so only a changed menu is clicked.
    await collapseNavigation(screenshot.pageTree, screenshot.menu ?? 'Content');
  }
  await page.waitForTimeout(500);
  if (process.env.DUMP) {
    writeFileSync(`../../var/${name.replaceAll('/', '_')}.html`, await frame.content());
    writeFileSync(`../../var/${name.replaceAll('/', '_')}-window.html`, await page.content());
  }
  const path = `${target}/${name}.png`;
  if (screenshot.modal) {
    // Only the dialog: the page behind it does not belong to the example
    await page.locator('typo3-backend-modal dialog[open]').screenshot({ path });
    console.log(`${name}.png`);
    continue;
  }
  if (screenshot.window) {
    // The whole backend. It ends below the element named in "until", so the
    // image takes no more room on the page than it needs.
    let clip;
    if (screenshot.until) {
      const until = await frame.locator(screenshot.until).last().boundingBox();
      const viewport = page.viewportSize();
      clip = { x: 0, y: 0, width: viewport.width, height: Math.min(until.y + until.height + 4, viewport.height) };
    }
    await page.screenshot({ path, clip });
    console.log(`${name}.png`);
    continue;
  }
  // Bounding boxes are relative to the page, also for elements in the frame
  const boxes = [
    await frame.locator(screenshot.from).first().boundingBox(),
    screenshot.toOutside
      ? await page.locator(screenshot.toOutside).last().boundingBox()
      : await frame.locator(screenshot.to ?? screenshot.from).last().boundingBox(),
  ];
  const space = screenshot.margin ?? margin;
  const left = Math.max(Math.min(...boxes.map((box) => box.x)) - space, 0);
  const top = Math.max(Math.min(...boxes.map((box) => box.y)) - space, 0);
  await page.screenshot({
    path,
    clip: {
      x: left,
      y: top,
      width: Math.max(...boxes.map((box) => box.x + box.width)) + space - left,
      height: Math.max(...boxes.map((box) => box.y + box.height)) + space - top,
    },
  });
  console.log(`${name}.png`);
}
await browser.close();
