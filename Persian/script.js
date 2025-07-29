// script.js

// انتخاب عناصر اصلی از HTML
const lessonSelectionContainer = document.getElementById('lesson-selection');
const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');

let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false; // برای جلوگیری از کلیک‌های اضافی هنگام بررسی کارت‌ها
let timerInterval;
let seconds = 0;

// تابع برای نمایش دکمه‌های انتخاب درس
function displayLessonButtons() {
  lessonsData.forEach((lesson, index) => {
    const button = document.createElement('button');
    button.textContent = lesson.title;
    button.addEventListener('click', () => startGame(index));
    lessonSelectionContainer.appendChild(button);
  });
}

// تابع برای شروع بازی با درس انتخاب شده
function startGame(lessonIndex) {
  // ریست کردن وضعیت بازی
  resetGame();

  const lesson = lessonsData[lessonIndex];
  const shuffledWords = shuffle(lesson.words);

  // ساخت کارت‌ها در صفحه
  shuffledWords.forEach(word => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.word = word; // ذخیره کلمه در دیتا-اتریبیوت کارت

    card.innerHTML = `
      <div class="card-face card-front">?</div>
      <div class="card-face card-back">${word}</div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });

  // شروع تایمر
  startTimer();
}

// تابع برای بر زدن آرایه (الگوریتم فیشر-یتس)
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// تابع برای چرخاندن کارت
function flipCard() {
  if (lockBoard) return;
  if (this === flippedCards[0]) return; // جلوگیری از کلیک دوباره روی همان کارت

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

// تابع برای بررسی جفت بودن کارت‌ها
function checkForMatch() {
  lockBoard = true;
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.word === secondCard.dataset.word) {
    // اگر جفت بودند
    matchedPairs++;
    disableCards();
    checkIfGameIsOver();
  } else {
    // اگر جفت نبودند
    unflipCards();
  }
}

// تابع برای غیرفعال کردن کارت‌های جفت شده
function disableCards() {
  flippedCards.forEach(card => {
    card.removeEventListener('click', flipCard);
    card.classList.add('matched');
  });
  resetFlippedCards();
}

// تابع برای برگرداندن کارت‌های اشتباه
function unflipCards() {
  setTimeout(() => {
    flippedCards.forEach(card => card.classList.remove('flipped'));
    resetFlippedCards();
  }, 1200); // 1.2 ثانیه صبر برای دیدن کارت دوم
}

function resetFlippedCards() {
  flippedCards = [];
  lockBoard = false;
}

// تابع برای بررسی پایان بازی
function checkIfGameIsOver() {
    const totalPairs = gameBoard.children.length / 2;
    if (matchedPairs === totalPairs) {
        clearInterval(timerInterval); // توقف تایمر
        messageElement.textContent = `عالی بود! شما در ${seconds} ثانیه بازی را تمام کردید.`;
    }
}

// توابع مربوط به تایمر
function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    timerElement.textContent = `زمان: ${seconds} ثانیه`;
  }, 1000);
}

function resetGame() {
  clearInterval(timerInterval);
  seconds = 0;
  matchedPairs = 0;
  gameBoard.innerHTML = '';
  timerElement.textContent = 'زمان: 0 ثانیه';
  messageElement.textContent = '';
  lockBoard = false;
}


// شروع برنامه با نمایش دکمه‌های درس
displayLessonButtons();