import axios from 'axios';

const API_URL = 'http://localhost:8080/api/members';

const createMembership = (memberData) => {
    // You might need to add an auth token here
    // const user = JSON.parse(localStorage.getItem('user'));
    // const config = { headers: { Authorization: `Bearer ${user.token}` } };
    return axios.post(API_URL, memberData);
};

export default {
    createMembership,
};