import { combineReducers } from 'redux';
import gameInfoReducer from './gameInfoReducer';
import playerInfoReducer from './playerInfoReducer';

const rootReducer = combineReducers({
    gameInfo: gameInfoReducer,
    playerInfo: playerInfoReducer
});

export default rootReducer;