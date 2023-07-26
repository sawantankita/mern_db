import React, { useState } from "react";
import axios from "axios";
import 'quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { modules, formats } from "./TextEditor";
import FileUploadButton from './FileUploadButton';

function App() {
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSaveButtonClick = () => {
    // Send the content and file to the API endpoint
    const formData = new FormData();
    formData.append("text", textContent);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    axios
    .post("http://localhost:3000/api/saveText", { text: textContent })
      .then((response) => {
        console.log("Text and file saved to MongoDB:", response.data);  //works for both
        // Handle success or do something with the response
      })
      .catch((error) => {
        console.error("Error saving text and file to MongoDB:", error);
        // Handle error
      });
  };

  const handleTextChange = (content) => {
    setTextContent(content);
  };


  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Text Editor In React JS</h1>
      <div>
      <FileUploadButton/>
        <button
          onClick={handleSaveButtonClick}
          style={{
            marginLeft: "250px",
            padding: "0.5em 1em",
            fontSize: "0.9em",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: "1" }}>
          <ReactQuill
            theme="snow"
            placeholder="Write your content ..."
            value={textContent}
            onChange={handleTextChange}
            modules={modules}
            formats={formats}
          />
        </div>
        <div>
         
        </div>
      </div>
    </div>
  );
}

export default App;