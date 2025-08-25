// main.js

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    // تابع برای ایجاد منوی تاشو در سایدبار
    function createSidebarMenu() {
        const menuList = document.createElement('ul');
        sidebar.innerHTML = '<h2>مباحث ریاضی</h2>';

        for (const topicId in mathTopicsData) {
            const topic = mathTopicsData[topicId];
            const listItem = document.createElement('li');
            listItem.classList.add('lesson-item');

            // ساختار هر آیتم در سایدبار
            listItem.innerHTML = `
                <div class="topic-title" data-topic-id="${topicId}">
                    ${topic.title}
                </div>
                <ul class="submenu">
                    <li><a href="#" data-topic-id="${topicId}" data-content-type="videos">ویدئوهای آموزشی</a></li>
                    <li><a href="#" data-topic-id="${topicId}" data-content-type="quiz">آزمونک</a></li>
                </ul>
            `;
            menuList.appendChild(listItem);
        }

        sidebar.appendChild(menuList);
    }

    // تابع برای نمایش ویدئوهای یک مبحث
    function displayVideos(topicId) {
        const topic = mathTopicsData[topicId];
        let contentHTML = '';

        if (topic.videos && topic.videos.length > 0) {
            contentHTML += '<h2>ویدئوهای آموزشی</h2>';
            topic.videos.forEach(video => {
                contentHTML += `
                    <div class="video-item">
                        <h3>${video.title}</h3>
                        <div class="video-container">
                            ${video.embedCode}
                        </div>
                    </div>
                `;
            });
        } else {
            contentHTML += '<p>ویدئویی برای این بخش وجود ندارد.</p>';
        }

        mainContent.innerHTML = contentHTML;
    }

    // تابع برای نمایش بخش آزمون
    function displayQuiz(topicId) {
        const topic = mathTopicsData[topicId];
        let contentHTML = `<h1>${topic.title}</h1>`;

        if (topic.quizLink) {
            contentHTML += `
                <div class="quiz-container">
                    <h2>آزمونک</h2>
                    <p>دانسته‌های خود را با کلیک روی دکمه زیر بسنجید.</p>
                    <a href="${topic.quizLink}" class="start-quiz-btn" target="_blank">شروع آزمون</a>
                </div>
            `;
        } else {
            contentHTML += '<p>آزمونی برای این بخش تعریف نشده است.</p>';
        }

        mainContent.innerHTML = contentHTML;
    }
    
    // تابع برای نمایش پیام خوش‌آمدگویی
    function showWelcomeMessage() {
         mainContent.innerHTML = `
            <div class="welcome-container">
                <div class="welcome-icon">📚</div>
                <h1>به کلاس ریاضی خوش آمدید!</h1>
                <p class="welcome-subtitle">برای شروع، یک مبحث را از منوی سمت راست انتخاب کنید.</p>
                <div class="welcome-cta">
                    <p>یک درس را انتخاب کن</p>
                    <span class="cta-arrow">👉</span>
                </div>
            </div>
        `;
    }

    // بستن سایدبار در حالت موبایل
    function closeMobileSidebar() {
        if (window.innerWidth < 768) {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('visible');
        }
    }

    // --- مدیریت رویدادها ---

    sidebar.addEventListener('click', (e) => {
        // اگر روی عنوان اصلی مبحث کلیک شد، منوی زیرمجموعه را باز/بسته کن
        const topicTitle = e.target.closest('.topic-title');
        if (topicTitle) {
            topicTitle.parentElement.classList.toggle('open');
            return;
        }

        // اگر روی لینک زیرمجموعه (ویدئو یا آزمون) کلیک شد
        const contentLink = e.target.closest('.submenu a');
        if (contentLink) {
            e.preventDefault();
            const topicId = contentLink.dataset.topicId;
            const contentType = contentLink.dataset.contentType;

            if (contentType === 'videos') {
                displayVideos(topicId);
            } else if (contentType === 'quiz') {
                displayQuiz(topicId);
            }
            closeMobileSidebar();
        }
    });

    // مدیریت باز و بسته شدن سایدبار در موبایل
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('visible');
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('visible');
    });

    // --- اجرای برنامه ---
    createSidebarMenu();
    showWelcomeMessage();
});