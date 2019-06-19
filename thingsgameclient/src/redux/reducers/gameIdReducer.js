import { SET_GAME_ID } from '../actions/actionTypes';

const defaultGameId = '';

export default function gameIdReducer(state = defaultGameId, action) {
    switch (action.type) {
        case SET_GAME_ID:
            return state = action.payload;
        default:
            return state;
    }
} 