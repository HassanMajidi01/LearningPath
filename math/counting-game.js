// JavaScript for the Counting Game

function initializeCountingGame(container, gameData) {
    let currentRoundData = {};
    let droppedItemsCount = 0;
    
    // Game state variables
    const initialQuantities = [1, 2, 3, 4, 5];
    let shuffledQuantities = [];
    let reviewQuantities = [];
    let currentDataSource;
    let gamePhase = 'main'; // 'main' or 'review'
    let currentRoundIndex = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalStepsInSession = initialQuantities.length;


    function startGame() {
        shuffledQuantities = [...initialQuantities].sort(() => Math.random() - 0.5);
        reviewQuantities = [];
        currentDataSource = shuffledQuantities;
        gamePhase = 'main';
        currentRoundIndex = 0;
        totalCorrect = 0;
        totalIncorrect = 0;
        totalStepsInSession = initialQuantities.length;
        setupRound();
    }

    function toPersianNumber(n) {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return n.toString().split('').map(digit => persianNumbers[digit]).join('');
    }

    function setupRound() {
        if (currentRoundIndex >= currentDataSource.length) {
            moveToNextPhase();
            return;
        }

        // 1. Select item and quantity
        const randomItem = gameData.items[Math.floor(Math.random() * gameData.items.length)];
        const quantity = currentDataSource[currentRoundIndex];
        currentRoundData = {
            item: randomItem,
            quantity: quantity
        };
        droppedItemsCount = 0;

        // 2. Generate HTML
        container.innerHTML = `
            <div class="counting-game-container">
                <div class="progress-container">
                    <div id="progress-bar-fill" class="progress-bar-fill"></div>
                </div>
                <div id="review-message" class="review-message" style="display:none;">
                    عالی! حالا سوالاتی که اشتباه داشتی را مرور می‌کنیم.
                </div>
                <div class="instruction">
                    <button id="play-audio-btn" class="play-btn">▶️</button>
                    <p><span>${toPersianNumber(currentRoundData.quantity)}</span> عدد <span>${currentRoundData.item.title}</span> داخل جعبه بنداز.</p>
                </div>
                <div id="item-source" class="item-source drop-target">
                    <!-- Draggable items will be generated here -->
                </div>
                <div id="drop-box" class="drop-box drop-target">
                    <div id="box-content" class="box-content"></div>
                    <img src="${gameData.boxImage}" alt="جعبه" class="box-image">
                    <div id="dropped-count" class="dropped-count">۰</div>
                </div>
                <div class="action-buttons">
                    <button id="check-answer-btn" class="check-btn">بررسی</button>
                    <button id="next-round-btn" class="next-btn" style="display: none;">ادامه</button>
                </div>
                <div id="feedback" class="feedback"></div>
            </div>
        `;
        
        if (gamePhase === 'review' && currentRoundIndex === 0) {
            document.getElementById('review-message').style.display = 'block';
        }

        // 3. Populate draggable items
        const itemSource = container.querySelector('#item-source');
        const img = document.createElement('img');
        img.src = currentRoundData.item.image;
        img.className = 'draggable-item';
        img.setAttribute('draggable', 'true');
        img.id = 'source-item'; // A single, reusable item
        itemSource.appendChild(img);

        // 4. Play instruction audio
        playAudio();

        // 5. Add event listeners and update UI
        addEventListeners();
        updateProgressBar();
    }

    async function playAudio() {
        const numberAudioSrc = gameData.audio.numbers[currentRoundData.quantity];
        const itemAudioSrc = gameData.audio.items[currentRoundData.item.title];
        const instructionAudioSrc = gameData.audio.instruction;

        const playlist = [numberAudioSrc, itemAudioSrc, instructionAudioSrc].filter(Boolean);

        for (const src of playlist) {
            try {
                await new Promise((resolve, reject) => {
                    const audio = new Audio(src);
                    audio.onended = resolve;
                    audio.onerror = reject;
                    audio.play();
                });
            } catch (error) {
                console.error(`Error playing audio ${src}:`, error);
                break; // Stop if one audio fails
            }
        }
    }

    function addEventListeners() {
        container.querySelector('#play-audio-btn').addEventListener('click', playAudio);
        container.querySelector('#check-answer-btn').addEventListener('click', checkAnswer);
        
        const nextBtn = container.querySelector('#next-round-btn');
        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentRoundIndex++;
                setupRound();
            });
        }


        const sourceItem = container.querySelector('#source-item');
        const dropTargets = container.querySelectorAll('.drop-target');

        sourceItem.addEventListener('dragstart', (e) => {
            // Data can be the item type or any identifier
            e.dataTransfer.setData('text/plain', currentRoundData.item.name);
            setTimeout(() => {
                // You can style the source item while dragging
            }, 0);
        });

        // No dragend needed for the source item as it's not removed

        dropTargets.forEach(target => {
            target.addEventListener('dragover', (e) => {
                e.preventDefault();
                target.classList.add('drag-over');
            });

            target.addEventListener('dragleave', () => {
                target.classList.remove('drag-over');
            });

            target.addEventListener('drop', (e) => {
                e.preventDefault();
                target.classList.remove('drag-over');
                
                const droppedItemId = e.dataTransfer.getData('text/plain');
                const boxContent = container.querySelector('#box-content');
                const itemSource = container.querySelector('#item-source');

                // If dropping into the box
                if (target.id === 'drop-box') {
                    // Create a new clone of the source item
                    const newItem = sourceItem.cloneNode(true);
                    newItem.id = `dropped-item-${Date.now()}`; // Unique ID for the new item
                    newItem.classList.remove('draggable-item'); // So it can't be dragged from the box
                    newItem.classList.add('in-box-item');
                    boxContent.appendChild(newItem);
                    droppedItemsCount++;
                } 
                // If dropping back into the source area (or anywhere else)
                else if (target.id === 'item-source') {
                    // This logic handles removing items from the box
                    const draggedElementId = e.dataTransfer.getData('text/plain-id');
                    if (draggedElementId) {
                         const elementToRemove = document.getElementById(draggedElementId);
                         if(elementToRemove && elementToRemove.parentElement.id === 'box-content'){
                            elementToRemove.remove();
                            droppedItemsCount--;
                         }
                    }
                }
                updateDroppedCount();
            });
        });

        // Add drag listeners for items inside the box to allow them to be removed
        const boxContent = container.querySelector('#box-content');
        boxContent.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('in-box-item')) {
                e.dataTransfer.setData('text/plain-id', e.target.id);
            }
        });
    }

    function updateDroppedCount() {
        const countDisplay = container.querySelector('#dropped-count');
        countDisplay.textContent = toPersianNumber(droppedItemsCount);
        countDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            countDisplay.style.transform = 'scale(1)';
        }, 200);
    }

    function updateProgressBar() {
        const progressFill = document.getElementById('progress-bar-fill');
        if (!progressFill) return;

        let stepsCompleted = 0;
        if (gamePhase === 'main') {
            stepsCompleted = shuffledQuantities.length - reviewQuantities.length - (currentDataSource.length - currentRoundIndex);
        } else {
            stepsCompleted = shuffledQuantities.length + (currentDataSource.length - (currentDataSource.length - currentRoundIndex));
        }
        
        const progressPercentage = (stepsCompleted / totalStepsInSession) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }


    function checkAnswer() {
        const feedback = container.querySelector('#feedback');
        const checkBtn = container.querySelector('#check-answer-btn');
        const nextBtn = container.querySelector('#next-round-btn');
        
        // Disable dragging
        container.querySelectorAll('.draggable-item').forEach(item => item.setAttribute('draggable', 'false'));


        if (droppedItemsCount === currentRoundData.quantity) {
            totalCorrect++;
            feedback.textContent = 'آفرین! درست بود!';
            feedback.className = 'feedback correct';
            updateProgressBar(); // Update progress on correct answer
        } else {
            totalIncorrect++;
            feedback.textContent = `اشتباه شد! باید ${toPersianNumber(currentRoundData.quantity)} تا میذاشتی، ولی تو ${toPersianNumber(droppedItemsCount)} تا گذاشتی.`;
            feedback.className = 'feedback incorrect';
            if (gamePhase === 'main') {
                reviewQuantities.push(currentRoundData.quantity);
            }
        }
        
        if (currentRoundIndex >= currentDataSource.length - 1) {
             if (gamePhase === 'main' && reviewQuantities.length > 0) {
                nextBtn.textContent = 'مرور اشتباهات';
            } else {
                nextBtn.textContent = 'پایان بازی';
            }
        }

        feedback.style.display = 'block';
        checkBtn.style.display = 'none';
        nextBtn.style.display = 'block';
    }

    function moveToNextPhase() {
        if (gamePhase === 'main') {
            if (reviewQuantities.length > 0) {
                gamePhase = 'review';
                currentDataSource = reviewQuantities;
                currentRoundIndex = 0;
                totalStepsInSession += reviewQuantities.length;
                setupRound();
            } else {
                showFinalScreen();
            }
        } else {
            showFinalScreen();
        }
    }

    function showFinalScreen() {
        container.innerHTML = `
            <div class="counting-game-container" style="text-align: center;">
                <h2>تمرین تمام شد!</h2>
                <div class="progress-container"><div class="progress-bar-fill" style="width: 100%;"></div></div>
                <div class="results-summary">
                    <p>✅ تعداد کل جواب‌های درست: <strong>${toPersianNumber(totalCorrect)}</strong></p>
                    <p>❌ تعداد کل جواب‌های اشتباه: <strong>${toPersianNumber(totalIncorrect)}</strong></p>
                    ${totalIncorrect === 0 ? "<p>تو فوق‌العاده‌ای! هیچ اشتباهی نداشتی.</p>" : ""}
                </div>
                <button id="restart-game-btn" class="next-btn">شروع مجدد</button>
            </div>
        `;
        container.querySelector('#restart-game-btn').addEventListener('click', startGame);
    }


    // Initial setup
    startGame();
}
