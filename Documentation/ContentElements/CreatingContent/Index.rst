.. include:: /Includes.rst.txt


.. _content-creating:

================
Creating content
================

..  youtube:: RuQ4CikixdY

------------

In the :guilabel:`Web > Page` module, on any page, click the :guilabel:`+
Content` icon in the place where you want to insert content.

.. include:: /Images/AutomaticScreenshots/NewContentElement/CreateNew.rst.txt

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

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabTypical.rst.txt


.. _content-form:

Form elements
-------------

Create a login form or a simple contact form.

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabForm.rst.txt


.. _content-menu:

Menu elements
-------------

Present a menu or list of page links in different ways.

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabMenu.rst.txt


.. _content-plugin:

Plugins
-------

Plugins are provided by extensions. Plugins that are available on this tab will
depend on the individual plugin architecture or on the backend configuration.
In some cases a plugin is made available by adding the "General Plugin" content
element and then selecting the plugin itself on the :guilabel:`Plugin` tab.

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabPlugins.rst.txt


.. _content-special:

Special elements
----------------

Insert plain HTML, or a horizontal divider on the page. The "Insert records"
element lets you reference other content elements, i.e. reuse a content
element from another page without duplicating it.

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabSpecialElements.rst.txt


.. _content-new-element:

Add new content to a page
=========================

#. On a page, click the :guilabel:`+ Content` icon in the place where you want
   to insert content.
#. On the :guilabel:`Typical Page Content` tab, choose the "Text & Media" element.
   This is the most commonly used content type. The
   :guilabel:`Create new Page Content` screen appears.

.. include:: /Images/AutomaticScreenshots/NewContentElement/NewContentElement.rst.txt

#. In the :guilabel:`Header` field, type *My new content element*.
#. In the :guilabel:`Text` area, type in some text. This field uses a
   :ref:`Rich Text Editor<rte>` (RTE).

#. Save and close the content element.
   You can see the newly added element on the page:

.. include:: /Images/AutomaticScreenshots/NewContentElement/ContentSaved.rst.txt
