.. include:: /Includes.rst.txt

.. _images-new:
.. _images:

===================
Working with images
===================

For content elements that support images (for example Text & Images, Text &
Media, Images Only), you will see an :guilabel:`Images` tab when you create or edit
the content element.

.. include:: /Images/AutomaticScreenshots/EditContent/EditContentImagesTab.rst.txt

It's best practice to add new images using the :guilabel:`File > Filelist`
module, which is covered in the :ref:`chapter about the file module <file-module>`. This method means files are stored centrally
and any information or metadata you add to the image is used wherever that
image is used on the site.

When you use the :guilabel:`Select & upload files` button, the image file is
attached to the page and gets uploaded to the :guilabel:`user_uploads` folder in the :guilabel:`Filelist`.

.. tip::
   By only using :guilabel:`Select & upload files`, your files pile up in the :guilabel:`user_uploads` folder pretty quickly.
   Therefore you should rather upload and organize the files via the :guilabel:`Add Image` button or upload it with the :guilabel:`File > Filelist`
   module directly, as described above.

.. _add-image-to-page:

Add an image to a page
======================

#. On the :guilabel:`Images` tab, click the :guilabel:`Add image` button. The
   :guilabel:`File selector` window displays to let you browse for an image.

   .. include:: /Images/AutomaticScreenshots/Fileadmin/ImageSelector.rst.txt

#. Browse the file tree, then select a folder.
#. Tick the :guilabel:`Display thumbnails` box to show a preview of each image
   in the folder.
#. Click the name of an image to select it. Alternatively, click the
   :guilabel:`+` icon to select multiple images before closing the window.

.. _Configure-the-image:

Configure the image
===================

The :guilabel:`Images` tab lets you perform a number of actions to configure an image.

.. include:: /Images/AutomaticScreenshots/EditContent/EditContentImageProperties.rst.txt

.. _override_image_metadata:

Image metadata
--------------

Use the small arrow next to the thumbnail to collapse and expand this section.

Here you can set general metadata including description and alt text, and
insert a link to the image.

If the file was added using the :guilabel:`File > Filelist`
module (which is best practice), the information displayed here is drawn from
the Filelist. If required, you can override this metadata to set specific
values for the image for the current content element.

You can experiment with the image manipulation editor to crop or resize the
image. Making changes here won't impact the original image file in Filelist.


.. _images-appearance:

Media adjustments
-----------------

Manually specify the width and height of the image in pixels, and apply a
border.

Gallery settings
----------------

Choose where to position the image in relation to the text.

Images are automatically arranged in columns, two by two. You can change this
behaviour with the :guilabel:`Number of Columns` field.


Behavior
--------

Use the :guilabel:`Enlarge on Click` setting to enable a lightbox display for the image.

.. include:: /ContentElements/TipKeyboardCommands.rst
