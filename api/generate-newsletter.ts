import OpenAI from 'openai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || (await req.json?.());
    const idea = body?.idea?.toString().trim();

    if (!idea) {
      return res.status(400).json({ error: 'Invalid input: idea is required.' });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "You are an expert HR and compliance copywriter for XMF Human Capital Partners. Turn the user's short idea into a professional, 3-paragraph email newsletter.",
        },
        {
          role: 'user',
          content: `Create a newsletter from this idea:\n\n${idea}`,
        },
      ],
      max_tokens: 600,
    });

    const text = response.choices?.[0]?.message?.content ?? '';
    return res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to generate newsletter.' });
  }
}
