function startQuiz() {
  const name = document.getElementById("nameInput").value.trim();

  if (name === "") {
    document.getElementById("error").innerText = "Please enter your name.";
    return;
  }

  document.getElementById("error").innerText = "";
  document.getElementById("welcome").innerText = `Hello ${name}`;
  document.getElementById("msg").innerText = "Let's start the quiz!";
  okBtn.style.display = "inline-block";
}
const card = document.querySelector(".card");
const questionBox = document.getElementById("questionBox");
const okBtn = document.getElementById("okBtn");
okBtn.addEventListener("click", showQuestion);
function showQuestion() {
  card.style.display = "none";
  questionBox.style.display = "block";
  loadQuestion();
  startTimer();
}

const questions = [
  {
    question: "1. What HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "Hyper Transfer Markup Language",
      "Home Tool Maker Language",
      "Hyperlink and Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },

  {
    question: "2. Which language is used for styling?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "CSS",
  },

  {
    question: "3. Which language adds functionality?",
    options: ["CSS", "C", "JavaScript", "SQL"],
    answer: "JavaScript",
  },
  {
    question: "4. Which is a void element?",
    options: ["<div>", "<p>", "<span>", "<img>"],
    answer: "<img>",
  },
  {
    question: "5. What is the output of console.log(typeof null)?",
    options: ["object", "undefined", "null", "boolean"],
    answer: "object",
  },
  {
    question: "6. What is the difference between var and let?",
    options: [
      "No difference",
      "var is block scoped",
      "let is block scoped",
      "both are global",
    ],
    answer: "let is block scoped",
  },
  {
    question: "7. Flexbox is mainly used for:",
    options: ["2D layout", "1D layout", "animations", "colors"],
    answer: "1D layout",
  },
  {
    question: "8. Which symbol is used for class selector in CSS?",
    options: ["#", "$", "@", "."],
    answer: ".",
  },
  {
    question: "9. Which property controls space inside an element in CSS?",
    options: ["margin", "padding", "border", "gap"],
    answer: "padding",
  },
  {
    question: '10. What is the output of console.log(2 + "2")?',
    options: ["4", '"22"', "NaN", "undefined"],
    answer: '"22"',
  },
];
let score = 0;
let userAnswers = new Array(questions.length).fill(null);
let timeLeft = 60;
let currentQuestion = 0;
const timer = document.getElementById("timer");
const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const PrevBtn = document.getElementById("PrevBtn");
const NextBtn = document.getElementById("NextBtn");
function loadQuestion() {
  question.innerText = questions[currentQuestion].question;
  PrevBtn.disabled = currentQuestion === 0;
  NextBtn.innerText =
    currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next";
  options.forEach(function (option, index) {
    option.innerText = questions[currentQuestion].options[index];
    option.disabled = false;
    option.style.border = "";
  });
}

let interval;
function startTimer() {
  timer.style.color = "black";
  interval = setInterval(() => {
    timer.innerText = `🕒Time Left: ${timeLeft} seconds`;
    if (timeLeft <= 10) {
      document.getElementById("timer").style.color = "red";
    }
    if (timeLeft === 0) {
      clearInterval(interval);
      questionBox.style.display = "none";
      resultBox.style.display = "block";
      score = 0;

      userAnswers.forEach(function (answer, index) {
        if (answer === questions[index].answer) {
          score++;
        }
      });

      finalScore.innerHTML = `🕒 Time's Up!<br>Your Final Score: ${score}/${questions.length}`;
      return;
    }
    timeLeft--;
  }, 1000);
}
options.forEach(function (option) {
  option.addEventListener("click", checkAnswer);
});
function checkAnswer() {
  const selectedAnswer = this.innerText;

  userAnswers[currentQuestion] = selectedAnswer;

  options.forEach(function (option) {
    option.disabled = true;
    option.style.border = "";
  });

  if (selectedAnswer === questions[currentQuestion].answer) {
    this.style.border = "2px solid green";
  } else {
    this.style.border = "2px solid red";

    options.forEach(function (option) {
      if (option.innerText === questions[currentQuestion].answer) {
        option.style.border = "2px solid green";
      }
    });
  }
}
PrevBtn.addEventListener("click", showPrevQuestion);
function showPrevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}
const resultBox = document.getElementById("resultBox");
const finalScore = document.getElementById("finalScore");
NextBtn.addEventListener("click", showNextQuestion);
function showNextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    clearInterval(interval);
    questionBox.style.display = "none";
    resultBox.style.display = "block";
    score = 0;

    userAnswers.forEach(function (answer, index) {
      if (answer === questions[index].answer) {
        score++;
      }
    });

    finalScore.innerText = `Congrats! Your Final Score: ${score}/${questions.length}`;
  }
}
