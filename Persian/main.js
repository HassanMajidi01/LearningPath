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
    sidebar.innerHTML = '<h2> نشانه ها</h2>';
    sidebar.appendChild(lessonsList);

    for (const lessonId in lessonsData) {
        const lesson = lessonsData[lessonId];
        const lessonItem = document.createElement('li');
        lessonItem.className = 'lesson-item';
        lessonItem.innerHTML = `<span class="lesson-title">${lesson.title}</span>`;
        
        const submenu = document.createElement('ul');
        submenu.className = 'submenu';
        
        // ایجاد آیتم‌های زیرمنو به صورت پویا
        let submenuHTML = `
            <li data-lesson="${lessonId}" data-activity="video">ویدئوی آموزشی</li>
            <li data-lesson="${lessonId}" data-activity="flashcards">فلش‌کارت کلمات</li>
            <li data-lesson="${lessonId}" data-activity="memory">بازی کارت حافظه</li>
        `;

        // فقط در صورتی که داده تمرین پیدا کردن کلمه در فایل جدید وجود داشته باشد، آیتم را اضافه کن
        if (wordSoundExerciseData[lessonId]) {
            submenuHTML += `<li data-lesson="${lessonId}" data-activity="word-sound">تمرین پیدا کردن کلمه</li>`;
        }
        // اضافه کردن تمرین شنیداری به زیرمنو برای هر درس
        submenuHTML += `<li data-lesson="${lessonId}" data-activity="listen-tap">تمرین شنیداری</li>`;
        submenuHTML += `
            <li data-lesson="${lessonId}" data-activity="scramble">بازی جمله‌سازی</li>
            <li data-lesson="${lessonId}" data-activity="quiz">آزمون درس</li>
        `;
        
        submenu.innerHTML = submenuHTML;
        lessonItem.appendChild(submenu);
        lessonsList.appendChild(lessonItem);

        lessonItem.querySelector('.lesson-title').addEventListener('click', (e) => {
            // جلوگیری از بسته شدن منو هنگام کلیک روی عنوان
            e.stopPropagation(); 
            
            const allSubmenus = lessonsList.querySelectorAll('.submenu');
            allSubmenus.forEach(sm => {
                if (sm !== submenu) {
                    sm.style.display = 'none';
                    sm.parentElement.querySelector('.lesson-title').classList.remove('active');
                }
            });
            
            const isVisible = submenu.style.display === 'block';
            submenu.style.display = isVisible ? 'none' : 'block';
            e.currentTarget.classList.toggle('active', !isVisible);
        });
    }

    sidebar.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' && e.target.dataset.lesson) {
            document.querySelectorAll('.submenu li').forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
            const lessonId = e.target.dataset.lesson;
            const activity = e.target.dataset.activity;
            const lessonData = lessonsData[lessonId];
            loadActivity(activity, lessonData, lessonId);
            
            // بستن سایدبار فقط در حالت موبایل
            if (window.innerWidth < 768) {
                closeSidebar();
            }
        }
    });

    function loadActivity(activity, lessonData, lessonId) { // lessonId را دریافت می‌کنیم
        mainContent.innerHTML = ''; 
        switch (activity) {
            case 'flashcards':
                initializeFlashcards(mainContent, lessonData.flashcardWords);
                break;
            
            case 'word-sound':
                const exerciseData = wordSoundExerciseData[lessonId];
                if (exerciseData) {
                    createWordSoundExercise(mainContent, exerciseData);
                } else {
                    mainContent.innerHTML = `<h2>تمرین پیدا کردن کلمه</h2><p>این تمرین برای درس فعلی تعریف نشده است.</p>`;
                }
                break;

            // --- ✨ بخش کلیدی و تغییر یافته برای انتخاب رندوم کلمات ✨ ---
            case 'memory':
                // ابتدا یک کپی از آرایه کلمات فلش‌کارت را ایجاد می‌کنیم تا آرایه اصلی دست‌نخورده باقی بماند.
                const allWords = [...lessonData.flashcardWords];

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
                if (lessonData.sentenceScramble && lessonData.sentenceScramble.length > 0) {
                    initializeSentenceScramble(mainContent, lessonData.sentenceScramble);
                } else {
                    mainContent.innerHTML = `<h2>بازی جمله‌سازی</h2><p>تمرین جمله‌سازی برای این درس هنوز آماده نشده است.</p>`;
                }
                break;

            case 'listen-tap':
                // بازی شنیداری: از initializeListenAndTapGame استفاده می‌کنیم
                if (typeof initializeListenAndTapGame === 'function') {
                    // initialize inside mainContent, pass lessonId
                    initializeListenAndTapGame(mainContent, lessonId);
                } else {
                    mainContent.innerHTML = `<h2>تمرین شنیداری</h2><p>بازی شنیداری بارگذاری نشده است.</p>`;
                }
                break;

               case 'video':
                let videoHTML = `<h2>ویدئوهای آموزشی: ${lessonData.title}</h2>`;

                // بررسی می‌کنیم که آیا آرایه ویدئوها وجود دارد و خالی نیست
                if (lessonData.videos && lessonData.videos.length > 0) {
                    // روی هر ویدئو در آرایه حلقه می‌زنیم
                    lessonData.videos.forEach(video => {
                        videoHTML += `
                            <div class="video-item">
                                <h3>${video.title}</h3>
                                <div class="video-container">
                                    ${video.embedCode}
                                </div>
                            </div>
                        `;
                    });
                } else {
                    videoHTML += `<p>ویدئوی آموزشی برای این درس هنوز آماده نشده است.</p>`;
                }

                mainContent.innerHTML = videoHTML;
                break;
            
            // ✨ کیس آزمون با طراحی کاملاً جدید و جذاب ✨
            case 'quiz':
                 mainContent.innerHTML = `
                    <div class="quiz-launch-pad">
                        <div class="quiz-card-header">
                            <div class="quiz-header-icon">🏆</div>
                            <h2>آزمون درس: ${lessonData.title}</h2>
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
                                    <span class="li-icon">😊</span>
                                    <span>بعد از اینکه به سوال ها جواب دادی، دکمه ارسال رو بزن تا پاسخ هات ارسال بشه.</span>
                                </li>
                                <li>
                                    <span class="li-icon">💡</span>
                                    <span>بعد از ارسال پاسخ گزینه نمایش امتیاز رو بزن تا هم امتیازت رو ببینی هم جواب هات رو چک کنی.</span>
                                </li>
                            </ul>
                            
                            <a href="${lessonData.quizLink}" target="_blank" class="button-start-quiz-final">شروع آزمون نهایی</a>
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
            <div class="welcome-cta welcome-menu-trigger">
                <span class="cta-arrow">📚</span>
                <p>مشاهده فهرست بخش‌ها</p>
            </div>
        </div>
    `;

    // مدیریت باز کردن منو با کلیک بر روی دکمه شروع در وسط صفحه
    mainContent.addEventListener('click', (e) => {
        const trigger = e.target.closest('.welcome-cta') || e.target.closest('.welcome-menu-trigger');
        if (trigger) {
            openSidebar();
        }
    });

    // If the page includes a local launcher (select + start button), set it up here.
    // This moves the small inline script that used to live in `index.html` into main.js
    function setupListenTapLauncher() {
        // If the page already contains the launcher elements, use them.
        let sel = document.getElementById('lt-lesson');
        let launch = document.getElementById('lt-launch');
        let containerEl = document.getElementById('lt-game-container');

        // If the page has a placeholder root, inject the launcher HTML into it when elements are missing.
        const root = document.getElementById('listen-tap-root');
        if (root && (!sel || !launch || !containerEl)) {
            root.innerHTML = `
                <div style="max-width:1100px;margin:12px auto;padding:12px;color:#fff">
                    <div style="display:flex;gap:8px;align-items:center;justify-content:flex-start">
                        <label for="lt-lesson">درس:</label>
                        <select id="lt-lesson"></select>
                        <button id="lt-launch" class="lt-btn" style="margin-left:8px">شروع بازی شنیداری</button>
                    </div>
                    <div id="lt-game-container"></div>
                </div>
            `;
            // re-query the elements now that they exist
            sel = document.getElementById('lt-lesson');
            launch = document.getElementById('lt-launch');
            containerEl = document.getElementById('lt-game-container');
        }
        if (!sel || !launch || !containerEl) return;
        const lessons = (typeof lessonsData !== 'undefined') ? lessonsData : (window.lessonsData || {});
        const lessonKeys = Object.keys(lessons);
        if (!lessonKeys.length) return;
        // populate select
        lessonKeys.forEach(key => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = lessons[key].title || key;
            sel.appendChild(opt);
        });
        // attach launcher
        launch.addEventListener('click', ()=>{
            const lessonId = sel.value || lessonKeys[0];
            initializeListenAndTapGame(containerEl, lessonId);
        });
    }

    // Run setup (if index.html contains the launcher UI)
    setupListenTapLauncher();
});