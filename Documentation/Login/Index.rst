:navigation-title: Backend login
..  include:: /Includes.rst.txt
..  _login:

===========================
Logging in to TYPO3 backend
===========================

If you are a TYPO3 editor, the backend is where you will most likely spend most
of your time. So let's start by logging in.

Navigate to  :samp:`https://www.yourdomain.org/typo3` in your browser. The
:samp:`/typo3` part can be changed, so if :samp:`/typo3` does not work, check
your project documentation or ask your administrator for the correct backend
URL.


..  figure:: /Images/ManualScreenshots/Login/BackendLoginPage.png
    :alt: The TYPO3 backend login box
    :zoom: gallery

    The login box

If you are having problems logging in, have a look at the
troubleshooting tips below. If you are still having problems, **ask your
administrator for help**. Troubleshooting tips for administrators are at the
bottom.

..  _login-forgot-password:

Troubleshooting: Forgotten password
===================================

..  rst-class:: bignums-attention

#.  Click on :guilabel:`Forgot your password?`

    Go to the backend login page and select :guilabel:`Forgot your password?`.

#.  Enter your email address

    Use the same email address that you entered during registration.

    ..  figure:: /Images/ManualScreenshots/Login/ForgotPasswordEmail.png
        :alt: The password reset form with the email address field
        :zoom: gallery

        Enter your email address

#.  Open the email and follow the link

    If you haven't received the email, check your spam folder and
    double-check that the email address you entered is correct.

#.  Enter a new password

    Click on the password recovery link in the email and then enter a new
    password. Make sure you choose a password that fits your administrator's
    rules.

Things your **administrator** can check if this is not working correctly:

*   the :ref:`password reset feature<t3coreapi:access-password-reset>` is
    enabled
*   your backend account has a valid email address associated with it
*   the TYPO3 installation can send emails.

..  _login-troubleshooting:

Troubleshooting: You cannot log in
==================================

Things you can check are:

*   JavaScript is enabled in your browser
*   your credentials are correct and valid
*   whether your IP address has changed (you will automatically be logged out).

..  _login-troubleshooting-locked:

The backend is locked for maintenance
-------------------------------------

Your TYPO3 installation may be locked for maintenance and a message will appear
indicating that TYPO3 is in maintenance mode. Check with your administrator.

..  _login-troubleshooting-failed-logins:

Too many failed logins
----------------------

If you enter the wrong login credentials too many times,
you may be locked out of the backend. You
will see a message such as "The login is locked until
2026-08-31 10:58 due to too many failed login attempts from your IP address."

Wait till the time is up and then try logging in again.

..  _login-troubleshooting-login-reloads:

The login box reloads but no error message is displayed
-------------------------------------------------------

Login cookies could be incorrectly set. Try deleting your browser cookies.

..  _login-troubleshooting-administrators:

Troubleshooting: Advice for administrators
==========================================

See
`TYPO3 Getting Started, Troubleshooting common TYPO3 backend login problems
<https://docs.typo3.org/permalink/t3start:troubleshooting-backend-login>`_.
