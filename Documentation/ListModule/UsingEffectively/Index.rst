..  include:: /Includes.rst.txt
..  _using-the-list-module-effectively:

=====================
Using the list module
=====================

The :guilabel:`Web > List` module allows you to browse through pages and folders
in your site and view the records that
are stored there. You can also create and edit records.

Select the :guilabel:`Web > List` module and choose a page or storage folder.

..  contents:: Table of Contents

..  _list-module-header:

The List module header
======================

..  figure:: /Images/ManualScreenshots/ListModule/ListModule.png
    :alt: Screenshots of the List module in the TYPO3 backend, demonstrating the locations of the buttons mentioned below

    See bellow about the meaning of the labeled buttons

The list view displays a list of records stored on the
current page, grouped by type. The List module is commonly used for records
that have no dedicated backend module, for example website users and groups.

The list view has action icons in the **module header** including:

#.  **Create new record** (a wizard appears to let you choose which type)

#.  **Edit page properties** of the current page

#.  **Clear the cache** of the current page

#.  **Refresh** the List view

#.  **Create internal note**

#.  **View** Show or hide search or `The clipboard <https://docs.typo3.org/permalink/t3editors:clipboard>`_

#.  **Share** Copy an URL to this page or bookmark it for quick access

..  tip::
    Use the **Create new record** button if you want to create a record of
    a type that does not yet have items on the current page.

..  _list-module-record-type:

Editing a record of a certain type
==================================

If there are already database records stored on the current page, each record
type features its own action buttons for available actions:

..  figure:: /Images/ManualScreenshots/ListModule/ActionIcons.png
    :alt: Example of the action icons available for record type "Website Usergroup"

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

..  figure:: /Images/ManualScreenshots/ListModule/SearchRecord.png
    :alt: Screenshot of the List module with the search box visible

    To make the search box visible, Select "Show Search" from the "View" dropdown.

It is also possible to include subpages of the current page by choosing the
number of levels (for performance reasons) in which to search.

If you do not know on which page the record could be found you can also
use the `Backend search <https://docs.typo3.org/permalink/t3editors:backend-search>`_.

The search can be opened by selecting the magnifying glass in the top right
corner of the toolbar or by pressing the :kbd:`Cmd + K`
keystroke on MacOS or the :kbd:`Ctrl + K` keystroke on Windows and Linux
systems.
