import * as type from './actionTypes';
import {
    addBenificiare,
    getAccounts,
    getTransactions,
    getBenificiares,
    makeTransfer,
    editBenificiare
} from '../../api/client/client.services';
import AuthApi from '../../api/auth/auth.api';



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

    })
}

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

    })
}


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

    })
}


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

    })
}

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

    })
}

const editBenificiare_ = (data) => (dispatch) => {
    return editBenificiare(data).then(response => {
        dispatch({
            type: type.EDIT_SUCCESS,
        });
        return Promise.resolve();

    }, error => {
        const message = error.response.data || error;

        dispatch({
            type: type.EDIT_FAIL,
        })
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject();

    })
}


const cleartransferCreated = () => {
    return {
        type: type.CLEAR_TRANSFER_CREATED
    }
}

const clearAll = () => {
    return {
        type: type.CLEAR_ALL
    }
}

const sendOtpTransfer = () => (dispatch) => {
    return AuthApi.sendOtp().then((response) => {
        dispatch({
            type: type.SEND_OTP_TRANSFER_SUCCESS,
            payload: response.data
        });
        return Promise.resolve();
    },
        (error) => {
            const message = error.response.data || error;
            dispatch({
                type: type.SEND_OTP_TRANSFER_FAIL,
            })
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });

            return Promise.reject(error);
        })
}

const verifyOtpTransfer = (otp) => (dispatch) => {
    return AuthApi.verifyOtp(otp).then((response) => {
        dispatch({
            type: type.VERIFY_OTP_TRANSFER_SUCCESS,
            payload: response.data
        });
        return Promise.resolve();
    },

        (error) => {    
            const message = error.response.data || error;
            dispatch({
                type: type.VERIFY_OTP_TRANSFER_FAIL,
            })
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });

            return Promise.reject(error);
        })
}

const clearOtpResponse = () => {
    return {
        type: type.CLEAR_OTP_RESPONSE
    }
}




export {
    addBenificiareToClient,
    getAccountsClient,
    getTransactionsClient,
    getBenificiaresClient,
    makeTransferTo,
    cleartransferCreated,
    editBenificiare_,
    clearAll,
    sendOtpTransfer,
    verifyOtpTransfer,
    clearOtpResponse
};