import React, { useState } from 'react';
import '../styles/Dashboard.css';
import CardPerfil from './CardPerfil';
import Subasta from './Subasta';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import HistorialSubastas from '../components/HistorialSubastas';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [persona, setPersona] = useState([]); // Inicializar persona como un objeto vacío
  const [activeMenu, setActiveMenu] = useState('home');
  const userInfo = {
    name: 'Usuario Ejemplo',
    email: 'usuario@example.com',
    role: 'Admin',
    profilePic: 'path-to-your-profile-pic.jpg'
  };
  
  useEffect(() => {
    if (user) {
        console.log(user)
        axios.get(`http://localhost:8080/api/usuarios/usuario/${user.id}`)
            .then(response => {
                setPersona(response.data);
            })
            .catch(error => console.error('Error fetching persona details:', error));
    }
}, [user]);

console.log(persona)
  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return <CardPerfil />;
      case 'subastas':
        return <Subasta />;
      case 'settings':
        return <div>Configuraciones del usuario</div>;
      case 'subastasHistorial' :
        return  <HistorialSubastas idUsuario={user.id} />
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    
    <div className='dashboard'>
        <Sidebar user={persona} setActiveMenu={setActiveMenu} />
        <div className="content">
            {renderContent()}
        </div>
    </div>
  );
};

export default Dashboard;
