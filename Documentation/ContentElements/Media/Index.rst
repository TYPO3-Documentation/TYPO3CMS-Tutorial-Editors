:navigation-title: Embedding Videos
..  include:: /Includes.rst.txt

..  _media:

================================================
Embedding videos as content into a TYPO3 website
================================================

..  image:: /Images/ManualScreenshots/ContentElements/TextAndMedia.png
    :alt: Content element Text and Media in the TYPO3 backend
    :class: img-thumbnail float-end ms-1
    :width: 250

The content element "Text & Media" can be used in a similar fashion to the
`Text & Images <https://docs.typo3.org/permalink/t3editors:images>`_ content
element introduced in the previous chapter.

It does however allow additional video and audio formats.

It can also be used to embed video players for YouTube and or Vimeo.

Which formats are allowed depends on the set up of your site. The allowed
file extensions and pseudo formats (YouTube, Vimeo) are listed bellow the
element selector.

This content element can also be used to embed images and audio files.

..  tip::
    There is a large number of third party TYPO3 extensions to display a video
    player or embed a video from an external source. If one of those is used
    refer to the manual of the extension in use.

..  _add-video-to-page:

Add a video to a page
=====================

If you want to embed a previously uploaded video or upload a new video use the
button :guilabel:`Add media file`. If you want to embed a video from an external
source like YouTube or Vimeo, use the button :guilabel:`Add media URL` instead.

..  figure:: /Images/ManualScreenshots/ContentElements/Media.png
    :alt: Tab media of the text and media content element in TYPO3

..  note::
    For security reasons the maximal upload size is limited. Images can have
    large file sizes. If you cannot upload a video yourself, ask your
    administrator to do it for you or upload it on an external plattform and
    embed it.

..  _Configure-the-video:

Configure the video
===================

Use the :guilabel:`Autoplay` setting to specify whether the video should
start playing as soon as the page loads.

You can configure various settings for media files (for example, adding a
border, setting page position and behavior) just as you would to
:ref:`configure an image<Configure-the-image>`.

..  _video-data-privacy:

External video sources and data privacy
=======================================

Using certain external video sources can have legal consequences concerning
data privacy laws in your country.

Talk to your Data Protection Officer (DPO) or legal department. Ask your
integrator to install an extension that ensures you can use YouTube without
data privacy issues on your page.

Extension :composer:`b13/twoclickmedia` enables you to use the
standard "Text & Media" content element while requiring consent from your
readers before any data is sent to YouTube.

Other extensions like :composer:`t3brightside/youtubevideo` provide their own
content element.
