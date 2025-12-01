const backgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%)'
];

// Русский алфавит
const alphabet = [
    { letter: 'А', sound: 'а' }, { letter: 'Б', sound: 'б' }, { letter: 'В', sound: 'в' },
    { letter: 'Г', sound: 'г' }, { letter: 'Д', sound: 'д' }, { letter: 'Е', sound: 'е' },
    { letter: 'Ё', sound: 'ё' }, { letter: 'Ж', sound: 'ж' }, { letter: 'З', sound: 'з' },
    { letter: 'И', sound: 'и' }, { letter: 'Й', sound: 'й' }, { letter: 'К', sound: 'к' },
    { letter: 'Л', sound: 'л' }, { letter: 'М', sound: 'м' }, { letter: 'Н', sound: 'н' },
    { letter: 'О', sound: 'о' }, { letter: 'П', sound: 'п' }, { letter: 'Р', sound: 'р' },
    { letter: 'С', sound: 'с' }, { letter: 'Т', sound: 'т' }, { letter: 'У', sound: 'у' },
    { letter: 'Ф', sound: 'ф' }, { letter: 'Х', sound: 'х' }, { letter: 'Ц', sound: 'ц' },
    { letter: 'Ч', sound: 'ч' }, { letter: 'Ш', sound: 'ш' }, { letter: 'Щ', sound: 'щ' },
    { letter: 'Ъ', sound: 'твёрдый знак' }, { letter: 'Ы', sound: 'ы' }, { letter: 'Ь', sound: 'мягкий знак' },
    { letter: 'Э', sound: 'э' }, { letter: 'Ю', sound: 'ю' }, { letter: 'Я', sound: 'я' }
];

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

function initMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех пунктов меню
            menuItems.forEach(i => i.classList.remove('active'));
            // Добавляем активный класс текущему пункту
            this.classList.add('active');
            
            // Скрываем все секции контента
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Показываем нужную секцию
            const contentId = this.getAttribute('data-content');
            document.getElementById(contentId).classList.add('active');
        });
    });
}

function initAlphabet() {
    const alphabetGrid = document.querySelector('.alphabet-grid');
    
    alphabet.forEach(item => {
        const letterCard = document.createElement('div');
        letterCard.className = 'letter-card';
        letterCard.innerHTML = `
            <div>${item.letter}</div>
            <small>${item.sound}</small>
        `;
        
        letterCard.addEventListener('click', () => {
            // В будущем можно добавить звук буквы
            alert(`Буква: ${item.letter}\nЗвук: ${item.sound}`);
        });
        
        alphabetGrid.appendChild(letterCard);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    
    // Анимация логотипа
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(-30px)';
    
    setTimeout(() => {
        logo.style.transition = 'all 0.8s ease';
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
    }, 300);
    
    // Инициализация меню
    initMenu();
    
    // Инициализация алфавита
    initAlphabet();
    
    // Эффекты при наведении
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});