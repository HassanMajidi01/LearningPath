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
    { question: "۷  گربه را داخل جعبه بگذار.", count: 7, image: "cat.png" },
    { question: "۳  سگ  را داخل جعبه بگذار.", count: 3, image: "dog.png" },
    { question: "۸  خرگوش  را داخل جعبه بگذار.", count: 8, image: "rabbit.png" },
    { question: "۶  پرنده  را داخل جعبه بگذار.", count: 6, image: "bird.png" },
    { question: "۵  ماهی  را داخل جعبه بگذار.", count: 5, image: "fish.png" },
    { question: "۹  اسب  را داخل جعبه بگذار.", count: 9, image: "horse.png" },
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
  
//تمرین شمردن به ترتیب و پر کردن جا خالی
  const newGameStartButton = document.getElementById("new-game-start-button");
  const newExerciseSection = document.getElementById("new-exercise-section");
  const newExerciseContainer = document.getElementById("new-exercise-container");
  const newFeedbackMessage = document.getElementById("new-feedback-message");
  const newCheckAnswerButton = document.getElementById("new-check-answer");
  const newShowAnswerButton = document.createElement("button"); // دکمه نمایش پاسخ درست
  const newNextQuestionButton = document.createElement("button"); // دکمه رد کردن سوال

  newShowAnswerButton.id = "new-show-answer";
  newShowAnswerButton.textContent = "نمایش پاسخ درست";
  newShowAnswerButton.style.display = "none";
  newExerciseSection.appendChild(newShowAnswerButton);

  newNextQuestionButton.id = "new-skip-question";
  newNextQuestionButton.textContent = "رد کردن سوال";
  newNextQuestionButton.style.display = "none";
  newExerciseSection.appendChild(newNextQuestionButton);

  const newQuestions = [
    {
      animals: ["cat.png", "cat.png", "cat.png", "cat.png", "cat.png"],
      numbers: ["5", "4", null, "2", "1"],
      correctAnswer: "3",
    },
    {
      animals: ["dog.png", "dog.png", "dog.png", "dog.png", "dog.png", "dog.png"],
      numbers: ["10", null, "8", "7", "6", "5"],
      correctAnswer: "9",
    },
    {
      animals: ["rabbit.png", "rabbit.png", "rabbit.png", "rabbit.png"],
      numbers: ["9", "8", null, "6"],
      correctAnswer: "7",
    },
  ];

  let currentNewQuestionIndex = 0;

  function loadNewQuestion() {
    const currentQuestion = newQuestions[currentNewQuestionIndex];
    newExerciseContainer.innerHTML = "";

    // ایجاد ردیف حیوانات
    const animalRow = document.createElement("div");
    animalRow.classList.add("animal-row");
    currentQuestion.animals.forEach((animal) => {
      const img = document.createElement("img");
      img.src = `assets/images/${animal}`;
      img.alt = "Animal";
      img.style.width = "50px";
      img.style.height = "50px";
      animalRow.appendChild(img);
    });
    newExerciseContainer.appendChild(animalRow);

    // ایجاد ردیف اعداد
    const numberRow = document.createElement("div");
    numberRow.classList.add("number-row");
    currentQuestion.numbers.forEach((number, index) => {
      if (number === null) {
        const input = document.createElement("input");
        input.type = "number";
        input.id = `number-input-${index}`;
        input.style.direction = "rtl"; // اعداد به ترتیب از راست به چپ
        numberRow.appendChild(input);
      } else {
        const span = document.createElement("span");
        span.textContent = number;
        span.style.direction = "rtl"; // اعداد فارسی
        numberRow.appendChild(span);
      }
    });
    newExerciseContainer.appendChild(numberRow);

    newFeedbackMessage.textContent = "";
    newCheckAnswerButton.style.display = "inline-block";
    newShowAnswerButton.style.display = "none";
    newNextQuestionButton.style.display = "none";
  }

  function checkNewAnswer() {
    const currentQuestion = newQuestions[currentNewQuestionIndex];
    const userAnswer = document.querySelector("input[type='number']").value;

    if (!userAnswer) {
      newFeedbackMessage.textContent = "لطفاً یک عدد وارد کنید.";
      newFeedbackMessage.style.color = "red";
      return;
    }

    if (userAnswer === currentQuestion.correctAnswer) {
      newFeedbackMessage.textContent = "آفرین! پاسخ صحیح است.";
      newFeedbackMessage.style.color = "green";
      newCheckAnswerButton.style.display = "none";
      newNextQuestionButton.style.display = "inline-block";
    } else {
      newFeedbackMessage.textContent = "اشتباه است! دوباره تلاش کنید.";
      newFeedbackMessage.style.color = "red";
      newShowAnswerButton.style.display = "inline-block"; // نمایش دکمه نمایش پاسخ درست
    }
  }

  function showCorrectAnswer() {
    const currentQuestion = newQuestions[currentNewQuestionIndex];
    const inputField = document.querySelector("input[type='number']");
    inputField.value = currentQuestion.correctAnswer; // نمایش پاسخ درست
    inputField.disabled = true; // غیرفعال کردن ورودی

    newFeedbackMessage.textContent = `پاسخ درست: ${currentQuestion.correctAnswer}`;
    newFeedbackMessage.style.color = "green";

    newCheckAnswerButton.style.display = "none"; // مخفی کردن دکمه چک کردن پاسخ
    newShowAnswerButton.style.display = "none"; // مخفی کردن دکمه نمایش پاسخ درست
    newNextQuestionButton.style.display = "inline-block"; // نمایش دکمه رد کردن سوال
  }

  function nextNewQuestion() {
    currentNewQuestionIndex++;
    if (currentNewQuestionIndex >= newQuestions.length) {
      newFeedbackMessage.textContent = "تبریک! همه سوالات را پاسخ دادید.";
      newFeedbackMessage.style.color = "green";
      newCheckAnswerButton.style.display = "none";
      newShowAnswerButton.style.display = "none";
      newNextQuestionButton.style.display = "none";
    } else {
      loadNewQuestion();
    }
  }

  newGameStartButton.addEventListener("click", () => {
    newGameStartButton.style.display = "none";
    newExerciseSection.style.display = "block";
    loadNewQuestion();
  });

  newCheckAnswerButton.addEventListener("click", checkNewAnswer);
  newShowAnswerButton.addEventListener("click", showCorrectAnswer);
  newNextQuestionButton.addEventListener("click", nextNewQuestion);
});