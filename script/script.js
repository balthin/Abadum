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

// Функция загрузки истории коммитов с GitHub
// Функция загрузки истории коммитов с GitHub
async function loadChangelog() {
    const changelogContainer = document.querySelector('.changelog');
    if (!changelogContainer) return;
    
    try {
        // Показываем сообщение о загрузке
        changelogContainer.innerHTML = '<div class="loading">Загружаем историю изменений...</div>';
        
        // Используем GitHub API (публичный репозиторий)
        const response = await fetch('https://api.github.com/repos/balthin/Abadum/commits?per_page=10', {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const commits = await response.json();
        
        if (!commits || commits.length === 0) {
            changelogContainer.innerHTML = '<div class="changelog-item">Нет данных об изменениях</div>';
            return;
        }
        
        let changelogHTML = '';
        
        commits.forEach(commit => {
            const date = new Date(commit.commit.author.date);
            const formattedDate = date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Обрезаем хэш коммита
            const shortHash = commit.sha ? commit.sha.substring(0, 7) : 'unknown';
            
            changelogHTML += `
                <div class="changelog-item">
                    <div class="commit-header">
                        <span class="commit-hash">${shortHash}</span>
                        <span class="commit-date">${formattedDate}</span>
                        <span class="commit-author">${commit.commit.author ? commit.commit.author.name : 'Unknown'}</span>
                    </div>
                    <p class="commit-message">${commit.commit.message || 'No message'}</p>
                </div>
            `;
        });
        
        changelogContainer.innerHTML = changelogHTML;
        
    } catch (error) {
        console.error('Ошибка загрузки changelog:', error);
        changelogContainer.innerHTML = `
            <div class="changelog-item">
                <p>Не удалось загрузить историю изменений</p>
                <p><small>Ошибка: ${error.message}</small></p>
                <p>Проверь консоль браузера (F12) для деталей</p>
            </div>
        `;
    }
}

// Обновляем функцию initMenu для поддержки новой вкладки
function initMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            contentSections.forEach(section => section.classList.remove('active'));
            
            const contentId = this.getAttribute('data-content');
            document.getElementById(contentId).classList.add('active');
            
            // Если открыли главную - загружаем changelog
            if (contentId === 'home') {
                loadChangelog();
            }
        });
    });
}

// В конце функции DOMContentLoaded добавляем:
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    
    // Загружаем changelog если открыта главная
    if (document.querySelector('#home').classList.contains('active')) {
        loadChangelog();
    }
});