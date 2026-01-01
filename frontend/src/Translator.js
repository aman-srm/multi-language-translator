import React, { useState } from "react";
import axios from "axios";

const languages = [
 { code: "en", name: "English" },
 { code: "hi", name: "Hindi" },
 { code: "es", name: "Spanish" },
 { code: "fr", name: "French" },
 { code: "de", name: "German" },
 { code: "it", name: "Italian" },
 { code: "ru", name: "Russian" },
 { code: "ar", name: "Arabic" },
 { code: "zh", name: "Chinese" },
 { code: "ja", name: "Japanese" },
 { code: "ko", name: "Korean" },
 { code: "pt", name: "Portuguese" },
 { code: "tr", name: "Turkish" },
 { code: "nl", name: "Dutch" },
 { code: "pl", name: "Polish" },
 { code: "sv", name: "Swedish" },
 { code: "fi", name: "Finnish" },
 { code: "no", name: "Norwegian" },
 { code: "da", name: "Danish" },
 { code: "cs", name: "Czech" },
 { code: "el", name: "Greek" },
 { code: "ro", name: "Romanian" },
 { code: "hu", name: "Hungarian" },
 { code: "th", name: "Thai" },
 { code: "vi", name: "Vietnamese" },
 { code: "id", name: "Indonesian" },
 { code: "bn", name: "Bengali" },
 { code: "ta", name: "Tamil" },
 { code: "te", name: "Telugu" },
 { code: "ml", name: "Malayalam" },
 { code: "kn", name: "Kannada" }
];

const Translator = () => {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [source, setSource] = useState("auto");
  const [target, setTarget] = useState("hi");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/translate", {
        text,
        source,
        target
      });

      setTranslated(res.data.translatedText);
    } catch (e) {
      setTranslated("Translation failed.");
    }

    setLoading(false);
  };

  const speak = () => {
    if (!translated) return;
    const u = new SpeechSynthesisUtterance(translated);
    u.lang = target;
    speechSynthesis.speak(u);
  };

  const copy = () => {
    navigator.clipboard.writeText(translated);
    alert("Copied!");
  };

  return (
    <div className="translator-box">
      <textarea
        className="input-area"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="dropdown-row">
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="auto">Auto Detect</option>
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>

        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <button className="btn" onClick={translateText}>
        {loading ? "Translating..." : "Translate"}
      </button>

      <textarea
        className="output-area"
        value={translated}
        readOnly
        placeholder="Translation will appear here..."
      ></textarea>

      <div className="action-row">
        <button className="small-btn" onClick={copy}>Copy</button>
        <button className="small-btn" onClick={speak}>🔊 Speak</button>
      </div>
    </div>
  );
};

export default Translator;
