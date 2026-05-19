import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idea } = body;

    if (!idea || typeof idea !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid input: idea is required.' }), { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert HR and Compliance copywriter for XMF Human Capital Partners. Turn the user\'s short idea into a professional, 3-paragraph email newsletter.',
        },
        {
          role: 'user',
          content: `Create a newsletter from this idea:\n\n${idea}`,
        },
      ],
      max_tokens: 600,
    });

    const text = response.choices?.[0]?.message?.content ?? '';

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Unable to generate newsletter.' }), { status: 500 });
  }
}
