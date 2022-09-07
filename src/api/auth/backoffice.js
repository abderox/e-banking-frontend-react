/** 
 * @author  https://github.com/abderox
*/

import axios from "axios";
import authHeader from "./auth-header";
import * as ct from "../../utils/constants";
const URL = ct.default;



const registerClientService = (data) => {
  return axios.post(URL.API_URL_V2 + URL.SIGN_UP_URL_CLIENT, data, authHeader());
};

const getClientsFoAccounts = async () => {
  return await axios.get(URL.API_URL_V2 + "/get-recent-clients", authHeader());
};

const getAllClientsOfAgence = async () => {
  return await axios.get(URL.API_URL_V2 + "/get-clients-agence", authHeader());
};

const addFirstAccount = (data) => {
  return axios.post(URL.API_URL_V2 + "/add-client-first-account", data, authHeader());
};

const addOtherAccount = (data) => {
  return axios.post(URL.API_URL_V2 + "/add-client-account", data, authHeader());
};

const getAccountsClient = (id,mobile) => {
  let identity = id!='' ? `?identity=${id}` : '';
  let mob = mobile!='' && id===''  ? `?telephone=${mobile}` : '';
  return axios.get(URL.API_URL_V2 + `/get-accounts-client/${mob}${identity}`, authHeader());
};

const updateAccount = (data) => {
  return axios.post(URL.API_URL_V2 + "/update-client-account", data, authHeader());
}

export { registerClientService, getClientsFoAccounts, addFirstAccount, addOtherAccount ,getAllClientsOfAgence,getAccountsClient};