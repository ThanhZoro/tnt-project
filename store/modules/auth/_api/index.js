import axios from 'axios';
const login = async (request) => await axios.post(`${window.location.origin}/api/login`, request);
const logout = async (request) => await axios.post(`${window.location.origin}/api/logout`);

export default {
  login,
  logout
};
