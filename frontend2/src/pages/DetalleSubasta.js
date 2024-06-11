import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const DetalleSubasta = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const goToLotes = () => {
        navigate(`/detalle-subasta/${id}/lotes`);
    }

    const goToParticipantes = () => {
        navigate(`/participantes/${id}`);
    }

    return (
        <div className="container mt-5">
            <h1>Detalles de la Subasta</h1>
            <div className="d-flex justify-content-around">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Participantes</Card.Title>
                        <Card.Text>
                            Ver y aceptar a los participantes de la subasta.
                        </Card.Text>
                        <Button variant="primary" onClick={goToParticipantes}>
                            Ir a Participantes
                        </Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Lotes</Card.Title>
                        <Card.Text>
                            Registrar y ver los lotes que están en la subasta.
                        </Card.Text>
                        <Button variant="primary" onClick={goToLotes}>
                            Ir a Lotes
                        </Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Información Adicional</Card.Title>
                        <Card.Text>
                            Ver la información adicional de la subasta como términos y condiciones.
                        </Card.Text>
                        <Button variant="primary" onClick={() => handleNavigate('/info-adicional')}>
                            Ir a Información Adicional
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default DetalleSubasta;
