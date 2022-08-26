import axios from 'axios';
import { AUTH_BASE_URL } from '../../utils/constants';

const login = (username, password, url) => {
    return axios
        .post(AUTH_BASE_URL + url, {
            username,
            password,
        })
        .then((response) => {
            console.log("🚀 ~ file: auth.api.js ~ line 11 ~ .then ~ response", response)
            if (response.data.accessToken) {
                localStorage.setItem("adria-user", JSON.stringify(response.data.email));
                
            }
            return response.data;
        }

        ).finally(() => {

            console.log("finally");

        }).catch((error) => {
            console.log("🚀 ~ file: auth.api.js ~ line 21 ~ ).finally ~ error", error)
            return error.response.data;
        }
        );
};


const logout = () => {
    localStorage.removeItem("adria-user");
};

export default {
    login, logout
};     