..  include:: /Includes.rst.txt

..  _login:

===================
Авторизация в TYPO3
===================

Работа редактора в TYPO3 проходит во внутреннем интерфейсе, поэтому необходима активная учетная запись во внутреннем интерфейсе.

Введите в адресную строку браузера адрес вашего домена и добавьте к нему в конце :samp:`/typo3` для доступа к странице входа во внутренний интерфейс. Например: :samp:`http://www.example.org/typo3`.

..  note::
    Since TYPO3 v13, a custom entry point for the TYPO3 backend can be
    customized. If the path :samp:`/typo3` does not work, consult the
    project's documentation or ask your administrator for the correct backend
    URL.

Убедитесь, что в вашем браузере включены JavaScript и cookies, так как они необходимы для работы внутреннего интерфейса TYPO3.

..  figure:: /Images/ManualScreenshots/Login/BackendLoginPage.png
    :class: with-shadow
    :alt: Окно входа во внутренний интерфейс TYPO3

    Окно входа во внутренний интерфейс TYPO3

..  versionadded:: 12.3

Пароль может быть отображен открытым текстом, если после ввода в поле пароля нажать на символ "глаз".

..  warning::
    Раскрытие учетных данных всегда сопряжено с риском для безопасности. Пожалуйста, используйте эту функцию с осторожностью, когда никто не может наблюдать за вводимыми вами данными, удаленно или заглядывая вам через плечо!

Решение проблем: Забыт пароль для входа во внутренний интерфейс
===============================================================

Следующий пример работает только в том случае, если администратор сайта :ref:`включил функцию сброса пароля<t3coreapi:access-password-reset>` и при этом в учетной записи внутреннего интерфейса задан корректный адрес электронной почты.

..  rst-class:: bignums-attention

#.  Нажмите на кнопку :guilabel:`Забыли пароль?` / :guilabel:`Forgot your password?`

    Перейдите на страницу авторизации во внутреннем интерфейсе и выберите :guilabel:`Забыли пароль?` / :guilabel:`Forgot your password?`.

    ..  figure:: /Images/ManualScreenshots/Login/ForgotPasswordLink.png
        :alt: Нажмите на кнопку "Забыли пароль?" / "Forgot your password?"
        :class: with-shadow

        Щёлкните по :guilabel:`Забыли пароль?` / :guilabel:`Forgot your password?`

#.  Введите адрес своей электронной почты

    Используйте тот же адрес электронной почты, который вы указали при регистрации.

    ..  figure:: /Images/ManualScreenshots/Login/ForgotPasswordEmail.png
        :alt: Нажмите на кнопку "Забыли пароль?" / "Forgot your password?"
        :class: with-shadow

        Щёлкните по :guilabel:`Забыли пароль?` / :guilabel:`Forgot your password?`

#.  Открыть электронное письмо

    Обратите внимание, что следующая страница появится даже в том случае, если введенный вами e-mail не был найден. Это связано с тем, что система не раскрывает информацию о любых зарегистрированных адресах электронной почты.

    Если вы не получили письмо, проверьте папку "Спам" и перепроверьте правильность адреса электронной почты.

    ..  figure:: /Images/ManualScreenshots/Login/ForgotPasswordSuccess.png
        :alt: Нажмите на кнопку "Забыли пароль?" / "Forgot your password?"
        :class: with-shadow

        Щёлкните по :guilabel:`Забыли пароль?` / :guilabel:`Forgot your password?`

#.  Введите новый пароль

    После перехода по ссылке восстановления пароля в полученном письме можно ввести новый пароль. Всегда используйте :ref: `безопасный пароль <t3coreapi:security-secure-passwords>`.

    ..  figure:: /Images/ManualScreenshots/Login/ForgotPasswordChangePassword.png
        :alt: Введите новый надежный пароль дважды
        :class: with-shadow

       Необходимо дважды ввести новый (безопасный) пароль
