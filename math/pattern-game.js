// pattern-game.js

function initializePatternGame(container, gameData) {
    // ✨ ۱. انتخاب تصادفی ۵ الگو از بانک الگوها ✨
    const shuffledPatterns = [...gameData.patterns].sort(() => 0.5 - Math.random());
    const gameSessionPatterns = shuffledPatterns.slice(0, 5);
    
    let currentPatternIndex = 0;

    function generateSequence(patternInfo, allItems) {
        const itemsCopy = [...Object.values(allItems)].sort(() => 0.5 - Math.random());
        const selectedItems = itemsCopy.slice(0, patternInfo.numItems);
        const itemMap = {};
        const patternChars = 'ABC';
        selectedItems.forEach((item, i) => itemMap[patternChars[i]] = item);

        // ✨ ۲. طول الگوها کوتاه‌تر شده است (مثلاً ۶ آیتم) ✨
        const patternLength = 6;
        let sequence = [];
        let patternString = patternInfo.type;
        while (sequence.length < patternLength) {
            for (const char of patternString) {
                if (sequence.length < patternLength) {
                    sequence.push(itemMap[char]);
                }
            }
        }
        return sequence;
    }

    function setupPattern(index) {
        container.innerHTML = '';
        const patternInfo = gameSessionPatterns[index];
        const fullSequence = generateSequence(patternInfo, gameData.items);
        const numBlanks = 3;
        const visibleLength = fullSequence.length - numBlanks;

        // ✨ ۳. افزودن کلاس برای اطمینان از جهت چپ-به-راست ✨
        const gameContainer = document.createElement('div');
        gameContainer.className = 'pattern-game-container ltr-force';

        const patternDisplay = document.createElement('div');
        patternDisplay.className = 'pattern-display';
        
        const selectableItemsContainer = document.createElement('div');
        selectableItemsContainer.className = 'selectable-items';

        for (let i = 0; i < visibleLength; i++) {
            const img = document.createElement('img');
            img.src = fullSequence[i].image;
            img.className = 'pattern-item';
            patternDisplay.appendChild(img);
        }

        for (let i = visibleLength; i < fullSequence.length; i++) {
            const dropZone = document.createElement('div');
            dropZone.className = 'drop-zone';
            dropZone.dataset.correctItem = fullSequence[i].name;
            patternDisplay.appendChild(dropZone);
        }

        const uniqueItems = [...new Set(fullSequence)];
        uniqueItems.forEach(item => {
            const img = document.createElement('img');
            img.src = item.image;
            img.className = 'draggable-item';
            img.dataset.itemName = item.name;
            img.draggable = true;
            selectableItemsContainer.appendChild(img);
        });

        gameContainer.innerHTML = `<h2>الگو را ادامه بده (${index + 1} از ${gameSessionPatterns.length})</h2>`;
        gameContainer.appendChild(patternDisplay);
        gameContainer.appendChild(selectableItemsContainer);
        container.appendChild(gameContainer);

        addEventListeners();
        // ✨ فراخوانی تابع برای پشتیبانی از موبایل ✨
        if (typeof enableTouchDragAndDrop === 'function') {
            enableTouchDragAndDrop();
        }

        // ✨ این خط را اضافه کنید تا پشتیبانی از لمس فعال شود ✨
        if (typeof initializeTouchSupportForPatternGame === 'function') {
            initializeTouchSupportForPatternGame();
        }
    }
    
    function addEventListeners() {
        document.querySelectorAll('.draggable-item').forEach(draggable => {
            draggable.addEventListener('dragstart', handleDragStart);
        });

        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.addEventListener('dragover', handleDragOver);
            zone.addEventListener('dragleave', handleDragLeave);
            zone.addEventListener('drop', handleDrop);
        });
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.itemName);
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.target.classList.add('over');
    }

    function handleDragLeave(e) {
        e.target.classList.remove('over');
    }

    function handleDrop(e) {
        e.preventDefault();
        const zone = e.target.classList.contains('drop-zone') ? e.target : e.target.parentElement;
        zone.classList.remove('over');
        const droppedItemName = e.dataTransfer.getData('text/plain');

        if (droppedItemName === zone.dataset.correctItem) {
            const itemData = gameData.items[droppedItemName];
            zone.innerHTML = `<img src="${itemData.image}" class="pattern-item">`;
            zone.classList.replace('drop-zone', 'filled');
            // ✨ ۴. افزودن رویداد کلیک برای حذف آیتم ✨
            zone.addEventListener('click', handleRemoveItem);
            checkCompletion();
        } else {
            zone.classList.add('shake');
            setTimeout(() => zone.classList.remove('shake'), 500);
        }
    }

    function handleRemoveItem(e) {
        const itemContainer = e.currentTarget;
        itemContainer.innerHTML = '';
        itemContainer.classList.replace('filled', 'drop-zone');
        itemContainer.removeEventListener('click', handleRemoveItem);
    }

    function checkCompletion() {
        if (document.querySelectorAll('.drop-zone').length === 0) {
            const successMessage = document.createElement('div');
            successMessage.className = 'feedback-message';
            successMessage.textContent = '🎉 آفرین! 🎉';
            container.querySelector('.pattern-game-container').appendChild(successMessage);
            
            setTimeout(() => {
                currentPatternIndex++;
                if (currentPatternIndex < gameSessionPatterns.length) {
                    setupPattern(currentPatternIndex);
                } else {
                    container.innerHTML = `<div class="welcome-container"><h1>عالی بود!</h1><p>شما تمام الگوها را با موفقیت انجام دادید.</p></div>`;
                }
            }, 2000);
        }
    }

    setupPattern(currentPatternIndex);
}