.. include:: /Includes.rst.txt
..  _start:

===========================
Руководство редактора TYPO3
===========================

После установки TYPO3 с помощью :doc:`Ознакомительное пособие / Getting Started Guide <t3start:Index>`; необходимо войти во внутренний интерфейс CMS, начать добавлять страницы и создавать содержимое. В мире TYPO3 принято называть пользователей, выполняющих эти задачи, "редакторами".

В этом руководстве подробно описаны все задачи, которые приходится решать редактору, включая предоставление доступа к внутреннему интерфейсу другим пользователям, создание страниц, добавление на страницы содержимого в виде элементов наполнения, загрузку и управление файлами различных типов, включая изображения и PDF-файлы.

В данном руководстве предполагается, что Вы уже знакомы с TYPO3. Если это не так, посетите :ref: `концепции TYPO3<t3start:concepts>` для ознакомления.

Все примеры, используемые в данном руководстве, взяты из инсталляции TYPO3 под управлением `Официального ознакомительного пакета / Introduction Package` <https://extensions.typo3.org/extension/introduction/>`__.

----

.. container:: row m-0 p-0

   .. container:: col-md-6 pl-0 pr-3 py-3 m-0

      .. container:: card px-0 h-100

         .. rst-class:: card-header h3

            .. rubric:: :ref:`Начало работы`

         .. container:: card-body

            *  :ref:`Авторизация во внутреннем интерфейсе TYPO3<login>`

            *  :ref:`Получение помощи с помощью встроенных средств поддержки TYPO3<help-inside>`

            *  :ref:`Об этом руководстве<introduction>`

   .. container:: col-md-6 pl-0 pr-3 py-3 m-0

      .. container:: card px-0 h-100

         .. rst-class:: card-header h3

            .. rubric:: :ref:`Работа с деревом страниц<pages>`

         .. container:: card-body

            *  :ref:`Создание страниц<pages-creating>`

            *  :ref:`Создание нескольких страниц<pages-multiple>`

            *  :ref:`Работа со страницами<pages-working-with>`

            *  :ref:`Типы страниц<pages-types>` и :ref:`Свойства страниц<pages-properties>`

   .. container:: col-md-6 pl-0 pr-3 py-3 m-0

      .. container:: card px-0 h-100

         .. rst-class:: card-header h3

            .. rubric:: :ref:`Создание и управление содержимым<content-elements>`

         .. container:: card-body

            *  :ref:`Создание содержимого <content-creating>`

            *  :ref:`Редактирование<content-editing>` и :ref:`управление содержимым<content-working>`

            *  :ref:`Работа с изображениями<images-new>` и :ref:`другими средствами передачи информации<media>`

            *  :ref:`Создание контактной формы<mail-form>`

   .. container:: col-md-6 pl-0 pr-3 py-3 m-0

      .. container:: card px-0 h-100

         .. rst-class:: card-header h3

            .. rubric:: :ref:`Управление записями<list-module>`

         .. container:: card-body

            *  :ref:`Использование модуля Список / List внутреннего интерфейса <list-module>`

            *  :ref:`Перемещение содержимого с помощью буфера обмена <clipboard>`

            *  :ref:`Дополнительные возможности буфера обмена<advanced_clipboard_usage>`

            *  :ref:`Массовое редактирование материалов<mass-editing>`

   .. container:: col-md-6 pl-0 pr-3 py-3 m-0

      .. container:: card px-0 h-100

         .. rst-class:: card-header h3

            .. rubric:: Инструменты для редакторов

         .. container:: card-body

            *  :ref:`Управление файлами с помощью Списка файлов / Filelist <file-module>`

            *  :ref:`Создание ссылок во внутреннем интерфейсе с помощью функции Deep Linking <deeplinking>`

            *  :ref:`Разграничение доступа к страницам и содержимому с помощью функции управления доступом <access-control>`

            *  :ref:`Работа с несколькими языками <languages>`

   .. container:: col-md-6 pl-0 pr-3 py-3 m-0

      .. container:: card px-0 h-100

         .. rst-class:: card-header h3

            .. rubric:: :ref:`Концепции<>`

         .. container:: card-body

            *  :ref:`Создание доступного содержимого <accessibility>`

            *  :ref:`Кэширование <cache>`

            *  :ref:`Авторское право и конфиденциальность данных <copyright>`

            *  :ref:`Уровень абстрагирования файлов / File abstraction layer (FAL) <fal>`

.. toctree::
   :maxdepth: 2
   :titlesonly:
   :hidden:

   Login/Index
   Pages/Index
   ContentElements/Index
   ListModule/Index
   FileModule/Index
   Languages/Index
   AccessControl/Index
   DeepLinking/Index
   HelpInside/Index
   Concepts/Index
   About
   NextSteps/Index

.. Meta Menu

.. toctree::
   :hidden:

   Sitemap
   genindex
