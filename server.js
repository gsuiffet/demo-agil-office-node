var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('public/css'));

app.get('/', function (req, res) {
    io.sockets.on('connection', function (socket) {
        socket.on('subscribe', function(post) {
            socket.join(post);
            //console.log('joining post', post);
            io.sockets.emit ('messageSuccess', post);
        })
    });
    res.render('index');
});

var port= (process.env.PORT || 8080);
server.listen(port, function () {
    console.log("Server listening on port 8080");
});
