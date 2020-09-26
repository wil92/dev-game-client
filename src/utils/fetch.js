import {clearSession} from "./user-data";

export function fetchInternal(url, options) {
    return fetch(url, options)
        .then(res => {
            if (res.status === 401) {
                clearSession();
                return window.location.href = window.location.origin;
            }
            return res;
        });
}
