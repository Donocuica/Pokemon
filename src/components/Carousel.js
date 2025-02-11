import React, { useState, useEffect } from "react";
import "./Carousel.css"; // Asegúrate de importar el CSS

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // Cambia cada 4 segundos
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel-container">
      {/* Botón Anterior */}
      <button className="carousel-button left" onClick={prevSlide}>
        ‹
      </button>

      {/* Imágenes del Carrusel */}
      <div
        className="carousel"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Pokemon ${index}`} className="carousel-img" />
        ))}
      </div>

      {/* Botón Siguiente */}
      <button className="carousel-button right" onClick={nextSlide}>
        ›
      </button>

      {/* Indicadores (puntos debajo del carrusel) */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
