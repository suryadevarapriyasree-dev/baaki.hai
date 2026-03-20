export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { image_data, media_type } = req.body;
    if (!image_data || !media_type) return res.status(400).json({ error: 'Missing image data' });
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 800, messages: [{ role: 'user', content: [{ type: 'image', source: { type: 'base64', media_type, data: image_data } }, { type: 'text', text: 'Extract all tasks from this study schedule. Return ONLY a JSON array: [{"label":"Task","type":"gs","time":"8 AM"}]. Types: gs=study, curr=current affairs, hist=history, hobby=exercise, rest=rest.' }] }] }),
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'API error' });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
```

4. Click **Commit changes**

---

After this your repo should look like:
```
baaki.hai/
├── index.html   ✅
├── vercel.json  ✅
└── api/
    ├── chat.js  ✅
    └── scan.js  ✅
