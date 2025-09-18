import axios from 'axios';

// The proxy in package.json will handle the rest.
const apiClient = axios.create({
  baseURL:'http://localhost:8081/api',
});

export default apiClient;