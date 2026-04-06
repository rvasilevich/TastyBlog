import { useReducer } from 'react';
import NewsHeader from './components/NewsHeader/NewsHeader';
import CategoryTabs from './components/CategoryTabs/CategoryTabs';
import NewsFilters from './components/NewsFilters/NewsFilters';
import NewsList from './components/NewsList/NewsList';
import { mockNewsData, categories, sortOptions } from './data/mockData';
import './App.css';

// ============================================================================
// СТАТИЧЕСКИЕ МОКОВЫЕ ДАННЫЕ (не изменяются)
// ============================================================================
const allArticles = mockNewsData;
const allCategories = categories;
const allSortOptions = sortOptions;

// ============================================================================
// Reducer для управления фильтрами (используем вместо useState)
// ============================================================================
function filtersReducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'CLEAR_FILTERS':
      return { category: 'all', searchQuery: '', sortBy: 'date-desc' };
    default:
      return state;
  }
}

// ============================================================================
// Функция фильтрации и сортировки (чистая функция)
// ============================================================================
function getFilteredAndSortedArticles(articles, category, searchQuery, sortBy) {
  let filtered = [...articles];

  // Фильтрация по категории
  if (category !== 'all') {
    filtered = filtered.filter((article) => article.category === category);
  }

  // Поиск по тексту
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query)
    );
  }

  // Сортировка - находим выбранную опцию в sortOptions
  const selectedSort = allSortOptions.find((option) => option.id === sortBy);

  if (selectedSort) {
    const { value: sortField, direction: sortDirection } = selectedSort;

    filtered.sort((a, b) => {
      let valueA, valueB;

      if (sortField === 'date') {
        valueA = new Date(a.date).getTime();
        valueB = new Date(b.date).getTime();
      } else if (sortField === 'title') {
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
      } else {
        return 0;
      }

      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
}

// ============================================================================
// Главный компонент App (использует useReducer для интерактивности)
// ============================================================================
function App() {
  // useReducer управляет состоянием фильтров (альтернатива useState)
  const [filters, dispatch] = useReducer(filtersReducer, {
    category: 'all',
    searchQuery: '',
    sortBy: 'date-desc',
  });

  // Получаем отфильтрованные и отсортированные статьи
  const filteredArticles = getFilteredAndSortedArticles(
    allArticles,
    filters.category,
    filters.searchQuery,
    filters.sortBy
  );

  // Обработчики событий (вызывают dispatch для обновления)
  const handleSelectCategory = (categoryId) => {
    console.log('📂 Category selected:', categoryId);
    dispatch({ type: 'SET_CATEGORY', payload: categoryId });
  };

  const handleSearchChange = (query) => {
    console.log('🔍 Search query:', query);
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  const handleSortChange = (sortOption) => {
    console.log('🔄 Sort option:', sortOption);
    dispatch({ type: 'SET_SORT', payload: sortOption });
  };

  const handleClearFilters = () => {
    console.log('✕ Clear filters');
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const handleReadMore = (article) => {
    console.log('📖 Read more:', article);
    alert(
      `📖 ${article.title}\n\n${article.content}\n\nАвтор: ${article.author}\nДата: ${new Date(article.date).toLocaleDateString('ru-RU')}`
    );
  };

  const handleShare = (article) => {
    console.log('🔗 Share:', article);
    alert(`🔗 Ссылка на статью "${article.title}" скопирована!`);
  };

  const handleRefresh = () => {
    console.log('🔄 Refresh articles');
    dispatch({ type: 'CLEAR_FILTERS' });
    alert(
      '🔄 Фильтры сброшены!\n\n(В демонстрационном режиме используются статические моковые данные)'
    );
  };

  const handleAppShare = () => {
    console.log('🔗 Share app');
    alert('🔗 Ссылка на NewsHub скопирована!');
  };

  return (
    <div className="app">
      <main className="app__main">
        <div className="app__container">
          {/* Композитный компонент NewsHeader */}
          <NewsHeader
            title="NewsHub"
            subtitle="Ваш надёжный источник актуальных новостей, технологий и аналитики"
            totalArticles={allArticles.length}
            filteredCount={filteredArticles.length}
            onRefresh={handleRefresh}
            onShare={handleAppShare}
          />

          {/* Композитный компонент CategoryTabs */}
          <CategoryTabs
            categories={allCategories}
            activeCategory={filters.category}
            articles={allArticles}
            onSelectCategory={handleSelectCategory}
          />

          {/* Композитный компонент NewsFilters */}
          <NewsFilters
            searchQuery={filters.searchQuery}
            sortBy={filters.sortBy}
            sortOptions={allSortOptions}
            resultsCount={filteredArticles.length}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onClearFilters={handleClearFilters}
          />

          {/* Композитный компонент NewsList (переиспользуемый) */}
          <NewsList
            articles={filteredArticles}
            emptyMessage="Новости не найдены. Попробуйте изменить параметры поиска или выбрать другую категорию."
            onReadMore={handleReadMore}
            onShare={handleShare}
          />
        </div>
      </main>

      <footer className="app__footer">
        <div className="app__container">
          <p>NewsHub © 2026. Все права защищены.</p>
          <p className="app__footer-subtitle">
            Демонстрационное React-приложение с переиспользуемыми компонентами
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
