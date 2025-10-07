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

        mathTopicsData.forEach(theme => {
            const listItem = document.createElement('li');
            listItem.classList.add('lesson-item');

            let subMenuHTML = '<ul class="submenu">';
            theme.subtopics.forEach(subtopic => {
                subMenuHTML += `<li><a href="#" data-theme-id="${theme.id}" data-subtopic-id="${subtopic.id}">${subtopic.title}</a></li>`;
            });
            subMenuHTML += '</ul>';

            listItem.innerHTML = `
                <div class="topic-title" data-theme-id="${theme.id}">
                    ${theme.title}
                </div>
                ${subMenuHTML}
            `;
            menuList.appendChild(listItem);
        });

        sidebar.appendChild(menuList);
    }

    // تابع برای نمایش محتوای یک زیرمجموعه
    function displayContent(themeId, subtopicId) {
        const theme = mathTopicsData.find(t => t.id === themeId);
        if (!theme) return;

        const subtopic = theme.subtopics.find(st => st.id === subtopicId);
        if (!subtopic) return;

        mainContent.innerHTML = ''; // Clear previous content

        switch (subtopic.type) {
            case 'game':
                // Pass the game's specific data object
                initializeCountingGame(mainContent, subtopic.data);
                break;
            case 'pattern-game':
                initializePatternGame(mainContent, subtopic.data);
                break;
            case 'sudoku-game': // ✨ اضافه شدن کیس جدید برای سودوکو ✨
                initializeSudokuGame(mainContent, subtopic.data);
                break;
            case 'videos':
                displayVideos(subtopic.data);
                break;
            case 'quiz':
                displayQuiz(subtopic.data);
                break;
            default:
                mainContent.innerHTML = '<h2>محتوا یافت نشد</h2>';
        }
    }

    // تابع برای نمایش ویدئوها
    function displayVideos(data) {
        let contentHTML = '<h2>ویدئوهای آموزشی</h2>';
        if (data.videos && data.videos.length > 0) {
            data.videos.forEach(video => {
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

    // تابع برای نمایش آزمون
    function displayQuiz(data) {
        let contentHTML = `<h2>آزمونک</h2>`;
        if (data.quizLink) {
            contentHTML += `
                <div class="quiz-container">
                    <p>دانسته‌های خود را با کلیک روی دکمه زیر بسنجید.</p>
                    <a href="${data.quizLink}" class="start-quiz-btn" target="_blank">شروع آزمون</a>
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
        const topicTitle = e.target.closest('.topic-title');
        if (topicTitle) {
            // Toggle the 'open' class on the parent <li>
            topicTitle.parentElement.classList.toggle('open');
            return;
        }

        // اگر روی لینک زیرمجموعه (ویدئو، آزمون یا بازی) کلیک شد
        const contentLink = e.target.closest('.submenu a');
        if (contentLink) {
            e.preventDefault();
            const themeId = contentLink.dataset.themeId;
            const subtopicId = contentLink.dataset.subtopicId;
            
            displayContent(themeId, subtopicId);
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