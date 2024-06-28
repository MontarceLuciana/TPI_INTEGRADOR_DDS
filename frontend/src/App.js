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
import { ReservasListado } from './components/ReservasListado'; // Corrected import path
import { Clientes } from './components/clientes/Clientes';
import { ClientesBuscar } from './components/clientes/ClientesBuscar';
import { ClientesListado } from './components/clientes/ClientesListado';
import { ClientesRegistro } from './components/clientes/ClientesRegistro';
import { ClientesJWT } from './components/clientesJWT/ClientesJWT';
import { HabitacionesJWT } from "./components/habitacionesJWT/HabitacionesJWT";

function App() {
  return (
    <>
      <Router>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/serviciosListado" element={<ServiciosListado />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route
              path="/habitacionesJWT"
              element={
                <RequireAuth>
                  <HabitacionesJWT />
                </RequireAuth>
              }
            />
            <Route path="/reservasListado" element={<ReservasListado />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientesBuscar" element={<ClientesBuscar />} />
            <Route path="/clientesListado" element={<ClientesListado />} />
            <Route path="/clientesRegistro" element={<ClientesRegistro />} />
            <Route path="/clientesJWT" element={<ClientesJWT />} />
            <Route path="/login/:componentFrom" element={<Login />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
