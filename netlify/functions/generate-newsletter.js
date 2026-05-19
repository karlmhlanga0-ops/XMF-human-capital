import OpenAI from 'openai';

export const handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const idea = body?.idea?.toString().trim();

    if (!idea) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid input: idea is required.' }),
      };
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
    return {
      statusCode: 200,
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to generate newsletter.' }),
    };
  }
};
