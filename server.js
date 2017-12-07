var express = require('express');
var app = express();
var request = require('request');
var connect = false;
var notification = false;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('public/css'));

app.get('/', function (req, res) {
    res.render('index',{connect:connect, notification:notification});
});

app.get('/call', function (req, res) {
    request({
        headers: {
            'Cookie': '_agil_ws_session_id=61cbb6f212eb5b61e97a95cfb4b9fe07',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        url: 'https://ws.agiloffice.fr/demo/phone_call?number=8002',
        method: 'POST'
    }, function (err, rep, body) {
        console.log("err", err);
        console.log("body", body);
        console.log('statusCode:', rep && rep.statusCode);
        if (err != true) {
            connect = true;
            request({
                headers: {
                    'Cookie': '_agil_ws_session_id=61cbb6f212eb5b61e97a95cfb4b9fe07',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                url: 'https://ws.agiloffice.fr/demo/phone_lamp?phone=8003&lamp=8002&status=1',
                method: 'POST'
            }, function (err, rep, body) {
                console.log("err res", err);
                console.log("body res", body);
                console.log('statusCode res', rep && rep.statusCode);
                if (err != true) {
                    notification = true;
                }
                res.send({connect:connect, notification:notification});
            });
        }
    });
});

app.listen(8080, function () {
    console.log("Server listening on port 8080");
});