..  include:: /Includes.rst.txt


.. _redirects:

=========
Redirects
=========

With Redirects, users are able to redirect inbound traffic to Pages, Files or External URLs.

.. _redirects-scenario-preserving:

Scenario - preserving old URLs
==============================

You have successfully migrated your site to TYPO3, however you have several critical
URLs from your old installation such as :samp:`my-site.com/contact-us.aspx` that need
to redirect to pages in your new TYPO3 installation.

You can set up a redirect for :samp:`/contact-us.aspx` that redirects visitors to your
new `Contact Us` page in your TYPO3 installation.

.. _redirects-scenario-preparing:

Scenario - preparing a URL for future use
=========================================

Your company will be attending a trade show next year and instead of providing attendees with a
link to your homepage, you want to point them to a new page with specific information about your
company that will be relevant to people attending the conference.

You can set up a redirect for :samp:`/expo-2027` that points to your home page
and give that to the event organizer.

Then, once you have built your conference specific page, you can update the redirect
so that it points to the new page.

.. _redirects-creating:

Creating a redirect
===================

From the Link Management module, select :guilabel:`Redirects` followed by :guilabel:`Add redirect`.

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsAddRedirect.png
    :alt: Screenshot of the Add redirect button found within the Redirects submodule

.. _redirects-source-domain:

Setting a Source Domain and Source Path
---------------------------------------

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsSourceDomainSourcePath.png
    :alt: Screenshot of the Source Domain and Source Path fields found within "create new redirect"

Source Domain - this is the domain used in your TYPO3 installation. If you have multiple
domains on a single TYPO3 installation, you will need to specify which one you are
using here.

Source Path - this is the path that will be redirected. Using the example above,
we specify :samp:`/contact-us.aspx` here. Note that any query parameters will be ignored.

.. _redirects-target:

Setting a Target
----------------

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsSourceTarget.png
    :alt: Screenshot of the target field found within "create new redirect"

The Target selector allows us to specify which Page or file is served when visitors
visit the redirected URL.

Using the example above, we would select the `Contact Us` page in the Page Tree.

.. _redirects-access-tab:

Access Tab
----------

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsAccess.png
    :alt: Screenshot of the Access Tab found inside Add redirect.
    :class: with-border

:guilabel:`Enabled`: Toggle the redirect on and off.

:guilabel:`Publish Date`: Set a publish date for when you want the Redirect to become active.

:guilabel:`Expiration Date`: Set an expiration date or when you want the Redirect to be no longer active.

.. _redirects-notes-tab:

Notes Tab
---------

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsNotes.png
    :alt: Screenshot of the Notes Tab found inside Add redirect.
    :class: with-border

Add an internal note that other backend users can view.

.. _redirects-managing:

Managing existing redirect rules
================================

..  figure:: /Images/ManualScreenshots/LinkManagement/RedirectsManage.png
    :alt: Screenshot of the Redirects main page, with two example records.

Once a rule has been created, you then have the option to edit an existing record,
toggle it on or off and also delete the record.
