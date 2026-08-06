..  include:: /Includes.rst.txt

..  _pages-types:

==========
Page types
==========

..  youtube:: 19kCrgoRH2U

------------

..  versionchanged:: 14.0
    The former page type `Link to External URL` has changed its name to `Link`
    and has a lot more features now.
    See
    :ref:`Feature: #17406 - Enhance page type "Link" to fully support typolinks <changelog:feature-17406-1762953087>`

Default page types
==================

By default, TYPO3 includes the following page types.

Page
----

Standard
    This is the default page type, and the most common. It covers all basic
    needs.

Backend User Section
    This page type only displays in the frontend for a specific group of backend
    users. You have to be logged in to the backend to see this type of page.

Link
----

Shortcut
    This page type is a shortcut to another page in the page tree. When users
    navigate to this page in the frontend, they will be taken seamlessly to the
    shortcut's destination.

Mount point
    A mount point lets you select any other page in the page tree. All
    child pages of the chosen page will display as child pages of the mount
    point. This lets you duplicate parts of your page tree in terms of
    navigation, without actually duplicating pages and content.

    See the :ref:`Mounts <t3coreapi:access-options-mounts>` section in "TYPO3
    Explained" for more information about mount points.

Link
    This page type is similar to the :guilabel:`Shortcut` type but leads the
    user to external URLs, other pages, content elements, sections, files,
    folders, email addresses or custom records (for example news records).

Special
-------

Folder
    A folder page type is a container. It is generally used to store records
    other than pages or content elements. It will not display in the frontend.

Menu separator
    This page type creates a visual separation in the page tree. You can use
    TypoScript to also display these separators in the frontend navigation.


Custom page types
=================

Depending on the project, custom page types may also be available.
