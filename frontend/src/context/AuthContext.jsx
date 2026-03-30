import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUser = async () => {
      try { const { data } = await api.get('/api/users/profile'); setUser(data); } catch (e) { setUser(null); } finally { setLoading(false); }
    };
    loadUser();
  }, []);
  const login = async (email, password) => {
    try { const { data } = await api.post('/api/auth/login', { email, password }); setUser(data); toast.success('Logged in!'); return true; } 
    catch (e) { toast.error(e.response?.data?.message || e.message); return false; }
  };
  const register = async (name, email, password) => {
    try { const { data } = await api.post('/api/auth/register', { name, email, password }); setUser(data); toast.success('Registered!'); return true; } 
    catch (e) { toast.error(e.response?.data?.message || e.message); return false; }
  };
  const logout = async () => { await api.post('/api/auth/logout'); setUser(null); };
  const updateProfile = async (userData) => {
    try { const { data } = await api.put('/api/users/profile', userData); setUser(data); toast.success('Updated!'); return true; } 
    catch (e) { toast.error(e.response?.data?.message || e.message); return false; }
  };
  return <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, setUser }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
