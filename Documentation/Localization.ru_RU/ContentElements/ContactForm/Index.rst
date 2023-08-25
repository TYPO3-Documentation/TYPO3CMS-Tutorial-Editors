.. include:: /Includes.rst.txt


.. _mail-form:
.. _template-form:

=========================
Создание контактной формы
=========================

Создать форму можно из модуля :guilabel:`Веб > Формы` / :guilabel:`Web > Forms`. Это системное расширение, которое должно быть активировано вашим администратором. Оно написано на языке TypoScript и полностью документировано в руководстве по системному расширению :doc:`Form Framework <ext_form:Index>`.

Модуль предоставляет редакторам интерактивный интерфейс для создания любых форм, к примеру, контактной формы, формы подписки на рассылку или даже опроса. TYPO3 поставляется с одной уже созданной формой, которую можно использовать в начале работы.

#. В модуле :guilabel:`Веб > Формы` / :guilabel:`Web > Forms` нажмите кнопку :guilabel:`+ Создать новую форму` / :guilabel:`+ Create new form`. На экране появится мастер создания новой формы.

   .. include:: /Images/AutomaticScreenshots/Forms/FormCreateNew.rst.txt

#. Выберите, следует ли создать пустую форму или использовать предопределенную форму. В этом случае выберите :guilabel:`Предопределенная форма` / :guilabel:`Predefined Form`.

   .. include:: /Images/AutomaticScreenshots/Forms/FormsSettingsStep1.rst.txt

#. Выберите предопределенную :guilabel:`Простая контактная форма` / :guilabel:`Simple contact form` и введите название.

   .. include:: /Images/AutomaticScreenshots/Forms/FormsSettingsStep2.rst.txt

#. Проверьте настройки и еще раз нажмите кнопку :guilabel:`Далее` / :guilabel:`Next`.

   .. include:: /Images/AutomaticScreenshots/Forms/FormsSettingsStep3.rst.txt

#. В списке :guilabel:`Начальный шаблон` / :guilabel:`Start template` выберите "Простая контактная форма" /  "Simple contact form" и введите название формы.

   .. include:: /Images/AutomaticScreenshots/Forms/FormsNewForm.rst.txt

   Предопределенная "Простая контактная форма" /  "Simple contact form" поставляется с некоторыми уже настроенными параметрами, но их можно редактировать и добавлять дополнительные поля. Например, можно удалить страницу "Резюме" / "Summary" и изменить надписи на кнопках.

#. Добавьте форму на страницу таким же образом, как и любой другой :ref:`'элемент содержимого'<content-form>`. На вкладке :guilabel:`Элементы формы` / :guilabel:`Form elements` выберите "Форма" / "Form".
#. В элементе содержимого формы перейдите на вкладку :guilabel:`Дополнение` / :guilabel:`Plugin` и в списке :guilabel:`Определение формы` / :guilabel:`Form definition` выберите свою форму.

   .. include:: /Images/AutomaticScreenshots/Forms/FormsFormDefinition.rst.txt

#. На вкладке :guilabel:`Общие` / :guilabel:`General` введите название формы, сохраните и закройте запись.

   В результате страница должна выглядеть примерно так:

   .. include:: /Images/AutomaticScreenshots/Forms/FormOutput.rst.txt


.. _Create-form-scratch:

Создание формы с нуля
=====================

#. В модуле :guilabel:`Веб > Формы` / :guilabel:`Web > Forms` нажмите кнопку :guilabel:`+ Создать новую форму` / :guilabel:`+ Create new form`.
#. В мастере :guilabel:`Создание новой формы` / :guilabel:`Create new form` выберите создание пустой формы.
#. Задайте название формы, нажмите :guilabel:`Далее` / :guilabel:`Next` и :guilabel:`Завершить` / :guilabel:`Finish`.

   На экране появляется пустая форма.

   .. include:: /Images/AutomaticScreenshots/FormsBlank/FormsBlankForm.rst.txt

#. Нажмите кнопку :guilabel:`Создать новый элемент` / :guilabel:`Create new element`. На экране появится диалог :guilabel:`Новый элемент` / :guilabel:`New element`.

   .. include:: /Images/AutomaticScreenshots/FormsBlank/FormsNewElement.rst.txt

   По умолчанию TYPO3 поставляется с более чем двадцатью полями форм, включая:

   *  **Основные элементы**, такие как текстовые поля или поля для ввода пароля.
   *  **Специальные элементы**, требующие специальной проверки параметров (телефонных номеров или дат).
   *  **Элементы выбора**, такие как флажки или многовариантный выбор.
   *  **Дополнительные элементы**, для которых действуют специальные правила, например, загрузка файлов пользователями или выбор даты в календаре.
   *  **Элементы-контейнеры** для визуальной организации опросов.

   Выбрав элемент формы, можно настроить параметры отображения этого поля.

#. Выберите элемент :guilabel:`Текст` / :guilabel:`Text`, и поле будет добавлено в форму. Справа можно настроить параметры поля (например, текст-заполнитель / placeholder и проверку поля).

   .. include:: /Images/AutomaticScreenshots/FormsBlank/FormsFieldSettings.rst.txt

#. Щелкните на пиктограмме :guilabel:`Предпросмотр` / :guilabel:`Preview mode`, чтобы увидеть, как ваша форма будет отображаться на сайте. Для возврата к редактированию формы используйте пиктограмму :guilabel:`Правка` / :guilabel:`Edit mode`.

   .. include:: /Images/AutomaticScreenshots/FormsBlank/FormsPreview.rst.txt


.. _Working-with-Forms:

Работа с формами
================

Если в форму добавлено несколько полей, их можно перетаскивать, меняя порядок расположения.

Нажмите кнопку :guilabel:`Настройки` / :guilabel:`Settings` в верхней части формы, для добавления :guilabel:`Финишеров` / :guilabel:`Finishers`, вроде сообщения о подтверждении или перенаправления на другую страницу.

.. figure:: ../../Images/ManualScreenshots/Forms/FormsFinishers.png
   :alt: Добавление финишеров к форме
   :class: with-border

Можно интегрировать расширения с существующими формами. Например, если вы занимаетесь продажами, можно интегрировать расширение с Mautic, и любые изменения в форме TYPO3 будут обновляться в Mautic, что позволит вам без проблем отслеживать потенциальных клиентов (лиды).

.. tip::

   Существует множество других свойств, которые могут быть заданы. Они описаны в руководстве по системному дополнению :doc:`"Form Framework" <ext_form:Index>`.
