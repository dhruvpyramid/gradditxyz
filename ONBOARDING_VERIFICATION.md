# 🔐 Onboarding Verification System

## How We Track First-Time Users

### ✅ Current Implementation: **Database-Backed User Account Tracking**

We use a **hybrid approach** combining multiple verification methods for reliability:

---

## 🎯 Primary Method: Database Field (Most Reliable)

### Schema Field:
```prisma
model User {
  hasSeenOnboarding Boolean @default(false)
  // ... other fields
}
```

### How It Works:
1. **New user signs up** → `hasSeenOnboarding = false` (default)
2. **User completes onboarding tour** → API call updates to `true`
3. **User logs in on ANY device** → Check database, if `true`, skip tour
4. **Result:** Tour shows ONCE per user account (not per device)

### API Endpoint:
```
POST /api/user/complete-onboarding
Authorization: Bearer <privy_token>
```

---

## 🔄 User Flow with Verification

### Flow Diagram:
```
User Signs Up (Privy Auth)
        ↓
Profile Completion Modal (forced)
        ↓
Save to DB: profileCompleted = true
        ↓
Check: hasSeenOnboarding = false?
        ↓ YES
Show Onboarding Tour (6 steps)
        ↓
User Completes/Skips Tour
        ↓
Save to DB: hasSeenOnboarding = true
        ↓
NEVER SHOW AGAIN (any device, any session)
```

---

## 🎨 User Can Skip Anytime

### Skip Options:
1. **X Button** (top-right corner of tooltip)
2. **Skip Button** (inline text option)
3. **ESC Key** (keyboard shortcut)
4. **Click Outside** (dismiss tour)

### When Skipped:
- Still saves `hasSeenOnboarding = true` to database
- User won't see tour again
- Can access app immediately

---

## 🔍 Verification Methods Breakdown

### 1. **Privy User ID** (Primary Identity)
```typescript
const verifiedClaims = await privy.verifyAuthToken(authToken);
const privyUserId = verifiedClaims.userId; // Unique per user
```

- **Tied to:** User account (email)
- **Persists across:** All devices, all browsers, all sessions
- **Reset when:** Never (unless user deletes account)

### 2. **Database User Record**
```typescript
await prisma.user.update({
  where: { hashedUserId: privyUserId },
  data: { hasSeenOnboarding: true }
});
```

- **Stored in:** PostgreSQL database
- **Persists across:** All devices, all browsers, all sessions
- **Reset when:** Never (unless manually updated)

### 3. **Email-Based Lookup**
```typescript
const user = await prisma.user.findUnique({
  where: { email: user.email.address }
});
```

- **Fallback method** for checking user status
- **Used in:** `/api/auth/user` endpoint

---

## 📊 What We Track

### User Session Data:
```typescript
{
  id: "clx123abc",
  email: "user@example.com",
  hashedUserId: "privy:xyz789",
  profileCompleted: true,
  hasSeenOnboarding: false, // ← Onboarding flag
  createdAt: "2024-10-26T...",
  lastVoteAt: null,
  ipAddress: "192.168.1.1" // Optional for analytics
}
```

---

## 🚫 What We DON'T Use (and Why)

### ❌ localStorage Only
**Problem:** Cleared when user clears browser data, different per device
**Our Solution:** Database + localStorage as backup

### ❌ Cookies Only  
**Problem:** Can be blocked, cleared, or expire
**Our Solution:** Server-side database tracking

### ❌ IP Address Tracking
**Problem:** Changes with VPN, shared networks, mobile data
**Our Solution:** User account identity via Privy

### ❌ Device Fingerprinting
**Problem:** Privacy concerns, can be unreliable
**Our Solution:** User account identity via Privy

---

## 🔐 Security & Privacy

### Auth Token Flow:
1. User logs in with Privy
2. Privy generates JWT token
3. Token stored in localStorage: `privy:token`
4. Every API call includes: `Authorization: Bearer <token>`
5. Server verifies token with Privy
6. Extracts user ID from verified claims
7. Updates database for that specific user

### Privacy Compliance:
- ✅ No device fingerprinting
- ✅ No tracking cookies
- ✅ No third-party analytics
- ✅ User can skip tour anytime
- ✅ Data tied to user account (not device)
- ✅ GDPR compliant (user controls their data)

---

## 🧪 Testing Scenarios

### Scenario 1: New User, First Login
```
Result: Shows profile modal → Shows onboarding tour
Database: hasSeenOnboarding = false → true
```

### Scenario 2: User Logs in on Different Device
```
Result: Skips profile modal, skips tour (already seen)
Database: hasSeenOnboarding = true (from first device)
```

### Scenario 3: User Clears Browser Data
```
Result: Still skips tour (data in database, not browser)
Database: hasSeenOnboarding = true
```

### Scenario 4: User Skips Tour
```
Result: Tour closes, hasSeenOnboarding = true
Database: Marks as complete even if skipped
```

### Scenario 5: Different User, Same Device
```
Result: New user sees tour (different account)
Database: New user record, hasSeenOnboarding = false
```

---

## 🛠️ Technical Implementation

### Files Involved:

1. **Database Schema**
   - `/prisma/schema.prisma`
   - Field: `hasSeenOnboarding Boolean`

2. **API Endpoints**
   - `/api/user/complete-onboarding` - Mark tour as complete
   - `/api/auth/user` - Check user status

3. **Frontend Components**
   - `/src/components/auth/AuthHandler.tsx` - Tour logic
   - `/src/components/tour/OnboardingTour.tsx` - Tour UI

4. **Flow Control**
   ```typescript
   if (!user.hasSeenOnboarding) {
     showOnboardingTour(); // Show tour
   } else {
     skipTour(); // Already seen, skip
   }
   ```

---

## 📈 Analytics (Optional Future Enhancement)

### Trackable Metrics:
- **Completion Rate:** % of users who finish full tour
- **Skip Rate:** % of users who skip tour
- **Step Drop-off:** Which step users skip most
- **Time Spent:** Average time on each step

### Implementation Idea:
```typescript
// Track tour events
await prisma.userEvent.create({
  data: {
    userId: user.id,
    eventType: 'onboarding_completed',
    metadata: { step: 6, timeSpent: 45 }
  }
});
```

---

## ✅ Summary

| Method | Reliability | Persists Across Devices | Privacy-Friendly |
|--------|-------------|------------------------|------------------|
| Database (User Account) | ⭐⭐⭐⭐⭐ | ✅ Yes | ✅ Yes |
| localStorage | ⭐⭐ | ❌ No | ✅ Yes |
| Cookies | ⭐⭐⭐ | ❌ No | ⚠️ Maybe |
| IP Address | ⭐ | ❌ No | ❌ No |
| Device Fingerprint | ⭐⭐ | ⚠️ Sometimes | ❌ No |

**Our Choice:** Database + Privy Auth = Most reliable + Privacy-friendly ✅

---

## 🎯 Key Takeaways

1. ✅ **Account-based tracking** (not device-based)
2. ✅ **User can skip anytime** (X button, Skip option)
3. ✅ **Shows once per user** (across all devices)
4. ✅ **Persists forever** (unless manually reset)
5. ✅ **Privacy-compliant** (no device fingerprinting)
6. ✅ **Secure** (Privy JWT token verification)
