import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Aquí va la lógica de autenticación
    try {
        const response = await fetch('http://localhost:8080/api/usuarios/autenticar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
  
        const userData = await response.json();
        setUser(userData); // Actualizar el estado con los datos del usuario
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    
  };
  const logout = () => {
    setUser(null) ; 
  }
  const value = {
    user,
    login , 
    logout 
  };



  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
