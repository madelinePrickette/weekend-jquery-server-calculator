$(onReady);

function onReady() {
    retrieveEquations();
    $('#equalsButton').on('click', sendEquation);
    $('#plusButton').on('click', plusButtonClick);
    $('#minusButton').on('click', minusButtonClick);
    $('#timesButton').on('click', timesButtonClick);
    $('#divideButton').on('click', divideButtonClick);
    $('#clearButton').on('click', clearPage);
}

let selectedOperator;

function retrieveEquations() {
    console.log('in /GET')
    $.ajax({
        method: 'GET',
        url: '/equations'
    }).then(function(response) {
        console.log(response)
        displayEquations(response);
    })
}

function retrieveCurrentAnswer() {
    $.ajax({
        method: 'GET',
        url: '/solution'
    }).then(function(response) {
        console.log(response)
        // this should be the current solution.
        displaySolution(response);
    })
}

function displayEquations(arr) {
    //console.log(arr);
    $('#answerList').empty()
    for(let equation of arr){
        $('#answerList').append(`
            <li>${equation.num0} ${equation.operator} ${equation.num1} = ${equation.solution}</li>
        `)};
}

function displaySolution(response) {
    for(let solution of response){
    $('#solutionContainer').text(solution);
    }
}

function plusButtonClick() {
    selectedOperator = $('#plusButton').text()
    console.log(selectedOperator);
}
function minusButtonClick() {
    selectedOperator = $('#minusButton').text()
    console.log(selectedOperator);
}
function timesButtonClick() {
    selectedOperator = $('#timesButton').text()
    console.log(selectedOperator);
}
function divideButtonClick() {
    selectedOperator = $('#divideButton').text()
    console.log(selectedOperator);
}

function sendEquation() {
    console.log('in /POST');
    let currentEquation = {
        num0 : $('#num0').val(),
        operator: selectedOperator,
        num1: $('#num1').val()
    }

    $.ajax({
        method: 'POST',
        url: '/equations',
        data: currentEquation
    }).then(function(response) {
        console.log(response);
        retrieveEquations(response);
    })
    $('#num0').val('');
    $('#num1').val('');

    retrieveCurrentAnswer();
}

function clearPage() {
    console.log('clear clicked');
    $.ajax({
        method: 'POST',
        url: '/clear'
    }).then(function(response) {
        console.log(response);
        retrieveCurrentAnswer();
        retrieveEquations();
    })
    $('#solutionContainer').empty();
}