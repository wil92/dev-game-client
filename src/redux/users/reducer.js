import {UsersEnum} from "./actions";

const initialState = {
    list: []
};

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case UsersEnum.FETCH_USER_LIST:
            return {...state, list: action.users};
        case UsersEnum.FETCH_USER:
            return {...state, user: action.user};
        case UsersEnum.FETCH_USER_POINTS:
            return {...state, points: action.points};
        default:
            return state;
    }
}

export default usersReducer;
