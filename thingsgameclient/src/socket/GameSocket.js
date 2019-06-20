import io from 'socket.io-client';
import { goToGame } from '../Router';

let socket = null;

export function connectToGameServer() {
    socket = io('http://localhost:3001');

    socket.on('connect', ()=>{
        console.log('Connected');
    });
}

export function startNewGame(history){
    socket.emit('newGame');

    socket.on('newGameResponse', (gameId) => {
        console.log('New game with id '+gameId+' created');
        goToGame(history);
    });
}

export function joinNewGame(history){
    socket.emit('newGame');

    socket.on('newGameResponse', (gameId) => {
        console.log('New game with id '+gameId+' created');
        goToGame(history);
    });
}