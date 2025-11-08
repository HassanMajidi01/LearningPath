function initializeListenAndTapGame(containerSelector, lessonId) {
    const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
    if (!container) return console.error('ListenAndTap: container not found');

    const lessons = (typeof lessonsData !== 'undefined') ? lessonsData : (window.lessonsData || {});
    const lesson = lessons && lessons[lessonId];
    if (!lesson || !lesson.flashcardWords) {
        container.innerHTML = '<div class="listen-tap-container">داده‌ای برای این درس موجود نیست.</div>';
        return;
    }

    const words = [...lesson.flashcardWords];
    // display order (shuffle for visual randomness)
    const displayOrder = shuffle(Array.from({length: words.length}, (_,i)=>i));

    let sequence = shuffle(Array.from({length: words.length}, (_,i)=>i)); // which words will be played in what order
    let currentIndex = 0;
    let score = 0;
    let answeredThisRound = false;

    container.innerHTML = `
        <div class="listen-tap-container">
            <div class="lt-topbar">
                <div class="lt-controls">
                    <button id="lt-play-btn" class="lt-btn">پخش</button>
                    <button id="lt-replay-btn" class="lt-btn lt-small">بازپخش</button>
                    <div class="lt-feedback" id="lt-feedback"></div>
                </div>
                <div class="lt-score">امتیاز: <span id="lt-score">0</span></div>
            </div>
            <div class="lt-note">به صدا گوش کن و روی کلمه درست بزن. هر کلمه یک بار پخش می‌شود.</div>
            <div class="lt-grid" id="lt-grid"></div>
        </div>
    `;

    const grid = container.querySelector('#lt-grid');
    const playBtn = container.querySelector('#lt-play-btn');
    const replayBtn = container.querySelector('#lt-replay-btn');
    const scoreEl = container.querySelector('#lt-score');
    const feedbackEl = container.querySelector('#lt-feedback');

    // Build grid (no images - text-only as requested)
    displayOrder.forEach(idx => {
        const w = words[idx];
        const item = document.createElement('div');
        item.className = 'lt-word';
        item.dataset.index = idx;
        item.innerHTML = `<span class="word-text">${w.word}</span>`;
        grid.appendChild(item);
    });

    // attach click listeners
    grid.addEventListener('click', (e) => {
        const cell = e.target.closest('.lt-word');
        if (!cell) return;
        const clickedIdx = parseInt(cell.dataset.index,10);
        // ignore if already answered this round
        if (answeredThisRound) return;
        handleUserSelection(cell, clickedIdx);
    });

    function handleUserSelection(cell, clickedIdx) {
        const targetIdx = sequence[currentIndex];
        answeredThisRound = true;
        if (clickedIdx === targetIdx) {
            // correct
            flash(cell, 'correct');
            score += 1;
            showFeedback('درست!', true);
        } else {
            // wrong
            const wrongCell = cell;
            flash(wrongCell, 'wrong');
            // also highlight the correct cell so the learner sees the right answer
            const correctCell = grid.querySelector(`.lt-word[data-index="${targetIdx}"]`);
            if (correctCell && correctCell !== wrongCell) {
                flash(correctCell, 'correct');
            }
            score -= 1;
            showFeedback('اشتباه!', false);
        }
        updateScore();
        // move to next after short delay (do NOT auto-play the next word)
        setTimeout(() => {
            currentIndex++;
            answeredThisRound = false;
            if (currentIndex >= sequence.length) {
                finishGame();
            } else {
                // wait for the student to press پخش for the next word
                showFeedback('برای پخش کلمهٔ بعدی دکمهٔ پخش را بزنید.', true);
            }
        }, 700);
    }

    function flash(cell, type) {
        if (!cell) return;
        if (type === 'correct') {
            cell.classList.add('correct-flash');
            setTimeout(()=>cell.classList.remove('correct-flash'), 700);
        } else {
            cell.classList.add('wrong-flash');
            setTimeout(()=>cell.classList.remove('wrong-flash'), 700);
        }
    }

    function showFeedback(text, ok) {
        feedbackEl.textContent = text;
        feedbackEl.style.color = ok ? '#2ecc71' : '#e74c3c';
        setTimeout(()=> feedbackEl.textContent = '', 700);
    }

    function updateScore() { scoreEl.textContent = String(score); }

    let currentAudio = null;
    function playCurrent() {
        const idx = sequence[currentIndex];
        const w = words[idx];
        if (!w) return;
        // play audio once for the current word
        if (currentAudio) { try { currentAudio.pause(); } catch(e){} }
        currentAudio = new Audio(w.audio);
        currentAudio.play().catch(err => console.warn('audio play failed',err));
        // allow the student to answer; do not auto-advance — student must press play for next
        answeredThisRound = false;
    }

    function finishGame() {
        showFeedback('بازی به پایان رسید');
        playBtn.disabled = false;
        replayBtn.disabled = false;
    }

    playBtn.addEventListener('click', ()=>{
        // If we've finished or not started, initialize sequence & score
        if (!sequence || currentIndex >= sequence.length) {
            sequence = shuffle(Array.from({length: words.length}, (_,i)=>i));
            currentIndex = 0; score = 0; updateScore();
        }
        // play exactly the current word; student must choose
        if (currentIndex < sequence.length) {
            playCurrent();
        } else {
            finishGame();
        }
    });

    replayBtn.addEventListener('click', ()=>{
        // replay current audio (replays last played index)
        const replayIdx = Math.min(currentIndex, sequence.length-1);
        if (replayIdx >= 0 && replayIdx < sequence.length) {
            const idx = sequence[replayIdx];
            const w = words[idx];
            if (w) {
                if (currentAudio) try{ currentAudio.pause(); }catch(e){}
                currentAudio = new Audio(w.audio);
                currentAudio.play().catch(()=>{});
            }
        }
    });

    // helper: Fisher-Yates
    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length -1; i>0; i--) {
            const j = Math.floor(Math.random()*(i+1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

}

// Expose small helper to start game programmatically
window.initializeListenAndTapGame = initializeListenAndTapGame;
