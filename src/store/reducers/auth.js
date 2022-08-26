import * as type from '../actions/actionTypes';

const user = JSON.parse(localStorage.getItem('adria-user'));
const initialState = user ?
{isAuthenticated: true,user} : {isAuthenticated: false,user:null};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case type.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case type.LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default:
            return state;
    }
}