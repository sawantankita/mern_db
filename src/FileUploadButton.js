import React, { useState } from 'react';
import axios from 'axios';

const FileUploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (!selectedFile) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = async () => {
      const textContent = fileReader.result;
      try {
        await axios.post('http://localhost:3000/api/saveText', { text: textContent });
        console.log('File uploaded and saved successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

    fileReader.readAsText(selectedFile);
  };

  return (
    <div>
      <label htmlFor="fileInput" style={{ cursor: 'pointer', backgroundColor: '#9CFF2E' }}>
        Attach File
      </label>
      <input type="file" id="fileInput" onChange={onFileChange} style={{ display: 'none' }} />
      <button
        onClick={onFileUpload}
        style={{
          marginLeft: '50px',
          padding: '0.5em 1em',
          fontSize: '0.9em',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Upload!
      </button>
    </div>
  );
};

export default FileUploadButton;
