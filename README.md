# Тестовое задание для Backend разработчика

Необходимо на базе данного проекта реализовать АПИ, который предоставляет CRUD-интерфейс для работы с компаниями и связанными с ними контактами.

# Инструкция по запуску

* Дамп БД - af.backup
* git clone https://github.com/artur-makeev/test-api-js-backend.git
* npm install
* Документация к API доступна по адресу http://localhost:2114/api/docs/.
* Для получения jwt token необходимо отправить post запрос по адресу:
    http://localhost:2114/api/user/login с request body
    { "userlogin": "string", "password": "string"}.
