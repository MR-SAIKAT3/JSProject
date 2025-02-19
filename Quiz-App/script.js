document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionTextDisplay = document.getElementById("question-text");
  const choicesListDisplay = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const marksDisplay = document.getElementById("marks");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      mark: 30,
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
      mark: 34,
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
      mark: 36,
    },
  ];

  let currentIndex = 0;
  let score = 0;
  let marks = 0;

  startBtn.addEventListener("click", startQuiz);

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    questionTextDisplay.textContent = questions[currentIndex].question;
    choicesListDisplay.innerHTML = "";
    questions[currentIndex].choices.forEach((choice) => {
      let li = document.createElement("li");
      li.classList.add("option");
      li.textContent = choice;
      choicesListDisplay.appendChild(li);
      li.addEventListener("click", () => {
        document
          .querySelectorAll(".option")
          .forEach((opp) => opp.classList.remove("choice"));
        li.classList.add("choice");
        selectAnswer(choice);
      });
    });
  }

  function selectAnswer(choice) {
    let answer = questions[currentIndex].answer;
    if (answer === choice) {
      score++;
      claculateMarks();
    }
    setTimeout(nextQuestion, 500);
  }

  function claculateMarks() {
    let mark = questions[currentIndex].mark;
    marks += mark;
  }

  function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
    marksDisplay.textContent = `Marks: ${marks}/100`;
  }

  restartBtn.addEventListener("click", restartQuiz);

  function restartQuiz() {
    currentIndex = 0;
    score = 0;
    marks = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  }
});
