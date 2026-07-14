/* shared-layout.js - Unified Layout Logic & Responsive Navigation Menu */

// Load shared-auth.js dynamically relative to root directory to support all subfolders
(function() {
    const authScript = document.createElement('script');
    const path = window.location.pathname;
    let relativePath = './shared-auth.js';
    
    if (path.includes('/Persian/') || path.includes('/Persian2/') || path.includes('/math/') || path.includes('/science/') || path.includes('/quran/') || path.includes('/blog/') || path.includes('/exercises/')) {
        relativePath = '../shared-auth.js';
        if (path.includes('/exercises/grade-')) {
            relativePath = '../../shared-auth.js';
        }
    }
    
    authScript.src = relativePath;
    authScript.defer = true;
    document.head.appendChild(authScript);
})();

document.addEventListener('DOMContentLoaded', () => {
    // Helper function to get base prefix
    const getBasePrefix = () => {
        const path = window.location.pathname;
        let prefix = './';
        if (path.includes('/Persian/') || path.includes('/Persian2/') || path.includes('/math/') || path.includes('/science/') || path.includes('/quran/') || path.includes('/blog/') || path.includes('/exercises/')) {
            prefix = '../';
            if (path.includes('/exercises/grade-')) {
                prefix = '../../';
            }
        }
        return prefix;
    };

    const createHeaderHTML = (prefix) => {
        return `
        <div class="global-header-container">
            <header class="global-header" role="banner">
                <a href="${prefix}index.html" class="global-logo">
                    <span class="global-logo-icon">🎓</span>
                    <span class="global-logo-text">آموزش و پرورش بندر کیاشهر</span>
                </a>
                <nav class="global-nav" aria-label="منوی اصلی" role="navigation">
                    <a href="${prefix}index.html" class="global-nav-link">🏠 خانه</a>
                    <a href="${prefix}Persian/index.html" class="global-nav-link">📚 فارسی اول</a>
                    <a href="${prefix}Persian2/index.html" class="global-nav-link">📖 فارسی دوم</a>
                    <a href="${prefix}math/index.html" class="global-nav-link">🧮 ریاضی</a>
                    <a href="${prefix}science/index.html" class="global-nav-link">🔬 علوم</a>
                    <a href="${prefix}quran/index.html" class="global-nav-link">🕌 قرآن</a>
                    <a href="${prefix}exercises/exercises.html" class="global-nav-link">✍️ تمرین‌ها</a>
                    <a href="${prefix}blog/index.html" class="global-nav-link">📰 بلاگ</a>
                </nav>
                <button class="global-menu-toggle" aria-label="باز کردن منو">☰</button>
            </header>
        </div>`;
    };

    const createDrawerHTML = (prefix) => {
        return `
        <div class="global-drawer-overlay"></div>
        <div class="global-mobile-drawer" role="dialog" aria-modal="true" aria-label="منوی موبایل">
            <div class="global-drawer-header">
                <span class="global-drawer-title">منوی دسترسی سریع</span>
                <button class="global-drawer-close" aria-label="بستن منو">×</button>
            </div>
            <nav class="global-drawer-nav">
                <a href="${prefix}index.html" class="global-drawer-link">🏠 خانه</a>
                <a href="${prefix}Persian/index.html" class="global-drawer-link">📚 فارسی اول</a>
                <a href="${prefix}Persian2/index.html" class="global-drawer-link">📖 فارسی دوم</a>
                <a href="${prefix}math/index.html" class="global-drawer-link">🧮 ریاضی</a>
                <a href="${prefix}science/index.html" class="global-drawer-link">🔬 علوم</a>
                <a href="${prefix}quran/index.html" class="global-drawer-link">🕌 قرآن</a>
                <a href="${prefix}exercises/exercises.html" class="global-drawer-link">✍️ تمرین‌ها</a>
                <a href="${prefix}blog/index.html" class="global-drawer-link">📰 بلاگ</a>
            </nav>
        </div>`;
    };

    const createFooterHTML = (prefix) => {
        return `
        <footer class="global-footer" role="contentinfo">
            <div class="global-footer-grid">
                <div class="global-footer-col global-footer-brand">
                    <h3>آموزش و پرورش بندر کیاشهر</h3>
                    <p class="global-footer-desc">
                        پورتال جامع آموزشی اداره آموزش و پرورش بندر کیاشهر با هدف تسهیل، نوسازی و جذاب‌سازی فرایند یادگیری برای دانش‌آموزان دبستانی گیلان طراحی شده است. ما با بهره‌گیری از ابزارهای تعاملی مدرن، بازی‌های آموزشی خلاقانه و فیلم‌های جذاب، راه را برای موفقیت و شکوفایی کودکان گران‌قدر هموار می‌کنیم.
                    </p>
                </div>
                <div class="global-footer-col">
                    <h4 class="global-footer-title">دسترسی سریع</h4>
                    <ul class="global-footer-links">
                        <li><a href="${prefix}Persian/index.html" class="global-footer-link">فارسی کلاس اول</a></li>
                        <li><a href="${prefix}Persian2/index.html" class="global-footer-link">فارسی کلاس دوم</a></li>
                        <li><a href="${prefix}math/index.html" class="global-footer-link">ریاضی پایه اول</a></li>
                        <li><a href="${prefix}science/index.html" class="global-footer-link">علوم پایه اول</a></li>
                        <li><a href="${prefix}quran/index.html" class="global-footer-link">آموزش قرآن اول</a></li>
                    </ul>
                </div>
                <div class="global-footer-col">
                    <h4 class="global-footer-title">بخش‌های سایت</h4>
                    <ul class="global-footer-links">
                        <li><a href="${prefix}index.html" class="global-footer-link">صفحه اصلی خانه</a></li>
                        <li><a href="${prefix}exercises/exercises.html" class="global-footer-link">بانک تمرینات تعاملی</a></li>
                        <li><a href="${prefix}blog/index.html" class="global-footer-link">بلاگ و مقالات آموزشی</a></li>
                    </ul>
                </div>
                <div class="global-footer-col">
                    <h4 class="global-footer-title">راه‌های ارتباطی</h4>
                    <ul class="global-footer-contact">
                        <li class="global-footer-contact-item">
                            <span class="global-footer-contact-icon">📍</span>
                            <span>استان گیلان، بندر کیاشهر، اداره آموزش و پرورش بندر کیاشهر</span>
                        </li>
                        <li class="global-footer-contact-item">
                            <span class="global-footer-contact-icon">📞</span>
                            <span>تلفن: 013 4282 2202</span>
                        </li>
                        <li class="global-footer-contact-item">
                            <span class="global-footer-contact-icon">✉️</span>
                            <span>ایمیل: hassanmajidi1999@gmail.com</span>
                        </li>
                    </ul>
                    <div class="global-footer-socials">
                        <a href="https://www.aparat.com/majidischool" target="_blank" class="global-footer-social-btn aparat" title="آپارات"><i class="fa-brands fa-square-youtube"></i></a>
                        <a href="https://beta.bale.ai/@majidischool" target="_blank" class="global-footer-social-btn bale" title="بله"><i class="fa-solid fa-square-envelope"></i></a>
                        <a href="https://t.me/majidischool" target="_blank" class="global-footer-social-btn telegram" title="تلگرام"><i class="fa-brands fa-telegram"></i></a>
                        <a href="https://www.linkedin.com/in/hassan-majidi-45b186195" target="_blank" class="global-footer-social-btn linkedin" title="لینکدین"><i class="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
            <div class="global-footer-bottom">
                <div class="global-footer-copyright">
                    <p>© ۱۴۰۵ - تمام حقوق مادی و معنوی این پورتال آموزشی متعلق به اداره آموزش و پرورش بندر کیاشهر و طراح پلتفرم <a href="https://www.linkedin.com/in/hassan-majidi-45b186195" target="_blank" rel="noopener noreferrer">سید محمد حسن مجیدی کیوی</a> است.</p>
                </div>
                <div class="global-footer-bottom-links">
                    <a href="${prefix}index.html" class="global-footer-bottom-link">قوانین استفاده</a>
                    <a href="${prefix}index.html" class="global-footer-bottom-link">حریم خصوصی</a>
                </div>
            </div>
        </footer>`;
    };

    // Auto-inject layout CSS and FontAwesome if missing
    const prefix = getBasePrefix();
    if (!document.querySelector('link[href*="shared-layout.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = prefix + 'shared-layout.css';
        document.head.appendChild(link);
    }
    if (!document.querySelector('link[href*="font-awesome"]') && !document.querySelector('link[href*="all.min.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
        document.head.appendChild(link);
    }

    const path = window.location.pathname;
    if (path.includes('/exercises/grade-')) {
        // Render sleek floating control bar instead of heavy header/footer for ALL grade exercises
        if (!document.querySelector('.global-exercise-back-btn')) {
            const backBtn = document.createElement('a');
            backBtn.href = prefix + 'exercises/exercises.html';
            backBtn.className = 'global-exercise-back-btn';
            backBtn.title = 'برگشت به بانک تمرینات';
            backBtn.innerHTML = '<span>⬅️</span> <span>بانک تمرینات</span>';
            document.body.appendChild(backBtn);
        }
        
        if (!document.querySelector('.global-exercise-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'global-exercise-menu-btn global-menu-toggle';
            menuBtn.title = 'منوی دسترسی سریع';
            menuBtn.innerHTML = '<span>☰</span>';
            document.body.appendChild(menuBtn);
        }
        
        // Inject mobile drawer so the hamburger menu works
        if (!document.querySelector('.global-mobile-drawer')) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = createDrawerHTML(prefix);
            while (tempDiv.firstChild) {
                document.body.appendChild(tempDiv.firstChild);
            }
        }
    }

    // 1. Initialize Hamburger Menu / Mobile Drawer
    const initMobileMenu = () => {
        const toggleBtn = document.querySelector('.global-menu-toggle');
        const closeBtn = document.querySelector('.global-drawer-close');
        const drawer = document.querySelector('.global-mobile-drawer');
        const overlay = document.querySelector('.global-drawer-overlay');

        if (toggleBtn && drawer && overlay) {
            // Open Drawer
            toggleBtn.addEventListener('click', () => {
                drawer.classList.add('open');
                overlay.classList.add('visible');
            });

            // Close Drawer via Close Button
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    drawer.classList.remove('open');
                    overlay.classList.remove('visible');
                });
            }

            // Close Drawer via Overlay Click
            overlay.addEventListener('click', () => {
                drawer.classList.remove('open');
                overlay.classList.remove('visible');
            });
        }
    };

    // 2. Set Active State based on Current URL path
    const highlightActiveLinks = () => {
        const path = window.location.pathname;
        const allLinks = document.querySelectorAll('.global-nav-link, .global-drawer-link');

        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            // Resolve paths to match correctly
            let isActive = false;

            if (href.includes('Persian/index.html') && path.includes('/Persian/')) {
                isActive = true;
            } else if (href.includes('Persian2/index.html') && path.includes('/Persian2/')) {
                isActive = true;
            } else if (href.includes('math/index.html') && path.includes('/math/')) {
                isActive = true;
            } else if (href.includes('science/index.html') && path.includes('/science/')) {
                isActive = true;
            } else if (href.includes('quran/index.html') && path.includes('/quran/')) {
                isActive = true;
            } else if (href.includes('exercises/exercises.html') && path.includes('/exercises/')) {
                isActive = true;
            } else if (href.includes('blog/index.html') && path.includes('/blog/')) {
                isActive = true;
            } else if (href === '../index.html' || href === 'index.html' || href === '/') {
                // For Home page
                if (path === '/' || path.endsWith('/index.html') && !path.includes('/Persian') && !path.includes('/Persian2') && !path.includes('/math') && !path.includes('/science') && !path.includes('/quran') && !path.includes('/blog') && !path.includes('/exercises')) {
                    isActive = true;
                }
            }

            if (isActive) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Run layout features
    initMobileMenu();
    highlightActiveLinks();
});
