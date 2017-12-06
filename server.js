var express = require('express');
var app = express();
var request = require('request');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('public/css'));

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/call', function (req, res) {
    request({
        headers: {
            //'agil-cookie': 'session_id=be423de133d16b55fd6da144ec31d222',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        url: 'https://ws.agiloffice.fr/demo/session_login?username=demo3&password=demo3',
        method: 'POST'
    }, function (err, res, body) {
        console.log("body", body);
        console.log("err", res);
        console.log('statusCode:', res && res.statusCode);
    });
    res.render('index');
});

app.listen(8080, function () {
    console.log("Server listening on port 8080");
});