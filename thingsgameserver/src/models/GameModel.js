function createGameModel(mongoose) {
    let GameSchema = new mongoose.Schema({
        gameId: String,
        gameState: String,
        turn: Number,
        topic: String
    });
    
    return mongoose.model('GameModel', GameSchema, 'Games');
}

module.exports = createGameModel;
