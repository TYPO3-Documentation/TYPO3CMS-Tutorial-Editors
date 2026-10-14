..  include:: /Includes.rst.txt


..  _mail-form:
..  _template-form:

=======================
Creating a contact form
=======================

..  image:: /Images/GeneratedScreenshots/ContentElements/ContactForm.png
    :alt: Content element Contact Form in the TYPO3 backend
    :class: img-thumbnail float-end ms-1 ms-1
    :width: 250
    :zoom: gallery

You can create a form from the :guilabel:`Content > Forms` module. This is a
system extension which needs to be activated by your administrator. It is
written in TypoScript and is fully documented in the :doc:`Form Framework <ext_form:Index>` system extension manual.

This module provides a guided interface for editors to create any kind of form
such as a contact form, newsletter subscription or a survey. TYPO3 comes
with one pre-defined form already built, which you can use to get started.

#.  In the :guilabel:`Content > Forms` module, click the :guilabel:`+ Create new
    form` button. The :guilabel:`Create new form` wizard displays.

    ..  figure:: /Images/GeneratedScreenshots/Forms/FormCreateNew.png
        :alt: The Forms module without forms, with the button "Create new form"
        :zoom: gallery

        Launching the :guilabel:`Create new form` wizard

#.  Choose :guilabel:`Predefined form` and click :guilabel:`Next`.

    ..  figure:: /Images/GeneratedScreenshots/Forms/FormsSettingsStep1.png
        :alt: The first step of the wizard with the choice between "Blank form"
            and "Predefined form"
        :zoom: gallery

        Choose :guilabel:`Predefined form`

#.  Accept :guilabel:`Database` as the storage location and click
    :guilabel:`Next`.

#.  In the :guilabel:`Template` list, select :guilabel:`Simple contact form`.
    Enter a name for the form and click :guilabel:`Next`.

    ..  figure:: /Images/GeneratedScreenshots/Forms/FormsSettingsStep2.png
        :alt: The step "Settings" of the wizard with the template and the name
            of the new form
        :zoom: gallery

        Choose the template and enter a name

#.  TYPO3 creates the form. Click :guilabel:`Finish`. Your new form is
    displayed.

    ..  figure:: /Images/GeneratedScreenshots/Forms/FormsSettingsStep3.png
        :alt: The last step of the wizard with the message "Form created"
        :zoom: gallery

        The form is created

    ..  figure:: /Images/GeneratedScreenshots/Forms/FormsNewForm.png
        :alt: The new contact form in the form editor
        :zoom: gallery

        New form based on template

    The predefined 'Simple contact form' comes with some settings already
    configured, but you can edit these settings and add more fields. For
    example, you might want to delete the Summary page, and change
    the labels on the buttons.

#.  Add your form to a page the same way you would add any
    :ref:`content element<content-form>`. On the  :guilabel:`Form elements` tab, choose 'Form'.
#.  In the form content element, go to the :guilabel:`Plugin` tab and in the
    :guilabel:`Form definition` list, choose your form.

    ..  figure:: /Images/GeneratedScreenshots/Forms/FormsFormDefinition.png
        :alt: The tab "Plugin" of a form element with the form definition
            "Get in touch"
        :zoom: gallery

        Choose your form on the :guilabel:`Plugin` tab

#.  On the :guilabel:`General` tab, type a header for your form, then save and close
    the record.

    Preview the page and it should look something like this:

    ..  figure:: /Images/GeneratedScreenshots/Forms/FormOutput.png
        :alt: The contact form in the frontend
        :zoom: gallery

        The contact form in the frontend


..  _create-form-scratch:

Create a form from scratch
==========================

#.  In the :guilabel:`Content > Forms` module, click the :guilabel:`+ Create new
    form` button.
#.  In the :guilabel:`Create new form` wizard, choose :guilabel:`Blank form`.
#.  Give your form a name, then click :guilabel:`Next` and :guilabel:`Finish`.

    A blank form displays.

    ..  figure:: /Images/GeneratedScreenshots/FormsBlank/FormsBlankForm.png
        :alt: A blank form in the form editor
        :zoom: gallery

        Create a new form from scratch

#.  Click the :guilabel:`Create new element` button. The :guilabel:`New element`
    window displays.

    ..  figure:: /Images/GeneratedScreenshots/FormsBlank/FormsNewElement.png
        :alt: The window "New element" with the types of form elements
        :zoom: gallery

        Create new element in form

    TYPO3 comes with over twenty form fields by default, including:

    *   **Basic elements** like text or password fields
    *   **Special elements** requiring specific format validation, like phone
        numbers or dates
    *   **Select elements** like checkboxes or multiple choice
    *   **Advanced elements** that have special rules, like user uploads or
        calendar date pickers
    *   **Container elements** to visually organize surveys

    Once you’ve selected a form element, you can customize the settings for how the field is displayed.

#.  Choose the :guilabel:`Text` element and the field is added to your form. You can
    configure settings for the field (such as placeholder text and field
    validation) on the right-hand side of the screen .

    ..  figure:: /Images/GeneratedScreenshots/FormsBlank/FormsFieldSettings.png
        :alt: A text field in the form editor, with its settings on the right
        :zoom: gallery

        Configure the settings of the field

#.  Click the :guilabel:`Preview mode` icon to see an indication of how your
    form will display on the frontend. Use the :guilabel:`Edit mode` icon to
    return to editing your form.

    ..  figure:: /Images/GeneratedScreenshots/FormsBlank/FormsPreview.png
        :alt: The form in the preview mode of the form editor
        :zoom: gallery

        The preview mode of the form editor


..  _working-with-forms:

Working with forms
==================

When you have added multiple fields to your form, you can drag and drop them
to rearrange their order.

Add :guilabel:`Finishers` like a confirmation message or redirection to another page.

..  figure:: /Images/GeneratedScreenshots/Forms/FormsFinishers.png
    :alt: Add finishers to a form
    :zoom: gallery

You can integrate extensions with existing forms. For example, if you're
running a sales operation, you can integrate with Mautic and any changes to a
TYPO3 form will update Mautic to give you seamless lead tracking.

..  tip::

    There are many more properties that can be defined. They are
    described in the :doc:`"Form Framework" <ext_form:Index>` system extension
    manual.
