// sudoku-game.js

let sudokuGameData = null;
let currentSudokuBoard = [];
let correctSudokuBoard = [];

let draggedItem = null; // Reference to the actual DOM element being dragged from the palette

function initializeSudokuGame(container, data) {
    sudokuGameData = data;
    container.innerHTML = `
        <div class="sudoku-game-container">
            <h2>تمرین سودوکو (۳x۳)</h2>
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

    generateNewSudokuBoard(boardElement, paletteElement);

    checkButton.addEventListener('click', checkSudokuSolution);
    resetButton.addEventListener('click', () => generateNewSudokuBoard(boardElement, paletteElement));
}

function generateNewSudokuBoard(boardElement, paletteElement) {
    // Clear previous board and palette
    boardElement.innerHTML = '';
    paletteElement.innerHTML = '';
    document.getElementById('sudoku-feedback').innerHTML = '';
    document.getElementById('sudoku-check-btn').disabled = false;

    const items = sudokuGameData.items;
    const itemNames = items.map(item => item.name);

    correctSudokuBoard = generateSolvableSudoku(itemNames);
    currentSudokuBoard = JSON.parse(JSON.stringify(correctSudokuBoard));

    const cellsToHide = getRandomHiddenCells(3, 3);

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            cell.dataset.row = r;
            cell.dataset.col = c;

            if (cellsToHide.some(pos => pos.row === r && pos.col === c)) {
                // This is an empty cell for the user to fill
                cell.classList.add('empty');
                currentSudokuBoard[r][c] = null;
                // Add event listeners for dropping and clicking
                cell.addEventListener('dragover', handleDragOver);
                cell.addEventListener('drop', handleDrop);
                cell.addEventListener('click', handleCellClick); // New click listener
            } else {
                // This is a pre-filled (fixed) cell
                const itemName = correctSudokuBoard[r][c];
                const item = items.find(i => i.name === itemName);
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

    // Create a static palette with one of each item
    items.forEach(itemData => {
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

/**
 * Handles clicks on cells to remove user-placed items.
 * @param {MouseEvent} e The click event.
 */
function handleCellClick(e) {
    const cell = e.currentTarget;

    // Do nothing if the cell is fixed or already empty
    if (cell.classList.contains('fixed') || !cell.querySelector('img')) {
        return;
    }

    // Clear the cell's content
    cell.innerHTML = '';

    // Update the board state
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    currentSudokuBoard[row][col] = null;

    // Clear any 'incorrect' styling from this cell
    cell.classList.remove('incorrect');
}


function generateSolvableSudoku(items) {
    const board = Array(3).fill(null).map(() => Array(3).fill(null));

    function isValid(r, c, item) {
        for (let x = 0; x < 3; x++) {
            if (board[r][x] === item) return false;
        }
        for (let x = 0; x < 3; x++) {
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
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
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


function getRandomHiddenCells(rows, cols) {
    const allCells = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            allCells.push({ row: r, col: c });
        }
    }
    shuffleArray(allCells);
    const numberOfCellsToHide = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
    return allCells.slice(0, numberOfCellsToHide);
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- Drag and Drop Event Handlers ---

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
    const itemData = sudokuGameData.items.find(item => item.name === droppedItemName);

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
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const cellElement = document.querySelector(`.sudoku-cell[data-row="${r}"][data-col="${c}"]`);
            if (!cellElement.classList.contains('fixed') && currentSudokuBoard[r][c] === null) {
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
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (currentSudokuBoard[r][c] !== correctSudokuBoard[r][c]) {
                isCorrect = false;
                highlightIncorrectCell(r, c);
            }
        }
    }

    if (isCorrect) {
        feedbackElement.innerHTML = 'تبریک! پاسخ شما صحیح است! ✨';
        feedbackElement.classList.add('success');
        disableBoardForWin();
    } else {
        feedbackElement.innerHTML = 'پاسخ صحیح نیست. خانه‌هایی که اشتباه هستند مشخص شده‌اند. دوباره تلاش کنید!';
        feedbackElement.classList.add('error');
    }
}

function highlightIncorrectCell(row, col) {
    const cellElement = document.querySelector(`.sudoku-cell[data-row="${row}"][data-col="${col}"]`);
    if (cellElement) {
        cellElement.classList.add('incorrect');
    }
}

function disableBoardForWin() {
    document.querySelectorAll('.sudoku-cell').forEach(cell => {
        cell.removeEventListener('dragover', handleDragOver);
        cell.removeEventListener('drop', handleDrop);
        cell.removeEventListener('click', handleCellClick);
        cell.classList.remove('empty');
        cell.style.cursor = 'default';
    });

    document.getElementById('sudoku-item-palette').innerHTML = '';
    document.getElementById('sudoku-check-btn').disabled = true;
}
function initializeSudokuGame(container, data) {
    sudokuGameData = data;
    container.innerHTML = `
        <div class="sudoku-game-container">
            <h2>تمرین سودوکو (۳x۳)</h2>
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

    generateNewSudokuBoard(boardElement, paletteElement);

    checkButton.addEventListener('click', checkSudokuSolution);
    resetButton.addEventListener('click', () => generateNewSudokuBoard(boardElement, paletteElement));

    initializeTouchSupportForSudoku(); // ✨ این خط را در انتهای تابع اضافه کنید ✨
}