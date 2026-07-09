const SERVER_IP = 'reallyworld.ru'; 

// 1. Копирование IP
document.getElementById('ip-block').addEventListener('click', () => {
    const btn = document.getElementById('copy-button');
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Скопир34535643654овано!';
        setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Копировать IP'; }, 2000);
    });
});

// 2. Ультра-простой вывод онлайна без сложных проверок
function updateServerStatus() {
    const onlineText = document.getElementById('online-text');
    const statusDot = document.querySelector('.status-dot');

    fetch(`https://mcstatus.io{SERVER_IP}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.online && data.players) {
                statusDot.classList.add('online');
                onlineText.innerHTML = `В сети: <strong>${data.players.online}</strong> / ${data.players.max}`;
            } else {
                statusDot.classList.remove('online');
                onlineText.innerHTML = `<span style="color: #ff4d4d;">Сервер оффлайн</span>`;
            }
        })
        .catch(() => {
            // Если API упал или заблокирован, просто пишем понятный статус вместо системной ошибки
            statusDot.classList.remove('online');
            onlineText.innerHTML = `<span style="color: #ff4d4d;">Сервер оффлайн</span>`;
        });
}

updateServerStatus();
setInterval(updateServerStatus, 60000);
