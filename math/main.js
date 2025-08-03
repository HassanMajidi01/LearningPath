document.addEventListener('DOMContentLoaded', () => {
    const sidebarList = document.querySelector('#sidebar ul');
    const gameContainer = document.getElementById('game-container');
    const welcomeMessage = document.getElementById('welcome-message');

    // ساخت آیتم‌های سایدبار
    Object.keys(Topics).forEach(key => {
        const li = document.createElement('li');
        li.textContent = Topics[key];
        li.dataset.topic = key;
        sidebarList.appendChild(li);
    });

    // مدیریت کلیک روی مباحث
    sidebarList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const topic = e.target.dataset.topic;
            welcomeMessage.classList.add('hidden');
            gameContainer.classList.remove('hidden');
            loadGame(topic);
        }
    });

    function loadGame(topic) {
        const gamesForTopic = GameData[topic];
        if (!gamesForTopic || gamesForTopic.length === 0) {
            gameContainer.innerHTML = "<p>تمرینی برای این مبحث وجود ندارد.</p>";
            return;
        }

        // انتخاب یک بازی به صورت تصادفی
        const gameData = gamesForTopic[Math.floor(Math.random() * gamesForTopic.length)];

        // فراخوانی تابع بازی مربوطه
        if (gameData.type === 'counting-coloring') {
            startCountingColoringGame(gameData);
        } else if (gameData.type === 'drag-and-drop') {
            startDragAndDropGame(gameData);
        }
    }
});

// تابع برای خواندن متن سوال
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fa-IR'; // تنظیم زبان به فارسی
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("مرورگر شما از قابلیت خواندن متن پشتیبانی نمی‌کند.");
    }
}