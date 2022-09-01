/** 
 * @author  https://github.com/abderox
*/

import * as type from '../actions/actionTypes';
import authApi from '../../api/auth/auth.api';

const user = JSON.parse(localStorage.getItem('adria-user'));
const role_client = user? authApi.extractRoles().includes("ROLE_CLIENT") : false;
const role_admin = user ?authApi.extractRoles().includes("ROLE_ADMIN") : false;
const initialState = user ?
{isLoggedIn: true,user ,jwtExpired : authApi.NotvalidJwt(),isAdmin: role_admin,isClient: role_client} : {isLoggedIn: false,user:null , jwtExpired : false,isAdmin:false , isClient:false};

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
                isClient: false,
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
        case type.IS_CLIENT :
            return {
                ...state,
                isClient : true,
            }


        default:
            return state;
    }
}