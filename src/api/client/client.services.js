
import axios from 'axios';
import * as type from '../../utils/constants';
import authHeader from "../auth/auth-header";
const URL = type.default;

const addBenificiare = (data) => {
  return axios.post(URL.API_URL_V2 + "/add-benificiary", data, authHeader());
};

const getAccounts = () => {
  return axios.get(URL.API_URL_V2 + "/get-accounts-client", authHeader());
};

const getTransactions = () => {
  return axios.get(URL.API_URL_V2 + "/get-transactions-client", authHeader());
};

const getBenificiares = () => {
  return axios.get(URL.API_URL_V2 + "/get-benificiares-client", authHeader());
};

const makeTransfer = (data) => {
  return axios.post(URL.API_URL_V2 + "/make-transfer", data, authHeader());
}

const editBenificiare = (data) => {
  return axios.post(URL.API_URL_V2 + "/edit-benificiary", data, authHeader());
}

export {
  addBenificiare,
  getAccounts,
  getTransactions,
  getBenificiares,
  makeTransfer,
  editBenificiare
};