// src/pages/PostForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate(); // Actualizamos a useNavigate
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/posts/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch(error => console.log(error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = { title, content };
    if (id) {
      api.put(`/posts/${id}`, postData)
        .then(() => navigate('/posts')) // Actualizamos a useNavigate
        .catch(error => console.log(error));
    } else {
      api.post('/posts', postData)
        .then(() => navigate('/posts')) // Actualizamos a useNavigate
        .catch(error => console.log(error));
    }
  };

  return (
    <div>
      <h1>{id ? 'Editar Post' : 'Crear Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Contenido:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
}

export default PostForm;
