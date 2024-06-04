import React, { useState, useEffect } from 'react';
import { BsCalendar } from 'react-icons/bs';
import { Modal, Button } from 'react-bootstrap';
import '../styles/SubastaDetalle.css';
import { formatDate } from '../utils/formatDate';
import FormularioHabilitacion from './FormularioHabilitacion';

const SubastaDetalle = ({ subastaId, userId }) => {
    const [subasta, setSubasta] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchSubasta = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/subasta/subastaSolo/${subastaId}`);
                const data = await response.json();
                setSubasta(data);
            } catch (error) {
                console.error('Error fetching subasta details:', error);
            }
        };

        fetchSubasta();
    }, [subastaId]);

    const handleHabilitateClick = () => {
        // Lógica para habilitar al usuario
        console.log('Habilitar usuario:', userId, 'para la subasta:', subastaId);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    if (!subasta) {
        return <div>Cargando detalles de la subasta...</div>;
    }

    return (
        <div className="subasta-detalle">
            <h1>{subasta.nombre}</h1>
            <p className="subasta-fecha"><BsCalendar /> Fecha de la subasta: {formatDate(subasta.fechaCierre)}</p>
            <p>{subasta.descripcion}</p>
            <Button className="btn-habilitate" onClick={handleHabilitateClick}>Habilitar</Button>

            <Modal show={showModal} onHide={handleClose} dialogClassName="custom-modal-width">
                <Modal.Header closeButton>
                    <Modal.Title>Formulario de habilitación para la subasta: {subasta.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormularioHabilitacion subastaNombre={subasta.nombre} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SubastaDetalle;
