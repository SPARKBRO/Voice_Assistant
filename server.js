const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // To load environment variables from a .env file if needed

const app = express();
app.use(express.json());

// Endpoint to communicate with ChatGPT API
app.post('/ask-chatgpt', async (req, res) => {
    const inputText = req.body.inputText;
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer ${process.env.CHATGPT_API_KEY} // Access API key from environment variables
        },
        body: JSON.stringify({
            prompt: inputText,
            max_tokens: 150
        })
    });

    if (response.ok) {
        const data = await response.json();
        res.json({ botResponse: data.choices[0].text.trim() });
    } else {
        res.status(500).json({ error: 'Failed to fetch ChatGPT response' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
