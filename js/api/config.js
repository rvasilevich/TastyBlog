// js/api/config.js

// Глобальные объекты, которые будут доступны везде
window.API_CONFIG = {
  // NewsAPI (актуальные новости)
  newsapi: {
    url: 'https://newsapi.org/v2',
    apikey: 'твой_ключ_newsapi', // замени на реальный ключ
    endpoints: {
      headlines: '/top-headlines',
      everything: '/everything',
    },
  },

  // The Guardian API (новости Гардиана)
  guardian: {
    url: 'https://content.guardianapis.com',
    apikey: 'твой_ключ_guardian', // замени
    endpoints: {
      search: '/search',
    },
  },

  // Currents API (актуальные новости, если есть ключ)
  currents: {
    url: 'https://api.currentsapi.services/v1',
    apikey: 'твой_ключ_currents', // замени
    endpoints: {
      latest: '/latest-news',
      search: '/search',
    },
  },
};

// Фолбэк‑данные для новостей (если API не отвечает)
window.FALLBACK_DATA = {
  news: [
    {
      title: 'Квантовый прорыв: Google представила 1000-кубитный процессор',
      description:
        'Google Quantum AI анонсировала новый квантовый процессор с рекордным количеством кубитов и встроенной коррекцией ошибок.',
      url: '#',
      urlToImage: 'images/quantum-core.jpg',
      publishedAt: new Date().toISOString(),
      source: { name: 'NewsHub (локальные данные)' },
      author: 'Иван Петров',
      content: 'Полное содержание статьи о квантовом прорыве...',
    },
    {
      title: 'Apple выпустит складной iPhone в 2027 году',
      description:
        'Apple подтвердила разработку складного iPhone с гибким экраном. Устройство получит два экрана и революционный дизайн.',
      url: '#',
      urlToImage: 'images/iphone-fold.jpg',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { name: 'Tech News Hub' },
      author: 'Мария Сидорова',
      content: 'Полное содержание статьи о складном iPhone...',
    },
    {
      title: 'Революция в AI: ChatGPT-6 прошел тесты на уровень врача',
      description:
        'Новая модель ChatGPT-6 успешно сдала медицинский экзамен, показав результаты лучше 95% реальных врачей.',
      url: '#',
      urlToImage: 'images/Image 1.jpg',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: { name: 'AI News Daily' },
      author: 'Анна Козлова',
      content: 'Полное содержание статьи о ChatGPT-6...',
    },
    {
      title: 'SpaceX запустила первую коммерческую миссию на Марс',
      description:
        'SpaceX успешно отправила грузовую миссию на Марс с оборудованием для будущей колонии.',
      url: '#',
      urlToImage: 'images/Image 2.jpeg',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: { name: 'Space News' },
      author: 'Дмитрий Смирнов',
      content: 'Полное содержание статьи о SpaceX...',
    },
    {
      title: 'Bitcoin достиг нового исторического максимума',
      description:
        'Криптовалюта Bitcoin обновила рекорд на фоне принятия ETF и институционального спроса.',
      url: '#',
      urlToImage: 'images/Image 3.jpeg',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: { name: 'Crypto Today' },
      author: 'Елена Морозова',
      content: 'Полное содержание статьи о Bitcoin...',
    },
  ],
};
