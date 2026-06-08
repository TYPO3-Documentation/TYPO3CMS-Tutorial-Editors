..  include:: /Includes.rst.txt


.. _qr-codes:

====================
Quick Response Codes
====================

In this chapter you will learn how to create Quick Response codes and have them
link to pages in TYPO3's Page Tree, ready to be shared.

Scenario - sharing your QR Code
===============================
You have a Christmas marketing campaign coming up and you're getting ready to print
several hundred flyers to promote your campaign.

You want to add a QR Code to your flyer so that when a potential customer scans it, they are
sent to a specific page in your TYPO3 installation.

Using the QR Code feature, you can:

- Generate a QR Code
- Point it to a page in the Page tree.
- Download the QR Code either as a PNG or SVG and then send it to your design department so that they can add it to the flyer

Creating a QR Code
==================

From the Link Management module, select :guilabel:`QR Codes` followed by :guilabel:`Add QR Code` or :guilabel:`Create new QR Code`.

..  figure:: /Images/ManualScreenshots/LinkManagement/QRCAddQRC.png
    :alt: Screenshot of the Add QR Code button found within the QR Code submodule
    :class: with-border

General Tab
-----------

..  figure:: /Images/ManualScreenshots/LinkManagement/QRCAddQRCGeneral.png
    :alt: Screenshot of the General Tab found inside Add QR Code.
    :class: with-border

:guilabel:`Source Domain`: Select the domain you wish to link to the QRC. If you only have one site in your installation, there will be only one option to choose from.

:guilabel:`Target`: Specify which page in the :guilabel:`Page Tree` your QRC will point to. It is also possible to link to Files stored in TYPO3 and also point to external URLs.

:guilabel:`Force SSL Redirect`: Force all requests to be served via https.

Access Tab
----------

..  figure:: /Images/ManualScreenshots/LinkManagement/QRCAddQRCAccess.png
    :alt: Screenshot of the Access Tab found inside Add QR Code.
    :class: with-border

:guilabel:`Enabled`: Toggle the QRC on and off.

:guilabel:`Publish Date`: Set a publish date.

:guilabel:`Expiration Date`: Set an expiration date.

Notes Tab
---------

..  figure:: /Images/ManualScreenshots/LinkManagement/GenericNotes.png
    :alt: Screenshot of the Notes Tab found inside Add QR Code.
    :class: with-border

Add an internal note that other backend users can view.

Downloading your new QR Code
============================

..  figure:: /Images/ManualScreenshots/LinkManagement/QRCDownload.png
    :alt: Screenshot of the Access Tab found inside Add QR Code.
    :class: with-border

Once you have created your QRC, it can then be downloaded via two different formats with several pre-set sizes available.

PNG: `64x64`, `128x128`, `256x256` and `512x512`

SVG: `64x64`, `128x128`, `256x256` and `512x512`

Edit an existing QR Code
========================

..  figure:: /Images/ManualScreenshots/LinkManagement/QRCEdit.png
    :alt: Screenshot of the Access Tab found inside Add QR Code.
    :class: with-border

:guilabel:`Show QR Code`: Download the QRC.

:guilabel:`Edit Icon`: Once a QRC has been created, it is possible to change where it points to.

:guilabel:`Hide`: Enable or disable the QRC without deleting it.

:guilabel:`Delete`: Delete the QRC.
