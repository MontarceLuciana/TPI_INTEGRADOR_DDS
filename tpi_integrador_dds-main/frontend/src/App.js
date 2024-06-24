import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Inicio } from './components/Inicio';
import { ServiciosListado } from './components/ServiciosListado';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Habitaciones } from './components/habitaciones/Habitaciones';
import { ModalDialog } from './components/ModalDialog';
import { RequireAuth } from './components/RequiereAuth';
import { Login } from './components/login/Login';
import { HabitacionesJWT } from './components/habitacionesJWT/HabitacionesJWT';

function App() {
  return (
    <Router>
      <>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/serviciosListado" element={<ServiciosListado />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route
              path="/habitacionesjwt"
              element={
                <RequireAuth>
                  <HabitacionesJWT />
                </RequireAuth>
              }
            />
            <Route path="/login/:componentFrom" element={<Login />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </>
    </Router>
  );
}

export default App;

