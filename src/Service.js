import React from 'react';
import DALLE from './OpenAI-DALL-E.png';
import './App.css';

function Service() {
  return (
    <div>
      <h1>Welcome to Service</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={DALLE}
          alt="Imagen Grande"
          style={{ width: '80%', maxWidth: '600px', height: 'auto' }}
        />
      </div>
      <p className="home-description">
  Simulamos la degradación del ambiente usando  <strong>IA</strong> proporcionada por Dalle 2, el usuario ingresa una imagen
  y puede visualizar como sería una degradación del ambiente al pasar de los años.
</p>    </div>
  );
}

export default Service;