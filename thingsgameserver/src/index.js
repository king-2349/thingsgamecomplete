const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/thingsgame', {
    useNewUrlParser: true,
    useFindAndModify: false
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const Game = require('./models/GameModel')();
const Player = require('./models/PlayerModel')();

Game.deleteMany({},(err, res)=>{});
Player.deleteMany({},(err, res)=>{});

const io = require('socket.io')(app.listen(3001));

io.on('connection', (socket) => {
    require('./eventHandlers/gameSetupEvents')(socket, io);
    require('./eventHandlers/gameStartEvents')(socket, io);
    require('./eventHandlers/gameSubmitTopicEvents')(socket, io);
    require('./eventHandlers/gameAnswerEvents')(socket, io);
    require('./eventHandlers/gameVoteEvents')(socket, io);
    require('./eventHandlers/gameRoundOverEvents')(socket, io);
    require('./eventHandlers/gameDisconnectEvents')(socket, io);
});