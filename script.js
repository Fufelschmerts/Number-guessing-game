// import createConfetti from "./confetti.mjs";
// создадим необходимые переменные

//переменная со случайным числом от 1 до 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// переменные для хранения ссылок на результирующих абзацы
let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let lowOrHi = document.querySelector(".lowOrHi");

// здесь храним ссылки на форму ввода и кнопку отправки
let guessField = document.querySelector(".guessField");
let guessSubmit = document.querySelector(".guessSubmit");

let guessCount = 1;
let resetButton;

function checkGuess() {
  let userGuess = Number(guessField.value); // устанавливаем переменную с текущим введенным значением поля guessField
  if (guessCount === 1) {
    // проверяем является ли попытка первой у игрока
    guesses.textContent = "Previous guesses: "; // если true, то выводим параграф
  }
  guesses.textContent += userGuess + " "; // добавляем текущее введенное значение с отступом в конец параграфа

  if (userGuess === randomNumber) {
    // проверка угадывания рандомного числа
    createConfetti();
    lastResult.textContent = `${userGuess}! Congratulations! You got it right!`; // доавляем поздравление
    lastResult.style.backgroundColor = "green"; // с зеленым фоном
    lowOrHi.textContent = ""; // очищаем информационное поле с подсказками
    setGameOver(); // запускаем функцию для начало новой игры
  } else if (guessCount === 10) {
    // проверяем на последнюю попытку
    lowOrHi.textContent = "";
    lastResult.textContent = "!!!GAME OVER!!!"; // выводим сообщение о конце игры
    setGameOver();
  } else {
    // если предыдущие условия ложны (игра продолжается)
    lastResult.textContent = "Wrong!"; // выводим предупреждение
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      // если меньше рандомного выводим
      lowOrHi.textContent = "Too Low!"; // это
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Too High!"; // иначе это
    }
  }
  guessCount++; // добавляем израсходованную попутку в счетчик
  guessField.value = ""; // очищаем текстовое поле
  guessField.focus(); // и фокусируемся на нем.
}

guessSubmit.addEventListener("click", checkGuess); // по клику запускаем главную функцию

// создаем функцию с кнопкой перезагрузки игры
function setGameOver() {
  guessField.disabled = true; // отключаем поле ввода и кнопку
  guessSubmit.disabled = true;
  resetButton = document.createElement("button"); // генерируем новую кнопку
  resetButton.textContent = "Start new game"; // присваеваем ей текст
  document.body.appendChild(resetButton); // добавляем её в тело документа
  resetButton.addEventListener("click", resetGame); // по клику на новую кнопку запускаем функцию ресета
}

// функция для сброса игры на начальные настройки
function resetGame() {
  guessCount = 1;
  // очищаем блок с параметрами
  let resetParas = document.querySelectorAll(".resultParas p");
  for (var i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
    resetParas[i].style.backgroundColor = "white";
  }

  // Удаляем кнопку сброса из нашего кода
  resetButton.parentNode.removeChild(resetButton);

  //Включаем элементы формы, устанавливаем фокус, делаем поле доступным для следующих угадываний.
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  // Удаляем цвет фона из абзаца lastResult.
  lastResult.style.backgroundColor = "white";

  // генерируем новое число
  let randomNumber = Math.floor(Math.random() * 100) + 1;
}

// конфетти!!

function createConfetti() {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]; // Массив цветов конфетти

  const confettiContainer = document.querySelector(".resultParas");

  // Создание конфетти элементов и добавление их в контейнер
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("p");
    confetti.classList.add("confetti");
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = Math.random() * 100 + "vh"; // Добавлено: случайная позиция по вертикали
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.opacity = Math.random() + 0.5;
    confettiContainer.appendChild(confetti);

    // Добавляем класс "show" с задержкой для запуска плавного появления
    setTimeout(function () {
      confetti.classList.add("show");
    }, i * 50); // Увеличьте значение 50, чтобы увеличить задержку между появлением каждого элемента
  }
}
