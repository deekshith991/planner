import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jsonwebtoken';

const useTokenRedirect = () => {
  const navigate = useNavigate();

  const redirectIfValidToken = (path) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode.decode(token); // Decode the token
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        // Check if token is valid
        if (decodedToken.exp > currentTime) {
          navigate(path); // Redirect to the specified path
          return; // Exit the function after redirecting
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }

    // Do not redirect if token is invalid or not present
  };

  return redirectIfValidToken;
};

export default useTokenRedirect;

