import React, { useState } from 'react';
import '../styles/FormularioHabilitacion.css';
import voucher from '../Image/BannerSubasta/voucher.png'
const FormularioHabilitacion = ({ subastaNombre }) => {
    const [fecha, setFecha] = useState('');
    const [monto, setMonto] = useState('');
    const [dni, setDni] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para manejar el envío del formulario
        console.log('Voucher de garantía:', { fecha, monto, dni });
    };

    return (
        <div className="formulario-habilitacion">
            <div className="form-content">
                <div className="form-left">
                    <h3 className="voucher-title">Voucher de garantía</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha</label>
                            <input
                                type="date"
                                id="fecha"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="monto">Monto</label>
                            <input
                                type="number"
                                id="monto"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dni">DNI</label>
                            <input
                                type="text"
                                id="dni"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                required
                            />
                            <label htmlFor="terms">Acepto los términos y condiciones</label>
                        </div>
                        <button type="submit" className="submit-button" disabled={!acceptedTerms}>Enviar</button>
                    </form>
                </div>
                <div className="form-right">
                    <img src={voucher} alt="Imagen de referencia" className="reference-image" />
                </div>
            </div>
        </div>
    );
};

export default FormularioHabilitacion;
