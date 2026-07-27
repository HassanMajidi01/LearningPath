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
        .edu-student-pill {
            display: inline-flex !important;
            align-items: center !important;
            gap: 8px !important;
            background: #ffffff !important;
            border: 1px solid var(--edu-border) !important;
            padding: 8px 14px !important;
            border-radius: 50px !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02) !important;
            margin: 4px !important;
            user-select: none !important;
        }
        .edu-student-pill:hover {
            border-color: var(--edu-primary) !important;
            background: #f0fdf4 !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05) !important;
        }
        .edu-student-pill:active {
            transform: translateY(0) !important;
        }

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
            gap: 12px !important;
            cursor: pointer !important;
            box-shadow: 0 10px 25px -5px rgba(217, 119, 6, 0.4) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            direction: rtl !important;
            animation: bounceTracker 2s infinite alternate !important;
            pointer-events: auto !important;
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
        .edu-streak-container {
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%) !important;
            border: 2px solid #fcd34d !important;
            border-radius: 20px !important;
            padding: 20px !important;
            margin-bottom: 24px !important;
            text-align: center !important;
            position: relative !important;
            overflow: hidden !important;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.1) !important;
        }
        .edu-streak-badge {
            background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%) !important;
            color: #ffffff !important;
            width: 70px;
            height: 70px;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 2.2rem !important;
            font-weight: 800 !important;
            box-shadow: 0 10px 20px -5px rgba(234, 88, 12, 0.4) !important;
            animation: pulseStreak 2s infinite alternate !important;
            margin-bottom: 5px;
        }
        @keyframes pulseStreak {
            0% { transform: scale(1); box-shadow: 0 10px 20px -5px rgba(234, 88, 12, 0.4); }
            100% { transform: scale(1.08); box-shadow: 0 12px 24px -3px rgba(234, 88, 12, 0.6); }
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

    // --- Direct Firebase Client-Side fallback helpers ---
    let firebaseDb = null;
    let firebaseConfig = null;
    // --- Google Sheets Apps Script Web App URL ---
    // آدرس وب‌اپ گوگل اپس اسکریپت خود را (که با /exec خاتمه می‌یابد) در خط زیر قرار دهید:
    let appsScriptUrl = localStorage.getItem('edu_apps_script_url') || 'https://script.google.com/macros/s/AKfycbxKAVxfcLWWU9ZwcOO6G3bJ2kdA6vVhBWf1DmXtF7VSKRMbT7UYhUU-lk2fZ78whPdc/exec'; // لینک وب‌اپ پیش‌فرض گوگل شیت یا لینک سفارشی ذخیره شده


    function sha256Simple(ascii) {
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }
        
        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = 'length';
        var i, j;
        var result = '';

        var words = [];
        var asciiLength = ascii[lengthProperty];
        var hash = sha256Simple.h = sha256Simple.h || [];
        var k = sha256Simple.k = sha256Simple.k || [];
        var primeCounter = k[lengthProperty];

        var isComposite = {};
        for (var candidate = 2; primeCounter < 64; candidate++) {
            if (!isComposite[candidate]) {
                for (i = 0; i < 313; i += candidate) {
                    isComposite[i] = 1;
                }
                hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
                k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
            }
        }
        
        ascii += '\x80';
        while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
        for (i = 0; i < ascii[lengthProperty]; i++) {
            j = ascii.charCodeAt(i);
            if (j >> 8) return; 
            words[i >> 2] |= j << ((3 - i % 4) * 8);
        }
        words[words[lengthProperty]] = ((asciiLength / maxWord) * 8) | 0;
        words[words[lengthProperty]] = (asciiLength * 8);
        
        var w = [];
        var a, b, c, d, e, f, g, h, temp1, temp2;
        var hashLength = hash[lengthProperty];
        var wordsLength = words[lengthProperty];
        for (i = 0; i < wordsLength; i += 16) {
            var w = words.slice(i, i + 16);
            var oldHash = hash.slice(0);
            
            a = hash[0]; b = hash[1]; c = hash[2]; d = hash[3];
            e = hash[4]; f = hash[5]; g = hash[6]; h = hash[7];

            for (j = 0; j < 64; j++) {
                if (j >= 16) {
                    var s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
                    var s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
                    w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
                }
                
                var ch = (e & f) ^ (~e & g);
                var maj = (a & b) ^ (a & c) ^ (b & c);
                var t1 = (h + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ch + k[j] + (w[j] || 0)) | 0;
                var t2 = ((rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + maj) | 0;
                
                h = g;
                g = f;
                f = e;
                e = (d + t1) | 0;
                d = c;
                c = b;
                b = a;
                a = (t1 + t2) | 0;
            }
            
            for (j = 0; j < 8; j++) {
                hash[j] = (hash[j] + oldHash[j]) | 0;
            }
        }
        
        for (i = 0; i < 8; i++) {
            for (j = 3; j + 1; j--) {
                var b = (hash[i] >> (j * 8)) & 255;
                result += ((b < 16) ? '0' : '') + b.toString(16);
            }
        }
        return result;
    }

    async function hashPassword(password) {
        if (window.crypto && window.crypto.subtle) {
            try {
                const msgBuffer = new TextEncoder().encode(password);
                const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                return hashHex;
            } catch (e) {
                console.error("Subtle crypto hash error:", e);
            }
        }
        return sha256Simple(password);
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    async function callApi(url, options = {}) {
        // If a custom Google Sheets URL is explicitly configured in settings, try it first
        if (appsScriptUrl) {
            let action = '';
            let payload = {};
            
            try {
                if (url === '/api/auth/login') {
                    action = 'login';
                    const body = JSON.parse(options.body || '{}');
                    payload = {
                        email: body.email,
                        passwordHash: await hashPassword(body.password)
                    };
                } else if (url === '/api/auth/register') {
                    action = 'register';
                    const body = JSON.parse(options.body || '{}');
                    payload = {
                        username: body.username,
                        email: body.email,
                        passwordHash: await hashPassword(body.password),
                        role: body.role
                    };
                } else if (url === '/api/student/progress') {
                    action = 'saveProgress';
                    payload = JSON.parse(options.body || '{}');
                } else if (url.startsWith('/api/student/self/')) {
                    action = 'getSelfData';
                    payload = { studentId: url.split('/').pop() };
                } else if (url.startsWith('/api/student/progress/')) {
                    action = 'getProgress';
                    payload = { studentId: url.split('/').pop() };
                } else if (url === '/api/teacher/feedback') {
                    action = 'saveFeedback';
                    payload = JSON.parse(options.body || '{}');
                }

                if (action) {
                    const gasRes = await fetch(appsScriptUrl, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'text/plain;charset=utf-8'
                        },
                        body: JSON.stringify({ action, ...payload })
                    });
                    if (gasRes.ok) {
                        const data = await gasRes.json();
                        return data;
                    } else {
                        console.warn('Apps Script Web App returned status:', gasRes.status, '- Falling back to local server.');
                    }
                }
            } catch (gasError) {
                console.warn('Google Sheets Apps Script call failed:', gasError, '- Falling back to local server.');
            }
        }

        // Default: Call our secure Node.js backend server API (which syncs directly to Firebase Firestore)
        try {
            const localRes = await fetch(url, {
                method: options.method || 'GET',
                headers: options.headers || { 'Content-Type': 'application/json' },
                body: options.body
            });
            if (localRes.ok) {
                const data = await localRes.json();
                return data;
            } else {
                let errMsg = `خطای سرور: ${localRes.status}`;
                try {
                    const errorData = await localRes.json();
                    if (errorData && errorData.message) {
                        errMsg = errorData.message;
                    }
                } catch (_) {}
                return { success: false, message: errMsg };
            }
        } catch (localError) {
            console.error('Local server API call failed:', localError);
            return { success: false, message: 'خطا در ارتباط با سرور محلی. لطفا اتصال شبکه خود را بررسی کنید.' };
        }
    }

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

    window.toggleDbSettings = () => {
        const container = document.getElementById('eduDbSettingsContainer');
        const icon = document.getElementById('eduDbToggleIcon');
        if (container.style.display === 'none') {
            container.style.display = 'block';
            icon.innerText = '▲';
            const currentUrl = localStorage.getItem('edu_apps_script_url') || '';
            document.getElementById('eduAppsScriptUrlInput').value = currentUrl;
        } else {
            container.style.display = 'none';
            icon.innerText = '▼';
        }
    };

    window.saveDbSettings = () => {
        const urlInput = document.getElementById('eduAppsScriptUrlInput').value.trim();
        if (urlInput && !urlInput.startsWith('https://script.google.com/')) {
            showToast('آدرس وب‌اپ نامعتبر است. باید با https://script.google.com شروع شود.', false);
            return;
        }
        
        if (urlInput) {
            localStorage.setItem('edu_apps_script_url', urlInput);
            appsScriptUrl = urlInput;
            showToast('اتصال به گوگل شیت با موفقیت ذخیره شد! 🎉', true);
        } else {
            localStorage.removeItem('edu_apps_script_url');
            appsScriptUrl = '';
            showToast('تنظیمات پاک شد. سیستم به پایگاه داده پیش‌فرض بازگشت.', true);
        }
    };

    window.showAppsScriptInstructions = () => {
        const scriptCode = `// Google Apps Script Database for "آموزش و پرورش بندر کیاشهر"
// این اسکریپت را کپی کرده و در بخش Extensions -> Apps Script فایل گوگل شیت خود قرار دهید.

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "وب‌اپ فعال است! اتصال برقرار شد."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    initDatabase();
    
    if (action === 'register') {
      return handleRegister(data);
    } else if (action === 'login') {
      return handleLogin(data);
    } else if (action === 'saveProgress') {
      return handleSaveProgress(data);
    } else if (action === 'getSelfData') {
      return handleGetSelfData(data);
    } else if (action === 'getProgress') {
      return handleGetProgress(data);
    } else if (action === 'saveFeedback') {
      return handleSaveFeedback(data);
    } else {
      return jsonResponse({ success: false, message: 'عملیات تعریف نشده: ' + action });
    }
  } catch (error) {
    return jsonResponse({ success: false, message: 'خطای سرور گوگل اپس اسکریپت: ' + error.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function initDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. users sheet
  let usersSheet = ss.getSheetByName('users');
  if (!usersSheet) {
    usersSheet = ss.insertSheet('users');
    usersSheet.appendRow(['id', 'username', 'email', 'passwordHash', 'role', 'createdAt']);
    usersSheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#eff6ff');
  }
  
  // 2. progress sheet
  let progressSheet = ss.getSheetByName('progress');
  if (!progressSheet) {
    progressSheet = ss.insertSheet('progress');
    progressSheet.appendRow(['id', 'userId', 'studentName', 'studentEmail', 'type', 'subject', 'title', 'score', 'stars', 'details', 'timestamp']);
    progressSheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#ecfdf5');
  }
  
  // 3. feedback sheet
  let feedbackSheet = ss.getSheetByName('feedback');
  if (!feedbackSheet) {
    feedbackSheet = ss.insertSheet('feedback');
    feedbackSheet.appendRow(['id', 'studentId', 'teacherName', 'comment', 'timestamp']);
    feedbackSheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#fef3c7');
  }
}

function handleRegister(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('users');
  const rows = sheet.getDataRange().getValues();
  
  const email = data.email.toLowerCase().trim();
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][2].toString().toLowerCase().trim() === email) {
      return jsonResponse({ success: false, message: 'کاربری با این ایمیل قبلاً ثبت‌نام کرده است.' });
    }
  }
  
  const prefix = data.role === 'teacher' ? 'TCH' : 'STD';
  let isUnique = false;
  let newId = '';
  while (!isUnique) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = prefix + '-' + randomNum;
    
    let exists = false;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0].toString() === newId) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      isUnique = true;
    }
  }
  
  const newUser = [
    newId,
    data.username,
    email,
    data.passwordHash,
    data.role,
    new Date().toISOString()
  ];
  
  sheet.appendRow(newUser);
  
  return jsonResponse({
    success: true,
    user: {
      id: newId,
      username: data.username,
      email: email,
      role: data.role,
      createdAt: newUser[5]
    },
    message: 'ثبت‌نام با موفقیت انجام شد.'
  });
}

function handleLogin(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('users');
  const rows = sheet.getDataRange().getValues();
  
  const email = data.email.toLowerCase().trim();
  const passwordHash = data.passwordHash;
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][2].toString().toLowerCase().trim() === email) {
      if (rows[i][3].toString() === passwordHash) {
        return jsonResponse({
          success: true,
          user: {
            id: rows[i][0].toString(),
            username: rows[i][1].toString(),
            email: rows[i][2].toString(),
            role: rows[i][4].toString(),
            createdAt: rows[i][5].toString()
          },
          message: 'ورود موفقیت‌آمیز بود.'
        });
      } else {
        return jsonResponse({ success: false, message: 'ایمیل یا رمز عبور اشتباه است.' });
      }
    }
  }
  
  return jsonResponse({ success: false, message: 'ایمیل یا رمز عبور اشتباه است.' });
}

function handleSaveProgress(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const usersSheet = ss.getSheetByName('users');
  const userRows = usersSheet.getDataRange().getValues();
  let user = null;
  
  for (let i = 1; i < userRows.length; i++) {
    if (userRows[i][0].toString() === data.userId) {
      user = {
        id: userRows[i][0].toString(),
        username: userRows[i][1].toString(),
        email: userRows[i][2].toString()
      };
      break;
    }
  }
  
  if (!user) {
    return jsonResponse({ success: false, message: 'کاربر یافت نشد.' });
  }
  
  const progressSheet = ss.getSheetByName('progress');
  const progressId = 'PRG-' + Math.floor(100000 + Math.random() * 900000);
  
  const newProgress = [
    progressId,
    data.userId,
    user.username,
    user.email,
    data.type,
    data.subject,
    data.title,
    Number(data.score) || 0,
    Number(data.stars) || 0,
    data.details || '',
    new Date().toISOString()
  ];
  
  progressSheet.appendRow(newProgress);
  
  return jsonResponse({
    success: true,
    progress: {
      id: progressId,
      userId: data.userId,
      studentName: user.username,
      studentEmail: user.email,
      type: data.type,
      subject: data.subject,
      title: data.title,
      score: Number(data.score) || 0,
      stars: Number(data.stars) || 0,
      details: data.details || '',
      timestamp: newProgress[10]
    },
    message: 'پیشرفت شما ثبت شد!'
  });
}

function handleGetSelfData(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const progressSheet = ss.getSheetByName('progress');
  const progressRows = progressSheet.getDataRange().getValues();
  const progress = [];
  
  for (let i = 1; i < progressRows.length; i++) {
    if (progressRows[i][1].toString() === data.studentId) {
      progress.push({
        id: progressRows[i][0].toString(),
        userId: progressRows[i][1].toString(),
        studentName: progressRows[i][2].toString(),
        studentEmail: progressRows[i][3].toString(),
        type: progressRows[i][4].toString(),
        subject: progressRows[i][5].toString(),
        title: progressRows[i][6].toString(),
        score: Number(progressRows[i][7]),
        stars: Number(progressRows[i][8]),
        details: progressRows[i][9].toString(),
        timestamp: progressRows[i][10].toString()
      });
    }
  }
  
  const feedbackSheet = ss.getSheetByName('feedback');
  const feedbackRows = feedbackSheet.getDataRange().getValues();
  const feedback = [];
  
  for (let i = 1; i < feedbackRows.length; i++) {
    if (feedbackRows[i][1].toString() === data.studentId) {
      feedback.push({
        id: feedbackRows[i][0].toString(),
        studentId: feedbackRows[i][1].toString(),
        teacherName: feedbackRows[i][2].toString(),
        comment: feedbackRows[i][3].toString(),
        timestamp: feedbackRows[i][4].toString()
      });
    }
  }
  
  return jsonResponse({
    success: true,
    progress: progress,
    feedback: feedback
  });
}

function handleGetProgress(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const usersSheet = ss.getSheetByName('users');
  const userRows = usersSheet.getDataRange().getValues();
  let student = null;
  
  for (let i = 1; i < userRows.length; i++) {
    if (userRows[i][0].toString() === data.studentId) {
      student = {
        id: userRows[i][0].toString(),
        username: userRows[i][1].toString(),
        email: userRows[i][2].toString(),
        role: userRows[i][4].toString(),
        createdAt: userRows[i][5].toString()
      };
      break;
    }
  }
  
  if (!student || student.role !== 'student') {
    return jsonResponse({ success: false, message: 'دانش‌آموزی با این شناسه یافت نشد.' });
  }
  
  const progressSheet = ss.getSheetByName('progress');
  const progressRows = progressSheet.getDataRange().getValues();
  const progress = [];
  
  for (let i = 1; i < progressRows.length; i++) {
    if (progressRows[i][1].toString() === data.studentId) {
      progress.push({
        id: progressRows[i][0].toString(),
        userId: progressRows[i][1].toString(),
        studentName: progressRows[i][2].toString(),
        studentEmail: progressRows[i][3].toString(),
        type: progressRows[i][4].toString(),
        subject: progressRows[i][5].toString(),
        title: progressRows[i][6].toString(),
        score: Number(progressRows[i][7]),
        stars: Number(progressRows[i][8]),
        details: progressRows[i][9].toString(),
        timestamp: progressRows[i][10].toString()
      });
    }
  }
  
  const feedbackSheet = ss.getSheetByName('feedback');
  const feedbackRows = feedbackSheet.getDataRange().getValues();
  const feedback = [];
  
  for (let i = 1; i < feedbackRows.length; i++) {
    if (feedbackRows[i][1].toString() === data.studentId) {
      feedback.push({
        id: feedbackRows[i][0].toString(),
        studentId: feedbackRows[i][1].toString(),
        teacherName: feedbackRows[i][2].toString(),
        comment: feedbackRows[i][3].toString(),
        timestamp: feedbackRows[i][4].toString()
      });
    }
  }
  
  return jsonResponse({
    success: true,
    student: student,
    progress: progress,
    feedback: feedback
  });
}

function handleSaveFeedback(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const usersSheet = ss.getSheetByName('users');
  const userRows = usersSheet.getDataRange().getValues();
  let studentExists = false;
  
  for (let i = 1; i < userRows.length; i++) {
    if (userRows[i][0].toString() === data.studentId) {
      studentExists = true;
      break;
    }
  }
  
  if (!studentExists) {
    return jsonResponse({ success: false, message: 'دانش‌آموز یافت نشد.' });
  }
  
  const feedbackSheet = ss.getSheetByName('feedback');
  const feedbackId = 'FBB-' + Math.floor(100000 + Math.random() * 900000);
  
  const newFeedback = [
    feedbackId,
    data.studentId,
    data.teacherName,
    data.comment,
    new Date().toISOString()
  ];
  
  feedbackSheet.appendRow(newFeedback);
  
  return jsonResponse({
    success: true,
    feedback: {
      id: feedbackId,
      studentId: data.studentId,
      teacherName: data.teacherName,
      comment: data.comment,
      timestamp: newFeedback[4]
    },
    message: 'بازخورد با موفقیت ثبت شد.'
  });
}
`;

        const codeModalHtml = `
            <div style="direction: rtl; text-align: right; font-family: 'Vazirmatn', sans-serif;">
                <p style="font-size: 0.85rem; line-height: 1.6; color: var(--edu-text-dark); margin-bottom: 12px;">
                    راهنمای راه‌اندازی سریع پایگاه داده گوگل شیت:
                    <br>
                    ۱. یک فایل <b>Google Sheet</b> جدید بسازید.
                    <br>
                    ۲. از منوی بالا روی <b>Extensions</b> (افزونه‌ها) و سپس <b>Apps Script</b> کلیک کنید.
                    <br>
                    ۳. کدهای پیش‌فرض را پاک کرده و کدهای زیر را پیست کنید:
                </p>
                <textarea id="appsScriptCodeBlock" readonly style="width: 100%; height: 180px; font-family: 'Courier New', Courier, monospace; font-size: 0.75rem; direction: ltr; text-align: left; background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid var(--edu-border);">${scriptCode}</textarea>
                <button type="button" class="edu-submit-btn" style="margin-top: 10px; padding: 10px;" onclick="copyAppsScriptCode()">📋 کپی کردن کدهای اسکریپت</button>
                
                <p style="font-size: 0.85rem; line-height: 1.6; color: var(--edu-text-dark); margin-top: 15px;">
                    ۴. از بالا سمت راست روی دکمه آبی **Deploy** و سپس **New deployment** بزنید.
                    <br>
                    ۵. نوع را روی **Web app** بگذارید.
                    <br>
                    ۶. فیلد **Execute as** روی **Me** و فیلد **Who has access** روی **Anyone** باشد.
                    <br>
                    ۷. دکمه **Deploy** را بزنید و دسترسی‌ها را تایید کنید. آدرس **URL** وب‌اپ تولیدشده را در کادر تنظیمات پایگاه داده ذخیره کنید.
                </p>
                <button type="button" class="edu-submit-btn" style="background: #64748b !important; margin-top: 15px; padding: 10px;" onclick="backToAuthModal()">⬅️ بازگشت به صفحه ورود</button>
            </div>
        `;
        showModal('راهنمای اتصال به گوگل شیت 📊', codeModalHtml);
    };

    window.copyAppsScriptCode = () => {
        const copyText = document.getElementById("appsScriptCodeBlock");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        showToast('کدهای اسکریپت با موفقیت کپی شدند!', true);
    };

    window.backToAuthModal = () => {
        openAuthModal();
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
            const data = await callApi('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
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
            const data = await callApi('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role })
            });
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
            const data = await callApi(`/api/student/self/${currentUser.id}`);

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

            const streakInfo = getStreakInfo(progress);
            const currentStreak = streakInfo.currentStreak;
            
            let streakHtml = `
                <div class="edu-streak-container" style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%) !important; border: 2px solid #fcd34d !important; border-radius: 20px !important; padding: 20px !important; margin-bottom: 24px !important; text-align: center !important; position: relative !important; overflow: hidden !important; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.1) !important; margin-top: 20px !important;">
                    <div style="position: absolute; top: -10px; right: -10px; font-size: 5rem; opacity: 0.1; transform: rotate(15deg); pointer-events: none;">🔥</div>
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                        <div class="edu-streak-badge">
                            🔥
                        </div>
                        <h4 style="margin: 0; font-size: 1.2rem; font-weight: 800; color: #9a3412;">استریک روزانه شما</h4>
                        <p style="margin: 0; font-size: 1rem; color: #c2410c; font-weight: 700;">
                            ${currentStreak > 0 ? `آفرین قهرمان! <b>${currentStreak} روز متوالی</b> تلاش و حل تمرین فعال داری.` : 'هنوز استریک جدیدی شروع نکردی! همین امروز یک تمرین حل کن تا استریکت فعال بشه! 🔥'}
                        </p>
                    </div>
                    
                    <!-- Week calendar tracking -->
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-top: 20px; border-top: 1px dashed rgba(234, 88, 12, 0.2); padding-top: 15px;">
                        ${streakInfo.last7Days.map(day => {
                            const activeBg = day.hasSolved ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' : '#e2e8f0';
                            const activeText = day.hasSolved ? '#ffffff' : '#64748b';
                            const borderStyle = day.isToday ? 'border: 2px solid #ea580c' : 'border: 1px solid transparent';
                            const statusIcon = day.hasSolved ? '🔥' : '⚪';
                            return `
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; ${borderStyle}; border-radius: 12px; padding: 6px 4px; background: ${day.isToday ? '#ffffff' : 'transparent'};">
                                    <span style="font-size: 0.7rem; font-weight: 700; color: #7c2d12;">${day.dayName}</span>
                                    <div style="width: 32px; height: 32px; border-radius: 50%; background: ${activeBg}; color: ${activeText}; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; font-weight: 800; box-shadow: ${day.hasSolved ? '0 4px 8px rgba(234, 88, 12, 0.25)' : 'none'};">
                                        ${statusIcon}
                                    </div>
                                    ${day.isToday ? '<span style="font-size: 0.65rem; color: #ea580c; font-weight: 800;">امروز</span>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;

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

                ${streakHtml}

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

    // --- Local Persistence Helpers for Teacher's Student List ---
    const getSavedTeacherStudents = () => {
        if (!currentUser) return [];
        const stored = localStorage.getItem('edu_teacher_students_' + currentUser.id);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {}
        }
        return currentUser.students || [];
    };

    const saveTeacherStudents = (students) => {
        if (!currentUser) return;
        localStorage.setItem('edu_teacher_students_' + currentUser.id, JSON.stringify(students));
        currentUser.students = students;
        localStorage.setItem('edu_kiashahr_user', JSON.stringify(currentUser));
    };

    // --- Teacher Dashboard Modal Workspace ---
    const openTeacherPanelModal = () => {
        const students = getSavedTeacherStudents();
        let studentsListHtml = '';
        if (students.length === 0) {
            studentsListHtml = `
                <div style="font-size: 0.85rem; color: var(--edu-text-muted); margin: 0; padding: 12px; background: #fafafa; border: 1px dashed var(--edu-border); border-radius: 12px; width: 100%; text-align: center;">
                    📌 هنوز دانش‌آموزی به لیست خود اضافه نکرده‌اید. با جستجو و ثبت شناسه در بخش زیر، او را به لیست دائم خود اضافه کنید.
                </div>
            `;
        } else {
            studentsListHtml = students.map(student => `
                <div class="edu-student-pill" style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid var(--edu-border); padding: 8px 14px; border-radius: 50px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin: 4px;" onclick="window.selectTeacherStudent('${student.id}')">
                    <span style="font-size: 1.1rem;">👤</span>
                    <span style="font-weight: 700; font-size: 0.85rem; color: var(--edu-text-dark);">${student.username}</span>
                    <span style="font-size: 0.75rem; color: var(--edu-text-muted); background: #f1f5f9; padding: 2px 6px; border-radius: 10px;">${student.id}</span>
                    <button type="button" style="background: none; border: none; color: #ef4444; font-size: 1.2rem; cursor: pointer; padding: 0 4px; display: inline-flex; align-items: center; line-height: 1;" onclick="event.stopPropagation(); window.removeTeacherStudent('${student.id}')" title="حذف از لیست">×</button>
                </div>
            `).join('');
        }

        const teacherHtml = `
            <div class="edu-profile-card" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%) !important; border-color: rgba(59, 130, 246, 0.2) !important;">
                <div>
                    <h4 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #1e40af;">${currentUser.username}</h4>
                    <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: var(--edu-text-muted);">دسترسی: معلم بندرکیاشهر 🔬</p>
                </div>
                <span class="edu-id-badge" style="background: #2563eb !important;">🆔 کد پرسنلی: ${currentUser.id}</span>
            </div>

            <!-- Saved Students Section -->
            <div style="margin-top: 24px; margin-bottom: 24px; border-bottom: 1px solid var(--edu-border); padding-bottom: 20px;">
                <h4 style="margin: 0 0 8px 0; font-weight: 800; font-size: 1.1rem; color: var(--edu-text-dark); display: flex; align-items: center; gap: 8px;">
                    <span>👥 دانش‌آموزان من</span>
                </h4>
                <p style="color: var(--edu-text-muted); font-size: 0.85rem; margin-top: 2px; margin-bottom: 12px;">روی نام هر دانش‌آموز کلیک کنید تا کارنامه کامل و نمودار پیشرفت او لود شود.</p>
                <div id="teacherStudentsList" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                    ${studentsListHtml}
                </div>
            </div>

            <h4 style="margin-top: 20px; font-weight: 800; font-size: 1.1rem;">🔍 افزودن یا ردیابی دانش‌آموز جدید</h4>
            <p style="color: var(--edu-text-muted); font-size: 0.85rem; margin-top: 2px; margin-bottom: 12px;">شناسه مخصوص دانش‌آموز خود را وارد کنید تا کارنامه، روند پیشرفت و فعالیت‌های او را مشاهده نمایید.</p>
            
            <div class="edu-teacher-search-box">
                <input type="text" id="teacherSearchId" class="edu-form-input" placeholder="مثال: STD-1385" style="text-transform: uppercase;">
                <button type="button" class="edu-search-btn" id="teacherSearchBtn" onclick="searchStudentById()">بررسی و ثبت</button>
            </div>

            <!-- Student Dashboard display dynamically loaded inside here -->
            <div id="teacherStudentResult">
                <div style="text-align: center; color: var(--edu-text-muted); border: 2px dashed var(--edu-border); border-radius: 18px; padding: 40px 20px;">
                    <span style="font-size: 3rem;">🕵️‍♂️</span>
                    <p style="margin-top: 15px; font-weight: 700; font-size: 1.1rem;">در انتظار ورود شناسه یا انتخاب دانش‌آموز...</p>
                    <p style="font-size: 0.85rem; margin-top: 5px;">می‌توانید شناسه نمونه <b>STD-1385</b> را برای مشاهده کارنامه دمو حسین رضایی تست کنید.</p>
                </div>
            </div>

            <button class="edu-submit-btn" style="background: #ef4444 !important; margin-top: 30px;" onclick="logOut()">❌ خروج از پنل معلم</button>
        `;
        showModal('میز کار دبیران و معلمان', teacherHtml);
    };

    window.selectTeacherStudent = (studentId) => {
        document.getElementById('teacherSearchId').value = studentId;
        searchStudentById();
    };

    const showCustomConfirm = (message) => {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'edu-modal-overlay active';
            overlay.style.zIndex = '200000';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.direction = 'rtl';
            
            overlay.innerHTML = `
                <div class="edu-modal-container" style="max-width: 380px !important; text-align: center !important; padding: 25px !important; transform: scale(1) translateY(0) !important; opacity: 1 !important;">
                    <div style="font-size: 2.5rem; margin-bottom: 12px;">🗑️</div>
                    <h4 style="margin: 0 0 10px 0; font-size: 1.1rem; font-weight: 800; color: var(--edu-text-dark);">${message}</h4>
                    <p style="margin: 0 0 20px 0; font-size: 0.85rem; color: var(--edu-text-muted);">این عمل قابل بازگشت نیست.</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button id="customConfirmYes" style="background: #ef4444; color: white; border: none; padding: 10px 16px; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 0.9rem; flex: 1;">بله، حذف شود</button>
                        <button id="customConfirmNo" style="background: #f1f5f9; color: #334155; border: none; padding: 10px 16px; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 0.9rem; flex: 1;">انصراف</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(overlay);
            
            const handleYes = () => {
                overlay.remove();
                resolve(true);
            };
            const handleNo = () => {
                overlay.remove();
                resolve(false);
            };
            
            overlay.querySelector('#customConfirmYes').addEventListener('click', handleYes);
            overlay.querySelector('#customConfirmNo').addEventListener('click', handleNo);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) handleNo();
            });
        });
    };

    window.removeTeacherStudent = async (studentId) => {
        const confirmed = await showCustomConfirm('آیا مطمئن هستید که می‌خواهید این دانش‌آموز را از لیست خود حذف کنید؟');
        if (!confirmed) {
            return;
        }

        let students = getSavedTeacherStudents();
        students = students.filter(s => s.id !== studentId);
        saveTeacherStudents(students);

        showToast('دانش‌آموز با موفقیت از لیست شما حذف شد.', true);

        // Refresh students list UI
        const listContainer = document.getElementById('teacherStudentsList');
        if (listContainer) {
            if (students.length === 0) {
                listContainer.innerHTML = `
                    <div style="font-size: 0.85rem; color: var(--edu-text-muted); margin: 0; padding: 12px; background: #fafafa; border: 1px dashed var(--edu-border); border-radius: 12px; width: 100%; text-align: center;">
                        📌 هنوز دانش‌آموزی به لیست خود اضافه نکرده‌اید. با جستجو و ثبت شناسه در بخش زیر، او را به لیست دائم خود اضافه کنید.
                    </div>
                `;
            } else {
                listContainer.innerHTML = students.map(s => `
                    <div class="edu-student-pill" style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid var(--edu-border); padding: 8px 14px; border-radius: 50px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin: 4px;" onclick="window.selectTeacherStudent('${s.id}')">
                        <span style="font-size: 1.1rem;">👤</span>
                        <span style="font-weight: 700; font-size: 0.85rem; color: var(--edu-text-dark);">${s.username}</span>
                        <span style="font-size: 0.75rem; color: var(--edu-text-muted); background: #f1f5f9; padding: 2px 6px; border-radius: 10px;">${s.id}</span>
                        <button type="button" style="background: none; border: none; color: #ef4444; font-size: 1.2rem; cursor: pointer; padding: 0 4px; display: inline-flex; align-items: center; line-height: 1;" onclick="event.stopPropagation(); window.removeTeacherStudent('${s.id}')" title="حذف از لیست">×</button>
                    </div>
                `).join('');
            }
        }

        // If the removed student is currently viewed, clear results
        const currentSearchVal = document.getElementById('teacherSearchId').value.trim().toUpperCase();
        if (currentSearchVal === studentId) {
            document.getElementById('teacherSearchId').value = '';
            document.getElementById('teacherStudentResult').innerHTML = `
                <div style="text-align: center; color: var(--edu-text-muted); border: 2px dashed var(--edu-border); border-radius: 18px; padding: 40px 20px;">
                    <span style="font-size: 3rem;">🕵️‍♂️</span>
                    <p style="margin-top: 15px; font-weight: 700; font-size: 1.1rem;">در انتظار ورود شناسه یا انتخاب دانش‌آموز...</p>
                </div>
            `;
        }

        // Background server sync
        try {
            await callApi('/api/teacher/students/remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teacherId: currentUser.id,
                    studentId
                })
            });
        } catch (e) {
            console.warn("Background remove student sync failed:", e);
        }
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
            const data = await callApi(`/api/student/progress/${studentId}`);

            searchBtn.innerText = 'بررسی و ثبت';
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

            // Automatically add student to teacher's list if not already present
            let savedStudents = getSavedTeacherStudents();
            let isAlreadySaved = savedStudents.some(s => s.id === student.id);
            if (!isAlreadySaved) {
                savedStudents.push({
                    id: student.id,
                    username: student.username
                });
                saveTeacherStudents(savedStudents);
                showToast(`دانش‌آموز «${student.username}» به لیست شما اضافه شد.`, true);

                // Update students list UI dynamically
                const listContainer = document.getElementById('teacherStudentsList');
                if (listContainer) {
                    listContainer.innerHTML = savedStudents.map(s => `
                        <div class="edu-student-pill" style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid var(--edu-border); padding: 8px 14px; border-radius: 50px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin: 4px;" onclick="window.selectTeacherStudent('${s.id}')">
                            <span style="font-size: 1.1rem;">👤</span>
                            <span style="font-weight: 700; font-size: 0.85rem; color: var(--edu-text-dark);">${s.username}</span>
                            <span style="font-size: 0.75rem; color: var(--edu-text-muted); background: #f1f5f9; padding: 2px 6px; border-radius: 10px;">${s.id}</span>
                            <button type="button" style="background: none; border: none; color: #ef4444; font-size: 1.2rem; cursor: pointer; padding: 0 4px; display: inline-flex; align-items: center; line-height: 1;" onclick="event.stopPropagation(); window.removeTeacherStudent('${s.id}')" title="حذف از لیست">×</button>
                        </div>
                    `).join('');
                }

                // Try to sync with server in background
                try {
                    await callApi('/api/teacher/students/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            teacherId: currentUser.id,
                            studentId: student.id
                        })
                    });
                } catch (addErr) {
                    console.warn("Background add student sync failed:", addErr);
                }
            }

            // Compute statistics
            const totalTasks = progress.length;
            const averageScore = totalTasks === 0 ? 0 : Math.round(progress.reduce((sum, item) => sum + (item.score || 0), 0) / totalTasks);
            const totalStars = progress.reduce((sum, item) => sum + (item.stars || 0), 0);

            // --- GENERATE CUSTOM DAILY STREAK ---
            const streakInfo = getStreakInfo(progress);
            const currentStreak = streakInfo.currentStreak;
            
            let streakHtml = `
                <div class="edu-streak-container" style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%) !important; border: 2px solid #fcd34d !important; border-radius: 20px !important; padding: 20px !important; margin-bottom: 24px !important; text-align: center !important; position: relative !important; overflow: hidden !important; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.1) !important;">
                    <div style="position: absolute; top: -10px; right: -10px; font-size: 5rem; opacity: 0.1; transform: rotate(15deg); pointer-events: none;">🔥</div>
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                        <div class="edu-streak-badge">
                            🔥
                        </div>
                        <h4 style="margin: 0; font-size: 1.2rem; font-weight: 800; color: #9a3412;">استریک روزانه دانش‌آموز</h4>
                        <p style="margin: 0; font-size: 1rem; color: #c2410c; font-weight: 700;">
                            ${currentStreak > 0 ? `آفرین! <b>${currentStreak} روز متوالی</b> تلاش و حل تمرین فعال داشته است.` : 'هنوز استریک جدیدی شروع نشده است. با حل تمرین امروز استریک را فعال کنید!'}
                        </p>
                    </div>
                    
                    <!-- Week calendar tracking -->
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-top: 20px; border-top: 1px dashed rgba(234, 88, 12, 0.2); padding-top: 15px;">
                        ${streakInfo.last7Days.map(day => {
                            const activeBg = day.hasSolved ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' : '#e2e8f0';
                            const activeText = day.hasSolved ? '#ffffff' : '#64748b';
                            const borderStyle = day.isToday ? 'border: 2px solid #ea580c' : 'border: 1px solid transparent';
                            const statusIcon = day.hasSolved ? '🔥' : '⚪';
                            return `
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; ${borderStyle}; border-radius: 12px; padding: 6px 4px; background: ${day.isToday ? '#ffffff' : 'transparent'};">
                                    <span style="font-size: 0.7rem; font-weight: 700; color: #7c2d12;">${day.dayName}</span>
                                    <div style="width: 32px; height: 32px; border-radius: 50%; background: ${activeBg}; color: ${activeText}; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; font-weight: 800; box-shadow: ${day.hasSolved ? '0 4px 8px rgba(234, 88, 12, 0.25)' : 'none'};">
                                        ${statusIcon}
                                    </div>
                                    ${day.isToday ? '<span style="font-size: 0.65rem; color: #ea580c; font-weight: 800;">امروز</span>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;

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

                <!-- Custom visual Daily Streak rendered here -->
                ${streakHtml}

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
            const data = await callApi('/api/teacher/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId,
                    teacherName: currentUser.username,
                    comment
                })
            });
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

    // Calculate streak from exercise progress items
    const getStreakInfo = (progressItems) => {
        // Filter only progress items of type "exercise"
        const exerciseProgress = (progressItems || []).filter(p => p.type === 'exercise');
        
        // Extract unique dates of exercise completion (YYYY-MM-DD in local time)
        const dates = exerciseProgress.map(p => {
            const d = new Date(p.timestamp);
            return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        });
        const uniqueDates = Array.from(new Set(dates));
        
        const now = new Date();
        const formatDate = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        
        const todayStr = formatDate(now);
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const yesterdayStr = formatDate(yesterday);
        
        // Sort unique dates descending
        uniqueDates.sort((a, b) => new Date(b) - new Date(a));
        
        let currentStreak = 0;
        
        // Streak is active if student has done an exercise today or yesterday
        if (uniqueDates.includes(todayStr) || uniqueDates.includes(yesterdayStr)) {
            // Start from the most recent exercise date (either today or yesterday)
            let checkDate = uniqueDates.includes(todayStr) ? new Date(todayStr) : new Date(yesterdayStr);
            while (true) {
                const checkStr = formatDate(checkDate);
                if (uniqueDates.includes(checkStr)) {
                    currentStreak++;
                    checkDate.setDate(checkDate.getDate() - 1); // Go to previous day
                } else {
                    break;
                }
            }
        }
        
        // Calculate current week status (Saturday to Friday)
        const last7Days = [];
        const dayNames = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
        
        // Find how many days to subtract from today to get to Saturday of the current week
        // JS day of week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday
        const jsDay = now.getDay();
        const daysSinceSaturday = (jsDay + 1) % 7;
        
        for (let i = 0; i < 7; i++) {
            const d = new Date(now);
            d.setDate(now.getDate() - daysSinceSaturday + i);
            const dStr = formatDate(d);
            const hasSolved = uniqueDates.includes(dStr);
            last7Days.push({
                dateStr: dStr,
                dayName: dayNames[d.getDay()],
                hasSolved: hasSolved,
                isToday: dStr === todayStr
            });
        }
        
        return {
            currentStreak,
            last7Days
        };
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

    // Helper to safely set floating tracker HTML with close/dismiss functionality and auto-fade support
    const setTrackerWidgetHTML = (widget, htmlContent, shouldAutoFade = false) => {
        if (!widget) return;
        // Reset any transition, opacity and make sure display is flex
        widget.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        widget.style.opacity = '1';
        widget.style.transform = 'none';
        widget.style.display = 'flex';
        
        // Render content with an elegant close button (X) on the left (RTL style)
        widget.innerHTML = `
            <div class="edu-tracker-inner" style="display: flex; align-items: center; gap: 8px;">
                ${htmlContent}
            </div>
            <button class="edu-tracker-close-btn" style="background: rgba(255,255,255,0.15); border: none; color: white; cursor: pointer; font-size: 1.1rem; font-weight: bold; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 8px; transition: background 0.2s; outline: none; flex-shrink: 0;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" onclick="event.stopPropagation(); document.getElementById('eduFloatingTracker').style.display='none'; window._eduTrackerHidden=true;">×</button>
        `;
        
        if (shouldAutoFade) {
            if (widget._fadeTimeout) clearTimeout(widget._fadeTimeout);
            widget._fadeTimeout = setTimeout(() => {
                widget.style.opacity = '0';
                widget.style.transform = 'translateY(15px) scale(0.95)';
                setTimeout(() => {
                    widget.style.display = 'none';
                }, 300);
            }, 6000); // Wait 6 seconds, then fade out automatically
        }
    };

    // Tracker Widget inside Interactive Exercises
    const renderExerciseTrackerWidget = () => {
        if (!currentUser || currentUser.role !== 'student') return; // Only students record progress

        const exerciseName = document.title || 'تمرین تعاملی';
        const subject = getSubjectFromPath(window.location.pathname);

        const widget = document.createElement('div');
        widget.className = 'edu-tracker-widget';
        widget.id = 'eduFloatingTracker';
        widget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
        widget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
        widget.style.pointerEvents = 'auto'; // Allowed pointer events to support close button
        widget.style.display = 'none'; // Initially hidden
        document.body.appendChild(widget);

        // We don't display it initially, so set tracker HTML without changing display to flex
        widget.innerHTML = `
            <div class="edu-tracker-inner" style="display: flex; align-items: center; gap: 8px;">
                <span>🎮</span>
                <span>ثبت خودکار فعال است</span>
            </div>
        `;

        let exerciseSaved = false;
        let interactionsCount = 0;
        let timeElapsed = 0;

        // Detect user interactions to make sure they're actually playing
        const registerInteraction = () => {
            interactionsCount++;
        };
        document.addEventListener('click', registerInteraction);
        document.addEventListener('keydown', registerInteraction);

        const detectScore = () => {
            let scoreVal = 100;
            // 1. Check window variables
            if (typeof window.score !== 'undefined') {
                scoreVal = Number(window.score);
            } else if (typeof score !== 'undefined') {
                scoreVal = Number(score);
            } else if (typeof window.gameScore !== 'undefined') {
                scoreVal = Number(window.gameScore);
            }
            // 2. Read from common element IDs if available
            const scoreElement = document.getElementById('score-val') || document.getElementById('score') || document.getElementById('final-score');
            if (scoreElement) {
                const parsed = parseInt(scoreElement.innerText.replace(/[^0-9]/g, ''));
                if (!isNaN(parsed)) {
                    scoreVal = parsed;
                }
            }
            return scoreVal;
        };

        const autoSaveExerciseProgress = async (scoreToSave) => {
            if (exerciseSaved) return;
            exerciseSaved = true;

            widget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            widget.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
            setTrackerWidgetHTML(widget, `
                <span>⚡</span>
                <span>در حال ثبت امتیاز...</span>
            `);

            // Give 1 point and 1 star for this activity as requested
            const success = await submitProgressReport(subject, exerciseName, 'exercise', 1, 1, true);
            if (success) {
                widget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                window._eduTrackerHidden = false; // Reset hidden state so notification is shown
                setTrackerWidgetHTML(widget, `
                    <span>✅</span>
                    <span>امتیاز ۱ ثبت شد!</span>
                `, true); // Auto fade-out after 6 seconds
            } else {
                widget.style.background = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
                window._eduTrackerHidden = false; // Reset hidden state so notification is shown
                setTrackerWidgetHTML(widget, `
                    <span>❌</span>
                    <span>خطا در ثبت خودکار!</span>
                `, true); // Auto fade-out after 6 seconds
                // Reset flag on failure to allow retry if they trigger it again
                exerciseSaved = false;
            }
        };

        // 1. Wrap common end game methods dynamically
        const wrapEndGameFunctions = () => {
            const fns = ['endGame', 'showEndScreen', 'showResult', 'finishGame', 'gameOver'];
            fns.forEach(fnName => {
                if (typeof window[fnName] === 'function' && !window[fnName]._isWrapped) {
                    const original = window[fnName];
                    window[fnName] = function(...args) {
                        const scoreVal = detectScore();
                        autoSaveExerciseProgress(scoreVal);
                        return original.apply(this, args);
                    };
                    window[fnName]._isWrapped = true;
                }
            });
        };

        // Periodically check and wrap newly defined functions
        const wrapInterval = setInterval(wrapEndGameFunctions, 1000);

        // 2. DOM Observation for End Screens becoming visible
        const checkEndScreenVisibility = () => {
            if (exerciseSaved) return;

            const endElements = [
                document.getElementById('endScreen'),
                document.getElementById('screen-result'),
                document.getElementById('result-screen'),
                document.querySelector('.end-screen'),
                document.querySelector('.result-container')
            ];

            for (const el of endElements) {
                if (el && el.style.display !== 'none' && getComputedStyle(el).display !== 'none') {
                    const scoreVal = detectScore();
                    autoSaveExerciseProgress(scoreVal);
                    break;
                }
            }
        };
        const domInterval = setInterval(checkEndScreenVisibility, 1000);

        // 3. Time fallback for endless exercises (e.g. counting shapes)
        const timeFallbackInterval = setInterval(() => {
            if (exerciseSaved) {
                clearInterval(timeFallbackInterval);
                clearInterval(wrapInterval);
                clearInterval(domInterval);
                document.removeEventListener('click', registerInteraction);
                document.removeEventListener('keydown', registerInteraction);
                return;
            }

            timeElapsed += 2;

            // If stayed for 40 seconds and interacted at least 3 times
            if (timeElapsed >= 40 && interactionsCount >= 3) {
                const scoreVal = detectScore();
                autoSaveExerciseProgress(scoreVal);
            }
        }, 2000);
    };

    // Tracker Widget inside book lessons (Quran, Persian, Math, Science)
    let lastActiveLesson = null;
    let lastActiveActivityType = null;
    const lessonSavedSet = new Set();
    
    // State storage for interactions
    let activeFlippedCardsSet = new Set();
    let activeQuranTilesSet = new Set();
    let videoWatchTimeElapsed = 0;
    let quizClicked = false;
    let fallbackSecondsRemaining = 40; // reduced slightly to 40 for premium feel
    let lessonInteractionsCount = 0;
    let videoTimer = null;
    let fallbackTimer = null;

    const renderLessonTrackerWidget = () => {
        if (!currentUser || currentUser.role !== 'student') return; // Only students

        // Setup global/document-level listener for interaction counts
        const registerLessonInteraction = () => {
            lessonInteractionsCount++;
        };
        document.removeEventListener('click', registerLessonInteraction);
        document.removeEventListener('keydown', registerLessonInteraction);
        document.addEventListener('click', registerLessonInteraction);
        document.addEventListener('keydown', registerLessonInteraction);

        // Since lessons are loaded dynamically when clicking on a sidebar title, we want to know the current active lesson name!
        const checkActiveLesson = () => {
            const path = window.location.pathname;
            let lessonName = '';
            
            // 1. Grade 1 Persian (/Persian/)
            if (path.includes('/Persian/') && !path.includes('/Persian2/')) {
                const activeLi = document.querySelector('#sidebar .submenu li.active');
                if (activeLi) {
                    const parentLesson = activeLi.closest('.lesson-item');
                    if (parentLesson) {
                        const titleEl = parentLesson.querySelector('.lesson-title');
                        if (titleEl) {
                            lessonName = titleEl.innerText.trim();
                        }
                    }
                }
                if (!lessonName) {
                    const activeTitle = document.querySelector('#sidebar .lesson-title.active');
                    if (activeTitle) {
                        lessonName = activeTitle.innerText.trim();
                    }
                }
            }
            // 2. Grade 2 Persian (/Persian2/)
            else if (path.includes('/Persian2/')) {
                const activeSpan = document.querySelector('#sidebar .submenu .submenu-item.active');
                if (activeSpan) {
                    const parentLesson = activeSpan.closest('.lesson-item');
                    if (parentLesson) {
                        const titleEl = parentLesson.querySelector('.lesson-header span');
                        if (titleEl) {
                            lessonName = titleEl.innerText.trim();
                        }
                    }
                }
            }
            // 3. Science
            else if (path.includes('/science/')) {
                const activeA = document.querySelector('#sidebar .submenu a.active');
                if (activeA) {
                    const parentLesson = activeA.closest('.lesson-item');
                    if (parentLesson) {
                        const titleEl = parentLesson.querySelector('.topic-title');
                        if (titleEl) {
                            lessonName = titleEl.innerText.trim();
                        }
                    }
                }
            }
            // 4. Quran
            else if (path.includes('/quran/')) {
                const activeTopic = document.querySelector('#sidebar .topic-title.active');
                if (activeTopic) {
                    lessonName = activeTopic.innerText.trim();
                }
            }
            
            // Fallback: If no custom lesson was found, look at generic active sidebar items or title header
            if (!lessonName) {
                const activeSidebarItem = document.querySelector('.sidebar a.active, .sidebar li.active, .sidebar-link.active, .topic-item.active, .topic-title.active, .lesson-item .submenu-item.active');
                if (activeSidebarItem) {
                    lessonName = activeSidebarItem.innerText.trim();
                } else {
                    const displayHeader = document.querySelector('#main-content h1, #main-content h2, .main-content h1, .main-content h2, h1, h2, .topic-main-title');
                    if (displayHeader) {
                        lessonName = displayHeader.innerText.trim();
                    }
                }
            }

            // Clean typical prefixes/emojis from lessonName
            if (lessonName) {
                lessonName = lessonName.replace(/^[🗂🎥🎮🕌📚✍️🔑🎵🔍🏆📺🎥🕹️🃏🗣️📖🤖✨✅⏳❌🎯★⭐\s]+/, '').trim();
            }

            // Ignore welcome/generic messages
            if (!lessonName || lessonName.includes('خوش آمدید') || lessonName.includes('قهرمان') || lessonName.includes('آموزش و پرورش') || lessonName.includes('کلاس اول') || lessonName.includes('پایهٔ اول') || lessonName.includes('پایهٔ دوم')) {
                return null;
            }

            return lessonName;
        };

        const getActivityFarsiName = (type) => {
            const names = {
                'memory': 'بازی کارت حافظه',
                'scramble': 'بازی جمله‌سازی',
                'listen-tap': 'تمرین شنیداری',
                'word-sound': 'تمرین پیدا کردن کلمه',
                'flashcards': 'فلش‌کارت کلمات',
                'quran': 'تمرین تلفظ لوحه‌ها',
                'video': 'ویدئوی آموزشی',
                'quiz': 'آزمونک درس',
                'match-game': 'بازی وصل کردنی'
            };
            return names[type] || 'مطالعه بخش';
        };

        const detectActiveActivity = () => {
            // 1. Memory Game
            if (document.querySelector('.memory-game, #memory-board')) {
                const cards = document.querySelectorAll('.memory-card');
                const isCompleted = cards.length > 0 && Array.from(cards).every(c => c.classList.contains('flip') || c.classList.contains('matched'));
                return {
                    type: 'memory',
                    label: isCompleted ? '🎮 بازی حافظه حل شد!' : '🎮 حل کامل بازی کارت حافظه',
                    check: () => isCompleted
                };
            }
            // 2. Sentence Scramble
            if (document.querySelector('.scramble-container')) {
                const isCompleted = !!document.querySelector('.results-summary') || 
                                   (document.getElementById('progress-bar-fill') && document.getElementById('progress-bar-fill').style.width === '100%') ||
                                   (document.querySelector('.feedback') && document.querySelector('.feedback').textContent.includes('تمرین تمام شد'));
                return {
                    type: 'scramble',
                    label: isCompleted ? '✍️ بازی جمله‌سازی حل شد!' : '✍️ مرتب کردن جمله‌ها',
                    check: () => isCompleted
                };
            }
            // 3. Listen & Tap Game
            if (document.querySelector('.lt-score, #lt-score, .listen-and-tap-container')) {
                const feedback = document.querySelector('#feedback') || document.querySelector('.feedback');
                const isCompleted = !!(feedback && feedback.textContent.includes('بازی به پایان رسید'));
                return {
                    type: 'listen-tap',
                    label: isCompleted ? '🎵 تمرین شنیداری انجام شد!' : '🎵 انجام کامل تمرین شنیداری',
                    check: () => isCompleted
                };
            }
            // 4. Word Sound Exercise
            if (document.querySelector('.word-sound-exercise-container')) {
                const corrects = document.querySelectorAll('.exercise-word.correct');
                const isCompleted = corrects.length >= 3;
                return {
                    type: 'word-sound',
                    label: `🔍 یافتن کلمات با صدای هدف (${Math.min(3, corrects.length)}/۳)`,
                    check: () => isCompleted
                };
            }
            // 5. Flashcards
            if (document.querySelector('.flashcard, .flashcard-grid')) {
                const count = activeFlippedCardsSet ? activeFlippedCardsSet.size : 0;
                const isCompleted = count >= 4;
                return {
                    type: 'flashcards',
                    label: `🗂️ مرور فلش‌کارت‌ها (${Math.min(4, count)}/۴)`,
                    check: () => isCompleted,
                    setup: () => {
                        document.querySelectorAll('.flashcard').forEach((card, idx) => {
                            if (!card.dataset.trackerBound) {
                                card.dataset.trackerBound = 'true';
                                card.addEventListener('click', () => {
                                    activeFlippedCardsSet.add(idx);
                                    updateLessonWidget();
                                });
                            }
                        });
                    }
                };
            }
            // 6. Quran Tiles
            if (document.querySelector('.quran-tile, .tiles-container')) {
                const count = activeQuranTilesSet ? activeQuranTilesSet.size : 0;
                const isCompleted = count >= 4;
                return {
                    type: 'quran',
                    label: `🕌 شنیدن تلفظ لوحه‌ها (${Math.min(4, count)}/۴)`,
                    check: () => isCompleted,
                    setup: () => {
                        document.querySelectorAll('.quran-tile').forEach((tile, idx) => {
                            if (!tile.dataset.trackerBound) {
                                tile.dataset.trackerBound = 'true';
                                tile.addEventListener('click', () => {
                                    activeQuranTilesSet.add(idx);
                                    updateLessonWidget();
                                });
                            }
                        });
                    }
                };
            }
            // 7. Videos
            if (document.querySelector('.video-container, .video-item, iframe')) {
                const isCompleted = videoWatchTimeElapsed >= 15;
                return {
                    type: 'video',
                    label: `📺 تماشای ویدئو (${Math.min(15, videoWatchTimeElapsed)}/۱۵ ثانیه)`,
                    check: () => isCompleted,
                    setup: () => {
                        if (!videoTimer) {
                            videoTimer = setInterval(() => {
                                videoWatchTimeElapsed++;
                                updateLessonWidget();
                            }, 1000);
                        }
                    }
                };
            }
            // 8. Quiz
            if (document.querySelector('.quiz-container, .quiz-launch-pad, .start-quiz-btn')) {
                const isCompleted = !!quizClicked;
                return {
                    type: 'quiz',
                    label: isCompleted ? '🏆 آزمون شروع شد!' : '🏆 شروع آزمونک درس',
                    check: () => isCompleted,
                    setup: () => {
                        const btn = document.querySelector('.start-quiz-btn, .quiz-launch-pad button, .quiz-launch-pad a');
                        if (btn && !btn.dataset.trackerBound) {
                            btn.dataset.trackerBound = 'true';
                            btn.addEventListener('click', () => {
                                quizClicked = true;
                                updateLessonWidget();
                            });
                        }
                    }
                };
            }
            // 9. Match Game (Persian 2)
            if (document.querySelector('.match-finish') || (window._matchState && document.querySelector('.match-grid .match-finish'))) {
                return {
                    type: 'match-game',
                    label: '🎮 بازی وصل کردنی حل شد!',
                    check: () => true
                };
            } else if (window._matchState) {
                return {
                    type: 'match-game',
                    label: '🎮 حل بازی وصل کردنی',
                    check: () => {
                        const state = window._matchState;
                        return state.current >= state.rounds.length - 1 && state.matchesThisRound >= state.pronouns.length;
                    }
                };
            }
            
            // Fallback for general page with interaction
            const isCompleted = fallbackSecondsRemaining <= 0;
            return {
                type: 'fallback',
                label: `🎯 حضور فعال در درس (${Math.max(0, fallbackSecondsRemaining)}s)`,
                check: () => isCompleted,
                setup: () => {
                    if (!fallbackTimer) {
                        fallbackTimer = setInterval(() => {
                            if (lessonInteractionsCount >= 2 && fallbackSecondsRemaining > 0) {
                                fallbackSecondsRemaining--;
                            }
                            updateLessonWidget();
                        }, 1000);
                    }
                }
            };
        };

        const autoSaveLessonProgress = async (lessonName, activityType, displayName) => {
            const saveKey = `${lessonName} - ${activityType}`;
            if (lessonSavedSet.has(saveKey)) return;
            lessonSavedSet.add(saveKey);

            let widget = document.getElementById('eduFloatingTracker');
            if (widget) {
                widget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                widget.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
                window._eduTrackerHidden = false; // Reset hidden state so saving state shows
                setTrackerWidgetHTML(widget, `
                    <span>⚡</span>
                    <span>در حال ثبت پیشرفت...</span>
                `);
            }

            const subject = getSubjectFromPath(window.location.pathname);
            const reportTitle = `${displayName} - ${lessonName}`;
            // Give 1 point and 1 star for each completed activity as requested
            const success = await submitProgressReport(subject, reportTitle, 'lesson', 1, 1, true);
            
            if (widget) {
                if (success) {
                    widget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                    window._eduTrackerHidden = false; // Show success popup even if hidden previously
                    setTrackerWidgetHTML(widget, `
                        <span>✅</span>
                        <span>بخش ${displayName} با موفقیت ثبت شد!</span>
                    `, true); // Fade out after 6 seconds
                } else {
                    widget.style.background = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
                    window._eduTrackerHidden = false; // Show failure popup even if hidden previously
                    setTrackerWidgetHTML(widget, `
                        <span>❌</span>
                        <span>خطا در ثبت خودکار!</span>
                    `, true); // Fade out after 6 seconds
                    lessonSavedSet.delete(saveKey); // allow retry
                }
            }
        };

        const updateLessonWidget = () => {
            const lessonName = checkActiveLesson();
            let widget = document.getElementById('eduFloatingTracker');

            if (!lessonName) {
                if (widget) widget.style.display = 'none';
                return;
            }

            const currentActivity = detectActiveActivity();
            const activityType = currentActivity ? currentActivity.type : 'fallback';
            const activityDisplayName = getActivityFarsiName(activityType);

            // Check if this lesson or activity has changed
            if (lessonName !== lastActiveLesson || activityType !== lastActiveActivityType) {
                lastActiveLesson = lessonName;
                lastActiveActivityType = activityType;

                // Reset hidden state when changing lesson/activity so user gets progress tracked again
                window._eduTrackerHidden = false;

                // Reset specific states
                activeFlippedCardsSet = new Set();
                activeQuranTilesSet = new Set();
                videoWatchTimeElapsed = 0;
                quizClicked = false;
                fallbackSecondsRemaining = 40;
                lessonInteractionsCount = 0;

                if (videoTimer) {
                    clearInterval(videoTimer);
                    videoTimer = null;
                }
                if (fallbackTimer) {
                    clearInterval(fallbackTimer);
                    fallbackTimer = null;
                }
            }

            // If the user manually closed the widget, keep it hidden on this activity
            if (window._eduTrackerHidden) {
                if (widget) widget.style.display = 'none';
                return;
            }

            if (!widget) {
                widget = document.createElement('div');
                widget.className = 'edu-tracker-widget';
                widget.id = 'eduFloatingTracker';
                widget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)';
                widget.style.boxShadow = '0 10px 25px -5px rgba(79, 70, 229, 0.4)';
                widget.style.pointerEvents = 'auto'; // Allowed pointer events to support close button
                widget.style.display = 'none'; // Initially hidden during reading/active state
                document.body.appendChild(widget);
            }

            // Setup listeners if needed
            if (currentActivity && currentActivity.setup) {
                currentActivity.setup();
            }

            const saveKey = `${lessonName} - ${activityType}`;
            if (lessonSavedSet.has(saveKey)) {
                widget.style.display = 'flex';
                widget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                setTrackerWidgetHTML(widget, `
                    <span>✅</span>
                    <span>${activityDisplayName} ثبت شد</span>
                `, true); // Fade out after 6 seconds
                return;
            }

            // Check completion criteria
            if (currentActivity && currentActivity.check()) {
                autoSaveLessonProgress(lessonName, activityType, activityDisplayName);
            } else {
                // Keep the active/idle/reading state widget completely hidden as requested
                widget.style.display = 'none';
            }
        };

        // Run once on start and observe for page/lesson switches
        setTimeout(updateLessonWidget, 1000);

        // Periodically check in case dynamic scripts change content without changing route path
        setInterval(updateLessonWidget, 2000);
    };

    window.submitProgressReport = async (subject, title, type, customScore, customStars, isSilent = false) => {
        const score = typeof customScore !== 'undefined' ? customScore : (document.getElementById('trackerReportScore') ? Number(document.getElementById('trackerReportScore').value) : 1);
        const stars = typeof customStars !== 'undefined' ? customStars : (window.activeTrackerStars || 1);

        try {
            const data = await callApi('/api/student/progress', {
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
            if (data.success) {
                if (!isSilent) {
                    showToast(data.message, true);
                    closeModal();
                } else {
                    showToast(`✨ پیشرفت شما در "${title.replace('مطالعه بخش: ', '')}" خودکار ذخیره شد!`, true);
                }
                
                // Add tiny visual celebration effects
                triggerConfettiEffect();
                return true;
            } else {
                if (!isSilent) {
                    showToast(data.message, false);
                }
                return false;
            }
        } catch (e) {
            if (!isSilent) {
                showToast('خطا در ذخیره‌سازی پیشرفت تحصیلی', false);
            }
            return false;
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
