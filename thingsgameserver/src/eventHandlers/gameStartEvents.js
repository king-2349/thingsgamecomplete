function generateGameId(length) {
    let validIdChars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let low = 0, high = validIdChars.length;

    let gameIdLength = length;
    let gameId = '';

    for (let i = 0; i < gameIdLength; i++) {
        gameId += validIdChars.charAt(Math.random() * (high - low) + low);
    }

    return gameId;
}

function createGameStartEvents(socket) {
    const Game = require('../models/GameModel')();
    const Player = require('../models/PlayerModel');

    function addPlayerToGame(gameId, name, callback) {
        let NewPlayer = new Player(gameId)({
            name: name,
            points: 0,
            state: 'lobby',
            answer: ''
        });
        NewPlayer.save(err => callback(err));
    }

    socket.on('newGame', (name) => {
        console.log('New game being created');
        let gameId = generateGameId(6);

        let NewPlayer = Player(gameId);
        NewPlayer.createCollection().then((collection) => {
            let NewGame = new Game({
                gameId: gameId,
                gameState: 'lobby',
                turn: 1,
                topic: 'Hello'
            })

            NewGame.save((error) => {
                if (error) {
                    socket.emit("backendError", error);
                    return;
                }
                addPlayerToGame(gameId, name, (err) => {
                    if (err) console.log('error adding player: ' + err);
                    else {
                        console.log('added player ' + name + ' to game ' + gameId);
                        socket.join(gameId);
                        socket.emit('newGameResponse', gameId);
                    }
                });
            });
        })
    });

    socket.on('joinGame', (gameId, name) => {
        console.log('New connection joining game: ' + gameId)

        Game.find({ gameId: gameId }, (err, games) => {
            if (games.length == 0 || err) {
                socket.emit('noGameFound', gameId);
                return;
            }
            addPlayerToGame(gameId, name, (err) => {
                if (err) console.log('error adding player: ' + err);
                else {
                    console.log('added player ' + name + ' to game ' + gameId);
                    socket.join(gameId);
                    socket.emit('joinGameResponse', gameId);
                }
            });

        })
    });
}

module.exports = createGameStartEvents;