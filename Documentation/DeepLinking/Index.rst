..  include:: /Includes.rst.txt


..  _deeplinking:

============
Deep linking
============

Deep linking allows users to share links to specific pages, content elements and modules
from within TYPO3's backend.

For example, a user could be writing content for a new page that is about
to be published. Using deep links, they can share a link to the page
they are working on or even share a link to the actual content element that contains
their work and send it to another member of the team for review.

..  _deeplinking-sharing:

Sharing links
=============

To share a link, look for the :guilabel:`Share` icon located at the top right hand side of any
page in the backend. Its menu item :guilabel:`Copy URL of this record`
copies the link.

..  figure:: /Images/GeneratedScreenshots/DeepLinking/DeepLinkingIcon.png
    :alt: The Share icon and its menu
    :zoom: lightbox


..  _deeplinking-sharing-linking-page:

Linking to a page
-----------------

The example below creates a deep link to the `Packing List` page:

..  figure:: /Images/GeneratedScreenshots/DeepLinking/DeepLinkingPageLink.png
    :alt: Creating a share link in the page module
    :zoom: lightbox

..  _deeplinking-sharing-linking-content-element:

Linking to a content element
----------------------------

This example creates a deep link to the `Toiletries` content element on the
`Packing List` page:

..  figure:: /Images/GeneratedScreenshots/DeepLinking/DeepLinkingContentElementLink.png
    :alt: Creating a share link to a content element
    :zoom: lightbox

..  _deeplinking-sharing-linking-backend-modules:

Linking to backend modules
--------------------------

It is possible to create links to places within backend modules. This example creates a link
to the setup of the site `Camino` in the :guilabel:`Sites > Setup` module.

..  figure:: /Images/GeneratedScreenshots/DeepLinking/DeepLinkingSiteModuleLink.png
    :alt: Creating a link to the backend Sites module
    :zoom: lightbox

..  _deeplinking-bestpractices:

URLs and deep links
===================

When creating links to anything in the backend, it is recommended that the
:guilabel:`Share` button is used to generate the link. Copying the URL from the browser
is not recommended.
