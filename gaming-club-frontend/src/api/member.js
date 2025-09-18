import axios from 'axios';

const API_URL = 'http://localhost:8080/api/members';

const findMemberByPhone = (phone) => {
    return axios.get(`${API_URL}/${phone}`);
};

const getRechargeHistory = (phone) => {
    return axios.get(`${API_URL}/${phone}/recharges`);
};

const getPlayedGamesHistory = (phone) => {
    return axios.get(`${API_URL}/${phone}/transactions`);
};

const playGame = (phone, gameId) => {
    return axios.post(`${API_URL}/${phone}/play`, { gameId });
}

export default {
    findMemberByPhone,
    getRechargeHistory,
    getPlayedGamesHistory,
    playGame,
};