# Проект Mesto фронтенд и бэкенд

## Ссылки на проект

Сайт - kv.mesto.nomoredomains.icu

## Запросы к API

API - kv.api.mesto.nomoredomains.icu

Запросы для работы с пользователем:
GET /users — возвращает всех пользователей из базы.  
GET /users/:userId - возвращает пользователя по _id.  
POST /users — создаёт пользователя с переданными в теле запроса name, about и avatar.  
PATCH /users/me — обновляет профиль.  
PATCH /users/me/avatar — обновляет аватар.  

Запросы для работы с карточками:
GET /cards — возвращает все карточки из базы.  
POST /cards — создаёт карточку с переданными в теле запроса name и link. owner проставляется.  
DELETE /cards/:cardId — удаляет карточку по _id.  
PUT /cards/:cardId/likes — поставить лайк карточке.  
DELETE /cards/:cardId/likes — убрать лайк с карточки.  
