import {fetchInternal} from "../../utils/fetch";
import {getApiUrl} from "../../utils/urls";

export const UsersEnum = {
    FETCH_USER_LIST: "FETCH_USER_LIST",
};

export function fetchUsers() {
    return (dispatch) => {
        return fetchInternal(`${getApiUrl()}/users`, {})
            .then(res => res.json())
            .then(users => dispatch({type: UsersEnum.FETCH_USER_LIST, users}))
            .catch(console.log);
    };
}
