// Persian/word-sound-exercise.js

function createWordSoundExercise(container, exerciseData) {
    let score = 0;
    let lastTap = 0;
    const DOUBLE_TAP_DELAY = 300; // ms

    container.innerHTML = `
        <div class="word-sound-exercise-container">
            <h2>تمرین پیدا کردن کلمات با صدای "${exerciseData.targetSound}"</h2>
            <p>روی هر کلمه یک بار بزن تا صدایش را بشنوی. اگر کلمه صدای خواسته شده را داشت، روی آن دو بار بزن.</p>
            <button id="play-full-text-btn" class="shuffle-btn">پخش کل متن</button>
            <div class="exercise-text-panel"></div>
            <div class="exercise-score">امتیاز: <span id="word-sound-score">0</span></div>
        </div>
    `;

    const textPanel = container.querySelector('.exercise-text-panel');
    const scoreSpan = container.querySelector('#word-sound-score');
    const playFullTextBtn = container.querySelector('#play-full-text-btn');
    const audioPlayer = new Audio();

    // ایجاد کلمات در پنل متن
    exerciseData.words.forEach(wordInfo => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'exercise-word';
        wordSpan.textContent = wordInfo.word + ' ';
        wordSpan.dataset.audioSrc = wordInfo.audio;
        wordSpan.dataset.hasSound = wordInfo.hasSound;
        textPanel.appendChild(wordSpan);

        wordSpan.addEventListener('click', (e) => {
            const currentTime = new Date().getTime();
            const timeSinceLastTap = currentTime - lastTap;

            if (timeSinceLastTap < DOUBLE_TAP_DELAY && timeSinceLastTap > 0) {
                // Double tap
                handleDoubleTap(e.target);
            } else {
                // Single tap
                playWordSound(e.target.dataset.audioSrc);
            }
            lastTap = new Date().getTime();
        });
    });

    playFullTextBtn.addEventListener('click', () => {
        playWordSound(exerciseData.fullAudio);
    });

    function playWordSound(audioSrc) {
        if (audioSrc) {
            audioPlayer.src = audioSrc;
            audioPlayer.play().catch(e => console.error("خطا در پخش صدا:", e));
        }
    }

    function handleDoubleTap(wordElement) {
        if (wordElement.classList.contains('correct') || wordElement.classList.contains('incorrect')) {
            return; // قبلا انتخاب شده
        }

        const hasSound = wordElement.dataset.hasSound === 'true';

        if (hasSound) {
            wordElement.classList.add('correct');
            score++;
        } else {
            wordElement.classList.add('incorrect');
            score--;
        }
        updateScore();
    }

    function updateScore() {
        scoreSpan.textContent = score;
    }
}
