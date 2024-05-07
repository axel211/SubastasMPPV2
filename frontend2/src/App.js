import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterForm from './pages/RegisterForm';
import LandingPage from './pages/LandingPage';
import DetalleSubasta from './pages/DetalleSubasta';
import Lotes from './pages/Lotes';
import '../src/App.css'
import ListaSubastas from './components/ListaSubastas';
import ListaLotes from './components/ListaLotes';

// otros imports...

function App() {
  return (
    <div className='app-container'>
      
      <Navbar/>
      <div className='contenido'>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/dashboard" element={
                  <Dashboard />
                  } />
        <Route path = '/subasta' element = {<ListaSubastas/>}/>
        <Route path='/detalle-subasta/:id' element={<DetalleSubasta/>}/>
        <Route path='/detalle-subasta/:id/lotes' element = {<Lotes/>} />
        <Route path="/subasta/:id/lotes" element={<ListaLotes />} />
        // otras rutas...
      </Routes>
              
      </div>
      <Footer/>
    </div>
  );
}

export default App;
