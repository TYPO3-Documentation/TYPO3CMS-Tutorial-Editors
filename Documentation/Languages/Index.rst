..  include:: /Includes.rst.txt

..  _languages:

======================
Working with languages
======================

TYPO3 CMS comes with built-in support for managing multi-language sites from a
single installation.

..  seealso::
    More detailed information can be found in the
    :ref:`Frontend Localization Guide <typo3/guide-frontendlocalization:start>`.

..  youtube:: XzKBdjUV53k

------------

..  _languages-new:

Language configuration
======================

Languages are managed at the site level. To add or configure languages for a
site, navigate to :guilabel:`Site Management > Sites`.

..  note::
    Managing site languages requires administrative privileges. For detailed setup
    instructions, see the :ref:`Site Handling <t3coreapi:sitehandling-basics>`
    documentation.

..  _Translation-modes:

Translation strategies
======================

When you translate content, there are two modes: a
:ref:`connected <languages-translation-mode-connected>` mode and an
:ref:`independent <languages-translation-mode-copy>` mode.

..  _languages-translation-mode-connected:

Translate (connected)
---------------------

Use this mode if your site requires a strict, parallel content structure across
all languages. TYPO3 maintains a direct link between the source element and its
translation.

*   When the source text changes, TYPO3 marks the translation as out of date.
*   While you are translating, you can see the changes in the source language next
    to your text.
*   Translation teams can be notified and can track what still needs review.

..  _languages-translation-mode-copy:

Copy (independent)
------------------

Use this mode if your localized pages require unique layouts, different content
structures, or completely independent text.

*   Decoupled content: TYPO3 creates a standalone copy of the source content in
    the target language.
*   Structural freedom: No link is maintained, allowing the localized page
    structure to diverge entirely from the source.


..  _languages-translations:

Localizing a page
=================

Follow these steps to translate a page and its content elements.

..  _languages-create-page-translation:

Create the page translation
---------------------------

#.  Navigate to the :guilabel:`Content > Layout` module and select the page you
    want to translate.
#.  Locate the :guilabel:`Create new translation` dropdown and select
    the target language that you want to translate into, making sure the target
    language has been configured in :guilabel:`Site Management > Sites`. This
    will open the translation wizard.

    ..  figure:: /Images/ManualScreenshots/Language/PageLanguages.png
        :alt: Creating a translation of a page
        :zoom: gallery

#.  Click through the translation wizard, choosing a translation mode of
    :guilabel:`Translate` or :guilabel:`Copy`
    (see :ref:`Translation strategies <Translation-modes>`) for each content
    element on the page until you see :guilabel:`Localization completed`. The
    last screen of the wizard shows a summary of what will be translated.
    Click on the :guilabel:`Finish` button.

    ..  figure:: ../Images/ManualScreenshots/Language/LanguagesTranslateContentElements.png
        :alt: The translation wizard
        :zoom: gallery

#.  Click on :guilabel:`Language Comparison` (1). The screen now
    displays two versions of the page: the default language version on the
    left and the target language version on the right. Translate **page**
    fields such as the title by clicking the pencil icon (2) and typing in
    your translations. The new content elements in the target language are
    hidden in the frontend by default. **Enable** (3) each content element
    after you have finished translating its text.

    ..  figure:: /Images/ManualScreenshots/Language/LanguagesPageVersions.png
        :alt: Viewing translated pages side by side in the content layout module
        :zoom: gallery

..  _Adjusting-the-View:

Changing the view
==================

Change the view from side-by-side pages to a single language by clicking on
:guilabel:`Layout` mode and then choosing the language you want to see (1).

..  figure:: /Images/ManualScreenshots/Language/LanguagesSingleLanguageLayout.png
    :alt: The Layout button and language dropdown
    :zoom: gallery

    Buttons to change the view on multilingual pages

..  _next-steps-l10n:

Next steps
==========
The :ref:`Frontend Localization Guide <typo3/guide-frontendlocalization:start>`
contains detailed information about setting up a multilingual web site and how to
do translation and localization.

:ref:`Site Handling <t3coreapi:sitehandling-basics>` contains
information about how to add more languages to your site configuration.
