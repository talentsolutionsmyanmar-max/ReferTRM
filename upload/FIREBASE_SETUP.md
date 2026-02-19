# Firebase Setup Guide for ReferTRM

This guide will help you set up Firebase (free tier) for user progress tracking in the ReferTRM Academy.

## What You'll Get

✅ **User Authentication** - Phone number or anonymous login  
✅ **Progress Tracking** - Modules completed, points earned, current level  
✅ **Cloud Sync** - Progress synced across devices  
✅ **Free Tier** - No cost for normal usage (10K reads/day, 20K writes/day)

---

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `refertrm-academy` (or any name you prefer)
4. Disable Google Analytics (not needed for this feature)
5. Click **"Create project"**
6. Wait for setup to complete, then click **"Continue"**

---

## Step 2: Enable Authentication

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Enable these sign-in methods:

### Anonymous Authentication
- Click **"Anonymous"**
- Toggle to **"Enable"**
- Click **"Save"**

### Phone Authentication
- Click **"Phone"**
- Toggle to **"Enable"**
- For testing, add your phone number in the "Phone numbers for testing" section
- Click **"Save"**

---

## Step 3: Create Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll set rules below)
4. Select your region (choose `asia-southeast1` for Myanmar/Asia users)
5. Click **"Enable"**

---

## Step 4: Set Up Security Rules

1. Go to Firestore Database → **"Rules"** tab
2. Replace the default rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write only their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

These rules ensure users can only access their own progress data.

---

## Step 5: Get Your Firebase Config

1. Click the **"Project settings"** gear icon (⚙️) at the top left
2. In the "General" tab, scroll down to "Your apps" section
3. Click the **"</>"** icon to add a web app
4. Enter app nickname: `ReferTRM Web`
5. Click **"Register app"**
6. You'll see a code block like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## Step 6: Add Config to Your App

### Option A: Using Environment Variables (Recommended)

1. Copy the `.env.example` file to `.env`:
```bash
copy .env.example .env
```

2. Fill in your Firebase config values from Step 5:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Option B: Direct Config (Not Recommended for Production)

Edit `src/lib/firebase.ts` and replace the placeholder values:

```typescript
const firebaseConfig = {
  apiKey: "your_actual_api_key",
  authDomain: "your_project.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
}
```

---

## Step 7: Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Open your app in the browser

3. Navigate to the Academy page

4. You should see a **"Login to Save Progress"** button in the top navigation

5. Click it and try:
   - **Anonymous login** - Quick, no phone needed
   - **Phone login** - Enter your phone number, receive OTP, verify

6. Complete a module and check that your progress is saved!

---

## Data Structure

When users complete modules, this data is saved to Firestore:

```javascript
// Document path: /users/{userId}
{
  completedModules: ["ai-1", "ai-2", "rec-1"],  // Array of completed module IDs
  points: 450,                                    // Total points earned
  currentLevel: "Amateur",                        // Current level (Amateur/Professional/Expert/Master)
  lastUpdated: Timestamp                          // When data was last updated
}
```

---

## Firebase Free Tier Limits

| Feature | Free Limit | Notes |
|---------|------------|-------|
| **Firestore Reads** | 50,000/day | More than enough for progress tracking |
| **Firestore Writes** | 20,000/day | Each module completion = 1 write |
| **Firestore Deletes** | 20,000/day | Not heavily used |
| **Authentication** | 10,000 users/day | Phone + Anonymous |
| **Storage** | 1 GB total | Not used for this feature |

**For a typical app:** You can support thousands of users on the free tier!

---

## Troubleshooting

### "Firebase App Already Exists" Error
This happens when the app tries to initialize Firebase multiple times. The code already handles this, but if you see this error:
- Check that `initializeApp` is only called once in `firebase.ts`

### Phone Auth Not Working
- Make sure you've enabled Phone authentication in Firebase Console
- For testing, add your phone number in the Firebase Console under Authentication → Sign-in method → Phone → "Phone numbers for testing"
- reCAPTCHA might not work in some regions - anonymous login is a good fallback

### Progress Not Saving
- Check browser console for errors
- Verify Firestore rules are published correctly
- Make sure user is logged in (check AuthContext)

### CORS Errors
If you see CORS errors when accessing Firestore:
- This is usually a Firebase configuration issue
- Check that your domain is authorized in Firebase Console → Authentication → Settings → Authorized domains

---

## Features Implemented

### ✅ User Authentication
- Anonymous login (quick, no personal info)
- Phone number login (secure, works across devices)

### ✅ Progress Tracking
- Track completed modules
- Calculate and display points
- Level progression (Amateur → Professional → Expert → Master)

### ✅ UI Integration
- Progress display in navigation bar
- "Login to Save Progress" button for non-logged users
- Personalized progress on Academy page
- Progress sync across devices when logged in

### ✅ Local Storage Fallback
- Progress saved locally when not logged in
- Option to login later and sync progress

---

## Next Steps

1. **Test thoroughly** - Try both login methods, complete modules, refresh page
2. **Monitor usage** - Check Firebase Console to see data usage
3. **Set up alerts** - Firebase can email you if you approach free tier limits
4. **Consider upgrades** - If you grow beyond free tier, Firebase has pay-as-you-go pricing

---

## Support

For Firebase-specific issues:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)

For ReferTRM-specific questions:
- Check the code comments in `src/lib/firebase.ts`
- Review the AuthContext implementation in `src/contexts/AuthContext.tsx`
