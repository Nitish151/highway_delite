# 🚀 Quick Deployment Guide

## Backend - Render

**Settings:**
```
Name: highway-delite-api
Language: Node
Branch: main (or master)
Root Directory: server
Build Command: npm ci && npx prisma generate && npx prisma migrate deploy && npm run build
Start Command: npm start
Instance Type: Free
```

**Environment Variables (Advanced):**
```
NODE_ENV=production
PORT=5000
DATABASE_URL=file:./prod.db
```

**After Deploy:**
1. Go to Shell tab
2. Run: `npm run seed`
3. Copy your API URL: `https://your-app.onrender.com`

**If build fails with TypeScript errors:**
Push this fix to GitHub first:
```bash
git add server/tsconfig.json
git commit -m "Fix TypeScript build for production"
git push
```
Then click "Manual Deploy" → "Clear build cache & deploy" on Render.

---

## Frontend - Vercel

**Settings:**
```
Framework Preset: Next.js
Root Directory: client
Build Command: npm run build
Install Command: npm install
```

**Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com/api
```

**Deploy:**
Click "Deploy" and wait 2-3 minutes.

---

## Done! 🎉

- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-api.onrender.com

**Test:** Visit frontend → Browse → Book an experience
