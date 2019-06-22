const Game = require('../models/GameModel')();
const Player = require('../models/PlayerModel')();

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
        callback(gameInfo);
    })
}

exports.getPlayerInfo = (gameId, callback) => {
    Game.findOne({ gameId: gameId }, (err, game) => {
        if (err) {
            return [];
        }
        const playerInfo = [];
        Player.find({gameId: gameId},(err, players) => {
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