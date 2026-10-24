..  include:: /Includes.rst.txt
..  _rte:

====================
The rich text editor
====================

..  youtube:: 7g4HIEU3uPA

------------

..  image:: /Images/GeneratedScreenshots/ContentElements/RegularText.png
    :alt: Content element Regular Text in the TYPO3 backend
    :class: img-thumbnail float-end ms-1
    :width: 250
    :zoom: gallery

Start by `Creating a content element <https://docs.typo3.org/permalink/t3editors:content-creating>`_
of type "Text & Images", "Text & Media", or "Regular Text Element". You can find them in the
tab `Typical page content <https://docs.typo3.org/permalink/t3editors:content-typical>`_.

The TYPO3 text editing interface is not much different from a word processor.
The options available in the toolbars vary depending on how your TYPO3
installation is configured.

..  figure:: /Images/GeneratedScreenshots/ContentElements/Text/RichTextEditor.png
    :alt: Screenshot of a typical rich text editor in the TYPO3 backend
    :zoom: gallery

    The options you see depend on the configuration of your site

You can format text, set the alignment, insert tables and symbols and add
internal and external links to text.

..  _rte-linking:

Creating a link
===============

..  versionadded:: 15.0
    :changelog: feature-99678-1790186405

In the rich text editor (RTE) write a text. Select the character or collection
of characters that should link to something. You can link to internal TYPO3
pages, files or folders from the Media module, external URL's, email addresses
or phone numbers.

..  figure:: /Images/GeneratedScreenshots/ContentElements/Text/Link.png
    :alt: Linking the highlighted text in the TYPO3 rich text editor
    :zoom: gallery

    Example: Within the RTE the text "Compostela" is selected and we hover over the
    :guilabel:`Link` icon

Click the :guilabel:`Link` icon in the toolbar or use the shortcut :kbd:`Ctrl + K`
or :kbd:`Cmd + K`. Note that this shortcut only works when your focus is within
the RTE editor.

Then a window called :guilabel:`Link Browser` opens.

..  figure:: /Images/GeneratedScreenshots/Link/LinkBrowser.png
    :alt: The TYPO3 CMS link browser
    :zoom: gallery

    Example: Inside the Link Browser. Linking a TYPO3 page or a content element.

To link the page itself click the paper clip of the respective page or
the :guilabel:`Link to ...` button when you already selected a page in the
page tree that pops up in the :guilabel:`Link Browser`. To link to
a content element of a respective page do not click the paper clip but just the
line that appears when you hover over the respective page where you want to
link the respective content element from. On the right side you can click the
content element that you would like to link to.

..  figure:: /Images/ManualScreenshots/Link_Frontend.png
    :alt: The link in the frontend
    :zoom: gallery
    :class: with-shadow

    Example: A link to a content element in the frontend.

When you open the Developer Tools, you can see exactly how the link looks like
in the frontend.

..  figure:: /Images/ManualScreenshots/Developer_tools-Link_frontend.png
    :alt: Link in the frontend opened in the Developer Tools
    :zoom: gallery
    :class: with-shadow

    Example: The source code of the link to a content element in the Developer Tools.

Note that every TYPO3 content element provided by default, for example
"Text & Images", "Text & Media", or "Regular Text Element", has a unique id
marked with `c` for "content element" and a unique number. With this we are able
to link every content element by default when we know its id.

Note, when you did not select a text and clicked the :guilabel:`Link` then you
see a raw TYPO3 link, for example
`<a href="/camino/camino-route-comparison">t3://page?uid=17</a>` in the frontend.

Within the :guilabel:`Link Browser` you can assign a title and a target to the
link. The title is shown when you hover over the link in the frontend. As target
you can select the options `Top` (`_top`) or `New Window` (`_blank`). This
defines how the new page is shown to you when you click the link.

..  figure:: /Images/ManualScreenshots/Link_Browser_page_marked.png
    :alt: Target and title in the link browser
    :zoom: gallery

    Set target and title individually. Best practice: Select `New Window` as
    target.

..  _rte-linking-internal:

Internal links
--------------

You can link to an internal file, folder, page or content element on a page.

On the :guilabel:`Page` tab, select the page in the page tree that you want
to link to, then click the :guilabel:`Link to ...` button.

You can also link to uploaded files, for example PDF files:

..  figure:: /Images/GeneratedScreenshots/Link/LinkBrowserFile.png
    :alt: Linking to a file for download in TYPO3
    :zoom: gallery

..  _rte-linking-external:

External links
--------------

#.  In the :guilabel:`Link Browser` window, go to the :guilabel:`External URL` tab.
#.  Type your link in the :guilabel:`URL` field.
#.  In the Target drop-down list, select :guilabel:`New window` to open the
    link in a new browser window.

    ..  figure:: /Images/GeneratedScreenshots/Link/LinkBrowserExternal.png
        :alt: Display the anchors on a page
        :zoom: gallery

#.  Click the :guilabel:`Set Link` button to close the :guilabel:`Link Browser`
    window.

..  _rte-edit-or-remove-linking:

Edit or remove a link
=====================

To edit a link or unlink click over the respective text then you can click
:guilabel:`Edit link` or :guilabel:`Unlink`.

..  figure:: /Images/ManualScreenshots/Unlink_or_remove_link.png
    :alt: Edit link or unlink
    :zoom: gallery

    Edit the link or unlink text by clicking the respective linked texts

..  _rte-linking-preview:

Checking and opening a link
===========================

..  versionadded:: 15.0
    :changelog: feature-99678-1790186405

When you put your cursor into a link, a popover shows where the link goes.
For a page or a file, it shows the icon and the title of the target. Hover
over the title to see the path of the page or file. For an external link, the
popover shows the address.

To open the link in a new browser tab, click the
:guilabel:`Open link in new tab` button in the popover. You can also click
the link while you hold :kbd:`Ctrl`, or :kbd:`Cmd` on a Mac, or press
:kbd:`Alt` + :kbd:`Enter` while your cursor is in the link. A link to a page
opens the page in the frontend, and a link to a file opens the file.


..  _rte-whitespace:

Non-breaking spaces and soft hyphens
====================================

Two characters that are normally invisible are highlighted with a colour in the
rich text editor so that you can see where they have been placed:

*   A **non-breaking space** keeps two words together on the same line, so they
    are never split across a line break.
*   A **soft hyphen** marks a point where a word may be hyphenated and wrapped to
    the next line, but only if the word does not otherwise fit.

The colour highlighting is only shown while you edit. It helps you spot these
characters in the editor and does not appear on the website itself.

..  figure:: /Images/GeneratedScreenshots/ContentElements/Text/Whitespace.png
    :alt: A non-breaking space and a soft hyphen highlighted in the rich text editor
    :zoom: gallery

You can insert both characters with a :ref:`keyboard command
<keyboard-commands-rte>`.
