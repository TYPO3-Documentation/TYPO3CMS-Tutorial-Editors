.. include:: /Includes.rst.txt


.. _visibility:

Elements visibility
^^^^^^^^^^^^^^^^^^^

The foremost option which acts on an element's visibility is the
"Hidden" check box, which we already saw before. A hidden element,
be it a page, a content element or a news item, will never show
up in the frontend, unless you are previewing from the backend.

As we saw in the :ref:`page properties <pages-properties>`,
a page can also be excluded from appearing in menus and
excluded from the TYPO3 CMS built-in search engine.

In the Core - and in extensions that follow best practices -
all options related to visibility are grouped into a tab
named "Access".


.. _visibility-dates:

Publication dates
"""""""""""""""""

A finer control can be exerted with publication start and end
dates. Any page or content element with a defined "Publish date"
will not be visible before that date. If it has an "Expiration
date", it will disappear from the web site at that point.

.. figure:: ../../Images/AccessPublicationDate.png
   :alt: Setting a publication date for a page


Set a publication date in the future and try to navigate to that
page. You should be redirected to the home page, which is the
default behaviour when trying to access a page that is
unreachable (for whatever reason).

Note the "Extend to Subpages" check box. If checked the
publication date (and other access restrictions) will also apply
to all child pages of the current page. This makes it possible
to apply restrictions to a whole branch of the page tree.
