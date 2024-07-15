import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import RegisterForm from './pages/RegisterForm';
import LandingPage from './pages/LandingPage';
import DetalleSubasta from './pages/DetalleSubasta';
import Lotes from './pages/Lotes';
import '../src/App.css';
import ListaSubastas from './components/ListaSubastas';
import ListaLotes from './components/ListaLotes';
import LoteDetalle from './components/LoteDetalle';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ListaParticipantes from './components/ListaParticipantes';
import Habilitate from './pages/Habilitate';
import Instructions from './components/Instructions';
// otros imports...

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/dashboard']; // Agrega aquí las rutas donde no quieres mostrar el footer
  return (
    <div className='app-container'>
      <Navbar />
      <div className='main-content'>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/participantes/:idSubasta" element={<ListaParticipantes />} />
          </Route>

          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<RegisterForm />} />
          <Route path="/subasta" element={<ListaSubastas />} />
          <Route path="/habilitate" element={<Habilitate />} />
          <Route path="/detalle-subasta/:id" element={<DetalleSubasta />} />
          <Route path="/detalle-subasta/:id/lotes" element={<Lotes />} />
          <Route path="/subasta/:id/lotes" element={<ListaLotes />} />
          <Route path="/oferta/lote/:id" element={<LoteDetalle />} />
          <Route path="/participa" element={<Instructions />} /> {/* Añade la nueva ruta */}
          {/* otras rutas... */}
        </Routes>
      </div>
      {/*!hideFooterRoutes.includes(location.pathname) && <Footer />*/}
    </div>
  );
}

export default App;
