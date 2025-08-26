// main.js

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    // یک المنت Audio برای پخش صدا
    const audioPlayer = new Audio();

    // تابع برای ایجاد منوی تاشو در سایدبار
    function createSidebarMenu() {
        const menuList = document.createElement('ul');
        sidebar.innerHTML = '<h2>مباحث قرآن</h2>';

        for (const topicId in quranTopicsData) {
            const topic = quranTopicsData[topicId];
            const listItem = document.createElement('li');
            listItem.classList.add('lesson-item');

            // ساختار هر آیتم در سایدبار - فقط عنوان لوحه
            listItem.innerHTML = `
                <div class="topic-title" data-topic-id="${topicId}">
                    ${topic.title}
                </div>
            `;
            menuList.appendChild(listItem);
        }

        sidebar.appendChild(menuList);
    }

    // تابع برای نمایش کاشی‌های یک مبحث
    function displayTiles(topicId) {
        const topic = quranTopicsData[topicId];
        let contentHTML = `<h1 class="topic-main-title">${topic.title}</h1>`;

        if (topic.tiles && topic.tiles.length > 0) {
            contentHTML += '<div class="tiles-container">';
            topic.tiles.forEach((tile, index) => {
                contentHTML += `
                    <div class="quran-tile" data-audio="${tile.audio}">
                        <span>${tile.text}</span>
                    </div>
                `;
            });
            contentHTML += '</div>';
        } else {
            contentHTML += '<p>کاشی‌ای برای این بخش وجود ندارد.</p>';
        }

        mainContent.innerHTML = contentHTML;
        
        // افزودن شنونده رویداد به کاشی‌ها پس از بارگذاری HTML
        document.querySelectorAll('.quran-tile').forEach(tileElement => {
            tileElement.addEventListener('click', () => {
                const audioSrc = tileElement.dataset.audio;
                if (audioSrc) {
                    audioPlayer.src = audioSrc;
                    audioPlayer.play();
                }
            });
        });
    }
    
    // تابع برای نمایش پیام خوش‌آمدگویی
    function showWelcomeMessage() {
         mainContent.innerHTML = `
            <div class="welcome-container">
                <div class="welcome-icon">📚</div>
                <h1>به کلاس قرآن خوش آمدید!</h1>
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
        // اگر روی عنوان اصلی مبحث کلیک شد
        const topicTitle = e.target.closest('.topic-title');
        if (topicTitle) {
            const topicId = topicTitle.dataset.topicId;
            displayTiles(topicId); // نمایش کاشی‌ها
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