import React, {useState} from 'react';
import {OpenAI} from 'openai';
import {IoMdCloudUpload} from "react-icons/io";
import {FaRegCircleCheck} from "react-icons/fa6";
import './App.css';
import {Buffer} from "buffer";


function GetStart() {
    const [inputImage, setInputImage] = useState(null);
    const [outputImage, setOutputImage] = useState('');
    const [isUploadingOrComplete, setIsUploadingOrComplete] = useState(false);
    // Estados para el nombre del archivo y el progreso de carga:
    const [uploading, setUploading] = useState(false);
    const [inputImageName, setInputImageName] = useState('');
    const [inputImageTam, setInputImageTam] = useState('');
    const [inputImageLoaded, setInputImageLoaded] = useState(false);
    const [imgDescription, setImgDescription] = useState('');
    const [generatedLoaded, setgeneratedLoaded] = useState(false)
    const [generatedLoading, setGeneratedLoading] =useState(false);

    // Estado para manejar el progreso de la carga:
    const [progress, setProgress] = useState(0);

    const openai = new OpenAI({
        apiKey: "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", dangerouslyAllowBrowser: true
    });

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
        setIsUploadingOrComplete(true); 
        const file = e.target.files[0];

        if (!file) {
            return
        }

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
                    setIsUploadingOrComplete(true);
                    return 100;
                }
                return oldProgress + 10; // Incrementa el progreso
            });
        }, 70); // Actualiza el progreso cada 70ms
    };

    const getBase64 = async (image) => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            }
        })
    }

    const handleEditImage = async () => {
        setGeneratedLoading(true);

        let description, image;
        let inputImageBase64 = await getBase64(inputImage);
        let promptText = "Without adding any other answer, generate a thorough description of the every characteristic of this image. If present, describe " +
            "buildings, people, cars, weather, time of day, the general location and any other important feature.";

        promptText += imgDescription !== "" ? "This is an image of " + imgDescription : "";

        try {
            description = await openai.chat.completions.create({
                model: "gpt-4-vision-preview", messages: [{
                    role: "user", content: [{
                        type: "text",
                        text: promptText
                    }, {
                        type: "image_url", image_url: {"url": inputImageBase64},
                    },],
                },], temperature: 0.7, max_tokens: 3000
            });
        } catch (error) {
            console.error('Error describing image:', error);
        }


        let promptImage = description.choices[0].message.content;

        promptImage += " The described image has to be altered in a way that makes it look like humans haven't lived there in ages and nature has grown everywhere"

        try {
            image = await openai.images.generate({
                model: "dall-e-3", prompt: promptImage
            })
        } catch (error) {
            console.error('Error generating image:', error);
        }
        setOutputImage(image.data[0].url);
        setgeneratedLoaded(true);
        setGeneratedLoading(false);
    };

    const handleImgDescription = (e) => setImgDescription(e.target.value)

    return (

    <div className="scroll-container">
    <div className="App2">
        <h1>Huellas Humanas</h1>
        {/* Sección para cargar imágenes */}
        <div className="upload-section">
            <div className="upload-item">
                <div className="upload-label">Upload Image</div>
                <label htmlFor="inputImage" className="upload-box"> <IoMdCloudUpload size={68} color='#00DEE6'/>
                    <div className='dragfiles'>
                        <p>Drag files to upload</p>
                    </div>
                    <div className='dragfiles2'>
                        <p>Max file size: <strong>50MB</strong></p>
                        <p>Supported file types: <strong>PNG</strong></p>
                    </div>
                </label>
                <input
                    type="file"
                    accept=".png"
                    id="inputImage"
                    onChange={handleInputUpload}
                />
                {/* Barra de carga para inputImage */}
                {!generatedLoaded && inputImageName && (<div className="uploading-info">
                    <p>
                        {inputImageLoaded && <FaRegCircleCheck
                            color='#4056F4'/>} {/* Muestra el ícono si la carga está completa */}
                        {inputImageName} - {inputImageTam}
                    </p>
                    <div className="progress-bar">
                        <div className="progress" style={{width: `${progress}%`}}></div>
                    </div>
                </div>)}
            </div>
        </div>
        <div className="input-container" style={{ 
            marginTop: isUploadingOrComplete ? '60px' : '20px', 
            marginBottom: '-30px'
        }}>
        <input
            style={{
                backgroundColor: '#48BB78', // a light beige background for an eco-friendly look
                color: '#333', // a dark greenish-brown color for text for readability
                fontWeight: '500',
                border: '1px solid #8c8b74', // a complementary darker beige border
                borderRadius: '100px', // rounded corners
                padding: '13px', // internal padding for spaciousness
                fontFamily: 'Roboto", sans-serif', // a clean, modern font
                fontSize: '16px', // a readable font size
                outline: 'none', // remove the default focus outline to customize with a more subtle effectzy
            }}
            type="text"
            value={imgDescription}
            onChange={handleImgDescription}
            placeholder="¿Que deseas editar? 😊🌎" // a placeholder to guide users
        />
        </div>
        {inputImageLoaded && <button onClick={handleEditImage}>Edit Image</button>}
        {/* Sección para mostrar la imagen editada */}
        {outputImage && (<div className="edited-image-section">
            <h2>Edited Image:</h2>
            <img src={outputImage} alt="Edited"/>
        </div>)}
    </div>
        {generatedLoading && (<div className={"overlay"}> Cargando...  </div>)}
    </div>
    );

}

export default GetStart;
