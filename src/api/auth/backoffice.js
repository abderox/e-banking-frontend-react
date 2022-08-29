/** 
 * @author  https://github.com/abderox
*/

import axios from "axios";
import authHeader from "./auth-header";
import * as ct from "../../utils/constants";
const URL = ct.default;

const sendData = {
    username: "rrrr",
    firstName: "Abdelhadi",
    lastName: "MOUZAFIR",
    email: "abdelhadi45mouzafir@gmail.com",
    password: "abdelhadi",
    telephone: "0602054114",
    rue: "belffa",
    numPieceIdentiteClient: "JH458",
    typepiece: "CIN",
    familystatus: "SINGLE",
    metierClient: "informatic",
    date_birth: "2001-12-02",
    statusProfile: "ACTIVE",
    codeAgence: "0010",
    provincAddress: "Marrakech",
    roles: [
      "ROLE_USER"
    ]
  }

const registerClient = (data) => {
    return axios.post(URL.API_URL_V2 + URL.SIGN_UP_URL_CLIENT, data,  authHeader() );
  };

export default registerClient;