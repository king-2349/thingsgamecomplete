const mongoose = require('mongoose');

let GameSchema = new mongoose.Schema({
    gameId: String,
    gameState: String,
    turn: Number,
    topic: String,
    gameHead: String,
    voter: String
});

function createGameModel() {

    return mongoose.model('GameModel', GameSchema, 'Games');
}

module.exports = createGameModel;
