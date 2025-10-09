// data.js

const mathTopicsData = [
    {
        "id": "theme-1",
        "title": "تم ۱",
        "subtopics": [
            {
                "id": "pattern-game",
                "title": "تمرین الگویابی",
                "type": "pattern-game",
                "data": {
                    "items": {
                        "apple": { "name": "apple", "image": "assets/images/apple.svg", "title": "سیب" },
                        "ball": { "name": "ball", "image": "assets/images/ball.svg", "title": "توپ" },
                        "car": { "name": "car", "image": "assets/images/car.svg", "title": "ماشین" }
                    },
                    // ✨ تعداد الگوها به ۱۰ عدد افزایش یافت ✨
                     "patterns": [
                        { "type": "AAB", "numItems": 2 },
                        { "type": "ABB", "numItems": 2 },
                        { "type": "ABC", "numItems": 3 },
                        { "type": "ABAB", "numItems": 2 },
                        { "type": "AAB", "numItems": 2 }, // موارد تکراری برای افزایش احتمال انتخاب
                        { "type": "ABB", "numItems": 2 },
                        { "type": "ABC", "numItems": 3 },
                        { "type": "ABAB", "numItems": 2 }
                    ]
                }
            },
            {
                "id": "counting-game",
                "title": "تمرین شمارش تا 5",
                "type": "game",
                "data": {
                    "items": [
                        { "name": "apple", "image": "assets/images/apple.svg", "title": "سیب" },
                        { "name": "ball", "image": "assets/images/ball.svg", "title": "توپ" },
                        { "name": "car", "image": "assets/images/car.svg", "title": "ماشین" }
                    ],
                    "audio": {
                        "numbers": {
                            "1": "assets/audio/1.mp3",
                            "2": "assets/audio/2.mp3",
                            "3": "assets/audio/3.mp3",
                            "4": "assets/audio/4.mp3",
                            "5": "assets/audio/5.mp3"
                        },
                        "items": {
                            "سیب": "assets/audio/sib.mp3",
                            "توپ": "assets/audio/toop.mp3",
                            "ماشین": "assets/audio/mashin.mp3"
                        },
                        "instruction": "assets/audio/instruction.mp3"
                    },
                    "boxImage": "assets/images/box.svg"
                }
            }
        ]
    }
];

// Generate themes 2 to 25
for (let i = 2; i <= 25; i++) {
    const theme = {
        "id": `theme-${i}`,
        "title": `تم ${i}`,
        "subtopics": []
    };

    // Add Sudoku game to Theme 2 only
    if (i === 2) {
        theme.subtopics.push({
            "id": "sudoku-game",
            "title": "تمرین سودوکو",
            "type": "sudoku-game",
            "data": {
                "items": [
                    { "name": "apple", "image": "assets/images/apple.svg", "title": "سیب" },
                    { "name": "ball", "image": "assets/images/ball.svg", "title": "توپ" },
                    { "name": "car", "image": "assets/images/car.svg", "title": "ماشین" }
                ]
            }
        });
    }

    mathTopicsData.push(theme);
}