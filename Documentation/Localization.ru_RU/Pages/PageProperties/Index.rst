.. include:: /Includes.rst.txt

.. _pages-properties:

=================
Свойства страницы
=================

..  youtube:: dtRKsxzjKj0

------------

Для доступа к свойствам страницы щелкните на пиктограмме :guilabel:`Редактировать свойства страницы` / :guilabel:`Edit page properties` вверху.

.. include:: /Images/AutomaticScreenshots/EditContent/EditPageProperties.rst.txt

Доступные свойства страницы зависят от типа страницы и установки TYPO3. Свойства по умолчанию, доступные в пакете Introduction Package для типа страницы *Обычная* / *Standard*, включают:

* Общее / General
* SEO
* Социальные медиа / Social media
* Метаданные / Metadata
* Оформление / Appearance
* Поведение / Behaviour
* Ресурсы / Resources
* Язык / Language
* Доступ / Access
* Категории / Categories
* Заметки / Notes

.. _pages-properties-titles:

Общее / General
===============

Эта вкладка содержит общую информацию о странице. Вы можете изменить :guilabel:`Тип страницы` / :guilabel:`Page Type`, а также отредактировать заголовки для страницы и URL.

Заголовок страницы :guilabel:`Заголовок страницы` / :guilabel:`Page Title` используется непосредственно для генерации человекопонятных URL. А также выводится в меню и в теге `<title>`.

Если указать :guilabel:`Альтернативный Заголовок для целей навигации` / :guilabel:`Alternative Navigation Title`, то это значение будет выводится в меню на сайте, но для всего остального по-прежнему будет использоваться значение из :guilabel:`Заголовок страницы` / :guilabel:`Page Title` (для генерации URL и тега `<title>`).

.. include:: /Images/AutomaticScreenshots/PageProperties/General.rst.txt

.. _pages-properties-seo:

SEO
===

Эта вкладка используется для поисковой оптимизации. Она использует системное расширение cs_seo. Дополнительную информацию смотрите в руководстве по :ref:`SEO Core extension <ext_seo:for-editors>`.


.. _pages-properties-social-media:

Социальные медиа / Social media
===============================

Эта вкладка используется для обогащения сниппетов социальных сетей по URL страницы. Она использует системное расширение ext_seo. Дополнительную информацию смотрите в руководстве по :ref:`SEO Core extension <ext_seo:for-editors>`.

.. _pages-properties-metadata:

Метаданные / Metadata
=====================

Поля, доступные на этой вкладке, зависят от того, как настроен ваш сайт. То, как эти данные используются на сайте, определяется настройками TypoScript и, опять же, зависит от конфигурации сайта.

Обычно отображается поле :guilabel:`Abstract`, а также такие данные о редакторе, как :guilabel:`Имя автора` / :guilabel:`Author Name` и :guilabel:`Последнее обновление` / :guilabel:`Last Update`.

.. _pages-properties-appearance:

Оформление / Appearance
=======================

This tab contains properties that influence how the page is rendered in the frontend.

.. include:: /Images/AutomaticScreenshots/PageProperties/Appearance.rst.txt

Backend layouts determine what content areas are made available for editors in the :guilabel:`Web > Page` module. They can also be used to influence the rendering of the frontend.

The :guilabel:`Show Content from Page` field tells the page to display the content from another selected page. This is an easier method for repeating the content of a single page than using :ref:`mount points <pages-types>`.

.. _pages-properties-behaviour:

Поведение / Behaviour
=====================

Эта вкладка влияет на множество различных аспектов страницы.

.. include:: /Images/AutomaticScreenshots/PageProperties/Behaviour.rst.txt

Ниже приведены некоторые общие поля вкладки Поведение / Behaviour:

Ссылка на / Link Target
   Устанавливает цель ссылки по умолчанию для пунктов меню, ссылающихся на страницу. Можно также указать, чтобы страница открывалась в новом окне.

Время жизни кеша / Cache Lifetime
   Определите нужную продолжительность кэширования, а также назначьте теги кэша для страниц. Некоторые расширения TYPO3 могут удалять страницы из кэша на основе значений их кэш-тегов.

Использовать как корневую страницу / Use as Root Page
  Указывает на то, что данная страница является стартовой для нового сайта. Значок страницы в дереве страниц заменяется на значок глобуса (как это показано для страницы "Congratulations" в Introduction Package).

Включить в Поиск / Include in Search
  По умолчанию каждая страница включается во встроенную поисковую систему TYPO3 CMS :docs:`ext_indexed_search/Index`. Используйте этот флаг для исключения текущей страницы из поиска по сайту.

Скрыть дочерние страницы в дереве страниц / Hide child pages in page tree
  С помощью этой опции можно исключить дочерние страницы текущей страницы из отображения в дереве страниц внутреннего интерфейса. Это может пригодиться, если в системе имеется большое количество подстраниц.

Содержит дополнение / Contains Plugin
   Позволяет определить страницу в качестве контейнера для внешнего дополнения.


.. _pages-properties-resources:

Ресурсы / Resources
===================

На этой вкладке можно связать медиафайлы с текущей страницей. Порядок работы с этими файлами зависит от настроек визуализации сайта.

.. include:: /Images/AutomaticScreenshots/PageProperties/Resources.rst.txt

Остальные свойства на этой вкладке относятся к :ref:`TSconfig Страницы<t3tsconfig:pagetsconfig>` / :ref:`Page TSconfig<t3tsconfig:pagetsconfig>`.

.. _pages-properties-language:


Язык / Language
===============

Эта вкладка позволяет управлять отображением страницы в зависимости от наличия локализации.

Дополнительная информация о переводе приведена в главе :ref:`Работа с языками<languages>`.


.. _pages-properties-accesss:

Доступ / Access
===============

Эта вкладка позволяет управлять отображением страницы.

Дополнительная информация о переводе приведена в главе :ref:`Видимость элементов<visibility>`.


.. _pages-properties-categories:

Категории / Categories
======================

В CMS TYPO3 предусмотрен общесистемный инструмент категоризации. По умолчанию категории могут быть применены к страницам, элементам содержимого и файлам.

.. include:: /Images/AutomaticScreenshots/PageProperties/Categories.rst.txt


Категории должны быть определены в некоторой папке, а уже потом могут быть присвоены страницам. Например, :ref:`тип элемента содержимого <content-special>` "Специальное меню" / "Special Menus" может отображать список страниц из указанной в нем категории.

.. _pages-properties-notes:

Заметки / Notes
===============

Используйте эту вкладку для своих собственных редакторских заметок и внутренних комментариев, вроде напоминаний или списков дел.

Заметки отображаются во внутреннем интерфейсе над вкладками свойств страницы. На сайте примечания не отображаются.
