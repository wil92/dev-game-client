import {UsersEnum} from "./actions";

const initialState = {
    list: []
};

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case UsersEnum.FETCH_USER_LIST:
            return {...state, list: action.users};
        default:
            return state;
    }
}

export default usersReducer;
