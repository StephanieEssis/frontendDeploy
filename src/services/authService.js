import axios from 'axios';

const API_BACKEND = "https://backendlabphase.onrender.com"
const API_URL = `${API_BACKEND}/api/users`;

// Inscription utilisateur
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);
  return response.data;
};

// Connexion utilisateur
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data.token) {
    localStorage.setItem('userToken', response.data.token);
  }

  return response.data;
};

// Déconnexion utilisateur
const logout = () => {
  localStorage.removeItem('userToken');
};

// Récupérer le token stocké
const getToken = () => {
  return localStorage.getItem('userToken');
};

const authService = {
  register,
  login,
  logout,
  getToken,
};

export default authService;
