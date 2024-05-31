import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuth } from '../context/AuthContext';
import logoMunicipal from '../Image/BannerSubasta/LogoMPP.svg';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importa el ícono de menú de hamburguesa y de cerrar
import axios from 'axios';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del menú en móviles
    const [persona, setPersona] = useState([]); // Inicializar persona como un objeto vacío
    const navigate = useNavigate();

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

    useEffect(() => {
        if (user && user.id) {
            axios.get(`http://localhost:8080/api/usuarios/usuario/${user.id}`)
                .then(response => {
                    setPersona(response.data);
                })
                .catch(error => console.error('Error fetching persona details:', error));
        }
    }, [user]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        toggleMenu(); // Cierra el menú móvil si está abierto
        navigate('/login'); // Redirige a la página de inicio de sesión
    };

    const getFullName = () => {
        if (persona && persona.personaDTO) {
            return `${persona.personaDTO.apellido}, ${persona.personaDTO.nombres}`;
        }
        return 'Usuario';
    };
    
    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="navbar-logo">
                <img src={logoMunicipal} alt="Logo Municipal" />
            </Link>
            <button onClick={toggleMenu} className="navbar-mobile-toggle" aria-label="Toggle navigation">
                {isOpen ? <FaTimes size={24} color="#333" /> : <FaBars size={24} color="#333" />}
            </button>
            <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                <Link to="/" className="navbar-item" onClick={toggleMenu}>Inicio</Link>
                <Link to="/informes" className="navbar-item" onClick={toggleMenu}>Informes</Link>
                <Link to="/subasta" className="navbar-item" onClick={toggleMenu}>Subasta</Link>
            </div>
            <div className="navbar-auth">
                {user ? (
                    <>
                        <span className="navbar-user">Hola, {getFullName()}</span>
                        <Link to="/dashboard" className="navbar-auth-btn" onClick={toggleMenu}>Menú personal</Link>
                        <button onClick={handleLogout} className="btn btn-secondary">Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/registro" className="navbar-auth-btn" onClick={toggleMenu}>Registro</Link>
                        <Link to="/login" className="navbar-auth-btn" onClick={toggleMenu}>Iniciar Sesión</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
