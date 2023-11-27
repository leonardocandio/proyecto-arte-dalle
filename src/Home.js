import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ecorococo from './ecorococo.png';
import './App.css';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLearnMoreClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    let navigate = useNavigate(); // Instancia de navigate

    function handleGetStartedClick() {
      navigate('/getstart'); // Redirigo a la ruta 'getstart'
    }
  return (
    <div className="home-container">
      <div className="text-container">
        <div className="home-title-container">
          <h2 className="home-title">Huellas</h2>
          <h2 className="home-title2">Humanas</h2>
        </div>
        <div className="home-description-container">
          <p className="home-description">
            Cada acción deja una huella y cada huella, deja un rastro en nuestro planeta. Juntos, hagamos que cada paso cuente hacia un futuro más verde.
          </p>
          <div className='buton-container'>
          <button onClick={handleGetStartedClick} className="home-button">Get started</button>
          <button onClick={handleLearnMoreClick} className="home-button">Learn more</button>
            {/* Modal */}
            {isModalOpen && (
                <div className="modal-background">
                <div className="modal-content">
                    <span className="close-modal" onClick={handleCloseModal}>&times;</span>
                    <h3>Más sobre Huellas Humanas</h3>
                    <p className='home-description2'>
                    En Huellas Humanas, creemos firmemente que cada pequeño paso que damos puede tener un impacto significativo en la preservación de nuestro planeta. Nuestra misión fundamental es crear conciencia sobre cómo nuestras acciones cotidianas pueden influir positiva o negativamente en el medio ambiente. Queremos inspirar a las personas a reflexionar sobre sus comportamientos y decisiones, y cómo estos podrían haber afectado de manera diferente al mundo si hubiéramos actuado de manera más responsable.
                    En esencia, Huellas Humanas se dedica a mostrar el otro lado de la moneda, a pintar un cuadro de lo que podría haber sido si hubiéramos tomado decisiones más sostenibles en el pasado y cómo esas elecciones pueden cambiar el rumbo de nuestro futuro. Nos esforzamos por alentar a las personas a considerar las consecuencias de sus acciones y a buscar formas de mejorar sus prácticas para contribuir positivamente al bienestar del planeta.
                    A través de la educación, la innovación y la colaboración con la comunidad, Huellas Humanas trabaja incansablemente para transformar la conciencia en un impulso hacia un cambio positivo. Te invitamos cordialmente a unirte a nuestra causa y a compartir tus propias experiencias de transformación. Ya sea que estés dando tus primeros pasos hacia un estilo de vida más ecológico o busques formas de aumentar tu impacto, Huellas Humanas estará a tu lado en este viaje hacia un futuro más sostenible.
                    </p>
                    <p className='home-description3'>
                        <strong>¡Únete a nosotros y descubre cómo puedes ser la diferencia que el mundo necesita!</strong>
                    </p>
                </div>
                </div>
            )}
          </div>
        </div>
      </div>
      <div className="home-image">
        <img src={ecorococo} alt="Eco friendly activities" />
      </div>
    </div>
  );
}

export default Home;
