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