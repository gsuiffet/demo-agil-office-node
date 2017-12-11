var express = require('express');
var app = express();
var request = require('request');
var cookie = "";

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
    getCookies(function(err, cookies) {
        if (!err) {
            console.log("cookie" ,"_agil_ws_"+cookies);
            cookie = "_agil_ws_"+cookies;
        }
        res.setHeader("Set-Cookie",cookie);
        //res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials','true');
        res.render('index');
    });
});

var port= (process.env.PORT || 8080);
app.listen(port, function () {
    console.log("Server listening on port 8080");
});
