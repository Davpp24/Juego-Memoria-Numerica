let currentLevel = 1
let highScore = 0
let currentNumber = ""
let displayTime = 1000 


const startScreen = document.getElementById("start-screen")
const gameScreen = document.getElementById("game-screen")
const numberDisplay = document.getElementById("number-display")
const inputScreen = document.getElementById("input-screen")
const resultScreen = document.getElementById("result-screen")
const correctResult = document.getElementById("correct-result")
const incorrectResult = document.getElementById("incorrect-result")

const currentLevelElement = document.getElementById("current-level")
const highScoreElement = document.getElementById("high-score")
const numberElement = document.getElementById("number")
const numberInput = document.getElementById("number-input")
const correctNumberElement = document.getElementById("correct-number")
const finalLevelElement = document.getElementById("final-level")

const startButton = document.getElementById("start-btn")
const submitButton = document.getElementById("submit-btn")
const restartButton = document.getElementById("restart-btn")


function init() {

  const savedHighScore = localStorage.getItem("highScore")
  if (savedHighScore) {
    highScore = Number.parseInt(savedHighScore)
    highScoreElement.textContent = highScore
  }


  startButton.addEventListener("click", startGame)
  submitButton.addEventListener("click", checkAnswer)
  restartButton.addEventListener("click", resetGame)


  numberInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      checkAnswer()
    }
  })
}


function startGame() {
  startScreen.classList.remove("active")
  gameScreen.classList.add("active")
  startLevel()
}


function startLevel() {
 
  currentLevelElement.textContent = currentLevel


  currentNumber = generateRandomNumber(currentLevel)


  numberElement.textContent = currentNumber

  inputScreen.classList.remove("active")
  numberDisplay.classList.add("active")


  displayTime = 1000 + currentLevel * 300

  setTimeout(() => {
    numberDisplay.classList.remove("active")
    numberElement.textContent = ""

    inputScreen.classList.add("active")


    numberInput.value = ""
    numberInput.focus()
  }, displayTime)
}

function generateRandomNumber(digits) {
  let min = Math.pow(10, digits - 1)
  const max = Math.pow(10, digits) - 1

  // Para nivel 1, permitir números del 0-9
  if (digits === 1) {
    min = 0
  }

  return Math.floor(Math.random() * (max - min + 1) + min).toString()
}

// Comprobar la respuesta del usuario
function checkAnswer() {
  const userAnswer = numberInput.value.trim()

  if (userAnswer === currentNumber) {
    // Respuesta correcta
    showCorrectResult()

    // Subir de nivel
    currentLevel++

    // Actualizar récord si es necesario
    if (currentLevel - 1 > highScore) {
      highScore = currentLevel - 1
      highScoreElement.textContent = highScore
      localStorage.setItem("highScore", highScore)
    }

    // Preparar el siguiente nivel después de un breve retraso
    setTimeout(() => {
      startLevel()
    }, 1500)
  } else {
    // Respuesta incorrecta
    showIncorrectResult()
  }
}

// Mostrar resultado correcto
function showCorrectResult() {
  showScreen(resultScreen)
  correctResult.style.display = "block"
  incorrectResult.style.display = "none"
}

// Mostrar resultado incorrecto
function showIncorrectResult() {
  showScreen(resultScreen)
  correctResult.style.display = "none"
  incorrectResult.style.display = "block"

  correctNumberElement.textContent = currentNumber
  finalLevelElement.textContent = currentLevel
}

// Reiniciar el juego
function resetGame() {
  currentLevel = 1
  showScreen(startScreen)
  gameScreen.classList.remove("active")
}

// Función auxiliar para mostrar una pantalla y ocultar las demás
function showScreen(screenToShow) {
  // Ocultar todas las pantallas
  const screens = document.querySelectorAll(".screen")
  screens.forEach((screen) => {
    screen.classList.remove("active")
  })

  // Mostrar la pantalla deseada
  screenToShow.classList.add("active")
}

// Inicializar el juego cuando se carga la página
document.addEventListener("DOMContentLoaded", init)

