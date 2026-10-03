:navigation-title: Error pages

..  include:: /Includes.rst.txt
..  _error-page:

===================================
What to do when an error page shows
===================================

Sometimes TYPO3 cannot finish what you asked for and shows an error page
instead. You cannot fix the error yourself, but you can help the person who
can. What they need depends on which error page you see.

..  _error-page-live:

On the live website
===================

The live website shows a short page titled **Oops, an error occurred!**. It
leaves out the details on purpose, so visitors learn nothing about the inner
workings of the site.

Tell your administrator or agency which page you were on, what you clicked
and at what time. TYPO3 has written the details into its log, so that is all
they need from you.

..  _error-page-details:

On a development or test system
===============================

..  versionadded:: 14.2
    :changelog: feature-106153-1770150965

On a development or test system, the error page has a dark header reading
**Whoops, looks like something went wrong.** Below it, TYPO3 shows the error
and the list of program files that led to it, also called the stack trace.

..  figure:: /Images/ManualScreenshots/ErrorHandling/exception-header-copy-path.png
    :alt: Error page with the heading "Whoops, looks like something went
        wrong.", the buttons Toggle details and Copy plaintext stack trace,
        and the error message below them
    :zoom: lightbox

    The button :guilabel:`Copy plaintext stack trace` copies the whole error
    report as text

Instead of taking a screenshot, send the whole error report as text:

#.  Click :guilabel:`Copy plaintext stack trace` in the header of the page.
#.  Paste the text into your message to your administrator or agency, for
    example into an email or a ticket.
#.  Read through the text before you send it, and remove anything that should
    not leave your company, such as passwords or personal data. The error page
    reminds you of this at the end of the report.

..  note::
    If the address in your browser starts with `http://` instead of
    `https://`, the browser may refuse to copy. TYPO3 then shows the text in a
    box on the page, already selected. Press :kbd:`Ctrl` + :kbd:`C`
    (:kbd:`Cmd` + :kbd:`C` on a Mac) to copy it yourself.
