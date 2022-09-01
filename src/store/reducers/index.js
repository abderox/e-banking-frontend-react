/** 
 * @author  https://github.com/abderox
*/

import {combineReducers} from 'redux';
import auth from './auth';
import message from './message';
import darkModeReducer from "./darkMode";
import backoffice from "./backoffice";

const rootReducer = combineReducers({
    auth,
    message,
    darkMode: darkModeReducer,
    backoffice 
});

export default rootReducer;