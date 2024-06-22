import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const OfertaForm = ({ oferta, baseOferta, handleOfertaChange, handleOfertaSubmit, animatingForm }) => {
    return (
        <Form onSubmit={handleOfertaSubmit} className={animatingForm ? 'animating' : ''}>
            <Form.Group controlId="formOferta">
                <Form.Label>Hacer una Oferta</Form.Label>
                <Form.Control
                    type="number"
                    value={oferta}
                    onChange={handleOfertaChange}
                    placeholder={`S/. ${baseOferta}`}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Ofertar
            </Button>
        </Form>
    );
};

OfertaForm.propTypes = {
    oferta: PropTypes.number.isRequired,
    baseOferta: PropTypes.number.isRequired,
    handleOfertaChange: PropTypes.func.isRequired,
    handleOfertaSubmit: PropTypes.func.isRequired,
    animatingForm: PropTypes.bool.isRequired
};

export default OfertaForm;
