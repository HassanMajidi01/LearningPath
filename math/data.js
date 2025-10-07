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
                    "patterns": [
                        { "type": "AB", "length": 6, "numItems": 2 },
                        { "type": "AAB", "length": 9, "numItems": 2 },
                        { "type": "ABC", "length": 9, "numItems": 3 }
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
            },
            {
                "id": "theme-1-videos",
                "title": "ویدئوهای آموزشی",
                "type": "videos",
                "data": {
                    "videos": []
                }
            },
            {
                "id": "theme-1-quiz",
                "title": "آزمونک",
                "type": "quiz",
                "data": {
                    "quizLink": ""
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
            "type": "sudoku-game", // نوع جدید برای بازی سودوکو
            "data": {
                "items": [
                    { "name": "apple", "image": "assets/images/apple.svg", "title": "سیب" },
                    { "name": "ball", "image": "assets/images/ball.svg", "title": "توپ" },
                    { "name": "car", "image": "assets/images/car.svg", "title": "ماشین" }
                ]
            }
        });
    }

    theme.subtopics.push(
        {
            "id": `theme-${i}-videos`,
            "title": "ویدئوهای آموزشی",
            "type": "videos",
            "data": {
                "videos": []
            }
        },
        {
            "id": `theme-${i}-quiz`,
            "title": "آزمونک",
            "type": "quiz",
            "data": {
                "quizLink": ""
            }
        }
    );
    mathTopicsData.push(theme);
}