:navigation-title: Copy and paste

..  include:: /Includes.rst.txt
..  _list-copy-paste:

==============================
Copy and paste database record
==============================

You can copy and paste records in the :guilabel:`List` module using the context
menu and then choose "copy" (or cut if you want to move the record instead).

..  tip::
    If you want to copy or move several database records at once, use the
    :ref:`clipboard <clipboard>`.

..  contents:: Table of content

..  _list-copy-paste-howto:

How to copy and paste via list module
=====================================

Open the context menu by clicking the three dots button or the icon to the
left of the record. Copy or cut the database record.

..  figure:: /Images/ManualScreenshots/ListModule/CopyRecord.png
    :alt: The context menu contains options copy and cut amongst others

    Copy or cut a record using the context menu.

To paste the copied record you have several options:

..  figure:: /Images/ManualScreenshots/ListModule/PasteRecord.png
    :alt: Location of the paste buttons in the TYPO3 List module: At the top of the module and in the context menu.

    (1) inserts the record at the end of the other records, with the context menu (2) you can choose the location

..  _list-copy-paste-trouble:

Trouble shooting during copy and paste
======================================

If you see any error messages not listed here, note the date and time, error
message and what you have been doing. Send the information to your site
administrator.

..  _list-copy-paste-copy-1:

Why is the header appended with (copy 1)?
-----------------------------------------

..  figure:: /Images/ManualScreenshots/ListModule/CopyOfRecord.png
    :alt: A copied content element with (copy 1) appended to its header

    The pasted database record is changed to "Some Title (copy 1)"

By default the title of the pasted record is post fixed with "(copy x)" and the
new record is marked as hidden and not displayed in the frontend.

This default behaviour of titles being prefixed can make working with copy and
paste tedious and advanced editors often prefer that the integrator of the site
turns of this behaviour. They can use the setting
:ref:`disablePrependAtCopy <t3tsref:confval-tcemain-disableprependatcopy>` to
disable this.

..  _list-copy-paste-record-on-page:

Attempt to insert record on a page that can't store record type
---------------------------------------------------------------

Some record types, for example frontend user records or category records may
only be created in pages of type "folder". If you try to insert such a record
on a plain page, an error message will be displayed:

..  figure:: /Images/ManualScreenshots/ListModule/RecordOnPageError.png
    :alt: TYPO3 Backend Error: Attempt to insert record "fe_groups:3" on a page (8) that can't store record type

    Result of trying to copy a frontend user group into a plain page

The record was not pasted in this case. Use the page tree to switch to a folder,
for example the folder "Frontend Users" and click the "Paste in clipboard
content" there.

..  _list-copy-paste-unique:

The value of the field "username" has been changed as it is required to be unique
---------------------------------------------------------------------------------

Some fields need to be unique across the complete TYPO3 installation, for example
a user name or identifier.

If you try to copy & paste such a record, the affected fields are automatically
renamed by appending a number.

..  figure:: /Images/ManualScreenshots/ListModule/RecordUnique.png
    :alt: TYPO3 Backend Warning: The value of the field "username" has been changed from "galileo" to "galileo0" as it is required to be unique

    Result of trying to copy a frontend user group into a plain page

The record has been pasted but renamed. Edit the new record and replace the
field with a unique value.
