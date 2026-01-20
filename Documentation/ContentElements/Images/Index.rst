.. include:: /Includes.rst.txt

.. _images-new:
.. _images:

===================
Working with images
===================

..  youtube:: KQ8fh_Ywktk

------------

..  image:: /Images/ManualScreenshots/ContentElements/Images.png
    :alt: Content element Images in the TYPO3 backend
    :class: img-thumbnail float-end ms-1
    :width: 250
    :zoom: gallery

For content elements that support images (for example Text & Images, Text &
Media, Images Only), you will see an :guilabel:`Images` or :guilabel:`Media`
tab when you create or edit the content element.

Start by `Creating a content element <https://docs.typo3.org/permalink/t3editors:content-creating>`_
of type "Text & Images", "Text & Media", or "Images Only". You can find them in the
tab `Typical page content <https://docs.typo3.org/permalink/t3editors:content-typical>`_.

..  _add-image-to-page:

Add an image to the content element
===================================

On the :guilabel:`Images` tab, click the :guilabel:`Add image` button. The
:guilabel:`File selector` window displays to let you browse for an image.

..  figure:: /Images/ManualScreenshots/ContentElements/TextWithImage/ImagesTab.png
    :alt: Screenshot of a "Text with Image" TYPO3 content element, tab "Images"
    :zoom: gallery

    Click the "Add image" button in tab images to chose or upload an image

Browse the file tree, then select a folder.

..  figure:: /Images/ManualScreenshots/ContentElements/TextWithImage/FileSelector.png
    :alt: The file selector window in the TYPO3 backend
    :zoom: gallery

    Click the name of an image to select it or use the "Upload files" dialoge.
    Alternatively, mark several images and import all of them at once.

.. _Configure-the-image:

Configure the image
===================

The :guilabel:`Images` tab lets you perform a number of actions to configure an image.

.. _override_image_metadata:

Image metadata
--------------

Use the small arrow next to the thumbnail to collapse and expand this section.

Here you can set general metadata including description, alt text, and
insert a link to the image.

..  figure:: /Images/ManualScreenshots/ContentElements/TextWithImage/ImageMetaData.png
    :alt: Screenshot of the meta data of an image in a "Text and Image" content element
    :zoom: gallery

    Override the default meta data of the image with custom values for this location.

The information displayed here is drawn from the file metadata set in the
:guilabel:`Media`. If required, you can override this metadata to set specific
values for the image for the current content element.

You can experiment with the image manipulation editor to crop or resize the
image. Making changes here won't impact the original image file in
:guilabel:`Media`.

.. _images-appearance:

Media adjustments
-----------------

Manually specify the width and height of the image in pixels, and apply a
border.

..  figure:: /Images/ManualScreenshots/ContentElements/TextWithImage/MediaAdjustments.png
    :alt: Screenshot of the Media Adjustments section of a "Text and Images" content element in TYPO3
    :zoom: gallery

    A value of '0' means the size is calculated dynamically.

..  note::
    This section is only visible when your site package is based on the
    Site Package Tutorial or on Fluid Styled Content. Site Packages based on
    the Bootstrap Package have means to dynamically set the size of the images.
    The images will resize responsively to fill their container.

.. _images-gallery:

Gallery settings
----------------

Choose where to position the image in relation to the text.

In "Text with Images" content elements you can position the image or images in
respect to the text here.

Multiple images are automatically arranged in columns, two by two. You can change this
behaviour with the :guilabel:`Number of Columns` field.

.. _images-behavior:

Behavior
--------

Use the :guilabel:`Enlarge on Click` setting to enable a lightbox display for the image.

.. include:: /ContentElements/TipKeyboardCommands.rst.txt

..  _images-filelist:
..  _images-media:

Manage your images in the Media module
======================================

..  versionchanged:: 14.0
    This module has been renamed from :guilabel:`Filelist` to :guilabel:`Media`
	see `Feature: #107628 - Improved backend module naming and structure <https://docs.typo3.org/permalink/changelog:feature-107628-1729026000>`_.

You can manage your previously uploaded images in the backend module
:guilabel:`Media`:

..  figure:: /Images/ManualScreenshots/ContentElements/TextWithImage/FileList.png
    :alt: Screenshot of the "Media" backend module in TYPO3
    :zoom: gallery

    You can view the files as Tiles or List by switching the settings.

TYPO3 uses a file abstraction layer (FAL) you can therefore move images into
different folders without impending the frontend output of the web page, even if
they are used in multiple places.

You can move images into folders by drag and drop:

..  figure:: /Images/ManualScreenshots/ContentElements/TextWithImage/FileListDragAndDrop.png
    :alt: Screenshot of the "Media" backend module demonstration Drag and Drop
    :zoom: gallery

    Grab a picture with the mouse, drag it to a folder and drop it there

The file abstraction layer will not allow you to delete images that are still in
use in some content element:

..  figure:: /Images/ManualScreenshots/ContentElements/TextWithImage/FileNotDeleted.png
    :alt: File not deleted, The file "xxx.png" cannot be deleted since it is still used at the following places
    :zoom: gallery

    TYPO3 FAL will prevent you from deleting files that are still in use

First alter or delete all content elements that still use the file, then you can
delete the file itself.

See also chapter `Managing files in the Fileadmin <https://docs.typo3.org/permalink/t3editors:managing-files-in-typo>`_.
