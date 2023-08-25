.. include:: /Includes.rst.txt
.. index:: Clipboard; Advanced
.. _advanced_clipboard_usage:
.. _the-numeric-clipboard-pads-managing-many-elements:

===================================================
Расширенные возможности использования буфера обмена
===================================================

Выберите страницу в режиме :guilabel:`Список` / :guilabel:`List`. Если эта функция не активирована, нажмите на кнопку :guilabel:`Показать буфер обмена`  /  :guilabel:`Show Clipboard` (1). Выберите :guilabel:`"Буфер обмена №1 (режим множественного выбора)"` / :guilabel:`"Clipboard #1 (multi-selection mode)"` на панели буфера обмена в нижней части страницы. Теперь можно отметить все записи (3) или отметить только те, с которыми нужно работать. Каждая запись теперь имеет флажок.

.. include:: /Images/AutomaticScreenshots/ListModule/ActivateClipboardPad.rst.txt

После того как одна или несколько записей отмечены, в верхней части списка появляются новые кнопки:

#. :guilabel:`Править` / :guilabel:`Edit` все выбранные элементы одновременно.

#. :guilabel:`Перенос в буфер обмена` /:guilabel:`Transfer to Clipboard` сразу всех выбранных элементов.

#. :guilabel:`Удалить из буфера обмена` / :guilabel:`Remove from Clipboard` сразу все выбранные элементы.

#. :guilabel:`Удалить` / :guilabel:`Delete` все выбранные элементы сразу.

Теперь установите соответствующие флажки и нажмите кнопку :guilabel:`Передать в буфер обмена` / :guilabel:`Transfer to Clipboard`. И буфер обмена должен стать примерно таким:

.. include:: /Images/AutomaticScreenshots/ListModule/ClipboardWithMultipleItems.rst.txt

По умолчанию выбрана кнопка :guilabel:`Переместить элементы` / :guilabel:`Move Elements`. Выберите вместо нее кнопку :guilabel:`Копировать элементы` / :guilabel:`Copy Elements`. Выбранные элементы будут скопированы, а текущая страница останется неизменной.

Перейдите на другую страницу и нажмите на значок "Вставить в" / "Paste into":

.. include:: /Images/AutomaticScreenshots/ListModule/PasteClipboardContent.rst.txt

Появляется предупреждение, подтверждающее выполнение операции:

.. include:: /Images/AutomaticScreenshots/ListModule/ClipboardWarning.rst.txt

После подтверждения вы увидите, что оба элемента перемещены в верхнюю часть списка, а панель буфера обмена пуста:

.. include:: /Images/AutomaticScreenshots/ListModule/MovedContentEmptyClipboard.rst.txt
