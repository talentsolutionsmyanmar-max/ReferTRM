# Firestore Security Rules for ReferTRM

## Copy these rules to Firebase Console:

1. Go to: https://console.firebase.google.com/project/refertrm-zai/firestore/rules
2. Click "Create Database" if prompted
3. Choose "Start in production mode"
4. Select region: asia-southeast1 (Singapore)
5. Click "Rules" tab
6. Replace with the rules below:

---

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Jobs collection - public read, no write from client
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Companies collection - public read, no write from client  
    match /companies/{companyId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Referrals - users can read their own referrals
    match /referrals/{referralId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.referrerId || 
         request.auth.uid == resource.data.referredId);
      allow create: if request.auth != null;
    }
  }
}
```

---

## If Firestore Requires Billing:

Use **Realtime Database** instead:

1. Go to: https://console.firebase.google.com/project/refertrm-zai/database
2. Click "Create Database"
3. Choose "Start in test mode"
4. No billing required!

---

## After Setting Up Database:

Your app will be fully functional with:
✅ Firebase Authentication (Email + Anonymous)
✅ Firestore/Realtime Database for user data
✅ 26 real job positions from your Excel
✅ Points, streaks, referrals system
