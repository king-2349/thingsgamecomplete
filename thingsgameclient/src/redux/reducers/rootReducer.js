import { combineReducers } from 'redux';
import gameInfoReducer from './gameInfoReducer';
import playerInfoReducer, { nameReducer } from './playerInfoReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    gameInfo: gameInfoReducer,
    playerInfo: playerInfoReducer,
    name: nameReducer,
    errors: errorReducer
});

export default rootReducer;