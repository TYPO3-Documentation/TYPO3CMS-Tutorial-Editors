.. include:: ../Includes.txt

.. _login:

=====
Login
=====

In TYPO3 CMS an editor's work is done in the backend. So point your browser
to your domain name and append `/typo3` to get to the log in screen.

.. important::

   Make sure JavaScript and cookies are enabled in your browser as they are
   required by the TYPO3 Backend.

Enter your domain name into the address bar of your internet browser and
append "/typo3" to it to get to the "log in" page of your site.
For example: :samp:`http://www.example.org/typo3`.

.. figure:: ../Images/BackendLoginPage.png
   :alt: The TYPO3 CMS backend login screen

   The TYPO3 CMS backend login screen

Troubleshooting: Forgot password for backend login
===================================================

.. info::
   The following only works if your administration has
   :ref:`enabled the  password reset <t3coreapi:access-password-reset>`
   and if your backend account has a valid email address.

.. rst-class:: bignums-attention

#. Click on :guilabel:`Forgot your password?`

   Go to the backend login page and click on :guilabel:`Forgot your password?`.

   .. figure:: /Images/ManualScreenshots/Login/ForgotPasswordLink.png
      :alt: Click on "Forgot your password?"
      :class: with-shadow

      Click on :guilabel:`Forgot your password?`

#. Enter your email address

   Use the exact email address you used during registration.

   .. figure:: /Images/ManualScreenshots/Login/ForgotPasswordEmail.png
      :alt: Click on "Forgot your password?"
      :class: with-shadow

      Click on :guilabel:`Forgot your password?`

#. Open the email

   Note that you will get the following page in any case, even if the email
   you entered was not found. This is due to the fact that the system may not
   disclose information about registered email addresses.

   If you do not receive the email, have a look in your spam folder and
   double-check the email address  is correct.

   .. figure:: /Images/ManualScreenshots/Login/ForgotPasswordSuccess.png
      :alt: Click on "Forgot your password?"
      :class: with-shadow

      Click on :guilabel:`Forgot your password?`

#. Enter the new password

   After you clicked on the password recovery link in the Email you received
   you can enter a new password. Please use a
   :ref:`secure password <t3coreapi:security-secure-passwords>`.
