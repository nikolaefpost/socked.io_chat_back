const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server);
let messages = [];
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:4001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('/index.html');
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', data =>{
        messages.push(data)
        console.log(messages)
        io.emit('broadcast', messages); // emit an event to all connected sockets
    })
});

server.listen(4001, () => {
    console.log('listening on *:4001');
});