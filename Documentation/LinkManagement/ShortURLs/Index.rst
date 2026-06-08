..  include:: /Includes.rst.txt


.. _short-urls:

==========
Short URLs
==========

Short URLs are a simple and convenient way to share short or "tiny" URLs that point back to Pages in your TYPO3 installation.

Short URLs can point to files such as documents or redirect to external URLs.

Scenario - Shortening a long URL
================================

You want to share a link to your profile page found on your company website, however the URL itself is very long.

With Short URLs you can generate a simple URL that can be shared easily. They can also be
repurposed at a later date and can point to a completely new page or resource.

Creating a Short URL
====================

From the Link Management module, select :guilabel:`Short URLs` followed by :guilabel:`Add Short URL` or :guilabel:`Create a new Short URL`.

..  figure:: /Images/ManualScreenshots/LinkManagement/ShortURLCreate.png
    :alt: Screenshot of the Add Short URL button found within the Short URL submodule
    :class: with-border

General Tab
-----------

..  figure:: /Images/ManualScreenshots/LinkManagement/ShortURLGeneral.png
    :alt: Screenshot of the General Tab found inside Add Short URL.
    :class: with-border

:guilabel:`Short URL`: Select the domain you wish to link to the Short URL. If you only have one site in your installation, there will be only one option to choose from. Then use
the dice icon to generate a random string of text. Note, you can also manually set the Short URL - however this is not recommended.

:guilabel:`Target`: Specify which page in the :guilabel:`Page Tree` your Short URL will point to. It is also possible to link to Files stored in TYPO3 and also point to external URLs.

:guilabel:`Force SSL Redirect`: Force all requests to be served via https.

Access Tab
----------

..  figure:: /Images/ManualScreenshots/LinkManagement/ShortURLAccess.png
    :alt: Screenshot of the Access Tab found inside Add Short URL.
    :class: with-border

:guilabel:`Enabled`: Toggle the Short URL on and off.

:guilabel:`Publish Date`: Set a publish date for when you want the Short URL to become active.

:guilabel:`Expiration Date`: Set an expiration date for when you want the Short URL to be no longer active.

Notes Tab
---------

..  figure:: /Images/ManualScreenshots/LinkManagement/GenericNotes.png
    :alt: Screenshot of the Notes Tab found inside Add Short URL.
    :class: with-border

Add an internal note that other backend users can view.

Edit an existing Short URL
==========================

..  figure:: /Images/ManualScreenshots/LinkManagement/ShortURLEdit.png
    :alt: Screenshot of the Short URL Management Screen
    :class: with-border

:guilabel:`Copy Short URL`: Copy the Short URL to clipboard.

:guilabel:`Edit Icon`: Edit the Short URL.

:guilabel:`Hide`: Enable or disable the Short URL without deleting it.

:guilabel:`Delete`: Delete the Short URL.

:guilabel:`View redirect`: View and test the Short URL.
