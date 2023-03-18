import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async (email) => {
    try {
      let email = localStorage.getItem('email');
      email = JSON.parse(email);
      console.log(email);
      const res = await axios.get(`/api/auth/user?email=${email}`);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/login', { email, password });
      setUser(res.data.user);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await axios.post('/api/signup', { email, password });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
