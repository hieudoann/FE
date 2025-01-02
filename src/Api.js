// src/api.js
import axios from 'axios';

const API_URL = 'https://iomt.hoangphucthanh.vn/index.php';

export const register = (username, password) => {
    return axios.post(API_URL, {
        register: true,
        username,
        password,
    });
};

export const login = (username, password) => {
    return axios.post(API_URL, {
        login: true,
        username,
        password,
    });
};

export const fetchSensorData = () => {
    return axios.get(`${API_URL}?latest=true`);
};
