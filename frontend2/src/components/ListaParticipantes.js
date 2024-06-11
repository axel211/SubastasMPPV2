import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ListaParticipantes.css';
import { useParams } from 'react-router-dom';

const ListaParticipantes = () => {
    const [participantes, setParticipantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredParticipantes, setFilteredParticipantes] = useState([]);
    const [filterNombre, setFilterNombre] = useState('');
    const [filterApellido, setFilterApellido] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const { idSubasta } = useParams();
    
    useEffect(() => {
        const fetchParticipantes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/participantes/listaParticipantes/completo/${idSubasta}`);
                setParticipantes(response.data);
                setFilteredParticipantes(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchParticipantes();
    }, [idSubasta]);

    const actualizarEstado = async (idSolicitud, estado) => {
        try {
            await axios.put(`http://localhost:8080/api/participantes/actualizarEstado/${idSolicitud}?estado=${estado}`);
            setParticipantes(participantes.map(participante => 
                participante.idSolicitud === idSolicitud ? { ...participante, estado } : participante
            ));
        } catch (err) {
            console.error("Error actualizando el estado del participante:", err);
        }
    };

    const handleAprobar = (idSolicitud) => {
        actualizarEstado(idSolicitud, 'HABILITADO');
    };

    const handleRechazar = (idSolicitud) => {
        actualizarEstado(idSolicitud, 'RECHAZADO');
    };

    useEffect(() => {
        const filtered = participantes.filter(participante => {
            return (
                (filterNombre === '' || participante.nombre.toLowerCase().includes(filterNombre.toLowerCase())) &&
                (filterApellido === '' || participante.apellidos.toLowerCase().includes(filterApellido.toLowerCase())) &&
                (filterEstado === '' || participante.estado.toLowerCase() === filterEstado.toLowerCase())
            );
        });
        setFilteredParticipantes(filtered);
    }, [filterNombre, filterApellido, filterEstado, participantes]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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

    return (
        <div className="lista-participantes">
            <h2>Lista de Participantes</h2>
            <div className="filtros">
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={filterNombre} 
                    onChange={e => setFilterNombre(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Apellido" 
                    value={filterApellido} 
                    onChange={e => setFilterApellido(e.target.value)} 
                />
                <select 
                    value={filterEstado} 
                    onChange={e => setFilterEstado(e.target.value)} 
                >
                    <option value="">Todos los estados</option>
                    <option value="HABILITADO">Habilitado</option>
                    <option value="POR APROBAR">Por aprobar</option>
                    <option value="RECHAZADO">Rechazado</option>
                </select>
            </div>
            {filteredParticipantes.length > 0 ? (
                <table className="participantes-table">
                    <thead>
                        <tr>
                            <th>ID Solicitud</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Fecha de Registro</th>
                            <th>Fecha de Revisión</th>
                            <th>DNI</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredParticipantes.map(participante => (
                            <tr key={participante.idSolicitud}>
                                <td>{participante.idSolicitud}</td>
                                <td>{participante.nombre}</td>
                                <td>{participante.apellidos}</td>
                                <td>{new Date(participante.fechaRegistro).toLocaleDateString()}</td>
                                <td>{new Date(participante.fechaRevision).toLocaleDateString()}</td>
                                <td>{participante.dni ? participante.dni : 'N/A'}</td>
                                <td>{participante.monto}</td>
                                <td className={`estado-participante ${getClassForEstadoParticipante(participante.estado)}`}>
                                    {participante.estado}
                                </td>
                                <td>
                                    {participante.estado.toLowerCase() !== 'habilitado' && (
                                        <>
                                            <button className='Aprobar' onClick={() => handleAprobar(participante.idSolicitud)}>Aprobar</button>
                                            <button className='Rechazar' onClick={() => handleRechazar(participante.idSolicitud)}>Rechazar</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay participantes para esta subasta.</p>
            )}
        </div>
    );
};

export default ListaParticipantes;
