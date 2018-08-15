const numberButtons = [...document.querySelectorAll('.row li .number')],
operatorButtons = [...document.querySelectorAll('.row li .operator')],
calcDisplay = document.querySelector('.display .value'),
clearButton = document.querySelector('#AC'),
plusMinus = document.querySelector('#plus-minus'),
percentage = document.querySelector('#percentage'),
divide = document.querySelector('#divide'),
multiply = document.querySelector('#multiply'),
subtract = document.querySelector('#subtract'),
add = document.querySelector('#add'),
equals = document.querySelector('#equals');
let currentValue = 0,
lastValue,
result,
selectedOperator;

function clearLogic() {
    calcDisplay.innerHTML = '0';
    clearButton.innerHTML = 'AC';

    if (currentValue === '' && calcDisplay.innerHTML === '0' || '0.') {
        currentValue = '';
        lastValue = '';
        selectedOperator = '';
        result = '';
        
        operatorButtons.map(button => {
            if (button.className === 'operator active') {
                button.classList.remove('active');
            }
        });
    }

    if (selectedOperator !== '') {
        calcDisplay.innerHTML = '0';
        currentValue = '';
        
        operatorButtons.map(button => {
            if (button.dataset.symbol===selectedOperator) {
                button.classList.add('active');
            }

            result !== undefined ? button.classList.remove('active') : '';
        });
    } 
}

function numberWithCommas(num) {
    // Function to add commas
    const number = num.toString().replace(/,/g, '');
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayEntry(e) {
    // Changes initial zero to selected number, changes AC button to display C
    if (calcDisplay.innerHTML==='0') {
        clearButton.innerHTML === 'AC' ? clearButton.innerHTML = 'C' : '';
        calcDisplay.innerHTML = this.textContent;  

        // keeps starting zero for values < 1
        this.textContent === '.' ? calcDisplay.innerHTML = "0." : '';
    }
    // Limits length to 11 character
    else if (calcDisplay.innerHTML.length===11) {
        return;
    } 
    // Adds commas to the entry
    else if (calcDisplay !== '0' && !calcDisplay.innerHTML.includes('.')) {
        const number = `${calcDisplay.textContent}${this.textContent}`;
        calcDisplay.innerHTML = numberWithCommas(number);
    }
    // Curtails commas after decimal has been entered
    else if (calcDisplay.innerHTML.includes('.')) {
        if (this.innerHTML === '.') {
            return;
        }
        calcDisplay.innerHTML = `${calcDisplay.textContent}${this.textContent}`;
    }
    // Replaces number on display after having selected an operator
    operatorButtons.forEach(button => {
        const isActive = button.className==='operator active';
        if (isActive) {
            this.textContent === '.' ? calcDisplay.innerHTML = "0." : calcDisplay.innerHTML = this.textContent;
            button.classList.remove('active');
        }
    });

    // Allows you to type new number after a previous result
    // if (result !== undefined || result !== '') {
    //     calcDisplay.innerHTML = this.textContent;
    //     result = undefined;
    // }

    // Stores current value displayed on calculator
    currentValue = parseFloat(calcDisplay.innerHTML);
}

function chooseOperator() {
    // Stores preliminary numerical value && stores selected operator
    if (!this.id.includes('equals')) {
        lastValue = parseFloat(calcDisplay.innerHTML);
        selectedOperator = this.dataset.symbol;
    }
    // Removes "active" class from the previously selected operator
    operatorButtons.map(button => button.className === 'operator active' ? button.classList.remove('active') : '');
    // Adds 'active' class to newly selected operator as long as !== equals button
    !this.id.includes('equals') ? this.classList.add('active') : '';

    !this.id.includes('equals') && result !== undefined ? currentValue = result : '';
}

function calculate() {
    if(lastValue === '' || lastValue === undefined) {
        return;
    }

    const operators = {
        '+': (a, b) => lastValue + currentValue,
        '-': (a, b) => lastValue - currentValue,
        '/': (a, b) => lastValue / currentValue,
        '*': (a, b) => lastValue * currentValue
    }
    
    result = operators[selectedOperator](lastValue, currentValue);
    calcDisplay.innerHTML = numberWithCommas(result);
    lastValue = result;
}

function log() {
    console.log({lastValue, currentValue, selectedOperator, result});
}

clearButton.addEventListener('click', clearLogic);
numberButtons.map(button => button.addEventListener('click', displayEntry));
operatorButtons.map(button => button.addEventListener('mouseup', chooseOperator));
equals.addEventListener('click', calculate);
plusMinus.addEventListener('click', () => {
    calcDisplay.innerHTML *= -1;
    currentValue = parseFloat(calcDisplay.innerHTML);
});
percentage.addEventListener('click', () => calcDisplay.innerHTML *= 0.01);
window.addEventListener('click', log);

// Bug log
    // Odd decimal behavior after using equals button
