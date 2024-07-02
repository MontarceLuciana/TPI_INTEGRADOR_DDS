import React, { useState } from 'react';

function Inicio() {
  const [current, setCurrent] = useState(0);
  const images = [
    '/banner.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
    '/banner4.jpg',
    '/banner5.jpg',
    '/banner6.jpg',
  ];

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className="w3-content w3-display-container">
      {images.map((image, index) => (
        <img
          key={index}
          className="mySlides"
          src={process.env.PUBLIC_URL + image}
          alt={`Slide ${index + 1}`}
          style={{ display: index === current ? 'block' : 'none', width: '100%' }}
        />
      ))}
      <div className="w3-center w3-display-bottommiddle" style={{ width: '100%' }}>
        <div className="w3-left" onClick={prevSlide}>&#10094;</div>
        <div className="w3-right" onClick={nextSlide}>&#10095;</div>
        {images.map((_, index) => (
          <span
            key={index}
            className={`w3-badge demo w3-border ${current === index ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export { Inicio };