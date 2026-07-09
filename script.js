// НАСТРОЙКА: Сюда пишем точный IP-адрес сервера
const SERVER_IP = 'mc.hypixel.net'; 

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

// 2. Функция автоматического получения онлайна
function updateServerStatus() {
    const onlineText = document.getElementById('online-text');
    const statusDot = document.querySelector('.status-dot');

    fetch(`https://mcsrvstat.us{SERVER_IP}`)
        .then(response => response.json())
        .then(data => {
            if (data.online) {
                statusDot.classList.add('online');
                onlineText.innerHTML = `В сети: <strong>${data.players.online}</strong> / ${data.players.max}`;
            } else {
                statusDot.classList.remove('online');
                onlineText.innerHTML = `<span style="color: #ff4d4d;">Сервер временно оффлайн</span>`;
            }
        })
        .catch(err => {
            console.error('Ошибка получения данных с API:', err);
            onlineText.innerText = 'Не удалось загрузить статус';
        });
}

updateServerStatus();
setInterval(updateServerStatus, 60000);
