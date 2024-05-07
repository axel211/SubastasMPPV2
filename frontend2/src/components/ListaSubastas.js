import React, { useState, useEffect } from 'react';
import SubastaCard from './SubastaCard'; // Asegúrate de que la ruta sea correcta
import '../styles/Styles.css'
const ListaSubastas = () => {
    const [subastas, setSubastas] = useState([]);

    useEffect(() => {
        // Aquí deberías hacer la llamada a la API para obtener las subastas
        fetch('http://localhost:8080/api/subasta')
            .then(response => response.json())
            .then(data => setSubastas(data))
            .catch(error => console.error('Error fetching subastas:', error));
    }, []);

    console.log(subastas)
    return (
        <div className="lista-subastas-container contenido">
        {subastas.map(subasta => (
            <SubastaCard key={subasta.id} subasta={subasta} className="subasta-card" />
        ))}
    </div>
    );
};

export default ListaSubastas;
