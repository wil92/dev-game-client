import {fetchInternal} from "../../utils/fetch";
import {getApiUrl} from "../../utils/urls";

export const UsersEnum = {
    FETCH_USER_LIST: "FETCH_USER_LIST",
    FETCH_USER: "FETCH_USER",
    FETCH_USER_POINTS: "FETCH_USER_POINTS",
};

export function fetchUsers() {
    return (dispatch) => {
        return fetchInternal(`${getApiUrl()}/users`, {})
            .then(res => res.json())
            .then(users => dispatch({type: UsersEnum.FETCH_USER_LIST, users}))
            .catch(console.log);
    };
}

export function fetchUser(username) {
    return (dispatch) => {
        return fetchInternal(`${getApiUrl()}/users/by_username/${username}`, {})
            .then(res => res.json())
            .then(user => {
                dispatch({type: UsersEnum.FETCH_USER, user});
                return fetchPointsByUser(user._id)(dispatch);
            })
            .catch(console.log);
    };
}

export function fetchPointsByUser(userId) {
    return (dispatch) => {
        return fetchInternal(`${getApiUrl()}/users/points/${userId}`, {})
            .then(res => res.json())
            .then(points => dispatch({type: UsersEnum.FETCH_USER_POINTS, points: points.reverse()}))
            .catch(console.log);
    };
}
