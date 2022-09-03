/** 
 * @author  https://github.com/abderox
*/

import {combineReducers} from 'redux';
import auth from './auth';
import message from './message';
import darkModeReducer from "./darkMode";
import backoffice from "./backoffice";
import frontoffice from "./frontoffice";

const rootReducer = combineReducers({
    auth,
    message,
    darkMode: darkModeReducer,
    backoffice ,
    frontoffice
});

export default rootReducer;