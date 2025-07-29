function initializeMemoryGame(container, words) {
    container.innerHTML = '<h2>بازی کارت حافظه</h2><div class="timer">زمان: <span id="time">0</span> ثانیه</div><div class="memory-game" id="memory-board"></div>';
    const memoryBoard = document.getElementById('memory-board');
    let flippedCards = [];
    let matchedPairs = 0;
    let timerInterval;
    let seconds = 0;

    // شروع تایمر
    const timeElement = document.getElementById('time');
    timerInterval = setInterval(() => {
        seconds++;
        timeElement.textContent = seconds;
    }, 1000);

    // بر زدن کلمات
    words.sort(() => 0.5 - Math.random());

    words.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.word = item.word;

        card.innerHTML = `
            <div class="front-face">${item.word}</div>
            <div class="back-face">?</div>
        `;
        
        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('flip')) {
                card.classList.add('flip');
                flippedCards.push(card);

                // پخش صدا
                const audio = new Audio(item.audio);
                audio.play();

                if (flippedCards.length === 2) {
                    checkForMatch();
                }
            }
        });
        memoryBoard.appendChild(card);
    });

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.word === card2.dataset.word) {
            // جفت درست
            card1.style.backgroundColor = '#2ecc71'; // سبز
            card2.style.backgroundColor = '#2ecc71';
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === words.length / 2) {
                clearInterval(timerInterval);
                setTimeout(() => alert(`عالی بود! شما در ${seconds} ثانیه بازی را تمام کردید.`), 500);
            }
        } else {
            // جفت اشتباه
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                flippedCards = [];
            }, 1000);
        }
    }
}