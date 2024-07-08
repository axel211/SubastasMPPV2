// SubastaCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SubastaCard = ({ subasta, className }) => {
    const formattedFechaCierre = new Date(subasta.fechaCierre).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <Card className={className} style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>
                    {subasta.nombre}
                </Card.Title>
                <Card.Text>
                    {subasta.estado === 'Activo' ? '🟢 Activa' : '🔴 Finalizada'} <br />
                    {subasta.descripcion}
                </Card.Text>
                <Card.Footer>
                    Fecha de fin: {formattedFechaCierre}
                </Card.Footer>
                <Button variant="primary" href={`/subasta/${subasta.id}/lotes`}>
                    Ver Lotes
                </Button>
            </Card.Body>
        </Card>
    );
};

export default SubastaCard;
