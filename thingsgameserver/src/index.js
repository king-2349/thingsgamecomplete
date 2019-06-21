const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/thingsgame', {
    useNewUrlParser: true
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const io = require('socket.io')(app.listen(3001));

io.on('connection', (socket) => {
    require('./eventHandlers/gameStartEvents')(socket);
});