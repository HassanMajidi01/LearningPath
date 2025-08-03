function startCountingColoringGame(data) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <div class="question-text">
            <img src="assets/images/speaker.svg" class="speaker-icon" onclick="speak('${data.question}')" alt="Play Sound">
            <span>${data.question}</span>
        </div>
        <img src="${data.image}" class="game-image" alt="تصویر شمارش">
        <table class="coloring-table">
            <tr>
                <td></td><td></td><td></td><td></td><td></td>
            </tr>
        </table>
        <button id="check-answer-btn">بررسی</button>
    `;

    // بلافاصله پس از بارگذاری سوال، آن را بخوان
    speak(data.question);

    const cells = gameContainer.querySelectorAll('.coloring-table td');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.classList.toggle('colored');
        });
    });

    document.getElementById('check-answer-btn').addEventListener('click', () => {
        const coloredCells = document.querySelectorAll('.coloring-table .colored').length;
        if (coloredCells === data.answer) {
            alert('آفرین! درست بود!');
            // اینجا می‌توانید به سوال بعدی بروید
            // loadGame('counting');
        } else {
            alert('دوباره تلاش کن!');
        }
    });
}