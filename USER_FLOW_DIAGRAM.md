# 📊 Complete User Flow Diagram

## 🎯 Visual Representation of User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER LANDS ON WEBSITE                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                 ┌───────────────┐
                 │ Authenticated? │
                 └───────┬───────┘
                         │
            ┌────────────┴────────────┐
            │                         │
           NO                        YES
            │                         │
            ▼                         ▼
    ┌───────────────┐        ┌─────────────────┐
    │  Show Login   │        │  Check Database │
    │  (Privy Auth) │        └────────┬────────┘
    └───────┬───────┘                 │
            │                         │
            │                ┌────────┴─────────┐
            │                │                  │
            │            New User          Existing User
            │                │                  │
            └────────────────┤                  │
                             ▼                  ▼
                  ┌──────────────────┐   ┌─────────────────┐
                  │ profileCompleted? │   │ profileCompleted│
                  └─────────┬────────┘   │      = true     │
                            │            └────────┬────────┘
                ┌───────────┴────────┐            │
                │                    │            │
               NO                   YES           │
                │                    │            │
                ▼                    │            │
    ┌───────────────────────────┐   │            │
    │ PROFILE COMPLETION MODAL  │◄──┘            │
    │  ┌─────────────────────┐  │                │
    │  │ Cannot be Closed    │  │                │
    │  │ - College Name      │  │                │
    │  │   ↳ Autocomplete ✨ │  │                │
    │  │ - City (auto-fill)  │  │                │
    │  │ - State (auto-fill) │  │                │
    │  └─────────────────────┘  │                │
    └────────────┬──────────────┘                │
                 │                                │
                 ▼                                │
         ┌───────────────┐                       │
         │  Submit Form  │                       │
         └───────┬───────┘                       │
                 │                                │
                 ▼                                │
    ┌────────────────────────┐                   │
    │ Save to Database:      │                   │
    │ - profileCompleted=true│                   │
    │ - collegeName, city,   │                   │
    │   state saved          │                   │
    └────────────┬───────────┘                   │
                 │                                │
                 │◄───────────────────────────────┘
                 │
                 ▼
         ┌───────────────────┐
         │ hasSeenOnboarding?│
         └────────┬──────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
     NO                      YES
      │                       │
      ▼                       ▼
┌─────────────────────┐  ┌────────────────┐
│ ONBOARDING TOUR     │  │  GO TO APP     │
│ ┌─────────────────┐ │  │  (Skip Tour)   │
│ │ Step 1: Welcome │ │  └────────────────┘
│ │ Step 2: Category│ │           │
│ │ Step 3: State   │ │           │
│ │ Step 4: Cards   │ │           │
│ │ Step 5: Voting  │ │           │
│ │ Step 6: Sort    │ │           │
│ └─────────────────┘ │           │
│                     │           │
│  [Skip] [Next]      │           │
└──────────┬──────────┘           │
           │                      │
           ▼                      │
  ┌────────────────┐              │
  │ Tour Complete  │              │
  │  or Skipped?   │              │
  └────────┬───────┘              │
           │                      │
           ▼                      │
┌──────────────────────┐          │
│ Save to Database:    │          │
│ hasSeenOnboarding    │          │
│       = true         │          │
└──────────┬───────────┘          │
           │                      │
           └──────────┬───────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │   APP READY TO USE  │
            │                     │
            │ ✅ Profile Complete │
            │ ✅ Tour Done        │
            │ ✅ Never Show Again │
            └─────────────────────┘
```

---

## 🔄 Returning User Flow (Any Device)

```
┌─────────────────────────────────┐
│  USER LOGS IN (Same Account)   │
└────────────┬────────────────────┘
             │
             ▼
    ┌────────────────┐
    │ Check Database │
    └────────┬───────┘
             │
             ▼
┌────────────────────────────┐
│ profileCompleted = true ✅ │
│ hasSeenOnboarding = true ✅│
└────────────┬───────────────┘
             │
             ▼
    ┌────────────────────┐
    │ Skip Profile Modal │
    │ Skip Onboarding    │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ GO DIRECTLY TO APP │
    │ (No Interruptions) │
    └────────────────────┘
```

---

## 🎨 Autocomplete Flow

```
User typing in Profile Modal:

Input: ""
└─> No suggestions

Input: "i"
└─> No suggestions (need 2+ chars)

Input: "ii"
└─> ┌─────────────────────────┐
    │ IIT Delhi               │
    │ New Delhi, Delhi        │
    ├─────────────────────────┤
    │ IIT Bombay              │
    │ Mumbai, Maharashtra     │
    ├─────────────────────────┤
    │ IIT Madras              │
    │ Chennai, Tamil Nadu     │
    └─────────────────────────┘

Input: "iit d"
└─> ┌─────────────────────────┐
    │ IIT Delhi               │◄── User clicks
    │ New Delhi, Delhi        │
    ├─────────────────────────┤
    │ IIT Dharwad             │
    │ Dharwad, Karnataka      │
    ├─────────────────────────┤
    │ IIT Dhanbad             │
    │ Dhanbad, Jharkhand      │
    └─────────────────────────┘

After Selection:
┌─────────────────────────────┐
│ College Name: IIT Delhi     │ ✅ (auto-filled)
│ City: New Delhi             │ ✅ (auto-filled)
│ State: Delhi                │ ✅ (auto-filled)
└─────────────────────────────┘
```

---

## 🎯 Tour Step Navigation

```
Step 1 (Welcome)
┌────────────────────────────┐
│ Welcome to Graddit! 🎓     │
│ [●○○○○○]  [Skip] [Next]    │
└────────────────────────────┘
          │
          ▼ [Next clicked]
          
Step 2 (Categories)
┌────────────────────────────┐
│ Browse by Category         │
│ [●●○○○○]  [Back] [Next]    │
└────────────────────────────┘
          │
          ▼ [Next clicked]
          
Step 3 (State Filter)
┌────────────────────────────┐
│ Filter by State            │
│ [●●●○○○]  [Back] [Next]    │
└────────────────────────────┘
          │
          ▼ [Next clicked]
          
Step 4 (College Cards)
┌────────────────────────────┐
│ College Cards              │
│ [●●●●○○]  [Back] [Next]    │
└────────────────────────────┘
          │
          ▼ [Next clicked]
          
Step 5 (Voting)
┌────────────────────────────┐
│ Vote for Colleges          │
│ [●●●●●○]  [Back] [Next]    │
└────────────────────────────┘
          │
          ▼ [Next clicked]
          
Step 6 (Sort Options)
┌────────────────────────────┐
│ Sort Results               │
│ [●●●●●●]  [Back] [Get Started!]│
└────────────────────────────┘
          │
          ▼ [Get Started! clicked]
          
┌────────────────────────────┐
│ Save hasSeenOnboarding=true│
└────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
┌─────────────────┐
│ User Logs In    │
│ (Privy Email)   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ Privy Generates Token   │
│ JWT with userId         │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Store in localStorage:  │
│ "privy:token"           │
└────────┬────────────────┘
         │
         │ (Every API call)
         ▼
┌─────────────────────────┐
│ Authorization Header:   │
│ Bearer <token>          │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Server Verifies Token   │
│ with Privy SDK          │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Extract userId          │
│ from verified claims    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Find User in Database:  │
│ WHERE hashedUserId=userId│
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Return User Data:       │
│ - profileCompleted      │
│ - hasSeenOnboarding     │
│ - collegeName, etc.     │
└─────────────────────────┘
```

---

## 📊 Database State Transitions

```
NEW USER:
┌──────────────────────────┐
│ profileCompleted: false  │
│ hasSeenOnboarding: false │
└──────────────────────────┘

AFTER PROFILE COMPLETION:
┌──────────────────────────┐
│ profileCompleted: TRUE ✅│
│ hasSeenOnboarding: false │
│ collegeName: "IIT Delhi" │
│ city: "New Delhi"        │
│ state: "Delhi"           │
└──────────────────────────┘

AFTER TOUR COMPLETION:
┌──────────────────────────┐
│ profileCompleted: TRUE ✅│
│ hasSeenOnboarding: TRUE ✅│
│ collegeName: "IIT Delhi" │
│ city: "New Delhi"        │
│ state: "Delhi"           │
└──────────────────────────┘

FINAL STATE (Forever):
┌──────────────────────────┐
│ Both flags = TRUE ✅     │
│ User never sees modals   │
│ on ANY device/browser    │
└──────────────────────────┘
```

---

## 🎯 Skip vs Complete Behavior

```
USER SKIPS TOUR:
┌────────────────────┐
│ Click [X] button   │
│ or [Skip] button   │
└─────────┬──────────┘
          │
          ▼
┌──────────────────────────┐
│ Save to Database:        │
│ hasSeenOnboarding = true │
└─────────┬────────────────┘
          │
          ▼
┌──────────────────────────┐
│ Result: Never see again  │
│ (Same as completing)     │
└──────────────────────────┘


USER COMPLETES TOUR:
┌────────────────────┐
│ View all 6 steps   │
│ Click [Get Started]│
└─────────┬──────────┘
          │
          ▼
┌──────────────────────────┐
│ Save to Database:        │
│ hasSeenOnboarding = true │
└─────────┬────────────────┘
          │
          ▼
┌──────────────────────────┐
│ Result: Never see again  │
└──────────────────────────┘
```

---

## ✅ Summary

**The entire system works seamlessly with:**
- ✅ Mandatory profile completion (cannot skip)
- ✅ Optional onboarding tour (can skip anytime)
- ✅ Smart autocomplete (saves typing)
- ✅ Database tracking (works across devices)
- ✅ Secure authentication (Privy JWT)
- ✅ Beautiful UI/UX (smooth animations)

**User Experience:**
- First-time: Profile → Tour → App (5-10 minutes)
- Returning: Login → App (instant)
