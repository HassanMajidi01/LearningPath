function startDragAndDropGame(data) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <div class="question-text">
            <img src="assets/images/speaker.svg" class="speaker-icon" onclick="speak('${data.question}')" alt="Play Sound">
            <span>${data.question}</span>
        </div>
        <div class="drag-area">
            <img src="${data.image}" class="source-item" draggable="true" id="source-item">
            <div class="drop-box" id="drop-box"></div>
        </div>
        <button id="check-answer-btn">بررسی</button>
    `;
    
    // بلافاصله پس از بارگذاری سوال، آن را بخوان
    speak(data.question);

    const sourceItem = document.getElementById('source-item');
    const dropBox = document.getElementById('drop-box');

    sourceItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });

    dropBox.addEventListener('dragover', (e) => {
        e.preventDefault(); // اجازه دراپ شدن را می‌دهد
    });

    dropBox.addEventListener('drop', (e) => {
        e.preventDefault();
        const newClone = sourceItem.cloneNode();
        newClone.classList.remove('source-item');
        newClone.classList.add('dropped-item');
        newClone.draggable = false;
        newClone.id = ''; // ID را حذف کن تا تکراری نباشد

        // اضافه کردن قابلیت حذف با کلیک
        newClone.addEventListener('click', (event) => {
            event.target.remove();
        });

        dropBox.appendChild(newClone);
    });

    document.getElementById('check-answer-btn').addEventListener('click', () => {
        const droppedItemsCount = dropBox.children.length;
        if (droppedItemsCount === data.answer) {
            alert('عالیه! درست انجام دادی!');
            // loadGame('counting');
        } else {
            alert('دقت کن! دوباره بشمار و امتحان کن.');
        }
    });
}