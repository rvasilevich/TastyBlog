document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 Script loaded'); // ← ДЛЯ ОТЛАДКИ

  // ✅ БУРГЕР МЕНЮ
  const burger = document.querySelector('.header__burger');
  const mobileNav = document.querySelector('.header__mobile-nav');

  console.log('Burger:', burger); // ← ПРОВЕРКА
  console.log('MobileNav:', mobileNav); // ← ПРОВЕРКА

  if (burger && mobileNav) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      console.log('🍔 Burger clicked'); // ← ДЛЯ ОТЛАДКИ

      burger.classList.toggle('active');
      mobileNav.classList.toggle('active');

      const isActive = burger.classList.contains('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Закрытие по клику на ссылки
    document.querySelectorAll('.header__mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Закрытие по клику вне меню
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
});
