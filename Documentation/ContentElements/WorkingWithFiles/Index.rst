.. ==================================================
.. FOR YOUR INFORMATION
.. --------------------------------------------------
.. -*- coding: utf-8 -*- with BOM.

.. include:: ../../Includes.txt
.. include:: Images.txt


Working with Files
^^^^^^^^^^^^^^^^^^

If you want to include files in your website, you must first upload
them to your web server.

TYPO3 provides the  **filelist** module which can be used to store and
browse files on the server. The files which are stored this way are
**available in the link section of the rich text editor** and  **in
the image section** of content elements. It is good practice not to
upload the files directly in the content elements (Figure 12, Item 5),
but to use the filelist as you can reuse the files you upload here
while you have to upload them again and again, if you use direct
upload.

|img-16| Figure 13

#. Select the  **filelist** module.

#. Where you saw the page tree when you where in the modules in the
   category Web (e.g. in the page module), there now is the  **file-
   tree** . Here you might see one or more folders; clicking on the
   folder icon pops up a menu, clicking on the name shows the content of
   the folder in the work area.

#. This is the  **list of files inside the selected folder** . Clicking
   on the file icon pops up a menu, clicking on the name opens the file.

#. **Add files to this folder** using this button.

#. To  **show thumbnails** of images in this folder check this option.

If this looks completely different on your site, your site is probably
using the extension `Media (DAM) (extension key "dam")
<http://typo3.org/extensions/repository/view/dam/current/>`_ to
organize files.

