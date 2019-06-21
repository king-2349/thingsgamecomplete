const mongoose = require('mongoose');

let PlayerSchema = new mongoose.Schema({
    name: String,
    points: Number,
    state: String,
    answer: String
});

function createPlayerModel(gameId) {
    return mongoose.model('PlayerModel-'+gameId, PlayerSchema, 'Players-'+gameId);
}

module.exports = createPlayerModel;
