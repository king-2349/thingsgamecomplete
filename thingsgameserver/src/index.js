const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/thingsgame', {
    useNewUrlParser: true
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const createGameRouter = require('./routers/createGameRouter');
app.use('/game', createGameRouter(mongoose));

app.listen(3001);