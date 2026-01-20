..  include:: /Includes.rst.txt

..  _pages-properties:

===============
Page properties
===============

..  youtube:: AS9PhYqVtns

------------

To access the page properties, click on the :guilabel:`Edit page properties`
icon in the Docheader.

..  figure:: /Images/ManualScreenshots/Page/EditPageProperties.png
    :alt: The "Edit page properties" button is located in the doc-header of the page module
    :zoom: gallery

    Click the "Edit page properties" button to open the properties

The page properties that are available depend on the page type, your user
permissions, and the configuration of the TYPO3 installation. The default
properties available for the *Standard* page type include:

..  contents::
    :depth: 1

..  _pages-properties-general:

General
=======

This tab contains general information about the page. You
can change the :guilabel:`Page Type`, and edit titles for the page and the URL.

The following fields are of interest:

..  contents::
    :local:
    :depth: 1

..  _pages-properties-url-type:

Page Type
---------

The page types listed here vary with how the site package is defined and your
user rights.

See chapter `Page types <https://docs.typo3.org/permalink/t3editors:pages-types>`_
for details.

..  _pages-properties-titles:

Page Title / Alternative Navigation Title
-----------------------------------------

The :guilabel:`Page Title` is used as label in menus and in the `<title>` tag in
the HTML header. It is also used to generate the URL Segment.

When you specify an :guilabel:`Alternative Navigation Title` this title is used
as label in the menus while other usages of the "Page Title" stay unchanged.

The "Subtitle" is only used if your site package configured it to be output
somewhere.

..  _pages-properties-url-segment:

URL Segment
-----------

The "URL Segment", sometimes also called "Slug" is used to calculate the URL
at which your page is available. Usually it is filled out automatically.

..  figure:: /Images/ManualScreenshots/Page/RecalculateSlug.png
    :alt: Location of the "Recalculate URL Segment" button at the end of the "URL Segment" field in the page properties
    :zoom: gallery

    When you renamed or moved a page and also want to change the "URL Segment",
    click the "Recalculate URL Segment" button.

If the "Redirects" system extension is installed, an automatic redirect from
the old to the new URL is created:

..  figure:: /Images/ManualScreenshots/Page/RedirectCreated.png
    :alt: Info: Slugs updated and redirects created: Because you renamed a slug, the slugs of all sub-pages were updated and redirects were created for you automatically.
    :zoom: gallery

    If you accidentally changed a URL segment you can revert that change here

It is also possible to edit the URL segment by clicking the "Toggle" button.
You can then enter a different URL segment:

..  figure:: /Images/ManualScreenshots/Page/RecalculateSlug.png
    :alt: Manually editing a URL segment by clicking the "Toggle" button
    :zoom: gallery

..  _pages-properties-seo:

SEO
===

This tab is used for search engine optimization. It uses the cs_seo system
extension. See section
`SEO Tab <https://docs.typo3.org/permalink/t3editors:seo-page-properties-seo>`_
in chapter
`Search engine optimization (SEO) for TYPO3 editors <https://docs.typo3.org/permalink/t3editors:seo>`_
for more information.


..  _pages-properties-social-media:

Social media
============

The fields on this tab are used to enrich social media snippets for the URL of
the page. See section
`Social media tab <https://docs.typo3.org/permalink/t3editors:seo-page-properties-social-media>`_
in chapter
`Search engine optimization (SEO) for TYPO3 editors <https://docs.typo3.org/permalink/t3editors:seo>`_
for more information.

..  _pages-properties-metadata:

Metadata
========

The fields available on this tab depend on how your site is configured. How the
data is used by the frontend depends on TypoScript which depends on your site
configuration.

Typically, you might see the :guilabel:`Abstract` field, and editorial
details like :guilabel:`Author Name` and :guilabel:`Last Update`.

..  _pages-properties-appearance:

Appearance
==========

This tab contains properties that influence how the page is rendered. By default
it contains settings for the page layout, which influences the pages appearance
in both the frontend and the Page Module in the backend. Sometimes a site package
defines additional fields in this tab regarding appearance. Refer to the
documentation of your site package or ask your integrator.

..  _pages-properties-page-layout:

Page Layout / Backend Layout
----------------------------

..  figure:: /Images/ManualScreenshots/Page/BackendLayout.png
    :alt: The Backend Layout is found in the tab "Appearance" of the page properties in the TYPO3 Backend

Backend Layouts influence the general structure of a page not only in the
backend but also in the frontend. A Backend Layout influences, which content
areas are available in the Page Module to
`Manage content <https://docs.typo3.org/permalink/t3editors:content-working>`_
in them. A Backend Layout is usually bound to its own frontend template which
influences the appearance in the frontend.

..  _pages-properties-behaviour:

Behaviour
=========

In this tab there is usually not much to do for an editor. Advanced editors can
use it to exclude certain pages from the search.

..  _pages-properties-resources:

Resources
=========

This tab lets you link media files to the current page.
How those files are handled depends on your frontend rendering
configuration.

..  _pages-properties-accesss:

Access
======

This tab lets you control the visibility of the page.

For more information, see :ref:`Elements visibility <visibility>`.

..  _pages-properties-categories:

Categories
==========

How categories for pages are used during rendering is up to the site package.
By default they do not do anything.

..  _pages-properties-notes:

Notes
=====

Use this tab for your own editorial notes and internal comments, such as
reminders or to-do lists.

..  figure:: /Images/ManualScreenshots/Page/RecordInformation.png
    :alt: Screenshot demonstrating the location of the "Record information" at the top of the Page Properties
    :zoom: gallery

    Notes display in the backend above the Page Properties tabs. They are not
    displayed in the frontend.

..  _pages-properties-video:

YouTube Video "Page Properties" (TYPO3 11.5)
============================================

..  youtube:: dtRKsxzjKj0
