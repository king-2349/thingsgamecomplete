import { SET_GAME_INFO } from './actionTypes';

export function setGameInfo(gameInfo) {
    return { type: SET_GAME_INFO, payload: gameInfo }
}