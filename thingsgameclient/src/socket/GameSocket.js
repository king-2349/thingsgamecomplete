import io from 'socket.io-client';
import { setPlayerInfo } from '../redux/actions/playerInfoActions';
import { setGameInfo } from '../redux/actions/gameInfoActions';

export let socket = null;

export function connectToGameServer(dispatch) {
    socket = io('http://localhost:3001', { reconnection: false });

    socket.on('connect', () => {
        console.log('Connected');
    });

    socket.on('connect_error', () => {
        socket = null;
        console.log('Failed to connect');
    })

    socket.on('allUpdate', (gameInfo, playerInfo) => {
        console.log('allUpdate event');
        dispatch(setGameInfo(gameInfo));
        dispatch(setPlayerInfo(playerInfo));
    })

    socket.on('gameUpdate', (gameInfo) => {
        console.log('gameUpdate event');
        dispatch(setGameInfo(gameInfo));
    })

    socket.on('playersUpdate', (playerInfo) => {
        console.log('playersUpdate event');
        dispatch(setPlayerInfo(playerInfo));
    })

    socket.on('backendError', (err) => {
        console.log(err);
    })
}