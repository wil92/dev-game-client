export function clearSession() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
}

export function saveUserData(username, token) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
}

export function isAuth() {
    return localStorage.getItem('token') !== null;
}

export function loadUserData() {
    return {
        username: localStorage.getItem('username'),
        token: localStorage.getItem('token')
    };
}
