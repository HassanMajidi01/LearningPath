/* shared-auth.js - Unified Authentication, Profiling, Progress Tracking, and Teacher Panel */

(function () {
    // 1. Inject Styles dynamically to keep pages clean and maintain high-fidelity Persian theme
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* --- Brand Colors & Variables --- */
        :root {
            --edu-primary: #10b981; /* Emerald green represents growth, learning, classroom */
            --edu-primary-dark: #059669;
            --edu-accent: #f59e0b; /* Amber yellow for scores and highlights */
            --edu-dark-bg: #1e293b;
            --edu-card-bg: #ffffff;
            --edu-text-dark: #0f172a;
            --edu-text-muted: #64748b;
            --edu-border: #e2e8f0;
        }

        /* --- Auth & Profile Button Styles in Navbars --- */
        .edu-auth-btn {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            background: linear-gradient(135deg, var(--edu-primary) 0%, var(--edu-primary-dark) 100%) !important;
            color: #ffffff !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            padding: 8px 16px !important;
            border-radius: 50px !important;
            font-family: 'Vazirmatn', sans-serif !important;
            font-weight: 700 !important;
            font-size: 0.9rem !important;
            cursor: pointer !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2) !important;
            text-decoration: none !important;
            margin-right: 12px !important;
            margin-left: 12px !important;
        }
        .edu-auth-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35) !important;
        }
        .edu-auth-btn:active {
            transform: translateY(1px) !important;
        }

        /* Mobile specific style for auth button inside drawer */
        .edu-auth-drawer-btn {
            display: flex !important;
            width: 90% !important;
            margin: 15px auto !important;
            padding: 12px 20px !important;
            border-radius: 12px !important;
            text-align: center !important;
            justify-content: center !important;
            font-size: 1rem !important;
        }

        /* --- Modal Overlay & Base Layout --- */
        .edu-modal-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(15, 23, 42, 0.6) !important;
            backdrop-filter: blur(8px) !important;
            z-index: 100000 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            opacity: 0 !important;
            pointer-events: none !important;
            transition: opacity 0.3s ease !important;
            direction: rtl !important;
        }
        .edu-modal-overlay.active {
            opacity: 1 !important;
            pointer-events: auto !important;
        }
        .edu-modal-container {
            background: #ffffff !important;
            width: 90% !important;
            max-width: 600px !important;
            max-height: 90vh !important;
            border-radius: 24px !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            overflow-y: auto !important;
            transform: scale(0.9) translateY(20px) !important;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
            border: 1px solid rgba(255, 255, 255, 0.8) !important;
            padding: 30px !important;
            color: var(--edu-text-dark) !important;
            font-family: 'Vazirmatn', sans-serif !important;
        }
        .edu-modal-overlay.active .edu-modal-container {
            transform: scale(1) translateY(0) !important;
        }

        /* --- Modal Header & Controls --- */
        .edu-modal-header {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            margin-bottom: 24px !important;
            border-bottom: 2px solid var(--edu-border) !important;
            padding-bottom: 15px !important;
        }
        .edu-modal-title {
            font-size: 1.4rem !important;
            font-weight: 800 !important;
            color: var(--edu-text-dark) !important;
            margin: 0 !important;
        }
        .edu-modal-close {
            background: var(--edu-border) !important;
            border: none !important;
            color: var(--edu-text-dark) !important;
            width: 36px !important;
            height: 36px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 1.2rem !important;
            font-weight: 700 !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
        }
        .edu-modal-close:hover {
            background: #cbd5e1 !important;
            transform: scale(1.05) !important;
        }

        /* --- Form Fields & Auth Tabs --- */
        .edu-auth-tabs {
            display: flex !important;
            background: #f1f5f9 !important;
            border-radius: 12px !important;
            padding: 5px !important;
            margin-bottom: 24px !important;
            gap: 5px !important;
        }
        .edu-auth-tab {
            flex: 1 !important;
            text-align: center !important;
            padding: 10px !important;
            border-radius: 8px !important;
            font-weight: 700 !important;
            color: var(--edu-text-muted) !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            user-select: none !important;
        }
        .edu-auth-tab.active {
            background: #ffffff !important;
            color: var(--edu-primary-dark) !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
        }

        .edu-form-group {
            margin-bottom: 18px !important;
            text-align: right !important;
        }
        .edu-form-label {
            display: block !important;
            font-weight: 700 !important;
            font-size: 0.9rem !important;
            margin-bottom: 8px !important;
            color: var(--edu-text-dark) !important;
        }
        .edu-form-input {
            width: 100% !important;
            padding: 12px 16px !important;
            border: 2px solid var(--edu-border) !important;
            border-radius: 12px !important;
            font-family: 'Vazirmatn', sans-serif !important;
            font-size: 1rem !important;
            color: var(--edu-text-dark) !important;
            background: #f8fafc !important;
            outline: none !important;
            transition: all 0.2s ease !important;
            box-sizing: border-box !important;
        }
        .edu-form-input:focus {
            border-color: var(--edu-primary) !important;
            background: #ffffff !important;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
        }
        .edu-form-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border: 2px solid var(--edu-border) !important;
            border-radius: 12px !important;
            font-family: 'Vazirmatn', sans-serif !important;
            font-size: 1rem !important;
            background: #f8fafc !important;
            outline: none !important;
            transition: all 0.2s ease !important;
            box-sizing: border-box !important;
        }
        .edu-form-select:focus {
            border-color: var(--edu-primary) !important;
        }

        .edu-submit-btn {
            width: 100% !important;
            padding: 14px !important;
            background: linear-gradient(135deg, var(--edu-primary) 0%, var(--edu-primary-dark) 100%) !important;
            color: #ffffff !important;
            border: none !important;
            border-radius: 12px !important;
            font-family: 'Vazirmatn', sans-serif !important;
            font-weight: 700 !important;
            font-size: 1.1rem !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            margin-top: 10px !important;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2) !important;
        }
        .edu-submit-btn:hover {
            opacity: 0.95 !important;
            transform: translateY(-1px) !important;
        }

        /* --- Alert Notifications --- */
        .edu-toast {
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            background: #0f172a !important;
            color: #ffffff !important;
            padding: 16px 24px !important;
            border-radius: 16px !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3) !important;
            z-index: 200000 !important;
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            font-family: 'Vazirmatn', sans-serif !important;
            font-weight: 700 !important;
            direction: rtl !important;
            transform: translateY(100px) scale(0.9) !important;
            opacity: 0 !important;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        .edu-toast.active {
            transform: translateY(0) scale(1) !important;
            opacity: 1 !important;
        }

        /* --- Profile Dashboard & Teacher Panel --- */
        .edu-profile-card {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%) !important;
            border-radius: 18px !important;
            padding: 20px !important;
            margin-bottom: 24px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            border: 1px solid rgba(16, 185, 129, 0.2) !important;
        }
        .edu-id-badge {
            background: var(--edu-primary-dark) !important;
            color: #ffffff !important;
            padding: 6px 14px !important;
            border-radius: 50px !important;
            font-weight: 800 !important;
            font-size: 0.95rem !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
        }
        .edu-id-badge:hover {
            transform: scale(1.05) !important;
        }

        .edu-stats-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            margin-bottom: 24px !important;
        }
        @media (min-width: 480px) {
            .edu-stats-grid {
                grid-template-columns: repeat(4, 1fr) !important;
            }
        }
        .edu-stat-box {
            background: #f8fafc !important;
            border: 1px solid var(--edu-border) !important;
            border-radius: 16px !important;
            padding: 15px !important;
            text-align: center !important;
        }
        .edu-stat-value {
            font-size: 1.6rem !important;
            font-weight: 800 !important;
            color: var(--edu-primary-dark) !important;
            line-height: 1.2 !important;
        }
        .edu-stat-label {
            font-size: 0.75rem !important;
            color: var(--edu-text-muted) !important;
            margin-top: 5px !important;
            font-weight: 700 !important;
        }

        /* Tabs inside Profile Dashboard */
        .edu-profile-tabs {
            display: flex !important;
            border-bottom: 2px solid var(--edu-border) !important;
            margin-bottom: 18px !important;
            gap: 15px !important;
        }
        .edu-profile-tab-btn {
            padding: 10px 5px !important;
            font-weight: 700 !important;
            font-size: 0.95rem !important;
            color: var(--edu-text-muted) !important;
            cursor: pointer !important;
            border-bottom: 3px solid transparent !important;
            transition: all 0.2s ease !important;
            user-select: none !important;
        }
        .edu-profile-tab-btn.active {
            color: var(--edu-primary-dark) !important;
            border-bottom-color: var(--edu-primary) !important;
        }

        /* Timelines & Items */
        .edu-timeline {
            max-height: 280px !important;
            overflow-y: auto !important;
            padding-right: 5px !important;
        }
        .edu-timeline-item {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 12px 15px !important;
            background: #f8fafc !important;
            border-radius: 12px !important;
            margin-bottom: 10px !important;
            border-right: 4px solid var(--edu-primary) !important;
            box-sizing: border-box !important;
        }
        .edu-timeline-item.lesson {
            border-right-color: #3b82f6 !important; /* Blue for lessons */
        }
        .edu-timeline-item.exercise {
            border-right-color: var(--edu-primary) !important; /* Green for exercises */
        }
        .edu-badge {
            font-size: 0.75rem !important;
            font-weight: 700 !important;
            padding: 3px 8px !important;
            border-radius: 6px !important;
            margin-right: 6px !important;
        }
        .edu-badge-math { background: #fee2e2 !important; color: #ef4444 !important; }
        .edu-badge-science { background: #e0e7ff !important; color: #4f46e5 !important; }
        .edu-badge-Persian { background: #fef3c7 !important; color: #d97706 !important; }
        .edu-badge-quran { background: #ecfdf5 !important; color: #059669 !important; }

        /* --- Teacher's Panel Workspace --- */
        .edu-teacher-search-box {
            display: flex !important;
            gap: 10px !important;
            margin-bottom: 24px !important;
        }
        .edu-search-btn {
            background: var(--edu-primary-dark) !important;
            color: #ffffff !important;
            border: none !important;
            padding: 0 25px !important;
            border-radius: 12px !important;
            font-family: 'Vazirmatn', sans-serif !important;
            font-weight: 700 !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
        }
        .edu-search-btn:hover {
            background: var(--edu-primary) !important;
        }

        .edu-feedback-box {
            margin-top: 20px !important;
            background: #f8fafc !important;
            border-radius: 16px !important;
            padding: 18px !important;
            border: 1px dashed var(--edu-primary) !important;
        }

        /* --- Universal Progress Tracking Widget (Floating) --- */
        .edu-tracker-widget {
            position: fixed !important;
            bottom: 24px !important;
            right: 24px !important;
            z-index: 99999 !important;
            background: linear-gradient(135deg, var(--edu-accent) 0%, #d97706 100%) !important;
            color: #ffffff !important;
            border: 1px solid rgba(255, 255, 255, 0.25) !important;
            padding: 10px 18px !important;
            border-radius: 50px !important;
            font-family: 'Vazirmatn', sans-serif !important;
            font-weight: 800 !important;
            font-size: 0.85rem !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            cursor: pointer !important;
            box-shadow: 0 10px 25px -5px rgba(217, 119, 6, 0.4) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            direction: rtl !important;
            animation: bounceTracker 2s infinite alternate !important;
        }
        .edu-tracker-widget:hover {
            transform: translateY(-3px) scale(1.04) !important;
            box-shadow: 0 12px 28px -5px rgba(217, 119, 6, 0.5) !important;
        }
        .edu-tracker-widget:active {
            transform: translateY(1px) scale(0.98) !important;
        }
        .edu-tracker-widget.completed {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.4) !important;
            animation: none !important;
            cursor: default !important;
        }

        @keyframes bounceTracker {
            0% { transform: translateY(0); }
            100% { transform: translateY(-6px); }
        }

        /* --- Custom Interactive SVG Progress Chart --- */
        .edu-chart-container {
            background: #fafafb !important;
            border: 1px solid var(--edu-border) !important;
            border-radius: 18px !important;
            padding: 15px !important;
            margin-bottom: 24px !important;
            text-align: center !important;
        }
        .edu-chart-title {
            font-size: 0.85rem !important;
            font-weight: 700 !important;
            color: var(--edu-text-muted) !important;
            margin-bottom: 10px !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
        }
        .edu-chart-svg {
            width: 100% !important;
            height: 160px !important;
            overflow: visible !important;
        }
        .edu-chart-point {
            cursor: pointer !important;
            transition: r 0.2s ease, fill 0.2s ease !important;
        }
        .edu-chart-point:hover {
            r: 7 !important;
            fill: var(--edu-accent) !important;
        }

        /* Star Rating Selection */
        .edu-stars-container {
            display: flex !important;
            gap: 5px !important;
            direction: ltr !important;
            justify-content: center !important;
            margin-top: 5px !important;
        }
        .edu-star-input {
            font-size: 1.5rem !important;
            cursor: pointer !important;
            color: #cbd5e1 !important;
            transition: color 0.15s ease !important;
        }
        .edu-star-input.active {
            color: var(--edu-accent) !important;
        }

        /* Teacher feedback lists */
        .edu-feedback-item {
            background: #fffbeb !important;
            border-right: 4px solid var(--edu-accent) !important;
            border-radius: 12px !important;
            padding: 12px 15px !important;
            margin-bottom: 10px !important;
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
        }
        .edu-feedback-author {
            font-weight: 800 !important;
            color: #b45309 !important;
            margin-bottom: 4px !important;
            font-size: 0.8rem !important;
        }

        /* --- Badge and Achievement System Styles --- */
        .edu-badges-grid {
            display: grid !important;
            grid-template-columns: repeat(1, 1fr) !important;
            gap: 16px !important;
            padding: 8px 4px !important;
        }
        @media (min-width: 480px) {
            .edu-badges-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }
        .edu-badge-card {
            background: #ffffff !important;
            border: 2px solid var(--edu-border) !important;
            border-radius: 20px !important;
            padding: 16px !important;
            display: flex !important;
            align-items: center !important;
            gap: 14px !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            position: relative !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
            direction: rtl !important;
            text-align: right !important;
            box-sizing: border-box !important;
        }
        .edu-badge-card.unlocked {
            border-color: rgba(16, 185, 129, 0.3) !important;
            background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%) !important;
            box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.08) !important;
        }
        .edu-badge-card.unlocked:hover {
            transform: translateY(-4px) scale(1.02) !important;
            border-color: var(--edu-primary) !important;
            box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.15) !important;
        }
        .edu-badge-card.locked {
            border-color: #f1f5f9 !important;
            background: #fafafc !important;
            opacity: 0.75 !important;
        }
        .edu-badge-icon-wrap {
            width: 54px !important;
            height: 54px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 1.8rem !important;
            flex-shrink: 0 !important;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
            transition: transform 0.3s ease !important;
        }
        .edu-badge-card.unlocked:hover .edu-badge-icon-wrap {
            transform: rotate(12deg) scale(1.1) !important;
        }
        .edu-badge-card.locked .edu-badge-icon-wrap {
            background: #e2e8f0 !important;
            box-shadow: none !important;
            filter: grayscale(100%) !important;
        }
        .edu-badge-info {
            flex-grow: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 4px !important;
        }
        .edu-badge-title {
            font-size: 0.95rem !important;
            font-weight: 800 !important;
            color: var(--edu-text-dark) !important;
            margin: 0 !important;
            display: flex !important;
            align-items: center !important;
            gap: 6px !important;
        }
        .edu-badge-card.locked .edu-badge-title {
            color: #94a3b8 !important;
        }
        .edu-badge-desc {
            font-size: 0.75rem !important;
            color: var(--edu-text-muted) !important;
            margin: 0 !important;
            line-height: 1.4 !important;
        }
        .edu-badge-card.locked .edu-badge-desc {
            color: #cbd5e1 !important;
        }
        .edu-badge-status-pill {
            align-self: flex-start !important;
            font-size: 0.7rem !important;
            font-weight: 800 !important;
            padding: 2px 8px !important;
            border-radius: 50px !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 4px !important;
            margin-top: 4px !important;
        }
        .edu-badge-status-pill.unlocked {
            background: #dcfce7 !important;
            color: #15803d !important;
        }
        .edu-badge-status-pill.locked {
            background: #f1f5f9 !important;
            color: #64748b !important;
        }
    `;
    document.head.appendChild(styleElement);

    // 2. Initialize App and DOM elements
    let currentUser = null;

    // Load active session on init
    try {
        const stored = localStorage.getItem('edu_kiashahr_user');
        if (stored) {
            currentUser = JSON.parse(stored);
        }
    } catch (e) {
        console.error("Session load error:", e);
    }

    // Modal Manager
    const createModalStructure = () => {
        const overlay = document.createElement('div');
        overlay.className = 'edu-modal-overlay';
        overlay.id = 'eduGlobalModal';
        overlay.innerHTML = `
            <div class="edu-modal-container">
                <div class="edu-modal-header">
                    <h3 class="edu-modal-title" id="eduModalTitle">ثبت‌نام / ورود</h3>
                    <button class="edu-modal-close" id="eduModalClose">×</button>
                </div>
                <div class="edu-modal-body" id="eduModalBody"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('eduModalClose').addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    };

    const showModal = (title, htmlContent) => {
        const overlay = document.getElementById('eduGlobalModal') || createModalOverlay();
        document.getElementById('eduModalTitle').innerText = title;
        document.getElementById('eduModalBody').innerHTML = htmlContent;
        overlay.classList.add('active');
    };

    const closeModal = () => {
        const overlay = document.getElementById('eduGlobalModal');
        if (overlay) overlay.classList.remove('active');
    };

    const createModalOverlay = () => {
        createModalStructure();
        return document.getElementById('eduGlobalModal');
    };

    // Show Notification Toast
    const showToast = (message, isSuccess = true) => {
        let toast = document.getElementById('eduGlobalToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'edu-toast';
            toast.id = 'eduGlobalToast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `
            <span style="font-size: 1.3rem;">${isSuccess ? '✅' : '❌'}</span>
            <span>${message}</span>
        `;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3500);
    };

    // 3. Inject buttons into existing headers (Desktop & Mobile)
    const injectHeaderButtons = () => {
        const desktopNav = document.querySelector('.global-nav');
        const mobileNav = document.querySelector('.global-drawer-nav');

        // Remove any old buttons to avoid duplication
        document.querySelectorAll('.edu-auth-btn-mounted').forEach(el => el.remove());

        if (desktopNav) {
            const btn = document.createElement('button');
            btn.className = 'edu-auth-btn edu-auth-btn-mounted';
            btn.id = 'eduDesktopAuthBtn';
            updateAuthButtonContent(btn);
            btn.addEventListener('click', handleAuthButtonClick);
            desktopNav.appendChild(btn);
        }

        if (mobileNav) {
            const btn = document.createElement('button');
            btn.className = 'edu-auth-btn edu-auth-drawer-btn edu-auth-btn-mounted';
            btn.id = 'eduMobileAuthBtn';
            updateAuthButtonContent(btn);
            btn.addEventListener('click', () => {
                // Close mobile drawer first
                const drawer = document.querySelector('.global-mobile-drawer');
                const overlay = document.querySelector('.global-drawer-overlay');
                if (drawer) drawer.classList.remove('open');
                if (overlay) overlay.classList.remove('visible');
                handleAuthButtonClick();
            });
            mobileNav.appendChild(btn);
        }
    };

    const updateAuthButtonContent = (btn) => {
        if (currentUser) {
            if (currentUser.role === 'teacher') {
                btn.innerHTML = `🔬 پنل معلم (${currentUser.username})`;
            } else {
                btn.innerHTML = `🎓 پروفایل من (${currentUser.username})`;
            }
        } else {
            btn.innerHTML = `👤 ورود / عضویت`;
        }
    };

    // 4. Handle clicks on Auth / Profile Button
    const handleAuthButtonClick = () => {
        if (!currentUser) {
            openAuthModal();
        } else if (currentUser.role === 'teacher') {
            openTeacherPanelModal();
        } else {
            openStudentProfileModal();
        }
    };

    // --- Tab Switching inside Auth modal ---
    window.switchAuthTab = (tab) => {
        const loginTab = document.getElementById('tabLogin');
        const signupTab = document.getElementById('tabSignup');
        const container = document.getElementById('authFieldsContainer');

        if (tab === 'login') {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            container.innerHTML = `
                <div class="edu-form-group">
                    <label class="edu-form-label">آدرس ایمیل</label>
                    <input type="email" id="authEmail" class="edu-form-input" placeholder="student@kiashahr.ir" required>
                </div>
                <div class="edu-form-group">
                    <label class="edu-form-label">رمز عبور</label>
                    <input type="password" id="authPassword" class="edu-form-input" placeholder="••••••••" required>
                </div>
            `;
            document.getElementById('authSubmitBtn').innerText = 'ورود به حساب کاربری';
            document.getElementById('authSubmitBtn').setAttribute('onclick', 'submitLogin()');
        } else {
            loginTab.classList.add('active'); // Wait, make active
            loginTab.classList.remove('active');
            signupTab.classList.add('active');
            container.innerHTML = `
                <div class="edu-form-group">
                    <label class="edu-form-label">نام و نام خانوادگی</label>
                    <input type="text" id="authUsername" class="edu-form-input" placeholder="امیرحسین علیزاده" required>
                </div>
                <div class="edu-form-group">
                    <label class="edu-form-label">آدرس ایمیل</label>
                    <input type="email" id="authEmail" class="edu-form-input" placeholder="student@kiashahr.ir" required>
                </div>
                <div class="edu-form-group">
                    <label class="edu-form-label">رمز عبور</label>
                    <input type="password" id="authPassword" class="edu-form-input" placeholder="حداقل ۶ کاراکتر" required>
                </div>
                <div class="edu-form-group">
                    <label class="edu-form-label">نقش کاربر</label>
                    <select id="authRole" class="edu-form-select">
                        <option value="student">دانش‌آموز 🎓</option>
                        <option value="teacher">دبیر / معلم 🔬</option>
                    </select>
                </div>
            `;
            document.getElementById('authSubmitBtn').innerText = 'ثبت‌نام و عضویت';
            document.getElementById('authSubmitBtn').setAttribute('onclick', 'submitSignup()');
        }
    };

    // Open Login/Signup Modal
    const openAuthModal = () => {
        const authHtml = `
            <div class="edu-auth-tabs">
                <div class="edu-auth-tab active" id="tabLogin" onclick="switchAuthTab('login')">ورود کاربران</div>
                <div class="edu-auth-tab" id="tabSignup" onclick="switchAuthTab('signup')">ثبت‌نام جدید</div>
            </div>
            <div id="authFieldsContainer">
                <div class="edu-form-group">
                    <label class="edu-form-label">آدرس ایمیل</label>
                    <input type="email" id="authEmail" class="edu-form-input" placeholder="student@kiashahr.ir" required>
                </div>
                <div class="edu-form-group">
                    <label class="edu-form-label">رمز عبور</label>
                    <input type="password" id="authPassword" class="edu-form-input" placeholder="••••••••" required>
                </div>
            </div>
            <button type="button" class="edu-submit-btn" id="authSubmitBtn" onclick="submitLogin()">ورود به حساب کاربری</button>
            <p style="text-align: center; font-size: 0.8rem; color: var(--edu-text-muted); margin-top: 15px;">
                💡 برای ورود تستی معلمان از ایمیل <b>teacher@kiashahr.ir</b> و دانش‌آموزان از <b>student@kiashahr.ir</b> با رمز <b>123456</b> استفاده کنید.
            </p>
        `;
        showModal('ورود و ثبت‌نام در پلتفرم', authHtml);
    };

    // Form submission handlers
    window.submitLogin = async () => {
        const email = document.getElementById('authEmail').value.trim();
        const password = document.getElementById('authPassword').value;

        if (!email || !password) {
            showToast('لطفاً ایمیل و رمز عبور را پر کنید.', false);
            return;
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                currentUser = data.user;
                localStorage.setItem('edu_kiashahr_user', JSON.stringify(currentUser));
                showToast(data.message, true);
                closeModal();
                injectHeaderButtons();
                // If on an exercise/lesson page, trigger a refresh of widgets
                initProgressWidgets();
            } else {
                showToast(data.message, false);
            }
        } catch (e) {
            showToast('خطا در اتصال به سرور', false);
        }
    };

    window.submitSignup = async () => {
        const username = document.getElementById('authUsername').value.trim();
        const email = document.getElementById('authEmail').value.trim();
        const password = document.getElementById('authPassword').value;
        const role = document.getElementById('authRole').value;

        if (!username || !email || !password) {
            showToast('لطفاً تمام فیلدها را پر کنید.', false);
            return;
        }

        if (password.length < 6) {
            showToast('رمز عبور باید حداقل ۶ کاراکتر باشد.', false);
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role })
            });
            const data = await res.json();
            if (data.success) {
                currentUser = data.user;
                localStorage.setItem('edu_kiashahr_user', JSON.stringify(currentUser));
                showToast(data.message, true);
                closeModal();
                injectHeaderButtons();
                initProgressWidgets();
            } else {
                showToast(data.message, false);
            }
        } catch (e) {
            showToast('خطا در اتصال به سرور', false);
        }
    };

    window.logOut = () => {
        currentUser = null;
        localStorage.removeItem('edu_kiashahr_user');
        showToast('با موفقیت از حساب خود خارج شدید.', true);
        closeModal();
        injectHeaderButtons();
        // Clear floating widgets
        const existingWidget = document.getElementById('eduFloatingTracker');
        if (existingWidget) existingWidget.remove();
    };

    // Copy Student ID
    window.copyStudentId = (id) => {
        navigator.clipboard.writeText(id);
        showToast('شناسه دانش‌آموز کپی شد: ' + id, true);
    };

    // --- Student Profile Modal Workspace ---
    const openStudentProfileModal = async () => {
        showModal('پروفایل آموزشی من', `
            <div style="text-align: center; padding: 30px;">
                <div style="font-size: 2rem; animation: spin 1s infinite linear;">🔄</div>
                <p style="margin-top: 15px; font-weight: 700;">درحال دریافت اطلاعات کارنامه...</p>
            </div>
        `);

        try {
            const res = await fetch(`/api/student/self/${currentUser.id}`);
            const data = await res.json();

            if (!data.success) {
                showToast(data.message, false);
                closeModal();
                return;
            }

            const progress = data.progress || [];
            const feedbacks = data.feedback || [];

            // Calculate student metrics
            const totalCompleted = progress.length;
            const totalPoints = progress.reduce((sum, item) => sum + (item.score || 0), 0);
            const totalStars = progress.reduce((sum, item) => sum + (item.stars || 0), 0);

            // Separate into lists
            let timelineHtml = '';
            if (progress.length === 0) {
                timelineHtml = `
                    <div style="text-align: center; color: var(--edu-text-muted); padding: 30px 0;">
                        <span style="font-size: 2.5rem;">✍️</span>
                        <p style="margin-top: 10px; font-weight: 700;">هنوز هیچ تمرین یا درسی را ثبت نکرده‌ای!</p>
                        <p style="font-size: 0.85rem;">برای شروع، وارد یکی از کتاب‌ها یا تمرین‌ها شو و روی دکمه ثبت پیشرفت بزن.</p>
                    </div>
                `;
            } else {
                // Sort by timestamp desc
                const sortedProgress = [...progress].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                sortedProgress.forEach(item => {
                    const isLesson = item.type === 'lesson';
                    const icon = isLesson ? '📖' : '🎮';
                    const dateStr = new Date(item.timestamp).toLocaleDateString('fa-IR');
                    timelineHtml += `
                        <div class="edu-timeline-item ${item.type}">
                            <div>
                                <span style="font-size: 1.1rem; margin-left: 8px;">${icon}</span>
                                <b>${item.title}</b>
                                <div style="margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                                    <span class="edu-badge edu-badge-${item.subject}">${getSubjectFarsi(item.subject)}</span>
                                    <span style="font-size: 0.75rem; color: var(--edu-text-muted);">${dateStr}</span>
                                </div>
                            </div>
                            <div style="text-align: left;">
                                <div style="font-weight: 800; color: var(--edu-primary-dark);">${item.score} امتیاز</div>
                                <div style="color: var(--edu-accent); font-size: 0.85rem;">${'★'.repeat(item.stars)}</div>
                            </div>
                        </div>
                    `;
                });
            }

            // Feedbacks Html
            let feedbackHtml = '';
            if (feedbacks.length === 0) {
                feedbackHtml = `
                    <div style="text-align: center; color: var(--edu-text-muted); padding: 30px 0;">
                        <span style="font-size: 2.5rem;">✉️</span>
                        <p style="margin-top: 10px; font-weight: 700;">هیچ بازخورد یا پیامی از معلم نداری.</p>
                        <p style="font-size: 0.85rem;">شناسه مخصوص خود را به معلمت بده تا با بررسی پیشرفتت برات پیام بنویسه!</p>
                    </div>
                `;
            } else {
                // Sort desc
                const sortedFeedback = [...feedbacks].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                sortedFeedback.forEach(f => {
                    const dateStr = new Date(f.timestamp).toLocaleDateString('fa-IR');
                    feedbackHtml += `
                        <div class="edu-feedback-item">
                            <div class="edu-feedback-author">
                                👤 فرستنده: ${f.teacherName} | <span style="font-weight: normal; color: var(--edu-text-muted);">${dateStr}</span>
                            </div>
                            <div style="color: var(--edu-text-dark); font-weight: 700;">
                                ${f.comment}
                            </div>
                        </div>
                    `;
                });
            }

            const profileHtml = `
                <div class="edu-profile-card">
                    <div>
                        <h4 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--edu-primary-dark);">${currentUser.username}</h4>
                        <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: var(--edu-text-muted);">${currentUser.email}</p>
                    </div>
                    <div class="edu-id-badge" onclick="copyStudentId('${currentUser.id}')" title="برای کپی کلیک کنید">
                        <span>🆔 شناسه: ${currentUser.id}</span>
                        <i class="far fa-copy" style="font-size: 0.85rem;"></i>
                    </div>
                </div>

                <div class="edu-stats-grid">
                    <div class="edu-stat-box">
                        <div class="edu-stat-value">${totalCompleted}</div>
                        <div class="edu-stat-label">مباحث تمام شده</div>
                    </div>
                    <div class="edu-stat-box">
                        <div class="edu-stat-value">${totalPoints}</div>
                        <div class="edu-stat-label">امتیاز کل</div>
                    </div>
                    <div class="edu-stat-box">
                        <div class="edu-stat-value">${totalStars} ⭐</div>
                        <div class="edu-stat-label">کل ستاره‌ها</div>
                    </div>
                    <div class="edu-stat-box" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; border-color: #fcd34d !important;">
                        <div class="edu-stat-value" style="color: #d97706 !important;">${BADGES.filter(b => b.check(progress)).length}</div>
                        <div class="edu-stat-label" style="color: #b45309 !important; font-weight: 800 !important;">🏅 نشان‌های فعال</div>
                    </div>
                </div>

                <div class="edu-profile-tabs">
                    <div class="edu-profile-tab-btn active" id="profileTabHistoryBtn" onclick="switchProfileSubTab('history')">📊 سوابق و کارنامه</div>
                    <div class="edu-profile-tab-btn" id="profileTabBadgesBtn" onclick="switchProfileSubTab('badges')">🏆 مدال‌ها و نشان‌ها (${BADGES.filter(b => b.check(progress)).length})</div>
                    <div class="edu-profile-tab-btn" id="profileTabMessagesBtn" onclick="switchProfileSubTab('messages')">✉️ پیام‌های معلم (${feedbacks.length})</div>
                </div>

                <div id="profileSubTabHistory" class="edu-timeline">
                    ${timelineHtml}
                </div>

                <div id="profileSubTabBadges" class="edu-timeline" style="display: none; max-height: 280px; overflow-y: auto;">
                    ${getBadgesHtml(progress)}
                </div>

                <div id="profileSubTabMessages" class="edu-timeline" style="display: none;">
                    ${feedbackHtml}
                </div>

                <button class="edu-submit-btn" style="background: #ef4444 !important; margin-top: 25px;" onclick="logOut()">❌ خروج از حساب کاربری</button>
            `;

            showModal('کارنامه و پروفایل دانش‌آموز', profileHtml);

        } catch (e) {
            showToast('خطا در بارگذاری اطلاعات پروفایل', false);
        }
    };

    window.switchProfileSubTab = (tab) => {
        const historyBtn = document.getElementById('profileTabHistoryBtn');
        const badgesBtn = document.getElementById('profileTabBadgesBtn');
        const messagesBtn = document.getElementById('profileTabMessagesBtn');
        const historyContent = document.getElementById('profileSubTabHistory');
        const badgesContent = document.getElementById('profileSubTabBadges');
        const messagesContent = document.getElementById('profileSubTabMessages');

        if (historyBtn) historyBtn.classList.remove('active');
        if (badgesBtn) badgesBtn.classList.remove('active');
        if (messagesBtn) messagesBtn.classList.remove('active');

        if (historyContent) historyContent.style.display = 'none';
        if (badgesContent) badgesContent.style.display = 'none';
        if (messagesContent) messagesContent.style.display = 'none';

        if (tab === 'history') {
            if (historyBtn) historyBtn.classList.add('active');
            if (historyContent) historyContent.style.display = 'block';
        } else if (tab === 'badges') {
            if (badgesBtn) badgesBtn.classList.add('active');
            if (badgesContent) badgesContent.style.display = 'block';
        } else {
            if (messagesBtn) messagesBtn.classList.add('active');
            if (messagesContent) messagesContent.style.display = 'block';
        }
    };

    // --- Teacher Dashboard Modal Workspace ---
    const openTeacherPanelModal = () => {
        const teacherHtml = `
            <div class="edu-profile-card" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%) !important; border-color: rgba(59, 130, 246, 0.2) !important;">
                <div>
                    <h4 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #1e40af;">${currentUser.username}</h4>
                    <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: var(--edu-text-muted);">دسترسی: معلم بندرکیاشهر 🔬</p>
                </div>
                <span class="edu-id-badge" style="background: #2563eb !important;">🆔 کد پرسنلی: ${currentUser.id}</span>
            </div>

            <h4 style="margin-top: 20px; font-weight: 800; font-size: 1.1rem;">🔍 ردیابی عملکرد دانش‌آموزان</h4>
            <p style="color: var(--edu-text-muted); font-size: 0.85rem; margin-top: 2px; margin-bottom: 12px;">شناسه مخصوص دانش‌آموز خود را وارد کنید تا کارنامه، روند پیشرفت و فعالیت‌های او را مشاهده نمایید.</p>
            
            <div class="edu-teacher-search-box">
                <input type="text" id="teacherSearchId" class="edu-form-input" placeholder="مثال: STD-1385" style="text-transform: uppercase;">
                <button type="button" class="edu-search-btn" id="teacherSearchBtn" onclick="searchStudentById()">بررسی پیشرفت</button>
            </div>

            <!-- Student Dashboard display dynamically loaded inside here -->
            <div id="teacherStudentResult">
                <div style="text-align: center; color: var(--edu-text-muted); border: 2px dashed var(--edu-border); border-radius: 18px; padding: 40px 20px;">
                    <span style="font-size: 3rem;">🕵️‍♂️</span>
                    <p style="margin-top: 15px; font-weight: 700; font-size: 1.1rem;">در انتظار ورود شناسه دانش‌آموز...</p>
                    <p style="font-size: 0.85rem; margin-top: 5px;">می‌توانید شناسه نمونه <b>STD-1385</b> را برای مشاهده کارنامه دمو حسین رضایی تست کنید.</p>
                </div>
            </div>

            <button class="edu-submit-btn" style="background: #ef4444 !important; margin-top: 30px;" onclick="logOut()">❌ خروج از پنل معلم</button>
        `;
        showModal('میز کار دبیران و معلمان', teacherHtml);
    };

    window.searchStudentById = async () => {
        const studentId = document.getElementById('teacherSearchId').value.trim().toUpperCase();
        const searchBtn = document.getElementById('teacherSearchBtn');
        const container = document.getElementById('teacherStudentResult');

        if (!studentId) {
            showToast('لطفاً شناسه دانش‌آموز را وارد کنید.', false);
            return;
        }

        searchBtn.innerText = 'درحال جستجو...';
        searchBtn.disabled = true;

        container.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <div style="font-size: 2rem; animation: spin 1s infinite linear;">🔄</div>
                <p style="margin-top: 15px; font-weight: 700;">درحال تجزیه و تحلیل پرونده آموزشی دانش‌آموز...</p>
            </div>
        `;

        try {
            const res = await fetch(`/api/student/progress/${studentId}`);
            const data = await res.json();

            searchBtn.innerText = 'بررسی پیشرفت';
            searchBtn.disabled = false;

            if (!data.success) {
                container.innerHTML = `
                    <div style="text-align: center; color: #ef4444; border: 2px dashed #fecaca; border-radius: 18px; padding: 40px 20px; background: #fef2f2;">
                        <span style="font-size: 3rem;">⚠️</span>
                        <p style="margin-top: 15px; font-weight: 800; font-size: 1.1rem;">دانش‌آموزی یافت نشد</p>
                        <p style="font-size: 0.85rem; margin-top: 5px; color: var(--edu-text-muted);">شناسه وارد شده صحیح نمی‌باشد. مطمئن شوید شناسه با فرمت STD-XXXX است.</p>
                    </div>
                `;
                showToast(data.message, false);
                return;
            }

            // Student profile details found!
            const student = data.student;
            const progress = data.progress || [];
            const feedbacks = data.feedback || [];

            // Compute statistics
            const totalTasks = progress.length;
            const averageScore = totalTasks === 0 ? 0 : Math.round(progress.reduce((sum, item) => sum + (item.score || 0), 0) / totalTasks);
            const totalStars = progress.reduce((sum, item) => sum + (item.stars || 0), 0);

            // --- GENERATE CUSTOM SVG INTERACTIVE CHART ---
            // Let's draw a beautiful line chart tracking the score of student over time
            let chartHtml = '';
            if (progress.length > 0) {
                // Sort progress ascending by time for logical chart timeline
                const chartData = [...progress].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                const pointsCount = chartData.length;

                // Design a responsive chart inside 500x120 viewbox
                const width = 500;
                const height = 120;
                const paddingLeft = 40;
                const paddingRight = 20;
                const paddingTop = 15;
                const paddingBottom = 20;

                const chartWidth = width - paddingLeft - paddingRight;
                const chartHeight = height - paddingTop - paddingBottom;

                // Map points
                let pointsStr = '';
                let pointsCircles = '';
                let pointTooltips = '';

                chartData.forEach((item, index) => {
                    const x = paddingLeft + (pointsCount === 1 ? chartWidth / 2 : (index / (pointsCount - 1)) * chartWidth);
                    // Map score 0-100 to y coordinate (height is 0-chartHeight)
                    const y = paddingTop + chartHeight - (item.score / 100) * chartHeight;

                    pointsStr += `${x},${y} `;

                    // Circle with interactive mouseover
                    pointsCircles += `
                        <circle cx="${x}" cy="${y}" r="4.5" fill="#10b981" stroke="#ffffff" stroke-width="1.5" class="edu-chart-point" 
                                onmouseover="showChartTooltip(event, '${item.title}', ${item.score}, '${new Date(item.timestamp).toLocaleDateString('fa-IR')}')"
                                onmouseout="hideChartTooltip()">
                        </circle>
                    `;
                });

                chartHtml = `
                    <div class="edu-chart-container">
                        <div class="edu-chart-title">
                            <span>📈 نمودار تغییرات نمرات دانش‌آموز (روند پیشرفت)</span>
                            <span style="font-size: 0.75rem; color: var(--edu-primary-dark);">برای مشاهده عنوان روی نقاط بروید 💡</span>
                        </div>
                        <div style="position: relative;">
                            <svg viewBox="0 0 ${width} ${height}" class="edu-chart-svg" preserveAspectRatio="xMidYMid meet">
                                <!-- Gridlines -->
                                <line x1="${paddingLeft}" y1="${paddingTop}" x2="${width - paddingRight}" y2="${paddingTop}" stroke="#f1f5f9" stroke-width="1.5"></line>
                                <line x1="${paddingLeft}" y1="${paddingTop + chartHeight / 2}" x2="${width - paddingRight}" y2="${paddingTop + chartHeight / 2}" stroke="#f1f5f9" stroke-width="1.5"></line>
                                <line x1="${paddingLeft}" y1="${paddingTop + chartHeight}" x2="${width - paddingRight}" y2="${paddingTop + chartHeight}" stroke="#e2e8f0" stroke-width="1.5"></line>
                                
                                <!-- Axes Labels -->
                                <text x="${paddingLeft - 8}" y="${paddingTop + 4}" fill="#94a3b8" font-size="7" font-weight="bold" text-anchor="end">۱۰۰</text>
                                <text x="${paddingLeft - 8}" y="${paddingTop + chartHeight / 2 + 3}" fill="#94a3b8" font-size="7" font-weight="bold" text-anchor="end">۵۰</text>
                                <text x="${paddingLeft - 8}" y="${paddingTop + chartHeight + 3}" fill="#94a3b8" font-size="7" font-weight="bold" text-anchor="end">۰</text>

                                <!-- Connection Line -->
                                ${pointsCount > 1 ? `<polyline fill="none" stroke="url(#chartGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" points="${pointsStr.trim()}"></polyline>` : ''}
                                
                                <!-- Gradients definition -->
                                <defs>
                                    <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stop-color="#10b981"></stop>
                                        <stop offset="100%" stop-color="#059669"></stop>
                                    </linearGradient>
                                </defs>

                                <!-- Points -->
                                ${pointsCircles}
                            </svg>
                            <!-- Tooltip layer -->
                            <div id="eduChartTooltip" style="position: absolute; display: none; background: #0f172a; color: white; padding: 6px 10px; border-radius: 8px; font-size: 0.75rem; pointer-events: none; z-index: 1000; font-family: 'Vazirmatn', sans-serif; text-align: right; box-shadow: 0 4px 6px rgba(0,0,0,0.15);"></div>
                        </div>
                    </div>
                `;
            } else {
                chartHtml = `
                    <div class="edu-chart-container" style="border-style: dashed; padding: 30px;">
                        <p style="margin: 0; color: var(--edu-text-muted); font-size: 0.85rem; font-weight: 700;">داده‌ای برای ترسیم نمودار روند تحصیلی وجود ندارد.</p>
                    </div>
                `;
            }

            // Set up chart tooltip functions globally so they can be triggered from inside the SVG attribute string
            window.showChartTooltip = (e, title, score, date) => {
                const tooltip = document.getElementById('eduChartTooltip');
                if (tooltip) {
                    tooltip.innerHTML = `<b>${title}</b><br/>نمره: ${score} از ۱۰۰ | تاریخ: ${date}`;
                    tooltip.style.display = 'block';
                    // Calculate tooltip placement relative to parent container
                    const rect = e.target.parentNode.getBoundingClientRect();
                    const pointRect = e.target.getBoundingClientRect();
                    tooltip.style.left = (pointRect.left - rect.left - 40) + 'px';
                    tooltip.style.top = (pointRect.top - rect.top - 55) + 'px';
                }
            };
            window.hideChartTooltip = () => {
                const tooltip = document.getElementById('eduChartTooltip');
                if (tooltip) tooltip.style.display = 'none';
            };

            // Build Timeline for teacher
            let progressTimeline = '';
            if (progress.length === 0) {
                progressTimeline = `<p style="text-align: center; padding: 20px 0; color: var(--edu-text-muted); font-size: 0.85rem;">هنوز هیچ درسی ثبت نشده است.</p>`;
            } else {
                const sortedProgress = [...progress].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                sortedProgress.forEach(item => {
                    const icon = item.type === 'lesson' ? '📖' : '🎮';
                    progressTimeline += `
                        <div class="edu-timeline-item ${item.type}">
                            <div>
                                <span style="margin-left: 6px;">${icon}</span>
                                <b>${item.title}</b>
                                <div style="margin-top: 4px;">
                                    <span class="edu-badge edu-badge-${item.subject}">${getSubjectFarsi(item.subject)}</span>
                                </div>
                            </div>
                            <div style="text-align: left;">
                                <div style="font-weight: 800; color: var(--edu-primary-dark);">${item.score} امتیاز</div>
                                <div style="color: var(--edu-accent); font-size: 0.8rem;">${'★'.repeat(item.stars)}</div>
                            </div>
                        </div>
                    `;
                });
            }

            // Render interactive search results & details of student to teacher
            container.innerHTML = `
                <div style="background: #f8fafc; border: 1px solid var(--edu-border); border-radius: 18px; padding: 20px; margin-top: 20px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid var(--edu-border); padding-bottom: 12px; margin-bottom: 15px;">
                        <div>
                            <span style="font-size: 0.8rem; color: var(--edu-text-muted); font-weight: 700;">دانش‌آموز انتخاب شده</span>
                            <h4 style="margin: 0; font-size: 1.2rem; font-weight: 800; color: var(--edu-primary-dark);">${student.username}</h4>
                        </div>
                        <span class="edu-id-badge" style="cursor: default !important;">🆔 ${student.id}</span>
                    </div>

                    <div class="edu-stats-grid" style="margin-bottom: 15px;">
                        <div class="edu-stat-box" style="background: #ffffff;">
                            <div class="edu-stat-value">${totalTasks}</div>
                            <div class="edu-stat-label">تمرین‌های ثبت‌شده</div>
                        </div>
                        <div class="edu-stat-box" style="background: #ffffff;">
                            <div class="edu-stat-value" style="color: #ef4444;">${averageScore}%</div>
                            <div class="edu-stat-label">میانگین نمرات</div>
                        </div>
                        <div class="edu-stat-box" style="background: #ffffff;">
                            <div class="edu-stat-value" style="color: var(--edu-accent);">${totalStars} ⭐</div>
                            <div class="edu-stat-label">مجموع ستاره‌ها</div>
                        </div>
                        <div class="edu-stat-box" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important; border-color: #fcd34d !important;">
                            <div class="edu-stat-value" style="color: #d97706 !important;">${BADGES.filter(b => b.check(progress)).length}</div>
                            <div class="edu-stat-label" style="color: #b45309 !important; font-weight: 800 !important;">🏅 نشان‌های فعال</div>
                        </div>
                    </div>
                </div>

                <!-- Custom visual Progress Chart rendered here -->
                ${chartHtml}

                <h5 style="font-weight: 800; font-size: 1rem; margin-bottom: 12px; color: var(--edu-text-dark); display: flex; align-items: center; gap: 6px;">
                    <span>🏆 مدال‌ها و نشان‌های افتخار دانش‌آموز</span>
                </h5>
                <div style="max-height: 220px; overflow-y: auto; border: 1px solid var(--edu-border); border-radius: 18px; padding: 12px; margin-bottom: 20px; background: #fafafb;">
                    ${getBadgesHtml(progress)}
                </div>

                <h5 style="font-weight: 800; font-size: 1rem; margin-bottom: 12px; color: var(--edu-text-dark);">📋 ریز فعالیت‌ها و کارنامه کامل</h5>
                <div class="edu-timeline" style="max-height: 200px;">
                    ${progressTimeline}
                </div>

                <!-- Teacher Feedback Box -->
                <div class="edu-feedback-box">
                    <h5 style="margin: 0 0 8px 0; font-weight: 800; color: #b45309; display: flex; align-items: center; gap: 6px;">
                        <span>✍️ ارسال تشویقی و بازخورد معلم</span>
                    </h5>
                    <p style="font-size: 0.75rem; color: var(--edu-text-muted); margin-bottom: 12px;">پیام شما بلافاصله در بخش اعلان‌ها و پروفایل دانش‌آموز نمایش داده خواهد شد.</p>
                    
                    <div class="edu-form-group" style="margin-bottom: 12px !important;">
                        <textarea id="teacherComment" class="edu-form-input" rows="3" placeholder="مثال: آفرین پسرم! نمره آزمون اعشار ریاضی فوق‌العاده بود. روی درس علوم دقت بیشتری کن..." style="resize: none;"></textarea>
                    </div>
                    <button type="button" class="edu-submit-btn" style="padding: 10px !important; font-size: 0.95rem; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important; box-shadow: 0 4px 12px rgba(217,119,6,0.2) !important;" onclick="submitTeacherFeedback('${student.id}')">ارسال پیام تشویقی به دانش‌آموز</button>
                </div>
            `;

        } catch (e) {
            container.innerHTML = `<p style="color: #ef4444; font-weight:700; text-align:center;">خطا در دریافت اطلاعات</p>`;
            showToast('خطا در ارتباط با سرور', false);
        }
    };

    window.submitTeacherFeedback = async (studentId) => {
        const comment = document.getElementById('teacherComment').value.trim();
        if (!comment) {
            showToast('لطفاً متن بازخورد خود را بنویسید.', false);
            return;
        }

        try {
            const res = await fetch('/api/teacher/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId,
                    teacherName: currentUser.username,
                    comment
                })
            });
            const data = await res.json();
            if (data.success) {
                showToast(data.message, true);
                document.getElementById('teacherComment').value = '';
                // Refresh student statistics
                searchStudentById();
            } else {
                showToast(data.message, false);
            }
        } catch (e) {
            showToast('خطا در ثبت بازخورد', false);
        }
    };

    // Helper translation map
    const getSubjectFarsi = (subject) => {
        const map = {
            'math': 'ریاضی',
            'science': 'علوم',
            'Persian': 'فارسی',
            'quran': 'قرآن',
            'gift': 'هدیه‌ها'
        };
        return map[subject] || 'کتاب درسی';
    };

    // --- Gamified Badges Database and Helper ---
    const BADGES = [
        {
            id: 'first_step',
            title: 'گام نخست 👣',
            desc: 'اولین تمرین یا بخش آموزشی خود را تکمیل کنید.',
            icon: '👣',
            bg: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            check: (progress) => progress.length >= 1
        },
        {
            id: 'perseverant',
            title: 'دانش‌آموز کوشا ✍️',
            desc: '۳ بخش یا تمرین آموزشی را ثبت کنید.',
            icon: '✍️',
            bg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
            check: (progress) => progress.length >= 3
        },
        {
            id: 'gold_standard',
            title: 'طلایه‌دار آموزش 🌟',
            desc: 'مجموعاً ۱۵ ستاره یا بیشتر دریافت کنید.',
            icon: '🌟',
            bg: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
            check: (progress) => progress.reduce((sum, p) => sum + (p.stars || 0), 0) >= 15
        },
        {
            id: 'perfect_score',
            title: 'قهرمان نمره ۲۰ 💯',
            desc: 'در حداقل یک تمرین نمره کامل ۱۰۰ کسب کنید.',
            icon: '💯',
            bg: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
            check: (progress) => progress.some(p => p.score >= 100)
        },
        {
            id: 'math_genius',
            title: 'نابغه‌ ریاضی 🧮',
            desc: '۲ تمرین یا درس ریاضی را با موفقیت پشت سر بگذارید.',
            icon: '🧮',
            bg: 'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)',
            check: (progress) => progress.filter(p => p.subject === 'math').length >= 2
        },
        {
            id: 'farsi_master',
            title: 'حافظ زبان پارسی 🖋️',
            desc: '۲ تمرین یا درس فارسی را با موفقیت پشت سر بگذارید.',
            icon: '🖋️',
            bg: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
            check: (progress) => progress.filter(p => p.subject === 'Persian' || p.subject === 'Persian2').length >= 2
        },
        {
            id: 'science_guru',
            title: 'دانشمند کوچک 🔬',
            desc: 'حداقل ۱ تمرین یا درس علوم تجربی را تکمیل کنید.',
            icon: '🔬',
            bg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
            check: (progress) => progress.filter(p => p.subject === 'science').length >= 1
        },
        {
            id: 'quran_reader',
            title: 'نور هدایت 📖',
            desc: 'حداقل ۱ بخش از کتاب قرآن شریف را مطالعه کنید.',
            icon: '📖',
            bg: 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)',
            check: (progress) => progress.filter(p => p.subject === 'quran').length >= 1
        },
        {
            id: 'tri_perfect',
            title: 'سه سوت بیست 🏅',
            desc: 'در ۳ تمرین مختلف نمره کامل ۱۰۰ کسب کنید.',
            icon: '🏅',
            bg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
            check: (progress) => progress.filter(p => p.score >= 100).length >= 3
        }
    ];

    const getBadgesHtml = (progress) => {
        let html = '<div class="edu-badges-grid">';
        
        BADGES.forEach(badge => {
            const isUnlocked = badge.check(progress);
            if (isUnlocked) {
                html += `
                    <div class="edu-badge-card unlocked" title="${badge.title} - فعال شده">
                        <div class="edu-badge-icon-wrap" style="background: ${badge.bg}; color: #ffffff;">
                            ${badge.icon}
                        </div>
                        <div class="edu-badge-info">
                            <h5 class="edu-badge-title">
                                <span>${badge.title}</span>
                            </h5>
                            <p class="edu-badge-desc">${badge.desc}</p>
                            <span class="edu-badge-status-pill unlocked">
                                <span>🎉 کسب شده</span>
                            </span>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="edu-badge-card locked" title="${badge.title} - قفل شده">
                        <div class="edu-badge-icon-wrap">
                            🔒
                        </div>
                        <div class="edu-badge-info">
                            <h5 class="edu-badge-title">
                                <span>${badge.title}</span>
                            </h5>
                            <p class="edu-badge-desc" style="color: #64748b !important;">${badge.desc}</p>
                            <span class="edu-badge-status-pill locked">
                                <span>🔒 قفل شده</span>
                            </span>
                        </div>
                    </div>
                `;
            }
        });
        
        html += '</div>';
        return html;
    };


    // --- 5. Dynamic Progress & Mark-Completed Tracking Widget ---
    const initProgressWidgets = () => {
        // Clear any old widgets
        const oldWidget = document.getElementById('eduFloatingTracker');
        if (oldWidget) oldWidget.remove();

        const path = window.location.pathname;

        // CASE A: User is inside an Exercise Page (e.g. exercises/grade-x/some-file.html)
        if (path.includes('/exercises/grade-')) {
            renderExerciseTrackerWidget();
        } 
        // CASE B: User is inside a Lesson main page (e.g. /math/index.html, /Persian/index.html but NOT root index.html)
        else if (path.includes('/math/') || path.includes('/science/') || path.includes('/quran/') || path.includes('/Persian/') || path.includes('/Persian2/')) {
            if (!path.endsWith('index.html') && !path.endsWith('/')) {
                // If they are on a real lesson (e.g. quran/lesson1.html, etc. wait, currently the lessons are content loaded in main.js dynamically!)
                // Wait! Since lessons are dynamically loaded inside a main single page (like quran/index.html, science/index.html) using sidebar selection,
                // our tracker widget should let them mark the *active* loaded lesson as "Completed"!
                // Let's hook into lesson changes!
                renderLessonTrackerWidget();
            } else {
                // Inside base lesson view (like science/index.html). Since lessons are selected in the sidebar, we can show a tracker widget for the selected lesson!
                renderLessonTrackerWidget();
            }
        }
    };

    // Tracker Widget inside Interactive Exercises
    const renderExerciseTrackerWidget = () => {
        if (!currentUser || currentUser.role !== 'student') return; // Only students record progress

        // Extract exercise name from title
        const exerciseName = document.title || 'تمرین تعاملی';
        const subject = getSubjectFromPath(window.location.pathname);

        const widget = document.createElement('div');
        widget.className = 'edu-tracker-widget';
        widget.id = 'eduFloatingTracker';
        widget.innerHTML = `
            <span>🏆</span>
            <span>ثبت امتیاز در پروفایل</span>
        `;
        document.body.appendChild(widget);

        widget.addEventListener('click', () => {
            // Auto-detect score if the game has a global score variable
            let detectedScore = 100;
            if (typeof window.score !== 'undefined') {
                detectedScore = Number(window.score);
            } else if (typeof score !== 'undefined') {
                detectedScore = Number(score);
            }

            const selfReportHtml = `
                <p style="font-size: 0.9rem; color: var(--edu-text-muted); margin-bottom: 20px;">
                    آفرین قهرمان! شما با موفقیت تمرین <b>"${exerciseName}"</b> را حل کردید. امتیاز به دست آمده را تایید کنید تا در پرونده تحصیلی شما ثبت شود.
                </p>
                <div class="edu-form-group">
                    <label class="edu-form-label">امتیاز کسب شده (از ۱۰۰)</label>
                    <input type="number" id="trackerReportScore" class="edu-form-input" min="0" max="100" value="${detectedScore}" required style="text-align: center; font-size: 1.5rem; font-weight: 800; color: var(--edu-primary-dark);">
                </div>

                <div class="edu-form-group">
                    <label class="edu-form-label" style="text-align: center;">ارزیابی شما از این تمرین (ستاره ⭐)</label>
                    <div class="edu-stars-container">
                        <span class="edu-star-input active" data-value="1" onclick="selectTrackerStars(1)">★</span>
                        <span class="edu-star-input active" data-value="2" onclick="selectTrackerStars(2)">★</span>
                        <span class="edu-star-input active" data-value="3" onclick="selectTrackerStars(3)">★</span>
                        <span class="edu-star-input active" data-value="4" onclick="selectTrackerStars(4)">★</span>
                        <span class="edu-star-input active" data-value="5" onclick="selectTrackerStars(5)">★</span>
                    </div>
                </div>

                <button class="edu-submit-btn" onclick="submitProgressReport('${subject}', '${exerciseName}', 'exercise')">ثبت دائمی در کارنامه</button>
            `;

            showModal('ثبت نتیجه تمرین در پروفایل', selfReportHtml);

            // Configure star selectors
            window.activeTrackerStars = 5;
            window.selectTrackerStars = (stars) => {
                window.activeTrackerStars = stars;
                const starElements = document.querySelectorAll('.edu-star-input');
                starElements.forEach(el => {
                    const val = Number(el.getAttribute('data-value'));
                    if (val <= stars) {
                        el.classList.add('active');
                    } else {
                        el.classList.remove('active');
                    }
                });
            };
        });
    };

    // Tracker Widget inside book lessons (Quran, Persian, Math, Science)
    const renderLessonTrackerWidget = () => {
        if (!currentUser || currentUser.role !== 'student') return; // Only students

        // Since lessons are loaded dynamically when clicking on a sidebar title, we want to know the current active lesson name!
        // We can periodically query the main-content header (e.g. h1, h2) or sidebar selection.
        const checkActiveLesson = () => {
            let lessonName = '';
            
            // Try to find an active item in sidebar
            const activeSidebarItem = document.querySelector('.sidebar a.active, .sidebar li.active, .sidebar-link.active, .topic-item.active, .topic-title.active');
            if (activeSidebarItem) {
                lessonName = activeSidebarItem.innerText.trim();
            } else {
                // Fallback to active display title
                const displayHeader = document.querySelector('#main-content h1, #main-content h2, .main-content h1, .main-content h2, h1, h2');
                if (displayHeader) {
                    lessonName = displayHeader.innerText.trim();
                }
            }

            // Remove typical welcome messages
            if (!lessonName || lessonName.includes('خوش آمدید') || lessonName.includes('قهرمان') || lessonName.includes('آموزش و پرورش')) {
                return null;
            }

            return lessonName;
        };

        const updateLessonWidget = () => {
            const lessonName = checkActiveLesson();
            let widget = document.getElementById('eduFloatingTracker');

            if (!lessonName) {
                if (widget) widget.style.display = 'none';
                return;
            }

            if (!widget) {
                widget = document.createElement('div');
                widget.className = 'edu-tracker-widget';
                widget.id = 'eduFloatingTracker';
                widget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                widget.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
                document.body.appendChild(widget);
            }

            widget.style.display = 'flex';
            widget.innerHTML = `
                <span>📖</span>
                <span>ثبت مطالعه این بخش</span>
            `;

            // Reset and configure click listener for this lesson
            // Remove old click listeners via replacement
            const newWidget = widget.cloneNode(true);
            widget.parentNode.replaceChild(newWidget, widget);

            newWidget.addEventListener('click', () => {
                const subject = getSubjectFromPath(window.location.pathname);
                const completeHtml = `
                    <p style="font-size: 0.9rem; color: var(--edu-text-muted); margin-bottom: 20px;">
                        آفرین قهرمان! شما با موفقیت بخش <b>"${lessonName}"</b> از کتاب <b>${getSubjectFarsi(subject)}</b> را مطالعه کردید. ثبت مطالعه به منزله تکمیل این بخش از درس است.
                    </p>
                    <div class="edu-form-group">
                        <label class="edu-form-label" style="text-align: center;">ارزیابی شما از یادگیری این درس (ستاره ⭐)</label>
                        <div class="edu-stars-container">
                            <span class="edu-star-input active" data-value="1" onclick="selectTrackerStars(1)">★</span>
                            <span class="edu-star-input active" data-value="2" onclick="selectTrackerStars(2)">★</span>
                            <span class="edu-star-input active" data-value="3" onclick="selectTrackerStars(3)">★</span>
                            <span class="edu-star-input active" data-value="4" onclick="selectTrackerStars(4)">★</span>
                            <span class="edu-star-input active" data-value="5" onclick="selectTrackerStars(5)">★</span>
                        </div>
                    </div>

                    <button class="edu-submit-btn" onclick="submitProgressReport('${subject}', 'مطالعه بخش: ${lessonName}', 'lesson')">ثبت در کارنامه تحصیلی</button>
                `;

                showModal('ثبت پیشرفت مطالعه درس', completeHtml);

                window.activeTrackerStars = 5;
                window.selectTrackerStars = (stars) => {
                    window.activeTrackerStars = stars;
                    const starElements = document.querySelectorAll('.edu-star-input');
                    starElements.forEach(el => {
                        const val = Number(el.getAttribute('data-value'));
                        if (val <= stars) {
                            el.classList.add('active');
                        } else {
                            el.classList.remove('active');
                        }
                    });
                };
            });
        };

        // Run once on start and observe for page/lesson switches
        setTimeout(updateLessonWidget, 1000);

        // Periodically check in case dynamic scripts change content without changing route path
        setInterval(updateLessonWidget, 3000);
    };

    window.submitProgressReport = async (subject, title, type) => {
        const score = document.getElementById('trackerReportScore') ? Number(document.getElementById('trackerReportScore').value) : 100;
        const stars = window.activeTrackerStars || 5;

        try {
            const res = await fetch('/api/student/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    type,
                    subject,
                    title,
                    score,
                    stars,
                    details: type === 'lesson' ? 'مطالعه کامل کتاب درسی' : 'حل تمرین تعاملی آنلاین'
                })
            });
            const data = await res.json();
            if (data.success) {
                showToast(data.message, true);
                closeModal();
                
                // Add tiny visual celebration effects
                triggerConfettiEffect();
            } else {
                showToast(data.message, false);
            }
        } catch (e) {
            showToast('خطا در ذخیره‌سازی پیشرفت تحصیلی', false);
        }
    };

    // Extract subject name from directory/path
    const getSubjectFromPath = (path) => {
        if (path.includes('/math/')) return 'math';
        if (path.includes('/science/')) return 'science';
        if (path.includes('/Persian/')) return 'Persian';
        if (path.includes('/Persian2/')) return 'Persian';
        if (path.includes('/quran/')) return 'quran';
        return 'math'; // Default fallback
    };

    // Confetti animation for successful progress report
    const triggerConfettiEffect = () => {
        const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#ffffff'];
        for (let i = 0; i < 40; i++) {
            const c = document.createElement('div');
            c.style.position = 'fixed';
            c.style.width = Math.random() * 8 + 6 + 'px';
            c.style.height = Math.random() * 15 + 8 + 'px';
            c.style.background = colors[Math.floor(Math.random() * colors.length)];
            c.style.top = '-20px';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.zIndex = '300000';
            c.style.borderRadius = '2px';
            c.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            const speed = Math.random() * 5 + 4;
            const horizontalSpeed = Math.random() * 4 - 2;
            document.body.appendChild(c);

            let topPos = -20;
            let leftPos = parseFloat(c.style.left);
            
            const anim = setInterval(() => {
                topPos += speed;
                leftPos += horizontalSpeed;
                c.style.top = topPos + 'px';
                c.style.left = leftPos + 'px';
                
                if (topPos > window.innerHeight) {
                    clearInterval(anim);
                    c.remove();
                }
            }, 16);
        }
    };


    // --- 6. DOM Initialization Hooks ---
    document.addEventListener('DOMContentLoaded', () => {
        injectHeaderButtons();
        initProgressWidgets();
    });

    // Make sure we inject buttons if the script is run after DOMContentLoaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        injectHeaderButtons();
        initProgressWidgets();
    }

})();
