/** 
 * @author  https://github.com/abderox
*/

import {combineReducers} from 'redux';
import auth from './auth';
import message from './message';
import darkModeReducer from "./darkMode";

const rootReducer = combineReducers({
    auth,
    message,
    darkMode: darkModeReducer,
});

export default rootReducer;