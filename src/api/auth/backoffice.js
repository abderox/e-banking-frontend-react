/** 
 * @author  https://github.com/abderox
*/

import axios from "axios";
import authHeader from "./auth-header";
import * as ct from "../../utils/constants";
const URL = ct.default;



const registerClientService = (data) => {
    return axios.post(URL.API_URL_V2 + URL.SIGN_UP_URL_CLIENT, data,  authHeader() );
  };

export default registerClientService;