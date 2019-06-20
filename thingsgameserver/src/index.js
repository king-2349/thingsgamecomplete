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

//const createGameRouter = require('./routers/createGameRouter');
//app.use('/game', createGameRouter(mongoose));

const io = require('socket.io')(app.listen(3001));

io.on('connection', (socket) => {
    
    socket.on('newGame', () => {
        console.log('New game being created');
        const gameId = '112233';
        socket.join(gameId);
        socket.emit('newGameResponse',gameId);
        //io.sockets.in('123456').emit('message','New roomie');
    });

    socket.on('joinGame', (gameId) => {
        console.log('New connection joining game: '+gameId)
        socket.join(gameId);
    });
});