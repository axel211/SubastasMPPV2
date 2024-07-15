import React from 'react';
import loginImage from '../Image/Instrucciones/IniciarSesion.png';
import auctionImage from '../Image/Instrucciones/Subasta.png';
import habilitateImage from '../Image/Instrucciones/Habilitar.png';
import voucherImage from '../Image/BannerSubasta/voucher.png';
import '../styles/Habilitate.css';

const Habilitate = () => {
  return (
    <div className="container habilitate-page my-4">
      <h2 className="text-center mb-4">Cómo habilitarse para la subasta</h2>
      <div className="steps">
        <div className="step mb-4">
          <h3>1. Iniciar sesión</h3>
          <p>Inicie sesión con su cuenta de usuario en la plataforma.</p>
          <img src={loginImage} alt="Iniciar sesión" className="img-fluid" />
        </div>
        <div className="step mb-4">
          <h3>2. Depositar garantía de participación</h3>
          <p>Deposite una garantía de participación a nombre de la Municipalidad Provincial de Puno con su número de DNI.</p>
        </div>
        <div className="step mb-4">
          <h3>3. Dirigirse a la subasta que desea participar</h3>
          <p>Seleccione la subasta en la que desea participar.</p>
          <img src={auctionImage} alt="Dirigirse a la subasta" className="img-fluid" />
        </div>
        <div className="step mb-4">
          <h3>4. Hacer clic en "Habilitate"</h3>
          <p>Haga clic en el botón "Habilitate" para continuar.</p>
          <img src={habilitateImage} alt="Hacer clic en Habilitate" className="img-fluid" />
        </div>
        <div className="step mb-4">
          <h3>5. Registrar los datos del voucher</h3>
          <p>Registre los datos del voucher de depósito.</p>
          <img src={voucherImage} alt="Registrar datos del voucher" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Habilitate;
