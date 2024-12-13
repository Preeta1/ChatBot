const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Set this in your environment
});
const openai = new OpenAIApi(configuration);

// Chat endpoint
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).send({ error: 'No message provided' });
    }

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150,
        });
        res.send({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).send({ error: 'Error communicating with OpenAI' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
