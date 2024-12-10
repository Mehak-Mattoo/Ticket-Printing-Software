import React, { useState, useEffect } from "react";
import axios from "axios";

const Translator = ({ parsedText }) => {
  const [text, setText] = useState(parsedText||""); 
  const [targetLanguage, setTargetLanguage] = useState("en"); 
  const [translatedText, setTranslatedText] = useState(""); // State to store translated text
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(""); // State to store any error messages

  // Synchronize `parsedText` with `text` state
useEffect(() => {
  if (parsedText !== undefined && parsedText !== null) {
    setText(parsedText);
  }
}, [parsedText]);


  const chunkText = (text, size) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += size) {
      chunks.push(text.slice(i, i + size));
    }
    return chunks;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(""); 
setTranslatedText("")

    const chunkSize = 5000; // Adjust chunk size
    const textChunks = chunkText(text, chunkSize);
    const translatedChunks = [];

    try {
  for (const chunk of textChunks) {
    // POST each chunk to the backend
    const response = await axios.post("http://localhost:8080/translate", {
      text: chunk,
      targetLanguage: targetLanguage,
    });
    translatedChunks.push(response.data.text); // Collect translated chunks
   // console.log(translatedChunks);
   console.log(response.data);
   
    setTranslatedText((prev) => prev + " " + response.data.text);
    
  }
 setTranslatedText(translatedChunks.join(" "));
    } catch (error) {
      console.error("Error:", error);
      setError("Error occurred during translation.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

   const downloadDoc = async () => {
     try {
       // Request the backend to generate and provide the Word file
       const response = await axios.post(
         "http://localhost:8080/generate-doc",
         { text: translatedText },
         { responseType: "blob" } // Ensure the response is treated as a blob
       );

       // Create a download link and trigger download
       const blob = new Blob([response.data], {
         type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
       });
       const link = document.createElement("a");
       link.href = window.URL.createObjectURL(blob);
       link.download = "translated-text.docx";
       link.click();
     } catch (error) {
       console.error("Error downloading document:", error);
       setError("Error occurred while generating the document.");
     }
   };


  return (
    <div style={{ padding: "20px" }}>
      <h1>Text Translation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Enter Text:</label>
          <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{
              marginLeft: "10px",
              padding: "5px",
              width: "300px",
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="language">Select Target Language:</label>
          <select
            id="language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "5px",
            }}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ur">Urdu</option>
            {/* Add more target languages here */}
          </select>
        </div>
        <br />
        <button
          type="submit"
          style={{ padding: "10px 20px" }}
          disabled={loading}
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </form>

      <h2>Translated Text:</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>{translatedText}</p>

      {translatedText && (
        <button
          onClick={downloadDoc}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Download as Word Document
        </button>
      )}
    </div>
  );
};

export default Translator;
