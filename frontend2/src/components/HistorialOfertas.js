import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HistorialOfertas = ({ ofertas }) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Usuario</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody>
                {ofertas.map((oferta, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{oferta.usuario}</td>
                        <td>{new Date(oferta.fechaHora).toLocaleString()}</td>
                        <td>S/. {oferta.monto}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

HistorialOfertas.propTypes = {
    ofertas: PropTypes.array.isRequired
};

export default HistorialOfertas;
