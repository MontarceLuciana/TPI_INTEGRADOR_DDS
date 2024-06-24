// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import Users from './pages/Users';
import Posts from './pages/Posts';
import UserForm from './pages/UserForm';
import PostForm from './pages/PostForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import ServiciosListado from './components/ServiciosListado';

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Hotel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/servicios">Servicios Listado</Nav.Link>
                <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
                <Nav.Link as={Link} to="/user">Add User</Nav.Link>
                <Nav.Link as={Link} to="/post">Add Post</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/user/:id?" element={<UserForm />} />
            <Route path="/post/:id?" element={<PostForm />} />
            <Route path="/servicios" element={<ServiciosListado />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
