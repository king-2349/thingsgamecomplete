import io from 'socket.io-client';
import { goToGame } from '../Router';

let socket = null;

export function connectToGameServer() {
    socket = io('http://localhost:3001');

    socket.on('connect', () => {
        console.log('Connected');
    });

    socket.on('noGameFound', gameId => {
        console.log("No such game "+gameId);
    });
}

export function startNewGame(name, history) {
    if (socket == null) {
        connectToGameServer();
    }

    socket.emit('newGame', name);

    socket.on('newGameResponse', (data) => {
        goToGame(history);
    });
}

export function joinNewGame(gameId, name, history) {
    if (socket == null) {
        connectToGameServer();
    }

    socket.emit('joinGame', gameId, name);

    socket.on('joinGameResponse', (data) => {
        goToGame(history);
    });
}