document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('h1');
    
    title.addEventListener('click', function() {
        this.textContent = 'Кликнули!';
        this.style.color = '#e74c3c';
    });
    
    console.log('Скрипт работает');
});
