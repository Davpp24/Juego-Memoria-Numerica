let currentLevel = 1;
let highScore = 0;
let currentNumber = "";
let displayTime = 1000;

const $startScreen = $("#start-screen");
const $gameScreen = $("#game-screen");
const $numberDisplay = $("#number-display");
const $inputScreen = $("#input-screen");
const $resultScreen = $("#result-screen");
const $correctResult = $("#correct-result");
const $incorrectResult = $("#incorrect-result");

const $currentLevelElement = $("#current-level");
const $highScoreElement = $("#high-score");
const $numberElement = $("#number");
const $numberInput = $("#number-input");
const $correctNumberElement = $("#correct-number");
const $finalLevelElement = $("#final-level");

const $startButton = $("#start-btn");
const $submitButton = $("#submit-btn");
const $restartButton = $("#restart-btn");

function init() {
  const savedHighScore = localStorage.getItem("highScore");
  if (savedHighScore) {
    highScore = Number.parseInt(savedHighScore);
    $highScoreElement.text(highScore);
  }

  $startButton.on("click", startGame);
  $submitButton.on("click", checkAnswer);
  $restartButton.on("click", resetGame);

  $numberInput.on("keypress", (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  });
}

function startGame() {
  $startScreen.removeClass("active");
  $gameScreen.addClass("active");
  startLevel();
}

function startLevel() {
  $currentLevelElement.text(currentLevel);

  currentNumber = generateRandomNumber(currentLevel);

  $numberElement.text(currentNumber);

  $inputScreen.removeClass("active");
  $numberDisplay.addClass("active");

  displayTime = 1000 + currentLevel * 300;

  setTimeout(() => {
    $numberDisplay.removeClass("active");
    $numberElement.text("");

    $inputScreen.addClass("active");

    $numberInput.val("");
    $numberInput.focus();
  }, displayTime);
}

function generateRandomNumber(digits) {
  let min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;

  // Para nivel 1, permitir números del 0-9
  if (digits === 1) {
    min = 0;
  }

  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

// Comprobar la respuesta del usuario
function checkAnswer() {
  const userAnswer = $numberInput.val().trim();

  if (userAnswer === currentNumber) {
    // Respuesta correcta
    showCorrectResult();

    // Subir de nivel
    currentLevel++;

    // Actualizar récord si es necesario
    if (currentLevel - 1 > highScore) {
      highScore = currentLevel - 1;
      $highScoreElement.text(highScore);
      localStorage.setItem("highScore", highScore);
    }

    // Preparar el siguiente nivel después de un breve retraso
    setTimeout(() => {
      startLevel();
    }, 1500);
  } else {
    // Respuesta incorrecta
    showIncorrectResult();
  }
}

// Mostrar resultado correcto
function showCorrectResult() {
  showScreen($resultScreen);
  $correctResult.show();
  $incorrectResult.hide();
}

// Mostrar resultado incorrecto
function showIncorrectResult() {
  showScreen($resultScreen);
  $correctResult.hide();
  $incorrectResult.show();

  $correctNumberElement.text(currentNumber);
  $finalLevelElement.text(currentLevel);
}

// Reiniciar el juego
function resetGame() {
  currentLevel = 1;
  showScreen($startScreen);
  $gameScreen.removeClass("active");
}

// Función auxiliar para mostrar una pantalla y ocultar las demás
function showScreen($screenToShow) {
  // Ocultar todas las pantallas
  $(".screen").removeClass("active");

  // Mostrar la pantalla deseada
  $screenToShow.addClass("active");
}

// Inicializar el juego cuando se carga la página
$(document).ready(init);
