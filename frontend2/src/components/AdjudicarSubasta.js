import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import '../styles/AdjudicarSubasta.css';

const AdjudicarSubasta = () => {
    const [subastas, setSubastas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalAction, setModalAction] = useState(null);
    const [selectedLoteId, setSelectedLoteId] = useState(null);

    // Estados para los filtros
    const [filterLoteId, setFilterLoteId] = useState('');
    const [filterTituloLote, setFilterTituloLote] = useState('');
    const [filterSubastaId, setFilterSubastaId] = useState('');
    const [filterNombreSubasta, setFilterNombreSubasta] = useState('');
    const [filterNombresApellidos, setFilterNombresApellidos] = useState('');
    const [filterFechaAdjudicacion, setFilterFechaAdjudicacion] = useState('');
    const [filterEstado, setFilterEstado] = useState('');

    useEffect(() => {
        fetchSubastas();
    }, []);

    const fetchSubastas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/adjudicados/adjudicadas');
            const subastasData = await Promise.all(response.data.map(async subasta => {
                const pdfExists = await checkPdfExists(subasta.idLote);
                return { ...subasta, pdfExists };
            }));
            setSubastas(subastasData);
        } catch (error) {
            console.error('Error fetching subastas:', error);
        }
    };

    const getEstadoBadge = (estado) => {
        switch (estado) {
            case 'HABILITADO':
                return <Badge bg="success">Habilitado</Badge>;
            case 'RECHAZADO':
                return <Badge bg="danger">Rechazado</Badge>;
            default:
                return <Badge bg="secondary">Por verificar</Badge>;
        }
    };

    const downloadPdf = (id) => {
        axios.get(`http://localhost:8080/api/adjudicados/${id}/pdf`, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `voucher_${id}.pdf`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => console.error('Error downloading PDF:', error));
    };

    const checkPdfExists = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/adjudicados/${id}/pdf`);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    };

    const handleShowModal = (id, message, action) => {
        setSelectedLoteId(id);
        setModalMessage(message);
        setModalAction(() => action);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedLoteId(null);
        setModalMessage('');
        setModalAction(null);
    };

    const handleConfirmAction = async () => {
        if (modalAction && selectedLoteId !== null) {
            await modalAction(selectedLoteId);
            handleCloseModal();
        }
    };

    const updateEstado = async (id, estado) => {
        try {
            await axios.patch(`http://localhost:8080/api/adjudicados/${id}`, { estado });
            fetchSubastas(); // Refrescar la lista de subastas después de actualizar el estado
        } catch (error) {
            console.error(`Error updating estado: ${error}`);
        }
    };

    // Filtrar subastas según los filtros aplicados
    const filteredSubastas = subastas.filter(subasta => {
        return (
            (filterLoteId === '' || subasta.idLote.toString().includes(filterLoteId)) &&
            (filterTituloLote === '' || subasta.tituloLote.toLowerCase().includes(filterTituloLote.toLowerCase())) &&
            (filterSubastaId === '' || subasta.idSubasta.toString().includes(filterSubastaId)) &&
            (filterNombreSubasta === '' || subasta.nombreSubasta.toLowerCase().includes(filterNombreSubasta.toLowerCase())) &&
            (filterNombresApellidos === '' || (`${subasta.nombresAdjudicado} ${subasta.apellidosAdjudicado}`).toLowerCase().includes(filterNombresApellidos.toLowerCase())) &&
            (filterFechaAdjudicacion === '' || new Date(subasta.fechaAdjudicacion).toLocaleDateString().includes(filterFechaAdjudicacion)) &&
            (filterEstado === '' || subasta.estado.toLowerCase().includes(filterEstado.toLowerCase()))
        );
    });

    return (

        <>
            <h2>Adjudicar Subasta</h2>

            {/* Sección de Filtros */}
            <Form className="mb-4">
                <Row>
                    <Col>
                        <Form.Group controlId="filterLoteId">
                            <Form.Label>ID Lote</Form.Label>
                            <Form.Control
                                type="text"
                                value={filterLoteId}
                                onChange={(e) => setFilterLoteId(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterTituloLote">
                            <Form.Label>Título del Lote</Form.Label>
                            <Form.Control
                                type="text"
                                value={filterTituloLote}
                                onChange={(e) => setFilterTituloLote(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterSubastaId">
                            <Form.Label>ID Subasta</Form.Label>
                            <Form.Control
                                type="text"
                                value={filterSubastaId}
                                onChange={(e) => setFilterSubastaId(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterNombreSubasta">
                            <Form.Label>Nombre de la Subasta</Form.Label>
                            <Form.Control
                                type="text"
                                value={filterNombreSubasta}
                                onChange={(e) => setFilterNombreSubasta(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterNombresApellidos">
                            <Form.Label>Nombres y Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                value={filterNombresApellidos}
                                onChange={(e) => setFilterNombresApellidos(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterFechaAdjudicacion">
                            <Form.Label>Fecha de Adjudicación</Form.Label>
                            <Form.Control
                                type="date"
                                value={filterFechaAdjudicacion}
                                onChange={(e) => setFilterFechaAdjudicacion(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterEstado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                value={filterEstado}
                                onChange={(e) => setFilterEstado(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            {/* Tabla de Subastas */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID Lote</th>
                        <th>Título del Lote</th>
                        <th>ID Subasta</th>
                        <th>Nombre de la Subasta</th>
                        <th>Nombres y Apellidos del Adjudicado</th>
                        <th>Fecha de Adjudicación</th>
                        <th>Estado</th>
                        <th>Voucher</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSubastas.map(subasta => (
                        <tr key={subasta.idLote}>
                            <td>{subasta.idLote}</td>
                            <td>{subasta.tituloLote}</td>
                            <td>{subasta.idSubasta}</td>
                            <td>{subasta.nombreSubasta}</td>
                            <td>{`${subasta.nombresAdjudicado} ${subasta.apellidosAdjudicado}`}</td>
                            <td>{new Date(subasta.fechaAdjudicacion).toLocaleString()}</td>
                            <td>{getEstadoBadge(subasta.estado)}</td>
                            <td>
                                {subasta.pdfExists ? (
                                    <button onClick={() => downloadPdf(subasta.idLote)} className="btn btn-primary">
                                        Descargar PDF
                                    </button>
                                ) : (
                                    <span>El participante no ha subido el voucher de pago</span>
                                )}
                            </td>
                            <td>
                                {subasta.estado === 'Por verificar' && (
                                    <>
                                        <Button variant="success" onClick={() => handleShowModal(subasta.idLote, '¿Estás seguro de adjudicar este lote?', (id) => updateEstado(id, 'ADJUDICADO'))}>Aprobar</Button>
                                        <Button variant="danger" onClick={() => handleShowModal(subasta.idLote, '¿Estás seguro de CANCELAR la adjudicación de este lote para el participante?', (id) => updateEstado(id, 'RECHAZADO'))}>Rechazar</Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAction}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdjudicarSubasta;
