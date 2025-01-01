..  include:: /Includes.rst.txt


..  _access-control:

==============
Access Control
==============

There are many ways to restrict access to pages, content elements
and other information in your TYPO3 CMS installation. Options can range from
hiding pages in menus, to limiting visibility of content for a set time
period, all the way through to requiring visitors to log in to view content.

..  card-grid::
    :columns: 1
    :columns-md: 2
    :gap: 4
    :class: pb-4
    :card-height: 100

    ..  card:: :ref:`Visibility<visibility>`

        When an element is hidden, be it a page, a content element or a news item,
        it will not display in the frontend. You can, however, preview it in the backend.

    ..  card:: :ref:`Frontend Login<frontend-login>`

        Find out how to configure content and pages to only be visible
        to frontend users who have logged in to a restricted area.

..  toctree::
    :maxdepth: 2
    :titlesonly:
    :hidden:

    Visibility/Index
    Login/Index
