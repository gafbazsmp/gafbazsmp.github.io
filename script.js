document.getElementById('ip-block').addEventListener('click', () => {
    const ipText = document.getElementById('server-ip').innerText;
    const btn = document.getElementById('copy-button');

    navigator.clipboard.writeText(ipText).then(() => {
        // Меняем текст кнопки при успешном копировании
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Скопировано!';
        
        // Через 2 секунды возвращаем исходный текст кнопки
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-regular fa-copy"></i> Копировать IP';
        }, 2000);
    }).catch(err => {
        console.error('Ошибка при копировании текста: ', err);
    });
});
