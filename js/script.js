document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 Script loaded');

  // валидация email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return regex.test(email);
  };

  const showError = (element, message) => {
    element.style.borderColor = 'red';

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;

    Object.assign(errorElement.style, {
      color: '#d32f2f',
      backgroundColor: '#ffebee',
      border: '1px solid #ef9a9a',
      borderRadius: '6px',
      padding: '8px 12px',
      fontSize: '0.9rem',
      marginTop: '4px',
      display: 'block',
    });

    element.parentNode.appendChild(errorElement);
  };

  const clearErrors = (element) => {
    element.style.borderColor = '';
    const errorElement = element.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  };

  // ✅ БУРГЕР МЕНЮ
  const burger = document.querySelector('.header__burger');
  const mobileNav = document.querySelector('.header__mobile-nav');

  console.log('Burger:', burger);
  console.log('MobileNav:', mobileNav);

  if (burger && mobileNav) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      console.log('🍔 Burger clicked');
      burger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      const isActive = burger.classList.contains('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    document.querySelectorAll('.header__mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', function (e) {
      if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
        burger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  } else {
    console.error('❌ Burger или MobileNav не найдены!');
  }

  // 🔍 ОСНОВЫ РАБОТЫ С DOM
  console.log('🔍 === ОСНОВЫ DOM ===');
  const header = document.querySelector('.header');
  const allArticles = document.querySelectorAll('.article');
  const mainContainer = document.getElementById('main');
  const newsGrid = document.querySelector('.news-grid');
  const sidebar = document.querySelector('.sidebar');
  const heroTitle = document.querySelector('.hero__title');
  const newsCards = document.querySelectorAll('.news-grid__item');

  console.log('Header:', header);
  console.log('Все статьи (.article):', allArticles.length, 'шт.');
  console.log('Main container:', mainContainer);
  console.log('Дополнительно найдено:', { newsGrid, sidebar, heroTitle });
  console.log('Новостные карточки:', newsCards.length, 'шт.');

  if (heroTitle) {
    heroTitle.textContent = '🔥 ТОП НОВОСТЬ: ' + heroTitle.textContent;
    console.log('✅ Заголовок изменен!');
  }

  //  МАНИПУЛЯЦИЯ КОНТЕНТОМ
  console.log('🖌️ === МАНИПУЛЯЦИЯ КОНТЕНТОМ ===');
  const logoH1 = document.querySelector('.header__logo h1');
  if (logoH1) {
    logoH1.textContent = 'NewsHub 🚀';
    console.log('✅ Логотип изменен');
  }

  const newsGridList = document.querySelector('.news-grid__list');
  if (newsGridList) {
    newsGridList.innerHTML += `
    <article class="news-grid__item article card" style="position:relative; background: linear-gradient(135deg, #007bff, #4dabf7); color: white; padding: 20px; border-radius: 12px;">
      <button class="card_button" style="position:absolute; top:10px; right:10px; background:red; color:white; border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; font-size:12px; font-weight:bold;">×</button>
      <h3>🆕 JavaScript Lab 5 - Работает!</h3>
      <p>Манипуляция DOM выполнена успешно!</p>
      <time datetime="2026-03-23">23 марта 2026</time>
    </article>
  `;
    console.log('✅ Добавлена статья с кнопкой удаления');
  }

  const newButton = document.createElement('button');
  newButton.className = 'btn btn--primary';
  newButton.textContent = '🔔 Лабораторная завершена';
  newButton.style.cssText =
    'margin: 10px; padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: bold;';

  const sidebarSection = document.querySelector('.sidebar__section');
  if (sidebarSection) {
    sidebarSection.appendChild(newButton);
    console.log('✅ Новая кнопка добавлена');
  }

  const firstNewsImage = document.querySelector('.news-grid__figure img');
  if (firstNewsImage) {
    firstNewsImage.setAttribute('loading', 'eager');
    firstNewsImage.setAttribute('title', 'Первая новость');
    console.log('✅ Атрибуты изображения изменены');
  }

  //  КЛАССЫ И СТИЛИ
  console.log('🎨 === РАБОТА С КЛАССАМИ И СТИЛЯМИ ===');
  const firstCard = document.querySelector('.news-grid__item');
  console.log('Первая карточка для стилизации:', firstCard);

  if (firstCard) {
    firstCard.classList.add('card--highlighted');
    firstCard.classList.remove('card--default');
    console.log('✅ Классы добавлены/удалены:', firstCard.className);

    firstCard.style.transform = 'scale(1.05)';
    firstCard.style.transition = 'all 0.3s ease';
    console.log('✅ Inline стили применены');

    Object.assign(firstCard.style, {
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    });
    console.log('✅ Множественные стили применены');

    newsCards.forEach((card, index) => {
      card.addEventListener('mouseenter', function () {
        this.classList.add('card--hover');
        this.style.transform = 'scale(1.02) translateY(-5px)';
      });
      card.addEventListener('mouseleave', function () {
        this.classList.remove('card--hover');
        this.style.transform = 'scale(1)';
      });
      console.log(`✅ Hover эффект для карточки ${index + 1}`);
    });
  }

  //  ОБРАБОТКА СОБЫТИЙ - ЧАСТЬ 3
  console.log('🖱️ === ОБРАБОТКА СОБЫТИЙ ===');

  // 1. КНОПКА (расширенная)
  if (newButton) {
    newButton.addEventListener('click', function (event) {
      event.preventDefault();
      console.log('🔔 Кнопка нажата!');
      const originalText = this.textContent;
      this.textContent = '✅ Завершено!';
      this.classList.add('btn--success', 'btn--clicked');
      setTimeout(() => {
        this.textContent = originalText;
        this.classList.remove('btn--success', 'btn--clicked');
      }, 2000);
    });
    console.log('✅ Кнопка улучшена');
  }

  // 2. ПОИСК
  const heroSection = document.querySelector('.hero');
  if (heroSection && !document.querySelector('.search-input')) {
    const searchInput = document.createElement('input');
    searchInput.className = 'search-input';
    searchInput.placeholder = '🔍 Поиск...';
    searchInput.style.cssText =
      'margin:1rem 0;padding:1rem;border:2px solid #e9ecef;border-radius:25px;width:100%;max-width:400px;font-size:1rem;';
    heroSection.appendChild(searchInput);

    searchInput.addEventListener('input', function (event) {
      console.log('🔍 Ввод:', event.target.value);
      const query = event.target.value.toLowerCase();
      newsCards.forEach((card) => {
        card.classList.toggle(
          'card--found',
          card.textContent.toLowerCase().includes(query)
        );
      });
    });
    console.log('✅ Поиск добавлен');
  }

  // 3. ФОРМА
  const sidebarContent = document.querySelector('.sidebar__content');
  if (sidebarContent && !document.querySelector('.contact-form')) {
    const form = document.createElement('form');
    form.className = 'contact-form';
    form.innerHTML = `
    <h3 style="margin-bottom:1rem;color:#007bff;">📧 Подписка</h3>
    <input type="email" name="email" id="email" placeholder="your@email.com" required 
      style="width:100%;padding:1rem;margin-bottom:1rem;border:1px solid #e9ecef;border-radius:8px;">
    <button type="submit" class="btn btn--primary" style="width:100%;">Подписаться</button>
  `;
    sidebarContent.appendChild(form);

    // ВАЛИДАЦИЯ СРАЗУ ПОСЛЕ ЭТОГО
    const emailInput = form.querySelector('#email');

    // при выходе из поля
    emailInput.addEventListener('blur', function () {
      clearErrors(this);
      if (!validateEmail(this.value)) {
        showError(this, 'Введите корректный email');
      }
    });

    // при отправке формы
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearErrors(emailInput);

      const email = emailInput.value.trim();
      if (!validateEmail(email)) {
        showError(emailInput, 'Введите корректный email');
        return;
      }

      console.log('📤 Форма отправлена! Email:', email);
      const btn = this.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = '✅ Отправлено!';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        this.reset();
      }, 2000);
    });

    console.log('✅ Форма подписки добавлена и валидирована');
  }

  // 4. КЛИКИ ПО КАРТОЧКАМ — ДЕЛЕГИРУЕМ НА news-grid__list
  const list = document.querySelector('.news-grid__list');
  if (list) {
    list.addEventListener('click', function (event) {
      console.log('🖱 1. EVENT В NEWS-LIST:', event.target);

      // Клик по крестику
      const button = event.target.classList.contains('card_button')
        ? event.target
        : event.target.closest('.card_button');

      if (button) {
        console.log('✅ 2. Клик по кнопке крестика:', button);

        const card = button.closest('.news-grid__item');
        if (card) {
          console.log('🗑️ 3. Найдена карточка:', card);

          card.style.display = 'none'; // карточка исчезает
          console.log('🎭 Карточка скрыта!');

          event.stopPropagation();
          event.stopImmediatePropagation();
          return;
        }
      }

      // Лайк
      const likeBtn = event.target.closest('.like-btn');
      if (likeBtn) {
        const card = likeBtn.closest('.news-grid__item');
        const newsId = likeBtn.dataset.newsId;
        if (card && newsId) {
          console.log('❤️ Лайк по карточке ID:', newsId);
          // toggleLike(newsId, likeBtn); // раскомментируй, если нужен лайк
        }
        return;
      }

      // Клик по карточке (без крестика и без лайка)
      const card = event.target.closest('.news-grid__item');
      if (card) {
        console.log('📰 Карточка кликнута!');
        card.classList.add('card--clicked');
        setTimeout(() => card.classList.remove('card--clicked'), 500);

        // modalShow — функция уже объявлена внутри initModal,
        // поэтому НЕ ВЫЗЫВАЕМ showModal(card) здесь
      }
    });
    console.log('✅ Клики по карточкам / удаление настроены');
  }

  //  === ЛАЙКИ ДЛЯ НОВОСТЕЙ С LOCALSTORAGE ===
  console.log('❤️ === ЛАЙКИ ДЛЯ НОВОСТЕЙ ===');

  function initLikes() {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    // Добавляем кнопки лайков ко всем существующим карточкам
    document.querySelectorAll('.news-grid__item').forEach((card, index) => {
      if (!card.querySelector('.like-btn')) {
        addLikeButton(card, index + 1);
      }
    });

    // Загружаем состояние лайков из localStorage
    loadLikesState();
  }

  function addLikeButton(card, newsId) {
    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.innerHTML = `
    <span class="like-icon">❤️</span>
    <span class="like-count">0</span>
  `;
    likeBtn.dataset.newsId = newsId;
    card.appendChild(likeBtn);

    // Применяем стили для позиционирования
    card.style.position = 'relative';
  }

  function toggleLike(newsId, likeBtn) {
    const countEl = likeBtn.querySelector('.like-count');
    const iconEl = likeBtn.querySelector('.like-icon');
    let count = parseInt(countEl.textContent) || 0;

    const isLiked = likeBtn.classList.contains('liked');

    if (isLiked) {
      // Убираем лайк
      count = Math.max(0, count - 1);
      likeBtn.classList.remove('liked');
      likeBtn.closest('.news-grid__item').classList.remove('card--liked');
      iconEl.textContent = '🤍';
    } else {
      // Ставим лайк
      count++;
      likeBtn.classList.add('liked');
      likeBtn.closest('.news-grid__item').classList.add('card--liked');
      iconEl.textContent = '❤️';
    }

    countEl.textContent = count;

    // Сохраняем в localStorage
    localStorage.setItem(`like_${newsId}`, !isLiked);
    localStorage.setItem(`count_${newsId}`, count);

    console.log(`❤️ Новость ${newsId}: лайков = ${count}`);
  }

  function loadLikesState() {
    document.querySelectorAll('.like-btn').forEach((likeBtn) => {
      const newsId = likeBtn.dataset.newsId;
      const isLiked = localStorage.getItem(`like_${newsId}`) === 'true';
      const savedCount = parseInt(localStorage.getItem(`count_${newsId}`)) || 0;

      const countEl = likeBtn.querySelector('.like-count');
      const iconEl = likeBtn.querySelector('.like-icon');

      countEl.textContent = savedCount;

      if (isLiked) {
        likeBtn.classList.add('liked');
        likeBtn.closest('.news-grid__item').classList.add('card--liked');
        iconEl.textContent = '❤️';
      } else {
        iconEl.textContent = '🤍';
      }
    });
  }

  //  ИНИЦИАЛИЗАЦИЯ ЛАЙКОВ при динамическом добавлении карточек
  function initDynamicLikes() {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    newsGrid.addEventListener('click', function (event) {
      const likeBtn = event.target.closest('.like-btn');
      if (likeBtn) {
        event.stopPropagation();
        const newsId = likeBtn.dataset.newsId;
        toggleLike(newsId, likeBtn);
      }
    });

    // Для новых карточек (динамически добавленных)
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (
            node.nodeType === 1 &&
            node.classList.contains('news-grid__item')
          ) {
            const newsId = Date.now().toString().slice(-4);
            setTimeout(() => addLikeButton(node, newsId), 100);
          }
        });
      });
    });

    observer.observe(newsGrid, { childList: true, subtree: true });
    console.log('✅ Лайки для динамических карточек настроены');
  }

  //  === МОДАЛЬНОЕ ОКНО ДЛЯ НОВОСТЕЙ ===
  function initModal() {
    const list = document.querySelector('.news-grid__list');
    const overlay = document.getElementById('newsModalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalMeta = document.getElementById('modalMeta');
    const modalContent = document.getElementById('modalContent');
    const closeBtns = document.querySelectorAll('[data-modal-close]');

    if (!list || !overlay) {
      console.warn('❌ Нет .news-grid__list или модального окна');
      return;
    }

    function showModal(card) {
      const title =
        card.querySelector('.article__title')?.textContent.trim() ||
        'Без заголовка';
      const meta = card.querySelector('.article__meta')?.cloneNode(true);
      const content = card
        .querySelector('.article__content, p')
        ?.cloneNode(true);

      modalTitle.textContent = title;
      modalMeta.innerHTML = '';
      if (meta) modalMeta.appendChild(meta);
      modalContent.innerHTML = '';
      if (content) modalContent.appendChild(content);

      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function hideModal() {
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    list.addEventListener('click', function (event) {
      console.log('🖱 4. Клик по news-grid__list:', event.target);

      const likeBtn = event.target.closest('.like-btn');
      const card = event.target.closest('.news-grid__item');

      if (likeBtn) {
        // клик по лайку — не открываем модальное окно
        return;
      }

      if (!card) return;

      event.preventDefault();
      event.stopPropagation();
      card.classList.add('card--clicked');
      setTimeout(() => card.classList.remove('card--clicked'), 300);
      showModal(card);
    });

    closeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideModal();
      });
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) hideModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('show')) {
        hideModal();
      }
    });

    console.log('✅ Модальное окно настроено');
  }
  // 🚀 ЗАПУСК ЛАЙКОВ
  initLikes();
  initDynamicLikes();
  initModal();
  console.log('❤️ === ЛАЙКИ ГОТОВЫ! ===');

  console.log('🎉 === ЛАБОРАТОРНАЯ 5 + СОБЫТИЯ ЗАВЕРШЕНА ===');
});
