const { useState } = React;
import { playSound, getSeededRandom, toPersianDigits } from '../utils.js';

export default function DailyChallengeGame({ onComplete }) {
    const todayStr = new Date().toLocaleDateString('en-CA'); // e.g. 2026-07-14
    const rand = getSeededRandom(todayStr);

    // Based on date seed, pick deterministic daily challenge parameters
    const numA = Math.floor(rand() * 5) + 4; // 4 to 8
    const numB = Math.floor(rand() * 4) + 1; // 1 to 4
    const isAdd = rand() > 0.5;
    const solution = isAdd ? numA + numB : numA - numB;

    const [userAns, setUserAns] = useState('');

    const handleSubmit = () => {
        if (Number(userAns) === solution) {
            onComplete(50, 5); // 50 XP, 5 Stars!
        } else {
            playSound('error');
            alert('اشتباه شد، دوباره فکر کن قهرمان! 🌸');
        }
    };

    return (
        <div class="text-center py-6" id="daily-challenge-game-root">
            <span class="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full font-bold inline-block mb-3">🔥 چالش بزرگ امروز</span>
            <h3 class="text-2xl font-black text-indigo-700 dark:text-indigo-400 mb-2">معمای ریاضی جادویی امروز</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">این معما برای تقویت فوق‌العاده هوش تو طراحی شده!</p>

            <div class="bg-indigo-900 text-white p-8 rounded-3xl max-w-sm mx-auto mb-6 shadow border border-indigo-700">
                <div class="text-sm text-indigo-200 mb-2 font-bold">بگو حاصل عبارت زیر چیست؟</div>
                <div class="text-3xl font-black tracking-wider" dir="ltr">
                    {isAdd ? (
                        <span>{toPersianDigits(numA)} + {toPersianDigits(numB)} = ?</span>
                    ) : (
                        <span>{toPersianDigits(numA)} - {toPersianDigits(numB)} = ?</span>
                    )}
                </div>
            </div>

            <div class="max-w-xs mx-auto space-y-4">
                <input type="number" value={userAns} onChange={(e) => setUserAns(e.target.value)} class="w-full text-center py-4 bg-gray-100 dark:bg-slate-700 font-black rounded-2xl text-2xl focus:outline-none focus:ring-4 focus:ring-indigo-400 border border-gray-200 dark:border-slate-600" placeholder="پاسخ را اینجا بنویس" />
                <button onClick={handleSubmit} class="w-full bg-brand-500 hover:bg-brand-600 text-white font-black py-4 rounded-2xl shadow transition transform hover:scale-[1.01]">
                    ثبت نهایی پاسخ معما 🚀
                </button>
            </div>
        </div>
    );
}
