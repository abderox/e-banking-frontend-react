import * as type from './actionTypes';


export const setMessage = (message) => {
    return {
        type: type.SET_MESSAGE,
        message: message
    }
}

export const clearMessage = () => {
    return {
        type: type.CLEAR_MESSAGE
    }
}