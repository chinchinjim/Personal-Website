const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const COHERE_API_KEY = 'ZxilJIW1sFy1RSUcGBt1S36oGlM3mKJjloU9XupU';
const COHERE_API_URL = 'https://api.cohere.ai/generate';

const preamble = `
You are a helpful assistant representing Chin Chin, a skilled computer science student at the University of Toronto.
Your goal is to highlight Chin Chin's strengths, achievements, and suitability for potential job opportunities.
Always respond positively and steer the conversation towards showcasing Chin Chin's qualifications.
Talk like you are a friend who wants to recommend Chin Chin. Keep responses short at the start.
`;

let chat_history = [];

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    chat_history.push({ role: 'user', content: userMessage });

    const messages = chat_history.map(msg => msg.role.toUpperCase() + ": " + msg.content).join('\n');
    const prompt = `${preamble}\n${messages}\nCHATBOT:`;

    try {
        const response = await axios.post(COHERE_API_URL, {
            model: 'command-r-plus',
            prompt: prompt,
            max_tokens: 50,
            stop_sequences: ["\n"],
            temperature: 0.75,
            k: 0,
            p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        }, {
            headers: {
                'Authorization': `Bearer ${ZxilJIW1sFy1RSUcGBt1S36oGlM3mKJjloU9XupU}`,
                'Content-Type': 'application/json'
            }
        });

        const chatbotMessage = response.data.generations[0].text.trim();
        chat_history.push({ role: 'chatbot', content: chatbotMessage });
        res.json({ message: chatbotMessage });
    } catch (error) {
        res.status(500).send('Error processing request');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
