import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import banner from '../Image/BannerSubasta/BanerSubasta.svg';

const LandingPage = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className='tituloSubasta'>
            <h1>Próxima subasta 23 de Marzo del 2024</h1>
            <Link to="/registro" className="navbar-auth-btn boton-registrate">Regístrate</Link>
          </div>
          <img src={banner} alt="Banner" className="banner"/>
        </div>
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
  );
};

export default LandingPage;
