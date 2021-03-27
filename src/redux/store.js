import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

import authReducer from "./auth/reducer";
import strategiesReducer from "./strategies/reducer";
import usersReducer from "./users/reducer";
import i18nReducer from "./i18n/reducer";

const reducers = combineReducers({
    auth: authReducer,
    strategies: strategiesReducer,
    users: usersReducer,
    i18n: i18nReducer
});

export default createStore(reducers, applyMiddleware(thunk));
