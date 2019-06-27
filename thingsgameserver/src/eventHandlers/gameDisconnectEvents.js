function createGameDisconnectEvents(socket, io) {
    const InboundEvents = require('../constants/InboundEvents');
    const OutboundEvents = require('../constants/OutboundEvents');
    const PlayerStates = require('../constants/PlayerStates');
    const GameStates = require('../constants/GameStates');
    const Game = require('../models/GameModel')();
    const Player = require('../models/PlayerModel')();
    const info = require('./getInfo');

    function disconnect() {
        Player.findOne({ socketId: socket.id }, (err, player) => {
            if(err){return;}
            console.log(player.name+" is disconnecting");
        })
    }

    socket.on('disconnect', disconnect);
    socket.on(InboundEvents.LEAVE_GAME, disconnect);
}

module.exports = createGameDisconnectEvents;