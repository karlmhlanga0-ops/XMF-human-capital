import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json({ limit: '1mb' }));

const PORT = process.env.PORT || 5178;

app.post('/api/generate-newsletter', async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea || typeof idea !== 'string') return res.status(400).json({ error: 'idea is required' });

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are an expert HR and Compliance copywriter for XMF Human Capital Partners. Turn the user's short idea into a professional, 3-paragraph email newsletter.",
        },
        { role: 'user', content: `Create a newsletter from this idea:\n\n${idea}` },
      ],
      max_tokens: 600,
    });

    const text = response.choices?.[0]?.message?.content ?? '';
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to generate newsletter' });
  }
});

app.listen(PORT, () => console.log(`Newsletter API listening on http://localhost:${PORT}`));
