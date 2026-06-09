..  include:: /Includes.rst.txt

..  _keyboard-commands:

=================
Keyboard commands
=================

..  contents::
    :local:

..  _keyboard-commands-page-tree:

Navigating the page tree using a keyboard
=========================================

It is possible to navigate the page tree using only a keyboard and it adheres to
the guidelines set out in `WAI-ARIA Authoring Practices 1.1. <https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-22>`__

*  :kbd:`Home` moves the focus to the first item in the page tree.
*  :kbd:`End` moves the focus to the last item in the page tree.
*  :kbd:`Enter` either expands the item or selects it.

*  :kbd:`Up` and  :kbd:`Down` arrow keys will move the focus up and down the page tree.
*  :kbd:`Right` arrow key will expand the focus if possible.
*  :kbd:`Left` arrow key will close the focus if possible.

..  _keyboard-commands-forms:

Actions in backend forms
=========================

..  tabs::

    ..  group-tab:: Windows / Linux

        *   :kbd:`ctrl` + :kbd:`s` = Save
        *   :kbd:`ctrl` + :kbd:`shift` + :kbd:`s` = Save and close

    ..  group-tab:: macOs

        *   :kbd:`cmd (⌘)` + :kbd:`s` = Save
        *   :kbd:`cmd (⌘)` + :kbd:`shift` + :kbd:`s` = Save and close

..  _keyboard-commands-rte:

Editing text in the Rich Text Editor (RTE)
==========================================

Below is a list of common keyboard commands that can be used when editing
text in TYPO3's :ref:`RTE <rte>`.

..  tabs::

    ..  group-tab:: Windows / Linux

        * :kbd:`ctrl` + :kbd:`a` = Select all text
        * :kbd:`ctrl` + :kbd:`c` = Copy
        * :kbd:`ctrl` + :kbd:`v` = Paste
        * :kbd:`ctrl` + :kbd:`x` = Cut
        * :kbd:`ctrl` + :kbd:`z` = Undo
        * :kbd:`ctrl` + :kbd:`i` = Italic
        * :kbd:`ctrl` + :kbd:`b` = Bold

    ..  group-tab:: macOs

        * :kbd:`cmd (⌘)` + :kbd:`a` = Select all text
        * :kbd:`cmd (⌘)` + :kbd:`c` = Copy
        * :kbd:`cmd (⌘)` + :kbd:`v` = Paste
        * :kbd:`cmd (⌘)` + :kbd:`x` = Cut
        * :kbd:`cmd (⌘)` + :kbd:`z` = Undo
        * :kbd:`cmd (⌘)` + :kbd:`i` = Italic
        * :kbd:`cmd (⌘)` + :kbd:`b` = Bold

..  _keyboard-commands-browser:

Reloading pages and clearing browser cache
==========================================

..  tabs::

    ..  group-tab:: Windows / Linux

        * :kbd:`F5` = Reload
        * :kbd:`ctrl` + :kbd:`F5` = Reload page and clear browser cache

    ..  group-tab:: macOS

        * :kbd:`cmd (⌘)` + :kbd:`r` = Reload page
        * :kbd:`cmd (⌘)` + :kbd:`option (⌥)` + :kbd:`r` = Reload page and clear browser cache

..  _keyboard-commands-search:

Opening the backend search modal
================================

..  versionadded:: 12.0

..  tabs::

    ..  group-tab:: Windows / Linux

        * :kbd:`ctrl` + :kbd:`k`

    ..  group-tab:: macOS

        * :kbd:`cmd (⌘)` + :kbd:`k`

..  _keyboard-commands-multiselect:

Multiselect in content elements
===============================

..  versionadded:: 12.3

The keyboard commands can be used on a select element:

..  figure:: /Images/ManualScreenshots/ContentElements/SelectMultipleSideBySide.png
    :alt: A multiselect element
    :zoom: lightbox

    A multiselect element

Or a folder element:

..  figure:: /Images/ManualScreenshots/ContentElements/Folder.png
    :alt: A folder element
    :zoom: lightbox

    A folder element

Or a group element:

..  figure:: /Images/ManualScreenshots/ContentElements/Group.png
    :alt: A group element
    :zoom: lightbox

    A group element

Selecting and deselecting options with the keyboard:

*   :kbd:`enter` = Add options, either from right to left or left to right
*   :kbd:`delete` or :kbd:`backspace` = Remove an option for Windows and Mac users
*   :kbd:`alt` + :kbd:`arrow up` = Move the option one up
*   :kbd:`alt` + :kbd:`arrow down` = Move the option one down
*   :kbd:`alt` + :kbd:`shift` + :kbd:`arrow up` = Move the option to the top
*   :kbd:`alt` + :kbd:`shift` + :kbd:`arrow down` = Move the option to the bottom

More combinations:

*   :kbd:`shift` + :kbd:`arrow up` = Include the upper option
*   :kbd:`shift` + :kbd:`arrow down` = Include the lower option
*   :kbd:`home` = Move the cursor to the top
*   :kbd:`end` = Move the cursor to the bottom
