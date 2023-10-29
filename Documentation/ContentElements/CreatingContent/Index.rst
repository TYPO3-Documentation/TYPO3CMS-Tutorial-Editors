.. include:: /Includes.rst.txt


.. _content-creating:

================
Creating content
================

..  youtube:: RuQ4CikixdY

------------

In the :guilabel:`Web > Page` module, on any page, click the :guilabel:`+
Content` icon in the place where you want to insert content.

.. figure:: /Images/ManualScreenshots/NewContentElement/CreateNew.png
   :alt: Create a new Content Element by clicking the button
   :class: with-shadow

   Create a new Content Element by clicking the button

The :guilabel:`Create new content element` window will then be displayed. The
content elements that are available depend on the setup of your TYPO3
installation and the extensions that are installed.


.. _content-types:

Types of content elements
=========================

.. note::
   If you are working with the `Introduction Package <https://extensions.typo3.org/extension/introduction/>`__, you will see more
   content elements than described here. That's because the `Bootstrap Package <https://extensions.typo3.org/extension/bootstrap_package/>`__
   (which is a dependency of the `Introduction Package <https://extensions.typo3.org/extension/introduction/>`__) comes with several content elements of its own.

   This page describes the **TYPO3 Core** content elements.


.. _content-typical:

Typical page content
--------------------

Insert regular text and image content types to build standard web pages.

.. figure:: /Images/ManualScreenshots/NewContentElement/WizardTabTypical.png
   :alt: The 'Typical page content' tab of the new content element window
   :class: with-shadow

   The :guilabel:`Typical page content` tab of the new content element window


.. _content-form:

Form elements
-------------

Create a login form or a simple contact form.

.. figure:: /Images/ManualScreenshots/NewContentElement/WizardTabForm.png
   :alt: The 'Form elements' tab of the new content element window
   :class: with-shadow

   The :guilabel:`Form elements` tab of the new content element window



.. _content-menu:

Menu elements
-------------

Present a menu or list of page links in different ways.

.. figure:: /Images/ManualScreenshots/NewContentElement/WizardTabMenu.png
   :alt: The 'Menu' tab of the new content element window
   :class: with-shadow

   The :guilabel:`Menu` tab of the new content element window


.. _content-plugin:

Plugins
-------

Plugins are provided by extensions. Plugins that are available on this tab will
depend on the individual plugin architecture or on the backend configuration.
In some cases a plugin is made available by adding the "General Plugin" content
element and then selecting the plugin itself on the :guilabel:`Plugin` tab.

.. figure:: /Images/ManualScreenshots/NewContentElement/WizardTabPlugins.png
   :alt: The 'Plugins' tab of the new content element window
   :class: with-shadow

   The :guilabel:`Plugins` tab of the new content element window


.. _content-special:

Special elements
----------------

Insert plain HTML, or a horizontal divider on the page. The "Insert records"
element lets you reference other content elements, i.e. reuse a content
element from another page without duplicating it.

.. figure:: /Images/ManualScreenshots/NewContentElement/WizardTabSpecialElements.png
   :alt: The 'Special elements' tab of the new content element window
   :class: with-shadow

   The :guilabel:`Plugins` tab of the new content element window


.. _content-new-element:

Add new content to a page
=========================

#. On a page, click the :guilabel:`+ Content` icon in the place where you want
   to insert content.
#. On the :guilabel:`Typical Page Content` tab, choose the "Text & Media" element.
   This is the most commonly used content type. The
   :guilabel:`Create new Page Content` screen appears.

.. figure:: /Images/ManualScreenshots/NewContentElement/NewContentElement.png
   :alt: Empty input form for a Text & Media content element
   :class: with-shadow

   Empty input form for a Text & Media content element

#. In the :guilabel:`Header` field, type *My new content element*.
#. In the :guilabel:`Text` area, type in some text. This field uses a
   :ref:`Rich Text Editor<rte>` (RTE).

#. Save and close the content element.
   You can see the newly added element on the page:

.. figure:: /Images/ManualScreenshots/NewContentElement/ContentSaved.png
   :alt: The new content element appears in the Page module
   :class: with-shadow

   The new content element appears in the Page module
