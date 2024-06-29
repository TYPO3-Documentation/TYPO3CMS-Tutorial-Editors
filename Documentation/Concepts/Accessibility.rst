.. include:: /Includes.rst.txt

.. _accessibility:

=============
Accessibility
=============

   Accessibility is the design of products, services, [...]
   or environments so as to be usable by people with disabilities.
   The concept of accessible design and practice of accessible development
   ensures both "direct access" (i.e. unassisted) and "indirect access"
   meaning compatibility with a person's assistive technology
   (computer screen readers, keyboard only access).

   https://en.wikipedia.org/wiki/Accessibility

As an editor, it is your responsibility to help provide accessible content.

Writing accessible text
=======================

See also the following W3C page:
`Writing for Web Accessibility <https://www.w3.org/WAI/tips/writing/>`__

Provide informative, unique page titles
---------------------------------------

The title of a page can - in most cases - be influenced in the
:ref:`page properties <pages-properties>`. Part of the page title - such as the
name of the organization - might be added automatically. Ask your developer
about this.

Use headings to convey meaning and structure
--------------------------------------------

Almost all content elements have the ability to provide a heading.

Depending on your user rights you may also be able to influence the level of
the heading (:guilabel:`Headlines > Type`). The choice of the level of the
heading should be made in accordance to the semantics of the text and not according to
design choices.

The :ref:`rich text editor (RTE) <rte>` also offers the ability to create
headlines of different levels.

Make link text meaningful
-------------------------

When :ref:`creating links in the RTE <rte-linking>` write the meaningful link
text, highlight it and then click the link button.

If you are linking an image the image should have a meaningful alternative text.

It is also possible to link headlines of content elements. In this case the
text of the headline itself becomes the link text.

Write meaningful text alternatives for images
---------------------------------------------

.. seealso::
   Writing alternative text can prove difficult. Here is a
   helpful guide: https://axesslab.com/alt-texts/ .

In TYPO3 when you are uploading or managing an image file in the module
:guilabel:`File > Filelist` you can provide an alternative text in the
:ref:`metadata <file-metadata>` of this file.

When you are displaying an image as :guilabel:`Image` content element you
can :ref:`override <override_image_metadata>` the alternative text to fit the
context or use the default.

.. note::
   An alternative image text is usually not visible. However, the description
   of an image is usually displayed below the image. Therefore the alternative
   text needs to supply the information supplied by the image to most users. The
   description text should supply additional information to all users.
