import React, { useState, useEffect } from 'react';
import SubastaCard from './SubastaCard'; // Asegúrate de que la ruta sea correcta
import { Row, Col } from 'react-bootstrap';
import '../styles/Styles.css';

const ListaSubastas = () => {
    const [subastas, setSubastas] = useState([]);

    useEffect(() => {
        // Aquí deberías hacer la llamada a la API para obtener las subastas
        fetch('http://localhost:8080/api/subasta')
            .then(response => response.json())
            .then(data => setSubastas(data))
            .catch(error => console.error('Error fetching subastas:', error));
    }, []);

    return (
        <div className='container'>        
            <div className="lista-subastas-container contenido">
                <h1 className="text-center my-4">Subastas</h1>  {/* Título añadido */}
                <Row>
                    {subastas.map(subasta => (
                        <Col xs={12} sm={6} md={4} lg={3} key={subasta.id} className="mb-4">
                            <SubastaCard subasta={subasta} className="subasta-card" />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ListaSubastas;
