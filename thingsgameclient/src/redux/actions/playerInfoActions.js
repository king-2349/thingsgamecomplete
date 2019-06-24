import { SET_PLAYER_INFO, SET_NAME} from './actionTypes';

export function setPlayerInfo(playerInfo) {
    return { type: SET_PLAYER_INFO, payload: playerInfo }
}

export function setName(name) {
    return { type: SET_NAME, payload: name }
}