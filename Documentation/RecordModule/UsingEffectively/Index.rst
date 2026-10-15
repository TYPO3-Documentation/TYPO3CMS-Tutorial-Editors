..  include:: /Includes.rst.txt
..  _using-the-list-module-effectively:

========================
Using the Records module
========================

..  versionchanged:: 14.0
    :changelog: feature-107628-1729026000

    This module has been renamed from :guilabel:`Web > List` to
    :guilabel:`Content > Records`.

The :guilabel:`Content > Records` module allows you to browse through pages and folders
in your site and view the records that
are stored there. You can also create and edit records.

Select the :guilabel:`Content > Records` module and choose a page or storage folder.

..  contents:: Table of Contents

..  _list-module-header:

The Records module header
=========================

..  figure:: /Images/GeneratedScreenshots/ListModule/ListModule.png
    :alt: Screenshots of the Records module in the TYPO3 backend, demonstrating the locations of the buttons mentioned below
    :zoom: gallery

    See below about the meaning of the labeled buttons

The list view displays a list of records stored on the
current page, grouped by type. The :guilabel:`Content > Records` module is commonly used for records
that have no dedicated backend module, for example website users and groups.

The list view has action icons in the **module header** including:

1.  **Create new record** (a wizard appears to let you choose which type)

2.  **Edit page properties** of the current page

3.  **View** or hide search or `the clipboard <https://docs.typo3.org/permalink/t3editors:clipboard>`_

4.  **Clear the cache** of the current page

5.  **Create internal note**

6.  **Refresh** the :guilabel:`Content > Records` module

7.  **Share** Copy an URL to this page or bookmark it for quick access

..  tip::
    Use the **Create new record** button if you want to create a record of
    a type that does not yet have items on the current page.

..  _list-module-record-type:

Editing a record of a certain type
==================================

If there are already database records stored on the current page, each record
type features its own action buttons for available actions:

..  figure:: /Images/GeneratedScreenshots/ListModule/ActionIcons.png
    :alt: Example of the action icons available for record type "Website Usergroup"
    :zoom: gallery

In this example the first button can be used to edit the user group, the second
button to hide or unhide it, the third button to delete it. The button with the
three dots offers additional options.

..  tip::
    You can also edit a database record by clicking on its title.

..  _list-module-record-search:

Finding a record in a long list
===============================

If there are a large number of records you can use the search box to search for
a record containing a certain word.

..  figure:: /Images/GeneratedScreenshots/ListModule/SearchRecord.png
    :alt: Screenshot of the Records module with the search box visible
    :zoom: gallery

    To make the search box visible, Select "Show Search" from the "View" dropdown.

It is also possible to include subpages of the current page by choosing the
number of levels (for performance reasons) in which to search.

If you do not know on which page the record could be found you can also
use the `Backend search <https://docs.typo3.org/permalink/t3editors:backend-search>`_.

The search can be opened by selecting the magnifying glass in the top right
corner of the toolbar or by pressing the :kbd:`Cmd + K`
keystroke on MacOS or the :kbd:`Ctrl + K` keystroke on Windows and Linux
systems.

..  _list-module-languages:

Showing the records of certain languages
========================================

..  versionadded:: 14.0
    :changelog: feature-103258-1709588499

On a page with translations, the :guilabel:`Content > Records` module lists
the records of the languages that you choose in its language menu. The button
of the menu, at the top right of the module, shows how many languages the
record list shows.

..  figure:: /Images/GeneratedScreenshots/ListModule/LanguageMenu.png
    :alt: The open language menu of the Records module, with English, Español, and العربية checked
    :zoom: gallery

    The language menu of a page in three languages

1.  Open the language menu. The languages with a check mark are the ones
    that the record list shows.

2.  Click a language to show or hide its records.

3.  Click :guilabel:`Check all` to show the records of all languages, or
    :guilabel:`Uncheck all` to show the default language only.

The records of the default language always stay in the record list, as well as
records that apply to all languages. Their translations show below them.

..  figure:: /Images/GeneratedScreenshots/ListModule/LanguageFilter.png
    :alt: The Records module without the Spanish records, with the English content elements and the Arabic translation
    :zoom: gallery

    Without Español, the record list shows the English records and the Arabic ones

TYPO3 remembers the languages that you have chosen for each page. The
:guilabel:`Content > Layout` module shows the same languages on that page.

On a page without a translation, the language menu offers to create one under
:guilabel:`Create new translation`, see
`Create the page translation <https://docs.typo3.org/permalink/t3editors:languages-create-page-translation>`_.
