import axios from 'axios';

const API_URL = 'http://localhost:8080/api/collections';

const getCollectionsByDate = (date) => {
    // The endpoint might look like /api/collections?date=YYYY-MM-DD
    return axios.get(`${API_URL}?date=${date}`);
};

export default {
    getCollectionsByDate,
};