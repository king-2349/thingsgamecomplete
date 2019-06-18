import {SET_NAME} from './actionTypes';

export function setName(name) {
    return { type: SET_NAME, payload: name }
}