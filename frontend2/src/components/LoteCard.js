import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import noPhoto from '../Image/BannerSubasta/NoImagen.svg'
import '../styles/Styles.css'
const LoteCard = ({ lote, subastaId }) => {
    // Verifica si 'imagenes' es un array antes de intentar acceder a sus elementos
    const imagenes = Array.isArray(lote.fotos) ? lote.fotos : [];
    const imagenBase64 = imagenes.length > 0 ? `data:image/jpeg;base64,${imagenes[0]}` : noPhoto; // Proporciona una imagen por defecto en caso de que no haya imágenes
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Title>Lote {lote.id}</Card.Title>
            <Card.Img variant="top" src={imagenBase64} alt={`Lote ${lote.numero}`} />
            <Card.Body>
                <Card.Title>{lote.nombre} - {lote.anio}</Card.Title>
                <Card.Text>
                    {lote.descripcion}
                </Card.Text>
                <Card.Text>
                    Valor actual: ${lote.valorActual}
                </Card.Text>
                <Button variant="primary" href={`/oferta/lote/${lote.id}`}>
                    Ver detalles
                </Button>
            </Card.Body>
        </Card>
    );
};

export default LoteCard;
