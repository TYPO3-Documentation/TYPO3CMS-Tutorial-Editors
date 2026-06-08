..  include:: /Includes.rst.txt


.. _redirects:

=========
Redirects
=========

With Redirects, users are able to redirect inbound traffic to Pages, Files or External URLs.

.. _redirects-common-scenario:

Scenario - preserving old URLs
==============================

You have successfully migrated your site to TYPO3, however you have several critical
URLs from your old installation such as :samp:`my-site.com/contact-us.aspx` that need
to redirect to pages in your new TYPO3 installation.

You can set up a redirect for :samp:`/contact-us.aspx` that redirects visitors to your
new `Contact Us` page in your TYPO3 installation.

Creating a redirect
===================

From the Link Management module, select :guilabel:`Redirects` followed by :guilabel:`Add redirect`.

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsAddRedirect.png
    :alt: Screenshot of the Add redirect button found within the Redirects submodule

Setting a Source Domain and Source Path
---------------------------------------

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsSourceDomainSourcePath.png
    :alt: Screenshot of the Source Domain and and Source Path fields found within "create new redirect"

Source Domain - this is the domain used in your TYPO3 installation. If you have multiple
domains on a single TYPO3 installation, you will need to specify which one you are
using here.

Source Path - this is the path that will be redirected. Using the example above,
we specify :samp:`/contact-us.aspx` here.

Setting a Target
----------------

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsSourceTarget.png
    :alt: Screenshot of the target field found within "create new redirect"

The Target selector allows us to specify which Page or file is served when visitors
visit or redirected URL.

Using the example above, we would select the `Contact Us` page in the Page Tree.

Access Tab
----------

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsAccess.png
    :alt: Screenshot of the Access Tab found inside Add redirect.
    :class: with-border

:guilabel:`Enabled`: Toggle the redirect on and off.

:guilabel:`Publish Date`: Set a publish date.

:guilabel:`Expiration Date`: Set an expiration date.

Notes Tab
---------

..  figure:: /Images/ManualScreenshots/LinkManagement/GenericNotes.png
    :alt: Screenshot of the Notes Tab found inside Add redirect.
    :class: with-border

Add an internal note that other backend users can view.

Managing existing redirect rules
================================

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsManage.png
    :alt: Screenshot of the Redirects main page, with two example records.

Once a rule has been created, you then have option to edit an existing record,
toggle it on or off and also delete the record.
