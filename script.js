
let storedNum = 0;
let operator = null;
let currOperatorButton = null;
let shouldClearDisplay = false;

const display = document.querySelector('.display-text');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear-btn');
const decimalButton = document.querySelector('.decimal');
const equalsButton = document.querySelector('.equals');

const DEFAULT_HIGHLIGHT_COLOR = "rgb(182, 182, 182)";
const DEFAULT_BUTTON_COLOR = clearButton.style.backgroundColor;
const DEFAULT_DISPLAY_VALUE = "0";

clearButton.addEventListener('click', clearDisplay);
equalsButton.addEventListener('click', evaluate);

//Appends decimal to display if possible
decimalButton.addEventListener('click', () => {
    if (display.textContent.includes('.')) return;
    appendDisplay(decimalButton.textContent);
});

//Appends numbers to display
numberButtons.forEach( button => {
    button.addEventListener('click', () => {
        appendDisplay(button.textContent);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        evaluate();
        highlightOperator(button);

        let tempNum = Number(display.textContent);
        if(isNaN(tempNum)) {
            alert("ERROR: Current value is not a number");
            return;
        }
        storedNum = tempNum;
        currOperatorButton = button;
        operator = button.textContent;
        
        shouldClearDisplay = true;
    });
})

function appendDisplay(content) {
    if (shouldClearDisplay) {
        shouldClearDisplay = false;
        display.textContent = '';
        if (content == '.') display.textContent+= "0";
    }
    if (display.textContent == '0' && content != '.') {
        display.textContent = '';
    }
    display.textContent += content;
}

function clearDisplay() {
    if(currOperatorButton) unhighlightOperator(currOperatorButton);
    resetValues();
    display.textContent = DEFAULT_DISPLAY_VALUE;
}

function resetValues() {
    storedNum = 0;
    operator = null;
    currOperatorButton = null;
    shouldClearDisplay = false;
}

function evaluate() {
    if (operator == null) return;

    let currNum = Number(display.textContent);
    if (operator == "÷" && currNum == '0') {
        alert("ERROR: Divide By 0");
        return;
    }

    let res = operate(storedNum, currNum, operator);
    unhighlightOperator(currOperatorButton);

    console.log(`${storedNum} ${operator} ${currNum} = ${res}`)
    
    resetValues();
    display.textContent = res;
}

function printHiddenValues() {
    console.log(`storedNum=${storedNum} operator=${operator} currOperatorButton=${currOperatorButton} shouldClearDisplay=${shouldClearDisplay}`);
}

function highlightOperator(button) {
    button.style.backgroundColor = DEFAULT_HIGHLIGHT_COLOR;
}

function unhighlightOperator(button) {
    button.style.backgroundColor = DEFAULT_BUTTON_COLOR;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
  
function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return null;
    }
}
