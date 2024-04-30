import React from 'react';

import '../styles/Home.css'
import banner from '../Image/BannerSubasta/BanerSubasta.svg'
function Home() {
    return (
        <div>
            <div className='container'> 
            <section className="subasta-container">
                <div className="info-general">
                <h1>Proxima subasta 7 de Junio <br/> del 2024</h1>
                <button className='boton-registro'>Registrate ahora</button>
                </div>
                <div className="banner">
                <img src={banner} alt="Banner de la Subasta" />
                </div>
            </section>
          </div>
          
          <div className='container'>
            <section className="participa-seccion">
                <h2>Regístrate, Habilitate y Participa</h2>
                <div className="cards-container">
                <div className="card">
                    <h3>Regístrate</h3>
                    <p>Detalles sobre cómo registrarse en el sitio.</p>
                </div>
                <div className="card">
                    <h3>Habilitate</h3>
                    <p>Información sobre cómo habilitarse para participar en la subasta.</p>
                </div>
                <div className="card">
                    <h3>Participa</h3>
                    <p>Explicación de cómo puedes empezar a participar en las subastas.</p>
                </div>
                </div>
            </section>
          </div>
        </div>
      );
}

export default Home;
