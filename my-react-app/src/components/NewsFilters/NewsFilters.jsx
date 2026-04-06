import styles from './NewsFilters.module.css';

// Переиспользуемый компонент NewsFilters
// Принимает: searchQuery, sortBy, sortOptions, resultsCount, onSearchChange, onSortChange, onClearFilters, showSort, showClearButton, showResultsCount, className
function NewsFilters({
  searchQuery = '',
  sortBy = 'date-desc',
  sortOptions = [],
  resultsCount,
  onSearchChange,
  onSortChange,
  onClearFilters,
  showSort = true,
  showClearButton = true,
  showResultsCount = true,
  searchPlaceholder = 'Поиск новостей по заголовку или содержанию...',
  className = '',
}) {
  const handleSearchChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value, e);
    }
  };

  const handleSortChange = (e) => {
    if (onSortChange) {
      onSortChange(e.target.value, e);
    }
  };

  const handleClear = () => {
    if (onClearFilters) {
      onClearFilters();
    }
  };

  const hasActiveFilters = searchQuery || (sortBy && sortBy !== 'date-desc');

  return (
    <div className={`${styles.newsFilters} ${className}`}>
      <div className={styles.newsFilters__header}>
        <h3 className={styles.newsFilters__title}>🔍 Фильтры и поиск</h3>
        {showClearButton && hasActiveFilters && onClearFilters && (
          <button
            className={styles.newsFilters__clear}
            onClick={handleClear}
            aria-label="Сбросить все фильтры"
          >
            ✕ Сбросить фильтры
          </button>
        )}
      </div>

      <div className={styles.newsFilters__controls}>
        {/* Поле поиска */}
        <div className={styles.newsFilters__search}>
          <span className={styles.newsFilters__searchIcon}>🔎</span>
          <input
            type="text"
            className={styles.newsFilters__searchInput}
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Поиск новостей"
          />
        </div>

        {/* Сортировка */}
        {showSort && sortOptions && sortOptions.length > 0 && (
          <div className={styles.newsFilters__sort}>
            <label
              className={styles.newsFilters__sortLabel}
              htmlFor="sort-select"
            >
              Сортировка:
            </label>
            <select
              id="sort-select"
              className={styles.newsFilters__sortSelect}
              value={sortBy}
              onChange={handleSortChange}
              aria-label="Выбор сортировки"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Счётчик результатов */}
      {showResultsCount && resultsCount !== undefined && (
        <div className={styles.newsFilters__results}>
          Найдено:{' '}
          <span className={styles.newsFilters__resultsCount}>
            {resultsCount}
          </span>{' '}
          статей
        </div>
      )}
    </div>
  );
}

export default NewsFilters;
