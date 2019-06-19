import { SET_GAME_INFO } from '../actions/actionTypes';

const defaultGameInfo = {
    players: [
        {
            name: 'Alex',
            points: 100,
            state: 'unanswered'
        }
    ],
    gameState: 'answer',
    turn: -1,
    topic: 'Things dogs are actually saying when they bark'
}

export default function gameInfoReducer(state = defaultGameInfo, action) {
    switch (action.type) {
        case SET_GAME_INFO:
            return state = action.payload;
        default:
            return state;
    }
} 