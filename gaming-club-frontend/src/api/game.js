import axios from 'axios';

const API_URL = 'http://localhost:8080/api/games';

const addGame = (gameData) => {
    return axios.post(API_URL, gameData);
};

const getAllGames = () => {
    return axios.get(API_URL);
};

export default {
    addGame,
    getAllGames,
};