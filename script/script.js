function changeText() {
    const greeting = document.getElementById('greeting');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const messages = [
        'Привет, мир!',
        'Hello, World!',
        'Hola, Mundo!',
        'Bonjour, Monde!',
        'Hallo, Welt!'
    ];
    
    // Меняем текст
    const randomIndex = Math.floor(Math.random() * messages.length);
    greeting.textContent = messages[randomIndex];
    
    // Меняем цвет
    greeting.style.color = colors[randomIndex];
    
    // Добавляем анимацию
    greeting.style.transform = 'scale(1.1)';
    setTimeout(() => {
        greeting.style.transform = 'scale(1)';
    }, 300);
}

// Дополнительная анимация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const greeting = document.getElementById('greeting');
    greeting.style.opacity = '0';
    greeting.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        greeting.style.transition = 'all 0.5s ease';
        greeting.style.opacity = '1';
        greeting.style.transform = 'translateY(0)';
    }, 100);
});