..  include:: /Includes.rst.txt

..  _login:

===================
Logging in to TYPO3
===================

With TYPO3, an editor's work is done via the backend and having
an active backend account is required.

Enter your domain name into the address bar of your browser and
append :samp:`/typo3` to the end of it to access the backend login page.
For example: :samp:`http://www.example.org/typo3`.

..  note::
    Since TYPO3 v13, a custom entry point for the TYPO3 backend can be
    customized. If the path :samp:`/typo3` does not work, consult the
    project's documentation or ask your administrator for the correct backend
    URL.

Check that JavaScript and cookies are enabled in your browser as they are
required by TYPO3's backend.

..  figure:: /Images/ManualScreenshots/Login/BackendLoginPage.png
    :class: with-shadow
    :alt: The TYPO3 backend login screen

    The TYPO3 backend login screen

..  versionadded:: 12.3

The password can be displayed in clear text by clicking the "eye" symbol
once something has been typed in the password field.

..  warning::
    Revealing login credentials is always a security risk. Please use this
    feature with caution when nobody can watch your input, either remotely or by
    looking over your shoulders!

Troubleshooting: Forgot password for backend login
===================================================

The following example only works if your site administrator has
:ref:`enabled the password reset feature<t3coreapi:access-password-reset>`
and if your backend account has a valid email address set.

..  rst-class:: bignums-attention

#.  Click on :guilabel:`Forgot your password?`

    Go to the backend login page and select :guilabel:`Forgot your password?`.

    ..  figure:: /Images/ManualScreenshots/Login/ForgotPasswordLink.png
        :alt: Click on "Forgot your password?"
        :class: with-shadow

        Click on :guilabel:`Forgot your password?`

#.  Enter your email address

    Use the same email address that you provided during registration.

    ..  figure:: /Images/ManualScreenshots/Login/ForgotPasswordEmail.png
        :alt: Click on "Forgot your password?"
        :class: with-shadow

        Click on :guilabel:`Forgot your password?`

#.  Open the email

    Note that you will get the following page even if the email
    you entered was not found. This is due to the fact that the system will not
    disclose information about any registered email addresses.

    If you do not receive the email, check your spam folder and
    double-check that the email address is correct.

    ..  figure:: /Images/ManualScreenshots/Login/ForgotPasswordSuccess.png
        :alt: Click on "Forgot your password?"
        :class: with-shadow

        Click on :guilabel:`Forgot your password?`

#.  Enter the new password

    After you clicked on the password recovery link in the email you received
    you can enter a new password. Always use a
    :ref:`secure password <t3coreapi:security-secure-passwords>`.

    ..  figure:: /Images/ManualScreenshots/Login/ForgotPasswordChangePassword.png
        :alt: Enter the secure new password twice
        :class: with-shadow

        You will need to enter your new (secure) password twice
