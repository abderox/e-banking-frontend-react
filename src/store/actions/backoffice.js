import * as type from './actionTypes';
import registerClientService from '../../api/auth/backoffice';

const registerClient = (data) => (dispatch) => {
    return registerClientService(data).then(response => {
        dispatch({
            type: type.RESPONSE_POST,
        });
        return Promise.resolve();

    }, error => {
        const message = error.response.data || error;

        dispatch({
            type: type.RESPONSE_POST_FAIL,
        }
        )
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject();


    }
    );
}

const clearCreatedClient = () => {
    return {
        type: type.CLEAR_CREATED_CLIENT,
    }
}


export  { registerClient, clearCreatedClient };