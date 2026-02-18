# ReferTRM – Myanmar Referral Hiring Platform

A modern, mobile-first referral hiring platform built with **Vite + React + TypeScript + Tailwind CSS**.

## 🚀 Quick Start

### Prerequisites
You need **Node.js** (version 18 or higher) installed on your computer.

**Download Node.js:** https://nodejs.org/en/download/

### Setup Steps

1. **Open a terminal** (Command Prompt or PowerShell) and navigate to this folder:
   ```bash
   cd refer-trm
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to: `http://localhost:5173`

### Build for Production
```bash
npm run build
```
The built files will be in the `dist/` folder, ready to deploy.

---

## 📁 Project Structure Explained

```
refer-trm/
├── public/                    # Static files (favicon, robots.txt)
│   ├── favicon.svg           # Browser tab icon
│   └── robots.txt            # SEO file for search engines
├── src/                       # All your source code
│   ├── components/           # Reusable UI sections
│   │   ├── Hero.tsx          # Top hero section with title & trust stats
│   │   ├── Jobs.tsx          # Job listings grid (6 example jobs)
│   │   ├── ForCompanies.tsx  # Pricing plans for companies
│   │   ├── WhyRefer.tsx      # Benefits for referrers
│   │   ├── Footer.tsx        # Bottom footer with links
│   │   └── JobCardSkeleton.tsx # Loading placeholder for job cards
│   ├── lib/
│   │   └── utils.ts          # Helper function for CSS class merging
│   ├── App.tsx               # Main app layout (combines all sections)
│   ├── main.tsx              # Entry point (renders App into the page)
│   ├── index.css             # Global styles (Tailwind + custom classes)
│   └── vite-env.d.ts         # TypeScript type declarations for Vite
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration (colors, fonts)
├── postcss.config.js         # PostCSS config (required by Tailwind)
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # TypeScript app-specific config
└── vite.config.ts            # Vite build configuration + PWA setup
```

---

## 🎨 Design System

| Element | Value |
|---------|-------|
| **Dark Background** | `#0F172A` → `#020617` gradient |
| **Primary (Teal)** | `#14B8A6` |
| **Accent (Gold)** | `#F59E0B` |
| **Font (English)** | Inter |
| **Font (Burmese)** | Padauk (Google Fonts) |
| **Border Radius** | Rounded 2xl (16px) |
| **Cards** | Glassmorphism with backdrop blur |

---

## 📱 Features

- ✅ **Dark mode** by default
- ✅ **Mobile-first** responsive design
- ✅ **PWA support** – installable on phone home screen
- ✅ **Burmese font** support (Padauk from Google Fonts)
- ✅ **English + Burmese** text side by side
- ✅ **Glassmorphism** cards with hover effects
- ✅ **Smooth animations** with Framer Motion
- ✅ **Loading skeletons** for job cards
- ✅ **Gradient buttons** with hover glow
- ✅ **Trust bar** with real stats
- ✅ **5 pricing plans** for companies
- ✅ **6 example job listings** (expandable to 25)

---

## 🔧 How to Customize

### Change Agency Name
Search for `Your Agency Name` in the code and replace it with your real agency name.

### Add More Jobs
Edit `src/components/Jobs.tsx` and add more job objects to the `jobs` array.

### Change Telegram Link
Search for `https://t.me/ReferTRM` and replace with your actual Telegram link.

### Change Contact Info
Edit `src/components/Footer.tsx` to update email, phone, and agency details.

---

## 📦 Tech Stack

- **Vite** – Ultra-fast build tool
- **React 18** – UI library
- **TypeScript** – Type-safe JavaScript
- **Tailwind CSS 3** – Utility-first CSS
- **Framer Motion** – Smooth animations
- **Lucide React** – Beautiful icons
- **vite-plugin-pwa** – Progressive Web App support
