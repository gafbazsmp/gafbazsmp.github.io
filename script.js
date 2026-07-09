// НАСТРОЙКА: Сюда пишем точный IP-адрес сервера
const SERVER_IP = 'reallyworld.ru'; 

// 1. Логика копирования IP-адреса
document.getElementById('ip-block').addEventListener('click', () => {
    const btn = document.getElementById('copy-button');

    navigator.clipboard.writeText(SERVER_IP).then(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Скопировано!';
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-regular fa-copy"></i> Копировать IP';
        }, 2000);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
});

// 2. Функция автоматического получения онлайна (адаптирована под api.mcstatus.io)
function updateServerStatus() {
    const onlineText = document.getElementById('online-text');
    const statusDot = document.querySelector('.status-dot');

    fetch(`https://mcstatus.io{SERVER_IP}`)
        .then(response => {
            if (!response.ok) throw new Error('Ошибка сети');
            return response.json();
        })
        .then(data => {
            // Проверяем, включен ли сервер
            if (data && data.online === true) {
                statusDot.classList.add('online');
                
                // Проверяем, отдал ли API данные по игрокам, чтобы избежать краша
                if (data.players && typeof data.players.online !== 'undefined') {
                    onlineText.innerHTML = `В сети: <strong>${data.players.online}</strong> / ${data.players.max}`;
                } else {
                    onlineText.innerHTML = `В сети: <strong>Сервер включен</strong>`;
                }
            } else {
                statusDot.classList.remove('online');
                onlineText.innerHTML = `<span style="color: #ff4d4d;">Сервер временно оффлайн</span>`;
            }
        })
        .catch(err => {
            console.error('Ошибка получения данных с API:', err);
            statusDot.classList.remove('online');
            onlineText.innerText = 'Не удалось загрузить статус';
        });
}

// Запуск при загрузке
updateServerStatus();
// Обновление раз в минуту
setInterval(updateServerStatus, 60000);
