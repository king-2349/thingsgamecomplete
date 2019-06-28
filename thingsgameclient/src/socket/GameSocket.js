import io from 'socket.io-client';
import { setPlayerInfo } from '../redux/actions/playerInfoActions';
import { setGameInfo } from '../redux/actions/gameInfoActions';
import { setError } from '../redux/actions/errorActions';
import { goToHome } from '../Router';

export let socket = null;

export function connectToGameServer(dispatch, history) {
    socket = io('http://localhost:3001', { reconnection: false });

    socket.on('connect', () => {
        console.log('Connected');
    });

    socket.on('connect_error', () => {
        socket = null;
        console.log('Failed to connect');
    })

    socket.on('allUpdate', (gameInfo, playerInfo) => {
        dispatch(setError('lobbyError', ''));
        dispatch(setGameInfo(gameInfo));
        dispatch(setPlayerInfo(playerInfo));
    })

    socket.on('backendError', (err) => {
        console.log(err);
    })

    socket.on('disconnect', () => {
        socket = null;
        goToHome(history);
    })
}