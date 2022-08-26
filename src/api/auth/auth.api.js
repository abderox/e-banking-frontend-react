import axios from 'axios';
import * as type from '../../utils/constants';
const URL =type.default;

const login = (email, password, url) => {
    return axios
        .post(URL.AUTH_BASE_URL + url, {
            email,
            password,
        })
        .then((response) => {
            console.log("🚀 ~ file: auth.api.js ~ line 11 ~ .then ~ response", response)
            if (response.data) {
                localStorage.setItem("adria-user", JSON.stringify(response.data.accessToken));
                
            }
            return response.data;
        }

        ).catch((error) => {
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