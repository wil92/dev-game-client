import {AuthEnum} from "./actions";
import {loadUserData} from "../../utils/user-data";

function authReducer(state = loadUserData(), action) {
    switch (action.type) {
        case AuthEnum.LOGIN:
            return {...state, ...action.userData};
        case AuthEnum.LOGOUT:
            const newState = {...state};
            delete newState.token;
            delete newState.username;
            return newState;
        default:
            return state;
    }
}

export default authReducer;
