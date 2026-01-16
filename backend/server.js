import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userPrompt = req.body.prompt;
  
  // Hidden context that is attached to every message (not visible to user)
  const hiddenContext = "Hello, how are you.";

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a strict assistant. Answer clearly and concisely.'
        },
        {
          role: 'user',
          content: `${hiddenContext}\n\n${userPrompt}`
        }
      ]
    })
  });

  const data = await response.json();
  res.json({
    message: data.choices[0].message.content
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));