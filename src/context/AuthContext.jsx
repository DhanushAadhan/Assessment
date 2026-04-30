import { createContext, useContext, useState, useEffect } from "react";
import { getUser, saveUser, removeUser } from "../utils/localStorage";
import { logActivity } from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const login = (userData) => {
    saveUser(userData);
    setUser(userData);
    logActivity(`${userData.name} logged in`);
  };

  const logout = () => {
    logActivity(`${user?.name} logged out`);
    removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);