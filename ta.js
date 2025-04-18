// متغیرهای گلوبال برای آمار بازی
let currentQuestion = 0;
let correctCount = 0;
let wrongCount = 0;
let totalAttempts = 0;
const totalQuestions = 10;
let currentAttempts = 0;
let draggedEl = null; // عنصر در حال کشیده شدن

// مجموعه‌ای از سوالات نمونه (در عمل این داده‌ها از سرور دریافت می‌شود)
let questions = [
  {
    correctOrder: ["قطار", "در", "ایستگاه", "ایستاده", "است"],
    pieces: ["ایستاده", "است", "قطار", "در", "ایستگاه"]
  },
  {
    correctOrder: [ "طلا", "در", "زیر", "زمین", "یافت", "می شود"],
    pieces: ["یافت", "می شود", "طلا", "در", "زیر", "زمین"]
  },
  {
    correctOrder: ["بچه ها", "در", "حیاط", "بازی", "می کنند"],
    pieces: ["در", "بازی", "می کنند", "بچه ها", "حیاط"]
  },
  {
    correctOrder: ["من", "به", "وطنم", "افتخار", "می کنم"],
    pieces: ["به", "افتخار", "می کنم", "من", "وطنم"]
  },
  {
    correctOrder: ["طوطی", "پرنده ای", "زیبا", "و", "رنگارنگ", "است"],
    pieces: ["پرنده ای", "زیبا", "و", "رنگارنگ", "است", "طوطی"]
  },
  {
    correctOrder: ["طاووس", "زیبا", "در", "باغ", "قدم", "می زند"],
    pieces: ["زیبا", "در", "قدم", "می زند", "طاووس", "باغ"]
  },
  {
    correctOrder: ["امروز", "تعطیل", "است", "و", "من", "به", "پارک", "می روم"],
    pieces: ["تعطیل", "است", "و", "من", "به", "پارک", "می روم", "امروز"]
  },
  {
    correctOrder: ["من", "یک", "مستطیل", "کشیدم"],
    pieces: ["کشیدم", "من", "یک", "مستطیل"]
  },
  {
    correctOrder: ["من", "همیشه", "خاطره ی", "خوش", "از", "سفر", "به", "شهر", "شیراز", "دارم"],
    pieces: ["خاطره ی", "خوش", "من", "دارم", "از", "سفر", "به", "شهر", "شیراز", "همیشه"]
  },
  {
    correctOrder: ["طاهره", "و", "دوستانش", "به", "اردو", "رفتند"],
    pieces: ["دوستانش", "به", "اردو", "رفتند", "طاهره", "و"]
  },
 
  // سوالات بیشتر...
];

// توابع کمکی

// تابع اضافه کردن event listenerهای drag & drop به المان
function addDragAndDropEvents(el) {
  el.setAttribute('draggable', true);
  el.addEventListener('dragstart', dragStartHandler);
  el.addEventListener('dragover', dragOverHandler);
  el.addEventListener('drop', dropHandler);
}

function dragStartHandler(e) {
  draggedEl = this;
  e.dataTransfer.effectAllowed = 'move';
  // افزودن کلاس جهت نشان دادن حالت کشیده شدن (اختیاری)
  this.classList.add('dragging');
}

function dragOverHandler(e) {
  e.preventDefault(); // اجازه‌ی drop را می‌دهد
  return false;
}

function dropHandler(e) {
  e.stopPropagation();
  if (draggedEl !== this) {
    // تغییر جایگاه المان‌های draggedEl و drop target
    let parent = this.parentNode;
    let children = Array.from(parent.children);
    let draggedIndex = children.indexOf(draggedEl);
    let targetIndex = children.indexOf(this);
    if (draggedIndex < targetIndex) {
      parent.insertBefore(draggedEl, this.nextSibling);
    } else {
      parent.insertBefore(draggedEl, this);
    }
  }
  // حذف کلاس dragging از المان کشیده شده
  draggedEl.classList.remove('dragging');
  return false;
}

function shufflePieces(pieces) {
  return pieces.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  currentAttempts = 0;
  document.getElementById('feedback').innerText = '';
  document.getElementById('error-options').style.display = 'none';
  document.getElementById('next-question').style.display = 'none';
  
  // فرض می‌کنیم سوال‌ها از آرایه questions گرفته می‌شود
  let question = questions[currentQuestion];
  let shuffled = shufflePieces([...question.pieces]);
  
  let container = document.getElementById('sentence-container');
  container.innerHTML = '';
  
  // ایجاد المان‌های تکه جمله با قابلیت Drag & Drop
  shuffled.forEach((piece, index) => {
    let span = document.createElement('span');
    span.className = 'sentence-piece';
    span.innerText = piece;
    span.setAttribute('data-index', index);
    addDragAndDropEvents(span); // افزودن قابلیت Drag & Drop به هر المان
    container.appendChild(span);
  });
}

function checkAnswer() {
  currentAttempts++;
  totalAttempts++;
  
  // خواندن ترتیب فعلی تکه‌ها از container
  let container = document.getElementById('sentence-container');
  let pieces = Array.from(container.getElementsByClassName('sentence-piece')).map(el => el.innerText);
  let correctOrder = questions[currentQuestion].correctOrder;
  
  if (JSON.stringify(pieces) === JSON.stringify(correctOrder)) {
    correctCount++;
    document.getElementById('feedback').innerText = 'آفرین! پاسخ صحیح است.';
    document.getElementById('next-question').style.display = 'block';
  } else {
    wrongCount++;
    document.getElementById('feedback').innerText = 'پاسخ اشتباه است.';
    document.getElementById('error-options').style.display = 'block';
  }
}

function showFinalResult() {
  document.getElementById('correct-count').innerText = `تعداد سوالات صحیح: ${correctCount}`;
  document.getElementById('wrong-count').innerText = `تعداد سوالات اشتباه: ${wrongCount}`;
  document.getElementById('attempts-count').innerText = `تعداد کل تلاش‌ها: ${totalAttempts}`;
  
  document.getElementById('question-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';
}

// رویدادهای کلیک
document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('question-screen').style.display = 'block';
  loadQuestion();
});

document.getElementById('submit-answer').addEventListener('click', checkAnswer);

document.getElementById('try-again').addEventListener('click', () => {
  document.getElementById('feedback').innerText = '';
  document.getElementById('error-options').style.display = 'none';
  // امکان بازنشانی یا تغییر ترتیب اولیه تکه‌ها در صورت نیاز
});

document.getElementById('show-answer').addEventListener('click', () => {
  let container = document.getElementById('sentence-container');
  container.innerHTML = '';
  questions[currentQuestion].correctOrder.forEach(piece => {
    let span = document.createElement('span');
    span.className = 'sentence-piece';
    span.innerText = piece;
    // افزودن دوباره قابلیت Drag & Drop در صورت نیاز
    addDragAndDropEvents(span);
    container.appendChild(span);
  });
  document.getElementById('error-options').style.display = 'none';
});

document.getElementById('next-question').addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion >= totalQuestions) {
    // نمایش نتایج نهایی
    document.getElementById('question-screen').style.display = 'none';
    showFinalResult();
  } else {
    loadQuestion();
  }
});

document.getElementById('restart-game').addEventListener('click', () => {
  // بازنشانی متغیرها و شروع از ابتدا
  currentQuestion = 0;
  correctCount = 0;
  wrongCount = 0;
  totalAttempts = 0;
  document.getElementById('result-screen').style.display = 'none';
  document.getElementById('question-screen').style.display = 'block';
  loadQuestion();
});

//بازی پیدا کردن کلمات درست
document.addEventListener('DOMContentLoaded', () => {
  const wordGameContainer = document.getElementById('word-game-container');
  const wordWelcomeScreen = document.getElementById('word-welcome-screen');
  const wordQuestionScreen = document.getElementById('word-question-screen');
  const wordQuestionContainer = document.getElementById('word-question-container');
  const wordFeedback = document.getElementById('word-feedback');
  const wordErrorOptions = document.getElementById('word-error-options');
  const wordNextQuestion = document.getElementById('word-next-question');
  const wordTryAgain = document.getElementById('word-try-again');
  const wordShowAnswer = document.getElementById('word-show-answer');
  const wordResultScreen = document.getElementById('word-result-screen');
  const wordCorrectCount = document.getElementById('word-correct-count');
  const wordWrongCount = document.getElementById('word-wrong-count');
  const wordAttemptsCount = document.getElementById('word-attempts-count');
  const wordRestartGame = document.getElementById('word-restart-game');
  const wordProgressBar = document.getElementById('word-progress-bar');

  const wordQuestions = [
    { question: 'کدام کلمه درست است؟', options: ['خیّاط', 'خیات', 'خییاط'], correct: 'خیّاط' },
    { question: 'کدام کلمه درست است؟', options: ['چه طور', 'چه تور', 'چه طر'], correct: 'چه طور' },
    { question: 'کدام کلمه درست است؟', options: ['خت', 'خط', 'خد'], correct: 'خط' },
    { question: 'کدام کلمه درست است؟', options: ['تول', 'طل', 'طول'], correct: 'طول' },
    { question: 'کدام کلمه درست است؟', options: ['وصت', 'وسط', 'وصط'], correct: 'وسط' },
    { question: 'کدام کلمه درست است؟', options: ['نقطه', 'نقته', 'نوقطه'], correct: 'نقطه' },
    { question: 'کدام کلمه درست است؟', options: ['فقت', 'فقد', 'فقط'], correct: 'فقط' },
    { question: 'کدام کلمه درست است؟', options: ['ربت', 'رپط', 'ربط'], correct: 'ربط' },
    { question: 'کدام کلمه درست است؟', options: [ 'ترف', 'طرف', 'طف'], correct: 'طرف' },
    { question: 'کدام کلمه درست است؟', options: [ 'تناب', 'طناب', 'طن آب'], correct: 'طناب' },
  ];

  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let attempts = 0;

  function showWordQuestion() {
    const currentQuestion = wordQuestions[currentQuestionIndex];
    wordQuestionContainer.innerHTML = `<h3>${currentQuestion.question}</h3>`;
    currentQuestion.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = 'word-option';
      optionElement.textContent = option;
      optionElement.addEventListener('click', () => checkWordAnswer(option));
      wordQuestionContainer.appendChild(optionElement);
    });
    wordFeedback.textContent = '';
    wordErrorOptions.style.display = 'none';
    wordNextQuestion.style.display = 'none';
    updateProgressBar(); // به‌روزرسانی نوار پیشرفت
  }

  function checkWordAnswer(selectedOption) {
    const currentQuestion = wordQuestions[currentQuestionIndex];
    attempts++;
    if (selectedOption === currentQuestion.correct) {
      correctAnswers++;
      wordFeedback.textContent = 'آفرین درست گفتی!';
      wordFeedback.className = 'correct'; // Add the "correct" class
      wordNextQuestion.style.display = 'block';
    } else {
      wrongAnswers++;
      wordFeedback.textContent = 'اشتباه است!';
      wordFeedback.className = 'incorrect'; // Add the "incorrect" class
      wordErrorOptions.style.display = 'block';
    }
    updateProgressBar();
  }

  wordTryAgain.addEventListener('click', showWordQuestion);
  wordShowAnswer.addEventListener('click', () => {
    wordFeedback.textContent = `پاسخ صحیح: ${wordQuestions[currentQuestionIndex].correct}`;
    wordNextQuestion.style.display = 'block';
  });

  wordNextQuestion.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < wordQuestions.length) {
      showWordQuestion();
    } else {
      showWordResult();
    }
    updateProgressBar();
  });

  function showWordResult() {
    wordQuestionScreen.style.display = 'none';
    wordResultScreen.style.display = 'block';
    wordCorrectCount.textContent = `تعداد پاسخ‌های درست: ${correctAnswers}`;
    wordWrongCount.textContent = `تعداد پاسخ‌های غلط: ${wrongAnswers}`;
    wordAttemptsCount.textContent = `تعداد تلاش‌ها: ${attempts}`;
  }

  wordRestartGame.addEventListener('click', () => {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    attempts = 0;
    wordResultScreen.style.display = 'none';
    wordWelcomeScreen.style.display = 'block';
    wordProgressBar.style.width = '0%'; // بازنشانی نوار پیشرفت
  });

  document.getElementById('word-start-btn').addEventListener('click', () => {
    wordWelcomeScreen.style.display = 'none';
    wordQuestionScreen.style.display = 'block';
    showWordQuestion();
    updateProgressBar();
  });

  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / wordQuestions.length) * 100;
    wordProgressBar.style.width = `${progress}%`;
  }

  wordProgressBar.style.width = '0%';
});

// بازی حافظه
document.addEventListener("DOMContentLoaded", () => {
  const memoryGameStartButton = document.getElementById("memory-game-start-button");
  const memoryGameContainer = document.getElementById("memory-game-container");
  const memoryCardsContainer = document.getElementById("memory-cards-container");
  const memoryGameTimer = document.getElementById("memory-game-timer");
  const memoryGameFeedback = document.getElementById("memory-game-feedback");
  const memoryGameRetryButton = document.getElementById("memory-game-retry-button");
  const memoryGameEndButton = document.getElementById("memory-game-end-button");
  const memoryGameButtons = document.getElementById("memory-game-buttons");

  const words = [
    { word: "طبقه", audio: "audio/tabaghe.mp3" },
    { word: "قطره", audio: "audio/ghatre.mp3" },
    { word: "سطل", audio: "audio/satl.mp3" },
    { word: "طالبی", audio: "audio/talebi.mp3" },
    { word: "طاووس", audio: "audio/tavoos.mp3" },
    { word: "فاطمه", audio: "audio/fateme.mp3" },
    { word: "حیاط", audio: "audio/hayat.mp3" },
    { word: "مستطیل", audio: "audio/mostatil.mp3" },
  ];

  let shuffledWords = [];
  let firstCard = null;
  let secondCard = null;
  let matchedPairs = 0;
  let timer = 0;
  let timerInterval = null;

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function startTimer() {
    timer = 0;
    memoryGameTimer.textContent = `زمان: ${timer} ثانیه`;
    timerInterval = setInterval(() => {
      timer++;
      memoryGameTimer.textContent = `زمان: ${timer} ثانیه`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function resetGame() {
    firstCard = null;
    secondCard = null;
    matchedPairs = 0;
    shuffledWords = shuffleArray([...words, ...words]); // دو نسخه از هر کلمه
    memoryCardsContainer.innerHTML = "";
    memoryGameFeedback.textContent = "";
    memoryGameButtons.style.display = "none";
    memoryGameTimer.textContent = "زمان: 0 ثانیه";
    stopTimer();
    createCards();
  }

  function createCards() {
    shuffledWords.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("memory-card");
      card.dataset.word = item.word;
      card.dataset.audio = item.audio;
      card.textContent = ""; // کارت‌ها به پشت هستند
      card.addEventListener("click", handleCardClick);
      memoryCardsContainer.appendChild(card);
    });
  }

  function playAudio(audioSrc) {
    const audio = new Audio(audioSrc);
    audio.play();
  }

  function handleCardClick(event) {
    const clickedCard = event.target;

    // جلوگیری از کلیک روی کارت‌های جفت‌شده یا کارت‌های بازشده
    if (clickedCard === firstCard || clickedCard.classList.contains("matched")) {
      return;
    }

    // نمایش کلمه و پخش صدای آن
    clickedCard.textContent = clickedCard.dataset.word;
    playAudio(clickedCard.dataset.audio);

    if (!firstCard) {
      firstCard = clickedCard;
    } else if (!secondCard) {
      secondCard = clickedCard;

      if (firstCard.dataset.word === secondCard.dataset.word) {
        // جفت‌شدن کارت‌ها
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;

        firstCard = null;
        secondCard = null;

        if (matchedPairs === words.length) {
          stopTimer();
          memoryGameFeedback.textContent = `تبریک! بازی را در ${timer} ثانیه به پایان رساندید.`;
          memoryGameButtons.style.display = "block";
        }
      } else {
        // عدم جفت‌شدن کارت‌ها
        setTimeout(() => {
          firstCard.textContent = "";
          secondCard.textContent = "";
          firstCard = null;
          secondCard = null;
        }, 1000);
      }
    }
  }

  memoryGameStartButton.addEventListener("click", () => {
    memoryGameStartButton.style.display = "none";
    memoryGameContainer.style.display = "block";
    resetGame();
    startTimer();
  });

  memoryGameRetryButton.addEventListener("click", () => {
    resetGame();
    startTimer();
  });

  memoryGameEndButton.addEventListener("click", () => {
    stopTimer();
    memoryGameContainer.style.display = "none";
    memoryGameStartButton.style.display = "block";
  });
});

