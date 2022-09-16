/** 
 * @author  https://github.com/abderox
*/

import axios from 'axios';
import * as type from '../../utils/constants';
import authHeader from "./auth-header";
const URL = type.default;


const getDatafromIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    const toString = JSON.stringify(res.data, null, 2)
    const toObject = JSON.parse(toString)
    return toObject['country_name'] + "," + toObject['IPv4']
  }


const userAgent = () => {
    const agentInfo = window.navigator.userAgent.split(" ");
    return axios.get('https://geolocation-db.com/json/').then(res => {
        console.log(agentInfo[agentInfo.length - 1] +"," + res.data.country_name + "," + res.data.IPv4);
        return agentInfo[agentInfo.length - 1] +"," + res.data.country_name + "," + res.data.IPv4;
    })
}


const login = (email, password,agent, url) => {
    return axios
        .post(URL.AUTH_BASE_URL + url, {
            email,
            password,
            agent 
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


const logout = (url) => {

    axios.get(URL.API_URL_V2 + url, authHeader()).then(response => {
        if (response.status === 200) {
            localStorage.removeItem("adria-user");
            console.log("Successfully logged out");
        }

    }).catch(error => {
        if (error.toString().includes("401") || error.toString().includes("403")) {
            localStorage.removeItem("adria-user");
        }
    });
};


const NotvalidJwt = () => {
    const user = JSON.parse(localStorage.getItem("adria-user"));
    if (user) {
        const decodedJwt = parseJwt(user.accessToken);
        return (decodedJwt.exp * 1000 < Date.now())

    }
    return true;
}

const updatePassword = (data) => {
    return axios.post(URL.API_URL_V2 + URL.UPDATE_PASSWORD, data, authHeader());
}

const sendOtp = () => {
    return axios.get(URL.API_URL_V2 + URL.SEND_OTP, authHeader());
}

const verifyOtp = (data) => {
    return axios.post(URL.API_URL_V2 + URL.VERIFY_OTP, data, authHeader());
}

const extractRoles = () => {
    const user = JSON.parse(localStorage.getItem("adria-user"));
    if (user) {
        const decodedJwt = parseJwt(user.accessToken);
        return decodedJwt.roles;

    }
    return "null";
}


const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};




export default {
    login,
    logout,
    NotvalidJwt,
    extractRoles,
    updatePassword,
    sendOtp,
    verifyOtp,
    userAgent,
};     