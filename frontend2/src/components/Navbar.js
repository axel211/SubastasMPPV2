import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuth } from '../context/AuthContext';
import logoMunicipal from '../Image/BannerSubasta/LogoMPP.svg';
import { FaBars } from 'react-icons/fa'; // Importa el ícono de menú de hamburguesa

const Navbar = () => {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del menú en móviles

    const handleScroll = () => {
        const offset = window.scrollY;
        setScrolled(offset > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="navbar-logo">
                <img src={logoMunicipal} alt="Logo Municipal" />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="navbar-mobile-toggle">
                <FaBars size={24} color="#333" /> {/* Ajusta el tamaño y el color del ícono */}
            </button>
            <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                <Link to="/" className="navbar-item">Inicio</Link>
                <Link to="/informes" className="navbar-item">Informes</Link>
                <Link to="/subasta" className="navbar-item">Subasta</Link>
            </div>
            <div className="navbar-auth">
                {user ? (
                    <>
                        <span>Hola, {user.name}</span>
                        <Link to="/dashboard" className="navbar-auth-btn">Menú personal</Link>
                        <button onClick={logout} className="btn btn-secondary">Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/registro" className="navbar-auth-btn">Registro</Link>
                        <Link to="/login" className="navbar-auth-btn">Iniciar Sesión</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
