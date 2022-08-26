import axios from "axios";
import authHeader from "./auth-header";
import * as ct from "../../utils/constants";
const URL = ct.default;

const getPublicContent = () => {
  return axios.get(URL.API_URL_V1 + "/test");
};

const getUserBoard = () => {
  return axios.get(URL.API_URL_V2 + "/user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(URL.API_URL_V2 + "", { headers: authHeader() });
};

export default {getAdminBoard, getPublicContent, getUserBoard};