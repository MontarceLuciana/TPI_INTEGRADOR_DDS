// src/pages/UserForm.js
//import React, { useState, useEffect } from 'react';
//import { useParams, useNavigate } from 'react-router-dom';
//import api from '../api';

//function UserForm() {
  //const { id } = useParams();
  //const navigate = useNavigate(); // Actualizamos a useNavigate
  //const [name, setName] = useState('');
  //const [email, setEmail] = useState('');

  //useEffect(() => {
    //if (id) {
      //api.get(`/users/${id}`)
        //.then(response => {
          //setName(response.data.name);
          //setEmail(response.data.email);
        //})
        //.catch(error => console.log(error));
    //}
  //}, [id]);

  //const handleSubmit = (event) => {
    //event.preventDefault();
    //const userData = { name, email };
    //if (id) {
      //api.put(`/users/${id}`, userData)
        //.then(() => navigate('/users')) // Actualizamos a useNavigate
        //.catch(error => console.log(error));
    //} else {
      //api.post('/users', userData)
        //.then(() => navigate('/users')) // Actualizamos a useNavigate
        //.catch(error => console.log(error));
    //}
  //};

  //return (
    //<div>
      //<h1>{id ? 'Editar Usuario' : 'Crear Usuario'}</h1>
      //<form onSubmit={handleSubmit}>
        //<div>
          //<label>Nombre:</label>
          //<input
            //type="text"
            //value={name}
            //onChange={(e) => setName(e.target.value)}
          ///>
        //</div>
        //<div>
          //<label>Email:</label>
          //<input
            //type="email"
            //value={email}
            //onChange={(e) => setEmail(e.target.value)}
          ///>
        //</div>
        //<button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      //</form>
    //</div>
  //);
//}

//export default UserForm;
