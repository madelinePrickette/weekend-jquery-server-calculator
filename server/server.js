const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('Server is running...', PORT)
});

equationArray = [];

app.get('/equations', (req, res) => {
    res.send(equationArray);
});

app.post('/equations', (req, res) => {
currentEquation = req.body;
    calculateSolution(currentEquation);
    res.sendStatus(200);
});

function calculateSolution() {
        let firstNumber = Number(currentEquation.num0) 
        let operator = currentEquation.operator
        let secondNumber = Number(currentEquation.num1)
    let solution;
        if(operator == '+') {
            solution = firstNumber + secondNumber;
        } else if(operator == '-') {
            solution = firstNumber - secondNumber;
        } else if(operator == '*') {
            solution = firstNumber * secondNumber;
        } else {
            solution = firstNumber / secondNumber;
        }
    console.log(solution);
    currentEquation.solution = solution;
    console.log(currentEquation);
    equationArray.push(currentEquation);
    console.log(equationArray);
}