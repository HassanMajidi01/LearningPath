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
    correctOrder: ["من","عیدی","گرفتن", "را", "دوست", "دارم"],
    pieces: ["گرفتن","را","دارم", "دوست", "من", "عیدی"]
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
