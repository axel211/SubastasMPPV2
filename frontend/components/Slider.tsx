import React, { useRef } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const SlideTrack = styled.div`
  display: flex;
`;

const Slide = styled.img`
  width: 100%;
  height: auto;
`;

const Slider = ({ fotos }: { fotos: string[] }) => {
  const slideTrackRef = useRef<HTMLDivElement>(null);

  const handleNextSlide = () => {
    if (slideTrackRef.current) {
      slideTrackRef.current.scrollBy({
        left: window.innerWidth, // Scroll por el ancho de la ventana
        behavior: 'smooth', // Animación suave
      });
    }
  };

  const handlePrevSlide = () => {
    if (slideTrackRef.current) {
      slideTrackRef.current.scrollBy({
        left: -window.innerWidth, // Scroll hacia la izquierda
        behavior: 'smooth', // Animación suave
      });
    }
  };

  return (
    <SliderContainer>
      <SlideTrack ref={slideTrackRef}>
        {fotos.map((foto, index) => (
          <Slide key={index} src={foto} alt={`Foto ${index + 1}`} />
        ))}
      </SlideTrack>
      {/* Botones para navegar entre las fotos */}
      <button onClick={handlePrevSlide}>Anterior</button>
      <button onClick={handleNextSlide}>Siguiente</button>
    </SliderContainer>
  );
};

export default Slider;
