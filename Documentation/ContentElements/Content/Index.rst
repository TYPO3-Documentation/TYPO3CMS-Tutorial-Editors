..  include:: /Includes.rst.txt

..  _content-working:

================
Managing content
================

..  youtube:: b-USBqOPD3c

------------

..  image:: /Images/ManualScreenshots/ContentElements/ManageContent.png
    :alt: Manage content elements in the TYPO3 backend
    :class: img-thumbnail float-end ms-1 ms-1
    :width: 250

..  versionchanged:: 14.0
    The main module `Web` has been renamed to `Content`.
    See `Feature: #107628 - Improved backend module naming and structure <https://docs.typo3.org/permalink/changelog:feature-107628-1729026000>`_


In TYPO3, working with content happens mostly in the :guilabel:`Content > Layout`
module. Chose the page you want to edit from the page tree.

You can `Hide <https://docs.typo3.org/permalink/t3editors:content-working-hiding>`_.
`Move <https://docs.typo3.org/permalink/t3editors:content-working-moving>`_
or `Copy & paste <https://docs.typo3.org/permalink/t3editors:content-working-copy-paste>`_
content elements using the context menu.

The following screenshot demonstrates how to open the :guilabel:`Content > Page` module:

..  figure:: /Images/ManualScreenshots/ContentElements/PageModule.png
    :alt: Screenshot demonstrating the page module and the page tree in the TYPO3 backend

    Click on :guilabel:`Content > Layout` in the module menu, then choose the page to be managed in the page tree

..  contents:: Table of Content

..  _content-working-overview:

Overview of the Layout module in TYPO3
======================================

..  versionchanged:: 14.0
    This module has been renamed from :guilabel:`Web > Pages` to :guilabel:`Content > Layout`
	see `Feature: #107628 - Improved backend module naming and structure <https://docs.typo3.org/permalink/changelog:feature-107628-1729026000>`_.

..  figure:: /Images/ManualScreenshots/ContentElements/PageModuleAnnotated.png
    :alt: A typical view of the Content Layout module with various content columns

Common page icons explained:

#.  Use this icon to edit all the content elements of a column.

#.  Add a new content element to the column at this specific position.

#.  Content element icon. This can provide a visual clue to the type of content
    element. Click to access the context menu for the element (to perform
    actions like *copy*).

#.  This group of icons is enabled when hovering over the whole element.

    *   Use the pencil icon to edit the element.
    *   Enable/disable the element to show or hide it in the frontend
    *   Delete the element.
    *   Open the context menu.

#.  If the edit icons are missing you do not have sufficient permission to
    edit the content element in question.

..  _content-working-hiding:

Hiding content elements
=======================

You can temporarily hide content that should be hidden for a while but will be
needed later. You can also hide a content element while you are still working
on it. Hidden content elements are not visible in the frontend

..  figure:: /Images/ManualScreenshots/ContentElements/HideContent.png
    :alt: A content element in the page module is hidden

    Use the "hide" button to hide a content element. The second content element is hidden and can be unhidden by the same button.

A content element can also be hidden in the "Access" tab of its edit form, its
context menu or the `Content > Layout module <https://docs.typo3.org/permalink/t3editors:using-the-list-module-effectively>`_.

..  _content-working-moving:

Moving content elements
=======================

You can move content elements using drag and drop. You can either drop them
in one of the highlighted areas on the current page or drop them on a different
page within the page tree.

..  figure:: /Images/ManualScreenshots/ContentElements/MoveContentElement.png
    :alt: Screenshot of moving a content element via drag and drop in the TYPO3 backend

    Drop the content element on a page in the page tree to move it to another page

..  _content-working-copy-paste:

Copy and paste content elements
==============================

..  figure:: /Images/ManualScreenshots/ContentElements/CopyContent.png
    :alt: The context menu of a content menu in the TYO3 backend

    Use the context menu of the upper left button of the content element to start copying a content element

..  figure:: /Images/ManualScreenshots/ContentElements/PasteContent.png
    :alt: Location of the paste button beside the "Create new content" button

    Paste the content into the desired location.

You can also copy content elements by pressing :kbd:`Ctrl` during drag and drop.

Copied content is hidden by default and has the text "(copy xx)" appended to its
title. Your integrator can disable this default behaviour:
`Disable hide and prepend at copy <https://docs.typo3.org/permalink/t3start:list-module-disablehideatcopy>`_
if desired.

..  _content-working-life-search:

Finding content using the Live Search
=====================================

Use the search button on the top right of the TYPO3 backend or the keyboard
shortcut :kbd:`Ctrl + K` or :kbd:`Cmd + K` to open the live search.

..  figure:: /Images/ManualScreenshots/ContentElements/LiveSearch.png
    :alt: Using the live search to search for content elements

    Use the arrow button to get more information on the search result

You can then edit the content element containing the text you were searching for.

..  _content-working-troubleshooting:

Troubleshooting page management
===============================

..  _content-working-troubleshooting-unused:

Unused elements detected on this page
-------------------------------------

Sometimes the following warning is displayed on your page:

..  figure:: /Images/ManualScreenshots/ContentElements/UnusedContent.png
    :alt: Warning: Unused elements detected on this page: These elements don't belong to any of the available columns of this page. You should either delete them or move them to existing columns. We highlighted the problematic records for you.

    Warning that some content elements belong to no valid content area

This commonly happens when you switched the
`Backend layout in the page properties <https://docs.typo3.org/permalink/t3editors:pages-properties-appearance>`_.

It can also happen after imports or updates. "Unused content" is usually not
displayed on the page. You can restore it if it is still needed or delete it if
it is not needed anymore.

The "Unused content" is found at the bottom of the page module. you can move it
via drag an drop to the desired location or delete it, if it is not needed anymore.

..  figure:: /Images/ManualScreenshots/ContentElements/MoveUnusedContent.png
    :alt: Demonstration of moving unused content back into a normal content area

..  _content-working-troubleshooting-recycler:

Restore deleted content elements using the Recycler
---------------------------------------------------

If you accidentally delete a content element or even a complete page you can
restore your data using the module :guilabel:`Content > Recycler` if you have
sufficient permissions and it is installed.

..  figure:: /Images/ManualScreenshots/ContentElements/RestoreContent.png
    :alt: Screenshot of the Recycler module in the TYPO3 backend, demonstrating how to restore a deleted content element

See also :ref:`Recycler manual, For editors <typo3/cms-recycler:for-editors>`.

..  _content-working-troubleshooting-history:

Undo changes using the Page History
-----------------------------------

You can use the page history to undo any kind of content changes. If you have
no access to the recycler you can also use it to restore deleted content.

Use the context menu on the page tree and choose "History/Undo".

..  figure:: /Images/ManualScreenshots/ContentElements/RestoreContent.png
    :alt: Screenshot of the page history in the TYPO3 backend

    Use the "Undo" button to undo your changes

In this module you can even see a detailed view on how text or other fields
where changed and who made which changes when.

..  figure:: /Images/ManualScreenshots/ContentElements/ContentElementHistoryDifferences.png
    :alt: Screenshot of the page history in the TYPO3 backend

    Compare the differences. Use the undo button to undo changes.

..  _content-working-began-editing:

The BE-User 'xxx' began to edit this record x min ago
-----------------------------------------------------

It is not possible in TYPO3 for two editors to work on the same content element
at the same time. The last editor who saves the content element will override
all other changes. You should therefore avoid working on content elements that
another editor is currently working on. These are marked with a warning:

..  figure:: /Images/ManualScreenshots/ContentElements/ContentElementEdited.png
    :alt: Warning: The BE-User 'e.doe' began to edit this record 3 min ago.

    Avoid working on content elements that are currently edited by someone else
