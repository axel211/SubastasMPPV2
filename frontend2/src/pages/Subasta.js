import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../utils/formatDate";

const Subasta = () => {
    const [showModal, setShowModal] = useState(false);
    const [subastas, setSubastas] = useState([]);
    const [filteredSubastas, setFilteredSubastas] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        fechaCreacion: new Date().toISOString(),
        fechaCierre: '',
        estado: 'Activo'
    });

    const [searchFilters, setSearchFilters] = useState({
        nombre: '',
        estado: '',
        fechaCreacion: '',
        fechaCierre: ''
    });

    const navigate = useNavigate();

    const handleDetailsClick = (id) => {
        navigate(`/detalle-subasta/${id}`);
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/subasta')
            .then(response => response.json())
            .then(data => {
                setSubastas(data);
                setFilteredSubastas(data);
            })
            .catch(error => console.error('Error al obtener subastas:', error));
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleCreateSubasta = async () => {
        try {
            await axios.post('http://localhost:8080/api/subasta', formData);
            alert("Subasta creada");
            fetchSubastas();
        } catch (error) {
            console.error('Error al crear la subasta:', error);
        }
        handleCloseModal();
    };

    const fetchSubastas = () => {
        fetch('http://localhost:8080/api/subasta')
            .then(response => response.json())
            .then(data => {
                setSubastas(data);
                setFilteredSubastas(data);
            })
            .catch(error => console.error('Error al obtener subastas:', error));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters({ ...searchFilters, [name]: value });
    };

    useEffect(() => {
        const { nombre, estado, fechaCreacion, fechaCierre } = searchFilters;
        let filteredData = subastas;

        if (nombre) {
            filteredData = filteredData.filter(subasta => subasta.nombre.toLowerCase().includes(nombre.toLowerCase()));
        }

        if (estado) {
            filteredData = filteredData.filter(subasta => subasta.estado.toLowerCase().includes(estado.toLowerCase()));
        }

        if (fechaCreacion) {
            filteredData = filteredData.filter(subasta => new Date(subasta.fechaCreacion) >= new Date(fechaCreacion));
        }

        if (fechaCierre) {
            filteredData = filteredData.filter(subasta => new Date(subasta.fechaCierre) <= new Date(fechaCierre));
        }

        setFilteredSubastas(filteredData);
    }, [searchFilters, subastas]);

    return (
        <div>
            <h1>Bienvenido a la página de subastas</h1>
            <div className="filters mb-4">
                <Row>
                    <Col>
                        <Form.Group controlId="filterNombre">
                            <Form.Label>Nombre de la subasta</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="nombre" 
                                value={searchFilters.nombre} 
                                onChange={handleFilterChange} 
                                placeholder="Nombre de la subasta" 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterEstado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="estado" 
                                value={searchFilters.estado} 
                                onChange={handleFilterChange}>
                                <option value="">Todos</option>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterFechaCreacion">
                            <Form.Label>Fecha de creación</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="fechaCreacion" 
                                value={searchFilters.fechaCreacion} 
                                onChange={handleFilterChange} 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterFechaCierre">
                            <Form.Label>Fecha de cierre</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="fechaCierre" 
                                value={searchFilters.fechaCierre} 
                                onChange={handleFilterChange} 
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre de la subasta</th>
                        <th>Fecha de creación</th>
                        <th>Fecha de cierre</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSubastas.map((subasta) => (
                        <tr key={subasta.id}>
                            <td>{subasta.id}</td>
                            <td>{subasta.nombre}</td>
                            <td>{formatDate(subasta.fechaCreacion)}</td>
                            <td>{formatDate(subasta.fechaCierre)}</td>
                            <td>{subasta.estado}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleDetailsClick(subasta.id)}>
                                    Ver Detalles
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="success" onClick={handleShowModal}>Crear Nueva Subasta</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Subasta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la subasta</Form.Label>
                            <Form.Control 
                                name='nombre' 
                                value={formData.nombre} 
                                type="text" 
                                placeholder="Ingrese el nombre"  
                                onChange={handleChange}
                            />
                            <Form.Label>Fecha de cierre</Form.Label>
                            <Form.Control 
                                name='fechaCierre' 
                                value={formData.fechaCierre} 
                                type="date" 
                                onChange={handleChange} 
                            />
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control 
                                name='descripcion' 
                                value={formData.descripcion} 
                                as="textarea" 
                                rows={8} 
                                onChange={handleChange} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                    <Button variant="primary" onClick={handleCreateSubasta}>Crear Subasta</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Subasta;
