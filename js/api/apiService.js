// В config.js мы сделали: window.API_CONFIG и window.FALLBACK_DATA
// Этот файл не импортирует, ничего не экспортирует

class ApiService {
  constructor(baseUrl, apiKey = null) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async get(endpoint, params = {}) {
    const queryParams = new URLSearchParams({
      ...params,
      ...(this.apiKey && { api_key: this.apiKey }),
    }).toString();

    const url = `${this.baseUrl}${endpoint}?${queryParams}`;

    console.log('API URL:', url);

    try {
      // Note: NewsAPI free plan doesn't support browser requests (CORS blocked)
      // We need to handle this gracefully
      const response = await fetch(url, {
        method: 'GET',
        // Don't set Content-Type header for simple requests to avoid CORS preflight
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('GET failed:', error);
      console.warn(
        '⚠️ NewsAPI CORS error - это ограничение бесплатного тарифа NewsAPI'
      );
      console.warn(
        '💡 Решение: используйте серверный прокси или тестите через localhost с бэкендом'
      );

      // Return fallback data if available
      if (window.FALLBACK_DATA?.news) {
        console.log('📦 Using fallback data');
        return {
          articles: window.FALLBACK_DATA.news,
          status: 'fallback',
        };
      }

      // If no fallback data, create mock articles for testing
      console.log('🎨 Creating mock articles for testing');
      return {
        articles: this.createMockArticles(params),
        status: 'mock',
      };
    }
  }

  // Create mock articles for testing when API fails
  createMockArticles(params = {}) {
    const query = params.q || 'technology';
    const count = Math.min(params.pageSize || 10, 20);

    const mockArticles = [];
    for (let i = 0; i < count; i++) {
      mockArticles.push({
        title: `${query} - Новость #${i + 1}: Заголовок статьи о технологиях`,
        description: `Это демонстрационная статья о "${query}". NewsAPI бесплатный тариф блокирует браузерные запросы через CORS. Для работы нужен серверный прокси.`,
        url: '#',
        urlToImage: 'images/placeholder.jpg',
        publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
        source: {
          name: 'Mock News Source',
        },
        author: 'Test Author',
        content: `Полное содержание статьи о ${query}. Это демонстрационный контент для тестирования функционала.`,
      });
    }

    return mockArticles;
  }
}

// Фабрика создаёт стандартный ApiService для serviceName из window.API_CONFIG
function createApiService(serviceName) {
  const config = window.API_CONFIG?.[serviceName];
  if (!config) {
    throw new Error(`Unknown API service: ${serviceName}`);
  }

  return new ApiService(config.url, config.apikey);
}

// Экспортируем/глобально делаем доступным для APIIntegrationManager
window.ApiService = ApiService;
