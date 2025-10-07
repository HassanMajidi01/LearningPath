function initializePatternGame(container, gameData) {
    let patterns = [...gameData.patterns];
    let reviewPatterns = [];
    let currentPatternIndex = 0;
    let gamePhase = 'main'; // 'main' or 'review'
    let currentDataSource = patterns;
    let currentAnswers = [];
    const patternLength = 3; // Number of items to predict

    function startGame() {
        currentPatternIndex = 0;
        reviewPatterns = [];
        gamePhase = 'main';
        currentDataSource = [...patterns].sort(() => Math.random() - 0.5);
        setupRound();
    }

    function setupRound() {
        if (currentPatternIndex >= currentDataSource.length) {
            moveToNextPhase();
            return;
        }

        const patternData = currentDataSource[currentPatternIndex];
        const patternSequence = patternData.sequence;
        const options = patternData.options;
        // The visible part of the pattern
        const visibleSequence = patternSequence.slice(0, patternSequence.length - patternLength);
        // The part the user needs to complete
        const correctSequence = patternSequence.slice(patternSequence.length - patternLength);
        currentAnswers = new Array(patternLength).fill(null);


        container.innerHTML = `
            <div class="pattern-game-container">
                <h2>الگو را با سه شکل بعدی ادامه بده</h2>
                <div class="progress-container">
                    <div id="progress-bar-fill" class="progress-bar-fill"></div>
                </div>
                 <div id="review-message" class="review-message" style="display:none;">
                    عالی! حالا سوالاتی که اشتباه داشتی را مرور می‌کنیم.
                </div>
                <div class="pattern-display">
                    ${visibleSequence.map(itemName => `
                        <div class="pattern-item">
                            <img src="${gameData.items[itemName].image}" alt="${gameData.items[itemName].title}">
                        </div>
                    `).join('')}
                    ${correctSequence.map((item, index) => `
                        <div id="dropzone-${index}" class="pattern-placeholder" data-correct="${item}">?</div>
                    `).join('')}
                </div>
                <p>شکل‌های بعدی الگو را از بین گزینه‌های زیر انتخاب کن و در جاهای خالی قرار بده.</p>
                <div class="pattern-options">
                    ${[...new Set(options)].sort(() => Math.random() - 0.5).map(itemName => `
                        <img src="${gameData.items[itemName].image}" class="pattern-draggable" draggable="true" data-item-name="${itemName}">
                    `).join('')}
                </div>
                <div id="feedback" class="feedback"></div>
                 <div class="action-buttons" style="margin-top: 20px;">
                    <button id="check-btn" class="check-btn">بررسی</button>
                    <button id="next-round-btn" class="next-btn" style="display: none;">ادامه</button>
                </div>
            </div>
        `;
        
        if (gamePhase === 'review' && currentPatternIndex === 0) {
            document.getElementById('review-message').style.display = 'block';
        }

        addDragDropListeners();
        updateProgressBar();
    }

    function addDragDropListeners() {
        const draggables = container.querySelectorAll('.pattern-draggable');
        const dropzones = container.querySelectorAll('.pattern-placeholder');
        const optionsContainer = container.querySelector('.pattern-options');

        // Add drag listeners to initial options
        draggables.forEach(draggable => {
            addDragStartListener(draggable, 'options');
        });

        // Add listeners to dropzones
        dropzones.forEach((dropzone, index) => {
            dropzone.id = `dropzone-${index}`; // Ensure dropzones have unique IDs

            dropzone.addEventListener('dragover', e => {
                e.preventDefault();
                dropzone.classList.add('drag-over');
            });

            dropzone.addEventListener('dragleave', () => {
                dropzone.classList.remove('drag-over');
            });

            dropzone.addEventListener('drop', e => {
                e.preventDefault();
                dropzone.classList.remove('drag-over');

                const itemName = e.dataTransfer.getData('text/plain');
                const sourceId = e.dataTransfer.getData('source-id');
                
                if (!itemName || !gameData.items[itemName]) return;

                const sourceDropzone = document.getElementById(sourceId);
                const targetDropzone = dropzone;
                const targetImg = targetDropzone.querySelector('img');

                // Case 1: Dragging from a dropzone
                if (sourceId.startsWith('dropzone-')) {
                    if (sourceDropzone === targetDropzone) return; // Dropped on itself

                    const sourceImg = sourceDropzone.querySelector('img');
                    
                    // Swap images if target has one
                    if (targetImg) {
                        sourceDropzone.appendChild(targetImg);
                        addDragStartListener(targetImg, sourceDropzone.id);
                    } else {
                        sourceDropzone.innerHTML = '?';
                    }
                    
                    // Move source image to target
                    if(sourceImg){
                        targetDropzone.innerHTML = '';
                        targetDropzone.appendChild(sourceImg);
                        addDragStartListener(sourceImg, targetDropzone.id);
                    }
                // Case 2: Dragging from options
                } else if (sourceId === 'options') {
                    if (targetImg) return; // Don't drop on a non-empty slot

                    const newImg = createImage(itemName);
                    targetDropzone.innerHTML = '';
                    targetDropzone.appendChild(newImg);
                    addDragStartListener(newImg, targetDropzone.id);
                }
                
                // Update answers for all affected dropzones
                updateAnswerForDropzone(sourceDropzone);
                updateAnswerForDropzone(targetDropzone);
            });
        });

        // Listener on the options container to handle drops for removal
        optionsContainer.addEventListener('dragover', e => e.preventDefault());
        optionsContainer.addEventListener('drop', e => {
            e.preventDefault();
            const sourceId = e.dataTransfer.getData('source-id');
            if (sourceId.startsWith('dropzone-')) {
                const sourceDropzone = document.getElementById(sourceId);
                if (sourceDropzone) {
                    sourceDropzone.innerHTML = '?';
                    updateAnswerForDropzone(sourceDropzone);
                }
            }
        });

        function createImage(itemName) {
            const img = document.createElement('img');
            img.src = gameData.items[itemName].image;
            img.className = 'pattern-draggable';
            img.draggable = true;
            img.dataset.itemName = itemName;
            return img;
        }

        function addDragStartListener(element, sourceId) {
            element.addEventListener('dragstart', e => {
                e.stopPropagation();
                const itemNameToDrag = e.target.dataset.itemName;
                // The source is either the parent dropzone's ID or 'options'
                const effectiveSourceId = e.target.parentElement.id.startsWith('dropzone-') ? e.target.parentElement.id : sourceId;
                e.dataTransfer.setData('text/plain', itemNameToDrag);
                e.dataTransfer.setData('source-id', effectiveSourceId);
            });
        }
        
        function updateAnswerForDropzone(dropzone) {
            if (!dropzone || !dropzone.id || !dropzone.id.startsWith('dropzone-')) return;
            const index = parseInt(dropzone.id.split('-')[1]);
            const img = dropzone.querySelector('img');
            currentAnswers[index] = img ? img.dataset.itemName : null;
        }

        container.querySelector('#check-btn').addEventListener('click', checkAnswer);

        const nextBtn = container.querySelector('#next-round-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentPatternIndex++;
                setupRound();
            });
        }
    }

    function checkAnswer() {
        const dropzones = container.querySelectorAll('.pattern-placeholder');
        let isCorrect = true;
        
        dropzones.forEach((dz, index) => {
            const correctItem = dz.dataset.correct;
            const userAnswer = currentAnswers[index];
            if (userAnswer !== correctItem) {
                isCorrect = false;
            }
        });

        const feedback = container.querySelector('#feedback');
        const nextBtn = container.querySelector('#next-round-btn');
        const checkBtn = container.querySelector('#check-btn');

        // Disable further dragging
        container.querySelectorAll('.pattern-draggable').forEach(d => d.setAttribute('draggable', 'false'));

        if (isCorrect) {
            feedback.textContent = 'آفرین! الگوی کامل درست بود!';
            feedback.className = 'feedback correct';
            updateProgressBar();
        } else {
            feedback.textContent = 'اشتباه بود! الگوی صحیح نمایش داده می‌شود.';
            feedback.className = 'feedback incorrect';
            if (gamePhase === 'main') {
                reviewPatterns.push(currentDataSource[currentPatternIndex]);
            }
        }
        
        // Show the correct answers and highlight correctness
        dropzones.forEach((dz, index) => {
            const correctItem = dz.dataset.correct;
            dz.innerHTML = `<img src="${gameData.items[correctItem].image}" style="width:100%; height:100%;">`;
            dz.style.borderStyle = 'solid';
            dz.style.borderColor = currentAnswers[index] === correctItem ? '#2ecc71' : '#c0392b';
        });

        checkBtn.style.display = 'none';
        feedback.style.display = 'block';
        nextBtn.style.display = 'block';
        
        if (currentPatternIndex >= currentDataSource.length - 1) {
             if (gamePhase === 'main' && reviewPatterns.length > 0) {
                nextBtn.textContent = 'مرور اشتباهات';
            } else {
                nextBtn.textContent = 'پایان بازی';
            }
        }
    }
    
    function updateProgressBar() {
        const progressFill = document.getElementById('progress-bar-fill');
        if (!progressFill) return;

        const totalSteps = patterns.length + reviewPatterns.length;
        let stepsCompleted = 0;
        if (gamePhase === 'main') {
            stepsCompleted = patterns.length - (currentDataSource.length - currentPatternIndex);
        } else {
            stepsCompleted = patterns.length + (currentDataSource.length - (currentDataSource.length - currentPatternIndex));
        }
        
        const progressPercentage = totalSteps > 0 ? (stepsCompleted / totalSteps) * 100 : 0;
        progressFill.style.width = `${progressPercentage}%`;
    }

    function moveToNextPhase() {
        if (gamePhase === 'main' && reviewPatterns.length > 0) {
            gamePhase = 'review';
            currentDataSource = reviewPatterns;
            currentPatternIndex = 0;
            setupRound();
        } else {
            showFinalScreen();
        }
    }

    function showFinalScreen() {
        const totalCorrect = patterns.length;
        const totalIncorrect = reviewPatterns.length;
        container.innerHTML = `
            <div class="pattern-game-container" style="text-align: center;">
                <h2>تمرین تمام شد!</h2>
                <div class="progress-container"><div class="progress-bar-fill" style="width: 100%;"></div></div>
                <div class="results-summary">
                     <p>شما تمام الگوها را با موفقیت تکمیل کردید.</p>
                     ${totalIncorrect > 0 ? `<p><strong>${toPersianNumber(totalIncorrect)}</strong> الگو در دور اول اشتباه بود که مرور کردی.</p>`: ''}
                     ${totalIncorrect === 0 ? "<p>تو فوق‌العاده‌ای! هیچ اشتباهی نداشتی.</p>" : ""}
                </div>
                <button id="restart-game-btn" class="next-btn">شروع مجدد</button>
            </div>
        `;
        container.querySelector('#restart-game-btn').addEventListener('click', startGame);
    }
    
    function toPersianNumber(n) {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return n.toString().split('').map(digit => persianNumbers[digit]).join('');
    }

    startGame();
}
