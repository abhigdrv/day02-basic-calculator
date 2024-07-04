const control = document.getElementById('control');
const screen = document.getElementById('screen');
let result = 0;
let equation = [];
let operator = "";
let operand = "";
let waitingForOperand = true;
let waitingForOperator = true;
let display = [];
document.addEventListener("keypress", (event) => {
    buttonPressed(event.key)
})

function buttonPressed(keyPressed){
    if(checkValidKeyPressed(keyPressed)){
        if(keyPressed == "clear"){
            screen.innerHTML = 0;
            equation = [];
            return;
        }
        if(keyPressed == "back"){
            display.pop();
            screen.innerHTML = display.join('');
            return;
        }
        if(isOperand(keyPressed)){
            if(operator != "") equation.push(operator);
            operand = operand + String(keyPressed)
            operator = ""
        }
        if(isOperator(keyPressed)){
            equation.push(operand);
            operator = String(keyPressed)
            operand = ""
        }

        display.push(keyPressed)
        screen.innerHTML = display.join('');

        if(keyPressed == "=" || keyPressed == "Enter") {
            if(operand != "") equation.push(operand)
            result = calculate(equation);
            screen.innerHTML = result;

            operand = ""
            operator = ""
            equation = []
            display = []
        }
    }
}

function isOperator(keyPressed){
    return keyPressed == "+" || keyPressed == "-" || keyPressed == "*" || keyPressed == "/";
}

function isOperand(keyPressed){
    return keyPressed == "1" || keyPressed == "2" || keyPressed == "3" || keyPressed == "4" || keyPressed == "5" || keyPressed == "6" || keyPressed == "7" || keyPressed == "8" || keyPressed == "9" || keyPressed == "0" || keyPressed == "."
}

function calculate(equation){
    if(isValidNumber(equation[0])){
        let result = Number(equation[0]);
        for(let i = 2; i < equation.length; i++){
            if(i%2 == 0){
                if(equation[i-1] == "+") result = result + Number(equation[i]);
                if(equation[i-1] == "-") result = result - Number(equation[i]);
                if(equation[i-1] == "*") result = result * Number(equation[i]);
                if(equation[i-1] == "/") result = result / Number(equation[i]);
                if(equation[i-1] == "%") result = result % Number(equation[i]);
            }
        }
        return result;
    }else{
        alert("Invalid equation")
    }
}

function isValidNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function checkValidKeyPressed(keyPressed){
    if( keyPressed == "1" ||
        keyPressed == "2" ||
        keyPressed == "3" ||
        keyPressed == "4" ||
        keyPressed == "5" ||
        keyPressed == "6" ||
        keyPressed == "7" ||
        keyPressed == "8" ||
        keyPressed == "9" ||
        keyPressed == "0" ||
        keyPressed == "-" ||
        keyPressed == "+" ||
        keyPressed == "/" ||
        keyPressed == "*" ||
        keyPressed == "%" ||
        keyPressed == "clear" ||
        keyPressed == "back" ||
        keyPressed == "Enter" ||
        keyPressed == "=" ||
        keyPressed == "."
    ) return true
}