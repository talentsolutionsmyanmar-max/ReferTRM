import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'SET' : 'MISSING',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'SET' : 'MISSING',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'MISSING',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'SET' : 'MISSING',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? 'SET' : 'MISSING',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'SET' : 'MISSING',
  };

  const allConfigured = Object.values(config).every(v => v === 'SET' || v !== 'MISSING');

  return NextResponse.json({
    status: allConfigured ? 'configured' : 'missing_config',
    firebase: config,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || null,
    message: allConfigured 
      ? 'Firebase is properly configured' 
      : 'Some Firebase environment variables are missing. Check Vercel environment settings.',
  });
}
