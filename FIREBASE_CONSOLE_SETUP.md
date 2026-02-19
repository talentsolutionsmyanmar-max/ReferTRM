# Firebase Console Setup for ReferTRM

## Step 1: Create Firebase Project

1. Go to **https://console.firebase.google.com/**
2. Click **"Create a project"** or **"Add project"**
3. Enter project name: `refertrm` (or any name you prefer)
4. **Disable** Google Analytics (not needed)
5. Click **"Create project"**
6. Wait ~30 seconds, then click **"Continue"**

---

## Step 2: Enable Authentication

1. In left sidebar, click **"Authentication"** (🔐 icon)
2. Click **"Get started"**
3. Enable these providers:

### Email/Password
- Click **"Email/Password"**
- Toggle **"Enable"**
- Click **"Save"**

### Anonymous (Quick Login)
- Click **"Anonymous"**
- Toggle **"Enable"**
- Click **"Save"**

### Phone (Optional - for Myanmar users)
- Click **"Phone"**
- Toggle **"Enable"**
- Click **"Save"**

---

## Step 3: Create Firestore Database

1. In left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose region: **`asia-southeast1`** (Singapore - closest to Myanmar)
5. Click **"Enable"**
6. Wait ~1 minute for setup

### Set Security Rules
1. Click **"Rules"** tab
2. Replace with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read for jobs, companies
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if false; // Only via Admin SDK
    }
    
    match /companies/{companyId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

3. Click **"Publish"**

---

## Step 4: Get Your Firebase Config

1. Click **gear icon ⚙️** → **"Project settings"**
2. Scroll to **"Your apps"** section
3. Click **Web icon `</>`**
4. Enter app nickname: `ReferTRM Web`
5. Click **"Register app"**
6. Copy the config values:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",           // ← Copy this
  authDomain: "...firebaseapp.com",
  projectId: "...",
  storageBucket: "...appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
```

---

## Step 5: Update Your .env File

Edit `/home/z/my-project/.env` with your values:

```env
DATABASE_URL=file:/home/z/my-project/db/custom.db

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...your_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=refertrm.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=refertrm
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=refertrm.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## Step 6: Add Authorized Domain

1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Click **"Add domain"**
3. Add your domain (e.g., `localhost` is already there)
4. Add production domain when deployed

---

## Step 7: Test Your Setup

After updating `.env`, restart the server:

```bash
# Server will auto-reload
```

Then test login at: http://localhost:3000

---

## 📊 Firebase Free Tier Limits

| Resource | Free Limit | ReferTRM Usage |
|----------|------------|----------------|
| Auth Users | Unlimited | ✅ |
| Firestore Reads | 50,000/day | ✅ Enough for 1000+ users |
| Firestore Writes | 20,000/day | ✅ |
| Storage | 1 GB | ✅ |

---

## 🔒 Security Best Practices

1. **Never commit `.env` to git** (already in .gitignore)
2. **Enable 2FA** on your Google account
3. **Set budget alerts** in Firebase Console
4. **Review security rules** before going live

---

## 🆘 Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
→ Add your domain to Authorized domains in Firebase Console

### "Firebase: Error (auth/invalid-api-key)"
→ Check your API key in `.env` file

### "Permission denied" on Firestore
→ Check your security rules are published

### "Project not found"
→ Verify your `projectId` matches Firebase Console

---

## ✅ Setup Complete!

Once you've added your Firebase config to `.env`, the platform will:
- ✅ Support Email/Password login
- ✅ Support Anonymous login
- ✅ Sync user data to Firestore
- ✅ Work across devices

Need help? Share your Firebase project ID and we can verify the setup.
