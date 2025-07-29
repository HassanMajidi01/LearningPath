document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const menuToggle = document.getElementById('menu-toggle'); // دکمه همبرگر

    // --- مدیریت منوی موبایل ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // بستن سایدبار با کلیک روی محتوای اصلی (اختیاری)
    mainContent.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });


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
            // بستن سایر زیرمنوهای باز
            const allSubmenus = lessonsList.querySelectorAll('.submenu');
            allSubmenus.forEach(sm => {
                if (sm !== submenu) {
                    sm.style.display = 'none';
                }
            });
            // باز و بسته کردن زیرمنوی فعلی
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    sidebar.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' && e.target.dataset.lesson) {
            const lessonId = e.target.dataset.lesson;
            const activity = e.target.dataset.activity;
            const lessonData = lessonsData[lessonId];
            loadActivity(activity, lessonData);
            
            // بستن سایدبار بعد از انتخاب یک گزینه در حالت موبایل
            if (window.innerWidth < 768) {
                sidebar.classList.remove('open');
            }
        }
    });

    function loadActivity(activity, data) {
        mainContent.innerHTML = ''; 
        switch (activity) {
            case 'flashcards':
                initializeFlashcards(mainContent, data.flashcardWords);
                break;
            case 'memory':
                const wordsForGame = data.memoryWords.slice(0, 8);
                const gameWords = [...wordsForGame, ...wordsForGame];
                initializeMemoryGame(mainContent, gameWords);
                break;
            case 'scramble':
                initializeSentenceScramble(mainContent, data.sentenceScramble);
                break;
            case 'video':
                mainContent.innerHTML = `<h2>ویدئوی آموزشی: ${data.title}</h2> <video controls width="100%"><source src="${data.videoSrc}" type="video/mp4"></video>`;
                break;
            case 'quiz':
                mainContent.innerHTML = `<h2>آزمون درس: ${data.title}</h2><p>برای شروع آزمون روی لینک زیر کلیک کنید.</p><a href="${data.quizLink}" target="_blank" class="button">شروع آزمون</a>`;
                break;
        }
    }

    // بارگذاری محتوای پیش‌فرض
    mainContent.innerHTML = `
        <h1>به سامانه آموزش زبان فارسی اول ابتدایی خوش آمدید!</h1>
        <p>لطفاً از منوی سمت راست، نشانه مورد نظر خود را انتخاب کنید. در دستگاه‌های موبایل، از دکمه منو در بالا سمت راست استفاده کنید.</p>
    `;
});