/** 
 * @author  https://github.com/abderox
*/

import * as type from '../actions/actionTypes';
import authApi from '../../api/auth/auth.api';

const user = JSON.parse(localStorage.getItem('adria-user'));
const initialState = user ?
{isLoggedIn: true,user ,jwtExpired : authApi.NotvalidJwt(),isAdmin : false} : {isLoggedIn: false,user:null , jwtExpired : false,isAdmin:false};

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
                isAdmin: false,
                jwtExpired: false,
                user: null
            }
        case type.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        case type.MISSING_DATA :
            return {
                ...state,
                isLoggedIn:true,
                user : user,
            }
        case type.JWT_EXPIRED :
            return {
                ...state,
                jwtExpired : true,
            }
        case type.IS_ADMIN :
            return {
                ...state,
                isAdmin : true,
            }


        default:
            return state;
    }
}