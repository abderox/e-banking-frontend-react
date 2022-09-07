import * as type from '../actions/actionTypes';

const initialState = {};
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

        default:
            return state;
    }
}
