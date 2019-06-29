const fs = require('fs');
const express = require('express');
const https = require('https');
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

let credentials = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
};

const server = https.createServer(credentials, app);

const Game = require('./models/GameModel')();
const Player = require('./models/PlayerModel')();

Game.deleteMany({}, (err, res) => { });
Player.deleteMany({}, (err, res) => { });

server.listen(3001, () => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        try {
            require('./eventHandlers/gameSetupEvents')(socket, io);
            require('./eventHandlers/gameStartEvents')(socket, io);
            require('./eventHandlers/gameSubmitTopicEvents')(socket, io);
            require('./eventHandlers/gameAnswerEvents')(socket, io);
            require('./eventHandlers/gameVoteEvents')(socket, io);
            require('./eventHandlers/gameRoundOverEvents')(socket, io);
            require('./eventHandlers/gameDisconnectEvents')(socket, io);
        }
        catch (e) {
            console.log('Just saved server from crashing with error: ' + e);
        }
    });
})