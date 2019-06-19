function createPlayerModel(mongoose, gameId) {
    let PlayerSchema = new mongoose.Schema({
        gameId: String,
        gameState: String,
        turn: Number,
        topic: String
    });
    
    return mongoose.model('PlayerModel', PlayerSchema, 'Players-'+gameId);
}

module.exports = createPlayerModel;
