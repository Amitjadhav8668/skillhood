// Environment Configuration
const ENV = {
    development: {
        API_URL: 'http://localhost:5000/api',
        WS_URL: 'ws://localhost:5000'
    },
    production: {
        API_URL: 'https://your-backend.onrender.com/api',
        WS_URL: 'wss://your-backend.onrender.com'
    }
};

const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const config = isDev ? ENV.development : ENV.production;

window.APP_CONFIG = config;
