# ReferTRM Security Recommendations

## Your Mission Deserves Strong Protection

You're building something meaningful for Myanmar's youth. Protecting their data and trust is paramount. Here are comprehensive security recommendations:

---

## 🔴 CRITICAL PRIORITY - Implement Immediately

### 1. Authentication & Authorization

**Current Status**: Firebase Auth (Good start!)
**Recommendations**:

```typescript
// ✅ Add rate limiting for login attempts
// In your auth context or API
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

// ✅ Implement email verification
await user.sendEmailVerification();

// ✅ Add password strength requirements
const passwordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
};

// ✅ Enable Firebase App Check
// Prevents abuse from unauthorized apps
firebase.appCheck().activate('YOUR_RECAPTCHA_SITE_KEY');
```

### 2. Input Sanitization & XSS Prevention

```typescript
// ✅ Always sanitize user inputs
import DOMPurify from 'dompurify';

const sanitizeInput = (input: string) => {
  return DOMPurify.sanitize(input);
};

// ✅ Use React's built-in escaping (already does this)
// ✅ Never use dangerouslySetInnerHTML with user content

// ✅ Add CSP Headers (in next.config.js)
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com; style-src 'self' 'unsafe-inline';"
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];
```

### 3. Firebase Security Rules (MOST IMPORTANT!)

**Your current Firebase rules should be strict:**

```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Validate data structure
      allow write: if request.resource.data.keys().hasAll(['email', 'displayName'])
        && request.resource.data.email is string
        && request.resource.data.displayName is string;
    }
    
    // Jobs - read for all authenticated, write for admins only
    match /jobs/{jobId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Reviews - users can create, everyone can read
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null 
        && resource.data.userId == request.auth.uid;
    }
    
    // Salary data - sensitive, aggregate only
    match /salaryData/{doc} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      // Never allow direct read of individual salary submissions
    }
  }
}

// Realtime Database Rules
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "jobs": {
      ".read": "auth != null",
      ".write": "auth != null && root.child('users').child(auth.uid).child('role').val() == 'admin'"
    },
    "votes": {
      ".read": true,
      "$companyId": {
        ".write": "auth != null",
        ".validate": "newData.isNumber()"
      }
    }
  }
}
```

### 4. Environment Variables Protection

```bash
# ✅ NEVER commit .env files
# Add to .gitignore:
.env
.env.local
.env.production

# ✅ Use different Firebase projects for dev/prod
# ✅ Restrict API keys by domain in Firebase Console
#    - Go to Firebase Console > Project Settings
#    - Add your domain to authorized domains
#    - Set API key restrictions in Google Cloud Console
```

---

## 🟡 HIGH PRIORITY - Implement This Month

### 5. Rate Limiting

```typescript
// Install: npm install rate-limiter-flexible

import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
});

// In your API routes
const rateLimitMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch {
    res.status(429).json({ error: 'Too many requests' });
  }
};
```

### 6. Secure File Uploads

```typescript
// If you add file uploads later

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const validateFile = (file: File) => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }
  // Scan for viruses if possible
  return true;
};
```

### 7. Session Management

```typescript
// In Firebase Auth
import { getAuth, onIdTokenChanged } from 'firebase/auth';

// Monitor token changes
onIdTokenChanged(auth, (user) => {
  if (user) {
    // User signed in
    sessionStorage.setItem('lastActivity', Date.now().toString());
  } else {
    // User signed out
    sessionStorage.clear();
  }
});

// Auto-logout after inactivity
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
let inactivityTimer;

const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    auth.signOut();
  }, INACTIVITY_TIMEOUT);
};

// Add event listeners
['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
  document.addEventListener(event, resetInactivityTimer);
});
```

### 8. Audit Logging

```typescript
// Create audit log collection in Firebase

const logAuditEvent = async (
  userId: string,
  action: string,
  details: object
) => {
  await addDoc(collection(db, 'auditLogs'), {
    userId,
    action,
    details,
    timestamp: serverTimestamp(),
    ipAddress: 'captured-server-side',
    userAgent: navigator.userAgent,
  });
};

// Log important actions
// - Login attempts (success/failure)
// - Password changes
// - Profile updates
// - Data exports
// - Admin actions
```

---

## 🟢 MEDIUM PRIORITY - Implement Soon

### 9. HTTPS Enforcement

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ];
  }
};
```

### 10. Two-Factor Authentication (Future)

```typescript
// Firebase supports phone auth
// Add as optional 2FA for sensitive operations

import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const enable2FA = async (phoneNumber: string) => {
  const provider = new PhoneAuthProvider(auth);
  const verificationId = await provider.verifyPhoneNumber(
    phoneNumber,
    new RecaptchaVerifier('recaptcha-container', {}, auth)
  );
  // Store verificationId, verify with code
};
```

### 11. Data Encryption

```typescript
// Encrypt sensitive data before storing
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

const decrypt = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Use for: salary data, personal info, contact details
```

### 12. Bot Prevention

```typescript
// Add invisible reCAPTCHA v3
// Already available with Firebase App Check

// Honeypot fields in forms
<input 
  type="text" 
  name="website" // Fake field
  className="hidden" 
  tabIndex={-1}
  autoComplete="off"
/>
// If filled, reject the submission
```

---

## 📋 Security Checklist

### Daily/Weekly
- [ ] Monitor Firebase usage in console
- [ ] Check for unusual login patterns
- [ ] Review failed authentication attempts
- [ ] Backup database

### Monthly
- [ ] Update all npm packages (`npm audit fix`)
- [ ] Review Firebase security rules
- [ ] Check API key restrictions
- [ ] Review audit logs

### Quarterly
- [ ] Penetration testing
- [ ] Security audit
- [ ] Update privacy policy
- [ ] Review third-party integrations

---

## 🇲🇲 Myanmar-Specific Considerations

### 1. Data Localization
- Consider keeping user data in Asia regions
- Firebase default is us-central, consider asia-southeast (Singapore)

### 2. Internet Connectivity
- Handle poor connections gracefully
- Implement offline-first where possible
- Use Firebase offline persistence

```typescript
// Enable offline persistence
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';

const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});
```

### 3. Payment Security (KBZ Pay, Wave Money)
- Never store payment credentials
- Use webhooks for payment verification
- Verify transaction signatures
- Log all payment attempts

### 4. Mobile Banking Integration
```typescript
// Verify payment callbacks
const verifyPayment = async (transactionId: string, signature: string) => {
  // Verify signature with payment provider's public key
  // Never trust client-side payment confirmations
  const isValid = await verifyWithProvider(transactionId, signature);
  if (!isValid) {
    await logAuditEvent('system', 'fraud_attempt', { transactionId });
    throw new Error('Invalid payment');
  }
  return true;
};
```

---

## 🚨 Incident Response Plan

If security breach suspected:

1. **Immediate**: Revoke all API keys
2. **Within 1 hour**: Force password reset for affected users
3. **Within 4 hours**: Notify users via email
4. **Within 24 hours**: Document incident, update security measures
5. **Within 1 week**: Post-mortem analysis

---

## Contact for Security Issues

Create a security.txt file at `/public/.well-known/security.txt`:

```
Contact: security@refertrm.com
Expires: 2026-12-31T23:59:00.000Z
Preferred-Languages: en, my
```

---

## Summary

**Most Important Actions Today:**
1. ✅ Review and tighten Firebase Security Rules
2. ✅ Add rate limiting to API routes
3. ✅ Enable Firebase App Check
4. ✅ Set up audit logging
5. ✅ Add input sanitization

**Your mission to provide free education is noble. Protect your users' trust with strong security.**
