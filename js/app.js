const inputs = document.querySelectorAll("input[type=number]");
const numberButtons = document.querySelectorAll("#btnNumbers button");
const btnPlayAgain = document.getElementById("again");
const btnReset = document.getElementById("reset");
const screenNOG = document.getElementById("nog");
const screenTIN = document.getElementById("tim");

let currentInput = null;
let number = null;
let numberOfGuesses = 0;
let numberOfCorrectGuesses = 0;
let time = 60;
let timer;
let lockGame = false;

document.addEventListener("keydown", typed);
window.addEventListener("click", typed);
btnReset.addEventListener("click", reset);
btnPlayAgain.addEventListener("click", () => {
  location.reload();
});

function createNumber() {
  number = "" + getRandomNumber(1, 10);
  let num = 0;
  while (1) {
    num = getRandomNumber(1, 10);
    if (number.length == 4) break;
    if (number.search(num) != -1) continue;

    number += num;
  }
  console.log(number);
}
createNumber();

function typed(e) {
  if (e.keyCode == 8) {
    deleteValueInput();
  }
  if (e.keyCode >= 49 && e.keyCode < 58) {
    insertIntoInput(String.fromCharCode(e.keyCode));
  }
  if (e.keyCode >= 97 && e.keyCode < 106) {
    alert("To enter the number, you must use the numbers on the keyboard");
  }
}

numberButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    insertIntoInput(index + 1);
  });
});

function inputSelection() {
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      inputs[i].select();
      currentInput = inputs[i];
      break;
    }
  }
}

function insertIntoInput(num) {
  if (lockGame) return;

  inputSelection();
  if (currentInput.value == "") currentInput.value = num;
  if (inputs[inputs.length - 1].value != "") {
    checked();
  }
}

function deleteValueInput() {
  if (lockGame) return;
  for (let i = inputs.length - 1; i >= 0; i--) {
    if (inputs[i].value) {
      inputs[i].select();
      inputs[i].value = "";
      currentInput = inputs[i];
      break;
    }
  }
}

function checked() {
  lockGame = true;
  inputs.forEach((input, index) => {
    if (!input.value) return;
    if (number.search(input.value) == -1) {
      input.setAttribute("class", "inp1");
    } else if (number.indexOf(input.value) != index) {
      input.setAttribute("class", "inp2");
    } else {
      input.setAttribute("class", "inp3");
      numberOfCorrectGuesses++;
    }
  });
  numberOfGuesses++;
  if (numberOfCorrectGuesses != 4 && time != 0 && numberOfGuesses < 6) {
    btnReset.style.display = "block";
    screenNOG.textContent = numberOfGuesses;
    return;
  }

  if (numberOfCorrectGuesses == 4) {
    btnPlayAgain.textContent = "You Win! Play Again";
  } else {
    btnPlayAgain.textContent = "You Loss! Play Again";
  }

  clearInterval("timer");
  btnPlayAgain.style.display = "block";
}

function reset() {
  lockGame = false;
  numberOfCorrectGuesses = 0;

  inputs.forEach((input) => {
    input.removeAttribute("class");
    input.value = "";
  });
  btnReset.style.display = "none";
}

function handleTimer() {
  timer = setInterval(() => {
    if (!time) {
      clearInterval("timer");
      checked();
      return;
    }

    time--;
    screenTIN.textContent = "00:" + (time < 10 ? "0" + time : time);
  }, 1000);
}
handleTimer();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
