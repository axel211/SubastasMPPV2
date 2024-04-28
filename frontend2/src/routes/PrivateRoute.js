import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que este es el camino correcto

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Suponiendo que `user` determina si alguien está autenticado

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
