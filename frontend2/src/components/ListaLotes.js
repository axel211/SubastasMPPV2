import React, { useState, useEffect, useCallback } from 'react';
import LoteCard from './LoteCard';
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import SubastaDetalle from './SubastaDetalle';

const ListaLotes = () => {
    const [lotes, setLotes] = useState([]);
    const [filteredLotes, setFilteredLotes] = useState([]);
    const { id } = useParams();

    const [filters, setFilters] = useState({
        titulo: '',
        precioMin: '',
        precioMax: '',
        categoria: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8080/api/subasta/${id}/lotes`)
            .then(response => response.json())
            .then(data => {
                setLotes(data);
                setFilteredLotes(data);
            })
            .catch(error => console.error('Error fetching lotes:', error));
    }, [id]);

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


    console.log(lotes)
    return (
        <div className="lista-subastas-container">
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
            {filteredLotes.length > 0 ? (
                <Row>
                    {filteredLotes.map(lote => (
                        <Col xs={12} sm={6} md={4} lg={3} key={lote.id} className="mb-4">
                            <LoteCard lote={lote} subastaId = {id}/>
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
