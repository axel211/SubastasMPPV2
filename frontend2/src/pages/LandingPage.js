import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import banner from '../Image/BannerSubasta/BanerSubasta.svg';
import registerIcon from '../Image/BannerSubasta/RegisterIcon.svg';
import enableIcon from '../Image/BannerSubasta/HabilitarIcon.svg';
import participateIcon from '../Image/BannerSubasta/ParticipaIcon.svg';

const LandingPage = () => {
  return (
    <div className="container landing-page">
      <header className="header mb-4">
        <div className="row align-items-center">
          <div className='col-md-6 tituloSubasta'>
            <h1>Próxima subasta 12 de Julio del 2024</h1>
            <Link to="/registro" className="btn btn-primary mt-3">Regístrate</Link>
          </div>
          <div className="col-md-6">
            <img src={banner} alt="Banner" className="img-fluid"/>
          </div>
        </div>
      </header>

      <section className="main-section">
        <h2>Regístrate, habilítate y participa</h2>
        <div className="landing-card-container">
          <Link to="/registro" className="landing-card-link">
            <div className="landing-card">
              <h3><img src={registerIcon} alt="Regístrate" className="icon mr-2" /> Regístrate</h3>
              <p>Registra tus datos personales para empezar.</p>
            </div>
          </Link>
          <Link to="/habilitate" className="landing-card-link">
            <div className="landing-card">
              <h3><img src={enableIcon} alt="Habilitate" className="icon mr-2" /> Habilítate</h3>
              <p>Completa los requisitos necesarios para participar en las subastas.</p>
            </div>
          </Link>
          <Link to="/participa" className="landing-card-link">
            <div className="landing-card">
              <h3><img src={participateIcon} alt="Participa" className="icon mr-2" /> Participa</h3>
              <p>Participa en las subastas y consigue grandes ofertas.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
