.. include:: /Includes.rst.txt


.. _pages-types:

==========
Page types
==========

TYPO3 CMS offers many useful page types by default. They are
shortly described in this chapter.

Standard
  As the name implies this is the default page type and the most common
  you will use. It covers all basic needs.

Shortcut
  A shortcut to another page in the page tree. When users navigate
  to such a page, they will be taken transparently to the shortcut's
  destination.

Link to External URL
  This is similar to the "Shortcut" type but leads the user to a
  page on another web site.

Mount point
  A mount point lets you select any other page in the page tree. All
  child pages of the chosen page will appear as child pages of the mount
  point. In effect this lets you duplicate a part your page tree
  in terms of navigation, without actually duplicating pages and content
  in the backend.

  Mount points are a very powerful feature of TYPO3 CMS, although sometimes
  tricky to use.

Folder
  A folder-type page is simply a container. It will not appear in the
  frontend. It is generally used to store other types of records than
  pages or content elements.

Menu separator
  Creates a visual separation in the page tree and, if configured, also
  in the frontend navigation. Configuring usage of menu separators in the
  frontend is achieved using TypoScript.

Recycler
  This is similar to the "Folder" type, but indicates that the content
  is meant for removal. However it offers no cleanup function. It is just
  a visual indication.

Backend User Section
  Such a page will appear in the frontend only for a specific group
  of backend users (which means you have to be logged into the
  backend to see such pages).
