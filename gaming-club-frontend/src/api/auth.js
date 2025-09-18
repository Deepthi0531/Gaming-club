import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin';

const login = (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};

const signup = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

const logout = () => {
    localStorage.removeItem('user');
};

export default {
    login,
    signup, 
    logout,
};