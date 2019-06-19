const express = require('express');

function generateGameId(length) {
    let validIdChars = '1234567890abcdefghijklmnopqrstuvwxyz';
    let low = 0, high = validIdChars.length;

    //Move to config file probably
    let gameIdLength = length;
    let gameId = '';

    for (let i = 0; i < gameIdLength; i++) {
        gameId += validIdChars.charAt(Math.random() * (high - low) + low);
    }

    return gameId;
}

function createGameRouter(mongoose) {
    const gameRouter = express.Router();
    const Game = require('../models/GameModel')(mongoose);

    gameRouter.post('/', (req, res) => {
        let gameId = generateGameId(6);

        let NewGame = new Game({
            gameId: gameId,
            gameState: 'lobby',
            turn: 1,
            topic: 'Hello'
        })

        const Player = require('../models/PlayerModel')(mongoose, gameId);
        Player.createCollection().then((collection) => {
            NewGame.save((error) => {
                if (error) {
                    return res.send('error');
                }
                return res.json({
                    gameId: gameId
                });
            });
        })
    });

    gameRouter.post('/:gameId/player', (req, res) => {
        /*
            -generate id
            -add to game table
            -create player table for game (ie players-${gameId})
            -return gameId
        */
        const Player = require('../models/PlayerModel')(mongoose, gameId);
    });

    return gameRouter;
}


module.exports = createGameRouter;