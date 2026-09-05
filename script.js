let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    display.value = expression;
}

function appendOperator(op) {
    if (expression === '') return;
    
    // Remove the last character if it's an operator (to replace it)
    if (['+', '-', '*', '/'].includes(expression.charAt(expression.length - 1))) {
        expression = expression.slice(0, -1);
    }
    
    expression += op;
    display.value = expression;
}

function clearDisplay() {
    expression = '';
    display.value = '';
}

function deleteLast() {
    expression = expression.slice(0, -1);
    display.value = expression;
}

function calculate() {
    try {
        // Evaluate the expression safely
        let result = eval(expression);
        display.value = result;
        expression = result.toString();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (!isNaN(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === '.') {
        appendNumber(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
