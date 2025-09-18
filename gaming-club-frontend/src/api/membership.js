import apiClient from './apiConfig';

const createMembership = (memberData) => {
    return apiClient.post('/members', memberData);
};

const membershipService = {
    createMembership,
};

export default membershipService;