import apiClient from './apiConfig';

const rechargeAccount = (phone, amount) => {
    return apiClient.post('/recharges', { phone, amount });
};

const rechargeService = {
    rechargeAccount,
};

export default rechargeService;