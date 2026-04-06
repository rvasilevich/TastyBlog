import styles from './CategoryTabs.module.css';

// Переиспользуемый компонент CategoryTabs
// Принимает: categories, activeCategory, articles, onSelectCategory, showCount, className
function CategoryTabs({
  categories = [],
  activeCategory = 'all',
  articles = [],
  onSelectCategory,
  showCount = true,
  className = '',
}) {
  const getCategoryCount = (categoryId) => {
    if (!articles || articles.length === 0) return 0;
    if (categoryId === 'all') {
      return articles.length;
    }
    return articles.filter((article) => article.category === categoryId).length;
  };

  const handleClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div
      className={`${styles.categoryTabs} ${className}`}
      role="tablist"
      aria-label="Категории новостей"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const count = showCount ? getCategoryCount(category.id) : null;

        return (
          <button
            key={category.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`category-panel-${category.id}`}
            className={`${styles.categoryTab} ${isActive ? styles.categoryTab__active : ''}`}
            onClick={() => handleClick(category.id)}
          >
            {category.icon && (
              <span className={styles.categoryTab__icon}>{category.icon}</span>
            )}
            <span className={styles.categoryTab__label}>{category.name}</span>
            {count !== null && (
              <span className={styles.categoryTab__count}>{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
