function initializeFlashcards(container, words) {
    // ایجاد ساختار اولیه در صفحه
    container.innerHTML = '<h2>فلش‌کارت‌های درس</h2><div id="flashcard-container" class="flashcard-container"></div>';
    const flashcardContainer = document.getElementById('flashcard-container');

    if (!words || words.length === 0) {
        flashcardContainer.innerHTML = '<p>کلمه‌ای برای نمایش در این درس وجود ندارد.</p>';
        return;
    }

    words.forEach(item => {
        // ۱. ایجاد ساختار کامل فلش‌کارت (ظرف اصلی، ظرف داخلی، رو و پشت)
        const card = document.createElement('div');
        card.className = 'flashcard';

        const cardInner = document.createElement('div');
        cardInner.className = 'flashcard-inner';

        // پردازش کلمه برای قرمز کردن نشانه جدید
        const highlightedWordHTML = item.word.replace(new RegExp(item.highlight, 'g'), `<span class="highlight-red">${item.highlight}</span>`);

        // ۲. ساخت روی کارت (فقط کلمه)
        const cardFront = document.createElement('div');
        cardFront.className = 'flashcard-front';
        cardFront.innerHTML = `<p class="word-text">${highlightedWordHTML}</p>`;

        // ۳. ساخت پشت کارت (تصویر و کلمه)
        const cardBack = document.createElement('div');
        cardBack.className = 'flashcard-back';
        cardBack.innerHTML = `
            <img src="${item.image}" alt="${item.word}">
            <p class="word-text">${highlightedWordHTML}</p>
        `;

        // ۴. افزودن روی کارت و پشت کارت به محفظه داخلی
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        // ۵. افزودن رویداد کلیک برای چرخاندن کارت و پخش صدا
        card.addEventListener('click', () => {
            // افزودن/حذف کلاس 'flipped' برای اجرای انیمیشن چرخش
            card.classList.toggle('flipped');

            const audio = new Audio(item.audio);
            audio.play();
        });

        // افزودن کارت به صفحه
        flashcardContainer.appendChild(card);
    });
}

/**
 * تابعی برای بُر زدن یک آرایه با استفاده از الگوریتم Fisher-Yates
 * @param {Array} array آرایه‌ای که باید بُر زده شود.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // جابجایی دو عنصر
    }
}

/**
 * این تابع کارت‌ها را بر اساس آرایه کلمات در صفحه نمایش می‌دهد
 * @param {HTMLElement} flashcardContainer محفظه‌ای که کارت‌ها باید در آن قرار گیرند
 * @param {Array} words آرایه کلمات برای نمایش
 */
function renderFlashcards(flashcardContainer, words) {
    // ابتدا محتوای فعلی را پاک می‌کنیم
    flashcardContainer.innerHTML = '';

    if (!words || words.length === 0) {
        flashcardContainer.innerHTML = '<p>کلمه‌ای برای نمایش در این درس وجود ندارد.</p>';
        return;
    }

    words.forEach(item => {
        const card = document.createElement('div');
        card.className = 'flashcard';

        const cardInner = document.createElement('div');
        cardInner.className = 'flashcard-inner';

        const highlightedWordHTML = item.word.replace(new RegExp(item.highlight, 'g'), `<span class="highlight-red">${item.highlight}</span>`);

        // ساخت روی کارت (فقط کلمه)
        const cardFront = document.createElement('div');
        cardFront.className = 'flashcard-front';
        cardFront.innerHTML = `<p class="word-text">${highlightedWordHTML}</p>`;

        // ساخت پشت کارت (تصویر و کلمه)
        const cardBack = document.createElement('div');
        cardBack.className = 'flashcard-back';
        cardBack.innerHTML = `
            <img src="${item.image}" alt="${item.word}">
            <p class="word-text">${highlightedWordHTML}</p>
        `;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            const audio = new Audio(item.audio);
            audio.play();
        });

        flashcardContainer.appendChild(card);
    });
}

/**
 * تابع اصلی برای راه‌اندازی فلش‌کارت‌ها
 * @param {HTMLElement} container المنتی که کل بخش فلش‌کارت در آن قرار می‌گیرد
 * @param {Array} words آرایه کلمات
 */
function initializeFlashcards(container, words) {
    // ۱. ایجاد ساختار اولیه شامل دکمه و محفظه کارت‌ها
    container.innerHTML = `
        <h2>فلش‌کارت‌های درس</h2>
        <div class="shuffle-button-container">
            <button id="shuffle-button" class="shuffle-btn">بُر زدن کارت‌ها</button>
        </div>
        <div id="flashcard-container" class="flashcard-container"></div>
    `;

    const flashcardContainer = document.getElementById('flashcard-container');
    const shuffleButton = document.getElementById('shuffle-button');

    // ۲. اضافه کردن رویداد کلیک به دکمه بُر زدن
    shuffleButton.addEventListener('click', () => {
        shuffleArray(words); // آرایه کلمات را بُر می‌زنیم
        renderFlashcards(flashcardContainer, words); // کارت‌ها را دوباره بر اساس ترتیب جدید می‌سازیم
    });

    // ۳. نمایش اولیه کارت‌ها در صفحه
    renderFlashcards(flashcardContainer, words);
}