import * as type from './actionTypes';
import {addBenificiare} from '../../api/client/client.services';


const addBenificiareToClient = (data) => (dispatch) => {
    return addBenificiare(data).then(response => {
        dispatch({
            type: type.CREATED_SUCCESS,
        });
        return Promise.resolve();

    }, error => {
        const message = error.response.data || error;

        dispatch({
            type: type.CREATED_FAIL,
        }
        )
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject();

    })}


export {addBenificiareToClient};