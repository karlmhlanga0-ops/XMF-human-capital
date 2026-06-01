export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ status: 'error', message: 'Method not allowed' });

  try {
    const body = req.body || (await req.json?.());
    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx4qjxe6efkChMJRDIwZazrgjXjJKGGh8FF_0YlIuJvZVpTvmabV9niCeNnzhWm25s8/exec';

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // Try to parse JSON from the webhook; fall back to text
    let parsed: any = null;
    try {
      parsed = await response.json();
    } catch (e) {
      const text = await response.text();
      parsed = { raw: text };
    }

    if (!response.ok) {
      return res.status(502).json({ status: 'error', message: parsed?.message || parsed?.raw || 'Upstream error' });
    }

    return res.status(200).json({ status: 'ok', data: parsed });
  } catch (error) {
    console.error('submit-candidate error', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}