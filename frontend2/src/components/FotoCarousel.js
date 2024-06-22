import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FotoCarousel = ({ fotos, currentPage, totalPages, setCurrentPage }) => {
    return (
        <>
            {fotos.length > 0 && (
                <Carousel className="lote-carousel">
                    {fotos.map((foto, index) => (
                        <Carousel.Item key={index}>
                            <img src={`data:image/jpeg;base64,${foto}`} alt={`Imagen ${index + 1}`} className="d-block w-100 lote-carousel-image" />
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
        </>
    );
};

FotoCarousel.propTypes = {
    fotos: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired
};

export default FotoCarousel;
