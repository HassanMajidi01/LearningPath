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
