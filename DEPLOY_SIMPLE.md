# 🚀 Quick Deployment Guide

## Backend - Render

**Settings:**
```
Name: highway-delite-api
Language: Node
Branch: main (or master)
Root Directory: server
Build Command: npm install --include=dev && npx prisma generate && npx prisma migrate deploy && npm run build
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
1. Copy your API URL: `https://your-app.onrender.com`
2. **Seed the database:** Visit `https://your-app.onrender.com/api/seed` in your browser
   - This will create 8 experiences, 336 slots, and 4 promo codes
   - Only works once (checks if database is empty first)

**If build fails with TypeScript errors:**
Render runs `npm install` with `NODE_ENV=production` which skips devDependencies.
We need to **force install** devDependencies (including @types/node).

Push the updated guide to GitHub:
```bash
git add DEPLOY_SIMPLE.md
git commit -m "Fix build command - force install devDependencies"
git push
```

Then on Render:
1. Go to Settings → Build & Deploy
2. Update Build Command to: `npm install --include=dev && npx prisma generate && npx prisma migrate deploy && npm run build`
3. Save Changes
4. Click "Manual Deploy" → "Clear build cache & deploy"

---

## Frontend - Vercel

**Step-by-step:**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `Nitish151/highway_delite`
3. **IMPORTANT**: Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: Click "Edit" → Select `client` folder
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
   - **Output Directory**: Leave as `.next` (default)

4. Add **Environment Variable**:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://highway-delite-1-ecl4.onrender.com/api
   ```

5. Click "Deploy" and wait 2-3 minutes

**If you get 404 error:**
- Make sure Root Directory is set to `client` (not empty!)
- Go to Project Settings → General → Root Directory → Edit → Select `client`
- Redeploy

---

## Done! 🎉

- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-api.onrender.com

**Test:** Visit frontend → Browse → Book an experience
