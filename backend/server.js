const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const TRANSLATE_API_URL = process.env.TRANSLATE_API_URL;

app.post('/translate', async (req, res) => {
  const { text, source, target } = req.body;

  try {
    const response = await axios.get(TRANSLATE_API_URL, {
      params: {
        q: text,
        langpair: `${source}|${target}`
      }
    });

    const translatedText = response.data.responseData.translatedText;
    res.json({ translatedText });
  } catch (err) {
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
