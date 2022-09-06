import * as type from './actionTypes';
import {addBenificiare,getAccounts,getTransactions,getBenificiares, makeTransfer} from '../../api/client/client.services';


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

const getAccountsClient = () => (dispatch) => {
    return getAccounts().then(response => {
        dispatch({
            type: type.GET_SUCCESS,
            payload: response.data
        });
      
        return Promise.resolve(response);

    }, error => {
        const message = error.response.data || error;

        dispatch({
            type: type.GET_FAIL,
        }
        )
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject();

    })}


const getTransactionsClient = () => (dispatch) => {
    return getTransactions().then(response => {
        dispatch({
            type: type.GET_SUCCESS_TRANSACTIONS,
            payload: response.data
        });

        return Promise.resolve(response);

    }, error => {

        const message = error.response.data || error;

        dispatch({
            type: type.GET_FAIL_TRANSACTIONS,
        }
        )
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject();

    })}


const getBenificiaresClient = () => (dispatch) => {
    return getBenificiares().then(response => {
        dispatch({
            type: type.GET_SUCCESS_BENIFICIARIES,
            payload: response.data
        });

        return Promise.resolve(response);

    }, error => {

        const message = error.response.data || error;

        dispatch({
            type: type.GET_FAIL_BENIFICIARIES,
        }
        )
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject();

    })}

const makeTransferTo = (data) => (dispatch) => {
    return makeTransfer(data).then(response => {
        dispatch({
            type: type.TRANSFER_SUCCESS,
        });
        return Promise.resolve();

    }, error => {
        const message = error.response.data || error;

        dispatch({
            type: type.TRANSFER_FAIL,
        }
        )
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject();

    })} 


    const cleartransferCreated = ()=>{
        return{
            type:type.CLEAR_TRANSFER_CREATED
        }
    }




export {addBenificiareToClient,getAccountsClient,getTransactionsClient,getBenificiaresClient,makeTransferTo,cleartransferCreated};