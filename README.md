# Использование

``docker-compose up -d``
и один из контейнеров в котором поднят nginx по дефолту слушает порт 80, соответственно можно перейти на http:/localhost, это и будет приложение



## Стек
тут все очень просто:   
- bun (для ts рантайма)
- nginx  (для прокси сервера)
- docker  (для контейнеризации)
- vue3 

## Структура 
**api** директория с маленьким ts-сервером, на докер-компоуз он запускается отдельным сервисом и слушает [:3000]

**fe** соответственно это директория с vue3 приложением, nginx файлом и своим докер файлом так же запускается через компоуз и использует один нетворк 'api' с приложением api


