// Массив фонов для смены
const backgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%)'
];

// Функция смены фона
function changeBackground() {
    const body = document.body;
    const currentBg = body.style.background;
    let newBg;
    
    // Выбираем случайный фон, отличный от текущего
    do {
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        newBg = backgrounds[randomIndex];
    } while (newBg === currentBg && backgrounds.length > 1);
    
    body.style.transition = 'background 0.8s ease';
    body.style.background = newBg;
}

// Функция переключения темы
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Функция инициализации меню
function initMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех пунктов
            menuItems.forEach(i => i.classList.remove('active'));
            // Добавляем активный класс текущему
            this.classList.add('active');
            
            // Скрываем все разделы
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Показываем нужный раздел
            const contentId = this.getAttribute('data-content');
            document.getElementById(contentId).classList.add('active');
        });
    });
}

// Когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    // Настройка кнопки смены темы
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Настройка кнопки смены фона
    document.getElementById('changeBgBtn').addEventListener('click', changeBackground);
    
    // Инициализация меню
    initMenu();
    
    // Анимация логотипа
    const logo = document.querySelector('.logo');
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        logo.style.transition = 'all 0.6s ease';
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
    }, 300);
});