import styles from './NewsCard.module.css';

const categoryIcons = {
  technology: '💻',
  business: '💼',
  politics: '🏛️',
  science: '🔬',
  sports: '⚽',
  default: '📰',
};

function formatDate(dateString, locale = 'ru-RU') {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function truncateText(text, maxLength = 120) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Переиспользуемый компонент NewsCard
// Принимает: article, onReadMore, onShare, showExcerpt, showFooter, className
function NewsCard({
  article,
  onReadMore,
  onShare,
  showExcerpt = true,
  showFooter = true,
  className = '',
}) {
  if (!article) {
    return null;
  }

  const { id, title, content, author, date, category, image, excerpt } =
    article;

  const categoryIcon = categoryIcons[category] || categoryIcons.default;

  const handleShare = (e) => {
    e.stopPropagation();
    if (onShare) {
      onShare(article, e);
    }
  };

  const handleClick = () => {
    if (onReadMore) {
      onReadMore(article);
    }
  };

  return (
    <article
      className={`${styles.newsCard} ${className}`}
      onClick={handleClick}
      data-article-id={id}
      data-category={category}
    >
      {/* Изображение */}
      {image ? (
        <img
          src={image}
          alt={title}
          className={styles.newsCard__image}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div
        className={styles.newsCard__imagePlaceholder}
        style={{ display: image ? 'none' : 'flex' }}
      >
        {categoryIcon}
      </div>

      {/* Контент */}
      <div className={styles.newsCard__content}>
        {/* Категория */}
        <span className={styles.newsCard__category}>
          {categoryIcon} {category}
        </span>

        {/* Заголовок */}
        <h3 className={styles.newsCard__title} title={title}>
          {title}
        </h3>

        {/* Описание */}
        {showExcerpt && (
          <p className={styles.newsCard__excerpt}>
            {excerpt || truncateText(content, 150)}
          </p>
        )}

        {/* Мета-информация */}
        <div className={styles.newsCard__meta}>
          {author && (
            <span className={styles.newsCard__author}>👤 {author}</span>
          )}
          {date && (
            <time className={styles.newsCard__date} dateTime={date}>
              {formatDate(date)}
            </time>
          )}
        </div>
      </div>

      {/* Футер карточки */}
      {showFooter && (
        <div className={styles.newsCard__footer}>
          {onReadMore && (
            <button
              className={styles.newsCard__readMore}
              onClick={handleClick}
              aria-label={`Читать далее: ${title}`}
            >
              Читать далее →
            </button>
          )}
          {onShare && (
            <button
              className={styles.newsCard__share}
              onClick={handleShare}
              title="Поделиться"
              aria-label={`Поделиться: ${title}`}
            >
              🔗
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default NewsCard;
