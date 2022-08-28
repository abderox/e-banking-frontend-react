/** 
 * @author  https://github.com/abderox
*/

import axios from 'axios';
import * as type from '../../utils/constants';
import authHeader from "./auth-header";
const URL = type.default;

const login = (email, password, url) => {
    return axios
        .post(URL.AUTH_BASE_URL + url, {
            email,
            password,
        })
        .then((response) => {
            console.log("🚀 ~ file: auth.api.js ~ line 11 ~ .then ~ response", response)
            if (response.data) {
                localStorage.setItem("adria-user", JSON.stringify(response.data));

            }
            return response.data;
        }
        );
};


const logout = () => {

    axios.get(URL.API_URL_V2 + URL.SIGN_OUT_URL_ADMIN, authHeader()).then(response => {
        if ( response.status === 200 ) {
            localStorage.removeItem("adria-user");
        }
       
    }).catch(error => {
        if(error.toString().includes("401") || error.toString().includes("403")){
            localStorage.removeItem("adria-user");
        }
        });
};

export default {
    login, logout
};     