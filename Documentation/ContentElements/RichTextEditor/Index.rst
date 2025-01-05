..  include:: /Includes.rst.txt
..  _rte:

====================
The rich text editor
====================

..  image:: /Images/ManualScreenshots/ContentElements/RegularText.png
     :alt: Content element Regular Text in the TYPO3 backend
     :class: img-thumbnail float-end ms-1
     :width: 250

Start by `Creating a content element <https://docs.typo3.org/permalink/t3editors:content-creating>`_
of type "Text & Images", "Text & Media", or "Regular Text Element". You can find them in the
tab `Typical page content <https://docs.typo3.org/permalink/t3editors:content-typical>`_.

The TYPO3 text editing interface is not much different from a word processor.
The options available in the toolbars vary depending on how your TYPO3
installation is configured.

..  figure:: /Images/ManualScreenshots/ContentElements/Text/RichTextEditor.png
     :alt: Screenshot of a typical rich text editor in the TYPO3 backend

     The options you see depend on the configuration of your site

You can format text, set the alignment, insert tables and symbols and add
internal and external links to text.

..  _rte-linking:

Creating a link
===============

Select the text you want to link.

Click the :guilabel:`Link` icon in the toolbar or use the shortcut
:kbd:`Ctrl + K` or :kbd:`Cmd + K`.

..  figure:: /Images/ManualScreenshots/ContentElements/Text/Link.png
    :alt: Linking the highlighted text in the TYPO3 rich text editor

The :guilabel:`Link Browser` window displays.

This window lets you link to an internal page, file, folder, external
URL, email address or phone number.

..  _rte-linking-internal:

Internal links
--------------

..  figure:: /Images/ManualScreenshots/Link/LinkBrowser.png
    :alt: The TYPO3 CMS link browser

You can link to an internal file, folder, page or content element on a page.

On the :guilabel:`Page` tab, select the page in the page tree that you want
to link to, then click the :guilabel:`Link to ...` button.

You can also link directly to a content element. In that case an anchor
(link with a hashtag) is used so your readers will automatically jump to the
desired content element.

You can also link to uploaded files, for example PDF files:

..  figure:: /Images/ManualScreenshots/Link/LinkBrowserFile.png
    :alt: Linking to a file for download in TYPO3

..  _rte-linking-external:

External links
--------------

#.  In the :guilabel:`Link Browser` window, go to the :guilabel:`External URL` tab.
#.  Type your link in the :guilabel:`URL` field.
#.  In the Target drop-down list, select :guilabel:`New window` to open the
    link in a new browser window.

    ..  figure:: /Images/ManualScreenshots/Link/LinkBrowserExternal.png
        :alt: Display the anchors on a page
        :class: with-border

#.  Click the :guilabel:`Set Link` button to close the :guilabel:`Link Browser`
    window.

..  _rte-linking-remove:

Removing a link
===============

To remove a link from text, put your cursor anywhere in the linked text then
click the :guilabel:`Unlink` button in the popover:

..  figure:: /Images/ManualScreenshots/ContentElements/Text/Unlink.png
    :alt: Unlinking using the popover in the rich text editor
