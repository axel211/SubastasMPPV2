import React from 'react';
import '../styles/LandingPage.css'; // Importa tus estilos
import banner from '../Image/BannerSubasta/BanerSubasta.svg'
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <div>
      <div className="container"> {/* Contenedor para el contenido central */}
        <header className="header">
          <div className='tituloSubasta'>
          <h1>Próxima subasta 23 de Marzo del 2024</h1>
          <Link to="/registro" className="navbar-auth-btn boton-registrate" >Registrate</Link>
          </div>
          
          <img src={banner} alt="Banner" className="banner"/>
        </header>
        
        <section className="main-section">
          <h2>Regístrate, habilitate y participa</h2>
          <div className="card-container">
            <div className="card">
              <h3>Regístrate</h3>
              <p>Registra tus datos básicos para empezar.</p>
            </div>
            <div className="card">
              <h3>Habilitate</h3>
              <p>Completa los requisitos necesarios para participar en las subastas.</p>
            </div>
            <div className="card">
              <h3>Participa</h3>
              <p>Participa en las subastas y consigue grandes ofertas.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
