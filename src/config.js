const dev = {
    apiUrl: "http://localhost:3001",
    wsUrl: "ws://localhost:3002"
};

const docker = {
    apiUrl: null,
    wsUrl: null
};

const config = process.env.NODE_ENV === 'docker'
    ? docker
    : dev;

export default {
    ...config
};
