const { useState } = React;
import { playSound, toPersianDigits } from '../utils.js';

export default function SudokuGame({ difficulty, onComplete }) {
    const templates = [
        {
            sol: [[1, 2, 3, 4], [3, 4, 1, 2], [2, 3, 4, 1], [4, 1, 2, 3]],
            puz: [[1, 0, 3, 0], [0, 4, 0, 2], [2, 0, 4, 0], [0, 1, 0, 3]]
        },
        {
            sol: [[4, 1, 2, 3], [2, 3, 4, 1], [1, 2, 3, 4], [3, 4, 1, 2]],
            puz: [[0, 1, 0, 3], [2, 0, 4, 0], [0, 2, 0, 4], [3, 0, 1, 0]]
        }
    ];

    const [templateIdx] = useState(() => Math.floor(Math.random() * templates.length));
    const [mode, setMode] = useState('numbers'); // numbers, animals, shapes
    const [grid, setGrid] = useState(() => JSON.parse(JSON.stringify(templates[templateIdx].puz)));
    const [selectedCell, setSelectedCell] = useState(null);
    const [shakeCell, setShakeCell] = useState(null);

    const solution = templates[templateIdx].sol;
    const original = templates[templateIdx].puz;

    const mapVal = (v) => {
        if (v === 0) return '';
        if (mode === 'numbers') return toPersianDigits(v);
        if (mode === 'animals') {
            const anims = ['', '🦊', '🐰', '🦁', '🐼'];
            return anims[v];
        }
        if (mode === 'shapes') {
            const shp = ['', '🔴', '🟦', '🌟', '🔺'];
            return shp[v];
        }
    };

    const selectCell = (r, c) => {
        playSound('click');
        if (original[r][c] !== 0) return; // Clue cell
        setSelectedCell({ r, c });
    };

    const fillCell = (val) => {
        if (!selectedCell) return;
        const { r, c } = selectedCell;
        
        if (solution[r][c] === val) {
            playSound('click');
            const updated = [...grid];
            updated[r][c] = val;
            setGrid(updated);
            setSelectedCell(null);

            // Check complete success
            let won = true;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (updated[i][j] !== solution[i][j]) won = false;
                }
            }
            if (won) {
                onComplete(30, 4); // 30 XP, 4 Stars
            }
        } else {
            playSound('error');
            setShakeCell({ r, c });
            setTimeout(() => setShakeCell(null), 300);
        }
    };

    return (
        <div class="text-center py-4" id="sudoku-game-root">
            <h3 class="text-xl font-black text-indigo-700 dark:text-indigo-400 mb-2">🧩 سودوکوی جادویی ۴ در ۴</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">خانه‌های خالی را طوری پر کن که در هیچ سطر یا ستونی شکل تکراری نباشد!</p>

            <div class="flex justify-center gap-3 mb-6 bg-gray-50 dark:bg-slate-700/50 p-1.5 rounded-xl max-w-xs mx-auto">
                <button onClick={() => setMode('numbers')} class={`flex-1 py-1 px-3 text-xs font-bold rounded-lg ${mode === 'numbers' ? 'bg-indigo-500 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>۱، ۲، ۳، ۴</button>
                <button onClick={() => setMode('animals')} class={`flex-1 py-1 px-3 text-xs font-bold rounded-lg ${mode === 'animals' ? 'bg-indigo-500 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>🦊 جنگل حیوانات</button>
                <button onClick={() => setMode('shapes')} class={`flex-1 py-1 px-3 text-xs font-bold rounded-lg ${mode === 'shapes' ? 'bg-indigo-500 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>🔴 اشکال هندسی</button>
            </div>

            <div class="grid grid-cols-4 gap-2.5 max-w-[280px] mx-auto bg-indigo-50/50 dark:bg-slate-700/30 p-4 rounded-3xl border border-indigo-100 dark:border-slate-600 mb-6">
                {grid.map((row, r) => row.map((val, c) => {
                    const isClue = original[r][c] !== 0;
                    const isSelected = selectedCell && selectedCell.r === r && selectedCell.c === c;
                    const isShaking = shakeCell && shakeCell.r === r && shakeCell.c === c;
                    return (
                        <div key={`${r}-${c}`} onClick={() => selectCell(r, c)} class={`aspect-square flex items-center justify-center text-3xl font-extrabold rounded-2xl cursor-pointer transition duration-200 select-none ${isClue ? 'bg-white dark:bg-slate-800 text-indigo-900 dark:text-white shadow-sm border border-indigo-200/50 dark:border-slate-700' : 'bg-indigo-100/50 hover:bg-indigo-100 dark:bg-slate-700 dark:hover:bg-slate-600'} ${isSelected ? 'ring-4 ring-brand-500 bg-white scale-105' : ''} ${isShaking ? 'animate-shake border-red-500 ring-2 ring-red-400' : ''}`}>
                            {mapVal(val)}
                        </div>
                    );
                }))}
            </div>

            {selectedCell && (
                <div class="bg-indigo-50 dark:bg-slate-800 p-4 rounded-2xl max-w-sm mx-auto border border-indigo-100 dark:border-slate-700">
                    <p class="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">یک مورد را برای این خانه انتخاب کن:</p>
                    <div class="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map(v => (
                            <button key={v} onClick={() => fillCell(v)} class="bg-white dark:bg-slate-700 hover:scale-105 hover:bg-gray-50 dark:hover:bg-slate-600 p-3 rounded-xl border border-gray-100 dark:border-slate-600 shadow text-2xl font-black transition">
                                {mode === 'numbers' ? toPersianDigits(v) : mode === 'animals' ? ['🦊', '🐰', '🦁', '🐼'][v - 1] : ['🔴', '🟦', '🌟', '🔺'][v - 1]}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
