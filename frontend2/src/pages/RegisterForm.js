import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    genero: '',
    estadoCivil: '',
    departamento: '',
    provincia: '',
    distrito: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    tipoPersona: '',
    actividadEconomica: '',
    nombreComercial: '',
    ruc: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = {
      usuarioDTO: {
        email: formData.email,
        password: formData.password,
        rol: 'Usuario'
      },
      personaDTO: {
        tipo: formData.tipoPersona,
        dni: formData.dni,
        nombres: formData.nombres,
        nombreComercial: formData.nombreComercial,
        ruc: formData.ruc,
        actividadEconomica: formData.actividadEconomica,
        apellido: formData.apellidos,
        fechaNacimiento: formData.fechaNacimiento,
        sexo: formData.genero,
        estadoCivil: formData.estadoCivil,
        telefono: formData.telefono,
        departamento: formData.departamento,
        provincia: formData.provincia,
        distrito: formData.distrito,
        direccion: formData.direccion,
        numero: formData.numero,
        activo: true
      }
    };

    if (!formData.acceptTerms) {
      alert('Debe aceptar los términos y condiciones para continuar.');
      return;
    }


    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/registrar', data);
      console.log(response.data);
      if (response.status === 200) {
        alert('Registro exitoso');
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al enviar la solicitud", error);
      alert("Error al registrar el usuario");
    }
  };

  return (
    <Container fluid="md" className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="w-100" style={{ maxWidth: '720px' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <h3 className="mb-3">Registro de nuevo usuario</h3>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Tipo de Persona</Form.Label>
                  <Row>
                    <Col sm={6}>
                      <Form.Check
                        type="radio"
                        label="Persona Natural"
                        name="tipoPersona"
                        value="natural"
                        checked={formData.tipoPersona === 'natural'}
                        onChange={handleChange}
                        id="natural"
                      />
                    </Col>
                    <Col sm={6}>
                      <Form.Check
                        type="radio"
                        label="Persona con RUC"
                        name="tipoPersona"
                        value="ruc"
                        checked={formData.tipoPersona === 'ruc'}
                        onChange={handleChange}
                        id="conRuc"
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            {formData.tipoPersona === 'natural' ? (
              <>
                <h5>Datos Personales</h5>
                {/* Form controls for personal data */}
                <Form.Group className="mb-3">
                <FloatingLabel controlId="floatingInputNombres" label="Nombres" className="mb-3">
                  <Form.Control type="text" placeholder="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} />
                </FloatingLabel>
              </Form.Group>
  
  
                <Form.Group className="mb-3">
                  <FloatingLabel
                      controlId="floatingInputApellidos"
                      label="Apellidos"
                      className="mb-3"
                      value={formData.apellidos}
                      onChange={handleChange}
                    >
                      <Form.Control type="text" name='apellidos' placeholder="Apellidos" onChange={handleChange}/>
                    </FloatingLabel>
                </Form.Group>
  
                <Form.Group className="mb-3">
                  <FloatingLabel
                      controlId="floatingInputDni"
                      label="DNI/CE"
                      className="mb-3"
                      value={formData.dni}
                      onChange={handleChange}
                    >
                      <Form.Control type="text" name='dni' placeholder="DNI/CE"onChange={handleChange} />
                    </FloatingLabel>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Select aria-label="Género" name = 'genero' value={formData.genero} onChange={handleChange}>
                      <option>Género</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control
                      type="date"
                      controlId="fechaNacimiento"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleChange}
                    />
                </Form.Group>
                
              </>
            ) : (
              <>
                <h5>Datos Comerciales</h5>
                {/* Form controls for commercial data */}
                <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingInputNombreComercial"
                  label="Nombre comercial"
                  className="mb-3"
                  value={formData.nombreComercial} 
                >
                  <Form.Control type="text" placeholder="Nombre comercial" name="nombreComercial" onChange={handleChange} />
                </FloatingLabel>
              </Form.Group>


              <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="floatingInputRuc"
                    label="Ruc"
                    className="mb-3"
                    value={formData.ruc}
                    onChange={handleChange}
                  >
                    <Form.Control type="text" placeholder="Ruc" name="ruc" onChange={handleChange} />
                  </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="floatingInputActividadEconomica"
                    label="Actividad Economica"
                    className="mb-3"
                    value={formData.actividadEconomica}
                    onChange={handleChange}
                  >
                    <Form.Control type="text" placeholder="Actividad Economica" name="actividadEconomica" onChange={handleChange}/>
                  </FloatingLabel>
              </Form.Group>
              </>
            )}

            <h5>Datos de Contacto</h5>
            {/* Form controls for contact data */}
            <Form.Group className="mb-3">
                <FloatingLabel
                    controlId="floatingInputDepartamento"
                    label="Departamento"
                    className="mb-3"
                    value={formData.departamento}
                    onChange={handleChange}
                  >
                    <Form.Control type="text" placeholder="Departamento" name="departamento" onChange={handleChange}/>
                  </FloatingLabel>

              </Form.Group>
              <Form.Group className="mb-3">
                  <FloatingLabel
                      controlId="floatingInputProvincia"
                      label="Provincia"
                      className="mb-3"
                      value={formData.provincia}
                      onChange={handleChange}
                    >
                      <Form.Control type="text" placeholder="Provincia" name="provincia" onChange={handleChange} />
                    </FloatingLabel>
                
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel
                        controlId="floatingInputDistrito"
                        label="Distrito"
                        className="mb-3"
                        value={formData.distrito}
                        onChange={handleChange}
                      >
                        <Form.Control type="text" placeholder="Distrito" name="distrito" onChange={handleChange} />
                      </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel
                        controlId="floatingInputDireccion"
                        label="Direccion"
                        className="mb-3"
                        value={formData.direccion}
                        onChange={handleChange}
                      >
                        <Form.Control type="text" placeholder="Direccion" name="direccion" onChange={handleChange} />
                      </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel
                        controlId="floatingInputTelefono"
                        label="Telefono"
                        className="mb-3"
                        value={formData.telefono}
                        onChange={handleChange}
                      >
                        <Form.Control type="text" placeholder="Telefono"  name="telefono" onChange={handleChange}/>
                  </FloatingLabel>
              </Form.Group>

            <h5>Datos de Acceso</h5>
            {/* Form controls for account data */}
            <Form.Group className="mb-3">
                <FloatingLabel
                          controlId="floatingInputEmail"
                          label="Email"
                          className="mb-3"
                          value={formData.email}
                          onChange={handleChange}
                        >
                          <Form.Control type="text" placeholder="Email" name="email" onChange={handleChange}/>
                    </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel
                          controlId="floatingInputPassword"
                          label="Password"
                          className="mb-3"
                          value={formData.password}
                          onChange={handleChange}
                        >
                          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                    </FloatingLabel>
              </Form.Group>


              <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="acceptTerms"
                label="Acepto los términos y condiciones"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Registrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterForm;
