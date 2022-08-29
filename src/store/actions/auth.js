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
                payload:  message 
            });

            return Promise.reject(error);
        }
    );
}

 const logout = () => (dispatch) => {
    AuthApi.logout();
    dispatch({
        type: type.LOGOUT,
    });
};

const reload =
    () => (dispatch) => {
        dispatch({
            type: type.MISSING_DATA,
        });}

export  {login, logout,reload};