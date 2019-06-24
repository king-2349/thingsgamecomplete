function createGameVoteEvents(socket, io) {
    const InboundEvents = require('../constants/InboundEvents');
    const OutboundEvents = require('../constants/OutboundEvents');
    const PlayerStates = require('../constants/PlayerStates');
    const GameStates = require('../constants/GameStates');
    const Game = require('../models/GameModel')();
    const Player = require('../models/PlayerModel')();
    const info = require('./getInfo');

    socket.on(InboundEvents.VOTED, (gameId, name, vote) => {
        Player.findOne({ gameId: gameId, name: vote.name, answer: vote.answer }, (err, player) => {
            if (err) {
                socket.emit(OutboundEvents.BACKEND_ERROR, err);
                return;
            }
            if (player == null) {
                Player.updateOne({ gameId: gameId, name: name }, { state: PlayerStates.DONE }, (err, res) => {
                    if (err) {
                        socket.emit(OutboundEvents.BACKEND_ERROR, err);
                        return;
                    }
                    Player.find({ $and: [{ gameId: gameId, state: { $ne: PlayerStates.OUT } }, { gameId: gameId, state: { $ne: PlayerStates.DONE } }] }, (err, players) => {
                        if (err) {
                            socket.emit(OutboundEvents.BACKEND_ERROR, err);
                            return;
                        }
                        if (players.length == 0) {
                            Game.updateOne({ gameId: gameId }, { gameState: GameStates.RESULTS }, (err, res) => {
                                if (err) {
                                    socket.emit(OutboundEvents.BACKEND_ERROR, err);
                                    return;
                                }
                                Player.updateMany({ gameId: gameId, state: PlayerStates.DONE }, { $inc: { points: 2 } }, (err, res) => {
                                    if (err) {
                                        socket.emit(OutboundEvents.BACKEND_ERROR, err);
                                        return;
                                    }
                                    Player.updateMany({ gameId: gameId }, { state: PlayerStates.RESULTS }, (err, res) => {
                                        if (err) {
                                            socket.emit(OutboundEvents.BACKEND_ERROR, err);
                                            return;
                                        }
                                        info.getPlayerInfo(gameId, (playerInfo) => {
                                            info.getGameInfo(gameId, (gameInfo) => {
                                                io.to(gameId).emit(OutboundEvents.ALL_UPDATE, gameInfo, playerInfo);
                                            });
                                        });
                                    });
                                });
                            });
                        }
                        else {
                            var newVotingPlayer = players[Math.floor(Math.random() * players.length)];
                            Player.updateOne({ gameId: gameId, name: newVotingPlayer.name }, { state: PlayerStates.VOTING }, (err, res) => {
                                if (err) {
                                    socket.emit(OutboundEvents.BACKEND_ERROR, err);
                                    return;
                                }
                                info.getPlayerInfo(gameId, (playerInfo) => {
                                    io.to(gameId).emit(OutboundEvents.PLAYERS_UPDATE, playerInfo);
                                });
                            });
                        }
                    })
                });
            }
            else {
                Player.updateOne({ gameId: gameId, name: vote.name }, { state: PlayerStates.OUT, $inc: { points: 1 } }, (err, res) => {
                    if (err) {
                        socket.emit(OutboundEvents.BACKEND_ERROR, err);
                        return;
                    }
                    info.getPlayerInfo(gameId, (playerInfo) => {
                        info.getGameInfo(gameId, (gameInfo) => {
                            io.to(gameId).emit(OutboundEvents.ALL_UPDATE, gameInfo, playerInfo);
                        });
                    });
                });
            }
        })
    });
}

module.exports = createGameVoteEvents;