const { useState, useEffect } = React;
import { playSound, toPersianDigits } from '../utils.js';

export default function TallyGame({ difficulty, onComplete }) {
    const [targetCount] = useState(() => Math.floor(Math.random() * 8) + 3); // 3 to 10
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const incorrect = new Set();
        while (incorrect.size < 3) {
            const r = Math.floor(Math.random() * 9) + 2;
            if (r !== targetCount) incorrect.add(r);
        }
        setOptions([...Array.from(incorrect), targetCount].sort(() => Math.random() - 0.5));
    }, [targetCount]);

    // CSS-based tally mark renderer
    const renderTally = (count) => {
        const bundles = Math.floor(count / 5);
        const singles = count % 5;
        const arr = [];

        for (let i = 0; i < bundles; i++) {
            arr.push(
                <div key={`b-${i}`} class="relative w-8 h-10 flex gap-1 items-center justify-center mx-1">
                    <div class="w-1 h-8 bg-cyan-600 dark:bg-cyan-400 rounded"></div>
                    <div class="w-1 h-8 bg-cyan-600 dark:bg-cyan-400 rounded"></div>
                    <div class="w-1 h-8 bg-cyan-600 dark:bg-cyan-400 rounded"></div>
                    <div class="w-1 h-8 bg-cyan-600 dark:bg-cyan-400 rounded"></div>
                    <div class="absolute w-10 h-1 bg-cyan-600 dark:bg-cyan-400 rounded rotate-[-35deg]"></div>
                </div>
            );
        }

        for (let i = 0; i < singles; i++) {
            arr.push(
                <div key={`s-${i}`} class="w-1 h-8 bg-cyan-600 dark:bg-cyan-400 rounded mx-0.5"></div>
            );
        }

        return <div class="flex items-center justify-center gap-1.5">{arr}</div>;
    };

    const selectOption = (val) => {
        if (val === targetCount) {
            onComplete(20, 3);
        } else {
            playSound('error');
            alert('اشتباه شد قهرمان، بیشتر دقت کن! 🌸');
        }
    };

    return (
        <div class="text-center py-4" id="tally-game-root">
            <h3 class="text-xl font-black text-cyan-700 dark:text-cyan-400 mb-2">📊 بازی خط‌شماری جادویی</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">تعداد میوه‌ها را شمرده و خط‌شماری درست آن را پیدا کن!</p>

            <div class="bg-cyan-50/50 dark:bg-slate-700/30 p-6 rounded-3xl border border-cyan-100 dark:border-slate-600 max-w-sm mx-auto mb-8">
                <div class="flex flex-wrap justify-center gap-2 mb-4 text-3xl">
                    {Array(targetCount).fill('⭐').map((s, idx) => <span key={idx}>{s}</span>)}
                </div>
                <div class="text-xs font-bold text-gray-400">تعداد: {toPersianDigits(targetCount)} ستاره</div>
            </div>

            <div class="grid grid-cols-1 gap-3 max-w-xs mx-auto">
                {options.map(opt => (
                    <button key={opt} onClick={() => selectOption(opt)} class="bg-white dark:bg-slate-700 hover:bg-cyan-50 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 p-4 rounded-2xl shadow-sm flex justify-between items-center transition transform hover:scale-[1.02]">
                        <div class="flex-grow">{renderTally(opt)}</div>
                        <span class="text-lg font-black text-cyan-600 mr-4 bg-cyan-500/10 px-3 py-1 rounded-full">{toPersianDigits(opt)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
