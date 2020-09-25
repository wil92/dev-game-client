import config from "../config";

export function getApiUrl() {
    let url = config.apiUrl;
    if (!url) {
        url = window.location.origin + "/api";
    }
    return url;
}

export function getWebsocketUrl() {
    let wsUrl = config.wsUrl;
    if (!wsUrl) {
        const protocol = window.location.protocol;
        const wsProtocol = protocol === "http:" ? "ws:" : "wss:";
        wsUrl = window.location.origin.replace(new RegExp(`^${protocol}`, "g"), wsProtocol);
    }
    return wsUrl;
}
