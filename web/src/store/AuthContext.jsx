import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Check for stored token on mount
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            const storedExpertId = localStorage.getItem('expertId');
            if (storedToken && storedExpertId) {
                setToken(storedToken);
                // Set default axios header for persistent session
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

                // Optionally validate token or fetch user details here
                setUser({ expertId: storedExpertId });
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (expertId, authToken) => {
        localStorage.setItem('token', authToken);
        localStorage.setItem('expertId', expertId);
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        setToken(authToken);
        setUser({ expertId });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expertId');
        delete axios.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
