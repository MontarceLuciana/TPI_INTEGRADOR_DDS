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
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/serviciosListado" element={<ServiciosListado />} />
            <Route path="/habitaciones" element={<Libros />} />
            <Route
              path="/habitacionesjwt"
              element={
                <RequireAuth>
                  <HabitacionesJWT />
                </RequireAuth>
              }
            />
            <Route path="/directores" element={<Directores />} />
            <Route path="/peliculas" element={<Peliculas />} />
            <Route
              path="/peliculasJWT"
              element={
                <RequireAuth>
                  
                  <PeliculasJWT />
                </RequireAuth>
              }
            />
            <Route path="/artistas" element={<Artistas />} />
            <Route path="/canciones" element={<Canciones />} />
            <Route
              path="/cancionesjwt"
              element={
                <RequireAuth>
                  <CancionesJWT />
                </RequireAuth>
              }
            />
            <Route path="/login/:componentFrom" element={<Login />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;

