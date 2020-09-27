import {loadUserData} from "../../utils/user-data";
import {fetchInternal} from "../../utils/fetch";
import {getApiUrl} from "../../utils/urls";

export const StrategiesEnum = {
    FETCH_LIST: "FETCH_LIST",
    CODE: "CODE",
    VALIDATE: "VALIDATE",
    STATUS: "STATUS"
};

export function fetchStrategies() {
    return (dispatch) => {
        return fetchInternal(`${getApiUrl()}/strategies`, {headers: {"Authorization": `Bearer ${loadUserData().token}`}})
            .then(res => res.json())
            .then(strategies => dispatch({type: StrategiesEnum.FETCH_LIST, strategies}))
            .catch(console.log);
    };
}

export function activateStrategy(id) {
    return (dispatch) => {
        return fetchInternal(`${getApiUrl()}/strategies/${id}/activate`,
            {
                method: 'POST',
                headers: {"Authorization": `Bearer ${loadUserData().token}`}
            })
            .then(() => fetchStrategies()(dispatch))
            .catch(console.log);
    };
}

export function setCode(code) {
    return (dispatch) => dispatch({type: StrategiesEnum.CODE, code});
}

export function loadDummyCode() {
    return (dispatch) => {
        return fetchInternal(`${getApiUrl()}/strategies/dummy`,
            {headers: {"Authorization": `Bearer ${loadUserData().token}`}})
            .then(req => req.json())
            .then(code => setCode(code)(dispatch))
            .catch(console.log);
    };
}

export function createStrategy(history) {
    return (dispatch, getState) => {
        const code = getState().strategies.code;
        return fetchInternal(`${getApiUrl()}/strategies`,
            {
                method: 'POST',
                headers: {"Authorization": `Bearer ${loadUserData().token}`, 'Content-Type': 'application/json'},
                body: JSON.stringify({code: code.code, name: code.name})
            })
            .then(req => req.json())
            .then(strategy => history.replace(`/strategy/edit/${strategy.id}`))
            .catch(console.log);
    };
}

export function editStrategy(id) {
    return (dispatch, getState) => {
        const code = getState().strategies.code;
        return fetchInternal(`${getApiUrl()}/strategies/${id}`,
            {
                method: 'POST',
                headers: {"Authorization": `Bearer ${loadUserData().token}`, 'Content-Type': 'application/json'},
                body: JSON.stringify({code: code.code, name: code.name})
            })
            .then(req => req.json())
            .then(strategy => dispatch({type: StrategiesEnum.CODE, code: {code: strategy.code, name: strategy.name}}))
            .catch(console.log);
    };
}

export function validateStrategy() {
    return (dispatch, getState) => {
        return fetchInternal(`${getApiUrl()}/strategies/test`,
            {
                method: "POST",
                headers: {"Authorization": `Bearer ${loadUserData().token}`, 'Content-Type': 'application/json'},
                body: JSON.stringify({code: getState().strategies.code.code})
            })
            .then(res => res.json())
            .then(result => dispatch({type: StrategiesEnum.STATUS, result: result}))
            .catch(console.log);
    };
}

export function fetchStrategy(id) {
    return (dispatch) => {
        return fetchInternal(`${getApiUrl()}/strategies/${id}`,
            {headers: {"Authorization": `Bearer ${loadUserData().token}`}})
            .then(req => req.json())
            .then(strategy => dispatch({type: StrategiesEnum.CODE, code: {code: strategy.code, name: strategy.name}}))
            .catch(console.log);
    };
}
