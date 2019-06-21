const Game = require('../models/GameModel')();
const Player = require('../models/PlayerModel');

exports.getGameInfo = (gameId, callback) => {
    Game.findOne({ gameId: gameId }, (err, game) => {
        if (err) {
            return console.log('Error: '+err);
        }
        let gameInfo = {
            gameId: gameId,
            gameState: game.gameState,
            turn: game.turn,
            topic: game.topic
        };
        console.log(gameInfo);
        callback(gameInfo);
    })
}

exports.getPlayerInfo = (gameId, callback) => {
    Game.findOne({ gameId: gameId }, (err, game) => {
        if (err) {
            return [];
        }
        const PlayerModel = Player(gameId);
        const playerInfo = [];
        PlayerModel.find((err, players) => {
            players.forEach((player) => {
                playerInfo.push(
                    {
                        name: player.name,
                        points: player.points,
                        state: player.state,
                        answer: player.answer
                    }
                )
            });
            callback(playerInfo);
        });
    })
}