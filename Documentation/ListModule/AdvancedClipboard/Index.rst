:navigation-title: Clipboard

..  include:: /Includes.rst.txt
..  index:: Clipboard; Advanced
..  _clipboard:
..  _advanced_clipboard_usage:
..  _the-numeric-clipboard-pads-managing-many-elements:

============================================================
Using the clipboard to copy or move multiple records at once
============================================================

If the clipboard is not yet enabled, display it via the "View" drop down in the
header of the "List" module. Then choose one of the clipboards, for example
"Clipboard #1".

..  figure:: /Images/ManualScreenshots/ListModule/Clipboard/ChooseClipboard.png
    :alt: The clipboard can be shown by "Show clipbaord" entry in the "View" drop down

    Choose "Clipboard #1" to activate the multi-selection mode

As soon as one or more records are checked, new buttons will appear at the top of the list:

#.  :guilabel:`Edit` all selected items at once

#.  :guilabel:`Transfer to Clipboard` all selected items at once

#.  :guilabel:`Remove from Clipboard` all selected items at once

#.  :guilabel:`Delete` all selected items at once

Now check several boxes and click the :guilabel:`Transfer to Clipboard` button.
Your clipboard should look like this:

..  figure:: /Images/ManualScreenshots/ListModule/Clipboard/ClipboardMultipleItems.png
    :alt: TYPO3 backend clipboard with several items

    You can transfer multiple items of different types from different pages

The button :guilabel:`Move Elements` is selected by default. Select the button
:guilabel:`Copy Elements` instead. The selected elements will now be copied
and the current page will remain unchanged.

Move to another page and click the "Paste in clipboard content" button:

..  figure:: /Images/ManualScreenshots/ListModule/Clipboard/ClipboardMultipleItems.png
    :alt: Button "Paste in clipboard content"

    The text on the button is the same no matter weather you move or copy items

A confirmation dialog appears. If you click ok, the chosen records are moved or
copied, depending on the mode selected in the Clipboard on the bottom of the
List module.
