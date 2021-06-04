.. include:: /Includes.rst.txt


.. _mail-form:
.. _template-form:

=======================
Creating a contact form
=======================

You can create a form from the :guilabel:`Web > Forms` module. This is a
system extension which needs to be activated by your administrator. It is
written in TypoScript and is fully documented in the :ref:`Form Framework<form:start>` system extension manual.

This module provides a guided interface for editors to create any kind of form
such as a contact form, newsletter subscription or even a survey. TYPO3 comes
with one pre-defined form already built, which you can use to get started.

#. In the :guilabel:`Web > Forms` module, click the :guilabel:`+ Create new
   form` button. The **Create new form** wizard displays.

   .. figure:: ../../Images/ManualScreenshots/FormCreateNew.png
      :alt: Launching the create new form wizard
      :class: with-border

#. Choose whether you want to create a blank form or use a predefined form.
   In this case, choose the predefined option. The **Settings** step displays.

   .. figure:: ../../Images/ManualScreenshots/FormsSettingsStep.png
      :alt: The Settings step of the Create new form wizard.
      :class: with-border

#. In the :guilabel:`Start template` list, select 'Simple contact form', and
   then type a name for the form.
#. Click **Next** and then click **Finish**. Your new form displays.

   .. figure:: ../../Images/ManualScreenshots/FormsNewForm.png
      :alt: New form based on template
      :class: with-border

   The predefined 'Simple contact form' comes with some settings already
   configured, but you can edit these settings and add more fields. For
   example, you might want to delete the Summary page, and change
   the labels on the buttons.

#. Add your form to a page the same way you would add any :ref:`content       element<content-form>`. On the  **Form elements** tab, choose 'Form'.
#. In the form content element, go to the **Plugin** tab and in the
   :guilabel:`Form definition` list, choose your form.

   .. figure:: ../../Images/ManualScreenshots/FormsFormDefinition.png
      :alt: Choose your form on the Plugin tab
      :class: with-border

#. On the **General** tab, type a header for your form, then save and close
   the record.

   Preview the page and it should look something like this:

   .. figure:: ../../Images/ManualScreenshots/EditContentFormOutput.png
      :alt: The contact form in the frontend
      :class: with-border


.. _Create-form-scratch:

Create a form from scratch
==========================

#. In the :guilabel:`Web > Forms` module, click the :guilabel:`+ Create new
   form` button.
#. In the **Create new form** wizard, choose to create a blank form.
#. Give your form a name, then click **Next** and **Finish**.

   A blank form displays.

   .. figure:: ../../Images/ManualScreenshots/FormsBlankForm.png
      :alt: Create a new form from scratch
      :class: with-border

#. Click the :guilabel:`Create new element` button. The **New element** window
   displays.

   .. figure:: ../../Images/ManualScreenshots/FormsNewElement.png
      :alt: Create a new form from scratch
      :class: with-border

   TYPO3 comes with over twenty form fields by default, including:

   *  **Basic elements** like text or password fields
   *  **Special elements** requiring specific format validation, like phone
      numbers or dates
   *  **Select elements** like checkboxes or multiple choice
   *  **Advanced elements** that have special rules, like user uploads or
      calendar date pickers
   *  **Container elements** to visually organize surveys

   Once you’ve selected a form element, you can customize the settings for how the field is displayed.

#. Choose the **Text** element and the field is added to your form. You can
   configure settings for the field (such as placeholder text and field
   validation) on the right-hand side of the screen .

   .. figure:: ../../Images/ManualScreenshots/FormsFieldSettings.png
      :alt: Create a new form from scratch
      :class: with-border

#. Click the :guilabel:`Preview mode` icon to see an indication of how your
   form will display on the frontend. Use the :guilabel:`Edit mode` icon to
   return to editing your form.

   .. figure:: ../../Images/ManualScreenshots/FormsPreview.png
      :alt: Create a new form from scratch
      :class: with-border


.. _Working-with-Forms:

Working with forms
==================

When you have added multiple fields to your form, you can drag and drop them
to rearrange their order.

Click the :guilabel:`Settings` button at the top of the form to add **Finishers** like a confirmation message or redirection to another page.

.. figure:: ../../Images/ManualScreenshots/FormsFinishers.png
   :alt: Add finishers to a form
   :class: with-border

You can integrate extensions with existing forms. For example, if you're
running a sales operation, you can integrate with Mautic and any changes to a
TYPO3 form will update Mautic to give you seamless lead tracking.

.. tip::

   There are many more properties that can be defined. They are
   described in the :ref:`"Form Framework"<form:start>` system extension
   manual.
