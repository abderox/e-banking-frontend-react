import * as type from './actionTypes';
import AuthApi from '../../api/auth/auth.api';


 const login = (username, password, url) => (dispatch) => {
    return AuthApi.login(username, password, url).then((response) => {
        dispatch({
            type: type.LOGIN_SUCCESS,
            payload: { user: response }
        });
        return Promise.resolve();
    },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

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

export  {login, logout};