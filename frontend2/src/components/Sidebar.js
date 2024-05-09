import React, { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ user, setActiveMenu, onLogout }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='sidebar'>
            <div className="user-info">
                <img src={user.profilePic || 'default-profile.png'} alt="Perfil" className="profile-pic" />
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.role}</p>
            </div>
            <nav className="menu-options">
                <button onClick={() => setActiveMenu('home')}>Perfil</button>
                <button onClick={() => setActiveMenu('subastas')}>Subastas</button>
                <button onClick={() => setActiveMenu('settings')}>Configuraciones</button>
            </nav>
            <div className="logout-section">
                <button onClick={onLogout} aria-label="Cerrar sesión">
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
