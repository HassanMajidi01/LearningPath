// Persian2 lesson data
// Exporting as an ES module so `main.js` can import it
export const lessonsData = [
    {
        id: 1,
        title: "درس نهم: زیارت",
        videos: [
            { title: "انیمیشن درس زیارت", embedCode: "", duration: "5:32" },
            
        ],
        
        flashcards: [
            { question: "چرا زینب با خودش دانه آورده بود؟", answer: "تا به کبوتر ها دانه دهد" },
            { question: "زینب و مادرش پس از شنیدن صدای اذان چه کردند؟", answer: "وضو گرفتند." },
            { question: " زینب و مادرش چه موقع در حرم بودند؟", answer: "غروب" },
            { question: "وضوخانه", answer: "جایی که در آن وضو می‌گیرند" },
            { question: "نمازخانه", answer: "جایی که در آن نماز می‌خوانند" },
            { question: "گل خانه", answer: "جایی که در آن گل نگه می‌دارند" },
            { question: "داروخانه", answer: "جایی که در آن دارو نگه می‌دارند" },
            { question: "آشپزخانه", answer: "جایی که در آن غذا درست می‌کنند" },
            { question: "چایخانه", answer: "جایی که در آن چای می‌نوشند" },
            { question: "زیارت", answer: "دیدار و حضور در مکان مقدس" },
            { question: "چند نمونه شهر های زیارتی را نام ببرید.", answer: "مشهد، قم، کربلا، نجف" },
            { question: "سفر زیارتی به چه معناست؟", answer: "سفری که برای دیدار مکان‌های مقدس انجام می‌شود" },
            { question: "حرم کدام یک از امامان شیعه در مشهد قرار دارد؟", answer: "امام رضا (ع)" },
            { question: "....کارتان را به موقع انجام....", answer: "شما-می‌دهید" },
            { question: "او با دقت مشق هایش را....", answer: "می نویسد" },

        ],
        // Matching game configuration for pronouns and verb conjugations
        matchGame: {
            pronouns: ["من", "تو", "او", "ما", "شما", "آنها"],
            rounds: [
                {
                    verbRoot: "دعا کردن",
                    pairs: [
                        { pronoun: "من", verb: "دعا کردم" },
                        { pronoun: "تو", verb: "دعا کردی" },
                        { pronoun: "او", verb: "دعا کرد" },
                        { pronoun: "ما", verb: "دعا کردیم" },
                        { pronoun: "شما", verb: "دعا کردید" },
                        { pronoun: "آنها", verb: "دعا کردند" }
                    ]
                },
                {
                    verbRoot: "دعا می کردم",
                    pairs: [
                        { pronoun: "من", verb: "دعا می کردم" },
                        { pronoun: "تو", verb: "دعا می کردی" },
                        { pronoun: "او", verb: "دعا می کرد" },
                        { pronoun: "ما", verb: "دعا می کردیم" },
                        { pronoun: "شما", verb: "دعا می کردید" },
                        { pronoun: "آنها", verb: "دعا می کردند" }
                    ]
                },
                {
                    verbRoot: "می روم",
                    pairs: [
                        { pronoun: "من", verb: "می روم" },
                        { pronoun: "تو", verb: "می روی" },
                        { pronoun: "او", verb: "می رود" },
                        { pronoun: "ما", verb: "می رویم" },
                        { pronoun: "شما", verb: "می روید" },
                        { pronoun: "آنها", verb: "می روند" }
                    ]
                },
                {
                    verbRoot: "بازی می کنم",
                    pairs: [
                        { pronoun: "من", verb: "بازی می کنم" },
                        { pronoun: "تو", verb: "بازی می کنی" },
                        { pronoun: "او", verb: "بازی می کند" },
                        { pronoun: "ما", verb: "بازی می کنیم" },
                        { pronoun: "شما", verb: "بازی می کنید" },
                        { pronoun: "آنها", verb: "بازی می کنند" }
                    ]
                }
            ]
        }
    }
];
