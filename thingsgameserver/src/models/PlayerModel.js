function createPlayerModel(mongoose) {
    let PlayerSchema = new mongoose.Schema({
        name: String,
        points: Number,
        playerState: String
    });
    
    return PlayerSchema;
}

module.exports = createPlayerModel;
