import { socket, connectToGameServer } from '../../socket/GameSocket';
import { setGameInfo } from './gameInfoActions';
import { setPlayerInfo, setName } from './playerInfoActions';
import { goToGame } from '../../Router';

export function newGame(name, history) {
    return (dispatch) => {
        if (socket == null) {
            connectToGameServer(dispatch, history);
        }

        if (socket != null) {
            socket.emit('newGame', name);

            socket.on('addedToGame', (gameInfo, playerInfo) => {
                dispatch(setName(name));
                dispatch(setGameInfo(gameInfo));
                dispatch(setPlayerInfo(playerInfo));
                goToGame(history);
            });
        }
    }
}

export function joinGame(name, gameId, history) {
    return (dispatch) => {
        if (socket == null) {
            connectToGameServer(dispatch, history);
        }

        if (socket != null) {
            socket.emit('joinGame', gameId, name);

            socket.on('addedToGame', (gameInfo, playerInfo) => {
                dispatch(setName(name));
                dispatch(setGameInfo(gameInfo));
                dispatch(setPlayerInfo(playerInfo));
                goToGame(history);
            });

            socket.on('noGameFound', data => {
                console.log("No such game " + data);
            });

            socket.on('nameAlreadyExists', data => {
                console.log("Name " + data + " already exists in the game");
            });
        }
    }
}

export function startRound(gameId) {
    return (dispatch) => {
        socket.emit('startRound', gameId);
    }
}

export function submitTopic(gameId, topic) {
    return (dispatch) => {
        socket.emit('submittedTopic', gameId, topic);
    }
}

export function submitAnswer(gameId, name, answer) {
    return (dispatch) => {
        socket.emit('submittedAnswer', gameId, name, answer);
    }
}

export function submitVote(gameId, name, vote) {
    return (dispatch) => {
        socket.emit('voted', gameId, name, vote);
    }
}

export function backToLobby(gameId) {
    return (dispatch) => {
        socket.emit('backToLobby', gameId);
    }
}