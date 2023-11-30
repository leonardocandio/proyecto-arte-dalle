// Contact.js
import React from 'react';
import UTEC from './UTEC-Logo-removebg-preview.png';

import './Contact.css'; // Archivo de estilos

function Contact() {
  return (
    <div className="contact-container">
      {/* Imagen UTEC a la izquierda */}
      <img
        src={UTEC}
        alt="UTEC Logo"
        style={{ width: '38%', maxWidth: '1000px', marginRight: '20px' }}
      />

      {/* Texto y cuadro a la derecha */}
      <div className="text-container">
        <h1>Contáctanos</h1>
        <div className="text-box">
        <p className="home-description">
  Únete a nosotros, estudiantes de la universidad UTEC en la Facultad de Computación, apasionados por marcar la diferencia. Estamos comprometidos a concientizar sobre el daño ambiental y buscamos tu apoyo. Comunícate con nosotros en <strong>ximena.lindo@utec.edu.pe</strong> para ser parte de esta iniciativa positiva.
</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;