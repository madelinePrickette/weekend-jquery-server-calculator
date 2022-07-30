const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('Server is running...', PORT)
});

equationArray = [{
    num1: 3,
    operator: '+',
    num2: 2
}];

app.get('/equations', (req, res) => {
    res.send(equationArray);
});

app.post('/equations', (req,res) => {
    res.sendStatus(200);
});