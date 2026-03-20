# 🚀 Baaki Hai — Deploy to Vercel (10 minutes)

## What's in this folder
```
baaki-hai-vercel/
├── public/
│   └── index.html        ← Your entire app
├── api/
│   ├── chat.js           ← Sahayak bot proxy (hides your API key)
│   └── scan.js           ← Paper scan proxy (hides your API key)
└── vercel.json           ← Routing config
```

---

## Step 1 — Get your Anthropic API key
1. Go to https://console.anthropic.com
2. Click **API Keys** → **Create Key**
3. Copy the key (starts with `sk-ant-...`)
4. Keep it safe — you'll need it in Step 3

---

## Step 2 — Create a free Vercel account
1. Go to https://vercel.com
2. Sign up with GitHub (easiest) or email
3. Free tier is enough for thousands of users

---

## Step 3 — Deploy the app
1. On Vercel dashboard → click **Add New → Project**
2. Click **"Deploy without a Git repository"** (bottom of page)
   — OR use the **Vercel CLI** (optional, for developers)

### Easiest method — drag and drop:
1. Go to https://vercel.com/new
2. Scroll down to **"Import Third-Party Git Repository"**
   — actually just click **"Deploy"** on the dashboard
3. Drag the entire `baaki-hai-vercel` folder into the upload area
4. Click **Deploy**

### Alternative — GitHub method (recommended for updates):
1. Create a new GitHub repo (free)
2. Upload this entire folder to the repo
3. On Vercel → Import Git Repository → select your repo
4. Click Deploy

---

## Step 4 — Add your API key (CRITICAL)
This is what makes Sahayak and the scan feature work.

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Click **Add New**
3. Fill in:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-your-key-here` (paste your key)
   - **Environment:** select all three (Production, Preview, Development)
4. Click **Save**
5. Go to **Deployments** → click the three dots on your deployment → **Redeploy**

---

## Step 5 — Your app is live! 🎉
Vercel gives you a free URL like: `https://baaki-hai-xyz.vercel.app`

You can also connect a custom domain (e.g. `baakihai.in`) for free in Vercel settings.

---

## What works after deploy
✅ Entire UI — all pages, dark mode, navigation  
✅ Sahayak AI bot — fully working (via /api/chat proxy)  
✅ Scan paper schedule — fully working (via /api/scan proxy)  
✅ All 10 exams — UPSC, State PSC, SSC, Banking, Railways, Defence, GATE, Teaching, Judiciary, CA  
✅ Tasks with ¼ ½ ¾ progress  
✅ Google Calendar / ICS import  
✅ End-of-day wrap-up + reminders  
✅ Browser push notifications  

---

## Costs (honest breakdown)
| What | Free limit | When you'd pay |
|------|-----------|----------------|
| Vercel hosting | 100GB bandwidth | ~50,000+ users |
| Vercel functions | 100,000 calls/month | ~3,000 active users/day |
| Anthropic API | Pay per use | ~$0.003 per chat message |

At 1,000 users/month each sending 10 messages → ~₹250/month in API costs.

---

## Questions?
The two proxy files (api/chat.js and api/scan.js) are where your API key lives — 
never share those files publicly or commit them to a public GitHub repo with the key hardcoded.
The key is safe because it's stored as a Vercel Environment Variable, not in the code.
