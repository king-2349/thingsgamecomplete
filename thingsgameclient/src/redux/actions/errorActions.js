import { SET_ERROR } from './actionTypes';

export function setError(errorId, error) {
    return { type: SET_ERROR, payload: {errorId, error} }
}