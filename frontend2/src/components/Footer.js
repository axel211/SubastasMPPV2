import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img src="logo.png" alt="Logo" className="footer-logo"/>
        </div>
        <div className="footer-section">
          <h4>Últimas subastas</h4>
          <ul>
            <li><a href="#">Ver subastas</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Envíanos un correo electrónico a:</p>
          <a href="mailto:alcaldia@munipuno.gob.pe">alcaldia@munipuno.gob.pe</a>
        </div>
        <div className="footer-section">
          <h4>Horario de atención</h4>
          <p>Lunes a Viernes:</p>
          <ul>
            <li>Mañana: 08:00 am a 12:45 pm</li>
            <li>Tarde: 01:45 pm a 04:00 pm</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Municipalidad Provincial de Puno</p>
      </div>
    </footer>
  );
}

export default Footer;
