import React from 'react';
import '../styles/Footer.css'
const Footer = () => {
  return (

<footer class="footer">
  <div class="footer-content">
    <div class="footer-section">
      <img src="logo.png" alt="Logo" class="footer-logo"/>
    </div>
    <div class="footer-section">
      <h4>Ultimas subastas</h4>
      <ul>
        <li><a href="#">Ver subastas</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h4>Contacto</h4>
      <p>Envíanos un correo electrónico a:</p>
      <a href="mailto:alcaldia@munipuno.gob.pe">alcaldia@munipuno.gob.pe</a>
    </div>
    <div class="footer-section">
      <h4>Horario de atencion</h4>
      <p>Lunes a Viernes: </p>
      <ul>
        <li>Mañana: 08:00 am a 12:45 pm</li>
        <li>Tarde: 01:45 pm a 04:00 pm</li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© Municipalidad Provincial de Puno</p>
  </div>
</footer>


  );
}

export default Footer;
