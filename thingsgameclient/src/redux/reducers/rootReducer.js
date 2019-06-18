import { combineReducers } from 'redux';
import nameReducer from './nameReducer';
import gameInfoReducer from './gameInfoReducer';

const rootReducer = combineReducers({
    name: nameReducer,
    gameState: gameInfoReducer
});

export default rootReducer;