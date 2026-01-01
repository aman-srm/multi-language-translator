import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "te", label: "Telugu" },
  { value: "ta", label: "Tamil" },
  { value: "ml", label: "Malayalam" },
  { value: "kn", label: "Kannada" },
  { value: "bn", label: "Bengali" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "es", label: "Spanish" },
  { value: "ar", label: "Arabic" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ru", label: "Russian" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
];

function App() {
  const [sourceLang, setSourceLang] = useState(languages[0]);
  const [targetLang, setTargetLang] = useState(languages[1]);
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    if (!text.trim()) return alert("Please enter text to translate.");
    try {
      const res = await axios.post("http://localhost:5000/translate", {
        text,
        source: sourceLang.value,
        target: targetLang.value,
      });
      setTranslatedText(res.data.translatedText);
    } catch (err) {
      console.error(err);
      alert("Translation failed. Check backend or console.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    alert("Copied to clipboard!");
  };

  const handleSpeak = () => {
    if (!translatedText) return;
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLang.value;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Multi-Language Translator</h1>

      <div className="card input-card">
        <textarea
          className="input-text"
          placeholder="Enter text to translate..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="language-select">
          <Select options={languages} value={sourceLang} onChange={setSourceLang} />
          <Select options={languages} value={targetLang} onChange={setTargetLang} />
        </div>

        <button className="btn translate-btn" onClick={handleTranslate}>
          Translate
        </button>
      </div>

      <div className="card output-card">
        <textarea className="output-text" value={translatedText} readOnly />
        <div className="output-buttons">
          {translatedText && (
            <>
              <button className="btn copy-btn" onClick={handleCopy}>
                Copy
              </button>
              <button className="btn speak-btn" onClick={handleSpeak}>
                Listen
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
