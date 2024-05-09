import React, { useState } from 'react';
import '../styles/Dashboard.css';
import CardPerfil from './CardPerfil';
import Subasta from './Subasta';
import Sidebar from '../components/Sidebar';


const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('home');
  const userInfo = {
    name: 'Usuario Ejemplo',
    email: 'usuario@example.com',
    role: 'Admin',
    profilePic: 'path-to-your-profile-pic.jpg'
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return <CardPerfil />;
      case 'subastas':
        return <Subasta />;
      case 'settings':
        return <div>Configuraciones del usuario</div>;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    <div className='dashboard'>
        <Sidebar user={userInfo} setActiveMenu={setActiveMenu} />
        <div className="content">
            {renderContent()}
        </div>
    </div>
  );
};

export default Dashboard;
