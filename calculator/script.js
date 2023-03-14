let currentValue = 0;
let result = undefined;
let operator = undefined;

function formValue(input) {
    if(input === '.') {
        if(alreadyHasDot(currentValue)) return;
        if(firstSymbolIsDot(currentValue)) currentValue = 0;
    } else {
        if(currentValue === 0) currentValue = '';
        if(currentValue == 0 && input == 0) return;
    }
    currentValue = currentValue + input;
    updateDOM(currentValue);
}

function alreadyHasDot(currentValue) {
    return currentValue.toString().split('').some((item) => item === '.')
}

function firstSymbolIsDot(currentValue) {
    return !currentValue.toString()[0]
}

function update(newOperator) {
    updateOperator(newOperator);
    updateResult();
    updateDOM(result);
    console.log(currentValue, result)
    currentValue = '';
}

function sumUp() {
    updateResult();
    updateDOM(result);
    console.log(currentValue, result)
    operator = undefined;
    currentValue = '';
}   

function updateResult() {
    if(!currentValue) return;
    result = result===undefined ? Number(currentValue) : calculate();
}

function updateOperator(newOperator) {
    if(!newOperator) return;
    operator = newOperator;
}


function setDefault() {
    operator = undefined;
    result = undefined;
    currentValue = '';
    updateDOM();
}

function updateDOM(value) {
    if(value === undefined) value = 0;
    document.querySelector('.calculator-display h1').textContent = value;
}

function calculate() {
    currentValue = Number(currentValue);
    switch(operator) {
        case "+":
            return strip(result + currentValue);
        case "-":
            return strip(result - currentValue);
        case "*":
            return strip(result * currentValue);
        case "/":
            return strip(result / currentValue);
        default:
            throw Error('Invalid operator')
    }
}

function strip(number) {
    return (parseFloat(number.toPrecision(12)));
}