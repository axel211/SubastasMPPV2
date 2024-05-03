import React, { useState } from 'react';
import '../styles/Dashboard.css'; // Asegúrate de importar tus estilos
import CardPerfil from './CardPerfil';
import Subasta from './Subasta';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('home'); // Estado para manejar qué menú está activo

  const userInfo = {
    name: 'Usuario Ejemplo',
    email: 'usuario@example.com',
    role: 'Admin',
    profilePic: 'path-to-your-profile-pic.jpg' // Asegúrate de reemplazar esto con el path real
  };

  return (
    <div className='container'>
            <div className="dashboard">
        <div className="sidebar">
            <div className="user-info">
            <img src={userInfo.profilePic} alt="Profile" className="profile-pic" />
            <h3>{userInfo.name}</h3>
            <p>{userInfo.email}</p>
            <p>{userInfo.role}</p>
            </div>
            <div className="menu-options">
            <button onClick={() => setActiveMenu('home')}>Perfil</button>
            <button onClick={() => setActiveMenu('subastas')}>Subastas</button>
            <button onClick={() => setActiveMenu('settings')}>Configuraciones</button>
            </div>
        </div>
        <div className="content">
            {activeMenu === 'home' && <div><CardPerfil/></div>}
            {activeMenu === 'subastas' && <div><Subasta/></div>}
            {activeMenu === 'settings' && <div>Configuraciones del usuario</div>}
        </div>
        </div>
    </div>
    
  );
};

export default Dashboard;
