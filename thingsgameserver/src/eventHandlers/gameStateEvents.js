function createGameStateEvents(socket, io) {
    const InboundEvents = require('../constants/InboundEvents');
    const OutboundEvents = require('../constants/OutboundEvents');
    const PlayerStates = require('../constants/PlayerStates');
    const GameStates = require('../constants/GameStates');
    const Game = require('../models/GameModel')();
    const Player = require('../models/PlayerModel')();
    const info = require('./getInfo');

    socket.on(InboundEvents.START_ROUND, (gameId) => {
        Game.update({ gameId: gameId }, { gameState: GameStates.ANSWERING }, (err, res) => {
            if (err) {
                socket.emit(OutboundEvents.BACKEND_ERROR, err);
                return;
            }
            Player.updateMany({ gameId: gameId }, { state: PlayerStates.UNANSWERED, answer: '' }, (err, res) => {
                if (err) {
                    socket.emit(OutboundEvents.BACKEND_ERROR, err);
                    return;
                }
                info.getPlayerInfo(gameId, (playerInfo) => {
                    io.to(gameId).emit(OutboundEvents.PLAYERS_UPDATE, playerInfo);
                });
                info.getGameInfo(gameId, (gameInfo) => {
                    socket.emit(OutboundEvents.GAME_UPDATE, gameInfo);
                });
            })
        });
    });
}

module.exports = createGameStateEvents;