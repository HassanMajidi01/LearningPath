const { useState } = React;
import { playSound, toPersianDigits } from '../utils.js';

export default function ArithmeticGame({ difficulty, onComplete }) {
    const [type] = useState(() => Math.random() > 0.5 ? 'addition' : 'subtraction');
    const [numA] = useState(() => type === 'addition' ? Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 5) + 5); // A: 2-6 for +, 5-9 for -
    const [numB] = useState(() => type === 'addition' ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 4) + 1); // B: 1-4
    
    const solution = type === 'addition' ? numA + numB : numA - numB;
    const [currentPosition, setCurrentPosition] = useState(numA);
    const [isJumping, setIsJumping] = useState(false);

    const jumpTo = (pos) => {
        if (pos < 0 || pos > 10) return;
        playSound('click');
        setIsJumping(true);
        setCurrentPosition(pos);
        setTimeout(() => setIsJumping(false), 400);
    };

    const selectNumber = (num) => {
        if (num === solution) {
            onComplete(25, 3);
        } else {
            playSound('error');
            alert('قورباغه به مقصد نرسید، دوباره امتحان کن! 🐸');
        }
    };

    return (
        <div class="text-center py-4" id="arithmetic-game-root">
            <h3 class="text-xl font-black text-emerald-700 dark:text-emerald-400 mb-2">🐸 جمع و تفریق با قورباغه شاد</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">قورباغه روی عدد شروع قرار دارد. با پرش روی خط، مقصد نهایی را مشخص کن!</p>

            <div class="bg-emerald-50/50 dark:bg-slate-700/30 p-6 rounded-3xl border border-emerald-100 dark:border-slate-600 max-w-xl mx-auto mb-8">
                <div class="text-2xl font-black text-emerald-800 dark:text-white mb-6" dir="ltr">
                    {type === 'addition' ? (
                        <span>{toPersianDigits(numA)} + {toPersianDigits(numB)} = ?</span>
                    ) : (
                        <span>{toPersianDigits(numA)} - {toPersianDigits(numB)} = ?</span>
                    )}
                </div>

                {/* Interactive Number Line */}
                <div class="relative w-full h-16 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-between px-4 mb-4 select-none" dir="ltr">
                    <div class="absolute h-1 bg-emerald-400 left-8 right-8 top-1/2 -translate-y-1/2"></div>
                    
                    {Array.from({ length: 11 }).map((_, i) => {
                        const isCurrent = currentPosition === i;
                        return (
                            <div key={i} class="relative flex flex-col items-center">
                                <div class="w-1 h-3 bg-gray-400 dark:bg-slate-600"></div>
                                <span class="text-xs font-black mt-1 text-gray-500 dark:text-gray-400">{toPersianDigits(i)}</span>
                                {isCurrent && (
                                    <div class={`absolute bottom-6 text-3xl select-none ${isJumping ? 'animate-jump' : ''}`}>
                                        🐸
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Interactive Frog jumps */}
                <div class="flex justify-center gap-3">
                    <button onClick={() => jumpTo(currentPosition - 1)} class="bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 px-4 py-2.5 rounded-xl border font-bold text-sm shadow-sm">
                        ⬅️ یک قدم به چپ
                    </button>
                    <button onClick={() => jumpTo(currentPosition + 1)} class="bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 px-4 py-2.5 rounded-xl border font-bold text-sm shadow-sm">
                        یک قدم به راست ➡️
                    </button>
                </div>
            </div>

            <p class="text-sm font-bold text-gray-600 dark:text-gray-300 mb-4">قورباغه روی چه عددی فرود میاد؟</p>
            <div class="grid grid-cols-6 sm:grid-cols-11 gap-2 max-w-xl mx-auto" dir="ltr">
                {Array.from({ length: 11 }).map((_, i) => (
                    <button key={i} onClick={() => selectNumber(i)} class={`py-3.5 rounded-xl border text-base font-black shadow-sm transition ${solution === i ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400' : 'bg-white dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-600 border-gray-100 dark:border-slate-600'}`}>
                        {toPersianDigits(i)}
                    </button>
                ))}
            </div>
        </div>
    );
}
