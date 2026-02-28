const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let firstNumer = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if(value === "C") {
            display.value = "";
            firstNumer = '';
            operator = '';
            return;
        }

        // operator clicked
        if('+-*/'.includes(value)) {
            firstNumer = display.value;
            console.log("Numri i pare".firstNumer);
            operator = value;
            console.log("Operatori".operator);
            display.value = '';
            return;
        }

        if(value === "=") {
            const secondNumber = display.value;
            display.value = calculate(firstNumer, operator, secondNumber);
            return;
        }

        display.value += value;
    });
});

function calculate(a, operator, b) {
    a = Number(a);
    b = Number(b);

    if(operator === '+') return a + b;
    if(operator === '-') return a - b;
    if(operator === '*') return a * b;
    if(operator === '/') {
        if(b === 0) return "Error";
        return a / b;
    }
}