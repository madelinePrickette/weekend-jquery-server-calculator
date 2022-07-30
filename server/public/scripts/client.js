$(onReady);

function onReady() {
    retrieveEquations();
    $('#equalsButton').on('click', sendEquation);
    $('#plusButton').on('click', plusButtonClick);
    $('#minusButton').on('click', minusButtonClick);
    $('#timesButton').on('click', timesButtonClick);
    $('#divideButton').on('click', divideButtonClick);
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

function displayEquations(arr) {
    //console.log(arr);
    $('#answerList').empty()
    for(let equation of arr){
        $('#answerList').append(`
            <li>${equation.num1}${equation.operator}${equation.num2}=</li>
        `)};
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
        num1 : $('#num1').val(),
        operator: selectedOperator,
        num2: $('#num2').val()
    }

    $.ajax({
        method: 'POST',
        url: '/equations',
        data: currentEquation
    }).then(function(response) {
        console.log(response);
        retrieveEquations;
    })
}