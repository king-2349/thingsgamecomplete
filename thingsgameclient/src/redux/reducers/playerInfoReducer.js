import { SET_PLAYER_INFO, SET_NAME } from '../actions/actionTypes';

const defaultPlayerInfo = {};

export default function playerInfoReducer(playerInfo = defaultPlayerInfo, action) {
    switch (action.type) {
        case SET_PLAYER_INFO:
            return playerInfo = action.payload;
        default:
            return playerInfo;
    }
}

export function nameReducer(name = '', action) {
    switch (action.type) {
        case SET_NAME:
            return name = action.payload;
        default:
            return name;
    }
}