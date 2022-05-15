//Akshar Patel(3090870)
//Assignment 1(Question 5)
let express = require("express");
let handlebars = require('express-handlebars').create({defaultLayout: 'main'});

let app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('form.html'));
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    //must use absolute path to make program run
    //make sure to change this path before running
    res.sendFile('form.html');
});

app.post('/temp', function (req, res) {
    res.send('Submitted Successfully! Data Saved to Console');
    console.log(req.body);
});

app.listen(3027, function () {
    console.log("Express started on http://localhost:" + 3027);
});