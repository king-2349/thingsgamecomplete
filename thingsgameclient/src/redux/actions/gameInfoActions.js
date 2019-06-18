import { SET_GAME_INFO } from './actionTypes';

function setGameInfo(gameInfo) {
    return { type: SET_GAME_INFO, payload: gameInfo }
}

export function refreshGameInfo() {
    return (dispatch) => {
        console.log('hello');
        
        dispatch(setGameInfo({
            gameId:'123457',
            players:[
                {name:'Bob'}
            ],
            gameState:'lobby',
            turn:-1
        }));
    }
}