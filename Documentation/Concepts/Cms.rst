.. include:: /Includes.rst.txt

.. _cms:

================================
CMS - content management system
================================

TYPO3 is a content management system, also called CMS for short. It is mainly
used to display content (texts and media).

As an enterprise content management system TYPO3 supports multiple users in
a collaborative environment and :ref:`digital asset management <fal>`.


.. _content-presentation:

Separation of content and presentation
=======================================

   Separation of content and presentation is the separation of concerns design
   principle as applied to the authoring and presentation of content.

   https://en.wikipedia.org/wiki/Separation_of_content_and_presentation

In TYPO3 the content in its raw form is edited in the backend, while the
presentation is achieved in the frontend:

.. figure:: /Images/Illustrations/backend_frontend.png
   :alt: Backend and frontend of TYPO3 as an illustration
   :class: with-shadow

   Backend and frontend of TYPO3 as an illustration

In the backend you could for example define that a headline should have level 2.
This would be a content decision. However in the frontend this headline is
displayed in red and underlined. This is one example of what the presentation
does.

The presentation is influenced by the :doc:`sitepackage <t3sitepackage/Index>`
that your integrator or developer configured.
