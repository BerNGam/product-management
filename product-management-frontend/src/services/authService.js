import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + 'login', { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('AuthService login error:', error);
    throw error;
  }
};

const signup = async (email, password) => {
  try {
    const response = await axios.post(API_URL + 'signup', { email, password });
    return response.data;
  } catch (error) {
    console.error('AuthService signup error:', error);
    if (error.response && error.response.data) {
      return { error: error.response.data.error }; // Retourner l'erreur spécifique à gérer dans le frontend
    }
    throw error;
  }
};




const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  login,
  signup,
  logout,
  getCurrentUser,
};

export default authService;
