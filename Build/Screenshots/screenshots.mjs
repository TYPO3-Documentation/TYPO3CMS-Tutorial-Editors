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
// The administrator, unless a screenshot names another user
const defaultUser = 'j.doe';
const password = 'Screenshots-2026!';

const moduleUrl = (path, id) => `${baseUrl}/typo3/module/${path}?id=${id}`;
const editUrl = (table, uid) => `${baseUrl}/typo3/record/edit?edit[${table}][${uid}]=edit`;
// Space around an element, so its border does not touch the edge
const margin = 12;

// The uids of the records that create-records.php looked up
const { packingList, toiletries, extras, essentialItems, faqs, stories, story, map, author, office } =
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

// A column of the Content > Layout module. The main column of the Camino
// layouts, "Content area", has colPos 0.
const column = (colPos) => `.t3js-page-column[data-colpos="${colPos}"]`;

// Opens the New Page Content wizard of the content area, on the tab named:
// the wizard remembers the last one. The hero area at the top allows the
// hero elements only.
const openWizard = (tab) => async (frame) => {
  await frame.locator(column(0)).getByRole('button', { name: 'Create new content' }).first().click();
  const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
  await dialog.waitFor();
  await frame.page().waitForTimeout(1000);
  await dialog.getByText(tab, { exact: true }).filter({ visible: true }).first().click();
  await frame.page().waitForTimeout(500);
  // The search field has the focus, which would look selected
  await frame.page().evaluate(() => document.activeElement?.blur());
};

// The size of the New Page Content wizard, which grows with the window
const wizardSize = { modal: true, width: 1024, height: 600 };

// A field of a form, found by its label: the backend runs without debug
// mode, which would show the field names
const field = (name) => `.form-group:has([name$="[${name}]"]):not(:has(.form-group))`;
// The input of a field, not the hidden one that holds the value
const input = (name) => `${field(name)} input:not([type="hidden"]):not([type="checkbox"])`;

// Changes the header of the story on the Pilgrim stories page, which the
// form highlights once the field lost the focus
const changeHeader = async (frame) => {
  await frame.locator(input('header')).first().fill('Arriving in Santiago de Compostela');
  await frame.locator('h1').first().click();
  await frame.page().waitForTimeout(500);
};

// Creates a Text & Media element on the page, up to the filled header
const newTextAndMedia = async (frame) => {
  await openWizard('Typical page content')(frame);
  await frame.page().locator('typo3-backend-modal dialog[open]').getByRole('button', { name: /^Text & Media/ }).click();
  await frame.waitForURL(/record\/edit/);
  await frame.waitForLoadState('networkidle');
  await frame.locator(`${field('header')} input[type="text"]`).first().fill('My new content element');
  // The field shows that it changed only once it lost the focus
  await frame.locator('h1').first().click();
  await frame.page().waitForTimeout(500);
};

// Selects a phrase in the rich text editor, as an editor would with the
// mouse. The editor follows the selection of the browser.
const selectText = (phrase) => async (frame) => {
  const editable = frame.locator('.ck-editor__editable').first();
  await editable.click();
  await editable.evaluate((element, text) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const start = node.textContent.indexOf(text);
      if (start >= 0) {
        const range = document.createRange();
        range.setStart(node, start);
        range.setEnd(node, start + text.length);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        return;
      }
    }
    throw new Error(`"${text}" is not in the editor`);
  }, phrase);
  await frame.page().waitForTimeout(500);
};

// The button of the rich text editor whose tooltip starts with the label
const editorButton = (label) => `.ck-toolbar button[data-cke-tooltip-text^="${label}"]`;

// The size of the link browser, which grows with the window
const linkBrowserSize = { modal: true, width: 1100, height: 700 };

// The text of the rich text editor, from the label of the field to the
// end of the text: the editor is taller than the text
const editorText = { from: `${field('bodytext')} .form-label`, to: '.ck-editor__editable p' };

// The link browser, which opens in a frame of its own in a dialog
const linkBrowser = (page) => page.frameLocator('typo3-backend-modal dialog[open] iframe');

// Opens the link browser for the link in the text, on the tab named
const openLinkBrowser = (tab) => async (frame) => {
  await selectText('pilgrim office')(frame);
  // On a link, the button shows the link in a balloon first, whose "Edit
  // link" button opens the link browser
  await frame.locator(editorButton('Link')).first().click();
  await frame.locator('.ck-balloon-panel_visible button[data-cke-tooltip-text="Edit link"]').first().click();
  const browser = linkBrowser(frame.page());
  await browser.getByRole('tab', { name: tab }).waitFor();
  await browser.getByRole('tab', { name: tab }).click();
  await frame.page().waitForTimeout(1500);
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
      // The search shows a tip picked at random, which would change the
      // screenshot with every run. It opens until it shows the tip about
      // searching for content, which fits the search.
      for (let attempt = 0; attempt < 30; attempt++) {
        await frame.page().locator('.t3js-topbar-button-search:visible').first().click();
        const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
        await dialog.waitFor();
        await frame.page().waitForTimeout(500);
        if ((await dialog.innerText()).includes('#content:')) {
          break;
        }
        await frame.page().keyboard.press('Escape');
        await dialog.waitFor({ state: 'detached' });
      }
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
  // The thumbnail at the top of the chapter
  'ContentElements/CreateContentElement': {
    // Narrow, as the page shows the image 250 px wide
    width: 800,
    url: moduleUrl('web/layout', stories),
    from: `${column(0)} .t3-page-column-header`,
    to: `${contentElement(story)} .t3-page-ce-header`,
    // The text of the element follows right below its header
    margin: 4,
  },
  'NewContentElement/CreateNew': {
    width: 1440,
    url: moduleUrl('web/layout', stories),
    prepare: async (frame) => {
      // Marks the button that the text names
      await frame.locator(column(0)).getByRole('button', { name: 'Create new content' }).first()
        .evaluate((button) => { button.style.outline = '3px solid #ff8700'; button.style.outlineOffset = '3px'; });
    },
    window: true,
    pageTree: true,
    until: `${contentElement(story)} .t3-page-ce-header`,
  },
  'ContentElements/WizardTypical': {
    user: 'e.doe',
    url: moduleUrl('web/layout', stories),
    prepare: openWizard('Typical page content'),
    ...wizardSize,
  },
  'ContentElements/WizardAdvanced': {
    url: moduleUrl('web/layout', stories),
    prepare: openWizard('Typical page content'),
    ...wizardSize,
  },
  'NewContentElement/WizardTabList': {
    url: moduleUrl('web/layout', stories),
    prepare: openWizard('Lists'),
    ...wizardSize,
  },
  'NewContentElement/WizardTabForm': {
    url: moduleUrl('web/layout', stories),
    prepare: openWizard('Form elements'),
    ...wizardSize,
  },
  'NewContentElement/WizardTabMenu': {
    url: moduleUrl('web/layout', stories),
    prepare: openWizard('Menu'),
    ...wizardSize,
  },
  'NewContentElement/WizardTabSpecialElements': {
    url: moduleUrl('web/layout', stories),
    prepare: openWizard('Special elements'),
    ...wizardSize,
  },
  'NewContentElement/NewContentElement': {
    url: moduleUrl('web/layout', stories),
    prepare: newTextAndMedia,
    from: '.module-docheader',
    to: `${field('header_layout')}`,
    // The form fills the module frame, a margin would show the menu
    margin: 0,
  },
  // The thumbnail at the top of the chapter about editing content
  'ContentElements/EditContent': {
    // Narrow, as the page shows the image 250 px wide
    width: 800,
    url: moduleUrl('web/layout', stories),
    prepare: async (frame) => {
      await frame.locator(`${contentElement(story)} typo3-backend-contextual-record-edit-trigger`).first().hover();
    },
    hover: true,
    from: contentElement(story),
  },
  'ContentElements/ChangeText': {
    url: editUrl('tt_content', story),
    prepare: changeHeader,
    from: '.module-docheader',
    to: field('header'),
    margin: 0,
  },
  'ContentElements/SavingPrompt': {
    url: editUrl('tt_content', story),
    prepare: async (frame) => {
      await changeHeader(frame);
      await frame.getByRole('button', { name: 'Close' }).first().click();
      await frame.page().locator('typo3-backend-modal dialog[open]').waitFor();
      await frame.page().waitForTimeout(1000);
      // The dialog focuses a button, which would look selected
      await frame.page().evaluate(() => document.activeElement?.blur());
    },
    modal: true,
  },
  'ContentElements/NoEdit': {
    user: 'e.doe',
    url: moduleUrl('web/layout', stories),
    from: contentElement(map),
  },
  'ContentElements/RequiredField': {
    url: editUrl('tt_content', author),
    prepare: async (frame) => {
      await frame.locator(input('header')).first().fill('');
      await frame.getByRole('button', { name: 'Save' }).first().click();
      // A dialog says that the form cannot be saved, and darkens the form
      await frame.page().locator('typo3-backend-modal dialog[open]').waitFor();
      await frame.page().keyboard.press('Escape');
      await frame.page().locator('typo3-backend-modal dialog[open]').waitFor({ state: 'detached' });
      await frame.page().waitForTimeout(500);
    },
    from: '[role="tablist"]',
    to: field('header'),
  },
  'ContentElements/InputError': {
    url: editUrl('tt_content', story),
    tab: 'Media',
    prepare: async (frame) => {
      // The field has no value by default, until its checkbox gives it one
      await frame.locator(`${field('imagewidth')} input[type="checkbox"]`).first().check();
      // A number field takes a typed "e", the start of an exponent, but no
      // other letter
      await frame.locator(input('imagewidth')).first().click();
      await frame.page().keyboard.type('e');
      // Saving makes the browser check the field and show its message
      await frame.getByRole('button', { name: 'Save' }).first().click();
      await frame.page().waitForTimeout(1000);
    },
    // The message of the browser is not part of the page, so the image
    // reaches to the heading of the next section, below the message
    from: 'text=Media Adjustments',
    to: 'text=Gallery Settings',
    // The message starts a little left of the field
    left: 8,
  },
  'ContentElements/ChangeType': {
    url: editUrl('tt_content', story),
    prepare: async (frame) => {
      // A screenshot cannot show the native list of a select, so the select
      // shows a part of its items as a list box instead
      await frame.locator(`${field('CType')} select`).evaluate((select) => { select.size = 12; });
    },
    from: 'h1',
    to: field('CType'),
  },
  'ContentElements/RefreshRequired': {
    url: editUrl('tt_content', story),
    prepare: async (frame) => {
      await frame.locator(`${field('CType')} select`).selectOption('text');
      await frame.page().locator('typo3-backend-modal dialog[open]').waitFor();
      await frame.page().waitForTimeout(1000);
      await frame.page().evaluate(() => document.activeElement?.blur());
    },
    modal: true,
  },
  // The thumbnail at the top of the chapter about the rich text editor
  'ContentElements/RegularText': {
    url: moduleUrl('web/layout', stories),
    prepare: openWizard('Typical page content'),
    outside: true,
    from: 'typo3-backend-modal dialog[open] >> role=button[name=/^Regular Text Element/]',
  },
  'ContentElements/Text/RichTextEditor': {
    url: editUrl('tt_content', office),
    ...editorText,
  },
  'ContentElements/Text/Link': {
    url: editUrl('tt_content', office),
    prepare: async (frame) => {
      await selectText('Compostela')(frame);
      await frame.locator(editorButton('Link')).first().hover();
      await frame.page().waitForTimeout(1000);
    },
    hover: true,
    ...editorText,
  },
  'Link/LinkBrowser': {
    url: editUrl('tt_content', office),
    prepare: async (frame) => {
      await openLinkBrowser('Page')(frame);
      const browser = linkBrowser(frame.page());
      // The tree shows the site, but not its pages
      await browser.locator('.node', { hasText: 'Camino' }).locator('.node-toggle').first().click();
      // The tree draws its nodes anew while it loads, which a normal click
      // waits for in vain
      await browser.getByText('Packing List', { exact: true }).filter({ visible: true }).first().click({ force: true });
      await frame.page().waitForTimeout(1500);
    },
    ...linkBrowserSize,
  },
  'Link/LinkBrowserFile': {
    url: editUrl('tt_content', office),
    prepare: async (frame) => {
      await openLinkBrowser('File')(frame);
      await linkBrowser(frame.page()).getByText('camino', { exact: true }).filter({ visible: true }).first().click({ force: true });
      await frame.page().waitForTimeout(1500);
    },
    ...linkBrowserSize,
  },
  'Link/LinkBrowserExternal': {
    url: editUrl('tt_content', office),
    prepare: openLinkBrowser('External URL'),
    ...linkBrowserSize,
  },
  'ContentElements/Text/Unlink': {
    url: editUrl('tt_content', office),
    prepare: async (frame) => {
      await frame.locator('.ck-editor__editable a').first().click();
      await frame.locator('.ck-balloon-panel_visible').first().waitFor();
      await frame.locator('.ck-balloon-panel_visible button[data-cke-tooltip-text="Unlink"]').first().hover();
      await frame.page().waitForTimeout(1000);
    },
    hover: true,
    from: '.ck-editor__editable p',
    to: '.ck-balloon-panel_visible',
  },
  'ContentElements/Text/Whitespace': {
    url: editUrl('tt_content', office),
    from: '.ck-editor__editable p',
  },
  // Last, as it saves a content element on the page of the screenshots above
  'NewContentElement/ContentSaved': {
    url: moduleUrl('web/layout', stories),
    prepare: async (frame) => {
      await newTextAndMedia(frame);
      // The text, which the step after the screenshot of the form types in
      await frame.locator('.ck-editor__editable').first().click();
      await frame.page().keyboard.type('Every pilgrim has a story to tell.');
      await frame.getByRole('button', { name: 'Save' }).first().click();
      // A saved record can be deleted, a new one cannot
      await frame.getByRole('button', { name: 'Delete' }).first().waitFor();
      await frame.getByRole('button', { name: 'Close' }).first().click();
      await frame.locator(column(0)).waitFor();
      await frame.waitForLoadState('networkidle');
    },
    from: `${column(0)} .t3-page-column-header`,
    to: `${column(0)} .t3js-page-ce-sortable >> nth=0`,
  },
};

// Hides the page tree, unless the screenshot needs it, and collapses the
// groups of the module menu, except the one of the module, which stays open:
// the screenshot shows where to find the module and stays narrow enough for
// the documentation page. The group is named, because not every view marks
// its module as active in time, such as the history.
const collapseNavigation = async (pageTree, menu) => {
  const hideTree = page.locator('typo3-backend-content-navigation-toggle[action="collapse"]');
  let clicked = false;
  if (!pageTree && await hideTree.isVisible()) {
    await hideTree.click();
    clicked = true;
  }
  const groups = page.locator('button[data-modulemenu-collapsible="true"]');
  for (let index = 0; index < await groups.count(); index++) {
    const group = groups.nth(index);
    // A narrow window hides the menu
    if (!await group.isVisible()) {
      continue;
    }
    const open = await group.getAttribute('aria-expanded') === 'true';
    const keep = (await group.innerText()).trim() === menu;
    if (open !== keep) {
      await group.click();
      clicked = true;
    }
  }
  // The clicked buttons would look selected. Without a click the focus
  // stays, as it can be part of the screenshot, such as the message of the
  // browser about an invalid field.
  if (clicked) {
    await page.evaluate(() => document.activeElement?.blur());
  }
};

// Tall, so that most pages fit without scrolling
const viewportHeight = 2000;

const browser = await chromium.launch();
// One logged in window per user, opened when a screenshot needs it
const windows = {};
const login = async (username) => {
  if (windows[username] === undefined) {
    const window = await browser.newPage({ viewport: { width: 1280, height: viewportHeight } });
    await window.goto(`${baseUrl}/typo3/`);
    await window.fill('#t3-username', username);
    await window.fill('#t3-password', password);
    await window.click('#t3-login-submit');
    await window.waitForURL(/\/typo3\/(main|module)/);
    windows[username] = window;
  }
  return windows[username];
};
let page;

const names = process.argv.length > 2 ? process.argv.slice(2) : Object.keys(screenshots);
for (const name of names) {
  const screenshot = screenshots[name];
  if (screenshot === undefined) {
    throw new Error(`Unknown screenshot "${name}"`);
  }
  page = await login(screenshot.user ?? defaultUser);
  await page.setViewportSize({
    width: screenshot.width ?? 1280,
    height: screenshot.height ?? viewportHeight,
  });
  await page.goto(screenshot.url);
  await page.waitForLoadState('networkidle');
  const frame = page.frame({ name: 'list_frame' });
  await frame.waitForLoadState('networkidle');
  // The backend remembers the last tab of a form, so a form opens the tab
  // that the screenshot names, or the first one
  const tab = frame.getByRole('tab', { name: screenshot.tab ?? 'General', exact: true });
  if (await tab.count() > 0) {
    await tab.click();
  }
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
  // The page tree and dialogs are outside of the module frame
  const scope = screenshot.outside ? page : frame;
  const boxes = [
    await scope.locator(screenshot.from).first().boundingBox(),
    screenshot.toOutside
      ? await page.locator(screenshot.toOutside).last().boundingBox()
      : await scope.locator(screenshot.to ?? screenshot.from).last().boundingBox(),
  ];
  const space = screenshot.margin ?? margin;
  const left = Math.max(Math.min(...boxes.map((box) => box.x)) - space - (screenshot.left ?? 0), 0);
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
