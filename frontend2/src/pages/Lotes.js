import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Lotes = () => {

    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [loteType, setLoteType] = useState('');
    const [images, setImages] = useState([]);

    const [formData, setFormData] = useState({
        tipoLote: '',
        placa: '',
        nombre: '',
        descripcion: '',
        km: '',
        anio: '',
        modelo: '',
        direccion: '',
        precioBase: '',
        moneda: ''
    });

    const lotes = [
        { id: 1, type: 'Vehículo', description: 'Auto deportivo', price: '20000', currency: 'Dólares' },
        { id: 2, type: 'Inmueble', description: 'Casa en la playa', price: '50000', currency: 'Soles' },
        // Más lotes pueden ser agregados aquí
    ];

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    
    const handleTypeChange = (e) => {
        setLoteType(e.target.value);
        setFormData({ ...formData, tipoLote: e.target.value });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };


    const handleRegisterLote = async () => {
        const loteData = new FormData();

            // Agregar cada campo del formulario como una entrada separada en el FormData
            loteData.append('tipoLote', formData.tipoLote);
            loteData.append('placa', formData.placa);
            loteData.append('nombre', formData.nombre);
            loteData.append('descripcion', formData.descripcion);
            loteData.append('km', formData.km);
            loteData.append('anio', formData.anio);
            loteData.append('modelo', formData.modelo);
            loteData.append('direccion', formData.direccion); // Asegúrate de que esto se maneje condicionalmente si es necesario
            loteData.append('precioBase', formData.precioBase);
            loteData.append('moneda', formData.moneda);

            // Añade imágenes
            images.forEach(image => {
                loteData.append('imagenes', image);
            });
            
            console.log(formData)
            for (let key of loteData.keys()) {
                console.log(key, loteData.getAll(key));
            }
        try {
            const response = await axios.post(`http://localhost:8080/api/lotes/subasta/${id}`, loteData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert("Lote registrado con éxito");
            setShowModal(false); // Cierra el modal después del registro exitoso
        } catch (error) {
            console.error('Error al registrar el lote:', error);
            alert("Error al registrar el lote");
        }
        
    };
    return (
        <div className="container">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Precio Base</th>
                        <th>Moneda</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lotes.map((lote) => (
                        <tr key={lote.id}>
                            <td>{lote.id}</td>
                            <td>{lote.type}</td>
                            <td>{lote.description}</td>
                            <td>{lote.price}</td>
                            <td>{lote.currency}</td>
                            <td>
                                <Button variant="primary" className="me-2">Editar</Button>
                                <Button variant="danger">Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="success" onClick={handleShowModal}>Registrar Nuevo Lote</Button>

            {/* Modal para registrar nuevo lote */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar Nuevo Lote</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de Lote</Form.Label>
                            <Form.Control as="select" defaultValue="" onChange={handleTypeChange}>
                                <option disabled value="">Seleccione...</option>
                                <option value="vehiculo">Vehículo</option>
                                <option value="motocicleta">Motocicleta</option>
                                <option value="inmueble">Inmueble</option>
                                <option value="otro">Otro</option>
                            </Form.Control>
                        </Form.Group>

                        {loteType === 'vehiculo' || loteType === 'motocicleta' ? (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Placa</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese la placa" name = "placa" value={formData.placa} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese el nombre" name = "nombre" value={formData.nombre} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control type="text" placeholder="Descripción del lote" name = "descripcion" value={formData.descripcion} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kilometraje</Form.Label>
                                    <Form.Control type="number" placeholder="Kilometraje" name = "km" value={formData.km} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Año de Fabricación</Form.Label>
                                    <Form.Control type="number" placeholder="Año de fabricación" name = "anio" value={formData.anio} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Modelo</Form.Label>
                                    <Form.Control type="text" placeholder="Modelo" name = "modelo" value={formData.modelo} onChange={handleChange}/>
                                </Form.Group>
                            </>
                        ) : null}

                        {loteType === 'inmueble' ? (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control type="text" placeholder="Dirección del inmueble" name = "direccion" value={formData.direccion} onChange={handleChange}  />
                                </Form.Group>
                            </>
                        ) : null}

                        <Form.Group className="mb-3">
                            <Form.Label>Subir Imágenes</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={handleImageChange}
                            />
                            <Form.Text className="text-muted">
                                Mantén presionada la tecla Ctrl para seleccionar múltiples imágenes.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control type="text" placeholder="Descripción del inmueble"   name = "descripcion" value={formData.descripcion} onChange={handleChange}/>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Moneda</Form.Label>
                            <Form.Control as="select" defaultValue="Soles"  name = "moneda" value={formData.moneda} onChange={handleChange}>
                                <option disabled value="">Seleccione...</option>
                                <option>Soles</option>
                                <option>Dólares</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio Base</Form.Label>
                            <Form.Control type="num" placeholder="Precio base"  name = "precioBase" value={formData.precioBase} onChange={handleChange} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                    <Button variant="primary" onClick={handleRegisterLote}>Registrar Lote</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Lotes;
