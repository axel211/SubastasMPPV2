import React, { useState, useEffect } from 'react';
import LoteCard from './LoteCard';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import SubastaDetalle from './SubastaDetalle';

const ListaLotes = () => {
    const [lotes, setLotes] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        fetch(`http://localhost:8080/api/subasta/${id}/lotes`)
            .then(response => response.json())
            .then(data => setLotes(data))
            .catch(error => console.error('Error fetching lotes:', error));
    }, [id]);

    return (
        <div className="lista-subastas-container">
            <SubastaDetalle subastaId={id}/>
            {lotes.length > 0 ? (
                <Row>
                    {lotes.map(lote => (
                        <Col xs={12} sm={6} md={4} lg={3} key={lote.id} className="mb-4">
                            <LoteCard lote={lote} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div>No hay lotes disponibles en esta subasta.</div>
            )}
        </div>
    );
};

export default ListaLotes;
