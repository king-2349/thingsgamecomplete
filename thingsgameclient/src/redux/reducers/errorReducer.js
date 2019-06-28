import { SET_ERROR } from '../actions/actionTypes';

const defaultErrorList = {
    newGameError:'',
    joinGameError:'',
    lobbyError: ''
};

export default function errorReducer(errorList = defaultErrorList, action) {
    switch (action.type) {
        case SET_ERROR:
            errorList[action.payload.errorId] = action.payload.error;
            return errorList = {...errorList};
        default:
            return errorList;
    }
}