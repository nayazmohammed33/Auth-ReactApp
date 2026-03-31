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
    const now = new Date();
    const item = {
    value: token,
    expiry: now.getTime() + 5 * 60 * 1000, // 5 minutes
  };
    setToken(token);
    setEmail(email);
    localStorage.setItem("authToken", JSON.stringify(item));
    localStorage.setItem("email", email);

    setTimeout(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    setToken(null);
    setEmail(null);
    console.log("Token expired and cleared");
  }, 5 * 60* 1000);
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

