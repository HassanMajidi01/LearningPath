const { useState, useEffect, useRef } = React;
import { playSound, getSeededRandom, toPersianDigits } from './utils.js';
import SudokuGame from './components/SudokuGame.jsx';
import CountingGame from './components/CountingGame.jsx';
import TallyGame from './components/TallyGame.jsx';
import ArithmeticGame from './components/ArithmeticGame.jsx';
import PatternGame from './components/PatternGame.jsx';
import PlaceValueGame from './components/PlaceValueGame.jsx';
import DailyChallengeGame from './components/DailyChallengeGame.jsx';

// --- Gameplay router component ---
function GamePlayArea({ game, difficulty, onComplete }) {
    if (game.id === 'sudoku') {
        return <SudokuGame difficulty={difficulty} onComplete={onComplete} />;
    }
    if (game.id === 'counting') {
        return <CountingGame difficulty={difficulty} onComplete={onComplete} />;
    }
    if (game.id === 'tally') {
        return <TallyGame difficulty={difficulty} onComplete={onComplete} />;
    }
    if (game.id === 'arithmetic') {
        return <ArithmeticGame difficulty={difficulty} onComplete={onComplete} />;
    }
    if (game.id === 'pattern') {
        return <PatternGame difficulty={difficulty} onComplete={onComplete} />;
    }
    if (game.id === 'place_value') {
        return <PlaceValueGame difficulty={difficulty} onComplete={onComplete} />;
    }
    if (game.id === 'daily_challenge') {
        return <DailyChallengeGame onComplete={onComplete} />;
    }

    return (
        <div class="text-center py-8">
            <p class="font-bold text-lg text-red-500">بازی مورد نظر یافت نشد.</p>
        </div>
    );
}

// --- Main App Component ---
export default function MathApp() {
    const [user, setUser] = useState(null);
    const [progressList, setProgressList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('light');
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, exercises, challenge, leaderboard, profile
    const [activeGame, setActiveGame] = useState(null); // null or game info
    const [difficulty, setDifficulty] = useState('easy'); // easy, medium, hard
    const [celebration, setCelebration] = useState(null); // null or celebration object
    const [streak, setStreak] = useState(0);
    const [xp, setXp] = useState(0);
    const [stars, setStars] = useState(0);
    const [level, setLevel] = useState(1);
    const [categoriesStats, setCategoriesStats] = useState({});
    const [leaderboard, setLeaderboard] = useState([]);
    const [dailyGoalCompleted, setDailyGoalCompleted] = useState(0);
    const [dailyGoalStars, setDailyGoalStars] = useState(0);

    // Fetch user state and progress
    const fetchUserData = async () => {
        const storedUser = localStorage.getItem('edu_kiashahr_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            
            try {
                if (window.callApi) {
                    const res = await window.callApi(`/api/student/self/${parsedUser.id}`);
                    if (res && res.success) {
                        const list = res.progress || [];
                        setProgressList(list);
                        computeStats(list);
                    }
                }
            } catch (err) {
                console.error("Failed to load student progress", err);
            }
        } else {
            setUser(null);
            setProgressList([]);
            computeStats([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserData();
        // Check if theme was saved
        const savedTheme = localStorage.getItem('math_theme') || 'light';
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Setup listener for auth events
        const handleAuthChange = () => {
            fetchUserData();
        };
        window.addEventListener('storage', handleAuthChange);
        const checkInterval = setInterval(() => {
            const localUser = localStorage.getItem('edu_kiashahr_user');
            if (JSON.stringify(user) !== localUser) {
                fetchUserData();
            }
        }, 2000);

        return () => {
            window.removeEventListener('storage', handleAuthChange);
            clearInterval(checkInterval);
        };
    }, [user]);

    const computeStats = (list) => {
        const mathItems = list.filter(item => item.subject === 'math');
        const totalXP = mathItems.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0);
        const totalStars = mathItems.reduce((acc, curr) => acc + (Number(curr.stars) || 0), 0);
        const computedLevel = Math.floor(totalXP / 150) + 1; // Every 150 XP is 1 level

        setXp(totalXP);
        setStars(totalStars);
        setLevel(computedLevel);

        // Compute Today's Goals
        const todayStr = new Date().toDateString();
        const todayItems = mathItems.filter(item => new Date(item.timestamp).toDateString() === todayStr);
        setDailyGoalCompleted(todayItems.length);
        setDailyGoalStars(todayItems.reduce((acc, curr) => acc + (Number(curr.stars) || 0), 0));

        // Streak calculation
        const activeDates = new Set(mathItems.map(item => new Date(item.timestamp).toDateString()));
        let currentStreak = 0;
        let checkDate = new Date();
        while (activeDates.has(checkDate.toDateString())) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        }
        if (currentStreak === 0 && activeDates.size > 0) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (activeDates.has(yesterday.toDateString())) {
                checkDate = yesterday;
                while (activeDates.has(checkDate.toDateString())) {
                    currentStreak++;
                    checkDate.setDate(checkDate.getDate() - 1);
                }
            }
        }
        setStreak(currentStreak);

        // Categories accuracies
        const cats = {
            'sudoku': { name: 'سودوکو', count: 0, correct: 0 },
            'counting': { name: 'شمارش اشکال', count: 0, correct: 0 },
            'tally': { name: 'خط‌شماری', count: 0, correct: 0 },
            'arithmetic': { name: 'جمع و تفریق', count: 0, correct: 0 },
            'pattern': { name: 'کشف الگوها', count: 0, correct: 0 },
            'place_value': { name: 'ارزش مکانی', count: 0, correct: 0 }
        };

        mathItems.forEach(item => {
            const title = item.title || '';
            let c = '';
            if (title.includes('سودوکو')) c = 'sudoku';
            else if (title.includes('شمارش')) c = 'counting';
            else if (title.includes('خط‌شماری') || title.includes('خط شماری')) c = 'tally';
            else if (title.includes('جمع') || title.includes('تفریق') || title.includes('محور')) c = 'arithmetic';
            else if (title.includes('الگو')) c = 'pattern';
            else if (title.includes('ارزش مکانی') || title.includes('یکی و ده‌تایی')) c = 'place_value';

            if (c && cats[c]) {
                cats[c].count++;
                if (item.score > 0) {
                    cats[c].correct++;
                }
            }
        });
        setCategoriesStats(cats);

        // Build colorful virtual high-fidelity leaderboard
        const mockStudents = [
            { id: 'S1', username: 'آرتین قاسمی 🦊', xp: 580, stars: 45, level: 4 },
            { id: 'S2', username: 'هلیا رضایی 🐰', xp: 460, stars: 36, level: 4 },
            { id: 'S3', username: 'پارسا احمدی 🦁', xp: 320, stars: 25, level: 3 },
            { id: 'S4', username: 'ثنا کریمی 🐼', xp: 210, stars: 18, level: 2 },
            { id: 'S5', username: 'محمد صدرا 🐯', xp: 140, stars: 10, level: 1 }
        ];
        if (user) {
            const studentRecord = { id: user.id, username: `${user.username} (شما) ✨`, xp: totalXP, stars: totalStars, level: computedLevel, isMe: true };
            const combined = [...mockStudents, studentRecord].sort((a, b) => b.xp - a.xp);
            setLeaderboard(combined);
        } else {
            setLeaderboard(mockStudents);
        }
    };

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        localStorage.setItem('math_theme', next);
        if (next === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const triggerLogin = () => {
        playSound('click');
        const btn = document.getElementById('eduDesktopAuthBtn') || document.getElementById('eduMobileAuthBtn');
        if (btn) {
            btn.click();
        } else {
            alert('لطفا از منوی بالای صفحه دکمه ورود را انتخاب کنید.');
        }
    };

    const saveProgress = async (gameTitle, earnedXp, earnedStars, customDetails = '') => {
        // Enforce 1 point and 1 star for each math activity as requested
        const finalXp = 1;
        const finalStars = 1;
        if (!user) {
            // Backup locally
            const backup = JSON.parse(localStorage.getItem('math_offline_backup') || '[]');
            backup.push({ subject: 'math', title: gameTitle, type: 'exercise', score: finalXp, stars: finalStars, timestamp: new Date().toISOString() });
            localStorage.setItem('math_offline_backup', JSON.stringify(backup));
            return;
        }

        try {
            if (window.submitProgressReport) {
                await window.submitProgressReport('math', gameTitle, 'exercise', finalXp, finalStars, true);
            }
            // Reload
            await fetchUserData();
        } catch (e) {
            console.error("Failed to submit progress directly, retrying via local storage", e);
        }
    };

    // Smart recommendation generator
    const getRecommendation = () => {
        if (!user) return { id: 'counting', name: 'شمارش اشکال', icon: '🍎', msg: 'بیا با هم شمارش میوه‌های خوشمزه رو تمرین کنیم! 🍎🍓' };
        
        // Find category with lowest accuracy or least practiced
        let worstCat = 'counting';
        let minAcc = 1.1; // More than 100%
        let leastPractice = 1000;

        Object.keys(categoriesStats).forEach(key => {
            const stat = categoriesStats[key];
            const acc = stat.count > 0 ? stat.correct / stat.count : 0;
            if (stat.count === 0) {
                if (leastPractice > 0) {
                    leastPractice = 0;
                    worstCat = key;
                }
            } else if (acc < minAcc) {
                minAcc = acc;
                worstCat = key;
            }
        });

        const info = {
            sudoku: { icon: '🧩', name: 'سودوکو', msg: 'ریاضی‌دان زرنگ! امروز سودوکوی اشکال و حیوانات منتظرته تا ذهن مهربونت رو قوی‌تر کنی! 💪🧩' },
            counting: { icon: '🍎', name: 'شمارش اشکال', msg: 'میوه ها و حیوانات منتظرن تا با انگشت‌های قشنگت اونا رو بشماری! 🍓🐻' },
            tally: { icon: '📊', name: 'خط‌شماری', msg: 'بیا امروز خط‌شماری‌های رنگارنگ رو با هم یاد بگیریم! بسیار شیرین و ساده‌ست! 🎨' },
            arithmetic: { icon: '🐸', name: 'جمع و تفریق با قورباغه', msg: 'قورباغه شاد روی محور اعداد منتظرته تا با پرش‌های قشنگش جمع و تفریق رو یاد بگیری! 🐸✨' },
            pattern: { icon: '🌀', name: 'کشف الگوها', msg: 'الگوهای اسرارآمیز رو با هم کامل کنیم و راز شکل بعدی رو کشف کنیم! 🔴🔵' },
            place_value: { icon: '🧱', name: 'ارزش مکانی', msg: 'بیا بسته‌های ده‌تایی و یکی‌های باحال رو بسازیم و ارزش مکانی رو قورت بدیم! 🧱⭐' }
        };

        return { id: worstCat, ...info[worstCat] };
    };

    const rec = getRecommendation();

    if (loading) {
        return (
            <div class="flex items-center justify-center p-8 text-center flex-grow">
                <div class="animate-spin text-brand-500 text-4xl">🔄</div>
                <p class="mr-3 font-bold text-lg">درحال راه‌اندازی باغ ریاضی...</p>
            </div>
        );
    }

    return (
        <div class="max-w-4xl mx-auto w-full px-4 pt-6 flex-grow flex flex-col">
            
            {/* Header Banner */}
            <div class="bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-3xl p-6 shadow-lg mb-6 flex flex-col sm:flex-row justify-between items-center relative overflow-hidden">
                <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                <div class="z-10 text-center sm:text-right">
                    <span class="bg-white/20 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2 inline-block">پلتفرم نوین یادگیری ریاضی</span>
                    <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight">باغ جادویی ریاضیات 🧮</h1>
                    <p class="text-sm text-emerald-50/90 mt-1">یادگیری شیرین ریاضی با بازی، ستاره و چالش‌های هیجان‌انگیز برای کلاس‌اولی‌ها و دومی‌ها</p>
                </div>
                <div class="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-0 z-10">
                    <a href="../index.html" onClick={() => playSound('click')} class="bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-full shadow transition duration-300 flex items-center justify-center gap-2 font-black text-sm" title="برگشت به صفحه اصلی">
                        🏠 <span>برگشت به خانه</span>
                    </a>
                    <button onClick={toggleTheme} class="bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-full shadow transition duration-300 flex items-center justify-center font-bold text-sm gap-2" title="تغییر تم">
                        <span>{theme === 'light' ? '🌙' : '☀️'}</span>
                        <span>{theme === 'light' ? 'تم تاریک شب' : 'تم روشن روز'}</span>
                    </button>
                </div>
            </div>

            {/* Navigation bar for desktop */}
            <div class="hidden md:flex justify-between bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm mb-6 border border-gray-100 dark:border-slate-700">
                {[
                    { id: 'dashboard', name: 'داشبورد من', icon: '🏠' },
                    { id: 'exercises', name: 'کتابخانه بازی‌ها', icon: '🎮' },
                    { id: 'challenge', name: 'چالش روزانه', icon: '🔥' },
                    { id: 'leaderboard', name: 'لیگ ستاره‌ها', icon: '🏆' },
                    { id: 'profile', name: 'پیشرفت و مدال‌ها', icon: '🎖️' }
                ].map(t => (
                    <button key={t.id} onClick={() => { playSound('click'); setActiveTab(t.id); setActiveGame(null); }} class={`flex items-center gap-2 px-5 py-3 rounded-xl transition duration-300 font-bold ${activeTab === t.id ? 'bg-brand-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700'}`}>
                        <span>{t.icon}</span>
                        <span>{t.name}</span>
                    </button>
                ))}
            </div>

            {/* Content Views */}
            <div class="flex-grow flex flex-col">
                {celebration && (
                    <div class="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                        <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full text-center border-4 border-brand-500 shadow-2xl transform transition scale-105 duration-500 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-b from-brand-500/10 to-transparent pointer-events-none"></div>
                            <div class="text-6xl mb-4 animate-bounce">🎉</div>
                            <h3 class="text-2xl font-black text-brand-600 dark:text-brand-400 mb-2">{celebration.message}</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-6 font-medium">آفرین قهرمان باهوش! تو با موفقیت این مرحله رو کامل کردی و جایزه‌هات رو گرفتی!</p>
                            
                            <div class="bg-brand-50 dark:bg-slate-700/50 rounded-2xl p-4 flex justify-around mb-6 border border-brand-100 dark:border-slate-700">
                                <div class="text-center">
                                    <span class="block text-3xl">✨</span>
                                    <span class="block text-lg font-black text-brand-600 dark:text-brand-300">+{toPersianDigits(celebration.xp)} XP</span>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">امتیاز تجربه</span>
                                </div>
                                <div class="w-px bg-gray-200 dark:bg-slate-600"></div>
                                <div class="text-center">
                                    <span class="block text-3xl text-amber-400">★</span>
                                    <span class="block text-lg font-black text-amber-500">+{toPersianDigits(celebration.stars)} ستاره</span>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">پاداش طلایی</span>
                                </div>
                            </div>

                            <button onClick={() => { playSound('click'); setCelebration(null); setActiveGame(null); setActiveTab('dashboard'); }} class="w-full bg-brand-500 hover:bg-brand-600 text-white font-black py-4 rounded-2xl shadow-lg transition duration-300 hover:scale-[1.02]">
                                برگشت به داشبورد و ادامه بازی 🚀
                            </button>
                        </div>
                    </div>
                )}

                {activeGame ? (
                    <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-gray-100 dark:border-slate-700 relative">
                        <button onClick={() => { playSound('click'); setActiveGame(null); }} class="absolute left-4 top-4 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl text-sm font-bold transition duration-300 flex items-center gap-1">
                            <span>❌</span>
                            <span>خروج از بازی</span>
                        </button>
                        <GamePlayArea game={activeGame} difficulty={difficulty} onComplete={(earnedX, earnedS) => {
                            playSound('success');
                            saveProgress(activeGame.name, earnedX, earnedS);
                            setCelebration({ xp: earnedX, stars: earnedS, message: activeGame.congrats || 'صد آفرین به هوش تو! 🎉' });
                        }} />
                    </div>
                ) : (
                    <div>
                        {activeTab === 'dashboard' && (
                            <div class="space-y-6">
                                {/* Profile summary cards */}
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 text-center flex flex-col justify-between hover:translate-y-[-2px] transition duration-300">
                                        <span class="text-3xl">🎖️</span>
                                        <h4 class="text-gray-500 dark:text-gray-400 text-xs font-bold mt-2">سطح یادگیری</h4>
                                        <p class="text-2xl font-black text-brand-600 dark:text-brand-400 mt-1">{toPersianDigits(level)}</p>
                                    </div>
                                    <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 text-center flex flex-col justify-between hover:translate-y-[-2px] transition duration-300">
                                        <span class="text-3xl">✨</span>
                                        <h4 class="text-gray-500 dark:text-gray-400 text-xs font-bold mt-2">کل امتیاز تجربه (XP)</h4>
                                        <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{toPersianDigits(xp)}</p>
                                    </div>
                                    <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 text-center flex flex-col justify-between hover:translate-y-[-2px] transition duration-300">
                                        <span class="text-3xl text-amber-400 animate-pulse">★</span>
                                        <h4 class="text-gray-500 dark:text-gray-400 text-xs font-bold mt-2">مجموع ستاره‌ها</h4>
                                        <p class="text-2xl font-black text-amber-500 mt-1">{toPersianDigits(stars)}</p>
                                    </div>
                                    <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 text-center flex flex-col justify-between hover:translate-y-[-2px] transition duration-300">
                                        <span class="text-3xl">🔥</span>
                                        <h4 class="text-gray-500 dark:text-gray-400 text-xs font-bold mt-2">روزهای متوالی فعالیت (Streak)</h4>
                                        <p class="text-2xl font-black text-orange-500 mt-1">{toPersianDigits(streak)} روز</p>
                                    </div>
                                </div>

                                {/* Daily goal & smart recommendation */}
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Daily goal card */}
                                    <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between">
                                        <div>
                                            <h3 class="text-lg font-black flex items-center gap-2 mb-1">
                                                <span>🎯</span>
                                                <span>هدف روزانه امروز</span>
                                            </h3>
                                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">هر روز با حل تمرین‌ها ستاره و مهارت بیشتری کسب کن!</p>
                                        </div>
                                        <div class="space-y-4">
                                            <div>
                                                <div class="flex justify-between text-xs font-bold mb-1">
                                                    <span>تمرین‌های تکمیل شده</span>
                                                    <span class="text-brand-600 dark:text-brand-400">{toPersianDigits(dailyGoalCompleted)} از ۳</span>
                                                </div>
                                                <div class="w-full bg-gray-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                                                    <div class="bg-brand-500 h-full transition-all duration-500" style={{ width: `${Math.min(100, (dailyGoalCompleted / 3) * 100)}%` }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="flex justify-between text-xs font-bold mb-1">
                                                    <span>ستاره‌های کسب‌شده امروز</span>
                                                    <span class="text-amber-500">{toPersianDigits(dailyGoalStars)} از ۱۵</span>
                                                </div>
                                                <div class="w-full bg-gray-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                                                    <div class="bg-amber-400 h-full transition-all duration-500" style={{ width: `${Math.min(100, (dailyGoalStars / 15) * 100)}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Smart Recommendation card */}
                                    <div class="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-slate-800 dark:to-slate-800/80 p-6 rounded-3xl shadow-sm border border-amber-200/50 dark:border-slate-700 flex flex-col justify-between relative overflow-hidden">
                                        <div class="absolute -left-10 -bottom-10 text-9xl text-amber-500/10 font-bold select-none pointer-events-none">✨</div>
                                        <div>
                                            <span class="bg-amber-500 text-white text-xs px-2.5 py-1 rounded-full font-bold inline-block mb-3">💡 پیشنهاد هوشمند امروز</span>
                                            <h3 class="text-lg font-black text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-1">
                                                <span>{rec.icon}</span>
                                                <span>بازی پیشنهادی: {rec.name}</span>
                                            </h3>
                                            <p class="text-sm text-amber-900/80 dark:text-gray-300 font-medium leading-relaxed">{rec.msg}</p>
                                        </div>
                                        <button onClick={() => { playSound('click'); setActiveGame({ id: rec.id, name: rec.name }); }} class="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-3 px-6 rounded-2xl shadow transition duration-300 flex items-center justify-center gap-2">
                                            <span>شروع تمرین پیشنهادی 🚀</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Big launch cards */}
                                <div>
                                    <h3 class="text-xl font-black mb-4 flex items-center gap-2">
                                        <span>🎮</span>
                                        <span>انتخاب بازی‌های آموزشی</span>
                                    </h3>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {[
                                            { id: 'sudoku', name: 'سودوکوی اشکال و اعداد', desc: 'پر کردن خانه‌های خالی بر اساس قوانین سودوکوی شیرین ۴ در ۴', icon: '🧩', bg: 'bg-indigo-50 hover:bg-indigo-100/80 dark:bg-slate-800 dark:hover:bg-slate-700/80', border: 'border-indigo-100 dark:border-slate-700', text: 'text-indigo-600' },
                                            { id: 'counting', name: 'شمارش اشکال جذاب', desc: 'لمس و شمارش میوه‌ها و حیوانات بامزه همراه با افکت صوتی ریتمیک', icon: '🍎', bg: 'bg-rose-50 hover:bg-rose-100/80 dark:bg-slate-800 dark:hover:bg-slate-700/80', border: 'border-rose-100 dark:border-slate-700', text: 'text-rose-600' },
                                            { id: 'tally', name: 'خط‌شماری جادویی', desc: 'یادگیری و تبدیل تعداد اشکال به خط‌های شمارشی زیبا', icon: '📊', bg: 'bg-cyan-50 hover:bg-cyan-100/80 dark:bg-slate-800 dark:hover:bg-slate-700/80', border: 'border-cyan-100 dark:border-slate-700', text: 'text-cyan-600' },
                                            { id: 'arithmetic', name: 'جمع و تفریق با قورباغه', desc: 'پرش روی محور اعداد و حل محاسبات ریاضی ساده و شیرین', icon: '🐸', bg: 'bg-emerald-50 hover:bg-emerald-100/80 dark:bg-slate-800 dark:hover:bg-slate-700/80', border: 'border-emerald-100 dark:border-slate-700', text: 'text-emerald-600' },
                                            { id: 'pattern', name: 'کشف الگوهای رنگارنگ', desc: 'تشخیص رنگ، شکل یا عدد بعدی در زنجیره‌های متوالی', icon: '🌀', bg: 'bg-amber-50 hover:bg-amber-100/80 dark:bg-slate-800 dark:hover:bg-slate-700/80', border: 'border-amber-100 dark:border-slate-700', text: 'text-amber-600' },
                                            { id: 'place_value', name: 'ارزش مکانی (ده‌تایی و یکی)', desc: 'ساختن اعداد با دسته‌های ده‌تایی و یکی‌های مکعبی رنگارنگ', icon: '🧱', bg: 'bg-purple-50 hover:bg-purple-100/80 dark:bg-slate-800 dark:hover:bg-slate-700/80', border: 'border-purple-100 dark:border-slate-700', text: 'text-purple-600' }
                                        ].map(item => (
                                            <div key={item.id} class={`${item.bg} p-6 rounded-3xl border ${item.border} shadow-sm flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer`} onClick={() => { playSound('click'); setActiveGame({ id: item.id, name: item.name }); }}>
                                                <div>
                                                    <div class="text-4xl mb-3">{item.icon}</div>
                                                    <h4 class="text-lg font-black text-gray-800 dark:text-gray-100">{item.name}</h4>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
                                                </div>
                                                <div class="mt-6 flex justify-between items-center">
                                                    <span class="text-xs font-extrabold text-brand-600 dark:text-brand-400 bg-brand-500/10 dark:bg-slate-700 px-3 py-1.5 rounded-full">شروع بازی 🚀</span>
                                                    <span class="text-xs text-gray-400 font-bold">بخش پایه اول و دوم</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Educational Videos Section */}
                                <div class="bg-gradient-to-br from-indigo-50 to-blue-100/40 dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-3xl border border-indigo-100 dark:border-slate-700 shadow-sm">
                                    <h3 class="text-xl font-black mb-1 flex items-center gap-2 text-indigo-900 dark:text-indigo-300">
                                        <span>🎬</span>
                                        <span>ویدئوهای آموزشی ریاضی اول ابتدایی</span>
                                    </h3>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">ویدئوهای آموزشی جذاب و حل تمرینات ریاضی اول دبستان تدریس شده توسط آقای سید محمد حسن مجیدی کیوی را تماشا کنید!</p>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Card 1 */}
                                        <a href="https://www.aparat.com/playlist/24945700" target="_blank" rel="noopener noreferrer" onClick={() => playSound('click')} class="bg-white dark:bg-slate-700/60 p-5 rounded-2xl border border-indigo-50 dark:border-slate-600 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                                            <div>
                                                <div class="flex items-center justify-between mb-3">
                                                    <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-700 px-2.5 py-1 rounded-full">لیست پخش آپارات</span>
                                                    <span class="text-red-500 text-lg"><i class="fa-brands fa-youtube"></i></span>
                                                </div>
                                                <h4 class="text-base font-black text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">۱. آموزش مباحث ریاضی اول ابتدایی</h4>
                                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">یادگیری شیرین و پایه‌ای تمام مفاهم ریاضی کلاس اول ابتدایی به زبان ساده و همراه با مثال‌های متنوع.</p>
                                            </div>
                                            <div class="mt-5 flex items-center justify-between">
                                                <span class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                                                    مشاهده لیست پخش ویدئوها 
                                                    <span class="transition-transform group-hover:translate-x-[-4px]">👈</span>
                                                </span>
                                                <span class="text-[10px] text-gray-400 font-bold">بندر کیاشهر</span>
                                            </div>
                                        </a>

                                        {/* Card 2 */}
                                        <a href="https://www.aparat.com/playlist/15078314" target="_blank" rel="noopener noreferrer" onClick={() => playSound('click')} class="bg-white dark:bg-slate-700/60 p-5 rounded-2xl border border-indigo-50 dark:border-slate-600 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                                            <div>
                                                <div class="flex items-center justify-between mb-3">
                                                    <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-700 px-2.5 py-1 rounded-full">حل تمرینات ریاضی</span>
                                                    <span class="text-red-500 text-lg"><i class="fa-brands fa-youtube"></i></span>
                                                </div>
                                                <h4 class="text-base font-black text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">۲. حل تمرینات کتاب ریاضی اول ابتدایی</h4>
                                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">پاسخ‌های گام به گام و توضیحات کامل برای حل تمرین‌ها و فعالیت‌های کتاب ریاضی اول دبستان.</p>
                                            </div>
                                            <div class="mt-5 flex items-center justify-between">
                                                <span class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                                                    مشاهده لیست پخش ویدئوها 
                                                    <span class="transition-transform group-hover:translate-x-[-4px]">👈</span>
                                                </span>
                                                <span class="text-[10px] text-gray-400 font-bold">بندر کیاشهر</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                {!user && (
                                    <div class="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl p-6 text-white text-center shadow-lg">
                                        <h3 class="text-xl font-black mb-2">⭐ می‌خوای پیشرفتت و ستاره‌هات تو کارنامه‌ات ذخیره بشن؟</h3>
                                        <p class="text-sm text-emerald-50 max-w-xl mx-auto mb-6">همین حالا وارد حساب کاربری خودت شو تا کارنامه پیشرفته، سطح‌های جادویی و نشان‌های افتخارت رو در گوگل‌شیت ذخیره کنی!</p>
                                        <button onClick={triggerLogin} class="bg-white hover:bg-emerald-50 text-emerald-600 font-extrabold py-3.5 px-8 rounded-2xl shadow transition duration-300 transform hover:scale-105">
                                            ورود یا ثبت‌نام در سامانه 🌟
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'exercises' && (
                            <div class="space-y-6">
                                <div class="flex justify-between items-center mb-2">
                                    <h3 class="text-2xl font-black">کتابخانه بازی‌های ریاضی</h3>
                                    <div class="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
                                        {['easy', 'medium', 'hard'].map(diff => (
                                            <button key={diff} onClick={() => setDifficulty(diff)} class={`px-4 py-1.5 rounded-lg text-xs font-bold transition duration-300 ${difficulty === diff ? 'bg-brand-500 text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                                {diff === 'easy' ? 'ساده 🟢' : diff === 'medium' ? 'متوسط 🟡' : 'سخت 🔴'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* Rendering the same categories list for custom difficulty */}
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {[
                                        { id: 'sudoku', name: 'سودوکوی اشکال و اعداد', desc: 'بازی فکری به همراه جابجایی حیوانات و شکل‌های هندسی در جدول ۴ در ۴', icon: '🧩' },
                                        { id: 'counting', name: 'شمارش اشکال جذاب', desc: 'میوه‌های شاد و حیوانات پرانرژی منتظر انگشتان مهربان تو هستند تا شمارش بشن', icon: '🍎' },
                                        { id: 'tally', name: 'خط‌شماری جادویی', desc: 'خط‌های شمارش رنگی رو بشمار و تعداد شکل‌ها رو مطابقت بده', icon: '📊' },
                                        { id: 'arithmetic', name: 'جمع و تفریق با قورباغه', desc: 'پرش‌های بلند قورباغه تنبل روی خط‌کشی شماره‌دار برای حل مسائل ریاضی', icon: '🐸' },
                                        { id: 'pattern', name: 'کشف الگوهای رنگارنگ', desc: 'کدام شکل یا حیوان در ردیف جادویی بعدی قرار می‌گیرد؟ ذهن تو راز الگوها را می‌داند!', icon: '🌀' },
                                        { id: 'place_value', name: 'ارزش مکانی (ده‌تایی و یکی)', desc: 'با ده‌تایی‌ها و یکی‌های چوبی، خانه‌های عددی را با دقت کامل کن', icon: '🧱' }
                                    ].map(item => (
                                        <div key={item.id} class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col justify-between transition hover:scale-[1.02] cursor-pointer" onClick={() => { playSound('click'); setActiveGame({ id: item.id, name: item.name }); }}>
                                            <div>
                                                <div class="text-4xl mb-3">{item.icon}</div>
                                                <h4 class="text-lg font-black">{item.name}</h4>
                                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
                                            </div>
                                            <div class="mt-6 flex justify-between items-center">
                                                <span class="text-xs font-bold text-gray-400">سختی: {difficulty === 'easy' ? 'آسان' : difficulty === 'medium' ? 'متوسط' : 'سخت'}</span>
                                                <span class="text-xs font-black text-brand-600 dark:text-brand-400">شروع بازی 🚀</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'challenge' && (
                            <div class="space-y-6">
                                <div class="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                                    <div class="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
                                    <div class="z-10 relative">
                                        <span class="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full font-bold inline-block mb-3">🔥 چالش منحصربه‌فرد روزانه</span>
                                        <h3 class="text-2xl font-black mb-3">امروز آماده‌ی یک چالش هیجان‌انگیزی؟ 🚀</h3>
                                        <p class="text-sm text-indigo-100 max-w-xl leading-relaxed mb-6">هر روز یک چالش ریاضی جدید به صورت خودکار بر اساس تاریخ امروز تولید میشه. با حل این چالش، <b class="text-amber-400">۵۰ امتیاز تجربه (XP) و ۳ ستاره طلایی فوق‌العاده</b> دریافت می‌کنی!</p>
                                        
                                        <div class="bg-white/10 rounded-2xl p-4 inline-block mb-6">
                                            <span class="text-xs font-bold block text-indigo-200">تاریخ چالش امروز:</span>
                                            <span class="text-base font-black text-amber-300">{toPersianDigits(new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))}</span>
                                        </div>

                                        <button onClick={() => { playSound('click'); setActiveGame({ id: 'daily_challenge', name: 'چالش روزانه ریاضی' }); }} class="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-black py-4 px-10 rounded-2xl shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                                            <span>ورود به چالش روزانه 🎮</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'leaderboard' && (
                            <div class="space-y-6">
                                <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
                                    <div class="text-center max-w-md mx-auto mb-6">
                                        <span class="text-4xl">🏆</span>
                                        <h3 class="text-2xl font-black mt-2">لیگ ستاره‌های کیاشهر</h3>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">رقابت سالم و پرانرژی با سایر همکلاسی‌های زرنگ بندر کیاشهر</p>
                                    </div>

                                    <div class="space-y-3">
                                        {leaderboard.map((student, idx) => {
                                            const medals = ['🥇', '🥈', '🥉'];
                                            const place = idx < 3 ? medals[idx] : toPersianDigits(idx + 1);
                                            return (
                                                <div key={student.id} class={`flex justify-between items-center p-4 rounded-2xl border transition duration-300 ${student.isMe ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800' : 'bg-gray-50 border-gray-100 hover:bg-gray-100/50 dark:bg-slate-800/40 dark:border-slate-700'}`}>
                                                    <div class="flex items-center gap-4">
                                                        <span class="text-xl font-bold w-8 text-center">{place}</span>
                                                        <div>
                                                            <span class={`font-bold block ${student.isMe ? 'text-brand-700 dark:text-brand-400' : ''}`}>{student.username}</span>
                                                            <span class="text-xs text-gray-400 dark:text-gray-500 font-bold">سطح {toPersianDigits(student.level)}</span>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center gap-4">
                                                        <span class="text-amber-500 font-extrabold text-sm flex items-center gap-0.5">
                                                            <span>★</span>
                                                            <span>{toPersianDigits(student.stars)}</span>
                                                        </span>
                                                        <span class="bg-gray-200 dark:bg-slate-700 font-black text-xs px-3 py-1.5 rounded-full">
                                                            {toPersianDigits(student.xp)} XP
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div class="space-y-6">
                                <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
                                    <h3 class="text-xl font-black mb-4 flex items-center gap-2">
                                        <span>🎖️</span>
                                        <span>نشان‌های افتخار من (Badges)</span>
                                    </h3>
                                    
                                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {[
                                            { id: 'math_hero', name: 'ریاضی‌دان جوان 🏆', desc: 'کسب سطح ۳ یا بالاتر در برنامه جادویی ریاضی', condition: level >= 3, icon: '🏆', color: 'from-amber-400 to-amber-500' },
                                            { id: 'arithmetic_master', name: 'قهرمان جمع و تفریق ⚡', desc: 'حداقل ۵ پاسخ صحیح در تمرین‌های جمع و تفریق', condition: (categoriesStats['arithmetic']?.correct || 0) >= 5, icon: '⚡', color: 'from-emerald-400 to-emerald-500' },
                                            { id: 'sudoku_champ', name: 'نابغه سودوکو 🧩', desc: 'حداقل ۳ مرتبه پیروزی کامل در خانه‌های سودوکو', condition: (categoriesStats['sudoku']?.correct || 0) >= 3, icon: '🧩', color: 'from-blue-400 to-blue-500' },
                                            { id: 'counting_master', name: 'ستاره شمارش 🌟', desc: 'حداقل ۵ پاسخ صحیح در شمارش اشکال جذاب', condition: (categoriesStats['counting']?.correct || 0) >= 5, icon: '🌟', color: 'from-rose-400 to-rose-500' },
                                            { id: 'streak_master', name: 'همکلاسی پرکار 🔥', desc: 'حفظ استریک یا فعالیت متوالی بیش از ۳ روز', condition: streak >= 3, icon: '🔥', color: 'from-orange-400 to-orange-500' },
                                            { id: 'pioneer', name: 'یادگیرنده مشتاق 🌱', desc: 'حل حداقل یک تمرین آنلاین آموزشی ریاضی', condition: progressList.filter(p => p.subject === 'math').length >= 1, icon: '🌱', color: 'from-teal-400 to-teal-500' }
                                        ].map(b => (
                                            <div key={b.id} class={`p-5 rounded-3xl border text-center transition flex flex-col items-center justify-between relative overflow-hidden ${b.condition ? 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm' : 'bg-gray-100/50 dark:bg-slate-800/20 border-gray-100 dark:border-slate-800 opacity-60'}`}>
                                                <div class={`w-14 h-14 rounded-full bg-gradient-to-br ${b.condition ? b.color : 'from-gray-300 to-gray-400'} text-white flex items-center justify-center text-2xl shadow mb-3`}>
                                                    {b.icon}
                                                </div>
                                                <h4 class="font-extrabold text-sm">{b.name}</h4>
                                                <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{b.desc}</p>
                                                {b.condition ? (
                                                    <span class="mt-3 text-[10px] font-black text-emerald-600 bg-emerald-100 dark:bg-slate-700 dark:text-emerald-400 px-2.5 py-1 rounded-full">🏆 باز شده</span>
                                                ) : (
                                                    <span class="mt-3 text-[10px] font-bold text-gray-400 bg-gray-200 dark:bg-slate-700 px-2.5 py-1 rounded-full">🔒 قفل است</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Navigation for Mobile */}
            <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-2 px-4 shadow-lg z-40 safe-bottom flex justify-around">
                {[
                    { id: 'dashboard', name: 'داشبورد', icon: '🏠' },
                    { id: 'exercises', name: 'تمرین‌ها', icon: '🎮' },
                    { id: 'challenge', name: 'چالش', icon: '🔥' },
                    { id: 'leaderboard', name: 'رتبه‌بندی', icon: '🏆' },
                    { id: 'profile', name: 'پروفایل', icon: '🎖️' }
                ].map(t => (
                    <button key={t.id} onClick={() => { playSound('click'); setActiveTab(t.id); setActiveGame(null); }} class={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition duration-300 ${activeTab === t.id ? 'text-brand-500 font-extrabold scale-105' : 'text-gray-500 dark:text-gray-400'}`}>
                        <span class="text-xl mb-1">{t.icon}</span>
                        <span class="text-[10px]">{t.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// Mount React App
const rootElement = document.getElementById('math-app');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<MathApp />);
}
