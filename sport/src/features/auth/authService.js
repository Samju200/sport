import axios from 'axios';

const API_URL_REGISTER = '/users/signup';
const API_URL_LOGIN = '/users/login';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL_REGISTER, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// verify
const verification = async (userData, email, token) => {
  const response = await axios.get(`confirmation${email}${token}`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data.isVerified;
};
const resendVerification = async (userData, id) => {
  const response = await axios.get(`users/${id}resend`, userData);
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
// get user
const getUser = async (userData, id) => {
  const response = await axios.get(`/users/${id}`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data.isVerified;
};
const getToken = async (userData, id) => {
  const response = await axios.get(`/${id}/token`, userData);
  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }

  return response.data.isVerified;
};
// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
  verification,
  getUser,
  resendVerification,
  getToken,
};

export default authService;
