import {clearSession, saveUserData} from "../../utils/user-data";

export const AuthEnum = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

export function logInAction(userData) {
    saveUserData(userData.username, userData.token);
    return {
        type: AuthEnum.LOGIN,
        userData
    }
}

export function logOutAction() {
    clearSession();
    return {type: AuthEnum.LOGOUT}
}
