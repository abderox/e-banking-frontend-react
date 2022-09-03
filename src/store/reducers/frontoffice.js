import * as type from '../actions/actionTypes';

const initialState = {accountsClient : []};

export default (state = initialState, action) => {
    
        switch (action.type) {
            
            case type.GET_SUCCESS:
                return {
                    accountsClient: action.payload
                }
            case type.GET_FAIL:
                return {
                    accountsClient: [],
                }
                
            default:
                return state;
        }
    }