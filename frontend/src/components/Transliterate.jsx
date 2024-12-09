import React, { useState } from "react";

const Transliterate = () => {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("hi"); // Default language: Hindi
  const [transliteratedText, setTransliteratedText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the backend API
      const response = await fetch(
        `http://localhost:8080/transliterate?text=${encodeURIComponent(
          text
        )}&targetLanguage=${targetLanguage}`
      );

      if (!response.ok) {
        throw new Error("Failed to transliterate text");
      }

      const data = await response.json();
      setTransliteratedText(data.transliteration);
    } catch (error) {
      console.error("Error:", error);
      setTransliteratedText("Error occurred during transliteration.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Text Transliteration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Enter Text:</label>
          <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="language">Select Target Language:</label>
          <select
            id="language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            {" "}
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ur">Urdu</option>
            {/* Add more target languages here */}
          </select>
        </div>
        <br />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Transliterate
        </button>
      </form>

      <h2>Result:</h2>
      <p>{transliteratedText}</p>
    </div>
  );
};

export default Transliterate;
