import { combineReducers } from 'redux';
import nameReducer from './nameReducer';
import gameInfoReducer from './gameInfoReducer';
import gameIdReducer from './gameIdReducer';

const rootReducer = combineReducers({
    name: nameReducer,
    gameInfo: gameInfoReducer,
    gameId: gameIdReducer
});

export default rootReducer;