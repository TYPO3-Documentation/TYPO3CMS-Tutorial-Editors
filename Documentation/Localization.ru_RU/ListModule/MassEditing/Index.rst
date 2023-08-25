.. include:: /Includes.rst.txt
.. index:: Editing; Mass editing
.. _mass-editing:
.. _selective-editing:

=======================
Массовое редактирование
=======================

Модуль :guilabel:`Список` / :guilabel:`List` позволяет отображать содержимое сразу нескольких полей и дает возможность редактировать несколько записей за раз.

Выберите столбцы для отображения, нажав на кнопку :guilabel:`Показать столбцы` / :guilabel:`Show Columns`.

.. include:: /Images/AutomaticScreenshots/ListModule/MassEdit/ShowColumnsButton.rst.txt

Затем выберите поле или поля в появившемся окне. Выберите, например, поле :guilabel:`Тип` / :guilabel:`Type` и нажмите на кнопку :guilabel:`Обновить` / :guilabel:`Update`.

.. include:: /Images/AutomaticScreenshots/ListModule/MassEdit/ShowColumnsModal.rst.txt

В результате поле :guilabel:`Тип` / :guilabel:`Type` появится в новом столбце справа от списка записей:

.. include:: /Images/AutomaticScreenshots/ListModule/MassEdit/RecordListWithAdditionalFields.rst.txt

Для включения массового редактирования необходимо перейти в режим просмотра списка одного поля записей, щелкнув мышью на заголовке таблиц:

.. include:: /Images/AutomaticScreenshots/ListModule/MassEdit/MassEditingEnabled.rst.txt


.. _editing-all-headers:

Редактирование всех заголовков за раз
=====================================

Чтобы отредактировать заголовки всех записей за один раз, выберите значок карандаша рядом с надписью "Заголовок" / "Header":

.. include:: /Images/AutomaticScreenshots/ListModule/MassEdit/MassEditHeaderButton.rst.txt

На экране появится следующее:

.. include:: /Images/AutomaticScreenshots/ListModule/MassEdit/MassEditHeader.rst.txt

После сохранения изменения будут применены ко всем записям.

Редактирование всех выбранных полей
===================================

Все поля, выведенные в данный момент, можно редактировать одновременно для всех записей за раз, выбрав другой значок:

.. include:: /Images/AutomaticScreenshots/ListModule/MassEdit/MassEditMultipleFieldsButton.rst.txt

В результате получается практически та же форма, но с дополнительным полем "Тип" / "Type":

.. include:: /Images/AutomaticScreenshots/ListModule/MassEdit/MassMultipleFields.rst.txt


Правка выделенных полей выбранных записей
=========================================

При активизации расширенного режима :ref:`буфера обмена в режиме множественного выбора<advanced_clipboard_usage>` можно выделить только те записи, которые должны быть отредактированы.

.. include:: /Images/AutomaticScreenshots/ListModule/MassEdit/SelectiveEditing.rst.txt

В результате выводится форма редактирования только выбранного поля для выбранных записей.
