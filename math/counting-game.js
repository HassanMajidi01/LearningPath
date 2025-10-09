// JavaScript for the Counting Game

function initializeCountingGame(container, gameData) {
    let currentRoundData = {};
    let droppedItemsCount = 0;
    
    const initialQuantities = [1, 2, 3, 4, 5];
    let shuffledQuantities = [];
    let reviewQuantities = [];
    let currentDataSource;
    let gamePhase = 'main';
    let currentRoundIndex = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalStepsInSession = initialQuantities.length;

    function handleTouchDrop() {
        droppedItemsCount++;
        updateDroppedCount();
    }

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

        const randomItem = gameData.items[Math.floor(Math.random() * gameData.items.length)];
        const quantity = currentDataSource[currentRoundIndex];
        currentRoundData = {
            item: randomItem,
            quantity: quantity
        };
        droppedItemsCount = 0;

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

        const itemSource = container.querySelector('#item-source');
        const img = document.createElement('img');
        img.src = currentRoundData.item.image;
        img.className = 'draggable-item';
        img.setAttribute('draggable', 'true');
        img.id = 'source-item';
        itemSource.appendChild(img);

        playAudio();
        addEventListeners();
        updateProgressBar();
        initializeTouchSupportForCountingGame();
        
        document.addEventListener('itemDroppedByTouch', handleTouchDrop);
    }

    async function playAudio() {
        const numberAudioSrc = gameData.audio.numbers[currentRoundData.quantity];
        // ✨ مشکل اینجا بود: game.audio به gameData.audio اصلاح شد ✨
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
                break;
            }
        }
    }
    
    function addEventListeners() {
        container.querySelector('#play-audio-btn').addEventListener('click', playAudio);
        container.querySelector('#check-answer-btn').addEventListener('click', checkAnswer);
        
        const nextBtn = container.querySelector('#next-round-btn');
        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                document.removeEventListener('itemDroppedByTouch', handleTouchDrop);
                currentRoundIndex++;
                setupRound();
            });
        }

        const sourceItem = container.querySelector('#source-item');
        const dropTargets = container.querySelectorAll('.drop-target');

        sourceItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', currentRoundData.item.name);
        });

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
                
                if (target.id === 'drop-box') {
                    const newItem = sourceItem.cloneNode(true);
                    newItem.id = `dropped-item-${Date.now()}`;
                    newItem.classList.remove('draggable-item');
                    newItem.classList.add('in-box-item');
                    container.querySelector('#box-content').appendChild(newItem);
                    droppedItemsCount++;
                    updateDroppedCount();
                } 
            });
        });
        
        const boxContent = container.querySelector('#box-content');
        boxContent.addEventListener('click', (e) => {
            if (e.target.classList.contains('in-box-item')) {
                e.target.remove();
                droppedItemsCount--;
                updateDroppedCount();
            }
        });
    }

    function updateDroppedCount() {
        const countDisplay = container.querySelector('#dropped-count');
        if (!countDisplay) return;
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
        
        container.querySelector('.draggable-item').setAttribute('draggable', 'false');

        if (droppedItemsCount === currentRoundData.quantity) {
            totalCorrect++;
            feedback.textContent = 'آفرین! درست بود!';
            feedback.className = 'feedback correct';
            updateProgressBar();
        } else {
            totalIncorrect++;
            feedback.textContent = `اشتباه شد! باید ${toPersianNumber(currentRoundData.quantity)} عدد میذاشتی، ولی تو ${toPersianNumber(droppedItemsCount)} عدد گذاشتی.`;
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
        document.removeEventListener('itemDroppedByTouch', handleTouchDrop);
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

    startGame();
}