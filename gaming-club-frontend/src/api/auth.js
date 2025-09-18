import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin'; // Base URL for your backend

const login = (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};

const logout = () => {
    // Depending on your auth, you might clear local storage
    localStorage.removeItem('user');
};

export default {
    login,
    logout,
};