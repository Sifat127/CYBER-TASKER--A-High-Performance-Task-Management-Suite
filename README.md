# 🤖 CyberTasker 2077

> **A High-Performance Task Management Suite with AI-Powered Planning**

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

---

## ✨ Features

### 🎯 Core Functionality
- ✅ **Kanban Board** - Drag-and-drop task management
- ✅ **AI Planning** - Google Gemini-powered task breakdowns
- ✅ **Smart Sorting** - Manual, Date-based, or Alphabetical
- ✅ **Task Statistics** - Real-time completion tracking
- ✅ **Persistent Storage** - Tasks saved in browser
- ✅ **Celebration Effects** - Confetti animation on completion

### 🎨 Design
- 🌙 Dark cyberpunk theme with neon accents
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth animations and transitions
- 🔧 Modern UI with Tailwind CSS

### 🔧 Technical
- ⚙️ **React 19** - Latest React version
- 🚀 **Vite** - Lightning-fast build tool
- 📘 **TypeScript** - Type-safe code
- 🎯 **Recharts** - Data visualization
- 🎪 **Canvas Confetti** - Celebration animations
- 🖱️ **Drag & Drop** - Smooth DnD with @hello-pangea/dnd

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Gemini API key ([Get it free here](https://ai.google.dev/))

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/Sifat127/CYBER-TASKER--A-High-Performance-Task-Management-Suite.git
cd CYBER-TASKER--A-High-Performance-Task-Management-Suite

# 2. Install dependencies
npm install

# 3. Create environment file
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local

# 4. Start development server
npm run dev

# 5. Open in browser
# Visit http://localhost:5173
```

### Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main

# 2. Go to https://vercel.com
# 3. Import project from GitHub
# 4. Add VITE_GEMINI_API_KEY to environment variables
# 5. Deploy!
```

✅ **Your app is now live!**

---

## 📖 Usage Guide

### Adding Tasks
1. Type your task in the input field
2. Press Enter or click the **+** button
3. Task appears in the PENDING column

### AI Task Planning
1. Type your goal (e.g., "Build a portfolio website")
2. Click **AI Plan** button
3. Get 3-5 breakdown tasks automatically
4. Tasks added to PENDING column

### Managing Tasks
- **Drag & Drop** - Move between PENDING and COMPLETED
- **Delete** - Hover over task, click trash icon
- **Sort** - Use buttons: Manual, Date, or A-Z
- **Clear All** - Click "Purge Memory" button

### Viewing Stats
- **Sync Rate Chart** - Completion percentage
- **Task Counter** - Count in each column
- **Real-time Updates** - Stats refresh as you work

---

## 📁 Project Structure

```
src/
├── components/
│   ├── TaskItem.tsx        # Individual task card
│   └── StatsChart.tsx      # Completion rate chart
├── services/
│   └── geminiService.ts    # AI integration
├── utils/
│   └── confetti.ts         # Celebration animation
├── App.tsx                 # Main application
├── index.tsx               # React entry point
└── types.ts                # TypeScript definitions

Configuration Files:
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
├── vercel.json             # Vercel deployment config
├── tailwind.config.js      # Tailwind CSS config
└── package.json            # Dependencies
```

---

## 🔐 Environment Variables

Required for AI functionality:

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

**Get your API key**:
1. Visit [https://ai.google.dev/](https://ai.google.dev/)
2. Click "Get API Key"
3. Create new API key
4. Copy and paste into environment variables

---

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run lint
```

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Supported |
| Firefox | 88+ | ✅ Supported |
| Safari | 14+ | ✅ Supported |
| Edge | 90+ | ✅ Supported |
| Mobile | Latest | ✅ Supported |

---

## 📚 Documentation

- 📖 **[Complete Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment
- 🔧 **[Troubleshooting Guide](./DEPLOYMENT_GUIDE.md#-troubleshooting)** - Common issues & fixes
- ⚙️ **[Configuration Guide](./DEPLOYMENT_GUIDE.md#-environment-variables)** - Setup instructions

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Sifat Ahmed**
- 🎓 Student at Daffodil International University (CSE)
- 🌐 GitHub: [@Sifat127](https://github.com/Sifat127)
- 📧 Email: sifat127@example.com

---

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) - AI task planning
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Data visualization
- [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) - Celebration effects

---

## 🎯 Roadmap

- [ ] User authentication
- [ ] Cloud sync across devices
- [ ] Team collaboration
- [ ] Advanced analytics
- [ ] Dark/Light theme toggle
- [ ] Multiple project support
- [ ] Task priorities
- [ ] Due dates

---

## 📞 Support

Having issues? Check the [Troubleshooting Guide](./DEPLOYMENT_GUIDE.md#-troubleshooting) or open an issue on GitHub.

---

<div align="center">

**Made with ❤️ for productive task management**

[⬆ Back to top](#-cybertasker-2077)

</div>
