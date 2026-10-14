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

..  _deeplinking-qr-code:

Sharing a preview with a QR code
================================

..  versionadded:: 14.2
    :changelog: feature-108720-1769035130

A QR code takes you to the page in the frontend, for example to check the
page on your phone, or to show it to someone else. There are two ways to open
the QR code of a page:

*   In the page tree, right-click the page and choose
    :guilabel:`Show QR code`. The context menu of a page offers the item
    wherever a page is listed.
*   In the modules :guilabel:`Content > Records` and
    :guilabel:`Content > Preview`, click the :guilabel:`Show QR code` button
    in the top bar.

..  figure:: /Images/GeneratedScreenshots/DeepLinking/QrCodeContextMenu.png
    :alt: The context menu of the page "Packing List" in the page tree, with
        the item "Show QR code"
    :align: left
    :zoom: lightbox

..  figure:: /Images/GeneratedScreenshots/DeepLinking/QrCodeModal.png
    :alt: The dialog "QR Code for Page Preview" with the QR code and the URL
        of the page "Packing List"
    :align: left
    :zoom: lightbox

..  rst-class:: clear-both

A dialog shows the QR code. Scan it with the camera of your phone or tablet
to open the page. Below the code, the field :guilabel:`URL` shows the address
of the page, and :guilabel:`Copy URL` copies it.

In a workspace, the QR code leads to a preview of the changes in the
workspace, which works without logging in to the backend. You can send it to
colleagues or clients who have no backend account, so they can review the
changes before they are published. The module :guilabel:`Content > Publish`
offers the QR code for each change in its list as well.
