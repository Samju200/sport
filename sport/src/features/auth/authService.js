import axios from 'axios';
import { useParams } from 'react-router';

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
// const verification = async (userToken) => {
//   const { email, token } = useParams();
//   const response = await axios.get(`confirmation${email}${token}`, userToken);
//   if (response.data) {
//     localStorage.setItem('token', JSON.stringify(response.data));
//     console.log(token);
//   }

//   return response.data.isVerified;
// };
// const resendVerification = async (userData, id) => {
//   const response = await axios.get(`users/${id}resend`, userData);
//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data));
//   }

//   return response.data.isVerified;
// };
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

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,

  getUser,
};

export default authService;
