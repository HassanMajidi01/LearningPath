// Load lesson data from data.js (ES module)
import { lessonsData } from './data.js';

// --- Selectors ---
const sidebarContainer = document.getElementById('sidebar-container');
const mainContent = document.getElementById('main-content');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    showWelcomeMessage();
    // Mobile menu toggle wiring
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('visible');
        });
    }

    // close button inside sidebar (mobile)
    const menuClose = document.querySelector('.menu-close');
    if (menuClose && sidebar) {
        menuClose.addEventListener('click', () => {
            sidebar.classList.remove('open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('visible');
        });
    }

    if (sidebarOverlay && sidebar) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('visible');
        });
    }
});

// --- Core Functions ---

// 1. Render Sidebar (Accordion)
function renderSidebar() {
    sidebarContainer.innerHTML = '';
    
    lessonsData.forEach(lesson => {
        // ساختن کانتینر درس
        const lessonDiv = document.createElement('div');
        lessonDiv.className = 'lesson-item';

        // هدر درس
        const header = document.createElement('div');
        header.className = 'lesson-header';
        header.innerHTML = `<span>${lesson.title}</span> <i class="fas fa-chevron-down"></i>`;
        
        // زیرمنو
        const submenu = document.createElement('div');
        submenu.className = 'submenu';
        submenu.innerHTML = `
            <span class="submenu-item" onclick="loadContent(this, ${lesson.id}, 'videos')">🎥 ویدئو های آموزشی درس</span>
            <span class="submenu-item" onclick="loadContent(this, ${lesson.id}, 'cards')">🗂 فلش کارت‌ها</span>
            <span class="submenu-item" onclick="loadContent(this, ${lesson.id}, 'game')">🎮 بازی وصل کردنی</span>
        `;

        // ایونت باز و بسته شدن آکاردئون
        header.addEventListener('click', () => {
            const isOpen = submenu.classList.contains('open');
            // بستن همه منوها اول (اختیاری)
            document.querySelectorAll('.submenu').forEach(s => s.classList.remove('open'));
            
            if (!isOpen) {
                submenu.classList.add('open');
            }
        });

        lessonDiv.appendChild(header);
        lessonDiv.appendChild(submenu);
        sidebarContainer.appendChild(lessonDiv);
    });
}

// 2. Load Content Logic
window.loadContent = function(clickedEl, lessonId, type) {
    const lesson = lessonsData.find(l => l.id === lessonId);
    if (!lesson) return;

    // هایلایت کردن آیتم انتخاب شده (UI)
    document.querySelectorAll('.submenu-item').forEach(el => el.classList.remove('active'));
    if (clickedEl && clickedEl.classList) clickedEl.classList.add('active');

    let htmlTemplate = '';

    switch(type) {
        case 'videos':
            if (lesson.videos) {
                htmlTemplate = renderVideos(lesson);
            }
            break;
            
        case 'cards':
            // Create a shuffled copy of flashcards for display
            const shuffledCards = [...lesson.flashcards].sort(() => Math.random() - 0.5);
            const cardsHtml = shuffledCards.map((card, index) => `
                <div class="flashcard" data-index="${index}">
                    <div class="flashcard-inner">
                        <div class="flashcard-front">
                            <p>${card.question}</p>
                        </div>
                        <div class="flashcard-back">
                            <p>${card.answer}</p>
                        </div>
                    </div>
                </div>
            `).join('');
            
            htmlTemplate = `
                <div class="fade-in">
                    <h2>فلش کارت‌های ${lesson.title}</h2>
                    <div class="flashcard-controls">
                        <button class="btn-shuffle" onclick="shuffleFlashcards()">🔀 برزدن فلش کارت‌ها</button>
                    </div>
                    <div class="flashcard-grid">${cardsHtml}</div>
                </div>
            `;
            break;
            
        case 'game':
            htmlTemplate = renderGame(lesson);
            break;
    }

    mainContent.innerHTML = htmlTemplate;
    // make specified phrases in the lesson clickable and playable via TTS
    try { makePhrasesPlayable(lesson); } catch(e) { console.warn('makePhrasesPlayable error', e); }
    // initialize match game if present
    try { if (type === 'game' && typeof initMatchGame === 'function') initMatchGame(lesson); } catch(e) { console.warn('initMatchGame error', e); }
    // on small screens, close sidebar automatically
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (window.innerWidth < 768 && sidebar) {
        sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('visible');
    }
};

// 3. Game Logic (Simple Match Game)
function renderGame(lesson) {
    // Interactive matching game inspired by Duolingo-style rounds
    if (!lesson.matchGame || !lesson.matchGame.rounds) {
        return `
            <div class="fade-in">
                <h2>بازی وصل کردنی: ${lesson.title}</h2>
                <p>محتوای بازی برای این درس تعریف نشده است.</p>
            </div>
        `;
    }

    return `
        <div class="fade-in">
            <h2>بازی جفت کردنی: ${lesson.title}</h2>

            <div class="match-controls">
                <div class="progress-wrap">
                    <div class="progress-bar" id="matchProgress" style="width:0%"></div>
                </div>
                <div class="match-info">
                    <span id="roundInfo">مرحله 1 / ${lesson.matchGame.rounds.length}</span>
                    <span id="scoreInfo">امتیاز: 0</span>
                </div>
            </div>

            <div class="match-grid">
                <div class="match-col" id="pronounsCol" aria-label="ستون ضمایر"></div>
                <div class="match-col" id="verbsCol" aria-label="ستون افعال"></div>
            </div>

            <div class="match-actions">
                <button id="restartMatch" class="btn-shuffle">🔁 شروع مجدد</button>
            </div>
        </div>
    `;
}

// 3a. Videos Display
function renderVideos(lesson) {
    if (!lesson.videos || lesson.videos.length === 0) {
        return `
            <div class="fade-in">
                <h2>🎥 ویدئو های آموزشی ${lesson.title}</h2>
                <p>ویدئوها در حال آماده‌سازی هستند...</p>
            </div>
        `;
    }

    const videoStyle = `
        <style>
            .videos-container {
                padding: 20px;
            }
            .video-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                gap: 25px;
                margin-top: 20px;
            }
            .video-item {
                background: white;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
                border: 1px solid rgba(0,0,0,0.05);
            }
            .video-item:hover {
                transform: translateY(-12px);
                box-shadow: 0 20px 40px rgba(11,83,148,0.12);
                border-color: rgba(11,83,148,0.1);
            }
            .video-item iframe {
                width: 100%;
                height: auto;
                aspect-ratio: 16 / 9;
                border: none;
                display: block;
                background: #f0f0f0;
            }
            .video-info {
                padding: 20px;
                text-align: right;
                direction: rtl;
                background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                border-top: 1px solid rgba(0,0,0,0.04);
            }
            .video-info .video-title {
                font-weight: 600;
                font-size: 1.05em;
                margin-bottom: 12px;
                color: #0b5394;
                word-break: break-word;
            }
            .video-info .video-duration {
                font-size: 0.9em;
                color: #666;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 6px;
            }
        </style>
    `;

    const videoCards = lesson.videos.map((video, idx) => `
        <div class="video-item">
            ${video.embedCode}
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <div class="video-duration">
                    <span>${video.duration || 'بدون مدت'}</span>
                    <span>⏱️</span>
                </div>
            </div>
        </div>
    `).join('');

    return `
        ${videoStyle}
        <div class="fade-in videos-container">
            <h2>🎥 ویدئو های آموزشی ${lesson.title}</h2>
            <p style="color: #666; text-align: right; direction: rtl;">بر روی پخش کنید و ویدئو را ببینید</p>
            <div class="video-list">
                ${videoCards}
            </div>
        </div>
    `;
}

// 4. Default View
function showWelcomeMessage() {
    mainContent.innerHTML = `
        <div class="welcome-screen fade-in">
            <h1>سلام قهرمان! 👋</h1>
            <p>به کلاس دوم خوش آمدی.</p>
            <p>از منوی سمت راست یک درس را انتخاب کن تا شروع کنیم.</p>
            <i class="fas fa-star" style="font-size: 3rem; color: #ffd700; margin-top: 20px;"></i>
        </div>
    `;
}

// --- Playable phrases (TTS) ---
function makePhrasesPlayable(lesson) {
    if (!lesson || !lesson.playablePhrases || !lesson.playablePhrases.length) return;
    const container = mainContent;

    // inject minimal styles for clickable phrases (no blue color or underline)
    if (!document.getElementById('playable-phrases-style')) {
        const style = document.createElement('style');
        style.id = 'playable-phrases-style';
        style.innerHTML = `
            .playable-phrase{
                cursor: pointer;
                color: inherit;
                text-decoration: none;
                display: inline-block;
                transition: background .18s ease, transform .12s ease, box-shadow .12s ease;
                padding: 0 6px;
                border-radius: 6px;
                line-height: 1.6;
            }
            .playable-phrase:hover{
                background: linear-gradient(90deg, rgba(11,83,148,0.10), rgba(11,83,148,0.06));
                box-shadow: 0 6px 14px rgba(11,83,148,0.06);
                transform: translateY(-2px);
            }
            .playable-phrase:focus{
                outline: 3px solid rgba(11,83,148,0.18);
                outline-offset: 2px;
            }
            .playable-phrase.active{
                background: rgba(11,83,148,0.14);
                color: inherit;
                border-radius: 6px;
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(11,83,148,0.06);
            }
        `;
        document.head.appendChild(style);
    }

    lesson.playablePhrases.forEach(phrase => walkAndReplace(container, phrase));

    container.querySelectorAll('.playable-phrase').forEach(el => {
        if (el._ttsBound) return;
        el.addEventListener('click', () => {
            const p = el.dataset.phrase || el.textContent;
            // toggle visual active state on click
            el.classList.toggle('active');
            // speak the phrase on click
            speakPhrase(p);
        });
        el._ttsBound = true;
    });
}

function walkAndReplace(container, phrase) {
    if (!phrase) return;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    textNodes.forEach(textNode => {
        const idx = textNode.nodeValue.indexOf(phrase);
        if (idx > -1 && textNode.parentNode) {
            const parent = textNode.parentNode;
            const before = document.createTextNode(textNode.nodeValue.substring(0, idx));
            const matched = document.createElement('span');
            matched.className = 'playable-phrase';
            matched.setAttribute('data-phrase', phrase);
            matched.textContent = phrase;
            const after = document.createTextNode(textNode.nodeValue.substring(idx + phrase.length));
            parent.insertBefore(before, textNode);
            parent.insertBefore(matched, textNode);
            parent.insertBefore(after, textNode);
            parent.removeChild(textNode);
        }
    });
}

function speakPhrase(text) {
    if (!text) return;
    if ('speechSynthesis' in window) {
        try {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'fa-IR';
            u.rate = 0.95;
            window.speechSynthesis.speak(u);
        } catch (e) {
            console.warn('TTS error', e);
        }
    } else {
        console.warn('SpeechSynthesis not supported in this browser.');
    }
}

// --- Flashcard Functions ---
window.shuffleFlashcards = function() {
    const flashcards = document.querySelectorAll('.flashcard');
    const grid = document.querySelector('.flashcard-grid');
    
    // Create array of flashcards
    const cardsArray = Array.from(flashcards);
    
    // Shuffle using Fisher-Yates algorithm
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    
    // Clear grid
    grid.innerHTML = '';
    
    // Re-append in shuffled order
    cardsArray.forEach(card => {
        // Reset flip state
        card.classList.remove('flipped');
        grid.appendChild(card);
    });
};

// --- Matching Game Implementation ---
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initMatchGame(lesson) {
    const cfg = lesson.matchGame;
    if (!cfg) return;

    window._matchState = {
        lessonId: lesson.id,
        rounds: cfg.rounds,
        pronouns: cfg.pronouns,
        current: 0,
        score: 0,
        matchesThisRound: 0
    };

    // wire restart button
    const restartBtn = document.getElementById('restartMatch');
    if (restartBtn) restartBtn.addEventListener('click', () => startRound(0, true));

    // start first round
    startRound(0);
}

function startRound(roundIndex, forceRestart = false) {
    const state = window._matchState;
    if (!state) return;
    if (roundIndex < 0 || roundIndex >= state.rounds.length) return;

    state.current = roundIndex;
    state.matchesThisRound = 0;

    const round = state.rounds[roundIndex];
    // build tile arrays
    const left = shuffleArray(state.pronouns);
    const right = shuffleArray(round.pairs.map(p => p.verb));

    const pronounsCol = document.getElementById('pronounsCol');
    const verbsCol = document.getElementById('verbsCol');
    const roundInfo = document.getElementById('roundInfo');
    const scoreInfo = document.getElementById('scoreInfo');

    if (!pronounsCol || !verbsCol) return;

    pronounsCol.innerHTML = '';
    verbsCol.innerHTML = '';

    // build map verb->pronoun for lookup
    const verbToPronoun = {};
    round.pairs.forEach(p => { verbToPronoun[p.verb] = p.pronoun; });

    left.forEach(pr => {
        const d = document.createElement('button');
        d.className = 'match-tile pronoun-tile';
        d.setAttribute('data-pronoun', pr);
        d.innerText = pr;
        pronounsCol.appendChild(d);
    });

    right.forEach(verb => {
        const d = document.createElement('button');
        d.className = 'match-tile verb-tile';
        d.setAttribute('data-verb', verb);
        d.setAttribute('data-match-pronoun', verbToPronoun[verb]);
        d.innerText = verb;
        verbsCol.appendChild(d);
    });

    // reset selection
    state.selectedPronoun = null;

    // wire listeners
    document.querySelectorAll('.match-tile').forEach(el => {
        el.classList.remove('matched', 'wrong', 'disabled', 'selected');
        el.disabled = false;
        el.onclick = handleMatchClick;
    });

    // update UI
    if (roundInfo) roundInfo.textContent = `مرحله ${roundIndex + 1} / ${state.rounds.length}`;
    if (scoreInfo) scoreInfo.textContent = `امتیاز: ${state.score}`;
    updateProgressBar();
}

function handleMatchClick(e) {
    const el = e.currentTarget;
    const state = window._matchState;
    if (!state) return;
    // if pronoun clicked
    if (el.classList.contains('pronoun-tile')) {
        // select this pronoun
        document.querySelectorAll('.pronoun-tile').forEach(p => p.classList.remove('selected'));
        el.classList.add('selected');
        state.selectedPronoun = el.getAttribute('data-pronoun');
        return;
    }

    // if verb clicked
    if (el.classList.contains('verb-tile')) {
        const verb = el.getAttribute('data-verb');
        const correctPron = el.getAttribute('data-match-pronoun');
        const selected = state.selectedPronoun;
        if (!selected) {
            // user should pick a pronoun first; highlight briefly
            const firstPron = document.querySelector('.pronoun-tile');
            if (firstPron) {
                firstPron.classList.add('shake');
                setTimeout(() => firstPron.classList.remove('shake'), 400);
            }
            return;
        }

        const pronButtons = Array.from(document.querySelectorAll('.pronoun-tile'));
        const pronEl = pronButtons.find(p => p.getAttribute('data-pronoun') === selected);

        // check match
        if (selected === correctPron) {
            // correct
            el.classList.add('matched');
            pronEl.classList.add('matched');
            el.disabled = true; pronEl.disabled = true;
            state.score += 1;
            state.matchesThisRound += 1;
            state.selectedPronoun = null;
            pronEl.classList.remove('selected');
            // update score display
            const scoreInfo = document.getElementById('scoreInfo');
            if (scoreInfo) scoreInfo.textContent = `امتیاز: ${state.score}`;

            // if all matched in this round, advance
            if (state.matchesThisRound >= state.pronouns.length) {
                setTimeout(() => {
                    advanceRound();
                }, 700);
            }
        } else {
            // wrong - deduct 1 point
            state.score = Math.max(0, state.score - 1);
            el.classList.add('wrong');
            if (pronEl) pronEl.classList.add('wrong');
            // brief red then revert
            setTimeout(() => {
                el.classList.remove('wrong');
                if (pronEl) pronEl.classList.remove('wrong');
                if (pronEl) pronEl.classList.remove('selected');
                state.selectedPronoun = null;
                // update score display
                const scoreInfo = document.getElementById('scoreInfo');
                if (scoreInfo) scoreInfo.textContent = `امتیاز: ${state.score}`;
            }, 700);
        }
    }
}

function advanceRound() {
    const state = window._matchState;
    if (!state) return;
    const next = state.current + 1;
    if (next >= state.rounds.length) {
        // finished all rounds
        finishMatchGame();
    } else {
        startRound(next);
    }
}

function updateProgressBar() {
    const state = window._matchState;
    const bar = document.getElementById('matchProgress');
    if (!state || !bar) return;
    const completed = state.current; // number of finished rounds
    const total = state.rounds.length;
    const pct = Math.round((completed / total) * 100);
    bar.style.width = pct + '%';
}

function finishMatchGame() {
    const state = window._matchState;
    if (!state) return;
    // set progress to 100%
    const bar = document.getElementById('matchProgress');
    if (bar) bar.style.width = '100%';

    const pronounsCol = document.getElementById('pronounsCol');
    const verbsCol = document.getElementById('verbsCol');
    if (pronounsCol) pronounsCol.innerHTML = '';
    if (verbsCol) verbsCol.innerHTML = '';

    const container = document.querySelector('.match-grid');
    if (container) {
        container.innerHTML = `<div class="match-finish">تمام شد! امتیاز شما: ${state.score} از ${state.rounds.length * state.pronouns.length}</div>`;
    }
}


// Add click listener to flashcards when they're rendered
const observer = new MutationObserver(() => {
    const flashcards = document.querySelectorAll('.flashcard:not([data-flip-bound])');
    flashcards.forEach(card => {
        card.setAttribute('data-flip-bound', 'true');
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });