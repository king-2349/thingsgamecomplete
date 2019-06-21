import { SET_PLAYER_INFO } from '../actions/actionTypes';

const defaultPlayerInfo = [];

export default function gameInfoReducer(playerInfo = defaultPlayerInfo, action) {
    switch (action.type) {
        case SET_PLAYER_INFO:
            return playerInfo = action.payload;
        default:
            return playerInfo;
    }
} 