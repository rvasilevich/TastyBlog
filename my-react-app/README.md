# NewsHub - Новостной портал (React Application)

Демонстрационное React-приложение - новостной портал "NewsHub" со **статическими моковыми данными**, **переиспользуемыми компонентами** и **CSS Modules** для изоляции стилей.

> ⚠️ **Важно:** Данные статические (моковые), но интерфейс **интерактивный** благодаря `useReducer` (альтернатива `useState`).

## 🚀 Запуск приложения

### Установка зависимостей

```bash
cd my-react-app
npm install
```

### Режим разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:5173`

### Сборка для продакшена

```bash
npm run build
```

### Предпросмотр продакшен-сборки

```bash
npm run preview
```

## 📁 Структура проекта

```
my-react-app/
├── src/
│   ├── components/
│   │   ├── NewsCard/
│   │   │   ├── NewsCard.jsx              # Переиспользуемый компонент карточки
│   │   │   └── NewsCard.module.css       # CSS Module
│   │   ├── NewsList/
│   │   │   ├── NewsList.jsx              # Композитный компонент списка
│   │   │   └── NewsList.module.css       # CSS Module
│   │   ├── CategoryTabs/
│   │   │   ├── CategoryTabs.jsx          # Композитный компонент вкладок
│   │   │   └── CategoryTabs.module.css   # CSS Module
│   │   ├── NewsFilters/
│   │   │   ├── NewsFilters.jsx           # Композитный компонент фильтров
│   │   │   └── NewsFilters.module.css    # CSS Module
│   │   └── NewsHeader/
│   │       ├── NewsHeader.jsx            # Композитный компонент шапки
│   │       └── NewsHeader.module.css     # CSS Module
│   ├── data/
│   │   └── mockData.js                   # Статические моковые данные
│   ├── App.jsx                           # Главный компонент (композиция)
│   ├── App.css                           # Глобальные стили App
│   ├── index.css                         # Базовые CSS переменные
│   └── main.jsx                          # Точка входа React
├── public/
├── package.json
└── vite.config.js
```

## 🧩 Компоненты (Минимум 5)

Все компоненты **переиспользуемые** и **чисто функциональные** (без useState/useEffect).

### 1. **NewsCard** - Карточка новости (Базовый компонент)

**Props:**

- `article` (object) - объект статьи с полями: id, title, content, author, date, category, image, excerpt
- `onReadMore` (function) - обработчик клика для чтения
- `onShare` (function) - обработчик кнопки "Поделиться"
- `showExcerpt` (boolean) - показывать ли описание (default: true)
- `showFooter` (boolean) - показывать ли футер карточки (default: true)
- `className` (string) - дополнительный CSS класс

**Использование:**

```jsx
<NewsCard
  article={myArticle}
  onReadMore={(article) => console.log(article)}
  onShare={(article) => alert('Shared!')}
  showExcerpt={true}
/>
```

### 2. **NewsList** - Список новостей (Композитный компонент)

Использует `NewsCard` для отображения каждой статьи.

**Props:**

- `articles` (array) - массив статей
- `onReadMore` (function) - обработчик для всех карточек
- `onShare` (function) - обработчик для всех карточек
- `emptyMessage` (string) - сообщение при отсутствии статей
- `emptyIcon` (string) - иконка при отсутствии статей
- `className` (string) - дополнительный CSS класс
- `columns` (string) - настройка CSS Grid (default: 'auto-fill')

**Использование:**

```jsx
<NewsList
  articles={filteredArticles}
  onReadMore={handleReadMore}
  emptyMessage="Ничего не найдено"
  columns="auto-fill"
/>
```

### 3. **CategoryTabs** - Вкладки категорий (Композитный компонент)

**Props:**

- `categories` (array) - массив объектов категорий {id, name, icon}
- `activeCategory` (string) - ID активной категории
- `articles` (array) - все статьи (для подсчёта)
- `onSelectCategory` (function) - обработчик выбора категории
- `showCount` (boolean) - показывать ли количество (default: true)
- `className` (string) - дополнительный CSS класс

**Использование:**

```jsx
<CategoryTabs
  categories={categories}
  activeCategory="technology"
  articles={allArticles}
  onSelectCategory={(id) => console.log(id)}
  showCount={true}
/>
```

### 4. **NewsFilters** - Фильтры и поиск (Композитный компонент)

**Props:**

- `searchQuery` (string) - текущий поисковый запрос
- `sortBy` (string) - текущий тип сортировки
- `sortOptions` (array) - массив вариантов сортировки {id, name}
- `resultsCount` (number) - количество найденных статей
- `onSearchChange` (function) - обработчик ввода поиска
- `onSortChange` (function) - обработчик изменения сортировки
- `onClearFilters` (function) - обработчик сброса фильтров
- `showSort` (boolean) - показывать ли сортировку
- `showClearButton` (boolean) - показывать ли кнопку сброса
- `showResultsCount` (boolean) - показывать ли счётчик
- `searchPlaceholder` (string) - placeholder для поиска
- `className` (string) - дополнительный CSS класс

**Использование:**

```jsx
<NewsFilters
  searchQuery="Google"
  sortBy="date-desc"
  sortOptions={sortOptions}
  resultsCount={5}
  onSearchChange={(query) => console.log(query)}
  onSortChange={(sort) => console.log(sort)}
  onClearFilters={() => clearAll()}
/>
```

### 5. **NewsHeader** - Шапка портала (Композитный компонент)

**Props:**

- `title` (string) - название сайта
- `subtitle` (string) - подзаголовок
- `icon` (string) - иконка/эмодзи
- `totalArticles` (number) - всего статей
- `filteredCount` (number) - показано статей
- `actions` (array) - кастомные кнопки действий
- `onRefresh` (function) - обработчик обновления
- `onShare` (function) - обработчик "Поделиться"
- `showStats` (boolean) - показывать ли статистику
- `showRefresh` (boolean) - показывать ли кнопку обновления
- `showShare` (boolean) - показывать ли кнопку "Поделиться"
- `className` (string) - дополнительный CSS класс

**Использование:**

```jsx
<NewsHeader
  title="NewsHub"
  subtitle="Актуальные новости"
  icon="📰"
  totalArticles={100}
  filteredCount={25}
  onRefresh={() => location.reload()}
  showStats={true}
/>
```

### 6. **App** - Главный компонент (Композиция всех компонентов)

Объединяет все компоненты вместе, передаёт статические данные и обработчики.

## 📊 Статические моковые данные

Файл: `src/data/mockData.js`

Содержит **12 новостей** по тематике NewsHub (похожи на основной проект TastyBlog):

### Категории новостей:

- 💻 **technology** - Квантовый компьютер Google, складной iPhone, ChatGPT-6
- 💼 **business** - Бизнес-тренды 2026, Bitcoin
- 🏛️ **politics** - Санкции ЕС, реформа здравоохранения
- 🔬 **science** - Научные открытия, миссия SpaceX
- ⚽ **sports** - Чемпионат мира по футболу, Олимпийские игры

### Структура статьи:

```javascript
{
  id: 1,                                    // Уникальный ID
  title: 'Заголовок новости',               // Заголовок
  content: 'Полное содержание статьи...',    // Полный текст
  excerpt: 'Краткое описание...',           // Краткое описание
  author: 'Иван Петров',                    // Автор
  date: '2026-02-23T10:30:00',             // Дата публикации (ISO)
  category: 'technology',                   // Категория
  image: '/images/quantum-core.jpg',        // URL изображения
}
```

### Экспортируемые данные:

```javascript
export const mockNewsData = [...]      // 12 статей
export const categories = [...]        // 6 категорий (включая "all")
export const sortOptions = [...]       // 4 варианта сортировки
```

## ⚙️ Обработчики событий (заглушки)

Все обработчики определены как обычные функции в `App.jsx`:

| Обработчик             | Компонент    | Действие (заглушка)               |
| ---------------------- | ------------ | --------------------------------- |
| `handleSelectCategory` | CategoryTabs | `alert()` с названием категории   |
| `handleSearchChange`   | NewsFilters  | `console.log()` запроса           |
| `handleSortChange`     | NewsFilters  | `alert()` с типом сортировки      |
| `handleReadMore`       | NewsCard     | `alert()` с полным текстом статьи |
| `handleShare`          | NewsCard     | `alert()` о копировании ссылки    |
| `handleClearFilters`   | NewsFilters  | `alert()` о сбросе фильтров       |
| `handleRefresh`        | NewsHeader   | `alert()` об обновлении           |
| `handleAppShare`       | NewsHeader   | `alert()` о копировании ссылки    |

## 🎨 Стилизация (CSS Modules)

### Изоляция стилей через CSS Modules

Каждый компонент имеет **собственный `.module.css` файл**:

| Компонент    | CSS Module                | Особенности                                 |
| ------------ | ------------------------- | ------------------------------------------- |
| NewsCard     | `NewsCard.module.css`     | Стили карточки, hover-эффекты, адаптивность |
| NewsList     | `NewsList.module.css`     | CSS Grid, пустое состояние                  |
| CategoryTabs | `CategoryTabs.module.css` | Градиенты, скролл, активные состояния       |
| NewsFilters  | `NewsFilters.module.css`  | Формы, инпуты, лейблы                       |
| NewsHeader   | `NewsHeader.module.css`   | Градиентный фон, статистика                 |

### Преимущества CSS Modules:

✅ **Полная изоляция** - классы автоматически именуются (`NewsCard_newsCard__abc123`)  
✅ **Нет конфликтов** - стили не пересекаются между компонентами  
✅ **Оптимизация** - Vite автоматически оптимизирует для production  
✅ **Локальная область** - классы доступны только в своём компоненте

### Глобальные стили:

- `index.css` - CSS переменные, сброс стилей, кастомные скроллбары
- `App.css` - Layout приложения (main, container, footer)

## 🔍 Функционал

### Фильтрация по категориям

Чистая функция `getFilteredAndSortedArticles()` в `App.jsx`:

```javascript
// Фильтрация по категории
if (category !== 'all') {
  filtered = filtered.filter((article) => article.category === category);
}
```

### Поиск по тексту

```javascript
// Поиск по заголовку, содержанию, описанию, автору
filtered = filtered.filter(
  (article) =>
    article.title.toLowerCase().includes(query) ||
    article.content.toLowerCase().includes(query) ||
    article.excerpt.toLowerCase().includes(query) ||
    article.author.toLowerCase().includes(query)
);
```

### Сортировка

```javascript
'date-desc'; // По дате (новые сначала)
'date-asc'; // По дате (старые сначала)
'title-asc'; // По заголовку (А-Я)
'title-desc'; // По заголовку (Я-А)
```

## 🏗 Композиция компонентов

```
App (главный компонент)
│
├── NewsHeader (композиция)
│   ├── Логотип (icon + title)
│   ├── Кнопки действий (refresh, share)
│   └── Статистика (totalArticles, filteredCount)
│
├── CategoryTabs (композиция)
│   └── CategoryTab[] (базовые кнопки категорий)
│
├── NewsFilters (композиция)
│   ├── Поле поиска
│   ├── Выпадающий список сортировки
│   └── Кнопка сброса + счётчик
│
└── NewsList (композиция)
    └── NewsCard[] (базовые карточки)
        ├── Изображение/Placeholder
        ├── Категория
        ├── Заголовок
        ├── Описание
        ├── Мета (author, date)
        └── Footer (read more, share)
```

## 🔄 Переиспользование компонентов

### Пример 1: Показать только технологии

```jsx
<NewsList
  articles={allArticles.filter((a) => a.category === 'technology')}
  onReadMore={handleReadMore}
/>
```

### Пример 2: Карточки без футера

```jsx
<NewsCard article={article} showFooter={false} showExcerpt={false} />
```

### Пример 3: Фильтры без сортировки

```jsx
<NewsFilters
  searchQuery={query}
  showSort={false}
  showResultsCount={true}
  onSearchChange={handleSearch}
/>
```

### Пример 4: Кастомный NewsHeader

```jsx
<NewsHeader
  title="TechNews"
  subtitle="Только технологии"
  icon="💻"
  totalArticles={techArticles.length}
  showRefresh={false}
  actions={[{ id: 'custom', label: '🔔 Подписаться', onClick: subscribe }]}
/>
```

## 🛠 Технологии

- **React 19** - UI библиотека
- **Vite 8** - Сборщик и dev-сервер
- **CSS Modules** - Изоляция стилей
- **Чистые функции** - Без useState/useEffect, только props
- **ES6+** - Модули, деструктуризация, стрелочные функции

## 📝 Скрипты package.json

```json
{
  "dev": "vite", // Запуск dev-сервера
  "build": "vite build", // Продакшен сборка
  "preview": "vite preview", // Предпросмотр сборки
  "lint": "eslint ." // Проверка кода
}
```

## 🎯 Демонстрация

После запуска `npm run dev` откройте `http://localhost:5173`:

### Что вы увидите:

1. **Шапка NewsHub** с градиентным фоном, логотипом, статистикой и кнопками
2. **Вкладки категорий** с иконками (💻🏛️💼🔬⚽) и счётчиками
3. **Панель фильтров** с полем поиска и выпадающим списком сортировки
4. **Сетка из 12 карточек** с hover-эффектами и адаптивным layout
5. **Подвал** с копирайтом

### Примеры взаимодействия:

- 🔍 Введите "Google" → console.log + alert при выборе категории
- 📂 Кликните "Технологии" → alert с названием категории
- 📖 Кликните на карточку → alert с полным текстом статьи
- 🔄 Кликните "Обновить" → alert об обновлении

## 📦 Зависимости

### Основные

- `react` ^19.2.4
- `react-dom` ^19.2.4

### Dev-зависимости

- `vite` ^8.0.4
- `@vitejs/plugin-react` ^6.0.1
- `eslint` ^9.39.4

## ✨ Ключевые особенности

✅ **Статические моковые данные** - 12 новостей не загружаются из API  
✅ **Интерактивный интерфейс** - `useReducer` управляет фильтрами (вместо `useState`)  
✅ **Рабочая сортировка** - все 4 варианта работают корректно  
✅ **Рабочий поиск** - можно вводить текст и фильтровать новости  
✅ **Рабочие категории** - переключение между категориями мгновенно обновляет список  
✅ **Переиспользуемые компоненты** - каждый можно использовать в разных контекстах  
✅ **CSS Modules** - полная изоляция стилей  
✅ **Композитные компоненты** - NewsList использует NewsCard  
✅ **Обработчики событий** - все события работают через dispatch  
✅ **Адаптивный дизайн** - CSS Grid с auto-fill  
✅ **Доступность** - ARIA-атрибуты, семантические теги

## 🔄 Как работает интерактивность

### Без useState, но с useReducer

Вместо `useState` используется `useReducer` для управления состоянием фильтров:

```javascript
const [filters, dispatch] = useReducer(filtersReducer, {
  category: 'all',
  searchQuery: '',
  sortBy: 'date-desc',
});
```

### Actions для обновления:

| Действие           | Тип             | Payload        | Что делает                       |
| ------------------ | --------------- | -------------- | -------------------------------- |
| Выбрать категорию  | `SET_CATEGORY`  | `'technology'` | Фильтрует по категории           |
| Ввести поиск       | `SET_SEARCH`    | `'Google'`     | Фильтрует по тексту              |
| Сменить сортировку | `SET_SORT`      | `'date-desc'`  | Сортирует статьи                 |
| Сбросить фильтры   | `CLEAR_FILTERS` | `-`            | Возвращает к начальным значениям |

### Чистая функция фильтрации

```javascript
const filteredArticles = getFilteredAndSortedArticles(
  allArticles, // Статические моковые данные
  filters.category, // Текущая категория
  filters.searchQuery, // Текущий поиск
  filters.sortBy // Текущая сортировка
);
```

Функция **не изменяет** исходные данные, возвращает новый массив.

---

**NewsHub © 2026** - Демонстрационное React-приложение с переиспользуемыми компонентами
