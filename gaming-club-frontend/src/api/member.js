import apiClient from './apiConfig';

const findMemberByPhone = (phone) => {
    return apiClient.get(`/members/${phone}`);
};

const getRechargeHistory = (phone) => {
    return apiClient.get(`/members/${phone}/recharges`);
};

const getPlayedGamesHistory = (phone) => {
    return apiClient.get(`/members/${phone}/transactions`);
};

const playGame = (phone, gameId) => {
    return apiClient.post(`/members/${phone}/play`, { gameId });
}

const memberService = {
    findMemberByPhone,
    getRechargeHistory,
    getPlayedGamesHistory,
    playGame,
};

export default memberService;