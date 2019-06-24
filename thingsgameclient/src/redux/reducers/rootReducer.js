import { combineReducers } from 'redux';
import gameInfoReducer from './gameInfoReducer';
import playerInfoReducer, { nameReducer } from './playerInfoReducer';

const rootReducer = combineReducers({
    gameInfo: gameInfoReducer,
    playerInfo: playerInfoReducer,
    name: nameReducer
});

export default rootReducer;