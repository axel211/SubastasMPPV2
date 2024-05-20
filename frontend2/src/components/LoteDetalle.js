import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Table, Tabs, Tab, Card, Button, Form, Carousel } from 'react-bootstrap';
import axios from 'axios';
import '../styles/LoteDetalle.css'; // Asegúrate de crear este archivo y agregar los estilos

const LoteDetalle = () => {
    const { id } = useParams();
    const [lote, setLote] = useState(null);
    const [oferta, setOferta] = useState('');
    const [ofertas, setOfertas] = useState([]);
    const [remainingTime, setRemainingTime] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/lote/${id}`)
            .then(response => {
                setLote(response.data);
                setOfertas(response.data.ofertas || []);
            })
            .catch(error => console.error('Error fetching lote details:', error));
    }, [id]);

    useEffect(() => {
        if (lote) {
            const interval = setInterval(() => {
                const now = new Date();
                const endTime = new Date(lote.fechaCierre);
                const timeRemaining = endTime - now;

                if (timeRemaining <= 0) {
                    clearInterval(interval);
                    setRemainingTime('Finalizado');
                } else {
                    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                    setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [lote]);

    const handleOfertaChange = (e) => {
        setOferta(e.target.value);
    };

    const handleOfertaSubmit = (e) => {
        e.preventDefault();
        const nuevaOferta = {
            valor: parseFloat(oferta),
            fecha: new Date().toISOString()
        };
        axios.post(`http://localhost:8080/api/lote/${id}/ofertas`, nuevaOferta)
            .then(response => {
                setOfertas([...ofertas, response.data]);
                setOferta('');
            })
            .catch(error => console.error('Error al realizar la oferta:', error));
    };

    if (!lote) {
        return <div>Cargando...</div>;
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={8}>
                    <h2>{lote.nombre}</h2>
                    {lote.imagenes && lote.imagenes.length > 0 && (
                        <Carousel className="lote-carousel">
                            {lote.imagenes.map((imagen, index) => (
                                <Carousel.Item key={index}>
                                    <Image src={`data:image/jpeg;base64,${imagen}`} alt={`Imagen ${index + 1}`} className="d-block w-100 lote-carousel-image" />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </Col>
                <Col md={4}>
                    <Card className="subasta-detalle-card">
                        <Card.Body>
                            <Card.Title>Detalles de la Subasta</Card.Title>
                            <p><strong>Cierra en:</strong> {remainingTime}</p>
                            <p><strong>Fecha de Cierre:</strong> {new Date(lote.fechaCierre).toLocaleString()}</p>
                            <p><strong>Fecha de Apertura:</strong> {new Date(lote.fechaApertura).toLocaleString()}</p>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td>Visitas</td>
                                        <td>{lote.visitas}</td>
                                    </tr>
                                    <tr>
                                        <td>Participantes</td>
                                        <td>{lote.participantes}</td>
                                    </tr>
                                    <tr>
                                        <td>Ofertas</td>
                                        <td>{ofertas.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Oferta Actual</td>
                                        <td>${lote.ofertaActual}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Form onSubmit={handleOfertaSubmit}>
                                <Form.Group controlId="formOferta">
                                    <Form.Label>Oferta Sugerida</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Ingrese su oferta" 
                                        value={oferta} 
                                        onChange={handleOfertaChange} 
                                        required 
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-2">Participar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Tabs defaultActiveKey="descripcion" id="detalle-lote-tabs">
                        <Tab eventKey="descripcion" title="Descripción Detallada">
                            <div className="p-3">
                                <h4>Descripción Detallada</h4>
                                <p>{lote.descripcion}</p>
                            </div>
                        </Tab>
                        <Tab eventKey="identificacion" title="Identificación">
                            <div className="p-3">
                                <h4>Identificación</h4>
                                <p>{lote.identificacion}</p>
                            </div>
                        </Tab>
                        <Tab eventKey="anexos" title="Anexos">
                            <div className="p-3">
                                <h4>Anexos</h4>
                                <p>{lote.anexos}</p>
                            </div>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Detalles del Lote</Card.Title>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td>Tipo de Lote</td>
                                        <td>{lote.tipoLote}</td>
                                    </tr>
                                    <tr>
                                        <td>Modelo</td>
                                        <td>{lote.modelo}</td>
                                    </tr>
                                    <tr>
                                        <td>Año</td>
                                        <td>{lote.anio}</td>
                                    </tr>
                                    <tr>
                                        <td>Kilometraje</td>
                                        <td>{lote.km} km</td>
                                    </tr>
                                    <tr>
                                        <td>Placa</td>
                                        <td>{lote.placa}</td>
                                    </tr>
                                    <tr>
                                        <td>Precio Base</td>
                                        <td>${lote.precioBase}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4>Ofertas Realizadas</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Valor</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ofertas.map((oferta, index) => (
                                <tr key={index}>
                                    <td>{oferta.valor}</td>
                                    <td>{new Date(oferta.fecha).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default LoteDetalle;
