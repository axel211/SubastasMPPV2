import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Modal, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/LoteDetalle.css';
import SubastaDetalle from './SubastaDetalle';
import FotoCarousel from './FotoCarousel';
import OfertaForm from './OfertaForm';
import HistorialOfertas from './HistorialOfertas';

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
    const [idUsuario, setIdUsuario] = useState(null); 
    const [subastaId, setSubastaId] = useState(null); 
    const { user } = useAuth();
    const [animatingOffer, setAnimatingOffer] = useState(false);
    const [animatingForm, setAnimatingForm] = useState(false);
    const [baseOferta, setBaseOferta] = useState(0);
    const [animatingCard, setAnimatingCard] = useState(''); // Estado para manejar las animaciones del card
    
    const pageSize = 5;
    const pollInterval = 1000; // 1 segundo

    useEffect(() => {
        if (user) {
            setIdUsuario(user.id);
        }
    }, [user]);

    const fetchLoteDetails = () => {
        axios.get(`http://localhost:8080/api/lote/${id}`)
            .then(response => {
                const loteData = response.data;
                setLote(loteData);
                setFotos(loteData.fotoPage.fotos || []);
                setTotalPages(loteData.fotoPage.totalPages || 0);
                setSubastaId(loteData.subastaId);
            })
            .catch(error => console.error('Error fetching lote details:', error));
    };

    useEffect(() => {
        fetchLoteDetails();
    }, [id]);

    useEffect(() => {
        if (lote) {
            fetchFotos(lote.id, currentPage, pageSize);
            fetchOfertas(lote.id);
            const intervalId = setInterval(() => {
                fetchOfertas(lote.id);
                fetchLoteDetails(); // Actualiza los detalles del lote periódicamente
                updateRemainingTime(lote.fechaHoraCierre);
            }, pollInterval);
            return () => clearInterval(intervalId); // Clear interval on component unmount
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

    const fetchOfertas = (loteId) => {
        axios.get(`http://localhost:8080/api/ofertas/lote/${loteId}`)
            .then(response => {
                const sortedOfertas = (response.data || []).sort((a, b) => b.monto - a.monto);
                const uniquePostores = [];
                const uniqueOfertas = sortedOfertas.filter(oferta => {
                    if (uniquePostores.includes(oferta.usuario)) {
                        return false;
                    } else {
                        uniquePostores.push(oferta.usuario);
                        return true;
                    }
                });
                setOfertas(uniqueOfertas);
                if (uniqueOfertas.length > 0) {
                    setBaseOferta(uniqueOfertas[0].monto + 50);
                } else {
                    setBaseOferta(50); // Si no hay ofertas, la oferta inicial es 50
                }
            })
            .catch(error => console.error('Error fetching ofertas:', error));
    };

    useEffect(() => {
        if (lote && lote.fechaHoraCierre) {
            updateRemainingTime(lote.fechaHoraCierre);
            const interval = setInterval(() => {
                updateRemainingTime(lote.fechaHoraCierre);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [lote]);

    const updateRemainingTime = (fechaHoraCierre) => {
        const now = new Date();
        const endTime = new Date(fechaHoraCierre);
        const timeRemaining = endTime - now;

        if (timeRemaining <= 0) {
            setRemainingTime('Finalizado');
            setAnimatingCard(''); // Clear any animations when time is up
        } else {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);

            if (timeRemaining <= 10000) {
                setAnimatingCard('animating-red'); // Less than 10 seconds remaining
            } else {
                setAnimatingCard(''); // Clear the red animation if more than 10 seconds
            }
        }
    };

    useEffect(() => {
        if (!oferta || oferta === baseOferta - 50) {
            setOferta(baseOferta);
        }
    }, [baseOferta]);

    const handleOfertaChange = (e) => {
        setOferta(e.target.value);
    };

    const handleOfertaSubmit = (e) => {
        e.preventDefault();
        const nuevaOferta = {
            idUsuario: idUsuario, 
            tipoOferta: 'Inicial', 
            montoOferta: parseFloat(oferta),
            loteId: lote.id,
            subastaId: subastaId 
        };
        
        axios.post(`http://localhost:8080/api/ofertas`, nuevaOferta)
            .then(response => {
                if (response.data === "Debe estar logueado para realizar una oferta" || response.data === "La oferta debe ser mayor a la oferta actual") {
                    setModalMessage(response.data);
                    setShowModal(true);
                } else {
                    fetchLoteDetails(); // Fetch updated lote details to reflect the new closing time
                    fetchOfertas(lote.id);
                    setOferta('');
                    setAnimatingOffer(true);
                    setAnimatingForm(true);
                    setAnimatingCard('animating-green'); // Trigger green animation on successful offer
                    setTimeout(() => {
                        setAnimatingOffer(false);
                        setAnimatingForm(false);
                        setAnimatingCard(''); // Clear the green animation after 1 second
                    }, 1000);
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

    const ofertaActual = ofertas.length > 0 ? ofertas[0].monto : 'No disponible';
    const numeroOfertas = ofertas.length;
    const ganadorActual = ofertas.length > 0 ? ofertas[0].usuario : 'No hay participantes';
    const isAuctionEnded = remainingTime === 'Finalizado';

    return (
        <Container className="">
            <SubastaDetalle subastaId={lote.subastaId} />
            <Row className="mb-4">
                <Col>
                    <h2>{lote.nombre || 'Nombre del Lote'}</h2>
                </Col>
            </Row>
            <Row>
                <Col lg={8} md={12} className="mb-4">
                    <FotoCarousel fotos={fotos} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </Col>
                <Col lg={4} md={12}>
                    <Card className={`subasta-detalle-card ${animatingCard}`}>
                        <Card.Body>
                            <Card.Title>Detalles de la Subasta</Card.Title>
                            <p><strong>Cierra en:</strong> {remainingTime}</p>
                            <p><strong>Fecha de Cierre:</strong> {lote.fechaHoraCierre ? new Date(lote.fechaHoraCierre).toLocaleString() : 'No disponible'}</p>
                            <p><strong>Ofertas:</strong> {numeroOfertas}</p>
                            <p><strong>Oferta Actual:</strong> S/. {ofertaActual}</p>
                            <p><strong>Ganador Actual:</strong> {ganadorActual}</p>
                            {remainingTime === 'Finalizado' && (
                                <div className="tabla-participantes">
                                    <Table striped bordered hover className="tabla-coloreada">
                                        <thead>
                                            <tr>
                                                <th>Posición</th>
                                                <th>Usuario</th>
                                                <th>Monto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ofertas.slice(0, 5).map((oferta, index) => (
                                                <tr key={oferta.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{oferta.usuario}</td>
                                                    <td>S/. {oferta.monto}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                            <OfertaForm 
                                oferta={oferta} 
                                baseOferta={baseOferta} 
                                handleOfertaChange={handleOfertaChange} 
                                handleOfertaSubmit={handleOfertaSubmit} 
                                animatingForm={animatingForm} 
                                isAuctionEnded={isAuctionEnded}
                            />
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
                    <h4>Historial de Ofertas</h4>
                    <HistorialOfertas ofertas={ofertas} />
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