const display1 = document.querySelector(".calculator__header");
const display2 = document.querySelector(".calculator__result");
const body = document.querySelector(".numbersButtons")
const operation = document.querySelector(".--fn")
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");
//const tempResult = document.querySelector(".temp-result");
let num1 = "";
let num2 = "";
let result = null;
let lastOperation = "";
let haveDot = false;

const handlerClickNumber = (e) => {
    if (e.target.innerText === "." && !haveDot) {
        haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
        return;
    } else if (isNaN(e.target.innerText)) {
        return
    }
    num2 += e.target.innerText;
    display2.innerText = num2;
}

//////////////////////////////
const handlerClickOperation = (e) => {
    if (!num2) return;
    haveDot = false;
    const operationName = e.target.innerText;

    if (num1 && num2 && lastOperation) {
        mathOperation();
    } else {
        result = parseFloat(num2);
    }
    clearVar(operationName);
    lastOperation = operationName;
};

function clearVar(name = "") {
    num1 += num2 + " " + name + " ";
    display1.innerText = num1;
    display2.innerText = "";
    num2 = "";
    //tempResult.innerText = result;
}

///////////////////////////
function mathOperation() {
    switch (lastOperation) {
        case "x":
            result = parseFloat(result) * parseFloat(num2);
            break;
        case "+":
            result = parseFloat(result) + parseFloat(num2);
            break;
        case "-":
            result = parseFloat(result) - parseFloat(num2);
            break;
        case "/":
            result = parseFloat(result) / parseFloat(num2);
            break;
        default:
            break;
    }
}

const handlerEqual = (e) => {
    if (!num2 || !num1) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2.innerText = result;
    //tempResult.innerText = "";
    num2 = result;
    num1 = "";
    if (document.activeElement && document.activeElement.matches('button')) {
        e.stopPropagation();
    }
};

const clearAllfromDisplay = (e) => {
    num1 = "";
    num2 = "";
    display1.innerText = "";
    display2.innerText = "";
    result = "";
    //tempResult.innerText = "";
};

const clearLastfromDisplay = (e) => {
    display2.innerText = display2.innerText.substring(0, display2.innerText.length - 1);
    num2 = display2.innerText.substring(0, display2.innerText.length);
};

const init = () => {
    body.addEventListener('click', handlerClickNumber)
    operation.addEventListener('click', handlerClickOperation)
    equal.addEventListener('click', handlerEqual)
    clearAll.addEventListener('click', clearAllfromDisplay)
    clearLast.addEventListener('click', clearLastfromDisplay)
}

init()
