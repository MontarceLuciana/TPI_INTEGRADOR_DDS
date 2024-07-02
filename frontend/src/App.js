import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Inicio } from './components/Inicio';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { ModalDialog } from './components/ModalDialog';
import { RequireAuth } from './components/RequiereAuth';
import { Login } from './components/login/Login';

import { Gastronomia } from './components/gastronomia/Gastronomia';
import GastronomiaJWT from "./components/gastronomiaJWT/GastronomiaJWT";
import  Eventos  from './components/Eventos';

import { ReservasListado } from './components/ReservasListado'; // Corrected import path
import { ClientesJWT } from './components/clientesJWT/ClientesJWT';
import EmpleadosListado from './components/EmpleadosListado'; // Corrected import path
import Tareas from './components/tareas/Tareas'; // Corrected import path
import Clientes from './components/clientes/Clientes'; // Corrected import path


function App() {
  return (
    <>
      <Router>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/gastronomia" element={<Gastronomia />} />
            <Route
              path="/gastronomiaJWT"
              element={
                <RequireAuth>
                  <GastronomiaJWT />
                </RequireAuth>
              }
            />
            <Route path="/reservasListado" element={<ReservasListado />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientesJWT" element={<ClientesJWT />} />
            <Route path="/empleados" element={<EmpleadosListado/>} />
            <Route path="/tareas" element={<Tareas/>} />
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
