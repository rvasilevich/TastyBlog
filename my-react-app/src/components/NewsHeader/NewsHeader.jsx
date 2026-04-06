import styles from './NewsHeader.module.css';

// Переиспользуемый компонент NewsHeader
// Принимает: title, subtitle, icon, totalArticles, filteredCount, actions, onRefresh, onShare, showStats, showRefresh, showShare, className
function NewsHeader({
  title = 'NewsHub',
  subtitle = 'Ваш надёжный источник актуальных новостей',
  icon = '📰',
  totalArticles = 0,
  filteredCount = 0,
  actions = [],
  onRefresh,
  onShare,
  showStats = true,
  showRefresh = true,
  showShare = true,
  className = '',
}) {
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else if (navigator.share) {
      navigator
        .share({
          title: title,
          text: subtitle,
          url: window.location.href,
        })
        .catch(console.error);
    }
  };

  const defaultActions = [
    {
      id: 'refresh',
      label: '🔄 Обновить',
      onClick: handleRefresh,
      show: showRefresh && onRefresh,
    },
    {
      id: 'share',
      label: '🔗 Поделиться',
      onClick: handleShare,
      show: showShare,
    },
  ];

  const buttonsToShow =
    actions.length > 0
      ? actions
      : defaultActions.filter((action) => action.show);

  return (
    <header className={`${styles.newsHeader} ${className}`}>
      <div className={styles.newsHeader__top}>
        {/* Логотип */}
        <div className={styles.newsHeader__logo}>
          <span className={styles.newsHeader__logoIcon}>{icon}</span>
          <h1 className={styles.newsHeader__logoText}>{title}</h1>
        </div>

        {/* Кнопки действий */}
        {buttonsToShow.length > 0 && (
          <div className={styles.newsHeader__actions}>
            {buttonsToShow.map((action) => (
              <button
                key={action.id}
                className={styles.newsHeader__button}
                onClick={action.onClick}
                aria-label={action.label}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Подзаголовок */}
      {subtitle && <p className={styles.newsHeader__subtitle}>{subtitle}</p>}

      {/* Статистика */}
      {showStats && (
        <div className={styles.newsHeader__stats}>
          <div className={styles.newsHeader__stat}>
            <span className={styles.newsHeader__statValue}>
              {totalArticles}
            </span>
            <span className={styles.newsHeader__statLabel}>Всего статей</span>
          </div>
          {filteredCount > 0 && filteredCount !== totalArticles && (
            <div className={styles.newsHeader__stat}>
              <span className={styles.newsHeader__statValue}>
                {filteredCount}
              </span>
              <span className={styles.newsHeader__statLabel}>Показано</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default NewsHeader;
