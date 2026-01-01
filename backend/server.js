const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 5000;

// If you don’t have a TRANSLATE_API_URL, we can use MyMemory API for testing
const TRANSLATE_API_URL = process.env.TRANSLATE_API_URL || "https://api.mymemory.translated.net/get";

app.post('/translate', async (req, res) => {
  const { text, source, target } = req.body;

  if (!text || !source || !target) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    // MyMemory API GET request
    const response = await axios.get(TRANSLATE_API_URL, {
      params: {
        q: text,
        langpair: `${source}|${target}`
      }
    });

    const translatedText = response.data.responseData.translatedText;
    res.json({ translatedText });

  } catch (err) {
    console.error("Translation error:", err.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
