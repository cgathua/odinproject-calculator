import './style.css'

type CalculatorObject = {
    displayValue: string,
    firstValue: any,
    isSecondValueChecked: boolean,
    symbol: any,
};

const calculator: CalculatorObject = {
    displayValue: '0',
    firstValue: null,
    isSecondValueChecked: false,
    symbol: null,
};

function inputDigit(digit: string) {
    const { displayValue, isSecondValueChecked } = calculator;

    if (isSecondValueChecked === true) {
        calculator.displayValue = digit;
        calculator.isSecondValueChecked = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
};

function inputDecimal(dot: string) {
    if (calculator.isSecondValueChecked === true) {
        calculator.displayValue = "0.";
        calculator.isSecondValueChecked = false;
        return
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
};

function handleOperator(nextSymbol: string) {
    const { firstValue, displayValue, symbol } = calculator
    const inputValue = parseFloat(displayValue);

    if (symbol && calculator.isSecondValueChecked) {
        calculator.symbol = nextSymbol;
        return;
    }

    if (firstValue == null && !isNaN(inputValue)) {
        calculator.firstValue = inputValue;
    } else if (symbol) {
        const result = calculate(firstValue, inputValue, symbol);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstValue = result;
    }

    calculator.isSecondValueChecked = true;
    calculator.symbol = nextSymbol;
};

function calculate(firstValue: number, secondValue: number, symbol: string) {
    if (symbol === '+') {
        return firstValue + secondValue;
    } else if (symbol === '-') {
        return firstValue - secondValue;
    } else if (symbol === '*') {
        return firstValue * secondValue;
    } else if (symbol === '/') {
        return firstValue / secondValue;
    }
    return secondValue;
};

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstValue = null;
    calculator.isSecondValueChecked = false;
    calculator.symbol = null;
};

function updateDisplay() {
    const display = document.querySelector('.display_screen') as HTMLInputElement;
    display.value = calculator.displayValue;
};

updateDisplay();

const calculatorKeys = document.querySelector('.calculator_buttons') as HTMLDivElement;
calculatorKeys.addEventListener('click', event => {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    } else if ((value === '+') || (value === '-') || (value === '*') || (value === '/') || (value === '=')) {
        handleOperator(value);
    } else if (value === '.') {
        inputDecimal(value);
    } else if (value === 'clear_btn') {
        resetCalculator();
    } else if ((Number.isInteger(parseFloat(value)))) {
        inputDigit(value);
    }
    updateDisplay()
});

