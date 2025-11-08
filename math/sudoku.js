// sudoku-game.js

let sudokuGameData = null;
let currentSudokuBoard = [];
let correctSudokuBoard = [];
let currentSudokuSize = 0;

let draggedItem = null;

function initializeSudokuGame(container, data, size) {
    sudokuGameData = data;
    currentSudokuSize = size;

    container.innerHTML = `
        <div class="sudoku-game-container sudoku-size-${size}">
            <h2>تمرین سودوکو (${size}x${size})</h2>
            <p>یکی از اشیاء پایین را به خانه‌های خالی بکشید. برای حذف یک شیء از جدول، روی آن کلیک کنید.</p>
            <div class="sudoku-board-area">
                <div id="sudoku-board" class="sudoku-board"></div>
            </div>
            <div id="sudoku-item-palette" class="sudoku-item-palette"></div>
            <div class="sudoku-controls">
                <button id="sudoku-check-btn" class="sudoku-btn check-btn">بررسی</button>
                <button id="sudoku-reset-btn" class="sudoku-btn reset-btn">بازی جدید</button>
            </div>
            <div id="sudoku-feedback" class="sudoku-feedback"></div>
        </div>
    `;

    const boardElement = document.getElementById('sudoku-board');
    const paletteElement = document.getElementById('sudoku-item-palette');
    const checkButton = document.getElementById('sudoku-check-btn');
    const resetButton = document.getElementById('sudoku-reset-btn');

    generateNewSudokuBoard(boardElement, paletteElement, size);

    checkButton.addEventListener('click', () => checkSudokuSolution(size));
    resetButton.addEventListener('click', () => generateNewSudokuBoard(boardElement, paletteElement, size));

    if (typeof initializeTouchSupportForSudoku === 'function') {
        initializeTouchSupportForSudoku();
    }
}

function generateNewSudokuBoard(boardElement, paletteElement, size) {
    boardElement.innerHTML = '';
    paletteElement.innerHTML = '';
    const feedbackEl = document.getElementById('sudoku-feedback');
    if (feedbackEl) {
        feedbackEl.innerHTML = '';
        feedbackEl.classList.remove('success', 'error');
    }
    const checkBtn = document.getElementById('sudoku-check-btn');
    if (checkBtn) {
        checkBtn.disabled = false;
    }

    const cellSize = size === 3 ? 80 : 65;
    boardElement.style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
    boardElement.style.gridTemplateRows = `repeat(${size}, ${cellSize}px)`;


    const itemsForGame = sudokuGameData.items.slice(0, size);
    const itemNames = itemsForGame.map(item => item.name);

    correctSudokuBoard = generateSolvableSudoku(itemNames, size);
    currentSudokuBoard = JSON.parse(JSON.stringify(correctSudokuBoard));

    const cellsToHide = getRandomHiddenCells(size);

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;

            if (cellsToHide.some(pos => pos.row === r && pos.col === c)) {
                cell.classList.add('empty');
                currentSudokuBoard[r][c] = null;
                cell.addEventListener('dragover', handleDragOver);
                cell.addEventListener('drop', handleDrop);
                cell.addEventListener('click', handleCellClick);
            } else {
                const itemName = correctSudokuBoard[r][c];
                const item = itemsForGame.find(i => i.name === itemName);
                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.title;
                img.dataset.itemName = itemName;
                img.draggable = false;
                cell.appendChild(img);
                cell.classList.add('fixed');
            }
            boardElement.appendChild(cell);
        }
    }

    itemsForGame.forEach(itemData => {
        const draggable = document.createElement('img');
        draggable.src = itemData.image;
        draggable.alt = itemData.title;
        draggable.dataset.itemName = itemData.name;
        draggable.classList.add('draggable-item');
        draggable.draggable = true;
        draggable.addEventListener('dragstart', handleDragStart);
        paletteElement.appendChild(draggable);
    });
}

function handleCellClick(e) {
    const cell = e.currentTarget;
    if (cell.classList.contains('fixed') || !cell.querySelector('img')) {
        return;
    }
    cell.innerHTML = '';
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    currentSudokuBoard[row][col] = null;
    cell.classList.remove('incorrect');
}

function generateSolvableSudoku(items, size) {
    const board = Array(size).fill(null).map(() => Array(size).fill(null));

    function isValid(r, c, item) {
        for (let x = 0; x < size; x++) {
            if (board[r][x] === item) return false;
        }
        for (let x = 0; x < size; x++) {
            if (board[x][c] === item) return false;
        }
        return true;
    }

    function solve() {
        let emptyCell = findEmpty();
        if (!emptyCell) return true;

        let { row, col } = emptyCell;
        let shuffledItems = shuffleArray([...items]);

        for (let item of shuffledItems) {
            if (isValid(row, col, item)) {
                board[row][col] = item;
                if (solve()) {
                    return true;
                }
                board[row][col] = null;
            }
        }
        return false;
    }

    function findEmpty() {
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (board[r][c] === null) {
                    return { row: r, col: c };
                }
            }
        }
        return null;
    }

    solve();
    return board;
}

function getRandomHiddenCells(size) {
    const allCells = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            allCells.push({ row: r, col: c });
        }
    }
    shuffleArray(allCells);
    const cellsToHideCount = size === 3
        ? Math.floor(Math.random() * 3) + 3
        : Math.floor(Math.random() * 4) + 6;
    return allCells.slice(0, cellsToHideCount);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData('text/plain', e.target.dataset.itemName);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    const targetCell = e.target.closest('.sudoku-cell');
    if (!draggedItem || !targetCell || targetCell.classList.contains('fixed')) {
        return;
    }

    const droppedItemName = e.dataTransfer.getData('text/plain');
    const itemsForGame = sudokuGameData.items.slice(0, currentSudokuSize);
    const itemData = itemsForGame.find(item => item.name === droppedItemName);

    if (!itemData) return;

    targetCell.innerHTML = '';
    const imgToPlace = document.createElement('img');
    imgToPlace.src = itemData.image;
    imgToPlace.alt = itemData.title;
    imgToPlace.dataset.itemName = droppedItemName;
    imgToPlace.draggable = false;
    targetCell.appendChild(imgToPlace);

    const row = parseInt(targetCell.dataset.row);
    const col = parseInt(targetCell.dataset.col);
    currentSudokuBoard[row][col] = droppedItemName;

    targetCell.classList.remove('incorrect');
    draggedItem = null;
}

function checkSudokuSolution() {
    const feedbackElement = document.getElementById('sudoku-feedback');
    feedbackElement.innerHTML = '';
    feedbackElement.classList.remove('success', 'error');
    document.querySelectorAll('.sudoku-cell').forEach(cell => cell.classList.remove('incorrect'));

    let isComplete = true;
    for (let r = 0; r < currentSudokuSize; r++) {
        for (let c = 0; c < currentSudokuSize; c++) {
            if (currentSudokuBoard[r][c] === null) {
                isComplete = false;
                break;
            }
        }
        if (!isComplete) break;
    }
    
    if (!isComplete) {
        feedbackElement.innerHTML = 'لطفاً تمام خانه‌های خالی را پر کنید.';
        feedbackElement.classList.add('error');
        return;
    }

    let isCorrect = true;
    for (let r = 0; r < currentSudokuSize; r++) {
        for (let c = 0; c < currentSudokuSize; c++) {
            if (currentSudokuBoard[r][c] !== correctSudokuBoard[r][c]) {
                isCorrect = false;
                const cellElement = document.querySelector(`.sudoku-cell[data-row="${r}"][data-col="${c}"]`);
                if (cellElement) {
                    cellElement.classList.add('incorrect');
                }
            }
        }
    }

    if (isCorrect) {
        // ✨ بازخورد قدیمی با تابع جدید جایگزین شد ✨
        showSuccessAnimation();
        disableBoardForWin();
    } else {
        feedbackElement.innerHTML = 'پاسخ صحیح نیست. خانه‌های اشتباه مشخص شده‌اند.';
        feedbackElement.classList.add('error');
    }
}

// ✨ تابع جدید برای نمایش پیام موفقیت ✨
function showSuccessAnimation() {
    const successMessage = document.createElement('div');
    successMessage.className = 'feedback-message';
    successMessage.textContent = '🎉آفرین!🎉';
    document.body.appendChild(successMessage);
    
    // پاک کردن پیام از DOM پس از پایان انیمیشن
    setTimeout(() => {
        successMessage.remove();
    }, 2000); // زمان انیمیشن ۲ ثانیه است
}

function disableBoardForWin() {
    document.querySelectorAll('.sudoku-cell.empty').forEach(cell => {
        cell.removeEventListener('dragover', handleDragOver);
        cell.removeEventListener('drop', handleDrop);
        cell.removeEventListener('click', handleCellClick);
        cell.style.cursor = 'default';
    });
    const palette = document.getElementById('sudoku-item-palette');
    if (palette) {
        palette.innerHTML = '';
    }
    const checkBtn = document.getElementById('sudoku-check-btn');
    if(checkBtn) {
        checkBtn.disabled = true;
    }
}