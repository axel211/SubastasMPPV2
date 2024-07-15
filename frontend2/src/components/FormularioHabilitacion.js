import React, { useState } from 'react';
import '../styles/FormularioHabilitacion.css';
import voucher from '../Image/BannerSubasta/voucher.png';

const FormularioHabilitacion = ({ subastaNombre, subastaId, userId }) => {
    const [fecha, setFecha] = useState('');
    const [monto, setMonto] = useState('');
    const [dni, setDni] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            idSubasta: subastaId,
            idUsuario: userId,
            dni: dni,
            fechaVoucher: fecha,
            monto: monto,
        };
        
        try {
            const response = await fetch('http://localhost:8080/api/participantes/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                setMensaje('Solicitud registrada exitosamente');
                setIsSuccess(true);
            } else if (response.status === 409) {
                setMensaje('El usuario ya tiene una solicitud en curso');
                setIsSuccess(false);
            } else {
                const result = await response.json();
                setMensaje(`Error: ${result.message}`);
                setIsSuccess(false);
            }
        } catch (error) {
            setMensaje(`Error: No se pudo registrar la solicitud`);
            setIsSuccess(false);
        }
    };

    return (
        <div className="formulario-habilitacion">
            <div className="form-content">
                <div className="form-left">
                    <h3 className="voucher-title">Voucher de garantía</h3>
                    {mensaje && <p className={isSuccess ? 'success-message' : ''}>{mensaje}</p>}
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
