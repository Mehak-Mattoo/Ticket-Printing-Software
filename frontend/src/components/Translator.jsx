import React, { useState } from "react";
import axios from "axios";

const Translator = () => {
  const [text, setText] = useState(""); // State to store text input
  const [targetLanguage, setTargetLanguage] = useState("en"); // Default target language: English
  const [translatedText, setTranslatedText] = useState(""); // State to store translated text
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(""); // State to store any error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous error message

    try {
      // Call the backend API using Axios (GET request with query parameters)
      const response = await axios.get("http://localhost:8080/translate", {
        params: {
          text: text,
          targetLanguage: targetLanguage,
        },
      });

      if (response.data.success) {
        setTranslatedText(response.data.translation); // Set the translated text
      } else {
        setError(response.data.message || "An error occurred during translation");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error occurred during translation.");
    } finally {
      setLoading(false); // Stop loading
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
        <button type="submit" style={{ padding: "10px 20px" }} disabled={loading}>
          {loading ? "Translating..." : "Translate"}
        </button>
      </form>

      <h2>Translated Text:</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>{translatedText}</p>
    </div>
  );
};

export default Translator;
