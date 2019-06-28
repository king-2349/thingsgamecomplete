import { SET_GAME_INFO } from '../actions/actionTypes';

const defaultGameInfo = {
    gameId: '',
    gameState: 'lobby',
    topic: 'placeholder'
}

export default function gameInfoReducer(gameInfo = defaultGameInfo, action) {
    switch (action.type) {
        case SET_GAME_INFO:
            return gameInfo = action.payload;
        default:
            return gameInfo;
    }
} 