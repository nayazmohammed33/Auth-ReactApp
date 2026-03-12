import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({
  token: null,
  email: null,
  login: (token, name, email) => {},
  logout: () => {},
  changePassword: (token, password) => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const login = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

