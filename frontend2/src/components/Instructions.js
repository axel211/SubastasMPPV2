import React from 'react';
import { Card, Container } from 'react-bootstrap';
import '../styles/Instructions.css'; // Importa el archivo CSS

const Instructions = () => {
    return (
        <Container className="">
            <Card className="instructions-card">
                <Card.Body>
                    <h2 className="text-center mb-4">Instrucciones para realizar ofertas</h2>
                    <ol>
                        <li>
                            <strong>Registro:</strong> Debes estar registrado e iniciar sesión en el sistema.
                        </li>
                        <li>
                            <strong>Seleccionar Subasta:</strong> Navega a través de las subastas disponibles y selecciona la subasta en la que deseas participar.
                        </li>
                        <li>
                            <strong>Revisar Detalles:</strong> Lee atentamente los detalles de la subasta, incluyendo las condiciones y los términos.
                        </li>
                        <li>
                            <strong>Realizar Oferta:</strong> Ingresa el monto de tu oferta en el campo designado y confirma tu oferta.
                        </li>
                        <li>
                            <strong>Confirmación:</strong> Recibirás una confirmación de que tu oferta ha sido registrada exitosamente.
                        </li>
                        <li>
                            <strong>Seguimiento:</strong> Puedes seguir el estado de tus ofertas en tu perfil.
                        </li>
                        <li>
                            <strong>Finalización:</strong> Si tu oferta es la ganadora, recibirás una notificación con las instrucciones para completar la transacción.
                        </li>
                    </ol>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Instructions;
