// Массив с разными градиентными фонами
const backgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
];

function changeBackground() {
    const body = document.body;
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    
    // Плавное изменение фона
    body.style.transition = 'background 0.8s ease';
    body.style.background = backgrounds[randomIndex];
}

// Анимация появления логотипа при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    
    // Начальное состояние
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(-30px)';
    
    // Анимация появления
    setTimeout(() => {
        logo.style.transition = 'all 0.8s ease';
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
    }, 300);
    
    // Добавляем эффект пульсации при наведении на логотип
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});