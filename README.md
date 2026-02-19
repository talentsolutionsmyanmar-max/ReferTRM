# ReferTRM

Myanmar's #1 Referral Hiring Platform - Refer friends, earn rewards!

## Features

- 🔥 Firebase Authentication
- 💼 26+ Real Job Positions
- 🎓 Learning Academy with Certificates
- 🏆 Gamification (Points, Streaks, Levels)
- 👤 Avatar Customization
- 💰 Referral Rewards System

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Auth**: Firebase Authentication
- **Database**: Firebase Firestore

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

## Environment Variables

Create a `.env` file with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Deployment

This project is optimized for Vercel deployment:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## License

MIT
