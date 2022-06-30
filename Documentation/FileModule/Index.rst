.. include:: /Includes.rst.txt
.. index::
   Modules; Filelist
   Filelist
.. _file-module:
.. _the-file-module:
.. _the-file-module-or-image-archives:

=====
Files
=====

The :guilabel:`File > Filelist` module is where you can manage
all the media associated with your TYPO3 web site.

.. index::
   Files; Management
   Directories; fileadmin
.. _managing-files:
.. _managing-files-in-typo:

Managing files in the TYPO3 CMS
===============================

Files including documents and images are managed in the
Filelist module. Similar to the **WEB > List** module,
it displays a navigation tree, which corresponds to the file
structure on the server, and a list of all files for the
selected directory.

.. include:: /Images/AutomaticScreenshots/FilelistModule/FilelistModule.rst.txt

For admin users, the folder displayed by default is called
"fileadmin/ (auto-generated)" and corresponds to the
:file:`fileadmin/` folder located under the document root
folder on your web server.

Using these files inside content elements to display them
or link to them in your web site is covered in the
:ref:`images chapter <images>`.

.. note::

   There are extensions which make it possible to connect to remote
   storage pools (like a WebDAV server or an Amazon S3 account) and work
   with the files as if they were on the TYPO3 CMS server.

.. index:: pair: Files; Metadata
.. _file-metadata:

File metadata
-------------

You can provide metadata for the file by clicking on the button that looka like
a pencil with the title text :guilabel:`Edit Metadata of this file`.

The metadata you provide can include (depending on the setup of the system
and the format of the file):

*  Text to be displayed to all users in some contexts (:guilabel:`Title`,
   :guilabel:`Description`)
*  Text for :ref:`accessibility` such as the :guilabel:`alternative text`
   for an image or a :guilabel:`download name`
*  Data required due to copyright issues
*  Metadata attached to the uploaded file such as information about the
   camera used or the location

.. index:: pair: Files; Clipboard

Clipboard
---------

There's a clipboard just like in the :guilabel:`List` module.

.. include:: /Images/AutomaticScreenshots/FilelistModule/FileClipboard.rst.txt

The handling is the same as the description used in the :ref:`Advanced clipboard usage
<advanced_clipboard_usage>`.


.. index:: Files; Upload
.. _uploading-files:

Uploading new files
-------------------

You can upload files to a given folder by using the context menu
or to the current directory by using the action icon in the docheader.

.. include:: /Images/AutomaticScreenshots/FilelistModule/FileUpload.rst.txt


Next steps
==========

The next chapters cover configuration and administration tasks that
require special access privileges as described in :ref:`privileges`.

