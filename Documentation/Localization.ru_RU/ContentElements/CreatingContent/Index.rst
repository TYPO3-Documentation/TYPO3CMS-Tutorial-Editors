.. include:: /Includes.rst.txt


.. _content-creating:

====================
Создание содержимого
====================

..  youtube:: RuQ4CikixdY

------------

В модуле :guilabel:`Веб > Страница` / :guilabel:`Web > Page` на любой странице щелкните по пиктограмме :guilabel:`+ Content` в том месте, где вы хотите вставить содержимое.

.. include:: /Images/AutomaticScreenshots/NewContentElement/CreateNew.rst.txt

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

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabTypical.rst.txt


.. _content-form:

Элементы форм
-------------

Создавайте форму входа в систему или простую контактную форму.

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabForm.rst.txt


.. _content-menu:

Элементы меню
-------------

Различные способы представления меню или списка ссылок на страницах.

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabMenu.rst.txt


.. _content-plugin:

Дополнения
----------

Дополнения предлагаются расширениями. Не все дополнения доступны на этой вкладке. Это зависит от их архитектуры или от конфигурации внутреннего интерфейса. В некоторых случаях вы вставляете элемент содержимого Общее дополнение / General Plugin, а затем переходите на вкладку :guilabel:`Дополнение` / :guilabel:`Plugin` для выбора определенного дополнения.

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabPlugins.rst.txt


.. _content-special:

Специальные элементы
--------------------

Вставка обычного HTML или горизонтального разделителя на странице. Элемент "Вставка записей" / "Insert records" позволяет ссылаться на другие элементы содержимого, тем самым  позволяет повторно использовать те же элементы на другой странице, не дублируя его.

.. include:: /Images/AutomaticScreenshots/NewContentElement/WizardTabSpecialElements.rst.txt


.. _content-new-element:

Добавление нового содержимого на страницу
=========================================

#. На странице щелкните значок :guilabel:`+ Содержимое` / :guilabel:`+ Content` в том месте, где необходимо вставить содержимое.
#. На вкладке :guilabel:`Типовое содержимое страницы` / :guilabel:`Typical Page Content` выберите элемент "Текст и медиа" / "Text & Media". Это наиболее часто используемый тип содержимого. Откроется окно :guilabel:`Создать новое содержимое страницы` / :guilabel:`Create new Page Content`.

.. include:: /Images/AutomaticScreenshots/NewContentElement/NewContentElement.rst.txt

#. В поле :guilabel:`Заголовок` / :guilabel:`Header` введите *Новое содержимое* / *New content*.
#. В области :guilabel:`Текст` / :guilabel:`Text` введите содержимое. В этом поле используется :ref:`редактор текста для его форматирования<rte>` (RTE).

#. Сохраните и закройте элемент содержимого. На странице появится новый добавленный элемент:

.. include:: /Images/AutomaticScreenshots/NewContentElement/ContentSaved.rst.txt
