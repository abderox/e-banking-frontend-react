import * as type from '../actions/actionTypes';

const user = JSON.parse(localStorage.getItem('adria-user'));
const initialState = user ?
{isLoggedIn: true,user} : {isLoggedIn: false,user:null};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }
        case type.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        case type.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        default:
            return state;
    }
}