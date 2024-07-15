import React from 'react';
import '../styles/Home.css';
import banner from '../Image/BannerSubasta/BanerSubasta.svg';
import registerIcon from '../Image/BannerSubasta/RegisterIcon.svg'
import enableIcon from '../Image/BannerSubasta/HabilitarIcon.svg';
import participateIcon from '../Image/BannerSubasta/ParticipaIcon.svg';

function Home() {
    return (
        <div>
            <div className="container my-4"> 
                <section className="d-flex flex-column flex-md-row align-items-center bg-light p-4 rounded">
                    <div className="info-general text-center text-md-left mb-4 mb-md-0">
                        <h1>Proxima subasta 7 de Junio <br/> del 2024</h1>
                        <button className="btn btn-primary mt-3">Regístrate ahora</button>
                    </div>
                    <div className="banner">
                        <img src={banner} alt="Banner de la Subasta" className="img-fluid" />
                    </div>
                </section>
            </div>
            
            <div className="container my-4">
                <section>
                    <h2 className="text-center mb-4">Regístrate, Habilitate y Participa</h2>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card h-100 text-center">
                                <div className="card-body">
                                    <h3 className="card-title"><img src={registerIcon} alt="Regístrate" className="icon mr-2" /> Regístrate</h3>
                                    <p className="card-text">Detalles sobre cómo registrarse en el sitio.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card h-100 text-center">
                                <div className="card-body">
                                    <h3 className="card-title"><img src={enableIcon} alt="Habilitate" className="icon mr-2" /> Habilitate</h3>
                                    <p className="card-text">Información sobre cómo habilitarse para participar en la subasta.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card h-100 text-center">
                                <div className="card-body">
                                    <h3 className="card-title"><img src={participateIcon} alt="Participa" className="icon mr-2" /> Participa</h3>
                                    <p className="card-text">Explicación de cómo puedes empezar a participar en las subastas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
