// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axios'; // Usa la instancia configurada de Axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id') ; 
        const rol = localStorage.getItem('rol') ; 
        
        if (token && userId) {
            setUser({ token , id:userId  , rol : rol});
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        console.log("Datos usuario",userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('id' , userData.usuario.id );
        localStorage.setItem('rol' , userData.usuario.rol);
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('rol');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
