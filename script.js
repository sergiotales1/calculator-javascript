const display = document.querySelector(".calculator-display");
const keys = document.querySelectorAll(".calculator-key");
const modal = document.querySelector(".calculator-error-modal");
let dotAvailable = true;

const operators = ".+-=*/()";

function init() {
  for (let index = 0; index < keys.length; index++) {
    keys[index].addEventListener("click", handleClick);
  }
}
init();

function handleClick(e) {
  let userChoice = "";
  // Bring to us the last character to avoid repeating
  let lastItem = display.innerHTML.charAt(display.innerHTML.length - 1);
  if (e.target.value === "ac") {
    display.innerHTML = "0";
    return;
  }
  if (
    e.target.value === "backspace" ||
    e.target.dataset.value === "backspace"
  ) {
    let eraseLast = display.innerHTML.slice(0, display.innerHTML.length - 1);
    display.innerHTML = eraseLast;
    dotAvailable = true;
    return;
  } // Handle the click into =
  if (e.target.value === "=") {
    dotAvailable = true;
    calculate();
    return;
  }
  userChoice = actionOrNumber(e.target.value, lastItem);
  if (display.innerHTML.length >= 16) {
    modal.classList.add("show-modal");
    modal.innerHTML = "Max digits limit!<br> Please remove some!";
    setTimeout(() => {
      modal.classList.remove("show-modal");
    }, 4000);
    return; // If the lenght is >= 10 returns (max lenght)
  }
  // Initialize everything, if the innerHTML is 0 and the value is number we
  // erase the 0 placeholder and display the number
  if (display.innerHTML === "0" && typeof userChoice === "number") {
    display.innerHTML = "";
    // If the typeof is string we keep the 0 placeholder
  } else if (
    display.innerHTML === "0" &&
    typeof userChoice === "string" &&
    userChoice !== "."
  ) {
    display.innerHTML = "0";
    return;
  }
  // Dot logic - if dot is not available we change userChoice back to ""
  if (userChoice === "." && !dotAvailable) userChoice = "";
  // If dot is available we let userChoice receive "." but we toggle the dot
  if (userChoice === ".") {
    dotAvailable = false;
  }
  // If userChoice is a string and different from "." dot available toggle to
  // true so we can use it again
  if (typeof userChoice === "string" && e.target.value !== ".") {
    dotAvailable = true;
  }

  display.innerHTML += userChoice;
}

function calculate() {
  // Checks if the last value is a string, if so returns
  try {
    // Do the math then returns
    let numbers = eval(display.innerHTML);
    display.innerHTML = numbers;
  } catch (error) {
    modal.classList.add("show-modal");
    setTimeout(() => {
      modal.classList.remove("show-modal");
    }, 5000);
    return;
  }
}

function actionOrNumber(userEntry, lastItem) {
  let value = "";
  if (operators.includes(userEntry)) {
    if (
      operators.includes(lastItem) &&
      userEntry !== "." &&
      userEntry !== "(" &&
      userEntry !== ")"
    ) {
      display.innerHTML =
        display.innerHTML.slice(0, display.innerHTML.length - 1) + userEntry;
      value = "";
    } else {
      value = userEntry;
    }
  } else {
    value = parseInt(userEntry);
  }
  return value;
}
