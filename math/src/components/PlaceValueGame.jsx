const { useState } = React;
import { playSound, toPersianDigits } from '../utils.js';

export default function PlaceValueGame({ difficulty, onComplete }) {
    const [targetNum] = useState(() => Math.floor(Math.random() * 20) + 11); // 11 to 30
    const tens = Math.floor(targetNum / 10);
    const ones = targetNum % 10;

    const [userTens, setUserTens] = useState(0);
    const [userOnes, setUserOnes] = useState(0);
    const [userTotal, setUserTotal] = useState('');

    const checkAnswer = () => {
        if (userTens === tens && userOnes === ones && Number(userTotal) === targetNum) {
            onComplete(25, 4);
        } else {
            playSound('error');
            alert('مقادیر ارزش مکانی اشتباه است، مجدداً تعداد را بررسی کن! 🌸');
        }
    };

    return (
        <div class="text-center py-4" id="placevalue-game-root">
            <h3 class="text-xl font-black text-purple-700 dark:text-purple-400 mb-2">🧱 ارزش مکانی ده‌تایی و یکی</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-6">با توجه به شکل، بسته‌های ده‌تایی و یکی‌ها را به طور دقیق وارد کن!</p>

            <div class="grid grid-cols-2 gap-6 bg-purple-50/50 dark:bg-slate-700/30 p-6 rounded-3xl border border-purple-100 dark:border-slate-600 max-w-sm mx-auto mb-8">
                <div>
                    <h4 class="font-bold text-xs text-purple-700 dark:text-purple-300 mb-2">ستون ده‌تایی‌ها</h4>
                    <div class="flex justify-center gap-2">
                        {Array(tens).fill(0).map((_, i) => (
                            <div key={i} class="w-4 h-16 bg-gradient-to-t from-orange-400 to-orange-500 rounded border-2 border-orange-600 flex flex-col justify-between p-0.5">
                                {Array(10).fill(0).map((_, j) => (
                                    <div key={j} class="h-0.5 w-full bg-orange-700 opacity-40"></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div class="border-r border-purple-200 dark:border-slate-600">
                    <h4 class="font-bold text-xs text-purple-700 dark:text-purple-300 mb-2">ستون یکی‌ها</h4>
                    <div class="flex flex-wrap justify-center gap-1.5 p-2">
                        {Array(ones).fill(0).map((_, i) => (
                            <div key={i} class="w-3.5 h-3.5 bg-yellow-400 border border-yellow-600 rounded-sm"></div>
                        ))}
                    </div>
                </div>
            </div>

            <div class="space-y-4 max-w-xs mx-auto mb-6">
                <div class="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-2xl border shadow-sm">
                    <span class="text-sm font-bold text-gray-600 dark:text-gray-300">چند ده‌تایی داریم؟</span>
                    <div class="flex items-center gap-2">
                        <button onClick={() => { playSound('click'); setUserTens(Math.max(0, userTens - 1)); }} class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 font-extrabold flex items-center justify-center">-</button>
                        <span class="font-black text-lg w-6">{toPersianDigits(userTens)}</span>
                        <button onClick={() => { playSound('click'); setUserTens(userTens + 1); }} class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 font-extrabold flex items-center justify-center">+</button>
                    </div>
                </div>

                <div class="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-2xl border shadow-sm">
                    <span class="text-sm font-bold text-gray-600 dark:text-gray-300">چند یکی داریم؟</span>
                    <div class="flex items-center gap-2">
                        <button onClick={() => { playSound('click'); setUserOnes(Math.max(0, userOnes - 1)); }} class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 font-extrabold flex items-center justify-center">-</button>
                        <span class="font-black text-lg w-6">{toPersianDigits(userOnes)}</span>
                        <button onClick={() => { playSound('click'); setUserOnes(userOnes + 1); }} class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 font-extrabold flex items-center justify-center">+</button>
                    </div>
                </div>

                <div class="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-2xl border shadow-sm">
                    <span class="text-sm font-bold text-gray-600 dark:text-gray-300">کل عدد چیست؟</span>
                    <input type="number" value={userTotal} onChange={(e) => setUserTotal(e.target.value)} class="w-20 text-center py-1 bg-gray-100 dark:bg-slate-700 font-black rounded-lg text-lg focus:outline-none" placeholder="؟" />
                </div>
            </div>

            <button onClick={checkAnswer} class="w-full max-w-xs mx-auto bg-purple-600 hover:bg-purple-700 text-white font-black py-3.5 rounded-2xl shadow transition">
                بررسی پاسخ من 🚀
            </button>
        </div>
    );
}
