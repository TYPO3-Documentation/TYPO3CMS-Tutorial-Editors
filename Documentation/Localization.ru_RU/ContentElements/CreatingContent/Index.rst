.. include:: /Includes.rst.txt


.. _content-creating:

====================
Создание содержимого
====================

..  youtube:: RuQ4CikixdY

------------

В модуле :guilabel:`Веб > Страница` / :guilabel:`Web > Page` на любой странице щелкните по пиктограмме :guilabel:`+ Content` в том месте, где вы хотите вставить содержимое.

.. figure:: /Images/ManualScreenshots/NewContentElement/CreateNew.png
   :alt: Create a new Content Element by clicking the button
   :class: with-shadow

   Create a new Content Element by clicking the button

Это действие выводит на экран окно :guilabel:`Создать новый элемент содержимого` / :guilabel:`Create new content element`. Доступные элементы содержимого зависят от настроек вашей установки TYPO3 и установленных расширений. window.


.. _content-types:

Типы элементов содержимого
==========================

.. note::
   Если вы работаете с пакетом `Introduction Package <https://extensions.typo3.org/extension/introduction/>`__, то увидите больше элементов содержимого, чем описано здесь. Это связано с тем, что пакет `Bootstrap Package<https://extensions.typo3.org/extension/bootstrap_package/>`__ (который включается в `Introduction <https://extensions.typo3.org/extension/introduction/>`__) содержит несколько собственных элементов содержимого.

   На этой странице описаны элементы содержимого **ядра TYPO3**.


.. _content-typical:

Типовое содержание страницы
---------------------------

Вставка обычных типов текстового и графического содержимого для создания стандартных веб-страниц.

.. figure:: /Images/ManualScreenshots/NewContentElement/WizardTabTypical.png
   :alt: The 'Typical page content' tab of the new content element window
   :class: with-shadow

   The :guilabel:`Typical page content` tab of the new content element window


.. _content-form:

Элементы форм
-------------

Создавайте форму входа в систему или простую контактную форму.

.. figure:: /Images/ManualScreenshots/NewContentElement/WizardTabForm.png
   :alt: The 'Form elements' tab of the new content element window
   :class: with-shadow

   The :guilabel:`Form elements` tab of the new content element window


.. _content-menu:

Элементы меню
-------------

Различные способы представления меню или списка ссылок на страницах.

.. figure:: /Images/ManualScreenshots/NewContentElement/WizardTabMenu.png
   :alt: The 'Menu' tab of the new content element window
   :class: with-shadow

   The :guilabel:`Menu` tab of the new content element window


.. _content-plugin:

Дополнения
----------

Дополнения предлагаются расширениями. Не все дополнения доступны на этой вкладке. Это зависит от их архитектуры или от конфигурации внутреннего интерфейса. В некоторых случаях вы вставляете элемент содержимого Общее дополнение / General Plugin, а затем переходите на вкладку :guilabel:`Дополнение` / :guilabel:`Plugin` для выбора определенного дополнения.

.. figure:: /Images/ManualScreenshots/NewContentElement/WizardTabPlugins.png
   :alt: The 'Plugins' tab of the new content element window
   :class: with-shadow

   The :guilabel:`Plugins` tab of the new content element window


.. _content-special:

Специальные элементы
--------------------

Вставка обычного HTML или горизонтального разделителя на странице. Элемент "Вставка записей" / "Insert records" позволяет ссылаться на другие элементы содержимого, тем самым  позволяет повторно использовать те же элементы на другой странице, не дублируя его.

.. figure:: /Images/ManualScreenshots/NewContentElement/WizardTabSpecialElements.png
   :alt: The 'Special elements' tab of the new content element window
   :class: with-shadow

   The :guilabel:`Plugins` tab of the new content element window


.. _content-new-element:

Добавление нового содержимого на страницу
=========================================

#. На странице щелкните значок :guilabel:`+ Содержимое` / :guilabel:`+ Content` в том месте, где необходимо вставить содержимое.
#. На вкладке :guilabel:`Типовое содержимое страницы` / :guilabel:`Typical Page Content` выберите элемент "Текст и медиа" / "Text & Media". Это наиболее часто используемый тип содержимого. Откроется окно :guilabel:`Создать новое содержимое страницы` / :guilabel:`Create new Page Content`.

.. figure:: /Images/ManualScreenshots/NewContentElement/NewContentElement.png
   :alt: Empty input form for a Text & Media content element
   :class: with-shadow

   Empty input form for a Text & Media content element

#. В поле :guilabel:`Заголовок` / :guilabel:`Header` введите *Новое содержимое* / *New content*.
#. В области :guilabel:`Текст` / :guilabel:`Text` введите содержимое. В этом поле используется :ref:`редактор текста для его форматирования<rte>` (RTE).

#. Сохраните и закройте элемент содержимого. На странице появится новый добавленный элемент:

.. figure:: /Images/ManualScreenshots/NewContentElement/ContentSaved.png
   :alt: The new content element appears in the Page module
   :class: with-shadow

   The new content element appears in the Page module
