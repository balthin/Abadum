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

// Функция инициализации подменю
function initSubmenu() {
    // Клик на "Звуки" — только открывает/закрывает подменю
    document.querySelectorAll('.has-submenu > .menu-item').forEach(item => {
        item.addEventListener('click', function (e) {
            // Если кликнули не по подпункту
            if (!e.target.closest('.submenu-item')) {
                e.preventDefault();

                // Закрываем другие открытые подменю
                document.querySelectorAll('.has-submenu').forEach(submenu => {
                    if (submenu !== this.parentElement) {
                        submenu.classList.remove('active');
                    }
                });

                // Открываем/закрываем текущее подменю
                this.parentElement.classList.toggle('active');
            }
        });
    });

    // Клик на подпункты
    document.querySelectorAll('.submenu-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Убираем активный класс у всех пунктов меню
            document.querySelectorAll('.menu-item').forEach(menuItem => {
                menuItem.classList.remove('active');
            });

            // Добавляем активный класс текущему подпункту
            this.classList.add('active');

            // Закрываем все разделы
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });

            // Показать нужный раздел
            const contentId = this.getAttribute('data-content');
            document.getElementById(contentId).classList.add('active');

            // Если открыли главную - загружаем changelog
            if (contentId === 'home') {
                loadChangelog();
            }
        });
    });
}

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

// Функция загрузки данных.
async function loadData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка при загрузке данных: ${response.status} ${response.statusText}`)
    }

    const data = await response.json();

    if (!data) {
        throw new Error(`Ошибка при загрузке данных: ${response.status} ${response.statusText}`)
    }

    return data;
}

// Функция прорисовки данных мифологии.
async function renderMithology() {
    const mithologyContainer = document.getElementById('mythology');
    if (!mithologyContainer) return;

    const data = await loadData('bd/mythology.json');

    let mithologyHTML = `<div>Название - ${data.name}, описание - ${data.about}, создатель - ${data.creators[0]}</div>`;

    for(let chapter of data.chapters) {
        mithologyHTML += `
            <div>
                <h3>${chapter.name}</h3>
                <p>${chapter.content}</p>
            </div>
        `;
    }

    mithologyContainer.innerHTML = mithologyHTML;
}

// Функция инициализации основного меню
function initMenu() {
    const menuItems = document.querySelectorAll('.menu-item:not(.has-submenu > .menu-item)');
    const contentSections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        // Пропускаем элементы с подменю
        if (item.closest('.has-submenu')) return;

        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Убираем активный класс у всех пунктов меню (кроме подпунктов)
            document.querySelectorAll('.menu-item').forEach(menuItem => {
                menuItem.classList.remove('active');
            });

            // Добавляем активный класс текущему
            this.classList.add('active');

            // Закрываем все подменю
            document.querySelectorAll('.has-submenu').forEach(submenu => {
                submenu.classList.remove('active');
            });

            // Скрываем все разделы
            contentSections.forEach(section => section.classList.remove('active'));

            // Показываем нужный раздел
            const contentId = this.getAttribute('data-content');
            const targetSection = document.getElementById(contentId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Если открыли главную - загружаем changelog
            if (contentId === 'home') {
                loadChangelog();
            }
        });
    });
}

// Закрытие подменю при клике вне его
function initOutsideClick() {
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.has-submenu')) {
            document.querySelectorAll('.has-submenu').forEach(submenu => {
                submenu.classList.remove('active');
            });
        }
    });
}

// Когда страница загрузится
document.addEventListener('DOMContentLoaded', function () {
    // Настройка кнопки смены темы
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Настройка кнопки смены фона
    const changeBgBtn = document.getElementById('changeBgBtn');
    if (changeBgBtn) {
        changeBgBtn.addEventListener('click', changeBackground);
    }

    // Инициализация меню
    initMenu();
    initSubmenu();
    initOutsideClick();

    // Анимация логотипа
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            logo.style.transition = 'all 0.6s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 300);
    }

    // Загружаем changelog если открыта главная
    const homeSection = document.querySelector('#home');
    if (homeSection && homeSection.classList.contains('active')) {
        loadChangelog();
    }
});

document.querySelectorAll('.sound-tile').forEach(tile => {
    tile.addEventListener('click', function () {
        const sound = this.getAttribute('data-sound');
        const audio = new Audio(`sounds/${sound}.mp3`);
        audio.play().catch(e => {
            console.error(`Ошибка воспроизведения звука: ${sound}`, e);
            alert("Не удалось воспроизвести звук. Проверьте, разрешён ли автоплеер в браузере.");
        });
    });
});