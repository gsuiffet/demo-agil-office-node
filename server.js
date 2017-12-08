var express = require('express');
var app = express();
var request = require('request');
var connect = false;
var notification = false;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('public/css'));

function getCookies(callback){
    request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        url: 'https://ws.agiloffice.fr/demo/session_login?username=demo3&password=demo3',
        method: 'POST'
    }, function (err, res) {
        console.log('statusCode:', res && res.statusCode);
        if (!err && res.statusCode == 200) {
            return callback(null, res.headers['agil-cookie']);
        } else {
            return callback(err);
        }
    });
}

app.get('/', function (req, res) {
    res.render('index',{connect:connect, notification:notification});
});

app.get('/call', function (req, res) {
    console.log("call", req.query.number);
    getCookies(function(err, cookies){
        if(!err) {
            console.log("cookies" ,cookies);
            request({
                headers: {
                    'Cookie': '_agil_ws_'+cookies,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                url: 'https://ws.agiloffice.fr/demo/phone_call?number='+ req.query.number,
                method: 'POST'
            }, function (err, rep, body) {
                console.log("err", err);
                console.log("body", body);
                console.log('statusCode:', rep && rep.statusCode);
                if (err != true) {
                    connect = true;
                    request({
                        headers: {
                            'Cookie': '_agil_ws_'+cookies,
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
                        res.render("index",{connect:connect, notification:notification});
                    });
                }
            });
        }
    });
});

var port= (process.env.PORT || 8080);
app.listen(port, function () {
    console.log("Server listening on port 8080");
});
