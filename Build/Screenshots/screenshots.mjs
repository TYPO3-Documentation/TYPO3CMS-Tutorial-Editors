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
// Space around an element, so its border does not touch the edge
const margin = 12;

// The uids of the records that create-records.php looked up
const { packingList, toiletries, extras } =
  JSON.parse(readFileSync('../../var/screenshot-records.json', 'utf8'));

// A content element in the Content > Layout module
const contentElement = (uid) => `.t3js-page-ce[data-uid="${uid}"]`;

const screenshots = {
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
    prepare: async (frame) => {
      await frame.locator(`${contentElement(toiletries)} [data-contextmenu-trigger]`).first().click();
      await frame.page().locator('.context-menu').first().waitFor();
      await frame.page().waitForTimeout(500);
      // The menu focuses its first item, which would look selected
      await frame.page().evaluate(() => document.activeElement?.blur());
    },
    from: contentElement(toiletries),
    // The context menu is outside of the module frame
    toOutside: '.context-menu >> visible=true',
  },
};

// Hides the page tree, unless the screenshot needs it, and collapses the
// groups of the module menu, except the one of the module that is open: the
// screenshot shows where to find the module and stays narrow enough for the
// documentation page
const collapseNavigation = async (pageTree) => {
  const hideTree = page.locator('typo3-backend-content-navigation-toggle[action="collapse"]');
  if (!pageTree && await hideTree.isVisible()) {
    await hideTree.click();
  }
  const groups = page.locator(
    'button[data-modulemenu-collapsible="true"][aria-expanded="true"]:not(.modulemenu-action-active)',
  );
  while (await groups.count() > 0) {
    await groups.first().click();
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
  await collapseNavigation(screenshot.pageTree);
  // A hovered button would look selected, unless hovering is the point
  if (!screenshot.hover) {
    await page.mouse.move(0, 0);
  }
  if (screenshot.prepare) {
    await screenshot.prepare(frame);
  }
  await page.waitForTimeout(500);
  if (process.env.DUMP) {
    writeFileSync(`../../var/${name.replaceAll('/', '_')}.html`, await frame.content());
    writeFileSync(`../../var/${name.replaceAll('/', '_')}-window.html`, await page.content());
  }
  const path = `${target}/${name}.png`;
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
