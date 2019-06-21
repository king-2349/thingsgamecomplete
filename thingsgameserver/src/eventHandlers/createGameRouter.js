const express = require('express');


function createGameRouter(mongoose) {
    const gameRouter = express.Router();
    const Game = require('../models/GameModel')(mongoose);
    var PlayerSchema = require('../models/PlayerModel')(mongoose);

    gameRouter.post('/', (req, res) => {
        let gameId = generateGameId(6);

        let NewGame = new Game({
            gameId: gameId,
            gameState: 'lobby',
            turn: 1,
            topic: 'Hello'
        })

        var Player = mongoose.model('PlayerModel-'+gameId, PlayerSchema, 'Players-'+gameId);
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

    gameRouter.post('/:gameId/player/:name', (req, res) => {
        var Player = mongoose.model('PlayerModel-'+req.params.gameId, PlayerSchema, 'Players-'+req.params.gameId);
        let NewPlayer = new Player({
            name: req.params.name,
            points: 0,
            state: 'lobby'
        })

        NewPlayer.save((error) => {
            if (error) {
                return res.send('error');
            }
            return res.status(200).send();
        });
    });

    return gameRouter;
}


module.exports = createGameRouter;