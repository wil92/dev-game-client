export function fetchInternal(url, options) {
    return fetch(url, options)
        .then(res => {
            if (res.status === 401) {
                return window.location.href = window.location.origin;
            }
            return res;
        });
}
