# 📋 GitHub Push & Vercel Deploy - Quick Reference

## Copy & Paste These Commands

### 1️⃣ Push to GitHub

```powershell
cd "c:\Users\mohan\OneDrive\Desktop\uxfriends"
git remote add origin https://github.com/YOUR_USERNAME/uxfriends.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy to Vercel (after pushing to GitHub)

Go to: https://vercel.com/import

Then:
1. Paste GitHub URL: `https://github.com/YOUR_USERNAME/uxfriends`
2. Click "Import Project"
3. Add Environment Variables:
   - `DATABASE_URL` = PostgreSQL connection string
   - `NEXTAUTH_URL` = `https://your-project.vercel.app`
   - `NEXTAUTH_SECRET` = From https://generate-secret.vercel.app
   - `OPENAI_API_KEY` = From OpenAI dashboard
4. Click "Deploy"

Done! 🎉

---

## Get Your Connection Strings

### PostgreSQL (Supabase)
1. Sign up: https://supabase.com
2. Create project
3. Settings > Database > Connection string
4. Copy the `postgresql://...` URL

### OpenAI API Key
1. Go to: https://platform.openai.com/api-keys
2. Create new secret key
3. Copy and keep safe

### NEXTAUTH_SECRET
1. Go to: https://generate-secret.vercel.app
2. Click "Generate"
3. Copy the 32-character string

---

## Current Status

```
✅ 48 Files Committed
✅ Git Initialized
✅ Code Ready
⏳ Push to GitHub (next)
⏳ Deploy to Vercel
```

## Git Log

```
233c892 docs: add GitHub and deployment documentation
29aac7c Initial commit: UXFriends - Full-stack gamified learning platform
```

---

**Everything is ready. Just push to GitHub!** 🚀
