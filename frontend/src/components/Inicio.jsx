import React from 'react'; // Necesaria en StackBlitz
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + '/banner.jpg'}
        alt="Banner Hotel"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}

export { Inicio };
