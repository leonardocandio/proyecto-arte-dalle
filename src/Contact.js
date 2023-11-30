import React from 'react';
import UTEC from './imag/UTEC.png';
import './Contact.css'; // Archivo de estilos
import EMA from './imag/email.png';
import DIRE from './imag/direccion.jpg';

function Contact() {
  return (
    <div className="scroll-container">
      <div className="about-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="contact-container">
            {/* Imagen UTEC a la izquierda */}
            <img
              src={UTEC}
              alt="UTEC Logo"
              style={{ width: '50%', maxWidth: '600px', marginRight: '20px' , borderRadius:'2%'}}
            />

            <div className="contact-info">
              <h1 style={{ fontSize: '50px', fontFamily: 'TAN Headline' }}>Contactate con Nosotros</h1>
              <p className="home-description5">
                Únete a nosotros, estudiantes de la universidad UTEC en la Facultad de Computación, apasionados por marcar la diferencia. Estamos comprometidos a concientizar sobre el daño ambiental y buscamos tu apoyo.
              </p>
              <p className="home-description5">
                Contáctate con nosotros a través de los siguientes correos:
              </p>
              <ul>
                <li className="home-description5">ximena.lindo@utec.edu.pe</li>
                <li className="home-description5">leonardo.candio@utec.edu.pe</li>
                <li className="home-description5">stuart.arteaga@utec.edu.pe</li>
                <li className="home-description5">maria.surco@utec.edu.pe</li>
              </ul>

              <p className="home-description5">O en la siguiente dirección:</p>
              <div className="information">
                <img src={DIRE} className="icon" alt="" style={{ marginBottom: -45 }} />
                <p className="home-description6"> <strong>Jr. Medrano Silva 165, Barranco 15063</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
