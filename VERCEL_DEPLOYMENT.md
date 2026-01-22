# Vercel Deployment Guide for CyberTasker

This guide will help you successfully deploy CyberTasker to Vercel.

## ✅ What's Been Fixed

1. **Reorganized project structure** - Moved files to `src/` directory for proper Vite/Vercel bundling
2. **Fixed HTML entry point** - Updated `index.html` with proper React module script
3. **Created missing components** - Added `TaskItem.tsx` and `StatsChart.tsx`
4. **Added Gemini service** - Implemented AI plan generation with fallback support
5. **Updated Vite config** - Configured for production builds and environment variables
6. **Improved error handling** - Added try-catch blocks to prevent white screens

## 🚀 Deployment Steps

### 1. Push Changes to GitHub

```bash
git add .
git commit -m "fix: Prepare project for Vercel deployment"
git push origin main
```

### 2. Add Environment Variable to Vercel

1. Go to your Vercel project dashboard: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project "CYBER-TASKER--A-High-Performance-Task-Management-Suite"
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: Your Gemini API key (from [https://ai.google.dev/](https://ai.google.dev/))
   - **Environments**: Select all (Production, Preview, Development)
5. Click "Save"

### 3. Trigger Deployment

Vercel will automatically redeploy when you push to GitHub. If not:

1. Go to **Deployments** tab in Vercel
2. Click the three dots next to the latest deployment
3. Select **Redeploy**

## 🔑 Getting Your Gemini API Key

If you haven't already:

1. Visit [https://ai.google.dev/](https://ai.google.dev/)
2. Click **Get API Key** or **Create API Key**
3. Copy the key and paste it in Vercel environment variables

## 📝 Local Testing (Optional)

Before deploying, test locally:

```bash
# Install dependencies
npm install

# Create .env.local file
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- ✅ Responsive Kanban board with drag-and-drop
- ✅ AI-powered task generation (with fallback)
- ✅ Dark cyberpunk theme
- ✅ Task statistics and completion tracking
- ✅ Local storage persistence
- ✅ Mobile-friendly interface

## 🐛 Troubleshooting

### White Screen on Load

- Check Vercel build logs for errors
- Ensure `VITE_GEMINI_API_KEY` environment variable is set
- Check browser console for JavaScript errors (F12)
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### AI Plan Generation Not Working

- Verify API key is correct in Vercel environment variables
- Check if API key has proper permissions
- App will fall back to mock suggestions if API unavailable

### Build Fails

- Make sure all files are in the correct location under `src/`
- Check that `node_modules` are not in `.gitignore` (they shouldn't be)
- Verify `package.json` has all required dependencies

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── TaskItem.tsx
│   │   └── StatsChart.tsx
│   ├── services/
│   │   └── geminiService.ts
│   ├── utils/
│   │   └── confetti.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── types.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

## 🎯 Next Steps

1. Deploy to Vercel (automatic on push)
2. Set `VITE_GEMINI_API_KEY` environment variable
3. Visit your deployment URL and test the app
4. Share with others! 🚀

---

**Need help?** Check Vercel logs or browser console for error messages.
