import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({
    username: '',
  })

  return (
    < AuthContext.Provider value={{ token, setToken, userData, setUserData }} >
      {children}
    </AuthContext.Provider >
  )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
