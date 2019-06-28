import { socket, connectToGameServer } from '../../socket/GameSocket';
import { setGameInfo } from './gameInfoActions';
import { setPlayerInfo, setName } from './playerInfoActions';
import { setError } from './errorActions';
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
                dispatch(setError('lobbyError', ''));
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
                dispatch(setError('lobbyError', ''));
            });

            socket.on('noGameFound', data => {
                dispatch(setError('joinGameError', 'Game ' + gameId + ' not found'));
            });

            socket.on('nameAlreadyExists', data => {
                dispatch(setError('joinGameError', 'Name ' + name + ' already exists in the game'));
            });

            socket.on('gameInProgress', data => {
                dispatch(setError('joinGameError', 'Game ' + gameId + ' already in progress. Wait until they\'re in the lobby'));
            });
        }
    }
}

export function startRound(gameId) {
    return (dispatch) => {
        socket.emit('startRound', gameId);

        socket.on('notEnoughPlayers', data => {
            dispatch(setError('lobbyError', 'Need at least 3 people to start game. You only have '+data));
        })
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