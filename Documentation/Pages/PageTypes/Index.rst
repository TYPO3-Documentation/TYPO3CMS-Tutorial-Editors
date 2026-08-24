..  include:: /Includes.rst.txt

..  _pages-types:

==========
Page types
==========

Each item in the **page tree** has a distinct **page type**.

..  youtube:: 19kCrgoRH2U

------------

..  _pages-types-default-page-types:

Default page types
==================

TYPO3 includes several page types out of the box.

..  _pages-types-default-page-types-page:

Pages
-----

Standard
    The default building block for standard web pages.

Backend User Section
    A restricted page type that is only displayed in the frontend if a user is
    logged into the TYPO3 backend.

..  _pages-types-default-page-types-link:

Links & redirects
-----------------

Shortcut
    Creates a redirection to another page in your page tree. Frontend visitors
    are forwarded to the other page.

Mount Point
    Similar to a :guilabel:`Shortcut`, but instead of redirecting to another
    page, it redirects to a whole subtree somewhere else in the page tree. This
    is particularly useful for frontend menus and means you don't have to
    duplicate lots of pages in your page tree.

Link
    Similar to a :guilabel:`Shortcut`, but this page type can forward users to
    external URLs, individual content elements/page sections, downloadable
    assets (such as files), system folders, email forms, and data from
    extensions.

..  _pages-types-default-page-types-special:

Special containers
------------------

Folder
    A simple container used to store records (data from extensions) or pages.
    Containers are hidden in the frontend. Records are usually stored in
    containers and then referenced via plugins on other pages. Pages that are
    not included in the main menu are usually stored in containers (for
    example, a footer menu container)

Menu Separator
    A separator element that can be used as a visual separator in the backend
    page tree. Menu separators can also be referenced in **TypoScript** (the
    TYPO3 frontend configuration language) to add lines/spaces to navigation
    menus in the frontend.

..  _pages-types-custom-page-types:

Other page types
================

If you have a site package or other extensions installed on your TYPO3 website,
there may be more page types.
