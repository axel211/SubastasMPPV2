import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaGavel, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Importar íconos de react-icons
import '../styles/Sidebar.css';
import axios from 'axios';
import profile from '../Image/BannerSubasta/profile.svg'
const Sidebar = ({ user, setActiveMenu }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const getFullName = () => {
        if (user && user.personaDTO) {
            return `${user.personaDTO.apellido}, ${user.personaDTO.nombres}`;
        }
        return 'Usuario';
    };
    
    const getRol = () => {
        if (user && user.personaDTO) {
            return `${user.usuarioDTO.rol}`;
        }
        return 'Rol';
    }

    
    const getEmail = () => {
        if (user && user.personaDTO) {
            return `${user.usuarioDTO.email}`;
        }
        return 'example@gmail.com';
    }

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
            </button>
            <div className="user-info">
                <img src={profile} alt="Perfil" className="profile-pic" />
                <h3>{getFullName()}</h3>
                <p>{getRol()}</p>
                <p>{getEmail()}</p>
            </div>
            <nav className="menu-options">
                <button onClick={() => setActiveMenu('home')}>
                    <FaUser className="icon" />
                    <span className="menu-text">Perfil</span>
                </button>
                <button onClick={() => setActiveMenu('subastas')}>
                    <FaGavel className="icon" />
                    <span className="menu-text">Subastas</span>
                </button>
                <button onClick={() => setActiveMenu('settings')}>
                    <FaCog className="icon" />
                    <span className="menu-text">Configuraciones</span>
                </button>
            </nav>
            <div className="logout-section">
                <button onClick={handleLogout} aria-label="Cerrar sesión">
                    <FaSignOutAlt className="icon" />
                    <span className="menu-text">Cerrar sesión</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
