function initializeSentenceScramble(container, initialSentences) {
    // --- متغیرهای وضعیت بازی ---
    let mainSentences = [...initialSentences];
    let reviewSentences = [];
    
    let currentDataSource = mainSentences;
    let gamePhase = 'main'; // 'main' یا 'review'

    let currentIndex = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    
    let totalStepsInSession = mainSentences.length;

    // --- تابع اصلی برای رندر کردن هر سوال ---
    function renderQuestion() {
        if (currentIndex >= currentDataSource.length) {
            moveToNextPhase();
            return;
        }

        const currentData = currentDataSource[currentIndex];
        const shuffledWords = [...currentData.scrambled].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <h2>جمله بسازید:</h2>
            <div class="progress-container">
                <div id="progress-bar-fill" class="progress-bar-fill"></div>
            </div>
            
            <div id="review-message" class="review-message" style="display:none;">
                عالی! حالا سوالاتی که اشتباه داشتی را مرور می‌کنیم.
            </div>

            <div class="scramble-container">
                <p class="scramble-instructions">با کلیک روی کلمات، جمله صحیح را بسازید.</p>
                <div id="drop-zone" class="drop-zone-click"></div>
                <div id="word-bank" class="word-bank-click">
                    ${shuffledWords.map(word => `<div class="word-tile">${word}</div>`).join('')}
                </div>
                
                <!-- ✨ بخش دکمه‌ها که تغییر کرده است ✨ -->
                <div id="action-buttons-container">
                    <button id="check-btn">بررسی جواب</button>
                    <button id="continue-btn" class="button-continue" style="display: none;">ادامه</button>
                </div>

                <div id="feedback" class="feedback"></div>
            </div>
        `;

        if (gamePhase === 'review' && currentIndex === 0) {
            document.getElementById('review-message').style.display = 'block';
        }
        
        setupClickListeners();
        updateProgressBar();
    }
    
    // --- مدیریت کلیک روی کاشی‌ها و دکمه‌ها ---
    function setupClickListeners() {
        const wordBank = document.getElementById('word-bank');
        const sentenceBox = document.getElementById('drop-zone');
        
        // کلیک روی کاشی‌ها
        wordBank.addEventListener('click', e => e.target.classList.contains('word-tile') && sentenceBox.appendChild(e.target));
        sentenceBox.addEventListener('click', e => e.target.classList.contains('word-tile') && wordBank.appendChild(e.target));

        // کلیک روی دکمه‌ها
        document.getElementById('check-btn').addEventListener('click', checkAnswer);
        document.getElementById('continue-btn').addEventListener('click', () => {
            currentIndex++;
            renderQuestion();
        });
    }

    // --- به‌روزرسانی نوار پیشرفت ---
    function updateProgressBar() {
        const progressFill = document.getElementById('progress-bar-fill');
        if (!progressFill) return;
        
        // پیشرفت بر اساس تعداد سوالاتی که از آن‌ها "عبور کرده‌ایم" محاسبه می‌شود.
        let stepsCompleted = 0;
        if (gamePhase === 'main') {
            stepsCompleted = currentIndex;
        } else {
            stepsCompleted = mainSentences.length + currentIndex;
        }

        const progressPercentage = (stepsCompleted / totalStepsInSession) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }

    // --- تابع برای بررسی جواب ---
    function checkAnswer() {
        const sentenceBox = document.getElementById('drop-zone');
        const feedbackEl = document.getElementById('feedback');
        const checkBtn = document.getElementById('check-btn');
        const continueBtn = document.getElementById('continue-btn');

        const constructedSentence = Array.from(sentenceBox.children).map(c => c.textContent).join(' ');
        const isCorrect = constructedSentence === currentDataSource[currentIndex].correct;
        
        // غیرفعال کردن کاشی‌ها تا کاربر جواب را تغییر ندهد
        document.querySelectorAll('.word-tile').forEach(tile => tile.style.pointerEvents = 'none');

        if (isCorrect) {
            totalCorrect++;
            feedbackEl.textContent = 'آفرین! کارت عالی بود!';
            feedbackEl.className = 'feedback correct';
            continueBtn.classList.add('correct');
            
            // پیشرفت فقط بعد از پاسخ صحیح اتفاق می‌افتد
            let stepsCompleted = (gamePhase === 'main') ? currentIndex + 1 : mainSentences.length + currentIndex + 1;
            const progressPercentage = (stepsCompleted / totalStepsInSession) * 100;
            document.getElementById('progress-bar-fill').style.width = `${progressPercentage}%`;

        } else {
            totalIncorrect++;
            feedbackEl.innerHTML = `اوه! جمله درست این بود: <br><strong>${currentDataSource[currentIndex].correct}</strong>`;
            feedbackEl.className = 'feedback incorrect';
            continueBtn.classList.add('incorrect');

            if (gamePhase === 'main') {
                reviewSentences.push(currentDataSource[currentIndex]);
            }
        }
        
        checkBtn.style.display = 'none';
        continueBtn.style.display = 'block';
    }
    
    // --- مدیریت انتقال بین فازها ---
    function moveToNextPhase() {
        if (gamePhase === 'main') {
            if (reviewSentences.length > 0) {
                gamePhase = 'review';
                currentDataSource = reviewSentences;
                currentIndex = 0;
                totalStepsInSession += reviewSentences.length;
                renderQuestion();
            } else {
                showFinalScreen();
            }
        } else {
            showFinalScreen();
        }
    }

    // --- نمایش صفحه پایانی ---
    function showFinalScreen() {
        container.innerHTML = `
            <h2>تمرین تمام شد! آفرین!</h2>
            <div class="progress-container"><div class="progress-bar-fill" style="width: 100%;"></div></div>
            <div class="results-summary" style="text-align: center;">
                <p>✅ تعداد کل جواب‌های درست: <strong>${totalCorrect}</strong></p>
                <p>❌ تعداد کل جواب‌های اشتباه: <strong>${totalIncorrect}</strong></p>
                ${totalIncorrect === 0 ? "<p>تو فوق‌العاده‌ای! هیچ اشتباهی نداشتی.</p>" : ""}
            </div>
        `;
    }
    
    renderQuestion(); // شروع بازی
}