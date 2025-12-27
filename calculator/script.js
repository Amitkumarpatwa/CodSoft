// Core variables
let displayValue = "0";
let previousValue = "";
let currentOp = null;
let shouldReset = false;

const currentOutput = document.getElementById("current-output");
const prevOutput = document.getElementById("prev-output");
const allButtons = document.querySelectorAll(".button");

function updateOutput() {
  currentOutput.textContent = displayValue;
  prevOutput.textContent = previousValue;
}

function inputNumber(num) {
  if (shouldReset) {
    displayValue = "";
    shouldReset = false;
  }

  if (num === "." && displayValue.includes(".")) return;

  if (displayValue === "0" && num !== ".") {
    displayValue = num;
  } else {
    displayValue += num;
  }
  updateOutput();
}

function resetAll() {
  displayValue = "0";
  previousValue = "";
  currentOp = null;
  shouldReset = false;
  updateOutput();
}

function removeLast() {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = "0";
  }
  updateOutput();
}

function selectOp(op) {
  if (currentOp !== null && !shouldReset) {
    computeResult();
  }
  currentOp = op;
  previousValue = displayValue + " " + op;
  shouldReset = true;
  updateOutput();
}
function computeResult() {
  if (currentOp === null || shouldReset) return;

  const oldVal = parseFloat(previousValue);
  const newVal = parseFloat(displayValue);

  if (isNaN(oldVal) || isNaN(newVal)) return;

  let outcome;
  switch (currentOp) {
    case "+":
      outcome = oldVal + newVal;
      break;
    case "-":
      outcome = oldVal - newVal;
      break;
    case "×":
      outcome = oldVal * newVal;
      break;
    case "÷":
      outcome = oldVal / newVal;
      break;
    default:
      return;
  }

  displayValue = outcome.toString();
  previousValue = "";
  currentOp = null;
  shouldReset = true;
  updateOutput();
}

// Button events
allButtons.forEach((element) => {
  element.addEventListener("click", () => {
    const number = element.getAttribute("data-num");
    const func = element.getAttribute("data-func");
    const cmd = element.getAttribute("data-cmd");

    if (number !== null) {
      inputNumber(number);
    } else if (func !== null) {
      selectOp(func);
    } else if (cmd === "clear") {
      resetAll();
    } else if (cmd === "del") {
      removeLast();
    } else if (cmd === "calc") {
      computeResult();
    }
  });
});

// Key events
document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") inputNumber(event.key);
  if (event.key === ".") inputNumber(".");
  if (event.key === "+") selectOp("+");
  if (event.key === "-") selectOp("−");
  if (event.key === "*") selectOp("×");
  if (event.key === "/") {
    event.preventDefault();
    selectOp("÷");
  }
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    computeResult();
  }
  if (event.key === "Escape") resetAll();
  if (event.key === "Backspace" || event.key === "Delete") removeLast();
});

// Start up
updateOutput();
