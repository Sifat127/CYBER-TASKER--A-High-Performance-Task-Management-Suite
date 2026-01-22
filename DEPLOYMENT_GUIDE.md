# 🚀 CyberTasker - Complete Deployment Guide

## Quick Start (3 Steps)

### Step 1: Setup Gemini API Key

1. Visit [https://ai.google.dev/](https://ai.google.dev/)
2. Click "Get API Key" button
3. Create new API key for "Generative Language API"
4. Copy the key (save it somewhere safe)

### Step 2: Push Code to GitHub

```bash
# Navigate to your project
cd CYBER-TASKER--A-High-Performance-Task-Management-Suite

# Add all changes
git add .

# Commit changes
git commit -m "fix: Prepare for Vercel deployment with all fixes"

# Push to GitHub
git push origin main
```

### Step 3: Deploy to Vercel

1. **Go to Vercel Dashboard**: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. **Connect GitHub**: If not already done, connect your GitHub account
3. **Import Project**: Click "Add New" → "Project" → Select your CYBER-TASKER repo
4. **Configure Environment Variables**:
   - Click "Environment Variables"
   - Add new variable:
     - **Name**: `VITE_GEMINI_API_KEY`
     - **Value**: Your Gemini API key from Step 1
     - **Environments**: Select all (Production, Preview, Development)
   - Click "Save"
5. **Deploy**: Click "Deploy"

✅ **Your app is now live!**

---

## Local Testing (Before Deploying)

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Test Locally

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local file with your API key
echo 'VITE_GEMINI_API_KEY=your_api_key_here' > .env.local

# 3. Start development server
npm run dev

# Visit http://localhost:5173 in your browser
# You should see the CyberTasker app with the dark theme

# 4. Test the app
# - Add tasks manually
# - Try AI plan generation (click "AI Plan" button)
# - Drag tasks between columns
# - Clear all tasks ("Purge Memory" button)

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

---

## ✅ Files & What They Do

### Core Files (in `src/`)
- **`src/App.tsx`** - Main application component
- **`src/index.tsx`** - React entry point
- **`src/types.ts`** - TypeScript type definitions

### Components (in `src/components/`)
- **`TaskItem.tsx`** - Individual task card with drag-and-drop
- **`StatsChart.tsx`** - Completion rate pie chart

### Services (in `src/services/`)
- **`geminiService.ts`** - Google Gemini API integration with fallback

### Utilities (in `src/utils/`)
- **`confetti.ts`** - Celebration animation on task completion

### Configuration
- **`vite.config.ts`** - Vite build configuration
- **`tsconfig.json`** - TypeScript configuration
- **`vercel.json`** - Vercel deployment configuration
- **`index.html`** - HTML entry point
- **`.env.example`** - Environment variables template

---

## 🐛 Troubleshooting

### Problem: White Screen on Load

**Symptoms**: App loads but shows blank white screen

**Solutions**:
1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click latest deployment
   - Check "Function Logs" and "Build Logs" tabs

2. **Check Browser Console**:
   - Press F12 to open Developer Tools
   - Go to "Console" tab
   - Look for red error messages
   - Share those errors with us

3. **Hard Refresh Browser**:
   ```
   Windows: Ctrl + Shift + R
   Mac: Cmd + Shift + R
   ```

4. **Clear Browser Cache**:
   - DevTools → Application → Cache → Delete all
   - Or use Incognito/Private mode

---

### Problem: "AI Plan" Button Not Working

**Symptoms**: Clicking "AI Plan" button does nothing or shows error

**Causes & Fixes**:

1. **API Key Not Set**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Verify `VITE_GEMINI_API_KEY` is present
   - If missing, add it and redeploy

2. **Invalid/Expired API Key**:
   - Go to [https://ai.google.dev/](https://ai.google.dev/)
   - Create a new API key
   - Update in Vercel environment variables
   - Redeploy

3. **API Rate Limited**:
   - Wait 1-2 minutes
   - Try again
   - Or use fallback suggestions (automatically generated)

---

### Problem: "npm install" Fails

**Symptoms**: Error during `npm install`

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

### Problem: Build Fails in Vercel

**Symptoms**: Vercel shows "Build Failed" error

**Check**:
1. All files are in `src/` directory (not root)
2. No syntax errors in TypeScript files
3. All imports use correct paths
4. Environment variables are set

**Local Test**:
```bash
# Run the same build Vercel uses
npm run build

# Check dist/ folder is created
ls -la dist/
```

If build fails locally, fix the error and try again.

---

### Problem: Tasks Not Saving

**Symptoms**: Tasks disappear after page refresh

**Cause**: Browser localStorage not working (private mode?)

**Solutions**:
1. Use regular (non-private) browser window
2. Check browser allows localStorage:
   - DevTools → Application → Storage → Local Storage → http://yoururl
   - Should show `cyber-tasks` entry

---

## 📊 Features & How They Work

### ✅ Add Tasks
- Type task in input field
- Press Enter or click + button
- Task appears in PENDING column

### 🤖 AI Plan Generation
- Type goal (e.g., "Build a website")
- Click "AI Plan" button
- Get 3-5 breakdown tasks automatically
- Uses Google Gemini API
- Falls back to mock suggestions if API unavailable

### 🖱️ Drag & Drop
- Click and hold task
- Drag to COMPLETED column
- Release to drop
- Confetti celebrates completion! 🎉

### 📊 Stats Chart
- Shows completion rate as pie chart
- Updates in real-time
- Shows pending vs completed tasks

### 🔄 Sorting
- **Manual** (list icon): Drag to reorder
- **Date** (calendar icon): Newest first
- **A-Z** (sort icon): Alphabetical

### 🗑️ Delete Tasks
- Hover over task
- Click trash icon
- Task removed instantly

### 💾 Purge Memory
- Delete all tasks at once
- Stored in browser localStorage

---

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Environment Variables

Only 1 variable needed:

```
VITE_GEMINI_API_KEY=your_key_here
```

**Where to set it**:
- **Local**: Create `.env.local` file
- **Vercel**: Settings → Environment Variables
- **GitHub Actions**: Settings → Secrets

---

## 🚨 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Cannot find module" | Missing file | Check file path in import |
| "VITE_GEMINI_API_KEY is undefined" | Env var not set | Add to Vercel environment variables |
| "Module not found: recharts" | Missing dependency | Run `npm install` |
| "Drag not working" | Outdated cache | Hard refresh (Ctrl+Shift+R) |
| "Tasks not saving" | localStorage disabled | Use regular (non-private) window |

---

## 📞 Need Help?

1. **Check this guide first** - Most issues are covered above
2. **Check browser console** (F12 → Console) - Look for error messages
3. **Check Vercel logs** - Deployment → Logs
4. **Read error messages carefully** - They tell you exactly what's wrong

---

## 🎯 Success Checklist

Before considering it "done":

- [ ] App loads without white screen
- [ ] Can add tasks
- [ ] Can drag tasks between columns
- [ ] Can delete tasks
- [ ] "AI Plan" button works (or shows fallback)
- [ ] Stats chart updates
- [ ] Tasks persist after refresh
- [ ] Mobile view works (responsive)
- [ ] Dark theme displays correctly
- [ ] No red errors in console (F12)

---

## 🎉 You're All Set!

Your CyberTasker app is now:
- ✅ Production-ready
- ✅ Deployed to Vercel
- ✅ Using Google Gemini AI
- ✅ Fully responsive
- ✅ Persistent storage

**Share your app**: Copy the Vercel URL and share with others! 🚀

---

**Last Updated**: January 23, 2026
**Status**: ✅ Ready for Production
