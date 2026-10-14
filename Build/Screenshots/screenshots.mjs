// Takes the backend screenshots of the Editors Tutorial from a running TYPO3
// instance with the demo site of the Camino theme.
//
// Usage: node screenshots.mjs [name ...]
// Without names, all screenshots are taken. A name is the path of the image
// below Documentation/Images/GeneratedScreenshots, without ".png". With DUMP
// set, the HTML of each screen is also written to var/, to look up selectors.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
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
const { root, unused, redirect, qrcode, shortUrl, websiteUsers, packingList, routeComparison, toiletries, extras, essentialItems, faqs, stories, story, map, author, office, shells, pilgrims, members, pleaseLogIn, loginForm, welcome } =
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

// Drags a content element of the Content > Layout module by its header and
// holds it over a drop zone, which the module shows during the drag, or
// over a page of the page tree, given by its uid. As in the page tree, the
// drag events come from the script, so nothing is dropped.
const dragContent = (uid, target) => async (frame) => {
  await frame.locator(`${contentElement(uid)} .t3js-page-ce-header[draggable="true"]`).first().evaluate((handle) => {
    window.screenshotDrag = new DataTransfer();
    const drag = { bubbles: true, composed: true, cancelable: true, view: window, dataTransfer: window.screenshotDrag };
    handle.dispatchEvent(new DragEvent('dragstart', drag));
    // Shows the drop zones of the module
    handle.dispatchEvent(new DragEvent('dragenter', drag));
  });
  await frame.page().waitForTimeout(300);
  // The page tree is outside of the module frame, but takes the same data
  const over = typeof target === 'number'
    ? frame.page().locator(`${treeNode(target)} .node-contentlabel`)
    : frame.locator(target);
  await over.evaluate((element) => {
    const data = window.screenshotDrag ?? document.querySelector('iframe[name="list_frame"]').contentWindow.screenshotDrag;
    const box = element.getBoundingClientRect();
    const drag = {
      bubbles: true, composed: true, cancelable: true, view: window, dataTransfer: data,
      clientX: box.x + Math.min(box.width / 2, 40),
      clientY: box.y + box.height / 2,
    };
    element.dispatchEvent(new DragEvent('dragenter', drag));
    element.dispatchEvent(new DragEvent('dragover', drag));
  });
  await frame.page().waitForTimeout(500);
};

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
// The input of a field: not the hidden one that holds the value, nor the
// disabled one that shows the default of a field without a value of its own
const input = (name) => `${field(name)} input[data-formengine-input-name]`;

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

// The Forms module, which lists the forms
const formsUrl = `${baseUrl}/typo3/module/form`;

// Creates a form with the "Create new form" wizard, up to the step named:
// "choose" (a blank or a predefined form), "settings" (the template and the
// name), "created" (the last step) or "editor" (the new form in the form
// editor)
const createForm = async (frame, template, name, until) => {
  await frame.getByRole('button', { name: 'Create new form' }).first().click();
  const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
  await dialog.waitFor();
  await frame.page().waitForTimeout(1000);
  // The radio button covers its label, which takes the click
  await dialog.locator('label:has-text("Predefined form")').click({ force: true });
  if (until === 'choose') {
    // The dialog focuses its close button, which would look selected
    await frame.page().evaluate(() => document.activeElement?.blur());
    return;
  }
  await dialog.getByRole('button', { name: /^Next/ }).click();
  await frame.page().waitForTimeout(1000);
  // The storage location keeps its default, the database
  await dialog.getByRole('button', { name: /^Next/ }).click();
  await frame.page().waitForTimeout(1000);
  // The label of a template can go on, such as "(ext:form example)"
  const select = dialog.locator('#new-form-template >> visible=true');
  const value = await select.evaluate((element, label) => [...element.options]
    .find((option) => option.textContent.trim().startsWith(label))?.value, template);
  await select.selectOption(value);
  const nameField = dialog.getByRole('textbox').first();
  await nameField.click();
  await frame.page().keyboard.type(name);
  await frame.page().waitForTimeout(500);
  if (until === 'settings') {
    return;
  }
  await dialog.getByRole('button', { name: /^Next/ }).click();
  await dialog.getByRole('button', { name: /^Finish/ }).waitFor();
  await frame.page().waitForTimeout(500);
  if (until === 'created') {
    return;
  }
  await dialog.getByRole('button', { name: /^Finish/ }).click();
  await frame.waitForURL(/form\/editor/);
  await frame.waitForLoadState('networkidle');
  await frame.page().waitForTimeout(1500);
};

// Opens a form in the form editor, and creates it first if an earlier
// screenshot has not
const openForm = async (frame, template, name) => {
  const link = frame.getByRole('link', { name, exact: true });
  if (await link.count() > 0) {
    await link.first().click();
    await frame.waitForURL(/form\/editor/);
    await frame.waitForLoadState('networkidle');
    await frame.page().waitForTimeout(1500);
    return;
  }
  await createForm(frame, template, name, 'editor');
};

// Adds a text field to the blank form, which is not saved
const addTextField = async (frame) => {
  await openForm(frame, 'Blank form', 'Talk to us');
  await frame.getByRole('button', { name: 'Create new element', exact: true }).first().click();
  const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
  await dialog.waitFor();
  await dialog.getByRole('button', { name: /^Text A single-line/ }).first().click();
  await frame.page().waitForTimeout(1500);
};

// The form definition of a form element, which is a field of its FlexForm
const formDefinition = 'role=combobox[name="Form definition"]';

// Creates a form element on the FAQs page with the contact form. The page
// is one of the Camino theme, which renders it in the frontend.
// Choosing the form asks whether to save: "Keep editing" or "Save and
// refresh".
const newFormElement = (answer) => async (frame) => {
  await openWizard('Form elements')(frame);
  await frame.page().locator('typo3-backend-modal dialog[open]').getByRole('button', { name: /^Form A form/ }).click();
  await frame.waitForURL(/record\/edit/);
  await frame.waitForLoadState('networkidle');
  await frame.locator(input('header')).first().fill('Get in touch');
  await frame.getByRole('tab', { name: 'Plugin', exact: true }).click();
  // The list names a form with its uid, "Get in touch (1)", after the
  // empty entry
  const select = frame.locator(formDefinition);
  const value = await select.locator('option', { hasText: /^Get in touch/ }).first().getAttribute('value');
  await select.selectOption(value);
  // The form asks to be saved and shown again with the settings of the form
  const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
  await dialog.waitFor();
  await dialog.getByRole('button', { name: answer }).click();
  // The closed dialog stays in the page for a while
  await frame.page().waitForTimeout(2000);
};

// The page tree, which is outside of the module frame
const pageTree = '#typo3-pagetree-tree .nodes-list';
const treeNode = (uid) => `#typo3-pagetree-tree .node[data-id="${uid}"]`;

// Opens the context menu of a page in the page tree
const openPageMenu = (uid) => async (frame) => {
  await frame.page().locator(`${treeNode(uid)} .node-contentlabel`).click({ button: 'right' });
  await frame.page().locator('.context-menu >> visible=true').first().waitFor();
  await frame.page().waitForTimeout(500);
  await frame.page().evaluate(() => document.activeElement?.blur());
};

// Opens the submenu "More options..." of the context menu of a page
const openMoreOptions = (uid) => async (frame) => {
  await openPageMenu(uid)(frame);
  await frame.page().locator('.context-menu >> visible=true').getByText('More options...').click();
  await frame.page().waitForTimeout(800);
};

// Drags a page of the page tree and holds it over a place: "before" the top
// edge of another page, "inside" another page, or "delete", the area that
// the dragged page shows on its right. The drag events come from the
// script, as a real drag would drop the page when the mouse is released.
const dragPage = (uid, place, target = uid) => async (frame) => {
  const window = frame.page();
  await window.locator(treeNode(uid)).evaluate((node) => {
    window.screenshotDrag = new DataTransfer();
    node.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, view: window, dataTransfer: window.screenshotDrag }));
  });
  // The page shows the delete area once the drag starts
  await window.waitForTimeout(300);
  const over = place === 'delete' ? `${treeNode(uid)} .node-dropzone-delete` : treeNode(target);
  await window.locator(over).evaluate((element, where) => {
    const box = element.getBoundingClientRect();
    const position = {
      // On the title of the page, or at the left of the delete area
      clientX: box.x + (where === 'delete' ? 12 : 120),
      clientY: where === 'before' ? box.y + 2 : box.y + box.height / 2,
    };
    element.dispatchEvent(new DragEvent('dragover', { bubbles: true, composed: true, cancelable: true, view: window, dataTransfer: window.screenshotDrag, ...position }));
  }, place);
  await window.waitForTimeout(500);
};

// Opens "Create multiple pages" for a page, through its context menu
const openCreateMultiple = async (frame) => {
  await openMoreOptions(root)(frame);
  await frame.page().locator('.context-menu').filter({ visible: true }).getByText('Create multiple pages').last().click();
  await frame.waitForLoadState('networkidle');
  await frame.getByRole('heading', { name: 'Create multiple pages' }).waitFor();
  await frame.page().waitForTimeout(500);
};

// The Records module of a page
const recordsUrl = (id) => moduleUrl('content/records', id);
// A record in the Records module, and its menu "More options..."
const recordRow = (table, uid) => `tr[data-table="${table}"][data-uid="${uid}"]`;
const openRecordOptions = (table, uid) => async (frame) => {
  await frame.locator(`${recordRow(table, uid)} button[title="More options..."]`).first().click();
  await frame.locator(`[id="actions_${table}_${uid}"]`).waitFor();
  await frame.page().waitForTimeout(300);
};
// Copies a record with its menu "More options..." in the Records module
const copyRecord = async (frame, table, uid) => {
  await openRecordOptions(table, uid)(frame);
  await frame.locator(`[id="actions_${table}_${uid}"]`).getByRole('button', { name: 'Copy' })
    .or(frame.locator(`[id="actions_${table}_${uid}"]`).getByRole('link', { name: 'Copy' })).first().click();
  await frame.waitForLoadState('networkidle');
  await frame.page().waitForTimeout(500);
};
// Answers the dialog that asks whether to paste
const confirmPaste = async (frame) => {
  const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
  await dialog.waitFor();
  await dialog.locator('button.btn-warning, button.btn-primary').last().click();
  await frame.page().waitForTimeout(2000);
};

// A number in an orange circle at the lower right of an element, for a
// screenshot whose text explains the numbered parts
// Below the right corner, or below the left one where a neighbour follows
// closely on the right. 'before' puts it left of the element, centered on
// its height, so that the numbers of a screenshot line up.
const badge = (locator, number, side = 'right') => locator.evaluate((element, [text, side]) => {
  const box = element.getBoundingClientRect();
  const position = side === 'before'
    ? { left: box.left - 32, top: box.top + box.height / 2 - 13 }
    : { left: side === 'left' ? box.left - 14 : box.right - 12, top: box.bottom - 6 };
  const circle = element.ownerDocument.createElement('span');
  // The crop takes in every circle, see below
  circle.className = 'screenshot-badge';
  circle.textContent = text;
  Object.assign(circle.style, {
    position: 'fixed', left: `${position.left}px`, top: `${position.top}px`, width: '26px', height: '26px',
    borderRadius: '50%', background: '#ff8700', color: '#fff', font: 'bold 15px sans-serif', zIndex: '10000',
    display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
  });
  element.ownerDocument.body.appendChild(circle);
}, [String(number), side]);

// The columns that the mass editing adds to the list of content elements:
// the field names, and the labels in the list
const massEditColumns = { subheader: 'Subheader', header_layout: 'Rank / Hierarchy' };

// Chooses the columns in the dialog "Show columns", and applies them
const chooseColumns = async (frame, apply) => {
  if (apply && await frame.locator('#t3-table-tt_content th', { hasText: massEditColumns.subheader }).count() > 0) {
    return;
  }
  await frame.locator('#t3-table-tt_content typo3-backend-column-selector-button').first().click();
  const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
  await dialog.waitFor();
  await frame.page().waitForTimeout(1000);
  const content = dialog.locator('iframe').count().then((count) => (count > 0 ? frame.page().frameLocator('typo3-backend-modal dialog[open] iframe') : dialog));
  const scope = await content;
  // The list filters on key strokes, not on a filled value
  await scope.getByRole('searchbox').first().pressSequentially('header');
  await frame.page().waitForTimeout(800);
  for (const column of Object.keys(massEditColumns)) {
    // The list of the dialog never counts as stable to Playwright
    await scope.locator(`#select-column-tt_content-${column}`).check({ force: true });
  }
  await frame.page().evaluate(() => document.activeElement?.blur());
  await frame.page().waitForTimeout(500);
  if (apply) {
    await dialog.getByRole('button', { name: 'Update' }).click();
    await frame.waitForLoadState('networkidle');
    await frame.page().waitForTimeout(1500);
  }
};

// Checks all content elements in the list
const checkAll = async (frame) => {
  await chooseColumns(frame, true);
  await frame.locator('#t3-table-tt_content .t3js-multi-record-selection-check-actions-toggle').first().click();
  await frame.locator('#t3-table-tt_content [data-multi-record-selection-check-action="check-all"]').first().click();
  await frame.page().mouse.move(0, 0);
  await frame.page().waitForTimeout(500);
};

// The Media module on the folder of the demo site. The module keeps the
// view per user, so every screenshot names it.
const mediaUrl = (view) => `${baseUrl}/typo3/module/file/list?id=1:/camino/&viewMode=${view}`;
// The button "View" of the Media module, and its menu
const viewButton = (frame) => frame.locator('.module-docheader button', { hasText: 'View' }).first();

// Drags a file of the Media module, or the selected files, and holds it over
// a folder of the folder tree. As in the page tree, the drag events come
// from the script, so nothing is moved. The tree opens a folder with
// subfolders after a second, and remembers that for later screenshots, so
// the timer stops before.
const dragFile = (index, folder) => async (frame) => {
  await frame.locator('[data-filelist-element][draggable="true"]').nth(index).evaluate((file) => {
    window.screenshotDrag = new DataTransfer();
    file.dispatchEvent(new DragEvent('dragstart', { bubbles: true, composed: true, cancelable: true, view: window, dataTransfer: window.screenshotDrag }));
  });
  await frame.page().waitForTimeout(300);
  await frame.page().locator('#typo3-filestoragetree-tree .node', { hasText: folder }).first().locator('.node-contentlabel').evaluate((label) => {
    const box = label.getBoundingClientRect();
    label.dispatchEvent(new DragEvent('dragover', {
      bubbles: true, composed: true, cancelable: true, view: window,
      dataTransfer: document.querySelector('iframe[name="list_frame"]').contentWindow.screenshotDrag,
      clientX: box.x + Math.min(box.width / 2, 40),
      clientY: box.y + box.height / 2,
    }));
    let tree = label;
    while (tree && !('openNodeTimeout' in tree)) {
      tree = tree.parentNode ?? tree.host;
    }
    clearTimeout(tree?.openNodeTimeout.timeout);
  });
  await frame.page().waitForTimeout(500);
};

// The button that adds a record in a module of the link management, and
// the form it opens
const addButton = (frame, name) => frame.locator('.module-docheader').getByRole('button', { name })
  .or(frame.locator('.module-docheader').getByRole('link', { name })).first();
const openNew = (name) => async (frame) => {
  await addButton(frame, name).click();
  await frame.waitForURL(/record\/edit/);
  await frame.waitForLoadState('networkidle');
  await frame.page().waitForTimeout(800);
};

// The modules of the link management
const linkUrl = (module) => `${baseUrl}/typo3/module/link-management${module ? `/${module}` : ''}`;

// The language menu at the top of the Layout module, and the translation
// wizard that it opens for a language
const languageMenu = (frame) => frame.locator('.module-docheader-navigation button.dropdown-toggle').last();
const openTranslation = (language) => async (frame) => {
  await languageMenu(frame).click();
  await frame.page().waitForTimeout(500);
  await frame.locator('.module-docheader .dropdown-menu >> visible=true').getByText(language).first().click();
  await frame.page().locator('typo3-backend-modal dialog[open]').waitFor();
  await frame.page().waitForTimeout(1500);
};
// Switches the Layout module to the languages next to each other
const viewModeButton = (frame) => frame.locator('.module-docheader-buttons button.dropdown-toggle').first();
// While the module still loads, a click can get lost, so it is repeated
// until the view shows the comparison
const showLanguageComparison = async (frame) => {
  for (let attempt = 0; attempt < 3; attempt++) {
    if ((await viewModeButton(frame).innerText()).includes('Language Comparison')) {
      break;
    }
    await viewModeButton(frame).click();
    const item = frame.locator('.module-docheader .dropdown-menu >> visible=true').getByText('Language Comparison').first();
    if (await item.waitFor({ timeout: 2000 }).then(() => true, () => false)) {
      await item.click();
    }
    await frame.waitForLoadState('networkidle');
    await frame.page().waitForTimeout(1500);
  }
};

// Goes through the translation wizard up to the step named
const translate = (language, until) => async (frame) => {
  await openTranslation(language)(frame);
  const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
  // The content selection, then the mode
  await dialog.getByRole('button', { name: /^Next/ }).click();
  await frame.page().waitForTimeout(1000);
  if (until === 'mode') {
    await frame.page().evaluate(() => document.activeElement?.blur());
    return;
  }
  for (let step = 0; step < 5; step++) {
    const localize = dialog.getByRole('button', { name: /^Localize/ });
    if (await localize.count() > 0) {
      await localize.click();
      break;
    }
    await dialog.getByRole('button', { name: /^Next/ }).click();
    await frame.page().waitForTimeout(1000);
  }
  await dialog.getByRole('button', { name: /^Finish/ }).click();
  await frame.waitForLoadState('networkidle');
  await frame.page().waitForTimeout(2000);
};

// Marks a button that the text names. A button in a group or a table cell
// is marked inside, as its neighbours would cut a frame around it.
const outline = (locator, inside = false) => locator.evaluate((element, inner) => {
  element.style.outline = '3px solid #ff8700';
  element.style.outlineOffset = inner ? '-3px' : '3px';
}, inside);

// The tooltip of an element with a title, below the pointer in its middle.
// The browser draws the tooltip outside of the page, where a screenshot does
// not reach, so the page shows the title in a box of its own instead.
const tooltip = (locator) => locator.evaluate((element) => {
  const box = element.getBoundingClientRect();
  const tip = element.ownerDocument.createElement('span');
  tip.textContent = element.title;
  Object.assign(tip.style, {
    position: 'fixed', top: `${box.top + box.height / 2 + 20}px`, padding: '3px 7px', zIndex: '10000',
    background: '#fff', color: '#1d1d1d', border: '1px solid #a3a3a3', borderRadius: '3px',
    font: '12px sans-serif', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
  });
  // Inside a dropdown, which the browser shows above everything else
  (element.closest('.dropdown-menu') ?? element.ownerDocument.body).appendChild(tip);
  // Like the browser, the tooltip moves left to fit into the window
  const width = tip.getBoundingClientRect().width;
  tip.style.left = `${Math.min(box.left + box.width / 2, window.innerWidth - width - 4)}px`;
});

// The menu of the user in the top bar, with the pointer on an item
const userMenu = (item) => ({
  url: moduleUrl('web/layout', packingList),
  prepare: async (frame) => {
    await frame.page().locator('#typo3-cms-backend-backend-toolbaritems-usertoolbaritem > button, .toolbar-item-avatar').first().click();
    await frame.page().waitForTimeout(500);
    await frame.page().getByRole('menuitem', { name: item }).or(frame.page().getByRole('link', { name: item })).first().hover();
    await frame.page().waitForTimeout(300);
  },
  hover: true,
  outside: true,
  from: '#typo3-cms-backend-backend-toolbaritems-usertoolbaritem',
  to: '#typo3-cms-backend-backend-toolbaritems-usertoolbaritem .dropdown-menu',
});

// The Share button at the top right of a module, and its menu, with the
// pointer on the item that copies the link
const shareButton = '.module-docheader button[title="Share"]';
const openShareMenu = async (frame) => {
  await frame.locator(shareButton).first().click();
  const copy = frame.locator('.module-docheader .dropdown-menu >> visible=true').getByText('Copy URL of this record').first();
  await copy.waitFor();
  await copy.hover();
};

// Adds the widget "Pages missing meta description" to the dashboard, which
// keeps it from then on
const seoWidget = (frame) => frame.locator('typo3-dashboard-widget').filter({ hasText: 'Pages missing meta description' });
const addSeoWidget = async (frame) => {
  if (await seoWidget(frame).count() === 0) {
    await frame.locator('.btn-dashboard-add-widget').click();
    const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
    await dialog.waitFor();
    await frame.page().waitForTimeout(1000);
    await dialog.getByText('SEO', { exact: true }).filter({ visible: true }).first().click();
    await dialog.getByRole('button', { name: /Pages missing meta description/ }).filter({ visible: true }).first().click();
    await frame.waitForLoadState('networkidle');
  }
  await seoWidget(frame).locator('table, ul, .widget-table').first().waitFor();
  await frame.page().waitForTimeout(1000);
};

// A tab of the User Settings module
const userSettings = (tab) => ({
  url: `${baseUrl}/typo3/module/user/setup`,
  user: 'e.doe',
  tab,
  // A wider margin would take in the heading above the tabs
  margin: 6,
  from: '[role="tablist"]',
  to: '.tab-pane.active',
});
// The top left of the backend in a theme, which the User Settings module
// sets. The whole backend reloads to show it.
const backendTheme = (theme) => ({
  url: `${baseUrl}/typo3/module/user/setup`,
  user: 'e.doe',
  tab: 'Backend appearance',
  prepare: async (frame) => {
    await frame.locator('select[name$="[user_settings__theme]"]').selectOption(theme);
    await frame.locator('button[name="data[save]"]').click();
    await frame.waitForLoadState('networkidle');
    await frame.page().goto(moduleUrl('web/layout', packingList));
    await frame.page().waitForLoadState('networkidle');
    await frame.page().waitForTimeout(1000);
  },
  window: true,
  pageTree: true,
  clip: { width: 440, height: 440 },
});

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
  // The parts of the module that the overview lists, numbered. Erika Doe
  // may not edit the element with the map, so it has no buttons.
  'ContentElements/PageModuleOverview': {
    user: 'e.doe',
    url: moduleUrl('web/layout', stories),
    prepare: async (frame) => {
      await badge(frame.locator('.t3-page-column-header-icons a').first(), 1, 'before');
      await badge(frame.locator('typo3-backend-new-content-element-wizard-button').first(), 2, 'before');
      await badge(frame.locator(`${contentElement(story)} .t3-page-ce-header-left`), 3, 'before');
      await badge(frame.locator(`${contentElement(story)} .t3-page-ce-header-right .btn-group`), 4, 'before');
      await badge(frame.locator(`${contentElement(map)} .t3-page-ce-header-left`), 5, 'before');
    },
    from: '.t3-page-column-header >> nth=0',
    to: contentElement(map),
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
  // Moving a content element by drag and drop, and the unused element back
  // into the content area
  'ContentElements/MoveContentElement': {
    url: moduleUrl('web/layout', packingList),
    width: 1440,
    prepare: dragContent(toiletries, faqs),
    window: true,
    pageTree: true,
    height: 900,
  },
  'ContentElements/MoveUnusedContent': {
    url: moduleUrl('web/layout', faqs),
    prepare: dragContent(unused, `${column(0)} .t3js-page-ce-dropzone-available >> nth=-1`),
    // The last element of the content area, with the drop zone below it
    from: `${column(0)} .t3js-page-ce[data-uid] >> nth=-1`,
    to: contentElement(unused),
    include: ['.dragging-tooltip'],
    // The module scrolls during a drag near the bottom of the window, but
    // the tooltip stays where the drag was. In a window taller than the
    // page, the module cannot scroll.
    height: 4000,
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
    // The module frame has rounded corners, a margin would show the menu
    margin: 0,
    from: '.module-docheader',
    to: `${field('header_layout')}`,
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
    // The module frame has rounded corners, a margin would show the menu
    margin: 0,
    from: '.module-docheader',
    to: field('header'),
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
  // An error after saving, which only the saving request causes, see
  // create-records.php
  'ContentElements/ErrorMessage': {
    url: editUrl('tt_content', story),
    prepare: async (frame) => {
      await frame.page().route((url) => url.pathname === '/typo3/record/edit', (route) => route.continue(
        route.request().method() === 'POST'
          ? { headers: { ...route.request().headers(), 'x-screenshot': 'save-error' } }
          : {},
      ));
      await frame.getByRole('button', { name: 'Save' }).first().click();
      await frame.locator('.trace-head').first().waitFor();
      await frame.page().unrouteAll();
    },
    // The error, without the help and the trace around it. The page lists
    // two more errors below, which caused the first one.
    from: '.trace-head >> nth=0',
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
      // The tree shows the site, but not its pages, unless an earlier
      // screenshot opened them: the state of the tree is kept per user
      const closed = browser.locator('.node[aria-expanded="false"]', { hasText: 'Camino' }).locator('.node-toggle');
      if (await closed.count() > 0) {
        await closed.first().click();
      }
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
  // The thumbnail at the top of the chapter about images
  'ContentElements/Images': {
    url: moduleUrl('web/layout', stories),
    prepare: openWizard('Typical page content'),
    outside: true,
    from: 'typo3-backend-modal dialog[open] >> role=button[name=/^Images Only/]',
  },
  'ContentElements/TextWithImage/ImagesTab': {
    url: editUrl('tt_content', shells),
    tab: 'Images',
    from: 'h1',
    // Down to the image that the element already has
    to: '.form-irre-object >> nth=0',
  },
  'ContentElements/TextWithImage/FileSelector': {
    url: editUrl('tt_content', shells),
    tab: 'Images',
    prepare: async (frame) => {
      await frame.getByRole('button', { name: 'Add image' }).first().click();
      const selector = frame.page().frameLocator('typo3-backend-modal dialog[open] iframe');
      await selector.getByText('camino', { exact: true }).filter({ visible: true }).first().click({ force: true });
      await frame.page().waitForTimeout(1500);
      // Two images marked, to import them at once. A tile shows its
      // checkbox only while the mouse is over it.
      for (const index of [0, 1]) {
        const tile = selector.locator('.resource-tile').nth(index);
        await tile.hover();
        await tile.locator('input[type="checkbox"]').check();
      }
      await frame.page().mouse.move(0, 0);
      // The checked tile has the focus, which would look different
      await selector.locator('body').evaluate(() => document.activeElement?.blur());
      await frame.page().waitForTimeout(500);
    },
    ...linkBrowserSize,
  },
  'ContentElements/TextWithImage/ImageMetaData': {
    url: editUrl('tt_content', shells),
    tab: 'Images',
    prepare: async (frame) => {
      // The image record opens when its header is clicked
      await frame.locator('.form-irre-object .panel-button').first().click();
      await frame.locator(field('alternative')).first().waitFor();
      await frame.locator(`${field('alternative')} input[type="checkbox"]`).first().check();
      await frame.locator(input('alternative')).first().fill('Scallop shells hanging in a pilgrim shop');
      await frame.locator('h1').first().click();
      await frame.page().waitForTimeout(500);
    },
    from: '[role="tablist"]',
    to: field('alternative'),
  },
  'ContentElements/TextWithImage/MediaAdjustments': {
    url: editUrl('tt_content', shells),
    tab: 'Images',
    prepare: async (frame) => {
      await frame.locator(`${field('imagewidth')} input[type="checkbox"]`).first().check();
      await frame.locator(input('imagewidth')).first().fill('250');
      await frame.locator(`${field('imageborder')} input[type="checkbox"]`).first().check();
      await frame.locator('h1').first().click();
      await frame.page().waitForTimeout(500);
    },
    from: 'text=Media Adjustments',
    to: field('imageborder'),
  },
  'ContentElements/TextWithImage/FileList': {
    url: `${baseUrl}/typo3/module/file/list?id=1:/camino/`,
    window: true,
    pageTree: true,
    menu: 'Media',
    prepare: async (frame) => {
      await frame.getByRole('button', { name: 'View' }).first().click();
      await frame.page().waitForTimeout(500);
    },
    until: '.resource-tile >> nth=0',
  },
  // A picture dragged to a folder
  'ContentElements/TextWithImage/FileListDragAndDrop': {
    url: mediaUrl('tiles'),
    window: true,
    pageTree: true,
    menu: 'Media',
    prepare: dragFile(1, 'userupload'),
    until: '.resource-tile >> nth=0',
  },
  'ContentElements/TextWithImage/FileNotDeleted': {
    url: `${baseUrl}/typo3/module/file/list?id=1:/camino/&viewMode=list`,
    menu: 'Media',
    prepare: async (frame) => {
      // The image of the text above, which is still in use
      await frame.locator('tr', { hasText: 'bernard-wortelboer' }).locator('a[title="Delete"], button[title="Delete"]').first().click();
      const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
      await dialog.waitFor();
      await dialog.getByRole('button', { name: /^Yes, delete/ }).click();
      await frame.waitForLoadState('networkidle');
      await frame.page().waitForTimeout(1500);
    },
    from: '.alert-warning, .callout-warning',
  },
  // The thumbnail at the top of the chapter about videos
  'ContentElements/TextAndMedia': {
    url: moduleUrl('web/layout', stories),
    prepare: openWizard('Typical page content'),
    outside: true,
    from: 'typo3-backend-modal dialog[open] >> role=button[name=/^Text & Media/]',
  },
  'ContentElements/Media': {
    url: editUrl('tt_content', story),
    tab: 'Media',
    from: '[role="tablist"]',
    // Down to the list of the allowed file extensions and platforms
    to: '.badge-list >> nth=0',
  },
  // The forms, in the order of the steps of the chapter. Without forms,
  // the module explains how to create the first one.
  'Forms/FormCreateNew': {
    url: formsUrl,
    window: true,
    prepare: async (frame) => {
      await outline(frame.getByRole('button', { name: 'Create new form' }).first());
    },
    until: '.callout-info',
  },
  'Forms/FormsSettingsStep1': {
    url: formsUrl,
    prepare: (frame) => createForm(frame, 'Simple contact form', 'Get in touch', 'choose'),
    modal: true,
    width: 1024,
    height: 600,
  },
  'Forms/FormsSettingsStep2': {
    url: formsUrl,
    prepare: (frame) => createForm(frame, 'Simple contact form', 'Get in touch', 'settings'),
    modal: true,
    width: 1024,
    height: 600,
  },
  // Creates the contact form, which the screenshots below use
  'Forms/FormsSettingsStep3': {
    url: formsUrl,
    prepare: (frame) => createForm(frame, 'Simple contact form', 'Get in touch', 'created'),
    modal: true,
    width: 1024,
    height: 600,
  },
  'Forms/FormsNewForm': {
    // Wide, so that the form editor shows its settings next to the form
    width: 1800,
    height: 900,
    url: formsUrl,
    prepare: (frame) => openForm(frame, 'Simple contact form', 'Get in touch'),
    window: true,
    // The tree of the form elements, in the place of the page tree
    pageTree: true,
  },
  // Creates the blank form, which the screenshots below use
  'FormsBlank/FormsBlankForm': {
    width: 1800,
    height: 600,
    url: formsUrl,
    prepare: (frame) => openForm(frame, 'Blank form', 'Talk to us'),
    window: true,
    pageTree: true,
  },
  'FormsBlank/FormsNewElement': {
    url: formsUrl,
    prepare: async (frame) => {
      await openForm(frame, 'Blank form', 'Talk to us');
      await frame.getByRole('button', { name: 'Create new element', exact: true }).first().click();
      await frame.page().locator('typo3-backend-modal dialog[open]').waitFor();
      await frame.page().waitForTimeout(1000);
      await frame.page().evaluate(() => document.activeElement?.blur());
      // The mouse is still where the button was, over an element type
      await frame.page().mouse.move(0, 0);
    },
    modal: true,
    width: 1280,
    height: 900,
  },
  'FormsBlank/FormsFieldSettings': {
    width: 1800,
    height: 900,
    url: formsUrl,
    prepare: (frame) => addTextField(frame),
    window: true,
    pageTree: true,
  },
  'FormsBlank/FormsPreview': {
    width: 1800,
    height: 700,
    url: formsUrl,
    prepare: async (frame) => {
      await addTextField(frame);
      await frame.getByRole('button', { name: 'Preview mode' }).first().click();
      await frame.page().waitForTimeout(1500);
    },
    window: true,
    pageTree: true,
  },
  'Forms/FormsFinishers': {
    width: 1800,
    url: formsUrl,
    prepare: async (frame) => {
      await openForm(frame, 'Simple contact form', 'Get in touch');
      // A screenshot cannot show the native list of a select, so the select
      // shows its items as a list box instead
      await frame.locator('.formeditor-inspector select:has(option:text-is("Add finisher"))').first()
        .evaluate((select) => { select.size = select.options.length; });
    },
    from: '.formeditor-inspector-content',
    to: '.formeditor-inspector select:has(option:text-is("Add finisher"))',
  },
  // The thumbnail at the top of the chapter about forms
  'ContentElements/ContactForm': {
    url: moduleUrl('web/layout', stories),
    prepare: openWizard('Form elements'),
    outside: true,
    from: 'typo3-backend-modal dialog[open] >> role=button[name=/^Form A form/]',
  },
  'Forms/FormsFormDefinition': {
    url: moduleUrl('web/layout', faqs),
    prepare: newFormElement('Keep editing'),
    from: '[role="tablist"]',
    to: formDefinition,
  },
  // Saves a form element on the FAQs page and shows it in the frontend:
  // near the end, as the element stays on the page
  'Forms/FormOutput': {
    url: moduleUrl('web/layout', faqs),
    prepare: async (frame) => {
      await newFormElement('Save and refresh')(frame);
      await frame.getByRole('button', { name: 'Delete' }).first().waitFor();
    },
    frontend: `${baseUrl}/camino/faqs`,
    frontendElement: 'form',
  },
  // The login, in a window without a session
  'Login/BackendLoginPage': {
    loggedOut: true,
    url: `${baseUrl}/typo3/`,
    prepare: async (page) => {
      await page.fill('#t3-username', 'j.doe');
      await page.fill('#t3-password', password);
      await page.locator('h1, .card-login').first().click({ position: { x: 5, y: 5 } });
    },
    from: '.card-login',
  },
  'Login/ForgotPasswordEmail': {
    loggedOut: true,
    url: `${baseUrl}/typo3/`,
    prepare: async (page) => {
      await page.getByRole('link', { name: 'Forgot your password?' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('textbox').first().fill('j.doe@example.org');
      await page.locator('.card-login').first().click({ position: { x: 5, y: 5 } });
    },
    from: '.card-login',
  },
  // The menu of the user in the top bar, as on the page about user settings
  'UserSettings/UserSettingsModule': userMenu('User Settings'),
  // The chapter about the help within TYPO3
  'HelpInside/OnlineDocumentation': userMenu('TYPO3 Online Documentation'),
  // The tooltip of the switch between light and dark mode in the user menu
  'HelpInside/Tooltip': {
    ...userMenu('TYPO3 Online Documentation'),
    prepare: async (frame) => {
      await userMenu('TYPO3 Online Documentation').prepare(frame);
      const toggle = frame.page().locator('typo3-backend-color-scheme-switch button[title]').first();
      await toggle.hover();
      await tooltip(toggle);
    },
  },
  'HelpInside/BackendSearch': {
    url: moduleUrl('web/layout', packingList),
    prepare: async (frame) => {
      const button = frame.page().locator('.t3js-topbar-button-search:visible').first();
      await outline(button);
      // The search shows a tip picked at random. It opens until it shows
      // the tip about the keystroke, which the text names as well.
      for (let attempt = 0; attempt < 30; attempt++) {
        await button.click();
        const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
        await dialog.waitFor();
        await frame.page().waitForTimeout(500);
        if ((await dialog.innerText()).includes('keystroke')) {
          break;
        }
        // The search keeps the text of the last search, which Escape
        // would clear instead of closing the dialog
        await dialog.getByRole('button', { name: 'Close' }).first().click();
        await dialog.waitFor({ state: 'detached' });
      }
      const search = frame.page().locator('typo3-backend-modal dialog[open] input[type="search"]');
      await search.fill('packing');
      await frame.page().waitForTimeout(1500);
      // The dialog would cover the button, so it moves down below the
      // top bar, and the shade behind the dialog leaves out the button
      const box = await button.boundingBox();
      await frame.page().locator('typo3-backend-modal dialog[open]').evaluate((dialog, button) => {
        dialog.style.transform = `translateY(${button.y + button.height + 16 - dialog.getBoundingClientRect().top}px)`;
        const x = button.x - 8;
        const y = button.y - 8;
        const style = dialog.ownerDocument.createElement('style');
        style.textContent = `dialog[open]::backdrop { clip-path: path(evenodd, "M0 0 H${innerWidth} V${innerHeight} H0 Z M${x} ${y} h${button.width + 16} v${button.height + 16} h-${button.width + 16} Z"); }`;
        dialog.ownerDocument.head.append(style);
      }, box);
    },
    // The whole backend, as the button is in the top bar
    window: true,
    height: 760,
  },
  // The internal note on the page, and the button that creates one
  'HelpInside/PageWithInternalNote': {
    url: moduleUrl('web/layout', routeComparison),
    margin: 0,
    from: '.module-docheader',
    to: '.note-list',
  },
  'HelpInside/CreateInternalNote': {
    url: moduleUrl('web/layout', routeComparison),
    prepare: async (frame) => {
      await outline(frame.locator('.module-docheader a[href*="sys_note"]').first());
    },
    margin: 0,
    from: '.module-docheader',
  },
  // Fields that the keyboard commands work in: a multiple selection and a
  // list of records. The new record is not saved.
  'HelpInside/SelectMultipleSideBySide': {
    url: editUrl('fe_users', 1),
    from: field('usergroup'),
  },
  'HelpInside/Group': {
    url: `${baseUrl}/typo3/record/edit?edit[tt_content][${stories}]=new&defVals[tt_content][CType]=shortcut`
      + `&defVals[tt_content][records]=tt_content_${toiletries},tt_content_${extras},tt_content_${essentialItems}`,
    from: field('records'),
  },
  // The page about the cache: the button of the module, and the menu of the
  // top bar, with the pointer on the frontend caches
  'Cache/ClearPageCache': {
    url: moduleUrl('web/layout', packingList),
    prepare: async (frame) => {
      await outline(frame.locator('.module-docheader [title="Clear cache for this page"]').first());
    },
    window: true,
    pageTree: true,
    clip: { width: 1280, height: 300 },
  },
  'Cache/ClearAllPageCaches': {
    url: moduleUrl('web/layout', packingList),
    prepare: async (frame) => {
      const item = frame.page().locator('#typo3-cms-backend-backend-toolbaritems-clearcachetoolbaritem');
      await item.locator('button, a').first().click();
      const flush = item.getByText('Flush frontend caches').first();
      await flush.waitFor();
      await flush.hover();
    },
    hover: true,
    window: true,
    pageTree: true,
    clip: { width: 1280, height: 300 },
  },
  // The chapter about pages. The page tree is outside of the module frame.
  'PageTree/PageCreateDragDrop': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: async (frame) => {
      // Inside the icon: the toolbar would cut a frame around it
      await frame.page().locator('.tree-toolbar__drag-node[data-node-type="1"]').evaluate((element) => {
        element.style.outline = '2px solid #ff8700';
        element.style.outlineOffset = '-2px';
      });
    },
    outside: true,
    // The page tree has rounded corners, a full margin would show the menu
    margin: 6,
    from: '#typo3-pagetree-toolbar',
    to: pageTree,
  },
  'PageTree/PageInsertSubpage': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: async (frame) => {
      await frame.page().locator('.tree-toolbar__submenu-items button', { hasText: 'Page' }).first().click();
      await frame.page().locator('typo3-backend-modal dialog[open]').waitFor();
      await frame.page().waitForTimeout(1500);
      await frame.page().evaluate(() => document.activeElement?.blur());
    },
    modal: true,
    width: 1024,
    height: 650,
  },
  'PageTree/PageCreateContextMenu': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: async (frame) => {
      await openPageMenu(root)(frame);
      await frame.page().locator('.context-menu >> visible=true').getByText('New subpage').hover();
    },
    hover: true,
    outside: true,
    // The page tree has rounded corners, a full margin would show the menu
    margin: 6,
    from: '#typo3-pagetree-toolbar',
    to: '.context-menu >> visible=true',
  },
  'PageProperties/Visibility': {
    url: editUrl('pages', packingList),
    tab: 'Access',
    from: 'text=Visibility',
    to: field('nav_hide'),
  },
  'PageTree/PageActions': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: openMoreOptions(packingList),
    hover: true,
    outside: true,
    margin: 6,
    from: treeNode(root),
    to: '.context-menu >> visible=true >> nth=-1',
  },
  'PageTree/PageTreeFilter': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: async (frame) => {
      await frame.page().locator('#toolbarSearch').fill('packing');
      await frame.page().waitForTimeout(1500);
    },
    outside: true,
    // The page tree has rounded corners, a full margin would show the menu
    margin: 6,
    from: '#typo3-pagetree-toolbar',
    to: pageTree,
  },
  // Moving, nesting, and deleting a page by drag and drop
  'PageTree/CopyMovePage': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: dragPage(stories, 'before', faqs),
    outside: true,
    margin: 6,
    from: '#typo3-pagetree-toolbar',
    to: pageTree,
    include: ['.dragging-tooltip'],
  },
  'PageTree/CopyMoveChildPage': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: dragPage(stories, 'inside', faqs),
    outside: true,
    margin: 6,
    from: '#typo3-pagetree-toolbar',
    to: pageTree,
    include: ['.dragging-tooltip'],
  },
  'PageTree/DeletePage': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: dragPage(stories, 'delete'),
    outside: true,
    margin: 6,
    from: '#typo3-pagetree-toolbar',
    to: pageTree,
    include: ['.dragging-tooltip'],
  },
  'PageTree/MultiplePagesContextMenu': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: async (frame) => {
      await openMoreOptions(root)(frame);
      await frame.page().locator('.context-menu').filter({ visible: true }).getByText('Create multiple pages').last().hover();
    },
    hover: true,
    outside: true,
    margin: 6,
    from: treeNode(root),
    to: '.context-menu >> visible=true >> nth=-1',
  },
  'Page/MultiplePagesCreatePages': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: openCreateMultiple,
    from: 'h1',
    // Down to the second page, as the list goes on below
    to: 'input[placeholder="Title"] >> visible=true >> nth=1',
  },
  'Page/MultiplePagesConfigure': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: openCreateMultiple,
    // The last of the five pages, down to the buttons
    from: '#form-line-4',
    to: 'input[type="reset"]',
  },
  'Page/EditPageProperties': {
    url: moduleUrl('web/layout', packingList),
    window: true,
    pageTree: true,
    prepare: async (frame) => {
      await outline(frame.getByRole('button', { name: 'Edit page properties' }).or(frame.getByRole('link', { name: 'Edit page properties' })).first());
    },
    until: 'h1',
  },
  'Page/RecalculateSlug': {
    url: editUrl('pages', packingList),
    from: 'text=Title',
    to: field('slug'),
  },
  'Page/RecalculateSlugToggle': {
    url: editUrl('pages', packingList),
    prepare: async (frame) => {
      await frame.locator(`${field('slug')} button`).first().click();
      const slug = frame.locator(`${field('slug')} input[type="text"]:not([readonly])`).first();
      await slug.fill('/packing-list/what-to-bring');
      await frame.page().keyboard.press('Tab');
      await frame.page().waitForTimeout(1500);
    },
    from: 'text=Title',
    // The message where the page will be reachable
    to: '.t3js-form-proposal-accepted',
  },
  'Page/BackendLayout': {
    url: editUrl('pages', packingList),
    tab: 'Appearance',
    from: '[role="tablist"]',
    to: field('backend_layout_next_level'),
  },
  'Page/RecordInformation': {
    url: editUrl('pages', packingList),
    tab: 'Notes',
    prepare: async (frame) => {
      await frame.locator(`${field('rowDescription')} textarea`).first().fill('When working on this page, please talk to Erika first.');
      await frame.locator('h1').first().click();
      await frame.page().waitForTimeout(500);
    },
    from: '[role="tablist"]',
    to: field('rowDescription'),
  },
  // Saves a new URL segment, near the end: the page keeps it
  'Page/RedirectCreated': {
    url: editUrl('pages', routeComparison),
    prepare: async (frame) => {
      await frame.locator(`${field('slug')} button`).first().click();
      const slug = frame.locator(`${field('slug')} input[type="text"]:not([readonly])`).first();
      await slug.fill('/routes');
      await frame.page().keyboard.press('Tab');
      await frame.getByRole('button', { name: 'Save' }).first().click();
      await frame.page().locator('typo3-notification-message, .alert-notification').first().waitFor();
      await frame.page().waitForTimeout(800);
    },
    outside: true,
    // The notification of the saved record follows right below
    margin: 4,
    from: 'typo3-notification-message >> nth=0',
  },
  // The Records module, on the folder of the website users
  'ListModule/ListModule': {
    url: recordsUrl(websiteUsers),
    window: true,
    pageTree: true,
    prepare: async (frame) => {
      const buttons = [
        frame.getByRole('button', { name: 'Create new record' }),
        frame.getByRole('button', { name: 'Edit page properties' }),
        frame.locator('.module-docheader button', { hasText: 'View' }),
        frame.locator('[title="Clear cache for this page"]'),
        frame.locator('.module-docheader a[href*="sys_note"]'),
        frame.locator('.module-docheader [title="Reload"]'),
        frame.locator('.module-docheader [title="Share"]'),
      ];
      for (const [index, button] of buttons.entries()) {
        await badge(button.first(), index + 1);
      }
    },
    until: `${recordRow('fe_groups', 2)}`,
  },
  'ListModule/ActionIcons': {
    url: recordsUrl(websiteUsers),
    prepare: async (frame) => {
      // Inside the cell: the list would cut a frame around it
      await frame.locator(`${recordRow('fe_users', 2)} td.col-control`).first().evaluate((cell) => {
        cell.style.outline = '3px solid #ff8700';
        cell.style.outlineOffset = '-3px';
      });
    },
    from: '#t3-table-fe_users',
  },
  // Copying and pasting, on the Pilgrim stories page
  'ListModule/CopyRecord': {
    url: recordsUrl(stories),
    prepare: openRecordOptions('tt_content', story),
    from: '#t3-table-tt_content',
    to: `[id="actions_tt_content_${story}"]`,
  },
  'ListModule/PasteRecord': {
    url: recordsUrl(stories),
    prepare: async (frame) => {
      await copyRecord(frame, 'tt_content', story);
      await openRecordOptions('tt_content', map)(frame);
      await badge(frame.locator('.module-docheader').getByRole('button', { name: /^Paste/ })
        .or(frame.locator('.module-docheader').getByRole('link', { name: /^Paste/ })).first(), 1);
      await badge(frame.locator(`[id="actions_tt_content_${map}"]`).getByText(/Paste after/).first(), 2);
    },
    // The module frame has rounded corners, a margin would show the menu
    margin: 0,
    from: '.module-docheader',
    to: `[id="actions_tt_content_${map}"]`,
  },
  // Pastes a website group on a page that cannot hold it: nothing is saved
  'ListModule/RecordOnPageError': {
    url: recordsUrl(websiteUsers),
    prepare: async (frame) => {
      await copyRecord(frame, 'fe_groups', 1);
      await frame.goto(frame.url().replace(/id=\d+/, `id=${stories}`));
      await frame.waitForLoadState('networkidle');
      await frame.locator('.module-docheader').getByRole('button', { name: /^Paste/ })
        .or(frame.locator('.module-docheader').getByRole('link', { name: /^Paste/ })).first().click();
      await confirmPaste(frame);
    },
    // The module frame has rounded corners, a margin would show the menu
    margin: 0,
    from: '.module-docheader',
    to: '.alert-danger, .callout-danger',
  },
  // The advanced clipboard, as the common editor: a chosen clipboard stays
  // chosen, which would change the copying of the screenshots above
  'ListModule/Clipboard/ChooseClipboard': {
    user: 'e.doe',
    url: recordsUrl(websiteUsers),
    prepare: async (frame) => {
      await frame.locator('button[data-action="setP"]', { hasText: 'Clipboard #1' }).click();
      await frame.locator('button[data-action="setP"][aria-checked="true"]', { hasText: 'Clipboard #1' }).waitFor();
      await frame.waitForLoadState('networkidle');
      // The clicked choice would look hovered
      await frame.page().mouse.move(0, 0);
      await frame.page().evaluate(() => document.activeElement?.blur());
      await frame.page().waitForTimeout(800);
    },
    // The module frame has rounded corners, a margin would show the menu
    margin: 0,
    from: '.module-docheader',
    to: 'text=Clipboard #3',
  },
  'ListModule/Clipboard/ClipboardMultipleItems': {
    user: 'e.doe',
    url: recordsUrl(websiteUsers),
    prepare: async (frame) => {
      await frame.locator('button[data-action="setP"]', { hasText: 'Clipboard #1' }).click();
      await frame.locator('button[data-action="setP"][aria-checked="true"]', { hasText: 'Clipboard #1' }).waitFor();
      await frame.waitForLoadState('networkidle');
      // A transfer reloads the module, so each list is marked and
      // transferred on its own
      const lists = [['fe_groups', [1]], ['fe_users', [1, 2]]];
      for (const [table, uids] of lists) {
        await frame.page().waitForTimeout(1000);
        for (const uid of uids) {
          await frame.locator(`${recordRow(table, uid)} input[type="checkbox"]`).first().check();
        }
        // Only the list with marked records shows its buttons
        await frame.getByRole('button', { name: 'Transfer to clipboard' }).filter({ visible: true }).first().click();
        await frame.waitForLoadState('networkidle');
      }
      await frame.page().waitForTimeout(1000);
    },
    from: '.panel:has(button[data-action="setP"])',
  },
  // As the common editor and after the clipboard: the search stays shown,
  // which would change the screenshots of the administrator
  'ListModule/SearchRecord': {
    user: 'e.doe',
    url: recordsUrl(websiteUsers),
    prepare: async (frame) => {
      await frame.locator('.module-docheader button', { hasText: 'View' }).first().click();
      await frame.getByRole('link', { name: 'Show search' }).or(frame.getByRole('button', { name: 'Show search' })).first().click();
      await frame.waitForLoadState('networkidle');
      const search = frame.locator('input[name="searchTerm"], input[type="search"]').first();
      await search.fill('rosa');
      await search.press('Enter');
      await frame.waitForLoadState('networkidle');
      await frame.page().waitForTimeout(800);
    },
    // The module frame has rounded corners, a margin would show the menu
    margin: 0,
    from: '.module-docheader',
    to: '#recordlist-fe_users',
  },
  'ListModule/Clipboard/PasteClipboard': {
    url: recordsUrl(websiteUsers),
    prepare: async (frame) => {
      await copyRecord(frame, 'fe_users', 2);
      await outline(frame.locator('.module-docheader').getByRole('button', { name: /^Paste/ })
        .or(frame.locator('.module-docheader').getByRole('link', { name: /^Paste/ })).first());
    },
    // The module frame has rounded corners, a margin would show the menu
    margin: 0,
    from: '.module-docheader',
  },
  // Pastes a copy of a content element and of a website user, near the
  // end: both stay
  'ListModule/CopyOfRecord': {
    url: recordsUrl(stories),
    prepare: async (frame) => {
      await copyRecord(frame, 'tt_content', story);
      await openRecordOptions('tt_content', story)(frame);
      await frame.locator(`[id="actions_tt_content_${story}"]`).getByText(/Paste after/).first().click();
      await confirmPaste(frame);
      await frame.waitForLoadState('networkidle');
    },
    from: '#t3-table-tt_content',
  },
  'ListModule/RecordUnique': {
    url: recordsUrl(websiteUsers),
    prepare: async (frame) => {
      await copyRecord(frame, 'fe_users', 1);
      await frame.locator('.module-docheader').getByRole('button', { name: /^Paste/ })
        .or(frame.locator('.module-docheader').getByRole('link', { name: /^Paste/ })).first().click();
      await confirmPaste(frame);
      await frame.waitForLoadState('networkidle');
    },
    from: '.alert-warning, .callout-warning',
    to: '#recordlist-fe_users',
  },
  // The chapter about the Media module
  'MediaModule/TileView': {
    url: mediaUrl('tiles'),
    window: true,
    pageTree: true,
    menu: 'Media',
    prepare: async (frame) => {
      const tile = frame.locator('.resource-tile').nth(1);
      await tile.hover();
      await tile.locator('input[type="checkbox"]').check();
      await frame.page().mouse.move(0, 0);
      await outline(viewButton(frame));
    },
    until: '.resource-tile >> nth=0',
  },
  'MediaModule/ListView': {
    // Wide, so that the list shows all its columns next to the page tree
    width: 1440,
    url: mediaUrl('list'),
    window: true,
    pageTree: true,
    menu: 'Media',
    prepare: async (frame) => {
      await viewButton(frame).click();
      await frame.page().waitForTimeout(500);
      await outline(frame.locator('.module-docheader .dropdown-menu >> visible=true').getByText('List', { exact: true }).first());
    },
    until: 'tr[data-filelist-type="file"] >> nth=2',
  },
  // A selected file dragged to a folder of the folder tree
  'MediaModule/DragDropMove': {
    width: 1440,
    url: mediaUrl('list'),
    window: true,
    pageTree: true,
    menu: 'Media',
    prepare: async (frame) => {
      await frame.locator('tr[data-filelist-type="file"]').nth(1).locator('input[type="checkbox"]').check();
      await frame.page().mouse.move(0, 0);
      await dragFile(1, 'userupload')(frame);
    },
    until: 'tr[data-filelist-type="file"] >> nth=2',
  },
  // As the common editor: a chosen clipboard stays chosen
  'MediaModule/Clipboard': {
    user: 'e.doe',
    // Wide, so that the files take few rows above the clipboard
    width: 1800,
    url: mediaUrl('tiles'),
    window: true,
    pageTree: true,
    menu: 'Media',
    prepare: async (frame) => {
      const pad = frame.locator('button[data-action="setP"]', { hasText: 'Clipboard #1' });
      if (await pad.getAttribute('aria-checked') !== 'true') {
        await pad.click();
        await frame.waitForLoadState('networkidle');
      }
      await frame.page().waitForTimeout(1000);
      const tile = frame.locator('.resource-tile').nth(1);
      await tile.hover();
      await tile.locator('input[type="checkbox"]').check();
      await frame.getByRole('button', { name: 'Transfer to clipboard' }).filter({ visible: true }).first().click();
      await frame.waitForLoadState('networkidle');
      await frame.page().waitForTimeout(1000);
      await viewButton(frame).click();
      await frame.page().waitForTimeout(500);
      await outline(frame.locator('.module-docheader .dropdown-menu >> visible=true').getByText('Show clipboard').first());
    },
    until: 'text=Clipboard #3',
  },
  'MediaModule/CreateFolder': {
    url: mediaUrl('tiles'),
    prepare: async (frame) => {
      await frame.locator('.module-docheader').getByRole('button', { name: 'New Folder' })
        .or(frame.locator('.module-docheader').getByRole('link', { name: 'New Folder' })).first().click();
      await frame.page().locator('typo3-backend-modal dialog[open]').waitFor();
      await frame.page().waitForTimeout(2000);
      await frame.page().evaluate(() => document.activeElement?.blur());
    },
    modal: true,
    width: 1100,
    height: 700,
  },
  // The button "New File" opens a dialog for uploading and creating files
  'MediaModule/FileUpload': {
    url: mediaUrl('tiles'),
    prepare: async (frame) => {
      await frame.locator('.module-docheader').getByRole('button', { name: 'New File' })
        .or(frame.locator('.module-docheader').getByRole('link', { name: 'New File' })).first().click();
      await frame.page().locator('typo3-backend-modal dialog[open]').waitFor();
      await frame.page().waitForTimeout(2000);
      await frame.page().evaluate(() => document.activeElement?.blur());
    },
    modal: true,
    width: 1100,
    height: 900,
  },
  // The chapter about link management
  'LinkManagement/HomeModuleOverview': {
    url: linkUrl(''),
    window: true,
    menu: 'Sites',
    prepare: async (frame) => {
      await outline(frame.page().locator('[data-modulemenu-identifier="link_management"]').first(), true);
    },
    until: '.card >> nth=-1',
  },
  'LinkManagement/RedirectsAddRedirect': {
    url: linkUrl('redirects'),
    prepare: (frame) => outline(addButton(frame, 'Add redirect')),
    margin: 0,
    from: '.module-docheader',
    to: 'h1',
  },
  'LinkManagement/RedirectsSourceDomainSourcePath': {
    url: editUrl('sys_redirect', redirect),
    from: '[role="tablist"]',
    to: field('is_regexp'),
  },
  'LinkManagement/RedirectsSourceTarget': {
    url: editUrl('sys_redirect', redirect),
    from: field('target'),
  },
  'LinkManagement/RedirectsAccess': {
    url: editUrl('sys_redirect', redirect),
    tab: 'Access',
    from: '[role="tablist"]',
    to: field('endtime'),
  },
  'LinkManagement/RedirectsNotes': {
    url: editUrl('sys_redirect', redirect),
    tab: 'Notes',
    from: '[role="tablist"]',
    to: field('description'),
  },
  'LinkManagement/RedirectsManage': {
    // Wide, so that the list shows its buttons
    width: 1440,
    url: linkUrl('redirects'),
    prepare: (frame) => outline(frame.locator('table tbody tr').first().locator('td').last(), true),
    from: 'table',
  },
  'LinkManagement/ShortURLCreate': {
    url: linkUrl('short-urls'),
    prepare: (frame) => outline(addButton(frame, 'Add Short URL')),
    margin: 0,
    from: '.module-docheader',
    to: 'table',
  },
  'LinkManagement/ShortURLGeneral': {
    url: linkUrl('short-urls'),
    prepare: openNew('Add Short URL'),
    margin: 0,
    from: '.module-docheader',
    to: field('force_https'),
  },
  'LinkManagement/ShortURLAccess': {
    url: editUrl('sys_redirect', shortUrl),
    tab: 'Access',
    from: '[role="tablist"]',
    to: field('endtime'),
  },
  'LinkManagement/ShortURLNotes': {
    url: editUrl('sys_redirect', shortUrl),
    tab: 'Notes',
    from: '[role="tablist"]',
    to: field('description'),
  },
  'LinkManagement/ShortURLEdit': {
    url: linkUrl('short-urls'),
    prepare: (frame) => outline(frame.locator('table tbody tr').first().locator('td').last(), true),
    from: 'table',
  },
  'LinkManagement/QRCAddQRC': {
    url: linkUrl('qrcodes'),
    prepare: (frame) => outline(addButton(frame, 'Add QR Code')),
    margin: 0,
    from: '.module-docheader',
    to: 'h1',
  },
  'LinkManagement/QRCAddQRCGeneral': {
    url: linkUrl('qrcodes'),
    prepare: openNew('Add QR Code'),
    margin: 0,
    from: '.module-docheader',
    to: field('force_https'),
  },
  'LinkManagement/QRCAddQRCAccess': {
    url: editUrl('sys_redirect', qrcode),
    tab: 'Access',
    from: '[role="tablist"]',
    to: field('endtime'),
  },
  'LinkManagement/QRCAddQRCNotes': {
    url: editUrl('sys_redirect', qrcode),
    tab: 'Notes',
    from: '[role="tablist"]',
    to: field('description'),
  },
  'LinkManagement/QRCDownload': {
    url: editUrl('sys_redirect', qrcode),
    prepare: async (frame) => {
      // The row with the format, the size, and the button
      await outline(frame.locator('typo3-qrcode').locator(':has(> * select):has(button)').last());
    },
    margin: 0,
    from: '.module-docheader',
    to: '.form-group:has(typo3-qrcode)',
  },
  'LinkManagement/QRCEdit': {
    url: linkUrl('qrcodes'),
    prepare: (frame) => outline(frame.locator('table tbody tr').first().locator('td').last(), true),
    from: 'table',
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
  // The chapter about deep linking
  'DeepLinking/DeepLinkingIcon': {
    url: moduleUrl('web/layout', packingList),
    prepare: async (frame) => {
      await openShareMenu(frame);
      await outline(frame.locator(shareButton).first());
    },
    hover: true,
    from: shareButton,
    to: '.module-docheader .dropdown-menu >> visible=true',
    // With the buttons on its left, which show where it is
    left: 220,
  },
  'DeepLinking/DeepLinkingPageLink': {
    url: moduleUrl('web/layout', packingList),
    prepare: openShareMenu,
    hover: true,
    margin: 0,
    from: '.module-docheader',
    to: '.t3js-page-ce .t3-page-ce-element >> nth=0',
  },
  'DeepLinking/DeepLinkingContentElementLink': {
    url: editUrl('tt_content', toiletries),
    prepare: openShareMenu,
    hover: true,
    margin: 0,
    from: '.module-docheader',
    to: '.form-section >> nth=0',
  },
  'DeepLinking/DeepLinkingSiteModuleLink': {
    url: `${baseUrl}/typo3/module/site/configuration/detail?site=camino`,
    menu: 'Sites',
    prepare: openShareMenu,
    hover: true,
    margin: 0,
    from: '.module-docheader',
    to: '#languages-collapse thead',
  },
  'DeepLinking/QrCodeContextMenu': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: async (frame) => {
      await openPageMenu(packingList)(frame);
      await frame.page().locator('.context-menu >> visible=true').getByText('Show QR code', { exact: true }).hover();
    },
    hover: true,
    outside: true,
    margin: 6,
    from: treeNode(root),
    to: '.context-menu >> visible=true',
  },
  'DeepLinking/QrCodeModal': {
    url: moduleUrl('web/layout', packingList),
    pageTree: true,
    prepare: async (frame) => {
      await openPageMenu(packingList)(frame);
      await frame.page().locator('.context-menu >> visible=true').getByText('Show QR code', { exact: true }).click();
      // The code comes from the server and replaces a spinner
      await frame.page().locator('typo3-backend-modal dialog[open] typo3-qrcode .preview :is(svg, img)').first().waitFor();
      await frame.page().waitForTimeout(1000);
    },
    modal: true,
  },
  // The chapter about languages, near the end: the Layout module keeps the
  // view of the languages per user, and the Spanish translation stays
  'Language/PageLanguages': {
    url: moduleUrl('web/layout', packingList),
    prepare: async (frame) => {
      await languageMenu(frame).click();
      await frame.page().waitForTimeout(500);
      await frame.locator('.module-docheader .dropdown-menu >> visible=true').getByText('Español').first().hover();
    },
    hover: true,
    margin: 0,
    from: '.module-docheader',
    to: '.t3js-page-ce-sortable >> nth=0',
  },
  'Language/LanguagesTranslateContentElements': {
    url: moduleUrl('web/layout', packingList),
    prepare: translate('Español', 'mode'),
    modal: true,
    width: 1024,
    height: 650,
  },
  'Language/LanguagesPageVersions': {
    // Wide, for the three languages next to each other
    width: 1600,
    url: moduleUrl('web/layout', packingList),
    prepare: async (frame) => {
      await translate('Español', 'done')(frame);
      await showLanguageComparison(frame);
      // The comparison shows the languages chosen in the language menu.
      // Arabic shows the text that is written from right to left. The
      // module keeps the choice, so a second run finds it chosen already.
      if (await frame.locator('td[data-language-uid="2"]').count() === 0) {
        // As above, a click can get lost while the module loads
        const arabic = frame.locator('.dropdown-menu .dropdown-item').filter({ hasText: 'العربية', visible: true }).first();
        for (let attempt = 0; attempt < 3 && !await arabic.isVisible(); attempt++) {
          await languageMenu(frame).click();
          await arabic.waitFor({ timeout: 2000 }).catch(() => {});
        }
        await arabic.click();
        await frame.waitForLoadState('networkidle');
        await frame.page().waitForTimeout(1500);
      }
      await badge(viewModeButton(frame), 1);
      await badge(frame.locator('td[data-language-uid="1"] typo3-backend-editable-page-title button[data-action="edit"]').first(), 2, 'left');
      await badge(frame.locator('.t3js-page-ce[data-language-uid="1"] [data-action="content-element-visibility-toggle"]').first(), 3);
    },
    margin: 0,
    from: '.module-docheader',
    to: '.t3js-page-ce-sortable >> nth=0',
  },
  'Language/LanguagesSingleLanguageLayout': {
    // Comes after the comparison, which the Layout module keeps
    width: 1600,
    url: moduleUrl('web/layout', packingList),
    prepare: async (frame) => {
      await badge(languageMenu(frame), 1);
      await viewModeButton(frame).click();
      await frame.page().waitForTimeout(500);
      await frame.locator('.module-docheader .dropdown-menu >> visible=true').getByText('Layout', { exact: true }).first().hover();
    },
    hover: true,
    margin: 0,
    from: '.module-docheader',
    to: '.t3js-page-ce-sortable >> nth=0',
  },
  // The chapter about search engine optimization
  'SearchEngineOptimization/AddWidget': {
    url: `${baseUrl}/typo3/module/dashboard`,
    menu: 'Dashboard',
    prepare: async (frame) => {
      await frame.locator('.btn-dashboard-add-widget').click();
      const dialog = frame.page().locator('typo3-backend-modal dialog[open]');
      await dialog.waitFor();
      await frame.page().waitForTimeout(1000);
      await dialog.getByText('SEO', { exact: true }).filter({ visible: true }).first().click();
      await frame.page().waitForTimeout(500);
      await frame.page().evaluate(() => document.activeElement?.blur());
      await outline(dialog.getByRole('button', { name: /Pages missing meta description/ }).filter({ visible: true }).first(), true);
    },
    ...wizardSize,
  },
  'SearchEngineOptimization/PagesMissingDescription': {
    url: `${baseUrl}/typo3/module/dashboard`,
    window: true,
    menu: 'Dashboard',
    prepare: addSeoWidget,
    until: 'typo3-dashboard-widget',
  },
  'SearchEngineOptimization/AddDescription': {
    url: `${baseUrl}/typo3/module/dashboard`,
    menu: 'Dashboard',
    prepare: async (frame) => {
      await addSeoWidget(frame);
      const row = seoWidget(frame).locator('tr, li').filter({ hasText: 'FAQs' }).first();
      await row.locator('a, button').last().click();
      await frame.waitForLoadState('networkidle');
      const description = frame.locator(`${field('description')} textarea`).first();
      await description.waitFor();
      await description.fill('Answers to the questions pilgrims ask most before they set out on the Camino.');
    },
    margin: 0,
    from: '.module-docheader',
    to: '.form-section',
  },
  // The chapter about the user settings
  // As Erika Doe, whose name and email address the form shows
  'UserSettings/UserSettingsPersonalData': {
    ...userSettings('Personal Data'),
  },
  'UserSettings/UserSettingsLanguage': {
    ...userSettings('Personal Data'),
    prepare: async (frame) => {
      // A screenshot cannot show the native list of a select, so the select
      // shows its items as a list box instead
      await frame.locator(`${field('be_users__lang')} select`).evaluate((select) => {
        select.size = select.options.length;
        // A list box is higher than three items by default
        select.style.minHeight = '0';
        select.style.height = 'auto';
      });
    },
    from: `${field('be_users__lang')} label`,
    to: `${field('be_users__lang')} select`,
  },
  'UserSettings/UserSettingsSecurity': {
    ...userSettings('Account security'),
  },
  'UserSettings/UserSettingsBackendAppearance': {
    ...userSettings('Backend appearance'),
  },
  'UserSettings/UserSettingsPersonalization': {
    ...userSettings('Personalization'),
  },
  // The themes, with the default one last, which Erika Doe keeps
  'UserSettings/ClassicTheme': backendTheme('classic'),
  'UserSettings/ModernTheme': backendTheme('modern'),
  'UserSettings/FreshTheme': backendTheme('fresh'),
  // Mass editing, at the very end: the Records module keeps the chosen
  // columns of a table per user, which would change the lists above
  'ListModule/MassEdit/ShowColumnsButton': {
    url: recordsUrl(stories),
    window: true,
    pageTree: true,
    prepare: async (frame) => {
      await outline(frame.locator('#t3-table-tt_content typo3-backend-column-selector-button').first());
    },
    until: recordRow('tt_content', story),
  },
  'ListModule/MassEdit/ShowColumnsModal': {
    url: recordsUrl(stories),
    prepare: (frame) => chooseColumns(frame, false),
    modal: true,
    width: 1024,
    height: 600,
  },
  'ListModule/MassEdit/RecordListWithAdditionalFields': {
    url: recordsUrl(stories),
    prepare: async (frame) => {
      await chooseColumns(frame, true);
      for (const column of Object.values(massEditColumns)) {
        await outline(frame.locator('#t3-table-tt_content th', { hasText: column }).first(), true);
      }
    },
    from: '#t3-table-tt_content',
    to: recordRow('tt_content', map),
  },
  'ListModule/MassEdit/MassEditingEnabled': {
    url: recordsUrl(stories),
    prepare: async (frame) => {
      await chooseColumns(frame, true);
      await frame.locator('#t3-table-tt_content .t3js-multi-record-selection-check-actions-toggle').first().click();
      await frame.locator('#t3-table-tt_content [data-multi-record-selection-check-action="check-all"]').first().hover();
      await frame.page().waitForTimeout(500);
    },
    hover: true,
    from: '#t3-table-tt_content',
    to: recordRow('tt_content', map),
  },
  'ListModule/MassEdit/EditButton': {
    url: recordsUrl(stories),
    prepare: async (frame) => {
      await checkAll(frame);
      await outline(frame.locator('#t3-table-tt_content button[title="Edit"]').first(), true);
    },
    from: '#t3-table-tt_content',
  },
  'ListModule/MassEdit/MassEditingAllFields': {
    url: recordsUrl(stories),
    prepare: async (frame) => {
      await checkAll(frame);
      await frame.locator('#t3-table-tt_content button[title="Edit"]').first().click();
      await frame.waitForURL(/record\/edit/);
      await frame.waitForLoadState('networkidle');
      await frame.page().waitForTimeout(1000);
    },
    margin: 0,
    from: '.module-docheader',
    to: `${field('header')} >> nth=0`,
  },
  'ListModule/MassEdit/EditColumnsButton': {
    url: recordsUrl(stories),
    prepare: async (frame) => {
      await checkAll(frame);
      await outline(frame.locator('#t3-table-tt_content button[title="Edit columns"]').first(), true);
    },
    from: '#t3-table-tt_content',
  },
  'ListModule/MassEdit/MassEditingSelectedFields': {
    url: recordsUrl(stories),
    prepare: async (frame) => {
      await checkAll(frame);
      await frame.locator('#t3-table-tt_content button[title="Edit columns"]').first().click();
      await frame.waitForURL(/record\/edit/);
      await frame.waitForLoadState('networkidle');
      await frame.page().waitForTimeout(1000);
    },
    margin: 0,
    from: '.module-docheader',
    // Down to the second content element, as the form goes on below
    to: 'text=Map of the stages',
  },
  'ListModule/MassEdit/SelectiveEditing': {
    url: recordsUrl(stories),
    prepare: async (frame) => {
      await chooseColumns(frame, true);
      for (const uid of [story, shells]) {
        await frame.locator(`${recordRow('tt_content', uid)} input[type="checkbox"]`).first().check();
      }
      await frame.page().evaluate(() => document.activeElement?.blur());
    },
    from: '#t3-table-tt_content',
  },
  // The chapter about access control: the website users and their group,
  // the members page, and its login form in the frontend. Last, because
  // the page tree keeps the folder of the website users open, which the
  // screenshots of the page tree would show.
  'AccessControl/UserFolder': {
    url: recordsUrl(websiteUsers),
    window: true,
    pageTree: true,
    prepare: async (frame) => {
      await outline(frame.getByRole('button', { name: 'Create new record' }).first());
    },
    until: recordRow('fe_groups', 2),
  },
  'AccessControl/NewRecordWizard': {
    url: recordsUrl(websiteUsers),
    prepare: async (frame) => {
      await frame.getByRole('button', { name: 'Create new record' }).first().click();
      await frame.waitForLoadState('networkidle');
      await outline(frame.locator('.list-group-item', { hasText: 'Website Usergroup' }).first(), true);
    },
    from: 'h1',
    to: '.list-group',
  },
  'AccessControl/NewGroup': {
    url: `${baseUrl}/typo3/record/edit?edit[fe_groups][${websiteUsers}]=new&defVals[fe_groups][title]=Pilgrims`,
    prepare: async (frame) => {
      await outline(frame.locator(input('title')).first(), true);
    },
    margin: 0,
    from: '.module-docheader',
    to: field('title'),
  },
  'AccessControl/NewUser': {
    url: `${baseUrl}/typo3/record/edit?edit[fe_users][${websiteUsers}]=new&defVals[fe_users][username]=rosa`
      + `&defVals[fe_users][usergroup]=${pilgrims}`,
    prepare: async (frame) => {
      const passwordInput = frame.locator(input('password')).first();
      await passwordInput.fill(password);
      // The field shows that it changed only once it lost the focus
      await passwordInput.blur();
    },
    margin: 0,
    from: '.module-docheader',
    to: field('usergroup'),
  },
  'AccessControl/AccessRights': {
    url: editUrl('tt_content', pleaseLogIn),
    tab: 'Access',
    from: field('starttime'),
    to: field('fe_group'),
  },
  'AccessControl/RestrictContent': {
    url: moduleUrl('web/layout', members),
    from: contentElement(pleaseLogIn),
    to: contentElement(welcome),
  },
  'AccessControl/LoginForm': {
    url: editUrl('tt_content', loginForm),
    tab: 'Plugin',
    from: '[role="tablist"]',
    to: '.form-group:has([name*="[settings.pages]"]):not(:has(.form-group))',
  },
  'AccessControl/PageWithLoginForm': {
    loggedOut: true,
    url: `${baseUrl}/camino/members-only`,
    prepare: async () => {},
    from: 'main',
  },
  'AccessControl/PageWithAuthenticatedUser': {
    loggedOut: true,
    url: `${baseUrl}/camino/members-only`,
    prepare: async (page) => {
      await page.locator('input[name="user"]').fill('rosa');
      await page.locator('input[name="pass"]').fill(password);
      await page.locator('form:has(input[name="user"]) [type="submit"]').first().click();
      await page.waitForLoadState('networkidle');
    },
    from: 'main',
  },
  'AccessControl/PublicationDate': {
    url: editUrl('pages', faqs),
    tab: 'Access',
    from: field('starttime'),
    to: field('extendToSubpages'),
  },
  // The error page of a development system, for a page that the header
  // breaks, see create-records.php
  'HelpInside/ErrorPage': {
    loggedOut: true,
    url: `${baseUrl}/camino/packing-list`,
    headers: { 'X-Screenshot': 'error' },
    prepare: async (page) => {
      await outline(page.getByRole('button', { name: 'Copy plaintext stack trace' }));
    },
    until: '.trace-head',
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

// A new image differs from the old one in a few pixels even when nothing
// changed, such as at the edge of a rounded corner. Below this number of
// pixels, the old image stays, so a commit holds only real changes.
const unchangedPixels = 10;
let comparison;
const changedPixels = async (before, after) => {
  comparison ??= await browser.newPage();
  return comparison.evaluate(async ([before, after]) => {
    const load = (data) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.src = `data:image/png;base64,${data}`;
    });
    const images = [await load(before), await load(after)];
    const { width, height } = images[0];
    if (images[1].width !== width || images[1].height !== height) {
      return Infinity;
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    const [a, b] = images.map((image) => {
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, width, height).data;
    });
    let count = 0;
    for (let i = 0; i < a.length; i += 4) {
      if (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]) > 30) {
        count++;
      }
    }
    return count;
  }, [before.toString('base64'), after.toString('base64')]);
};
// Writes the image, unless it looks the same as the one already there
const save = async (name, image) => {
  const path = `${target}/${name}.png`;
  if (existsSync(path) && await changedPixels(readFileSync(path), image) < unchangedPixels) {
    console.log(`${name}.png (unchanged)`);
    return;
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, image);
  console.log(`${name}.png`);
};

const names = process.argv.length > 2 ? process.argv.slice(2) : Object.keys(screenshots);
for (const name of names) {
  const screenshot = screenshots[name];
  if (screenshot === undefined) {
    throw new Error(`Unknown screenshot "${name}"`);
  }
  if (screenshot.loggedOut) {
    // A window of its own, without the session of the other screenshots
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, extraHTTPHeaders: screenshot.headers });
    const window = await context.newPage();
    await window.goto(screenshot.url);
    await window.waitForLoadState('networkidle');
    await screenshot.prepare(window);
    await window.waitForTimeout(500);
    let clip;
    if (screenshot.until) {
      // The whole width of the window, down to the element named
      const until = await window.locator(screenshot.until).first().boundingBox();
      clip = { x: 0, y: 0, width: 1280, height: until.y + until.height + margin };
    } else {
      const box = await window.locator(screenshot.from).first().boundingBox();
      clip = { x: box.x - margin, y: box.y - margin, width: box.width + 2 * margin, height: box.height + 2 * margin };
    }
    const image = await window.screenshot({ clip });
    await context.close();
    await save(name, image);
    continue;
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
    // close a context menu, so only a changed menu is clicked. Behind a
    // dialog, the menu does not show and cannot be clicked.
    if (!screenshot.modal) {
      await collapseNavigation(screenshot.pageTree, screenshot.menu ?? 'Content');
    }
  }
  await page.waitForTimeout(500);
  if (process.env.DUMP) {
    writeFileSync(`../../var/${name.replaceAll('/', '_')}.html`, await frame.content());
    writeFileSync(`../../var/${name.replaceAll('/', '_')}-window.html`, await page.content());
  }
  if (screenshot.frontend) {
    // The page in the frontend, cut to the element named
    await page.goto(screenshot.frontend);
    await page.waitForLoadState('networkidle');
    const box = await page.locator(screenshot.frontendElement).first().boundingBox();
    await save(name, await page.screenshot({
      clip: { x: box.x - margin, y: box.y - margin, width: box.width + 2 * margin, height: box.height + 2 * margin },
    }));
    continue;
  }
  if (screenshot.modal) {
    // Only the dialog: the page behind it does not belong to the example
    await save(name, await page.locator('typo3-backend-modal dialog[open]').screenshot());
    continue;
  }
  if (screenshot.window) {
    // The whole backend. It ends below the element named in "until", so the
    // image takes no more room on the page than it needs.
    let clip = screenshot.clip && { x: 0, y: 0, ...screenshot.clip };
    if (screenshot.until) {
      const until = await frame.locator(screenshot.until).last().boundingBox();
      const viewport = page.viewportSize();
      clip = { x: 0, y: 0, width: viewport.width, height: Math.min(until.y + until.height + 4, viewport.height) };
    }
    await save(name, await page.screenshot({ clip }));
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
  // Numbered circles, which can stick out of the elements
  for (const circle of await scope.locator('.screenshot-badge').all()) {
    boxes.push(await circle.boundingBox());
  }
  // Other elements that stick out, such as the tooltip of a drag
  for (const selector of screenshot.include ?? []) {
    boxes.push(await page.locator(selector).first().boundingBox());
  }
  const space = screenshot.margin ?? margin;
  const left = Math.max(Math.min(...boxes.map((box) => box.x)) - space - (screenshot.left ?? 0), 0);
  const top = Math.max(Math.min(...boxes.map((box) => box.y)) - space, 0);
  await save(name, await page.screenshot({
    clip: {
      x: left,
      y: top,
      width: Math.max(...boxes.map((box) => box.x + box.width)) + space - left,
      height: Math.max(...boxes.map((box) => box.y + box.height)) + space - top,
    },
  }));
}
await browser.close();
