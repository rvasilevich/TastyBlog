import NewsCard from '../NewsCard/NewsCard';
import styles from './NewsList.module.css';

// Переиспользуемый компонент NewsList
// Принимает: articles, onReadMore, onShare, emptyMessage, emptyIcon, className, columns
function NewsList({
  articles = [],
  onReadMore,
  onShare,
  emptyMessage = 'Новости не найдены',
  emptyIcon = '📭',
  className = '',
  columns = 'auto-fill',
}) {
  if (!articles || articles.length === 0) {
    return (
      <div className={`${styles.newsList__empty} ${className}`}>
        <div className={styles.newsList__emptyIcon}>{emptyIcon}</div>
        <h3 className={styles.newsList__emptyTitle}>{emptyMessage}</h3>
      </div>
    );
  }

  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, minmax(320px, 1fr))`,
  };

  return (
    <div
      className={`${styles.newsList} ${className}`}
      style={columns === 'auto-fill' ? {} : gridStyle}
      role="list"
      aria-label="Список новостей"
    >
      {articles.map((article) => (
        <NewsCard
          key={article.id || article.title}
          article={article}
          onReadMore={onReadMore}
          onShare={onShare}
          className={styles.newsList__card}
        />
      ))}
    </div>
  );
}

export default NewsList;
