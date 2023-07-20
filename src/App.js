import React, { useState } from "react";
import axios from "axios";
import 'quill/dist/quill.snow.css';
import ReactQuill, { Quill } from "react-quill";
import TextEditor, {modules,formats, handleProcedureContentChange } from "./TextEditor";

function App() {
  const [textContent, setTextContent] = useState("");

  const handleSaveButtonClick = () => {
    // Send the content to the API endpoint
    axios
      .post("http://localhost:3000/api/saveText", { text: textContent })
      .then((response) => {
        console.log("Text saved to MongoDB:", response.data);
        // Handle success or do something with the response
      })
      .catch((error) => {
        console.error("Error saving text to MongoDB:", error);
        // Handle error
      });
  };

  const handleTextChange = (content) => {
    setTextContent(content);
    handleProcedureContentChange(content); // Call your custom handler if needed
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Text Editor In React JS</h1>
      <div>
        <button
          onClick={handleSaveButtonClick}
          style={{
            marginLeft: "200px",
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
            // ref={quillRef}
            theme="snow"
            placeholder="Write your content ..."
            value={textContent}
            onChange={setTextContent}
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
      
    </div>
  );
}

export default App;
