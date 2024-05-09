import React, { useEffect, useState } from "react";
import {  Table, Button, Modal, Form } from "react-bootstrap";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../utils/formatDate";
const Subasta = () => {
    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);

    const [subastas,setSubastas] = useState([]) ; 

    const [formData , setFormData] = useState({
        nombre :'' , 
        descripcion: '' ,
        fechaCreacion: new Date().toISOString(),
        fechaCierre: '' , 
        estado: 'Activo' 
    }) ; 

    const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/detalle-subasta/${id}`);
  };

    useEffect(() => {
        fetch('http://localhost:8080/api/subasta')
          .then(response => response.json())
          .then(data => setSubastas(data))
          .catch(error => console.error('Error al obtener subastas:', error));
      }, []);

      console.log(subastas)
    // Manejar abrir/cerrar modal
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Función para agregar una nueva subasta (ejemplo simple)
    const handleCreateSubasta = async () => {
        // Aquí se podría agregar lógica para crear una subasta
        console.log("Crear nueva subasta");
        console.log(formData)
        try {
            await axios.post('http://localhost:8080/api/subasta', formData);
      
            // Llama a la función para notificar que se ha agregado una nueva subasta
            alert("Subasta creada")
          } catch (error) {
            console.error('Error al crear la subasta:', error);
          }


        handleCloseModal();
        handleNewSubastaAdded() ;
    };

    const fetchSubastas = () => {
        fetch('http://localhost:8080/api/subasta')
          .then(response => response.json())
          .then(data => setSubastas(data))
          .catch(error => console.error('Error al obtener subastas:', error));
      };

    const handleNewSubastaAdded = () => {   
        fetchSubastas() ; 
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Bienvenido a la página de subastas</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre de la subasta</th>
                        <th>Fecha de creación</th>
                        <th>Fecha de cierre</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {subastas.map((subasta) => (
                        <tr key={subasta.id}>
                            <td>{subasta.id}</td>
                            <td>{subasta.nombre}</td>
                            <td>{formatDate(subasta.fechaCreacion)}</td>
                            <td>{formatDate(subasta.fechaCierre)}</td>
                            <td>{subasta.estado}</td>
                            <td><Button variant="primary" onClick={()=>handleDetailsClick(subasta.id)}>Ver Detalles</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="success" onClick={handleShowModal}>Crear Nueva Subasta</Button>

            {/* Modal para crear nueva subasta */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Subasta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label >Nombre de la subasta</Form.Label>
                            <Form.Control name = 'nombre' value={formData.nombre} type="text" placeholder="Ingrese el nombre"  onChange={handleChange}/>
                            <Form.Label>Ingrese la fecha de cierre</Form.Label>
                            <Form.Control name = 'fechaCierre' value = {formData.fechaCierre} type="date" onChange={handleChange}  />
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control name = 'descripcion' value = {formData.descripcion} as="textarea" rows={8} onChange={handleChange} />
                           
                        </Form.Group>
                        {/* Puedes agregar más campos aquí según sea necesario */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleCreateSubasta}>
                        Crear Subasta
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Subasta;
