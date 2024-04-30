import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa useAuth
import '../styles/Login.css'

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email)
        console.log(password)
        console.log("BOTON APRETADO")
        const isAuthenticated = await login(email, password);
        if (isAuthenticated) {
          navigate('/dashboard');
        } else {
          alert('Login failed');
        }
      };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'hsla(0, 0%, 96%, 0.8)', backdropFilter: 'blur(10px)' }}>
    <MDBCard className='p-5 shadow-5' style={{ maxWidth: '800px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>
            <h2 className="fw-bold mb-5">Bienvenido de nuevo</h2>
            {/*<MDBRow>
                <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'/>
                </MDBCol>
                <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text'/>
                </MDBCol>
            </MDBRow>*/}

            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>


            <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}>Iniciar sesión</MDBBtn>

            {/*
            <div className="text-center">
                <p>or sign up with:</p>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>
            </div>
            */}
        </MDBCardBody>
    </MDBCard>
</div>


    );
}

export default Login;
 