import React, { useState, useEffect } from 'react';
import { BsCalendar } from 'react-icons/bs'; // Asegúrate de haber instalado 'react-icons'
import '../styles/SubastaDetalle.css'
import { formatDate } from '../utils/formatDate';
const SubastaDetalle = ({ subastaId }) => {
    const [subasta, setSubasta] = useState(null);

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

    if (!subasta) {
        return <div>Cargando detalles de la subasta...</div>;
    }

    return (
        <div className="subasta-detalle">
            <h1>{subasta.nombre}</h1>
            <p className="subasta-fecha"><BsCalendar /> Fecha de la subasta: {formatDate(subasta.fechaCierre)}</p>
            <p>{subasta.descripcion}</p>
            <button className="btn-habilitate">Habilitate</button>
        </div>
    );
};

export default SubastaDetalle;
