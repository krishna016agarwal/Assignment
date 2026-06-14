import React,{ createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("np_user") || "null"));
  const [token, setToken] = useState(() => localStorage.getItem("np_token"));
  const [loading, setLoading] = useState(false);

  const saveAuth = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem("np_user", JSON.stringify(payload.user));
    localStorage.setItem("np_token", payload.token);
  };

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    saveAuth(res.data);
    return res.data.user;
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    saveAuth(res.data);
    return res.data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("np_user");
    localStorage.removeItem("np_token");
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await api.get("/auth/me");
        setUser(res.data.user);
        localStorage.setItem("np_user", JSON.stringify(res.data.user));
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const value = useMemo(() => ({ user, token, loading, login, register, logout }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
