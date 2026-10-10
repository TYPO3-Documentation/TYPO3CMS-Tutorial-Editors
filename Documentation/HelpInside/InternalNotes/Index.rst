:navigation-title: Internal Notes

..  include:: /Includes.rst.txt
..  _internal-notes:

===================================
Internal notes in the TYPO3 backend
===================================

..  note::
    Internal notes are an optional feature provided by
    :composer:`typo3/cms-sys-note`. If you do not see the note button or
    notes in your backend, ask your administrator to install this extension
    and grant you the necessary permissions.

Internal notes (also known as system notes) are small reminders or instructions
displayed directly on a page in the :guilabel:`Content > Layout` module or in
the :guilabel:`Content > Record` module.

You can use them to write notes to yourself or other editors. Administrators
can use them to leave instructions for you as well.

..  figure:: /Images/ManualScreenshots/Page/PageWithSysNote.png
    :alt: Screenshot of a TODO note on the top of the backend module
    :zoom: gallery

    An internal note displayed on a page. If you have sufficient permissions,
    you can also edit or delete existing notes.


..  _internal-notes-create:

Creating an internal note
=========================

To create a new note:

#.  Select a page in the page tree.
#.  In the top-right toolbar of the module header, click the
    :guilabel:`Create internal note for this page` button:

    ..  figure:: /Images/ManualScreenshots/Page/sys_note_create.png
        :alt: Screenshot demonstrating the location of the "Create internal note" button in the module header
        :zoom: gallery

        The button to create an internal note is located in the top-right toolbar
        of the :guilabel:`Content > Layout` and :guilabel:`Content > Record` modules.

#.  Enter a :guilabel:`Subject` and your :guilabel:`Message`.
#.  Save the note.

..  tip::
    **Position of the note:**

    By default, new notes are displayed at the **bottom** of the page (below
    all content elements or records).

    If you want the note to appear prominently at the **top** of the page (as
    shown in the screenshot above), change the :guilabel:`Position` field in the
    note from `Bottom` to `Top`.

..  seealso::
    For a detailed description on how to use internal notes, see the
    `System notes manual for editors <https://docs.typo3.org/permalink/typo3/cms-sys-note:for-editors>`_.
