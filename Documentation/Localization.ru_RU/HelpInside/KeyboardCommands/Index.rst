..  include:: /Includes.rst.txt

..  _keyboard_commands:

=======================
Клавиатурные сокращения
=======================

..  contents::
    :local:

Навигация по дереву страниц с помощью клавиатуры
================================================

Перемещение по дереву страниц возможно только с помощью клавиатуры, при этом соблюдаются рекомендации, изложенные в `WAI-ARIA Authoring Practices 1.1. <https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-22>`__

*  :kbd:`Home` перемещает фокус на первый элемент в дереве страницы.
*  :kbd:`End` перемещает фокус на последний элемент в дереве страницы.
*  :kbd:`Enter` разворачивает элемент либо выбирает его.

*  :kbd:`Вверх` и  :kbd:`Вниз` клавиши со стрелками перемещают фокус вверх и вниз по дереву страниц.
*  :kbd:`Вправо` клавиша со стрелкой по возможности разворачивает фокус.
*  :kbd:`Влево` клавиша со стрелкой по возможности сворачивает фокус.


Редактирование текста с форматированием в редакторе Rich Text Editor (RTE)
==========================================================================

Ниже приведен список распространенных клавиатурных команд, которые можно использовать при редактировании текста в TYPO3 :ref:`RTE <rte>`.

..  tabs::

    ..  group-tab:: Windows / Linux

        * :kbd:`ctrl` + :kbd:`a` = Выделить весь текст
        * :kbd:`ctrl` + :kbd:`c` = Копировать
        * :kbd:`ctrl` + :kbd:`v` = Вставить
        * :kbd:`ctrl` + :kbd:`x` = Вырезать
        * :kbd:`ctrl` + :kbd:`z` = Отмена
        * :kbd:`ctrl` + :kbd:`i` = Курсив
        * :kbd:`ctrl` + :kbd:`b` = Жирный

    ..  group-tab:: macOs

        * :kbd:`cmd (⌘)` + :kbd:`a` = Выделить весь текст
        * :kbd:`cmd (⌘)` + :kbd:`c` = Копировать
        * :kbd:`cmd (⌘)` + :kbd:`v` = Вставить
        * :kbd:`cmd (⌘)` + :kbd:`x` = Вырезать
        * :kbd:`cmd (⌘)` + :kbd:`z` = Отмена
        * :kbd:`cmd (⌘)` + :kbd:`i` = Курсив
        * :kbd:`cmd (⌘)` + :kbd:`b` = Жирный


Перезагрузка страниц и очистка кэша браузера
============================================

..  tabs::

    ..  group-tab:: Windows / Linux

        * :kbd:`F5` = Перезагрузка страницы
        * :kbd:`ctrl` + :kbd:`F5` = Перезагрузка страницы с очисткой кэша браузера

    ..  group-tab:: macOS

        * :kbd:`cmd (⌘)` + :kbd:`r` = Перезагрузка страницы
        * :kbd:`cmd (⌘)` + :kbd:`option (⌥)` + :kbd:`r` = Перезагрузка страницы с очисткой кэша браузера


Opening the backend search modal
================================

..  versionadded:: 12.0

..  tabs::

    ..  group-tab:: Windows / Linux

        * :kbd:`ctrl` + :kbd:`k`

    ..  group-tab:: macOS

        * :kbd:`cmd (⌘)` + :kbd:`k`


Multiselect in content elements
===============================

..  versionadded:: 12.3

The keyboard commands can be used on a select element:

..  figure:: /Images/ManualScreenshots/ContentElements/SelectMultipleSideBySide.png
    :alt: A multiselect element
    :class: with-shadow

    A multiselect element

Or a folder element:

..  figure:: /Images/ManualScreenshots/ContentElements/Folder.png
    :alt: A folder element
    :class: with-shadow

    A folder element

Or a group element:

..  figure:: /Images/ManualScreenshots/ContentElements/Group.png
    :alt: A group element
    :class: with-shadow

    A group element

Selecting and deselecting options with the keyboard:

*   :kbd:`enter` = Add options, either from right to left or left to right
*   :kbd:`delete` or :kbd:`backspace` = Remove an option for Windows and Mac users
*   :kbd:`alt` + :kbd:`arrow up` = Move the option one up
*   :kbd:`alt` + :kbd:`arrow up` = Move the option one up
*   :kbd:`alt` + :kbd:`arrow down` = Move the option one down
*   :kbd:`alt` + :kbd:`shift` + :kbd:`arrow up` = Move the option to the top
*   :kbd:`alt` + :kbd:`shift` + :kbd:`arrow down` = Move the option to the bottom

More combinations:

*   :kbd:`shift` + :kbd:`arrow up` = Include the upper option
*   :kbd:`shift` + :kbd:`arrow down` = Include the lower option
*   :kbd:`home` = Move the cursor to the top
*   :kbd:`end` = Move the cursor to the bottom
