export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { messages, exam } = req.body;
  const systemPrompt = `You are Sahayak, a warm study companion for Indian competitive exam aspirants preparing for ${exam || 'a competitive exam'}. Speak in Hinglish when appropriate. Be concise, encouraging, and practical.`;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model: 'claude-opus-4-5', max_tokens: 1024, system: systemPrompt, messages })
    });
    const data = await response.json();
    res.status(200).json({ reply: data.content?.[0]?.text || 'Kuch gadbad ho gayi, dobara try karo.' });
  } catch (err) {
    res.status(500).json({ error: 'Sahayak unavailable' });
  }
}
