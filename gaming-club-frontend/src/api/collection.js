import apiClient from './apiConfig';

const getCollectionsByDate = (date) => {
    return apiClient.get(`/collections?date=${date}`);
};

const collectionService = {
    getCollectionsByDate,
};

export default collectionService;