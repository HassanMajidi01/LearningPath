const { useState, useEffect } = React;
import { playSound, toPersianDigits } from '../utils.js';

export default function PatternGame({ difficulty, onComplete }) {
    const types = ['colors', 'fruits', 'numbers'];
    const [selectedType] = useState(() => types[Math.floor(Math.random() * types.length)]);
    const [sequence, setSequence] = useState([]);
    const [solution, setSolution] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (selectedType === 'colors') {
            const choice = Math.random() > 0.5 ? ['🔴', '🔵'] : ['🟡', '🟢'];
            const seq = [choice[0], choice[1], choice[0], choice[1], choice[0]];
            setSequence(seq);
            setSolution(choice[1]);
            setOptions([choice[0], choice[1], '🟣'].sort(() => Math.random() - 0.5));
        } else if (selectedType === 'fruits') {
            const choice = Math.random() > 0.5 ? ['🍎', '🍌'] : ['🍓', '🍒'];
            const seq = [choice[0], choice[0], choice[1], choice[0], choice[0]];
            setSequence(seq);
            setSolution(choice[1]);
            setOptions([choice[0], choice[1], '🍍'].sort(() => Math.random() - 0.5));
        } else {
            const diff = Math.random() > 0.5 ? 2 : 3;
            const seq = [diff, diff * 2, diff * 3, diff * 4];
            setSequence(seq);
            setSolution(diff * 5);
            setOptions([diff * 5, diff * 6, diff * 4 + 1].sort(() => Math.random() - 0.5));
        }
    }, [selectedType]);

    const selectOption = (val) => {
        if (val === solution) {
            onComplete(20, 3);
        } else {
            playSound('error');
            alert('اشتباه شد، شکل بعدی این نیست! 🌸');
        }
    };

    return (
        <div class="text-center py-4" id="pattern-game-root">
            <h3 class="text-xl font-black text-amber-700 dark:text-amber-400 mb-2">🌀 بازی کشف الگوهای رنگارنگ</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">رابطه الگو را پیدا کن و گزینه‌ای که باید در خانه خالی قرار بگیرد را انتخاب کن!</p>

            <div class="flex items-center justify-center gap-3 bg-amber-50/50 dark:bg-slate-700/30 p-6 rounded-3xl border border-amber-100 dark:border-slate-600 max-w-sm mx-auto mb-8">
                {sequence.map((item, idx) => (
                    <div key={idx} class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm font-extrabold border">
                        {typeof item === 'number' ? toPersianDigits(item) : item}
                    </div>
                ))}
                <div class="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-2xl font-black animate-pulse border-2 border-dashed border-amber-300">
                    ؟
                </div>
            </div>

            <div class="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {options.map((opt, idx) => (
                    <button key={idx} onClick={() => selectOption(opt)} class="bg-white dark:bg-slate-700 hover:bg-amber-50 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-slate-600 shadow py-4 rounded-2xl text-2xl font-black transition transform hover:scale-[1.03]">
                        {typeof opt === 'number' ? toPersianDigits(opt) : opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
