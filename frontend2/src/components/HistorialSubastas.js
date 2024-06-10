import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/HistorialSubastas.css';

const HistorialSubastas = ({ idUsuario }) => {
    const [subastas, setSubastas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubastas = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/subasta/usuario/${idUsuario}`);
                setSubastas(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSubastas();
    }, [idUsuario]);

    const getClassForEstadoParticipante = (estado) => {
        switch (estado.toLowerCase()) {
            case 'habilitado':
                return 'habilitado';
            case 'por aprobar':
                return 'por-aprobar';
            case 'rechazado':
                return 'rechazado';
            default:
                return '';
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="historial-subastas">
            <h2>Historial de Subastas</h2>
            {subastas.length > 0 ? (
                <table className="subastas-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha de Cierre</th>
                            <th>Estado Subasta</th>
                            <th>Estado Participante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subastas.map(subasta => (
                            <tr key={subasta.id}>
                                <td>{subasta.nombre}</td>
                                <td>{subasta.descripcion}</td>
                                <td>{new Date(subasta.fechaCierre).toLocaleDateString()}</td>
                                <td className={`estado-subasta ${subasta.estadoSubasta.toLowerCase()}`}>
                                    {subasta.estadoSubasta}
                                </td>
                                <td className={`estado-participante ${getClassForEstadoParticipante(subasta.estadoParticipante)}`}>
                                    {subasta.estadoParticipante}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No has participado en ninguna subasta.</p>
            )}
        </div>
    );
};

export default HistorialSubastas;
