import React, { useState } from 'react';
import {OpenAI} from 'openai';


function App() {
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState('');
  const [maskImage, setMaskImage] = useState(null);
  const openai = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});




  const handleInputUpload = (e) => {
    const file = e.target.files[0];
    setInputImage(file);
  };

  const handleMaskUpload = (e) => {
    const file = e.target.files[0];
    setMaskImage(file)
  }

  const handleEditImage = async () => {
    try {

      const response = await openai.images.edit({
        prompt: 'Make this city look like humans have abandoned it and nature has grown everywhere',
        image: inputImage,
        mask: maskImage
      });
      // Assuming the OpenAI response contains the edited image URL
      setOutputImage(response.data[0].url);
    } catch (error) {
      console.error('Error editing image:', error);
    }
  };

  return (
      <div className="App">
        <h1>Huellas Humanas</h1>
        <div>
          <label htmlFor="inputImage">Upload Image:</label>
          <input
              type="file"
              accept=".png"
              id="inputImage"
              onChange={handleInputUpload}
          />
          <span>Mask</span>
          <input
            type="file"
            accept=".png"
            id="maskImage"
            onChange={handleMaskUpload}
          />
        </div>
        <button onClick={handleEditImage}>Edit Image</button>
        {outputImage && (
            <div>
              <h2>Edited Image:</h2>
              <img src={outputImage} alt="Edited" />
            </div>
        )}
      </div>
  );
}

export default App;
