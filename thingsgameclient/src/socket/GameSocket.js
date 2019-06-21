import io from 'socket.io-client';
import { setPlayerInfo } from '../redux/actions/playerInfoActions';
import { setGameInfo } from '../redux/actions/gameInfoActions';

export let socket = null;

export function connectToGameServer(dispatch) {
    socket = io('http://localhost:3001');

    socket.on('connect', () => {
        console.log('Connected');
    });

    socket.on('gameUpdate', (gameInfo) => {
        console.log(gameInfo);
        dispatch(setGameInfo(gameInfo));
        //Put info in store
    })

    socket.on('playersUpdate', (playerInfo) => {
        console.log(playerInfo);
        dispatch(setPlayerInfo(playerInfo));
        //Put info in store
    })
}