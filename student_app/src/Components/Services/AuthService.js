import axios from 'axios';
const API_URL = "http://localhost:4444";

// Optional: Setup an Axios interceptor to automatically attach the token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const AuthService = {
  login: async (UserId, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        UserId,
        password,
      });

      // If login is successful, store the token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Optional
        return response.data;
      }

      throw new Error('Login failed'); // Handle case where token is not present
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during login';
      throw new Error(errorMessage); // Propagate the error message
    }
  },

  logout: () => {
    localStorage.removeItem('token'); // Clear the token on logout
  },
};

export default AuthService;

