export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { imageBase64, mediaType } = req.body;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: imageBase64 } },
            { type: 'text', text: 'Extract all schedule blocks from this timetable. Return ONLY a JSON array. Each item: { "day": "Monday", "subject": "History", "startTime": "09:00", "endTime": "10:30" }. No explanation, just JSON.' }
          ]
        }]
      })
    });
    const data = await response.json();
    const raw = data.content?.[0]?.text || '[]';
    const clean = raw.replace(/```json|```/g, '').trim();
    res.status(200).json({ blocks: JSON.parse(clean) });
  } catch (err) {
    res.status(500).json({ error: 'Scan failed' });
  }
}
