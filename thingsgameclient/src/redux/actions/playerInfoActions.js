import { SET_PLAYER_INFO } from './actionTypes';

export function setPlayerInfo(playerInfo) {
    return { type: SET_PLAYER_INFO, payload: playerInfo }
}