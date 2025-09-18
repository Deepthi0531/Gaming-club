import apiClient from './apiConfig';

const addGame = (gameData) => {
    return apiClient.post('/games', gameData);
};

const getAllGames = () => {
    return apiClient.get('/games');
};

const gameService = {
    addGame,
    getAllGames,
};

export default gameService;