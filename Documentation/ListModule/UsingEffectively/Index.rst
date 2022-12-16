.. include:: /Includes.rst.txt
.. _using-the-list-module-effectively:

============
Introduction
============

The list module allows you to browse through
each page or folder within your site and view all of the records that
are stored within it. The List Module also gives you the ability to
create and manage records that don't have a dedicated Module.

Sub pages, content elements and news stories are examples of the different
kinds of records that can be stored on any given page.

=====================
Using the list module
=====================

Select the :guilabel:`Web > List` module and browse to the
"Congratulations" page. You should see the following:

.. include:: /Images/AutomaticScreenshots/ListModule/ListModule.rst.txt

The list view displays a list of records stored on the
current page, grouped by type. The name which appears for each record
depends on which field is used as label. For "pages", the field is
"Pagetitle".

The list view offers several different action icons in the **Docheader**:

1. **Create** a new record (a wizard appears to let you choose which type)

2. **View** the current page (in the frontend)

3. **Edit** the current page

4. **Search** in the current page

5. **Clear the cache** of the current page

6. **Refresh** the List view

7. **Bookmark** this view

8. **Copy URL** to this view

9. Access **contextual help** (removed with version 12.0)

.. todo: update screenshot

In the **Content Area**, action icons are also available:

.. include:: /Images/AutomaticScreenshots/ListModule/ListModuleContentArea.rst.txt


#. Create a **new page record**

#. Action icons for the record. What icons appear here depends on the record
   type selected. If the record is viewable in the frontend (as "pages" are), a "View"
   icon is displayed. All records will have the next three icons, respectively
   "Edit", "Hide/unhide" (i.e. visible in the frontend or not) and "Delete".

   The ellipsis icon (three consecutive dots) expands the icon list to show
   additional action icons (typically for accessing information, moving around, etc.)

   Lastly, the cut and paste icons.

.. todo: the "Extended view" option does not exist anymore

If you wish to have the list of icons expanded all the time, you can check the
:guilabel:`Extended view` box at the very bottom of the view.

Also make sure that the :guilabel:`Show clipboard` box is checked, as we
will explore this next.

If you plan to manage a multilingual web site, you will want to
check the :guilabel:`Localization view` checkbox.
