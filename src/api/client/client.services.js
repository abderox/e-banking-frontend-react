
import axios from 'axios';
import * as type from '../../utils/constants';
import authHeader from "../auth/auth-header";
const URL = type.default;

const addBenificiare = (data) => {
    return axios.post(URL.API_URL_V2 + "/add-benificiary", data,  authHeader() );
  };

export  {addBenificiare};