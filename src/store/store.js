import { createStore ,applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import thunk from "redux-thunk";
const middleware = [thunk]

export default createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)));
