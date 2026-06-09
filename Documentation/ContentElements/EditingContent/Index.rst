..  include:: /Includes.rst.txt
..  _content-editing:

===============
Editing content
===============

..  youtube:: X1zP1HutQmA

------------

..  image:: /Images/ManualScreenshots/ContentElements/EditContent.png
    :alt: Editing content elements in the TYPO3 backend
    :class: img-thumbnail float-end ms-1
    :width: 250
    :zoom: gallery

On a page, click the pencil icon for the content element you want to edit,
then edit the text and make other changes as required.

..  contents:: Table of contents:

..  _content-editing-change-text:

Changing text and setting in a content element
==============================================

Once you clicked on the edit button you can change text, images and all settings
that you have permissions for. There might be additional settings that only an
advanced editor or an administrator can see and edit. Those might be hidden to
you.

..  figure:: /Images/ManualScreenshots/ContentElements/ChangeText.png
    :alt: Content element edit form screenshot, demonstrating changed content which is highlighted
    :zoom: gallery

    Changed content is highlighted. The save button is found on the top

Content in the Content element forms is not auto-saved. If you try to leave
a form that has changes you will be prompted to save:

..  figure:: /Images/ManualScreenshots/ContentElements/SavingPrompt.png
    :alt: Prompt: Do you want to close without saving? You currently have unsaved changes. Are you sure you want to discard these changes?
    :zoom: gallery

    You are prompted when you try to leave a form with unsaved changes

..  warning::
    You are not prompted about unsaved changes if you close the browser window
    or use the browsers back button!

..  _content-editing-trouble-shooting:

Troubleshooting content element edits
=====================================

..  _content-editing-trouble-shooting-button:

Content element has no edit button
----------------------------------

If you have no permissions to change a content element, you will see that
element in the overview but no edit, hide or delete button appears.

..  figure:: /Images/ManualScreenshots/ContentElements/NoEdit.png
    :alt: A content element without an edit button
    :zoom: gallery

    A content element that cannot be edited due to lacking permissions

Possible reasons:

*   The content element may only be edited by a user or group that created it.
*   Only admins may edit this content element.
*   The content element is of a type that your group may not edit.

An administrator can support you in finding out why you cannot edit this content
element.

..  _content-editing-trouble-saving:

Content element does not get saved
----------------------------------

If one of the fields you edited contains an illegal value now or if you did
not fill out a required field, you cannot save your changes.

..  figure:: /Images/ManualScreenshots/ContentElements/RequiredField.png
    :alt: Screenshot of a required field
    :zoom: gallery

    A required field that has no value prevents saving of a content element

..  figure:: /Images/ManualScreenshots/ContentElements/InputError.png
    :alt: Input error caused by a letter entered in a number field
    :zoom: gallery

    Input error caused by a letter entered in a number field

If the field you changed is on a different then the currently changed tab,
you might not notice it right away.

..  _content-editing-trouble-error:

Error message after saving a content element
--------------------------------------------

Such error messages can happen if you are editing content during or right after
an update. Note the time and exact error message and copy the URL from your
browser where you saw the error. Send these to your integrator or programmer.

..  figure:: /Images/ManualScreenshots/ContentElements/ErrorMessage.png
    :alt: Screenshot of an error message in the TYPO3 backend
    :zoom: gallery

    Such an error can happen during or after updates or when a programmer is
    working on your installation.

..  _content-editing-trouble-changes-not-visible:

Changes not visible in the frontend after saving a content element
------------------------------------------------------------------

There can be various reasons:

*   Your browser cached the old content: Delete your
    `Browser cache <https://docs.typo3.org/permalink/t3editors:browser-cache>`_.
*   Try `Previewing the page without clearing the cache <https://docs.typo3.org/permalink/t3editors:cache-preview>`_.
*   Your changes did not get saved due to an error (see possible errors above).
*   Your site is using `Workspaces <https://docs.typo3.org/permalink/typo3/cms-workspaces:users-guide>`_.
*   Try `Manual cache clearing <https://docs.typo3.org/permalink/t3editors:cache-manual>`_
    if you have the permissions to do so.
*   If problems persist, contact your administrator.

..  _content-editing-type:

Changing the type of an existing content element
================================================

You can also change the content element type by selecting another element from
the :guilabel:`Type` list.

..  figure:: /Images/ManualScreenshots/ContentElements/ChangeType.png
    :alt: Edit form of a content element in the TYPO3 backend, demonstrating the location of the "Type" selector in tab General
    :zoom: gallery

    You can find the "Type" selector in tab General

When you change a content element's type, the TYPO3 backend wants to reload
the screen to display different input fields, you are prompted first:

..  figure:: /Images/ManualScreenshots/ContentElements/RefreshRequired.png
    :alt: Edit form of a content element in the TYPO3 backend, demonstrating the location of the "Type" selector in tab General
    :zoom: gallery

    You can find the "Type" selector in tab General

This action does not delete content. It is saved in the background and will be
restored if you select the applicable content element type again.

..  include:: /ContentElements/TipKeyboardCommands.rst.txt
