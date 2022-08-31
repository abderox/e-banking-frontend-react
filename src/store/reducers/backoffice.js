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
        default:
            return state;
    }
}
