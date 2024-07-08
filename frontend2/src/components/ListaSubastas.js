import React, { useState, useEffect } from 'react';
import SubastaCard from './SubastaCard'; // Asegúrate de que la ruta sea correcta
import '../styles/Styles.css';

const ListaSubastas = () => {
    const [subastas, setSubastas] = useState([]);
    const [filteredSubastas, setFilteredSubastas] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');

    useEffect(() => {
        // Aquí deberías hacer la llamada a la API para obtener las subastas
        fetch('http://localhost:8080/api/subasta')
            .then(response => response.json())
            .then(data => {
                setSubastas(data);
                setFilteredSubastas(data);
            })
            .catch(error => console.error('Error fetching subastas:', error));
    }, []);

    useEffect(() => {
        handleFilter();
    }, [filtroNombre, filtroEstado, filtroFecha, subastas]);

    const handleFilter = () => {
        let filtered = subastas;

        if (filtroNombre) {
            filtered = filtered.filter(subasta =>
                subasta.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
            );
        }

        if (filtroEstado) {
            filtered = filtered.filter(subasta =>
                subasta.estado.toLowerCase() === filtroEstado.toLowerCase()
            );
        }

        if (filtroFecha) {
            filtered = filtered.filter(subasta =>
                new Date(subasta.fechaCierre).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }) === new Date(filtroFecha).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
            );
        }

        setFilteredSubastas(filtered);
    };

    return (
        <div className='container'>
            <div className="lista-subastas-container contenido">
                <h1 className="text-center my-4">Subastas</h1>
                <div className="filter-container">
                    <input
                        type="text"
                        placeholder="Filtrar por nombre"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        className="filter-input"
                    />
                    <select
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Todos los estados</option>
                        <option value="Activo">Activo</option>
                        <option value="Finalizada">Finalizada</option>
                    </select>
                    <input
                        type="date"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                        className="filter-input"
                    />
                </div>
                <div className="subastas-grid">
                    {filteredSubastas.map(subasta => (
                        <div key={subasta.id} className="subasta-item">
                            <SubastaCard subasta={subasta} className="subasta-card" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListaSubastas;
