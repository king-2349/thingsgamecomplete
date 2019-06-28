import { socket } from './socket/GameSocket';

export function goToHome(history){
    if(socket != null){
        socket.emit('leaveGame');
    }
    history.push('/');
}

export function goToNewGameOptions(history){
    history.push('/newGame');
}

export function goToJoinGameOptions(history){
    history.push('/joinGame');
}

export function goToGame(history){
    history.push('/game');
}