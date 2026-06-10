..  include:: /Includes.rst.txt


..  _link-management:

===============
Link Management
===============

There are various features available within TYPO3 that enable users to
create, edit and manage different types of links, including :ref:`Redirects<redirects>`, :ref:`QR Codes<qr-codes>` and
:ref:`Short URLs<short-urls>`.

To use these features, you will need access to :guilabel:`Link Management`, which is
located within the Sites module.

..  figure:: /Images/ManualScreenshots/LinkManagement/HomeModuleOverview.png
    :alt: Screenshot of the Link Management overview page containing links to each of
          the sub modules. Redirects, Quick Response Codes and Short URLs.

..  tip::
    If you cannot see the Link Management module, it is likely that either you have
    not been granted the appropriate permission to access it, or the `Redirects System
    Extension <https://docs.typo3.org/c/typo3/cms-redirects/main/en-us/Index.html>`__
    is not installed and activated on your TYPO3 installation.

    If this is the case, contact your TYPO3 System Administrator for further assistance.

..  rubric:: Chapters

..  card-grid::
    :columns: 1
    :columns-md: 2
    :gap: 4
    :class: pb-4
    :card-height: 100

    ..  card:: :ref:`Redirects<redirects>`

        Create and manage redirects from the Redirects module. Here you can also
        view existing rules and see how many times they've been accessed.

    ..  card:: :ref:`QR Codes<qr-codes>`

        QR Codes are a convenient way to share links to a given page, file
        or external URL from your TYPO3 installation.

    ..  card:: :ref:`Short URLs<short-urls>`

        Generate and share Short URLs that link back to pages, files or external URLs
        from your TYPO3 installation.

..  toctree::
    :maxdepth: 2
    :titlesonly:
    :hidden:

    Redirects/Index
    QRCodes/Index
    ShortURLs/Index
