var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var cookie = "";

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('public/css'));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.render('index', {cookie:cookie});
});

app.post('/auth', function (req, res) {
    function getCookies(callback){
        request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            url: 'https://ws.agiloffice.fr/demo/session_login?username='+req.body.username+'&password='+req.body.password,
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
    getCookies(function(err, cookies) {
        if (!err) {
            console.log("cookie" ,"_agil_ws_"+cookies);
            cookie = "_agil_ws_"+cookies;
        }
        res.render('index',{cookie:cookie});
    });
});

var port= (process.env.PORT || 8080);
app.listen(port, function () {
    console.log("Server listening on port 8080");
});
