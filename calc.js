
// Author:  Martin Lovell
// Date:  05/07/2019
// Version: 1.0    (first working version)
// *********************************************************
// REVISION CONTROL
// Using Git source control
// *********************************************************
//  **** DESCRIPTION ****
// Calculator function
// Functions add, subtract, multiply, divide, shift right & clear screen
// Can chain numerical operations
// Rounds to nearest 0.5 for division so only integers are used
// No exponent provided (yet) for large numbers


const output = document.querySelector('.answer-cell');
let screenNum = 0;
let interimCalc = 0;
let lastClicked = 0;
let clicked = 0;
let lastOperator = "";

function checkForInput() {
    document.querySelector('.calculator').addEventListener('click', function(event) {
        if(event.target.tagName === 'BUTTON') {
            buttonPressed( event.target.innerText );
        }
    });
};

function buttonPressed(clicked) {
    console.log(clicked);
    if (isNaN(parseInt(clicked))) { // its a calculator operation (non-integer)
        findOperation(clicked);
    } else {    // its a number entry
        inputNumberToScreen(clicked);
    }
}

function findOperation(calcFunction) {  
    // last button pressed was non-integer
    switch (calcFunction) {
        case "C":   
            output.innerText = "0";
            interimCalc = 0;
            lastClicked = calcFunction;
        break;
        case "→":
            if ( output.innerText !== "0" && output.innerText.length > 1) {
                output.innerText = output.innerText.slice(0, -1); // take one num off the end.
            } else if ( output.innerText !== "0" && output.innerText.length === 1) {
                output.innerText = 0;
            }
        break;
        case "÷":  // if previous button was a number
            if ( !isNaN(parseInt(lastClicked)) ) {
                if ( interimCalc === 0 ) {
                    interimCalc = output.innerText;
                } else {  // do the calculation and print to screen
                    output.innerText = stringToOp(lastOperator, interimCalc, output.innerText);
                    interimCalc = output.innerText;
                }
            } 
        break;
        case "×":  // if previous button was a number
            if ( !isNaN(parseInt(lastClicked)) ) {
                if ( interimCalc === 0 ) {
                    interimCalc = output.innerText;
                } else {  // do the calculation and print to screen
                    output.innerText = stringToOp(lastOperator, interimCalc, output.innerText);
                    interimCalc = output.innerText;
                }
            }
        break;
        case "-":  // if previous button was a number
            if ( !isNaN(parseInt(lastClicked)) ) {
                if ( interimCalc === 0 ) {
                    interimCalc = output.innerText;
                } else {  // do the calculation and print to screen
                    output.innerText = stringToOp(lastOperator, interimCalc, output.innerText);
                    interimCalc = output.innerText;
                }
            }
        break;
        case "+":  // if previous button was a number
            if ( !isNaN(parseInt(lastClicked)) ) {
                if ( interimCalc === 0 ) {
                    interimCalc = output.innerText;
                } else {  // do the calculation and print to screen
                    output.innerText = stringToOp(lastOperator, interimCalc, output.innerText);
                    interimCalc = output.innerText;
                }
            }
        break;
        case "=":  // if previous button was a number or shift arrow
            if ( !isNaN(parseInt(lastClicked)) || lastClicked === "→") {
                // do the calculation and print to screen
                output.innerText = stringToOp(lastOperator, interimCalc, output.innerText);
                interimCalc = output.innerText;
            } 
        break;
        default:
            console.log("You shouldn't be here!!");
    }
    if (calcFunction !== "→" ){ 
        lastOperator = calcFunction;
    };
    lastClicked = calcFunction;

    function stringToOp(lastOp, lastCalc, screenVal) {
        let result = 0;
        let x = 0;
        let y = 0;

        switch(lastOp) {
            case "+": result = plus(parseInt(lastCalc), parseInt(screenVal)); break;
            case "-": result = minus(parseInt(lastCalc), parseInt(screenVal)); break;
            case "×": result = multiply(parseInt(lastCalc), parseInt(screenVal)); break;
            case "÷": result = divide(parseInt(lastCalc), parseInt(screenVal)); break;
            default: "Uh oh, there's a problem with the last Operator.."
        }
        return result;

        function plus( x, y ) { return ( x + y ); }; 
        function minus( x, y ) { return ( x - y ); }; 
        function multiply( x, y ) { return ( x * y ); }; 
        function divide( x, y ) { return ( Math.round( x / y ) ); };
    }
}

function inputNumberToScreen(clicked ) {  // the latest button was a number

    if (!isNaN(parseInt(lastClicked)) || lastClicked === "C") {  
        // the previous button was a number too
        if ( output.innerText !== "0" && output.innerText.length < 16) {
            output.innerText = output.innerText + clicked;
        } else {  // dont want leading zeros so overwrite it with last click value
            if (output.innerText.length !== 16) { 
                output.innerText = clicked;  // first digit to screen
            }
        }
    // the previous button was a mathematical operator      
    } else if ( (lastClicked === "×" || "÷" || "+" || "-") && output.innerText !== "0" ) {
        output.innerText = clicked;               
    }
    lastClicked = clicked;
}

checkForInput();


