# NewsAPI CORS Issue & Solution

## Проблема

Бесплатный тариф **NewsAPI** (`newsapi.org`) **не поддерживает браузерные запросы** из-за CORS ограничений:

```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource
```

Это происходит потому, что NewsAPI блокирует запросы с `Origin: http://localhost` или `file://`.

## Решение

### Текущее решение (реализовано)

Приложение автоматически использует **резервные данные** при обнаружении CORS ошибки:

1. **Попытка запроса к NewsAPI** → получает CORS ошибку
2. **Автоматический fallback** → использует `window.FALLBACK_DATA` из `js/api/config.js`
3. **Демонстрационный режим** → если fallback данных нет, создает моковые статьи

### Для получения реальных новостей есть 3 варианта:

#### Вариант 1: Серверный прокси (Рекомендуется)

Создайте простой Node.js сервер:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

const NEWS_API_KEY = 'ваш_ключ_newsapi';

app.get('/api/news', async (req, res) => {
  const params = new URLSearchParams(req.query);
  const url = `https://newsapi.org/v2/top-headlines?${params}&apiKey=${NEWS_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Proxy server running on http://localhost:3000'));
```

Затем измените `js/api/config.js`:
```javascript
window.API_CONFIG = {
  newsapi: {
    url: 'http://localhost:3000/api', // ваш прокси
    apikey: 'не нужен для прокси',
  }
};
```

#### Вариант 2: CORS прокси сервисы

Используйте публичные CORS прокси (для разработки):

```javascript
// js/api/apiService.js - измените URL
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url = `${proxyUrl}${this.baseUrl}${endpoint}?${queryParams}`;
```

**Важно**: Публичные прокси ненадежны и могут не работать.

#### Вариант 3: Платный тариф NewsAPI

Купите **Developer план** на newsapi.org ($15/месяц), который поддерживает CORS.

## Как работает текущая реализация

### 1. Поиск новостей
- Введите запрос в `#search-input` (например, "news")
- Нажмите Enter или кликните `#search-button`
- Вызывается `NewsAPI /top-headlines?q=news`
- Если CORS ошибка → показываются fallback данные
- Результаты кэшируются в LocalStorage (1 час)

### 2. Кэширование
- Все загруженные новости сохраняются в LocalStorage
- Ключ: `news_headlines_{"q":"news","language":"en","pageSize":20}`
- TTL: 3600000ms (1 час)
- При повторном запросе данные берутся из кэша

### 3. Кнопки управления
- **`#refresh-btn`** (Обновить):
  - Очищает просроченные записи кэша
  - Загружает свежие данные
  
- **`#clear-cache-btn`** (Очистить кэш):
  - Удаляет все записи кэша (кроме `app_settings` и `saved_items`)
  - Очищает `#data-container`
  - Показывает количество удаленных записей

### 4. Fallback данные

Редактируйте `js/api/config.js` → `window.FALLBACK_DATA.news` чтобы изменить демонстрационные статьи.

## Тестирование

1. Откройте `index.html` в браузере
2. Введите "news" в поле поиска
3. Нажмите Enter
4. Проверьте консоль (F12):
   ```
   ⚠️ NewsAPI CORS error - это ограничение бесплатного тарифа NewsAPI
   📦 Using fallback data
   ```
5. Новости появятся в `#data-container` под `#main`

## Структура файлов

```
js/
├── api/
│   ├── config.js          # API конфигурация и FALLBACK_DATA
│   └── apiService.js      # ApiService класс с обработкой CORS
├── storage/
│   └── localStorage.js    # LocalStorageService для кэширования
├── utils/
│   └── dataParser.js      # Утилиты для парсинга данных
└── script.js              # Основной файл с APIIntegrationManager
```

## Ключевые функции

- `handleSearch()` - обработка поиска
- `fetchNews(params)` - загрузка новостей с кэшированием
- `loadCachedNews()` - загрузка из кэша при старте
- `refreshNews()` - обновление данных
- `clearCache()` - очистка кэша
