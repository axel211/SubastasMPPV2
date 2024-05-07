import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SubastaCard = ({ subasta  , className}) => {
    return (
        <Card className={className} style={{ width: '100%' }}> {/* Asegúrate que el ancho se ajusta automáticamente */}
        <Card.Body>
            <Card.Title>
                {subasta.nombre}
            </Card.Title>
            <Card.Text>
            {subasta.estado == 'Activo' ? ' 🟢 Activa' : ' 🔴 Finalizada'} <br></br>
                {subasta.descripcion}
            </Card.Text>
            <Card.Footer>
                Fecha de fin: {subasta.fechaFin}
            </Card.Footer>
            <Button variant="primary" href={`/subasta/${subasta.id}/lotes`}>
                Ver Lotes
            </Button>
        </Card.Body>
    </Card>
    );
};

export default SubastaCard;
