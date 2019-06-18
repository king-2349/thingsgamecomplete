import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { refreshGameState } from '../redux/actions/gameStateActions';

export function useGameConnector() {
    const socket = io('http://localhost');
    const dispatch = useDispatch();

    socket.on('refresh', dispatch(refreshGameState()));
}