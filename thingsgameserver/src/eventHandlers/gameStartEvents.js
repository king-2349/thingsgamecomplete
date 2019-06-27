function createGameStateEvents(socket, io) {
    const InboundEvents = require('../constants/InboundEvents');
    const OutboundEvents = require('../constants/OutboundEvents');
    const PlayerStates = require('../constants/PlayerStates');
    const GameStates = require('../constants/GameStates');
    const Game = require('../models/GameModel')();
    const Player = require('../models/PlayerModel')();
    const info = require('./getInfo');

    socket.on(InboundEvents.START_ROUND, (gameId) => {
        Game.findOneAndUpdate({ gameId: gameId }, { gameState: GameStates.TOPIC, topic: '' }, (err, game) => {
            if (err) {
                socket.emit(OutboundEvents.BACKEND_ERROR, err);
                return;
            }
            Player.findOne({ gameId: gameId, name: game.gameHead }, (err, player) => {
                if (err) {
                    socket.emit(OutboundEvents.BACKEND_ERROR, err);
                    return;
                }
                Player.updateMany({ gameId: gameId }, { state: PlayerStates.WAITING, answer: '', pickedTopic: false, roundPoints: 0 }, (err, res) => {
                    if (err) {
                        socket.emit(OutboundEvents.BACKEND_ERROR, err);
                        return;
                    }
                    Player.updateOne({ gameId: gameId, name: player.name }, { state: PlayerStates.TOPIC, pickedTopic: true }, (err, res) => {
                        if (err) {
                            socket.emit(OutboundEvents.BACKEND_ERROR, err);
                            return;
                        }
                        Game.updateOne({ gameId: gameId }, { gameHead: player.next, voter: player.next }, (err, res) => {
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
            })
        });
    });
}

module.exports = createGameStateEvents;