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

    console.log('API URL:', url); // ← отладочный лог

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('GET failed:', error);

      // Можно вернуть фолбэк, если есть window.FALLBACK_DATA
      if (window.FALLBACK_DATA?.news && !this.apiKey) {
        return {
          articles: window.FALLBACK_DATA.news,
          status: 'fallback',
        };
      }

      throw error;
    }
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
