import {StrategiesEnum} from "./actions";

const initialState = {
    strategies: [],
    code: {
        name: '',
        code: ''
    }
};

function strategiesReducer(state = initialState, action) {
    switch (action.type) {
        case StrategiesEnum.FETCH_LIST:
            return {...state, list: action.strategies};
        case StrategiesEnum.CODE:
            return {...state, code: {...state.code, ...action.code}};
        case StrategiesEnum.STATUS:
            return {...state, result: action.result};
        default:
            return state;
    }
}

export default strategiesReducer;
