..  include:: /Includes.rst.txt

..  _pages-types:

==========
Page types
==========

TYPO3 has distinct **page types** for items in the **page tree**.

..  youtube:: 19kCrgoRH2U

------------

..  _pages-types-default-page-types:

Default page types
==================

TYPO3 includes several page types out of the box.

..  _pages-types-default-page-types-page:

Pages
-----

*   **Standard page:** The default building block for standard web pages.
*   **Backend user section:** A restricted page type that is only displayed in
    the frontend if a user is logged into the TYPO3 backend.

..  _pages-types-default-page-types-link:

Links & redirects
-----------------

*   **Shortcut:** Creates a redirection to another page in your page tree.
    Frontend visitors are forwarded to the other page.
*   **Mount Point:** Similar to a :guilabel:`Shortcut`, but instead of
    redirecting to another page, it redirects to a whole subtree somewhere
    else in the page tree. This is particularly useful for frontend menus and
    means you don't have to duplicate lots of pages in your page tree.
*   **Link:** Similar to a :guilabel:`Shortcut`, but this page type can forward
    users to external URLs, specific content elements, downloadable assets
    (such as files), system folders, email forms, and data from extensions.

..  versionchanged:: 14.0
    Starting in TYPO3 v14, the old page type `Link to External URL` has been
    updated to the enhanced `Link` page type (a "typolink" -
    :ref:`Feature: #17406 <changelog:feature-17406-1762953087>` ).

..  _pages-types-default-page-types-special:

Special Containers
------------------

*   **Folder:** A container for TYPO3 records, plugins, or
    configuration rather than frontend content elements. :guilabel:`Folders`
    are never displayed in the frontend.
*   **Menu Separator**: Adds a visual break into the backend page tree.
    Particularly useful for large websites with many pages.

..  _pages-types-custom-page-types:

Custom page types
=================

If extensions are installed on your TYPO3 website, there may be more page types
available.
