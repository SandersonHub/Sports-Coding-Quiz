
const quizQuestions = [
    {
      question: "Question 1: Who won the Stanley Cup in 2011?",
      choices: ["Devils", "Sharks", "Bruins", "Red Wings"],
      correctAnswer: "Bruins"
    },
    {
      question: "Question 2: Who won the 2004 World Series?",
      choices: ["RedSox", "Yankees", "Chiefs", "Steelers"],
      correctAnswer: "RedSox"
    },
    {
      question: "Question 3: Who won the Superbowl in 2014?",
      choices: ["Patriots", "Seahawks", "Steelers", "Giants" ],
      correctAnswer: "Patriots"
    }
 
  ];
  
  let currentQuestionIndex = 0;
  let time = 60;
  let timerId;
  let highScores = [];
  
  // these const are calling the HTML tags
  
  const startBtn = document.getElementById("start-btn");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const timeElement = document.getElementById("time");
  const gameOverElement = document.getElementById("game-over");
  const initialsInput = document.getElementById("initials");
  const scoreForm = document.getElementById("score-form");
  const scoresListElement = document.getElementById("scores-list");
  const highScoresElement = document.getElementById("high-scores");
  
  startBtn.addEventListener("click", startQuiz);
  scoreForm.addEventListener("submit", saveScore);
  
  function startQuiz() {
    startBtn.disabled = true;
    timerId = setInterval(updateTimer, 1000);
  
    displayQuestion();
  }
  
  function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
  
    currentQuestion.choices.forEach(function (choice) {
      const Item = document.createElement("li");
      Item.textContent = choice;
      Item.addEventListener("click", checkAnswer);
      Item.classList.add("answer-choice"); 
      choicesElement.appendChild(Item);
    });
  }
  
  function checkAnswer(event) {
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.textContent;
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    if (selectedAnswer === currentQuestion.correctAnswer) {
      // Correct answer
      currentQuestionIndex++;
      if (currentQuestionIndex === quizQuestions.length) {
        endQuiz();
      } else {
        displayQuestion();
      }
    } else {
      // When the anwser isn't correct, this will if will remove 10 seconds from the timer.
      time -= 10; // subs 10 seconds
      if (time < 0) { // if time is less then then 0, time = 0 end game
        time = 0;
      }
      currentQuestionIndex++; // if all else fails end the game or display another questiono
      if (currentQuestionIndex === quizQuestions.length) {
        endQuiz();
      } else {
        displayQuestion();
      }
    }
  }
  
  function updateTimer() { // if the timer = 0 end the game
    time--;
    if (time <= 0) {
      time = 0;
      endQuiz(); // end quiz here
    }
    timeElement.textContent = time;
  }
  
  function endQuiz() { //this function is calling for all content that is needed for the end game screen.
    clearInterval(timerId);
    questionElement.textContent = "";
    choicesElement.innerHTML = "";
    timeElement.textContent = "0";
    gameOverElement.style.display = "block";
    highScoresElement.style.display = "block";
    displayHighScores(); // calls to display the high scores
  }
  
  function saveScore(event) { 
    event.preventDefault(); // stops the loop
    const initials = initialsInput.value;
    const score = time;
  
    const scoreEntry = { initials, score }; //high scores 
    highScores.push(scoreEntry);
  
    // Displays high scores
    displayHighScores();
  }
  
  function displayHighScores() {
    scoresListElement.innerHTML = "";
  
    for (let i = 0; i < highScores.length; i++) {
      const scoreEntry = highScores[i];
      const scoreItem = document.createElement("li");
      scoreItem.textContent = `${scoreEntry.initials}: ${scoreEntry.score}`;
      scoresListElement.appendChild(scoreItem);
    }
  }
  