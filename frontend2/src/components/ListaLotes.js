import React, { useState, useEffect } from 'react';
import LoteCard from './LoteCard';
import { useParams } from 'react-router-dom';
const ListaLotes = () => {
    const [lotes, setLotes] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        // Aquí harías la llamada a la API para obtener los lotes de la subasta
        fetch(`http://localhost:8080/api/subasta/${id}/lotes`)
            .then(response => response.json())
            .then(data => setLotes(data));
    }, [id]);

    console.log(lotes);
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {lotes.map(lote => (
                <LoteCard key={lote.id} lote={lote} />
            ))}
        </div>
    );
};

export default ListaLotes;