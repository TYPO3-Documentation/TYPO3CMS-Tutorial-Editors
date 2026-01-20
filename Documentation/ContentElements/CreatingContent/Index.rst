..  include:: /Includes.rst.txt


..  _content-creating:

================
Creating content
================

..  youtube:: 834giaL7L6M

------------

..  image:: /Images/ManualScreenshots/ContentElements/CreateContentElement.png
    :alt: Creating content elements in the TYPO3 backend
    :class: img-thumbnail float-end ms-1 ms-1
    :width: 250
    :zoom: gallery

In the :guilabel:`Web > Page` module, on any page, click the :guilabel:`+
Create new content` button in the place where you want to insert content:

The :guilabel:`New Page Content` wizard will then be displayed.

In the following screenshot you see the location of that button:

..  figure:: /Images/ManualScreenshots/NewContentElement/CreateNew.png
    :alt: "Create new content button" in the Content Layout module, column "Normal"
    :zoom: gallery

    Create a new Content Element by clicking the button

..  contents:: Table of contents:

..  _content-types:

Types of content elements
=========================

The content elements you can see here are provided by a standard TYPO3
installation with a site package as described in the
`TYPO3 site package tutorial <https://docs.typo3.org/permalink/t3sitepackage:start>`_.

If you are working with a different setup you might see more, or different
content elements.

Which content elements you can see as an editor also depends on your user rights:

A standard editor can see the following content elements:

..  figure:: /Images/ManualScreenshots/ContentElements/WizardTypical.png
    :alt: Screenshot of the "New Page Content" wizard as seen by a common TYPO3 editor, featuring "Typical Page Content", "Lists" and "Special elements"
    :zoom: gallery

    Screenshot of the "New Page Content" wizard as seen by a common TYPO3 editor

An advanced editor or an administrator can see the following content elements:

..  figure:: /Images/ManualScreenshots/ContentElements/WizardAdvanced.png
    :alt: Screenshot of the "New Page Content" wizard as seen by an advanced TYPO3 editor, additionally including "Form elements", "Menus" and additional "Special elements"
    :zoom: gallery

    An advanced editor sees more groups and more content elements types in some of the groups

..  _content-types-editor:

Content elements seen by a typical TYPO3 editor
===============================================

..  _content-typical:

Typical page content
--------------------

Insert regular text and image content types to build standard web pages.

..  figure:: /Images/ManualScreenshots/NewContentElement/WizardTabTypical.png
    :alt: 'Typical page content' tab contains content like Header, Regular Text Element, Text & Media, Images etc
    :zoom: gallery

    The :guilabel:`Typical page content` tab of the new content element window

..  _content-list:

Lists
-----

Lists can be used for structured content. They provide less flexibility then
standard content elements but are easier to use for their specialized use case.

..  figure:: /Images/ManualScreenshots/NewContentElement/WizardTabList.png
    :alt: The 'List' tab contains content elements like "Bullet List", "Table" and "File Links"
    :zoom: gallery

    The :guilabel:`List` tab of the new content element window

Depending on how the `Rendering is defined in the Site
Package <https://docs.typo3.org/permalink/t3sitepackage:content-element-rendering>`_
the way the results are displayed on the page might vary.

..  _content-types-advanced:

Advanced content elements
=========================

The following content elements are usually visible to advanced users:

..  _content-form:

Form elements
-------------

Create a login form or a simple contact form.

..  figure:: /Images/ManualScreenshots/NewContentElement/WizardTabForm.png
    :alt: Tab "Form elements" with "Form" and "Login Form"
    :zoom: gallery

    The :guilabel:`Form elements` tab of the new content element window

..  _content-menu:

Menu elements
-------------

Present a menu or list of page links in different ways.

..  figure:: /Images/ManualScreenshots/NewContentElement/WizardTabMenu.png
    :alt: The 'Menu' tab of the new content element window
    :zoom: gallery

    The :guilabel:`Menu` tab of the new content element window


..  _content-plugin:

Plugins
-------

The tab "Plugins" is available if the integrator of your site installed an
extension that provides a plugin in this section and you have the required user
rights. Refer to the manual of the extension that provides the plugin for more
information.

..  _content-special:

Special elements
----------------

Insert plain HTML, or a horizontal divider on the page. The "Insert records"
element lets you reference other content elements, i.e. reuse a content
element from another page without duplicating it.

..  figure:: /Images/ManualScreenshots/NewContentElement/WizardTabSpecialElements.png
    :alt: The 'Special elements' tab of the new content element window
    :zoom: gallery

    The :guilabel:`Plugins` tab of the new content element window


..  _content-new-element:

Add new content to a page
=========================

#.  On a page, click the :guilabel:`+ Create new content` button in the area
    where you want to insert content.
#.  On the :guilabel:`Typical Page Content` tab, choose the "Text & Media" element.
    This is the most commonly used content type. The
    :guilabel:`Create new Page Content` form appears.

    ..  figure:: /Images/ManualScreenshots/NewContentElement/NewContentElement.png
        :alt: Create new Page Content on page "Page 1" form screenshot
        :zoom: gallery

        Unsaved changes are highlighted in light blue

#.  In the :guilabel:`Header` field, type *My new content element*.
#.  In the :guilabel:`Text` area, type in some text. This field uses a
    :ref:`Rich Text Editor<rte>` (RTE).

#.  Save and close the content element.
    You can see the newly added element on the page:

..  figure:: /Images/ManualScreenshots/NewContentElement/ContentSaved.png
    :alt: The new content element appears in the Content Layout module
    :zoom: gallery

    The new content element appears in the Content Layout module

..  include:: /ContentElements/TipKeyboardCommands.rst.txt
