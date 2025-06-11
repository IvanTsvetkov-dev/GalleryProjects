# Запуск приложения
1. Запустить докер движок на компьютере
2. Введите в корне проекта docker compose build для сборки
3. Введите для запуска сервисов docker compose up
4. Сервер django доступен на *localhost:8000.* React - *localhost:3000*

# Gallery projects

# backend

1. Реализована модель Project.
2. Добавлены представления CRUD для манипулирования с данными по API.
3. Созданы маршруты для представлений CRUD.
4. Добавлена документация для API в двух форматах swagger/redoc.
![Pasted image 20250611204246](https://github.com/user-attachments/assets/8acccdf3-d4c4-4af4-b5b0-87e89e855441)
![Pasted image 20250611204305](https://github.com/user-attachments/assets/77a8c2cb-eb17-4d42-bb35-e437e57a5872)
5. Добавлена пагинация.

# frontend 
![Pasted image 20250611204407](https://github.com/user-attachments/assets/a39c6c1f-da7d-44c1-8fce-0286293e3f13)

1. Приложение сделано на React
2. Используется Bootstrap
3. Декомпозиция на компоненты
4. Разделение серверной логики и ui
5. Добавлена реализация пагинации.
6. BreadCrumbs для более удобного взаимодействия с приложением.
 ![Pasted image 20250611204528](https://github.com/user-attachments/assets/2f54a7f7-9101-4c01-bbb6-366b0a3fa1a5)

7. Реализованы операции CRUD с проектами.
![Pasted image 20250611205404](https://github.com/user-attachments/assets/7b37054a-202b-40a4-849c-74f5a5f7f065)

8. Удалить можно несколько элементов.
9. Модальное окно для подтверждения удаления
![Pasted image 20250611204658](https://github.com/user-attachments/assets/2a6e59fc-fdab-4dde-a8b3-11f9e7fbdb5f)

10. Время в правом верхнем углу :D 
11. Добавлена первичная обработка ошибок при отправке/вводе некорректных данных
Тестировал в браузере FireFox developer 



# Docker
1. Добавлен Dockerfile для Django
2. Добавлен Dockerfile для React
3. compose.yml для управления контейнерами
Для продакшена не подойдёт, однако хватит чтобы протестировать приложение локально.
**Не хватает**: gunicorn для django(используется встроенный сервер, для продакшена не подойдёт), nginx(для разадчи статики) и postgresql.
