# Phone Store Backend

Простой backend на NestJS для интернет-магазина телефонов. Проект сделан в обучающем стиле: всё разделено по модулям, а в коде есть комментарии, объясняющие, как работает приложение.

## Что уже есть

- Модуль телефонов: список, создание, обновление, удаление
- Модуль заказов: оформление заказа с проверкой наличия товара
- Валидация входных данных через DTO и class-validator
- Swagger документация для API
- Глобальный CORS и валидация

## Запуск

```bash
npm install
npm run start
```

После запуска:

- API: http://localhost:3000
- Swagger: http://localhost:3000/api/docs

## Основные endpoints

### Телефоны

- GET /phones
- GET /phones/:id
- POST /phones
- PATCH /phones/:id
- DELETE /phones/:id

### Заказы

- GET /orders
- POST /orders

## Пример запроса на создание заказа

```json
{
  "customerName": "Иван Петров",
  "customerEmail": "ivan@example.com",
  "address": "ул. Ленина, 12",
  "items": [
    { "phoneId": 1, "quantity": 1 },
    { "phoneId": 2, "quantity": 2 }
  ]
}
```

## Как устроен проект

- `src/app.module.ts` — корневой модуль, подключает остальные модули
- `src/phones/phones.controller.ts` — HTTP-эндпоинты для телефонов
- `src/phones/phones.service.ts` — логика работы с товарами
- `src/orders/orders.controller.ts` — HTTP-эндпоинты для заказов
- `src/orders/orders.service.ts` — логика оформления заказов
- `src/main.ts` — запуск сервера и подключение Swagger

## Что дальше можно добавить

- PostgreSQL + Prisma или TypeORM
- Авторизацию через JWT
- Корзину и избранное
- Админку для управления товарами
- Загрузку изображений
