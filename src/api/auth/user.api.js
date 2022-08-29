/** 
 * @author  https://github.com/abderox
*/

import axios from "axios";
import authHeader from "./auth-header";
import * as ct from "../../utils/constants";
const URL = ct.default;

const getPublicContent = () => {
  return axios.get(URL.API_URL_V1 + "/test");
};

const getUserBoard = () => {
  return axios.get(URL.API_URL_V2 + "/getAll", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(URL.API_URL_V2 + "", { headers: authHeader() });
};

const registerClient = (data) => {
  return axios.post(URL.API_URL_V2 + "", { headers: authHeader() ,data});
};

export default {getAdminBoard, getPublicContent, getUserBoard};