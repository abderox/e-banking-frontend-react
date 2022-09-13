/** 
 * @author  https://github.com/abderox
*/

import * as type from '../actions/actionTypes';
import authApi from '../../api/auth/auth.api';

const user = JSON.parse(localStorage.getItem('adria-user'));
const role_client = user ? authApi.extractRoles().includes("ROLE_ACTIVE_CLIENT") : false;
const role_admin = user ? authApi.extractRoles().includes("ROLE_ADMIN") : false;
const initialState = user ?
    {
        isLoggedIn: true,
        user,
        jwtExpired: authApi.NotvalidJwt(),
        isAdmin: role_admin,
        isClient: role_client,
        otp_success: "",
        otp_verified: "",
        update_pass: ""
    }
    : {
        isLoggedIn: false,
        user: null,
        jwtExpired: false,
        isAdmin: false,
        isClient: false,
        otp_success: "",
        otp_verified: "",
        update_pass: ""
    };

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
                isLoggedIn: false,
                isAdmin: false,
                isClient: false,
                jwtExpired: false,
                user: null,
                otp_verified: "",
                otp_success: "",
                update_pass: ""
            }
        case type.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        case type.MISSING_DATA:
            return {
                ...state,
                isLoggedIn: true,
                user: user,
            }
        case type.JWT_EXPIRED:
            return {
                ...state,
                jwtExpired: true,
            }
        case type.IS_ADMIN:
            return {
                ...state,
                isAdmin: true,
            }
        case type.IS_CLIENT:
            return {
                ...state,
                isClient: true,
            }

        case type.SEND_OTP_SUCCESS:
            return {
                ...state,
                otp_success: action.payload,
            }
        case type.SEND_OTP_FAIL:
            return {
                ...state,
                otp_success: "",
            }
        case type.VERIFY_OTP_SUCCESS:
            return {
                ...state,
                otp_verified: action.payload,
            }

        case type.VERIFY_OTP_FAIL:
            return {
                ...state,
                otp_verified: "",
            }

        case type.UPDATE_PASS_SUCCESS:
            return {
                ...state,
                update_pass: action.payload,
            }

        case type.UPDATE_PASS_FAIL:
            return {
                ...state,
                update_pass: "",
            }

        default:
            return state;
    }
}