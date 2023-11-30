import React from 'react';
import DALLE from './OpenAI-DALL-E.png';
import './service.css';
import EDUAM from './imag/educacion_ambiental.jpeg';
import CONC from './imag/conciencia.jpg';
function Service() {
  return (
    <div className="scroll-container">
      <div className="about-container">
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <h1 style={{ fontSize: '50px', fontFamily: 'TAN Headline' }}>Welcome to Service</h1>
          <p className='Service-first'>
            Bienvenido a nuestro servicio de simulación de degradación ambiental impulsado por la potente inteligencia artificial DALL·E. Nos dedicamos a proporcionar a los usuarios una experiencia visual única al permitirles explorar y comprender cómo podría degradarse el entorno a lo largo del tiempo.
          </p>

          {/* Sección "¿Cómo Funciona?" */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'justify', maxWidth: '400px' }}>
              <h2 style={{ color: '#6c9f64', fontFamily: 'Bekind', fontSize: '40px' }}>¿Cómo Funciona?</h2>
              <p className="Service-text">
                Bienvenido a nuestro servicio de simulación de degradación ambiental impulsado por la potente inteligencia artificial DALL·E. Nos dedicamos a proporcionar a los usuarios una experiencia visual única al permitirles explorar y comprender cómo podría degradarse el entorno a lo largo del tiempo.
              </p>
            </div>

            <div style={{ marginLeft: '20px' }}>
              <img
                src={DALLE}
                alt="Imagen IA"
                style={{ width: '80%', maxWidth: '550px', borderRadius: '10%' }}
              />
            </div>
          </div>

          {/* Sección "Transparencia y Educación Ambiental" */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ marginLeft: '10px' }}>
              <img
                src={EDUAM}
                alt="Imagen educación ambiental"
                style={{ width: '90%', maxWidth: '550px', borderRadius: '10%' }}
              />
            </div>
            
            <div style={{ textAlign: 'left', maxWidth: '400px' }}>
              <h2 style={{ color: '#6c9f64', fontFamily: 'Bekind', fontSize: '40px' }}>Transparencia y Educación Ambiental</h2>
              <p className="Service-text">
                Nos comprometemos a ser transparentes en cuanto al proceso de simulación. Proporcionamos información detallada sobre la tecnología utilizada, fomentando la comprensión de cómo la actividad humana puede afectar el medio ambiente. Creemos en la importancia de la educación ambiental para inspirar la acción y el cambio.
              </p>
            </div>

            
          </div>
          {/* Sección "Impacto y Concientización" */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'justify', maxWidth: '400px' }}>
              <h2 style={{ color: '#6c9f64', fontFamily: 'Bekind', fontSize: '40px' }}>Impacto y Concientización</h2>
              <p className="Service-text">
              Buscamos crear conciencia y fomentar la responsabilidad ambiental, motivando a los usuarios a tomar medidas positivas para abordar los desafíos medioambientales.
              </p>
            </div>

            <div style={{ marginLeft: '20px' }}>
              <img
                src={CONC}
                alt="conciencia"
                style={{ width: '80%', maxWidth: '550px', borderRadius: '10%' }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Service;
