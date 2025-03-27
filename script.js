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
    correctOrder: ["من", "به", "مدرسه", "رفته‌ام"],
    pieces: ["مدرسه", "رفته‌ام", "من", "به"]
  },
  {
    correctOrder: [ "علی", "به", "سفر", "رفت"],
    pieces: [ "سفر","به", "رفت", "علی"]
  },
  {
    correctOrder: ["من", "عید", "را", "دوست", "دارم"],
    pieces: ["را","دارم", "دوست", "من", "عید"]
  },
  {
    correctOrder: ["معلّم","همه یِ","دانش آموزانش", "را", "دوست", "دارد"],
    pieces: ["همه یِ","را","دارد", "دوست", "دانش آموزانش", "معلّم"]
  },
  {
    correctOrder: ["من","عروسک", "هایِ", "قشنگی", "دارم"],
    pieces: ["هایِ","عروسک", "من", "دارم", "قشنگی"]
  },
  {
    correctOrder: ["مادرم","در", "مزرعه", "کار", "می کند"],
    pieces: ["می کند","کار", "در", "مزرعه", "مادرم"]
  },
  {
    correctOrder: ["ما", "شمع", "روشن", "کردیم"],
    pieces: ["شمع", "ما", "کردیم", "روشن"]
  },
  {
    correctOrder: ["درس", "علوم", "شیرین", "است"],
    pieces: ["است", "علوم", "درس", "شیرین"]
  },
  {
    correctOrder: ["او", "عینکم", "را", "شکست"],
    pieces: ["شکست", "را", "عینکم", "او"]
  },
  {
    correctOrder: ["مسلمانان", "در", "مسجد", "عبادت", "می کنند"],
    pieces: ["می کنند","در", "عبادت", "مسجد", "مسلمانان"]
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
    { question: 'کدام کلمه درست است؟', options: ['عازاده', 'ازاده', 'آزاده'], correct: 'آزاده' },
    { question: 'کدام کلمه درست است؟', options: ['عنسان', 'اِنسان', 'آنسان'], correct: 'اِنسان' },
    { question: 'کدام کلمه درست است؟', options: ['آکس', 'عکس', 'اَکس'], correct: 'عکس' },
    { question: 'کدام کلمه درست است؟', options: ['ای مان', 'عیمان', 'ایمان'], correct: 'ایمان' },
    { question: 'کدام کلمه درست است؟', options: [' ای ستاد', 'ایستاد', 'عیستاد'], correct: 'ایستاد' },
    { question: 'کدام کلمه درست است؟', options: [' ای رانی', 'ایرانی', 'عیرانی'], correct: 'ایرانی' },
    { question: 'کدام کلمه درست است؟', options: ['عصبانی', 'اصبانی', 'عسبانی'], correct: 'عصبانی' },
    { question: 'کدام کلمه درست است؟', options: ['عذیت', 'ازیت', 'اذیت'], correct: 'اذیت' },
    { question: 'کدام کلمه درست است؟', options: [ 'اَلی', 'علی'], correct: 'علی' },
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