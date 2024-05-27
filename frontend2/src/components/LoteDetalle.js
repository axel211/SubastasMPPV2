import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Tabs, Tab, Card, Button, Form, Carousel, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../styles/LoteDetalle.css';
import SubastaDetalle from './SubastaDetalle';

const LoteDetalle = () => {
    const { id } = useParams();
    const [lote, setLote] = useState(null);
    const [oferta, setOferta] = useState('');
    const [ofertas, setOfertas] = useState([]);
    const [remainingTime, setRemainingTime] = useState('');
    const [fotos, setFotos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const pageSize = 5;

    useEffect(() => {
        axios.get(`http://localhost:8080/api/lote/${id}`)
            .then(response => {
                const loteData = response.data;
                setLote(loteData);
                setOfertas(loteData.ofertas || []);
                setFotos(loteData.fotoPage.fotos || []);
                setTotalPages(loteData.fotoPage.totalPages || 0);
            })
            .catch(error => console.error('Error fetching lote details:', error));
    }, [id]);

    useEffect(() => {
        if (lote) {
            fetchFotos(lote.id, currentPage, pageSize);
        }
    }, [currentPage, lote]);

    const fetchFotos = (loteId, page, size) => {
        axios.get(`http://localhost:8080/api/lote/${loteId}/fotos?page=${page}&size=${size}`)
            .then(response => {
                setFotos(response.data.fotos || []);
                setTotalPages(response.data.totalPages || 0);
            })
            .catch(error => console.error('Error fetching fotos:', error));
    };

    useEffect(() => {
        if (lote && lote.fechaHoraCierre) {
            const interval = setInterval(() => {
                const now = new Date();
                const endTime = new Date(lote.fechaHoraCierre);
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

        axios.post(`http://localhost:8080/api/ofertas`, nuevaOferta)
            .then(response => {
                if (response.data === "Debe estar logueado para realizar una oferta" || response.data === "La oferta debe ser mayor a la oferta actual") {
                    setModalMessage(response.data);
                    setShowModal(true);
                } else {
                    setOfertas([...ofertas, response.data]);
                    setOferta('');
                }
            })
            .catch(error => {
                setModalMessage('Ha ocurrido un error al realizar la oferta');
                setShowModal(true);
                console.error('Error al realizar la oferta:', error);
            });
    };

    if (!lote) {
        return <div>Cargando...</div>;
    }

    return (
        <Container className="mt-3">
            <SubastaDetalle subastaId={lote.subastaId} />
            <Row className="mb-4">
                <Col>
                    <h2>{lote.nombre || 'Nombre del Lote'}</h2>
                </Col>
            </Row>
            <Row>
                <Col lg={8} md={12} className="mb-4">
                    {fotos.length > 0 && (
                        <Carousel className="lote-carousel">
                            {fotos.map((foto, index) => (
                                <Carousel.Item key={index}>
                                    <Image src={`data:image/jpeg;base64,${foto}`} alt={`Imagen ${index + 1}`} className="d-block w-100 lote-carousel-image" />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                    <div className="foto-pagination">
                        <Button
                            variant="secondary"
                            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 0))}
                            disabled={currentPage === 0}
                        >
                            Anterior
                        </Button>
                        <span>{currentPage + 1} / {totalPages}</span>
                        <Button
                            variant="secondary"
                            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1))}
                            disabled={currentPage === totalPages - 1}
                        >
                            Siguiente
                        </Button>
                    </div>
                </Col>
                <Col lg={4} md={12}>
                    <Card className="subasta-detalle-card">
                        <Card.Body>
                            <Card.Title>Detalles de la Subasta</Card.Title>
                            <p><strong>Cierra en:</strong> {remainingTime}</p>
                            <p><strong>Fecha de Cierre:</strong> {lote.fechaHoraCierre ? new Date(lote.fechaHoraCierre).toLocaleString() : 'No disponible'}</p>
                            <p><strong>Participantes:</strong> {lote.participantes || 'No disponible'}</p>
                            <p><strong>Ofertas:</strong> {ofertas.length}</p>
                            <p><strong>Oferta Actual:</strong> ${lote.ofertaActual || 'No disponible'}</p>
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
                                <Button variant="primary" type="submit" className="w-100 mt-2">Ofertar</Button>
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
                                <p>{lote.descripcion || 'No disponible'}</p>
                            </div>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Detalles del Lote</Card.Title>
                            <p><strong>Tipo de Lote:</strong> {lote.tipoLote || 'No disponible'}</p>
                            <p><strong>Modelo:</strong> {lote.modelo || 'No disponible'}</p>
                            <p><strong>Año:</strong> {lote.anio || 'No disponible'}</p>
                            <p><strong>Kilometraje:</strong> {lote.km} km</p>
                            <p><strong>Placa:</strong> {lote.placa || 'No disponible'}</p>
                            <p><strong>Moneda:</strong> {lote.moneda || 'No disponible'}</p>
                            <p><strong>Precio Base:</strong> {lote.precioBase || 'No disponible'}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4>Historial de Ofertas</h4>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Valor de la Oferta</th>
                                <th>Fecha de la Oferta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ofertas.map((oferta, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>${oferta.valor}</td>
                                    <td>{new Date(oferta.fecha).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Mensaje</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default LoteDetalle;
