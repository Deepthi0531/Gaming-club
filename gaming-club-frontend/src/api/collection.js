
import apiClient from './apiConfig';
const getCollectionsByDate = (date) => {
    // The endpoint might look like /api/collections?date=YYYY-MM-DD
    return apiClient.get(`/collections?date=${date}`);
};

export default {
    getCollectionsByDate,
};