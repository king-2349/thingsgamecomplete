import { SET_GAME_ID } from './actionTypes';
import axios from 'axios';

export function setGameId(gameId) {
    return { type: SET_GAME_ID, payload: gameId }
}

export function createGameId() {
    return (dispatch) => {
        axios.post('http://localhost:3001/game',{}).then((res) => {
            dispatch(setGameId(res.data.gameId));
        }).catch((error) => {
            console.log(error)
        });
    }
}