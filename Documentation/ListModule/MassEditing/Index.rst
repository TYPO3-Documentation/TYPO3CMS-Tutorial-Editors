..  include:: /Includes.rst.txt
..  index:: Editing; Mass editing
..  _mass-editing:

============
Mass editing
============

The :guilabel:`List` module makes it possible to display the content of several
fields at once and gives you the ability edit several records with
one action.

Choose the columns to be displayed by clicking the :guilabel:`Show Columns`
button.

..  figure:: /Images/ManualScreenshots/ListModule/MassEdit/ShowColumnsButton.png
    :alt: Screenshot demonstrating the location of the "Show Columns" Button in the TYPO3 List module

    The Show Columns button

Then chose the field or fields from the modal. Select the :guilabel:`Type`
field for now and click on the :guilabel:`Update` button.

..  figure:: /Images/ManualScreenshots/ListModule/MassEdit/ShowColumnsModal.png
    :alt: Screenshot of the "Show columns for Page Content" popup

    Choose the fields to be displayed and click "Update"

This makes the :guilabel:`Type` field appear in a new column to the right
of the record list:

..  figure:: /Images/ManualScreenshots/ListModule/MassEdit/RecordListWithAdditionalFields.png
    :alt: List Module table with additional fields enabled

    Click on the title or arrow to enable mass edit mode

..  _editing-all-headers:
..  _selective-editing-fields:

Edit selected fields
====================

To enable mass editing you have to switch into the record list single view by
clicking the tables title:

..  figure:: /Images/ManualScreenshots/ListModule/MassEdit/MassEditingEnabled.png
    :alt: Screen shot of the mass edit mode in the list module, edit buttons above columns visible

    1: Edit all headers 2: Edit all Selected Fields 3: Edit just one field

To edit the headers of all records in one go, select the pencil icon next to the
"Header" label (1).

You will then see a screen with input fields to change all headers and save
them all at once.

All fields that are currently viewable can be edited at the same
time by selecting a different icon (2) in the screenshot above.

The result is almost the same form, but with several fields per database record
displayed.

..  _selective-editing:

Edit selected fields of selected records
========================================

It is possible to select only those records that should be edited by using the
checkboxes:

..  figure:: /Images/ManualScreenshots/ListModule/MassEdit/SelectiveEditing.png
    :alt: The list module with specific database records checked for mass edit

    Selecting records for editing

The result is a form for editing just the chosen field for the
selected records.
