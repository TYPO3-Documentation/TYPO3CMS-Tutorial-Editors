.. include:: /Includes.rst.txt


.. _mail-form:
.. _template-form:

=======================
Creating a contact form
=======================

You can create a form from the :guilabel:`Web > Forms` module. This is a
system extension which needs to be activated by your administrator. It is
written in TypoScript and is fully documented in the :ref:`"Form Framework"<form:start>` system extension manual.

This module provides a guided interface for editors to create forms such as
a contact form, newsletter subscription or even a survey. TYPO3 comes with one
pre-defined form already built, which you can use to get started.

#. In the :guilabel:`Web > Forms` module, click the :guilabel:`+ Create new
   form` button. The ** Create new form** wizard displays.

   .. figure:: ../../Images/FormCreateNew.png
      :alt: Launching the create new form wizard
      :class: with-border

#. Choose whether you want to create a blank form or use a predefined form.
   In this case, choose the predefined option. The **Settings** step displays.
#. In the :guilabel:`Start template` list, select 'Simple contact form', and
   then type a name for the form.

   .. figure:: ../../Images/FormsSettingsStep.png
      :alt: The Settings step of the Create new form wizard.
      :class: with-border

#. Click **Next** and then click **Finish**. Your new form displays.

   .. figure:: ../../Images/FormsNewForm.png
      :alt: New form based on template
      :class: with-border

   The predefined 'Simple contact form' comes with some settings already
   configured, but you can edit these settings and add more fields. For
   example, you might want to delete the Summary page on this form, and change
   the labels on the buttons.

#. Add your form to a page the same way you would add any :ref:`content       element<content-form>`. On the  **Form elements** tab, choose 'Form'.
#. In the form content element, go to the **Plugin** tab and in the
   :guilabel:`Form definition' list, choose your form.

   .. figure:: ../../Images/FormsFormDefinition.png
      :alt: Choose your form on the Plugin tab
      :class: with-border

#. On the **General** tab, type a header for your form, then save and close
   the record.
   Preview the page and it should look something like this:

   .. figure:: ../../Images/EditContentFormOutput.png
      :alt: The contact form in the frontend
      :class: with-border


.. _blank-form:

Create a form from scratch
==========================




.. tip::

   There are many more properties that can be defined. They are
   described in the :ref:`"Form Framework"<form:start>` system extension
   manual.
