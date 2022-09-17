import * as type from './actionTypes';

import {
    registerClientService,
    addFirstAccount,
    addOtherAccount,
    getAccountsClient,
    updateAccount_,
    getAllClientsOfAgence,
    editClient
} from '../../api/auth/backoffice';

const registerClient = (data) => (dispatch) => {
    return registerClientService(data).then(response => {
        dispatch({
            type: type.RESPONSE_POST,
        });
        return Promise.resolve(response);

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


const addFirstAccountToClient = (data) => (dispatch) => {
    return addFirstAccount(data).then(response => {
        dispatch({
            type: type.CREATED_SUCCESS,
        });
        return Promise.resolve(response);
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


const clearCreatedRes = () => {
    return {
        type: type.CLEAR_CREATED,
    }
}

const addOtherAccountToClient = (data) => (dispatch) => {
    return addOtherAccount(data).then(response => {
        dispatch({
            type: type.CREATED_SUCCESS,
        });
        return Promise.resolve(response);
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

const getAccountsPerClient = (id, mobile) => (dispatch) => {
    return getAccountsClient(id, mobile).then(response => {
        dispatch({
            type: type.GET_ACCOUNTS_SUCCESS,
            payload: response.data
        });

        return Promise.resolve(response);

    }, error => {

        const message = error.response.data || error;
        dispatch({
            type: type.GET_ACCOUNTS_FAIL,
        }
        )

        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject();

    })
}

const clearDisplayedAccounts = () => {
    return {
        type: type.CLEAR_DISPLAYED_ACCOUNTS,
    }
}


const updateAccount = (data) => (dispatch) => {
    return updateAccount_(data).then(response => {
        dispatch({
            type: type.UPDATE_ACCOUNT_SUCCESS,
        });
        return Promise.resolve(response);
    }, error => {
        const message = error.response.data || error;
        dispatch({
            type: type.UPDATE_ACCOUNT_FAIL,
        });
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    })

}


const clearUpdatedAccount = () => {
    return {
        type: type.CLEAR_UPDATED_ACCOUNT,
    }
}


const getClientsOfAgence = () => (dispatch) => {
    return getAllClientsOfAgence().then(response => {
        dispatch({
            type: type.GET_CLIENTS_SUCCESS,
            payload: response.data
        });
        return Promise.resolve(response);
    }, error => {
        const message = error.response.data || error;
        dispatch({
            type: type.GET_CLIENTS_FAIL,
        });
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        
        return Promise.reject();
    })
}

const editClient_ = (data) => (dispatch) => {
    return editClient(data).then(response => {
        dispatch({
            type: type.EDIT_CLIENT_SUCCESS,
        });
        return Promise.resolve(response);
    }, error => {
        const message = error.response.data || error;
        dispatch({
            type: type.EDIT_CLIENT_FAIL,
        });
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    })

}

const clearEditClientResponse = () => {
    return {
        type: type.CLEAR_EDIT_CLIENT_RESPONSE,
    }
}







export {
    registerClient,
    clearCreatedClient,
    addFirstAccountToClient,
    clearCreatedRes,
    addOtherAccountToClient,
    getAccountsPerClient,
    clearDisplayedAccounts,
    updateAccount,
    clearUpdatedAccount,
    getClientsOfAgence,
    editClient_,
    clearEditClientResponse,
};