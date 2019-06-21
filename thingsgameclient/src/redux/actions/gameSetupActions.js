import { socket, connectToGameServer } from '../../socket/GameSocket';
import { setGameInfo } from './gameInfoActions';
import { goToGame } from '../../Router';

export function newGame(name, history) {
    return (dispatch) => {
        if (socket == null) {
            connectToGameServer(dispatch);
        }

        socket.emit('newGame', name);

        socket.on('newGameResponse', (gameInfo) => {
            dispatch(setGameInfo(gameInfo));
            goToGame(history);
        });
    }
}

export function joinGame(name, gameId, history) {
    return (dispatch) => {
        if (socket == null) {
            connectToGameServer(dispatch);
        }
    
        socket.emit('joinGame', gameId, name);
    
        socket.on('joinGameResponse', (gameInfo) => {
            dispatch(setGameInfo(gameInfo));
            goToGame(history);
        });
    
        socket.on('noGameFound', gameId => {
            console.log("No such game "+gameId);
        });
    }
}