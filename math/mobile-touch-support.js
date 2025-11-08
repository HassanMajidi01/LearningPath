// touch-support.js

function initializeTouchSupportForSudoku() {
    const palette = document.getElementById('sudoku-item-palette');
    const board = document.getElementById('sudoku-board');

    if (!palette || !board) {
        console.error("Sudoku palette or board not found for touch support.");
        return;
    }

    let touchDraggedItem = null;
    let ghostElement = null;
    let lastTouchTarget = null;

    // Listen for touch start on items in the palette
    palette.addEventListener('touchstart', (e) => {
        // Ensure we're dragging a draggable item
        const target = e.target.closest('.draggable-item');
        if (!target) return;

        touchDraggedItem = target;

        // Create a "ghost" element to follow the finger
        ghostElement = target.cloneNode(true);
        ghostElement.style.position = 'absolute';
        ghostElement.style.zIndex = '1000';
        ghostElement.style.opacity = '0.8';
        ghostElement.style.pointerEvents = 'none'; // So it doesn't interfere with finding elements underneath
        ghostElement.style.width = `${target.offsetWidth}px`;
        ghostElement.style.height = `${target.offsetHeight}px`;
        document.body.appendChild(ghostElement);

        // Position the ghost element under the finger
        const touch = e.touches[0];
        ghostElement.style.left = `${touch.clientX - ghostElement.offsetWidth / 2}px`;
        ghostElement.style.top = `${touch.clientY - ghostElement.offsetHeight / 2}px`;

    }, { passive: true }); // Use passive for better scroll performance initially

    // Listen for finger movement on the whole screen
    document.addEventListener('touchmove', (e) => {
        if (!touchDraggedItem || !ghostElement) return;

        // We are actively dragging, so prevent screen scrolling
        e.preventDefault();

        const touch = e.touches[0];

        // Move the ghost element with the finger
        ghostElement.style.left = `${touch.clientX - ghostElement.offsetWidth / 2}px`;
        ghostElement.style.top = `${touch.clientY - ghostElement.offsetHeight / 2}px`;

        // Find what element is under the finger
        const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
        const currentDropTarget = elementUnderFinger ? elementUnderFinger.closest('.sudoku-cell.empty') : null;

        // Remove highlight from the last target if it's different from the current one
        if (lastTouchTarget && lastTouchTarget !== currentDropTarget) {
            lastTouchTarget.style.border = ''; // Reset border style
        }
        
        // Highlight the new potential drop target
        if (currentDropTarget) {
            currentDropTarget.style.border = '2px dashed #5a87fc'; // Highlight droppable area
            lastTouchTarget = currentDropTarget;
        } else {
            lastTouchTarget = null;
        }

    }, { passive: false }); // Needs to be active to prevent default scrolling

    // Listen for when the finger is lifted
    document.addEventListener('touchend', (e) => {
        if (!touchDraggedItem || !ghostElement) return;

        // Find the final drop target
        const touch = e.changedTouches[0];
        const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropTargetCell = elementUnderFinger ? elementUnderFinger.closest('.sudoku-cell.empty') : null;

        if (dropTargetCell) {
            // This is a valid drop! Manually trigger the drop logic.
            const itemName = touchDraggedItem.dataset.itemName;
            const itemData = sudokuGameData.items.find(item => item.name === itemName);
            
            dropTargetCell.innerHTML = ''; // Clear previous content

            const imgToPlace = document.createElement('img');
            imgToPlace.src = itemData.image;
            imgToPlace.alt = itemData.title;
            imgToPlace.dataset.itemName = itemName;
            imgToPlace.draggable = false;
            dropTargetCell.appendChild(imgToPlace);
            
            const row = parseInt(dropTargetCell.dataset.row);
            const col = parseInt(dropTargetCell.dataset.col);
            currentSudokuBoard[row][col] = itemName;

            // Clean up highlight
            dropTargetCell.style.border = '';
            dropTargetCell.classList.remove('incorrect');
        }
        
        if (lastTouchTarget) {
            lastTouchTarget.style.border = '';
        }

        // Clean up
        document.body.removeChild(ghostElement);
        ghostElement = null;
        touchDraggedItem = null;
        lastTouchTarget = null;
    });
}

// touch-support.js

// ... (کد قبلی مربوط به سودوکو در اینجا قرار دارد، آن را پاک نکنید) ...

function initializeTouchSupportForCountingGame() {
    // پیدا کردن کانتینر اصلی بازی شمارش
    const gameContainer = document.querySelector('.counting-game-container');
    if (!gameContainer) {
        // اگر بازی شمارش در صفحه فعال نباشد، کاری انجام نده
        return;
    }

    const itemSource = gameContainer.querySelector('#item-source');
    const dropBox = gameContainer.querySelector('#drop-box');

    if (!itemSource || !dropBox) {
        console.error("Counting game elements not found for touch support.");
        return;
    }

    let touchDraggedItem = null;
    let ghostElement = null;
    let isDragging = false;

    // شروع لمس روی آیتم قابل کشیدن
    itemSource.addEventListener('touchstart', (e) => {
        const target = e.target.closest('.draggable-item');
        if (!target) return;

        isDragging = true;
        touchDraggedItem = target;

        ghostElement = target.cloneNode(true);
        ghostElement.style.position = 'absolute';
        ghostElement.style.zIndex = '1000';
        ghostElement.style.opacity = '0.8';
        ghostElement.style.pointerEvents = 'none';
        ghostElement.style.width = `${target.offsetWidth}px`;
        ghostElement.style.height = `${target.offsetHeight}px`;
        document.body.appendChild(ghostElement);

        const touch = e.touches[0];
        ghostElement.style.left = `${touch.clientX - ghostElement.offsetWidth / 2}px`;
        ghostElement.style.top = `${touch.clientY - ghostElement.offsetHeight / 2}px`;

    }, { passive: true });

    // حرکت انگشت روی صفحه
    document.addEventListener('touchmove', (e) => {
        if (!isDragging || !ghostElement) return;

        e.preventDefault();
        const touch = e.touches[0];

        ghostElement.style.left = `${touch.clientX - ghostElement.offsetWidth / 2}px`;
        ghostElement.style.top = `${touch.clientY - ghostElement.offsetHeight / 2}px`;

        const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropTarget = elementUnderFinger ? elementUnderFinger.closest('#drop-box') : null;

        if (dropTarget) {
            dropBox.classList.add('drag-over');
        } else {
            dropBox.classList.remove('drag-over');
        }

    }, { passive: false });

    // پایان لمس (رها کردن آیتم)
    document.addEventListener('touchend', (e) => {
        if (!isDragging || !ghostElement) return;

        const touch = e.changedTouches[0];
        const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropTarget = elementUnderFinger ? elementUnderFinger.closest('#drop-box') : null;

        if (dropTarget) {
            // شبیه‌سازی منطق drop از فایل counting-game.js
            const boxContent = dropBox.querySelector('#box-content');
            
            const newItem = touchDraggedItem.cloneNode(true);
            newItem.id = `dropped-item-${Date.now()}`;
            newItem.classList.remove('draggable-item');
            newItem.classList.add('in-box-item');
            boxContent.appendChild(newItem);
            
            // اینجا باید راهی برای افزایش شمارنده پیدا کنیم
            // با صدا زدن یک تابع عمومی یا ارسال یک رویداد سفارشی
            const dropEvent = new CustomEvent('itemDroppedByTouch');
            document.dispatchEvent(dropEvent);
        }

        dropBox.classList.remove('drag-over');
        document.body.removeChild(ghostElement);
        ghostElement = null;
        touchDraggedItem = null;
        isDragging = false;
    });
}

// touch-support.js

// ... (کد initializeTouchSupportForSudoku شما در اینجا قرار دارد - دست نزنید) ...

// ... (کد initializeTouchSupportForCountingGame شما در اینجا قرار دارد - دست نزنید) ...


// =======================================================================
// ✨ کد جدید برای پشتیبانی از بازی الگویابی (این بخش را اضافه کنید) ✨
// =======================================================================
function initializeTouchSupportForPatternGame() {
    // اگر کانتینر بازی الگویابی در صفحه وجود ندارد، خارج شو
    const gameContainer = document.querySelector('.pattern-game-container');
    if (!gameContainer) {
        return;
    }

    let draggedElement = null;
    let ghostElement = null;
    let lastTouchTarget = null;

    // شروع لمس روی آیتم‌های قابل کشیدن
    gameContainer.addEventListener('touchstart', (e) => {
        const target = e.target.closest('.draggable-item');
        if (!target) return;

        draggedElement = target;
        ghostElement = target.cloneNode(true);
        ghostElement.classList.add('touch-dragging'); // استایل از pattern-game.css
        document.body.appendChild(ghostElement);

        const touch = e.touches[0];
        moveGhostElement(touch);

    }, { passive: true });

    // حرکت انگشت روی صفحه
    document.addEventListener('touchmove', (e) => {
        if (!draggedElement) return;
        e.preventDefault(); // جلوگیری از اسکرول صفحه هنگام کشیدن
        
        const touch = e.touches[0];
        moveGhostElement(touch);

        const elementUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
        const currentDropTarget = elementUnderFinger ? elementUnderFinger.closest('.drop-zone') : null;

        // مدیریت هایلایت شدن خانه‌های خالی
        if (lastTouchTarget && lastTouchTarget !== currentDropTarget) {
            lastTouchTarget.classList.remove('over');
        }
        if (currentDropTarget) {
            currentDropTarget.classList.add('over');
        }
        lastTouchTarget = currentDropTarget;

    }, { passive: false });

    // پایان لمس (رها کردن)
    document.addEventListener('touchend', (e) => {
        if (!draggedElement) return;

        const touch = e.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.drop-zone');

        if (dropTarget) {
            // شبیه‌سازی رویداد drop برای استفاده مجدد از منطق بازی
            const dropEvent = new DragEvent('drop', {
                bubbles: true,
                cancelable: true,
            });
            
            // ساخت یک dataTransfer سفارشی
            Object.defineProperty(dropEvent, 'dataTransfer', {
                value: {
                    getData: (format) => {
                        if (format === 'text/plain') {
                            return draggedElement.dataset.itemName;
                        }
                    }
                }
            });

            dropTarget.dispatchEvent(dropEvent);
        }

        // پاک‌سازی
        if (lastTouchTarget) {
            lastTouchTarget.classList.remove('over');
        }
        document.body.removeChild(ghostElement);
        ghostElement = null;
        draggedElement = null;
        lastTouchTarget = null;
    });

    function moveGhostElement(touch) {
        if (!ghostElement) return;
        ghostElement.style.left = `${touch.clientX - ghostElement.offsetWidth / 2}px`;
        ghostElement.style.top = `${touch.clientY - ghostElement.offsetHeight / 2}px`;
    }
}

