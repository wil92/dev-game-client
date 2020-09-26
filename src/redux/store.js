import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

import authReducer from "./auth/reducer";
import strategiesReducer from "./strategies/reducer";

const reducers = combineReducers({auth: authReducer, strategies: strategiesReducer})
export default createStore(reducers, applyMiddleware(thunk));
