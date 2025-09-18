import apiClient from './apiConfig';

const login = (username, password) => {
    return apiClient.post('/admin_users/login', { username, password });
};

const signup = (userData) => {
    return apiClient.post('/admin_users/register', userData);
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    login,
    signup,
    logout,
};

export default authService;