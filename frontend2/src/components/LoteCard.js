import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const LoteCard = ({ lote }) => {
    const imagenBase64 = lote.imagenes.length > 0 ? `data:image/jpeg;base64,${lote.imagenes[0]}` : 'url_a_una_imagen_por_defecto.jpg'; // Proporciona una imagen por defecto en caso de que no haya imágenes
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imagenBase64} alt={`Lote ${lote.numero}`} />
            <Card.Body>
                <Card.Title>Lote {lote.numero}</Card.Title>
                <Card.Text>
                    {lote.descripcion}
                </Card.Text>
                <Card.Text>
                    Valor actual: ${lote.valorActual}
                </Card.Text>
                <Button variant="primary" href={`/detalle-subasta/${lote.subastaId}/lote/${lote.id}`}>
                    Ver detalles
                </Button>
            </Card.Body>
        </Card>
    );
};

export default LoteCard ;