const Topics = {
    "counting": "شمردن (تا ۵)"
    // مباحث دیگر در آینده اینجا اضافه می‌شوند
};

const GameData = {
    "counting": [
        {
            type: "counting-coloring", // نوع بازی
            question: "چند تا گربه در تصویر می‌بینی؟ خانه‌ها را رنگ کن.",
            image: "assets/images/count-image-1.png",
            target: "cat",
            answer: 3
        },
        {
            type: "counting-coloring",
            question: "چند تا سیب در تصویر هست؟ خانه‌ها را رنگ کن.",
            image: "assets/images/count-image-2.png",
            target: "apple",
            answer: 4
        },
        {
            type: "drag-and-drop", // نوع بازی
            question: "۳ تا موز داخل جعبه بگذار.",
            image: "assets/images/banana.png",
            answer: 3
        },
        {
            type: "drag-and-drop",
            question: "۵ تا ماشین داخل جعبه بگذار.",
            image: "assets/images/car.png",
            answer: 5
        }
    ]
};