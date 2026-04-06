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
      title: 'Пример новости из NewsHub',
      description: 'Описание примерной новости для оффлайн‑режима.',
      publishedAt: new Date().toISOString(),
      source: 'NewsHub (локальные данные)',
    },
  ],
};
