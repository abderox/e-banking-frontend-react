import * as type from '../actions/actionTypes';

const initialState = { accountsPerClient: [], clients: [] };
export default (state = initialState, action) => {

    switch (action.type) {

        case type.RESPONSE_POST:
            return {
                createdClient: true
            }
        case type.RESPONSE_POST_FAIL:
            return {
                createdClient: false
            }
        case type.CLEAR_CREATED_CLIENT:
            return {
                createdClient: false
            }
        case type.CREATED_SUCCESS:
            return {
                createdSuccess: true
            }
        case type.CREATED_FAIL:
            return {
                createdSuccess: false
            }
        case type.CLEAR_CREATED:
            return {
                createdSuccess: false
            }
        case type.LOGOUT:
            return {
                createdSuccess: false,
                createdClient: false,
                accountsPerClient: []
            }
        case type.GET_ACCOUNTS_SUCCESS:
            return {
                accountsPerClient: action.payload
            }
        case type.GET_ACCOUNTS_FAIL:
            return {
                accountsPerClient: []
            }
        case type.CLEAR_DISPLAYED_ACCOUNTS:
            return {
                accountsPerClient: []
            }
        case type.UPDATE_ACCOUNT_SUCCESS:
            return {
                updatedAccount: true
            }
        case type.UPDATE_ACCOUNT_FAIL:
            return {
                updatedAccount: false
            }
        case type.CLEAR_UPDATED_ACCOUNT:
            return {
                updatedAccount: false
            }
        case type.GET_CLIENTS_SUCCESS:
            return {
                clients: action.payload
            }
        case type.GET_CLIENTS_FAIL:
            return {
                clients: []
            }
        case type.EDIT_CLIENT_SUCCESS:
            return {
                editedClient: true
            }
        case type.EDIT_CLIENT_FAIL:
            return {
                editedClient: false
            }
        case type.CLEAR_EDIT_CLIENT_RESPONSE:
            return {
                editedClient: false
            }

        default:
            return state;
    }
}
