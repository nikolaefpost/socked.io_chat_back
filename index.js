const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let messages = [
    'Hi, Julia! Welcome back to work! How was your vacation?',
    'It was so much fun. I really enjoyed it.',
    'And will you go there again next year?',
    'Of course, I will.'
];

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('broadcast', messages);

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