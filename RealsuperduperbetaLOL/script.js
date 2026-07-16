const SERVER_IP = 'reallyworld.ru'; 

document.getElementById('ip-block').addEventListener('click', () => {
    const btn = document.getElementById('copy-button');
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Скопировано! ';
        setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Копировать IP'; }, 2000);
    });
});

function updateServerStatus() {
    const onlineText = document.getElementById('online-text');
    const statusDot = document.querySelector('.status-dot');

    fetch(`https://mcstatus.io/status/java/{SERVER_IP}`)
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
            statusDot.classList.remove('online');
            onlineText.innerHTML = `<span style="color: #ff4d4d;">Сервер оффлайн или проблемы с сайтом</span>`;
        });
}

updateServerStatus();
setInterval(updateServerStatus, 60000);
