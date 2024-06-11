import React, { useState, useEffect, useCallback } from 'react';
import LoteCard from './LoteCard';
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import SubastaDetalle from './SubastaDetalle';

const ListaLotes = () => {
    const [lotes, setLotes] = useState([]);
    const [filteredLotes, setFilteredLotes] = useState([]);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [filters, setFilters] = useState({
        titulo: '',
        precioMin: '',
        precioMax: '',
        categoria: ''
    });

    console.log("idsubasta: " + id); 
    useEffect(() => {
        fetchLotes(currentPage);
    }, [id, currentPage]);

    const fetchLotes = (page) => {
        fetch(`http://localhost:8080/api/subasta/${id}/lotes?page=${page}&size=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                setLotes(data.content || []);  // Asegurarse de que content no sea null
                setFilteredLotes(data.content || []);
                setTotalPages(data.totalPages || 0);  // Asegurarse de que totalPages no sea null
            })
            .catch(error => console.error('Error fetching lotes:', error));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = useCallback(() => {
        let filteredData = lotes;

        if (filters.titulo) {
            filteredData = filteredData.filter(lote =>
                lote.nombre && lote.nombre.toLowerCase().includes(filters.titulo.toLowerCase())
            );
        }

        if (filters.precioMin) {
            filteredData = filteredData.filter(lote =>
                lote.precio >= parseFloat(filters.precioMin)
            );
        }

        if (filters.precioMax) {
            filteredData = filteredData.filter(lote =>
                lote.precio <= parseFloat(filters.precioMax)
            );
        }

        if (filters.categoria) {
            filteredData = filteredData.filter(lote =>
                lote.tipoLote && lote.tipoLote.toLowerCase() === filters.categoria.toLowerCase()
            );
        }

        setFilteredLotes(filteredData);
    }, [lotes, filters]);

    useEffect(() => {
        applyFilters();
    }, [filters, lotes, applyFilters]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    console.log(lotes)

    return (
        <div className="container">
            <SubastaDetalle subastaId={id} />
            <div className="filters mb-4">
                <Row>
                    <Col>
                        <Form.Group controlId="filterTitulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="titulo"
                                value={filters.titulo}
                                onChange={handleFilterChange}
                                placeholder="Título del lote"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterPrecioMin">
                            <Form.Label>Precio mínimo</Form.Label>
                            <Form.Control
                                type="number"
                                name="precioMin"
                                value={filters.precioMin}
                                onChange={handleFilterChange}
                                placeholder="Precio mínimo"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterPrecioMax">
                            <Form.Label>Precio máximo</Form.Label>
                            <Form.Control
                                type="number"
                                name="precioMax"
                                value={filters.precioMax}
                                onChange={handleFilterChange}
                                placeholder="Precio máximo"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterCategoria">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                as="select"
                                name="categoria"
                                value={filters.categoria}
                                onChange={handleFilterChange}
                            >
                                <option value="">Todas</option>
                                <option value="vehiculo">Vehículo</option>
                                <option value="motocicleta">Motocicleta</option>
                                <option value="inmueble">Inmueble</option>
                                <option value="otros">Otros</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" onClick={applyFilters} className="mt-3">
                    Aplicar Filtros
                </Button>
            </div>
            {filteredLotes && filteredLotes.length > 0 ? (
                <Row>
                    {filteredLotes.map(lote => (
                        <Col xs={12} sm={6} md={4} lg={3} key={lote.id} className="mb-4">
                            <LoteCard lote={lote} subastaId={id} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div>No hay lotes disponibles en esta subasta.</div>
            )}
            <Pagination className="justify-content-center mt-4">
                <Pagination.First onClick={() => handlePageChange(0)} disabled={currentPage === 0} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} />
                {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
                <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
            </Pagination>
        </div>
    );
};

export default ListaLotes;
