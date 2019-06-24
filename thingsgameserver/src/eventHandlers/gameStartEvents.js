function createGameStateEvents(socket, io) {
    const InboundEvents = require('../constants/InboundEvents');
    const OutboundEvents = require('../constants/OutboundEvents');
    const PlayerStates = require('../constants/PlayerStates');
    const GameStates = require('../constants/GameStates');
    const Game = require('../models/GameModel')();
    const Player = require('../models/PlayerModel')();
    const info = require('./getInfo');

    socket.on(InboundEvents.START_ROUND, (gameId) => {
        Game.updateOne({ gameId: gameId }, { gameState: GameStates.TOPIC, topic: '' }, (err, res) => {
            if (err) {
                socket.emit(OutboundEvents.BACKEND_ERROR, err);
                return;
            }
            Player.find({ gameId: gameId, pickedTopic: false }, (err, players) => {
                if (err) {
                    socket.emit(OutboundEvents.BACKEND_ERROR, err);
                    return;
                }
                if (players.length == 0) {
                    Player.find({ gameId: gameId }, (err, players) => {
                        const playerToPick = players[Math.floor(Math.random() * players.length)];
                        Player.updateMany({ gameId: gameId }, { state: PlayerStates.WAITING, answer: '', pickedTopic: false }, (err, res) => {
                            if (err) {
                                socket.emit(OutboundEvents.BACKEND_ERROR, err);
                                return;
                            }
                            Player.updateOne({ gameId: gameId, name: playerToPick.name }, { state: PlayerStates.TOPIC, pickedTopic: true }, (err, res) => {
                                if (err) {
                                    socket.emit(OutboundEvents.BACKEND_ERROR, err);
                                    return;
                                }
                                info.getPlayerInfo(gameId, (playerInfo) => {
                                    info.getGameInfo(gameId, (gameInfo) => {
                                        io.to(gameId).emit(OutboundEvents.ALL_UPDATE, gameInfo, playerInfo);
                                    });
                                });
                            })
                        })
                    })
                }
                else {
                    const playerToPick = players[Math.floor(Math.random() * players.length)];
                    Player.updateMany({ gameId: gameId }, { state: PlayerStates.WAITING, answer: '' }, (err, res) => {
                        if (err) {
                            socket.emit(OutboundEvents.BACKEND_ERROR, err);
                            return;
                        }
                        Player.updateOne({ gameId: gameId, name: playerToPick.name }, { state: PlayerStates.TOPIC, pickedTopic: true }, (err, res) => {
                            if (err) {
                                socket.emit(OutboundEvents.BACKEND_ERROR, err);
                                return;
                            }
                            info.getPlayerInfo(gameId, (playerInfo) => {
                                info.getGameInfo(gameId, (gameInfo) => {
                                    io.to(gameId).emit(OutboundEvents.ALL_UPDATE, gameInfo, playerInfo);
                                });
                            });
                        })
                    })
                }
            })
        });
    });
}

module.exports = createGameStateEvents;