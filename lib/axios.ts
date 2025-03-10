import axios from 'axios';
import { stageName } from './utils';
import { envConfig } from './config';

const axiosInstance = axios.create({
    baseURL: envConfig[stageName]?.APP_BASE_URL, // Replace with your API base URL
    timeout: 100000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        'X-Client-Id': envConfig[stageName]?.CLIENT_ID,
        'X-Client-Secret': envConfig[stageName]?.CLIENT_SECRET
        // Add any other custom headers here
    },
});

// console.log(envConfig[stageName].CLIENT_ID, stageName, 'here')

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        // Do something before request is sent
        // For example, you can add an authorization token here
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => {
        // Do something with response data
        return response;
    },
    error => {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosInstance;