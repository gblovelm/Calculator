
// Wait for button to be pressed by checking for a click on any button
// Which button was Clicked - operation or number?
// Separate function for each operation - takes in interim calc and which button pressed.
// Assume only one button pressed at any one time.
// If operation - set flag
// If number - check if a flag has been set.
// If no flag set then store the number
// if flag set then perform calculation and return the result
// if math operators clicked more than once between numbers then just uses the last one

const output = document.querySelector('.answer-cell');
let screenNum = 0;
let interimCalc = 0;
let flag = "";
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

function findOperation(calcFunction) {  // last button pressed was non-integer
    switch (calcFunction) {
        case "C":   
            output.innerText = "0";
            interimCalc = 0;
            lastClicked = 0;
        break;
        case "→":
            if ( output.innerText !== "0" && output.innerText.length > 1) {
                output.innerText = output.innerText.slice(0, -1); // take one num off the end.
            } else if ( output.innerText !== "0" && output.innerText.length === 1) {
                output.innerText = 0;
            }
        break;
        case "÷":  // if screen value is greater than zero then output the new calc
            if ( isNaN(parseInt(lastClicked)) ) {  // there has already been a calc

            }
                console.log("Im ÷");
        break;
        case "×":
                console.log("Im ×");
        break;
        case "-":
                console.log("Im -");
        break;
        case "+":
                console.log("Im +");

        break;
        case "=":
                output.innerText = interimCalc;
                console.log("Im =");
        break;

        default:
            console.log("You shouldn't be here!!");
    }
     if (calcFunction !== "C" ) {
         lastClicked = calcFunction; 
     }
}

function inputNumberToScreen(clicked ) {  // the latest click was a number
    console.log(clicked);
    console.log(lastClicked);
    if (!isNaN(parseInt(lastClicked))) {  // the previous click was a number too

        if ( output.innerText !== "0" && output.innerText.length < 16) {
            output.innerText = output.innerText + clicked;
            lastClicked = lastClicked + clicked;
        } else {  // dont want leading zeros so overwrite it with last click value
            if (output.innerText.length !== 16) { 
                output.innerText = clicked;
                lastClicked = clicked;
            }
        }
        // previous click was a mathematical operator      
    } else if ( (lastClicked === "×" || "÷" || "+" || "-") && output.innerText !== "0" ) {
        // Do the calculation and store as intermediate value, not on the screen
        console.log('You\'re in the right place');
        
        switch (lastClicked) {
            case "×" :
                interimCalc = parseInt(output.innerText) * parseInt(clicked); console.log(interimCalc);
            break;
            case "÷":
                interimCalc = parseInt(output.innerText) / parseInt(clicked); console.log(interimCalc);
            break;
            case "+":
                interimCalc = parseInt(output.innerText) + parseInt(clicked); console.log(interimCalc);
                break;
            case "-":
                interimCalc = parseInt(output.innerText) - parseInt(clicked); console.log(interimCalc);
            break;
        }
        output.innerText = clicked; 
        lastClicked = clicked;
        
    }
}

checkForInput();


