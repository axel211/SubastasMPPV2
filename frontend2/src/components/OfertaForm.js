import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
const OfertaForm = ({ oferta, baseOferta, handleOfertaChange, handleOfertaSubmit, animatingForm, isAuctionEnded }) => {
    return (
        <Form onSubmit={handleOfertaSubmit} className={animatingForm ? 'animating-form' : ''}>
        <Form.Group controlId="oferta" className='mb-3'>
            <Form.Label>Oferta (mínimo S/. {baseOferta})</Form.Label>
            <Form.Control 
                type="number" 
                value={oferta} 
                onChange={handleOfertaChange} 
                min={baseOferta} 
                step="0.01" 
                disabled={isAuctionEnded}
                required 
            />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isAuctionEnded}>
            Realizar Oferta
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
