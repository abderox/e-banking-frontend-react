import * as type from './actionTypes';
import AuthApi from '../../api/auth/auth.api';


const login = (username, password, url) => (dispatch) => {
    return AuthApi.login(username, password, url).then((response) => {
        dispatch({
            type: type.LOGIN_SUCCESS,
            payload: response
        });
        return Promise.resolve();
    },
        (error) => {
            const message = error.response.data || error;

            dispatch({
                type: type.LOGIN_FAIL,
            })
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });

            return Promise.reject(error);
        }
    );
}

const logout = (url) => (dispatch) => {
    AuthApi.logout(url);
    dispatch({
        type: type.LOGOUT,
    });
};


const setJwtExpired = () => {
    return {
        type: type.JWT_EXPIRED,
    }
}

const setIsAdmin = () => {
    return {
        type: type.IS_ADMIN,
    }
}
const setIsClient = () => {
    return {
        type: type.IS_CLIENT,
    }
}

const sendOtp = () => (dispatch) => {
    return AuthApi.sendOtp().then((response) => {
        dispatch({
            type: type.SEND_OTP_SUCCESS,
            payload: response.data
        });
        return Promise.resolve();
    },
        (error) => {
            const message = error.response.data || error;
            dispatch({
                type: type.SEND_OTP_FAIL,
            })
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });

            return Promise.reject(error);
        })
}

const verifyOtp = (otp) => (dispatch) => {
    return AuthApi.verifyOtp(otp).then((response) => {
        dispatch({
            type: type.VERIFY_OTP_SUCCESS,
            payload: response.data
        });
        return Promise.resolve();
    },

        (error) => {    
            const message = error.response.data || error;
            dispatch({
                type: type.VERIFY_OTP_FAIL,
            })
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });

            return Promise.reject(error);
        })
}

const  updatePass=(data) => (dispatch)=>{
    return AuthApi.updatePassword(data).then((response) => {
        dispatch({
            type: type.UPDATE_PASS_SUCCESS,
            payload: response.data
        });
        return Promise.resolve();
    }
    ,
    (error) => {
        const message = error.response.data || error;
        dispatch({
            type: type.UPDATE_PASS_FAIL,
        })
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });

        return Promise.reject(error);
    })
}

const reload =
    () => (dispatch) => {
        dispatch({
            type: type.MISSING_DATA,
        });
    }

export {
    login,
    logout,
    reload,
    setJwtExpired,
    setIsAdmin,
    setIsClient,
    sendOtp,
    verifyOtp,
    updatePass
};