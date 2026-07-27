const { useState, useEffect } = React;
import { playSound, toPersianDigits } from '../utils.js';

export default function CountingGame({ difficulty, onComplete }) {
    const fruits = ['🍎', '🍓', '🍋', '🍇', '🍒', '🦁', '🐼', '🐰'];
    const [targetCount] = useState(() => Math.floor(Math.random() * 6) + 3); // 3 to 8
    const [fruitIcon] = useState(() => fruits[Math.floor(Math.random() * fruits.length)]);
    const [countedList, setCountedList] = useState(() => Array(targetCount).fill(false));
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const incorrect = new Set();
        while (incorrect.size < 3) {
            const r = Math.floor(Math.random() * 8) + 2;
            if (r !== targetCount) incorrect.add(r);
        }
        setOptions([...Array.from(incorrect), targetCount].sort(() => Math.random() - 0.5));
    }, [targetCount]);

    const itemClick = (idx) => {
        if (countedList[idx]) return;
        playSound('count', idx);
        const updated = [...countedList];
        updated[idx] = true;
        setCountedList(updated);
    };

    const checkAnswer = (val) => {
        if (val === targetCount) {
            onComplete(20, 3);
        } else {
            playSound('error');
            alert('اشتباه شد، دوباره تلاش کن قند عسل! 🌸');
        }
    };

    return (
        <div class="text-center py-4" id="counting-game-root">
            <h3 class="text-xl font-black text-rose-700 dark:text-rose-400 mb-2">🍎 بازی شمارش اشکال</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">روی هر شکل بزن تا اون رو بشماری و بعد پاسخ درست رو انتخاب کن!</p>

            <div class="flex flex-wrap justify-center gap-4 max-w-sm mx-auto mb-8 bg-rose-50/50 dark:bg-slate-700/30 p-6 rounded-3xl border border-rose-100 dark:border-slate-600">
                {countedList.map((counted, idx) => (
                    <div key={idx} onClick={() => itemClick(idx)} class={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm cursor-pointer transition duration-300 relative select-none hover:scale-110 ${counted ? 'bg-emerald-100 dark:bg-emerald-950 scale-95 border-2 border-emerald-400' : 'bg-white dark:bg-slate-800'}`}>
                        <span>{fruitIcon}</span>
                        {counted && (
                            <span class="absolute -top-2 -right-2 bg-emerald-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                                {toPersianDigits(idx + 1)}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div class="grid grid-cols-4 gap-3 max-w-xs mx-auto">
                {options.map(opt => (
                    <button key={opt} onClick={() => checkAnswer(opt)} class="bg-white dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-slate-600 shadow-sm py-4 rounded-2xl text-xl font-black transition transform hover:scale-[1.03]">
                        {toPersianDigits(opt)}
                    </button>
                ))}
            </div>
        </div>
    );
}
