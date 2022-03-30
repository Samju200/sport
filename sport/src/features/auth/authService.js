import axios from 'axios';

const API_URL_REGISTER = '/users/signup';
const API_URL_LOGIN = '/users/login';
const API_URL_VERIFICATION = '/users//confirmation/:email/{userData.token}';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL_REGISTER, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};
// verify
const verification = async (userData) => {
  const response = await axios.get(API_URL_VERIFICATION, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data.isVerified;
};
// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
