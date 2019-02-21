var express = require('express');
var cors = require('cors')
var parser = require('body-parser');
var async = require("async");
var controller = require('./controller.js');

var app = express();

let server = app.listen(3000, function() {
    console.log('Server started');
});

var io = require('socket.io').listen(server);

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

io.on('connection', function(socket){
  console.log('a user connected');
});

app.all('*', (req, res, next) => {
    console.log(req.method + ' ' + req.url + ' has been invoked!');
    next();
});

app.use('/api', controller);

app.get('/', function(req, res) {
    res.send('Hello, world!');
});

async.forever(
    (next) => {
        io.emit('data', Math.round(Math.random() * (20 - 1) + 1));

        setTimeout(()=>{
            next();
        }, (Math.random() * 1000) + 500);
    },
    (err) => {
        console.err(err);
    }
);
