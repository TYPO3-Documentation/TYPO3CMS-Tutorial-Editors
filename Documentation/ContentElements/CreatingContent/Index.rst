.. include:: /Includes.rst.txt


.. _content-creating:

================
Creating content
================

In the :guilabel:`Web > Page` module, on any page, click the :guilabel:`+
Content` icon where you want to insert content.

.. include:: /Images/AutomaticScreenshots/NewContentElement/CreateNew.rst.txt

This action displays the :guilabel:`Create new content element` window. The
content elements that are available depends on the setup of your TYPO3
installation, and any extensions that may be installed.


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

Plugins are provided by extensions. Not all plugins are available on this tab.
It depends on their architecture or on backend configuration. In some cases
you insert the General Plugin content element, then go to the :guilabel:`Plugin` tab
to select a specific plugin.

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabPlugins.rst.txt


.. _content-special:

Special elements
----------------

Insert plain HTML, or a horizontal divider on the page. The "Insert records"
element lets you reference other content elements, so you can reuse content
from another page without duplicating it.

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabSpecialElements.rst.txt


.. _content-new-element:

Add new content to a page
=========================

#. On a page, click the :guilabel:`+ Content` icon where you want to insert
   content.
#. On the :guilabel:`Typical Page Content` tab, choose the "Text & Media" element.
   This is the most commonly used content type. The
   :guilabel:`Create new Page Content` screen appears.

.. include:: /Images/AutomaticScreenshots/NewContentElement/NewContentElement.rst.txt

#. In the :guilabel:`Header` field, type *New content*.
#. In the :guilabel:`Text` area, type some content. This field uses a
   :ref:`Rich Text Editor<rte>` (RTE).

#. Save and close the content element.
   You can see the newly added element on the page:

.. include:: /Images/AutomaticScreenshots/NewContentElement/ContentSaved.rst.txt
