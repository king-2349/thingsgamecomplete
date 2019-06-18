import { SET_NAME } from '../actions/actionTypes';

const defaultName = '';

export default function nameReducer(state = defaultName, action) {
    switch (action.type) {
        case SET_NAME:
            return state = action.payload;
        default:
            return state;
    }
};