document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const studentNameInput = document.getElementById("student-name");
  const startSection = document.getElementById("start-section");
  const exerciseSection = document.getElementById("exercise-section");
  const exerciseContainer = document.getElementById("exercise-container");
  const progressBarContainer = document.getElementById("progress-bar-container");
  const feedbackMessage = document.getElementById("feedback-message");
  const checkAnswerButton = document.getElementById("check-answer");
  const skipQuestionButton = document.getElementById("skip-question");
  const showAnswerButton = document.getElementById("show-answer");
  const nextQuestionButton = document.getElementById("next-question");
  const resultsSection = document.getElementById("results-section");
  const resultsContainer = document.getElementById("results-container");
  const retryButton = document.getElementById("retry-button");

  const exercises = [
    { question: "۷ کاشی گربه را داخل جعبه بگذار.", count: 7, image: "cat.png" },
    { question: "۳ کاشی حیوان دیگر را داخل جعبه بگذار.", count: 3, image: "dog.png" },
    { question: "۸ کاشی حیوان دیگر را داخل جعبه بگذار.", count: 8, image: "rabbit.png" },
    { question: "۶ کاشی حیوان دیگر را داخل جعبه بگذار.", count: 6, image: "bird.png" },
    { question: "۵ کاشی حیوان دیگر را داخل جعبه بگذار.", count: 5, image: "fish.png" },
    { question: "۹ کاشی حیوان دیگر را داخل جعبه بگذار.", count: 9, image: "horse.png" },
  ];

  let currentExerciseIndex = 0;
  let currentCount = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let attempts = 0;

  startButton.addEventListener("click", () => {
    startSection.style.display = "none";
    exerciseSection.style.display = "block";
    loadExercise(); // شروع تمرین
  });

  function loadExercise() {
    // پاک کردن فیدبک سوال قبلی
    feedbackMessage.textContent = "";
    feedbackMessage.classList.remove("success", "error");

    const box = document.getElementById("box");
    if (box) {
      box.classList.remove("box-correct", "box-incorrect"); // حذف هاله‌ها
    }

    if (currentExerciseIndex >= exercises.length) {
      showResults();
      return;
    }

    const exercise = exercises[currentExerciseIndex];
    currentCount = 0;

    exerciseContainer.innerHTML = `
      <h3>${exercise.question}</h3>
      <div id="tile-container">
        <div class="tile" draggable="true" style="background-image: url('assets/images/${exercise.image}')"></div>
      </div>
      <div id="box" class="drop-zone"></div>
    `;

    const tile = document.querySelector(".tile");
    const boxElement = document.getElementById("box");

    tile.addEventListener("dragstart", handleDragStart);
    boxElement.addEventListener("dragover", handleDragOver);
    boxElement.addEventListener("drop", handleDrop);

    checkAnswerButton.style.display = "none";
    skipQuestionButton.style.display = "none";
    showAnswerButton.style.display = "none";
    nextQuestionButton.style.display = "none";

    updateProgressBar();
  }

  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", "tile");
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();

    const exercise = exercises[currentExerciseIndex];
    const box = event.target;

    // ایجاد یک کاشی جدید در داخل زون
    const newTile = document.createElement("div");
    newTile.classList.add("tile");
    newTile.style.backgroundImage = `url('assets/images/${exercise.image}')`;

    // اضافه کردن قابلیت حذف کاشی با کلیک
    newTile.addEventListener("click", () => {
      box.removeChild(newTile);
      currentCount--; // کاهش تعداد کاشی‌های داخل جعبه
      if (currentCount < 1) {
        checkAnswerButton.style.display = "none"; // مخفی کردن دکمه چک کردن پاسخ اگر کاشی‌ها حذف شوند
      }
    });

    box.appendChild(newTile);

    currentCount++;
    attempts++;

    if (currentCount >= 1) {
      checkAnswerButton.style.display = "block";
    }
  }

  checkAnswerButton.addEventListener("click", () => {
    const exercise = exercises[currentExerciseIndex];
    const box = document.getElementById("box");

    if (currentCount === exercise.count) {
      // اضافه کردن هاله سبز به جعبه
      box.classList.add("box-correct");

      feedbackMessage.textContent = "آفرین! پاسخ درست است.";
      feedbackMessage.classList.remove("error");
      feedbackMessage.classList.add("success");
      correctAnswers++;

      // مخفی کردن دکمه‌های غیرضروری
      checkAnswerButton.style.display = "none";
      skipQuestionButton.style.display = "none"; // مخفی کردن دکمه رد کردن سوال
      showAnswerButton.style.display = "none";

      // نمایش دکمه سوال بعد
      nextQuestionButton.style.display = "block";
    } else {
      // اضافه کردن هاله قرمز به جعبه
      box.classList.add("box-incorrect");

      feedbackMessage.textContent = "اشتباه است. دوباره تلاش کن!";
      feedbackMessage.classList.remove("success");
      feedbackMessage.classList.add("error");
      wrongAnswers++;

      // مخفی کردن دکمه چک کردن پاسخ و نمایش دکمه رد کردن سوال
      checkAnswerButton.style.display = "none";
      skipQuestionButton.style.display = "block";

      // حذف هاله قرمز بعد از چند ثانیه
      setTimeout(() => {
        box.classList.remove("box-incorrect");
      }, 1000);
    }
  });

  skipQuestionButton.addEventListener("click", () => {
    skipQuestionButton.style.display = "none";
    showAnswerButton.style.display = "block";
  });

  showAnswerButton.addEventListener("click", () => {
    const exercise = exercises[currentExerciseIndex];
    const box = document.getElementById("box");

    // پاک کردن کاشی‌های موجود در جعبه
    box.innerHTML = "";

    // اضافه کردن تعداد صحیح کاشی‌ها به جعبه
    for (let i = 0; i < exercise.count; i++) {
      const correctTile = document.createElement("div");
      correctTile.classList.add("tile");
      correctTile.style.backgroundImage = `url('assets/images/${exercise.image}')`;
      box.appendChild(correctTile);
    }

    // اضافه کردن هاله سبز به جعبه
    box.classList.add("box-correct");

    feedbackMessage.textContent = `پاسخ درست: ${exercise.count} کاشی باید داخل جعبه قرار می‌گرفت.`;
    feedbackMessage.classList.remove("error");
    feedbackMessage.classList.add("success");

    showAnswerButton.style.display = "none";
    nextQuestionButton.style.display = "block";
  });

  nextQuestionButton.addEventListener("click", () => {
    currentExerciseIndex++;
    loadExercise();
  });

  function updateProgressBar() {
    progressBarContainer.innerHTML = `
      <p>سوال ${currentExerciseIndex + 1} از ${exercises.length}</p>
      <progress value="${currentExerciseIndex}" max="${exercises.length}"></progress>
    `;
  }

  function showResults() {
    exerciseSection.style.display = "none";
    resultsSection.style.display = "block";

    // نمایش تعداد کل سوالات و تعداد سوالات درست
    resultsContainer.innerHTML = `
      <p>تعداد کل سوالات: ${exercises.length}</p>
      <p>تعداد سوالاتی که درست پاسخ داده‌اید: ${correctAnswers}</p>
    `;
  }

  retryButton.addEventListener("click", () => {
    currentExerciseIndex = 0;
    currentCount = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    attempts = 0;

    resultsSection.style.display = "none";
    startSection.style.display = "block";
  });
});