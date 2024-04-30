import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Asegúrate de que la ruta al archivo CSS es correcta
import { useAuth } from '../context/AuthContext';
import logoMunicipal from '../Image/BannerSubasta/LogoMPP.svg'; // Asegúrate de cambiar la ruta al logo

const Navbar = () => {
    const { user, logout } = useAuth(); 
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
        setScrolled(true);
        } else {
        setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    let navbarClasses = ['navbar'];
    if (scrolled) {
        navbarClasses.push('scrolled');
    }
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logoMunicipal} alt="Logo Municipal" />
      </Link>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Inicio</Link>
        <Link to="/informes" className="navbar-item">Informes</Link>
        <Link to="/subasta" className="navbar-item">Subasta</Link>
      </div>
      <div className="navbar-auth">
      {user ? (
                    <>
                        <span>Hola,asdsadsadasd {user.name}</span> {/* Muestra el nombre del usuario */}
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

