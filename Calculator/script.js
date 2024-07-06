const previousOperation = document.querySelector('[data-previous-operation]');
const currentOperation = document.querySelector('[data-current-operation]');
const operations = document.querySelectorAll('[data-operation]');
const numbers = document.querySelectorAll('[data-number]');
const equals = document.querySelector('[data-equals]');
const clear = document.querySelector('[data-clear]');
const del = document.querySelector('[data-del]');

const isFloat = (n) => { return Number(n) === n && n % 1 !== 0}

class Calculator {
    constructor(previousOperation, currentOperation) {
        this.previousOperation = previousOperation;
        this.currentOperation = currentOperation;
        this.clear();
    }

    clear() {
        this.previousOperation = '';
        this.currentOperation = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperation = this.currentOperation.slice(0, -1);    

        if (this.currentOperation === '') {
            this.currentOperation = this.previousOperation;
            this.previousOperation = '';
        }
    }

    append(number) {
        if (number === '.' && this.currentOperation.includes('.')) return;
        if (this.currentOperation === '0' && number === '0') return;
        if (this.currentOperation === '-0' && number === '0') return;
        if (this.previousOperation[0] === '-' && number === '-') return;

        this.currentOperation += number;

        if(this.currentOperation == '.') {
            this.currentOperation = '0' + this.currentOperation;
        } 
        if (this.currentOperation == '-.') {
            this.currentOperation = '-0.';
        }
    }

    chooseOperation(operationSymbol) {
        if (this.currentOperation === '') return;
        if (this.previousOperation !== '') {
            this.compute();
        }

        switch (operationSymbol) {
            case '×':
                this.operation = '*';
                break;
            case '÷':
                this.operation = '/';
                break;
            default:
                this.operation = operationSymbol;
        }

        this.previousOperation = this.currentOperation + this.operation;
        this.currentOperation = '';
    }

    compute() {
        let computation = undefined;
        let prev = parseFloat(this.previousOperation);
        let curr = parseFloat(this.currentOperation);

        if(isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
        }
        
        if(isFloat(computation)) {
            computation = computation.toFixed(1);
        }

        this.currentOperation = computation.toString();
        this.previousOperation = '';
        this.operation = undefined;
    } 

    update() {
        currentOperation.innerText = this.currentOperation;
        previousOperation.innerText = this.previousOperation;
    }
}

const calculator = new Calculator(previousOperation, currentOperation);

numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.append(number.innerText);
        calculator.update();
    })
})

operations.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.chooseOperation(operation.innerText);

        if (operation.innerHTML === '-') {
            calculator.append(operation.innerHTML)
        }

        calculator.update();
    })
})

equals.addEventListener('click', () => {
    calculator.compute();
    calculator.update();
})

clear.addEventListener('click', () => {
    calculator.clear();
    calculator.update();
})

del.addEventListener('click', () => {
    calculator.delete();
    calculator.update();
})
