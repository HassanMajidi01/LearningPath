document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const menuToggle = document.getElementById('menu-toggle'); // دکمه همبرگر
    const overlay = document.getElementById('sidebar-overlay'); // دریافت عنصر پوشش

      // --- توابع جدید برای مدیریت باز و بسته شدن ---
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('visible');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
    }

    // --- مدیریت منوی موبایل ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    // بستن سایدبار با کلیک روی محتوای اصلی (اختیاری)
     if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }


    // ایجاد لیست دروس در سایدبار (بقیه کد بدون تغییر)
    const lessonsList = document.createElement('ul');
    sidebar.innerHTML = '<h2>لیست نشانه ها</h2>';
    sidebar.appendChild(lessonsList);

    for (const lessonId in lessonsData) {
        const lesson = lessonsData[lessonId];
        const lessonItem = document.createElement('li');
        lessonItem.className = 'lesson-item';
        lessonItem.innerHTML = `<span class="lesson-title">${lesson.title}</span>`;
        
        const submenu = document.createElement('ul');
        submenu.className = 'submenu';
        submenu.innerHTML = `
            <li data-lesson="${lessonId}" data-activity="video">ویدئوی آموزشی</li>
            <li data-lesson="${lessonId}" data-activity="flashcards">فلش‌کارت کلمات</li>
            <li data-lesson="${lessonId}" data-activity="memory">بازی کارت حافظه</li>
            <li data-lesson="${lessonId}" data-activity="scramble">بازی جمله‌سازی</li>
            <li data-lesson="${lessonId}" data-activity="quiz">آزمون درس</li>
        `;
        lessonItem.appendChild(submenu);
        lessonsList.appendChild(lessonItem);

        lessonItem.querySelector('.lesson-title').addEventListener('click', () => {
            const allSubmenus = lessonsList.querySelectorAll('.submenu');
            allSubmenus.forEach(sm => {
                if (sm !== submenu) {
                    sm.style.display = 'none';
                }
            });
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    sidebar.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' && e.target.dataset.lesson) {
            const lessonId = e.target.dataset.lesson;
            const activity = e.target.dataset.activity;
            const lessonData = lessonsData[lessonId];
            loadActivity(activity, lessonData);
            
            if (window.innerWidth < 768) {
                closeSidebar(); // از تابع جدید استفاده می‌کنیم
            }
        }
    });

    function loadActivity(activity, data) {
        mainContent.innerHTML = ''; 
        switch (activity) {
            case 'flashcards':
                initializeFlashcards(mainContent, data.flashcardWords);
                break;
            
            // --- ✨ بخش کلیدی و تغییر یافته برای انتخاب رندوم کلمات ✨ ---
            case 'memory':
                // ابتدا یک کپی از آرایه کلمات فلش‌کارت را ایجاد می‌کنیم تا آرایه اصلی دست‌نخورده باقی بماند.
                const allWords = [...data.flashcardWords];

                // آرایه کلمات را به صورت تصادفی بُر می‌زنیم (Fisher-Yates Shuffle Algorithm)
                for (let i = allWords.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
                }
                
                // حالا ۸ کلمه اول را از لیست بُر خورده انتخاب می‌کنیم.
                const wordsForGame = allWords.slice(0, 8);

                // بازی حافظه به جفت کارت‌ها نیاز دارد، پس آرایه را دو برابر می‌کنیم.
                const gameWords = [...wordsForGame, ...wordsForGame];
                
                initializeMemoryGame(mainContent, gameWords);
                break;
            // --------------------------------------------------------

            case 'scramble':
                // بررسی می‌کنیم که آیا داده‌های جمله‌سازی برای این درس وجود دارد یا نه
                if (data.sentenceScramble && data.sentenceScramble.length > 0) {
                    initializeSentenceScramble(mainContent, data.sentenceScramble);
                } else {
                    mainContent.innerHTML = `<h2>بازی جمله‌سازی</h2><p>تمرین جمله‌سازی برای این درس هنوز آماده نشده است.</p>`;
                }
                break;

            case 'video':
                mainContent.innerHTML = `<h2>ویدئوی آموزشی: ${data.title}</h2> <video controls width="100%"><source src="${data.videoSrc}" type="video/mp4"></video>`;
                break;
            
            // ✨ کیس آزمون با طراحی کاملاً جدید و جذاب ✨
            case 'quiz':
                 mainContent.innerHTML = `
                    <div class="quiz-launch-pad">
                        <div class="quiz-card-header">
                            <div class="quiz-header-icon">🏆</div>
                            <h2>آزمون درس: ${data.title}</h2>
                        </div>
                        <div class="quiz-card-body">
                            <p class="quiz-intro-text">
                                این آخرین مرحله این درسه! آماده‌ای تا هرچی یاد گرفتی رو امتحان کنی؟
                            </p>
                            
                            <ul class="quiz-instructions">
                                <li>
                                    <span class="li-icon">✅</span>
                                    <span>این آزمون در یک صفحه جدید باز می‌شه.</span>
                                </li>
                                <li>
                                    <span class="li-icon">💡</span>
                                    <span>با دقت و بدون عجله به سوال‌ها جواب بده.</span>
                                </li>
                                <li>
                                    <span class="li-icon">😊</span>
                                    <span>فقط کافیه بهترین تلاشت رو بکنی!</span>
                                </li>
                            </ul>
                            
                            <a href="${data.quizLink}" target="_blank" class="button-start-quiz-final">شروع آزمون نهایی</a>
                        </div>
                    </div>
                `;
                break;
        }
    }

      // ✨ بارگذاری محتوای پیش‌فرض با ساختار جدید و شیک ✨
    mainContent.innerHTML = `
       <div class="welcome-container">
            <div class="welcome-icon">🎉</div>
            <h1>به دنیای حروف و کلمات خوش آمدی!</h1>
            <p class="welcome-subtitle">اینجا یادگیری زبان فارسی مثل یک بازی شیرینه.</p>
            <div class="welcome-cta">
                <span class="cta-arrow">👉</span>
                <p>برای شروع ماجراجویی، از منوی سمت راست یک نشانه انتخاب کن.</p>
            </div>
        </div>
    `;
});