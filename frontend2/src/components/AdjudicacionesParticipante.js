import React, { useState, useEffect } from 'react';
import { Table, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/AdjudicacionesParticipante.css';

const AdjudicacionesParticipante = () => {
    const [adjudicaciones, setAdjudicaciones] = useState([]);
    const { user } = useAuth();
    const [selectedFiles, setSelectedFiles] = useState({});
    const [pdfExists, setPdfExists] = useState({});

    useEffect(() => {
        if (user) {
            fetchAdjudicaciones(user.id);
        }
    }, [user]);

    const fetchAdjudicaciones = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/adjudicados/participante?usuarioId=${userId}`);
            const adjudicacionesData = response.data;

            const pdfExistencePromises = adjudicacionesData.map(adjudicacion =>
                axios.get(`http://localhost:8080/api/adjudicados/${adjudicacion.idLote}/pdf/exists`)
                    .then(response => ({ id: adjudicacion.idLote, exists: response.data }))
            );

            const pdfExistenceResults = await Promise.all(pdfExistencePromises);

            const pdfExistsMap = pdfExistenceResults.reduce((acc, result) => {
                acc[result.id] = result.exists;
                return acc;
            }, {});

            setAdjudicaciones(adjudicacionesData);
            setPdfExists(pdfExistsMap);
        } catch (error) {
            console.error('Error fetching adjudicaciones:', error);
        }
    };

    const getEstadoBadge = (estado) => {
        switch (estado) {
            case 'HABILITADO':
                return <Badge bg="success">Habilitado</Badge>;
            case 'RECHAZADO':
                return <Badge bg="danger">Rechazado</Badge>;
            default:
                return <Badge bg="secondary">Por verificar</Badge>;
        }
    };

    const downloadPdf = (id) => {
        axios.get(`http://localhost:8080/api/adjudicados/${id}/pdf`, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `voucher_${id}.pdf`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => console.error('Error downloading PDF:', error));
    };

    const handleFileChange = (id, event) => {
        setSelectedFiles({
            ...selectedFiles,
            [id]: event.target.files[0]
        });
    };

    const uploadPdf = (id) => {
        const formData = new FormData();
        formData.append('file', selectedFiles[id]);

        axios.post(`http://localhost:8080/api/adjudicados/${id}/uploadPdf`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                alert('PDF subido exitosamente');
                fetchAdjudicaciones(user.id); // Refrescar adjudicaciones después de subir el PDF
            })
            .catch(error => console.error('Error uploading PDF:', error));
    };

    return (
        <div className="adjudicaciones-participante">
            <h2>Mis Adjudicaciones</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID Lote</th>
                        <th>Título del Lote</th>
                        <th>ID Subasta</th>
                        <th>Nombre de la Subasta</th>
                        <th>Fecha de Adjudicación</th>
                        <th>Estado</th>
                        <th>Voucher</th>
                    </tr>
                </thead>
                <tbody>
                    {adjudicaciones.map(adjudicacion => (
                        <tr key={adjudicacion.idLote}>
                            <td>{adjudicacion.idLote}</td>
                            <td>{adjudicacion.tituloLote}</td>
                            <td>{adjudicacion.idSubasta}</td>
                            <td>{adjudicacion.nombreSubasta}</td>
                            <td>{new Date(adjudicacion.fechaAdjudicacion).toLocaleString()}</td>
                            <td>{getEstadoBadge(adjudicacion.estado)}</td>
                            <td>
                                {pdfExists[adjudicacion.idLote] ? (
                                    <div>
                                        <button onClick={() => downloadPdf(adjudicacion.idLote)} className="btn btn-primary">
                                            Descargar PDF
                                        </button>
                                        <input type="file" onChange={(e) => handleFileChange(adjudicacion.idLote, e)} />
                                        <button onClick={() => uploadPdf(adjudicacion.idLote)} className="btn btn-success">
                                            Subir de nuevo
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <input type="file" onChange={(e) => handleFileChange(adjudicacion.idLote, e)} />
                                        <button onClick={() => uploadPdf(adjudicacion.idLote)} className="btn btn-success">
                                            Subir PDF
                                        </button>
                                        <span>El participante no ha subido el voucher de pago</span>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdjudicacionesParticipante;
