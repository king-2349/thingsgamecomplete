const mongoose = require('mongoose');

let PlayerSchema = new mongoose.Schema({
    gameId: String,
    name: String,
    points: Number,
    state: String,
    answer: String
});

function createPlayerModel(gameId) {

    return mongoose.model('PlayerModel', PlayerSchema, 'Players');
}

module.exports = createPlayerModel;
