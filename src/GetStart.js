import React, { useState} from 'react';
import {OpenAI} from 'openai';
import { IoMdCloudUpload } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import './App.css';

function GetStart() {
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState('');
  const [maskImage, setMaskImage] = useState(null);

  // Estados para el nombre del archivo y el progreso de carga:
  const [uploading, setUploading] = useState(false);
  const [inputImageName, setInputImageName] = useState('');
  const [maskImageName, setMaskImageName] = useState('');
  const [inputImageTam, setInputImageTam] = useState('');
  const [maskImageTam, setMaskImageTam] = useState('');
  const [inputImageLoaded, setInputImageLoaded] = useState(false);
  const [maskImageLoaded, setMaskImageLoaded] = useState(false);

  // Estado para manejar el progreso de la carga:
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  
  const openai = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});
  
  // Función para convertir bytes a KB o MB
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const handleInputUpload = (e) => {
    const file = e.target.files[0];
    setInputImage(file);
    setInputImageName(file.name); // Guardar el nombre del archivo
    setInputImageTam(formatBytes(file.size)); // Guardar el tamaño del archivo formateado
    setProgress(0);
    setUploading(true); // Iniciar la simulación de carga

    // Cancela cualquier proceso de carga anterior si aún está activo
    clearInterval(window.inputUploadInterval);
    
    // Simular el proceso de carga
    window.inputUploadInterval = setInterval(() => {
        setProgress((oldProgress) => {
        if (oldProgress >= 100) {
            clearInterval(window.inputUploadInterval); // Termina la carga
            setInputImageLoaded(true); // Indica que la carga está completa
            setUploading(false);
            return 100;
        }
        return oldProgress + 10; // Incrementa el progreso
        });
    }, 70); // Actualiza el progreso cada 70ms
  };

  const handleMaskUpload = (e) => {
    const file = e.target.files[0];
    setMaskImage(file);
    setMaskImageName(file.name); // Guardar el nombre del archivo
    setMaskImageTam(formatBytes(file.size)); // Guardar el tamaño del archivo formateado
    setProgress2(0); // Reiniciar el progreso
    setUploading(true); // Iniciar la simulación de carga

    // Cancela cualquier proceso de carga anterior si aún está activo
    clearInterval(window.maskUploadInterval);

    // Simular el proceso de carga
    window.maskUploadInterval = setInterval(() => {
        setProgress2((oldProgress) => {
        if (oldProgress >= 100) {
            clearInterval(window.maskUploadInterval); // Termina la carga
            setMaskImageLoaded(true); // Indica que la carga está completa
            setUploading(false);
            return 100;
        }
        return oldProgress + 10; // Incrementa el progreso
        });
    }, 70); // Actualiza el progreso cada 70ms
  };


  const handleEditImage = async () => {
    try {

      const response = await openai.images.edit({
        prompt: 'Make this city look like humans have abandoned it and nature has grown everywhere',
        image: inputImage,
        mask: maskImage
      });
      setOutputImage(response.data[0].url);
    } catch (error) {
      console.error('Error editing image:', error);
    }
  };

  return (
    <div className="App2">
      <h1>Huellas Humanas</h1>
      {/* Sección para cargar imágenes */}
      <div className="upload-section">
        <div className="upload-item">
            <div className="upload-label">Upload Image</div>
            <label htmlFor="inputImage" className="upload-box"> <IoMdCloudUpload size={68} color='#00DEE6' /> 
            <div className='dragfiles'>
            <p>Drag files to upload</p>
            </div>
            <div className='dragfiles2'>
            <p>Max file size: <strong>50MB</strong></p>
            <p>Supported file types: <strong>JPG, PNG, SVG</strong></p>
            </div>
            </label>
            <input
                type="file"
                accept=".png"
                id="inputImage"
                onChange={handleInputUpload}
            />
            {/* Barra de carga para inputImage */}
            {inputImageName && (
            <div className="uploading-info">
                <p>
                {inputImageLoaded && <FaRegCircleCheck color='#4056F4'/>} {/* Muestra el ícono si la carga está completa */}
                {inputImageName} - {inputImageTam}
                </p>
                <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            )}
        </div>
        <div className="upload-item">
            <div className="upload-label">Mask</div>
            <label htmlFor="maskImage" className="upload-box"> <IoMdCloudUpload size={68} color='#00DEE6' />
            <div className='dragfiles'>
            <p>Drag files to upload</p>
            </div>
            <div className='dragfiles2'>
            <p>Max file size: <strong>50MB</strong></p>
            <p>Supported file types: <strong>JPG, PNG, SVG</strong></p>
            </div>
            </label>
            <input
            type="file"
            accept=".png"
            id="maskImage"
            onChange={handleMaskUpload}
            />
            {/* Barra de carga para maskImage */}
            {maskImageName && (
            <div className="uploading-info2">
                <p>
                {maskImageLoaded && <FaRegCircleCheck color='#4056F4'/>} {/* Muestra el ícono si la carga está completa */}
                {maskImageName} - {maskImageTam}
                </p>
                <div className="progress-bar">
                <div className="progress" style={{ width: `${progress2}%` }}></div>
                </div>
            </div>
            )}
        </div>
      </div>
      <button onClick={handleEditImage}>Edit Image</button>
      {/* Sección para mostrar la imagen editada */}
      {outputImage && (
          <div className="edited-image-section">
            <h2>Edited Image:</h2>
            <img src={outputImage} alt="Edited" />
          </div>
      )}
    </div>
  );
  
}

export default GetStart;
