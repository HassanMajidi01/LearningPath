function initializeFlashcards(container, words) {
    // ایجاد ساختار اولیه در صفحه
    container.innerHTML = '<h2>فلش‌کارت‌های درس</h2><div id="flashcard-container" class="flashcard-container"></div>';
    const flashcardContainer = document.getElementById('flashcard-container');

    if (!words || words.length === 0) {
        flashcardContainer.innerHTML = '<p>کلمه‌ای برای نمایش در این درس وجود ندارد.</p>';
        return;
    }

    words.forEach(item => {
        // ایجاد یک کارت جدید
        const card = document.createElement('div');
        card.className = 'flashcard';

        // پردازش کلمه برای قرمز کردن نشانه جدید
        // با استفاده از RegExp تمام نمونه‌های حرف مورد نظر را با یک تگ span جایگزین می‌کنیم
        const highlightedWordHTML = item.word.replace(new RegExp(item.highlight, 'g'), `<span class="highlight-red">${item.highlight}</span>`);

        // ایجاد محتوای داخل کارت (تصویر و کلمه)
        card.innerHTML = `
            <img src="${item.image}" alt="${item.word}">
            <p class="word-text">${highlightedWordHTML}</p>
        `;

        // افزودن رویداد کلیک برای پخش صدا
        card.addEventListener('click', () => {
            const audio = new Audio(item.audio);
            audio.play();
        });

        // افزودن کارت به صفحه
        flashcardContainer.appendChild(card);
    });
}