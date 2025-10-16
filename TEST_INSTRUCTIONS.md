# 🧪 Test Graddit - Step by Step

## Current Status
- ✅ Database connected with 10 colleges
- ✅ UI matches original Fluffle design
- ✅ Profile dropdown with first letter
- ✅ Arrow voting buttons
- ✅ Original filter styling

## 🔥 Test Now (5 minutes)

### Test 1: View Colleges (Should Work)
1. Go to http://localhost:3000
2. ✅ See "Graddit" in header
3. ✅ See 10 colleges displayed
4. ✅ See filters with gradients (All, Engineering, Medical, etc.)
5. ✅ See state filters (All States, Delhi, Maharashtra, etc.)
6. ✅ See sort buttons (Score, A-Z, Latest)
7. ✅ Click filters - colleges filter correctly

### Test 2: Login & Profile Setup (Critical)
1. Click "Login / Sign Up" (top right)
2. Enter email: `dhruv.223217@pyramidcollege.edu.in`
3. Complete Privy verification
4. **SHOULD SEE:** "Complete Your Profile" form
5. Fill in:
   - College Name: `Pyramid College`
   - City: `Your City`
   - State: Select from dropdown
6. Click "Complete Profile"
7. **SHOULD SEE:** Page reloads, you're logged in
8. **SHOULD SEE:** Profile button with "D" (first letter)

### Test 3: Profile Dropdown (Should Work)
1. Hover over profile button (circle with "D")
2. **SHOULD SEE:** Dropdown with full email
3. **SHOULD SEE:** Logout button
4. Click outside - dropdown closes

### Test 4: Voting (Should Work After Profile Setup)
1. Find any college card
2. Click ⬆️ (up arrow)
3. **SHOULD SEE:** Toast "Vote submitted!"
4. **SHOULD SEE:** Arrow turns green
5. **SHOULD SEE:** Score increases
6. Try clicking ⬇️ on another college
7. **SHOULD SEE:** Arrow turns red
8. **SHOULD SEE:** Score changes

### Test 5: Admin Panel (Should Work)
1. Go to http://localhost:3000/admin
2. **IF NOT ADMIN:** Add yourself first (see below)
3. **SHOULD SEE:** "Add New College" form
4. Fill in college details
5. Click "Add College"
6. **SHOULD SEE:** College appears in list
7. Go back to home - new college should be there

## 🐛 If Something Doesn't Work

### Issue: Profile setup doesn't show after login
**Fix:**
1. Logout
2. Clear browser cache (Ctrl+Shift+Delete)
3. Login again
4. Should show profile setup

### Issue: "User doesn't exist" when voting
**Cause:** Profile setup didn't complete
**Fix:**
1. Logout
2. Login again
3. Complete profile setup
4. Try voting again

### Issue: Not admin
**Fix:** Run this command:
```bash
npx tsx -e "
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.admin.create({
  data: { email: 'dhruv.223217@pyramidcollege.edu.in' }
}).then(() => console.log('✅ Admin added')).finally(() => prisma.\$disconnect());
"
```

### Issue: Colleges not loading
**Fix:** Check database connection:
```bash
npx prisma studio
```
Should see 10 colleges in College table.

## ✅ Success Checklist

After testing, you should have:
- [ ] Logged in successfully
- [ ] Profile setup completed
- [ ] Profile dropdown working
- [ ] Voted on at least one college
- [ ] Filters working
- [ ] Sort buttons working
- [ ] Admin panel accessible (if admin)

## 🎯 Expected Behavior

### UI/UX:
- Cards have backdrop blur, rounded corners
- Filters have gradient backgrounds when selected
- Voting buttons are arrows (not thumbs)
- Profile shows first letter in circle
- Dropdown shows on hover

### Functionality:
- Login → Profile Setup → Voting works
- Weighted voting (same college 1.5x, same state 1.2x)
- Max 5 votes per user
- Real-time score updates
- Admin can add/delete colleges

## 📸 What It Should Look Like

### Header:
```
[G] Graddit                                    [D ▼] [🌙] [☀️]
```

### Filters:
```
[All: 10] [Engineering: 6] [Medical: 1] [Arts: 2] [Management: 1]
[All States: 10] [Delhi: 4] [Maharashtra: 1] ...
                                    [Score] [A-Z] [Latest]
```

### College Card:
```
┌─────────────────────────────────────┐
│                      [Engineering]  │
│ IIT Delhi                           │
│ 📍 New Delhi, Delhi                 │
│ Premier engineering institute...    │
│ 🌐 Visit Website →                  │
│ ─────────────────────────────────── │
│ 0.0        [⬆️] [⬇️]                │
│ 0 votes                             │
└─────────────────────────────────────┘
```

## 🚀 Everything Working?

If all tests pass:
1. ✅ UI matches original design
2. ✅ Login and profile setup works
3. ✅ Voting works
4. ✅ Admin panel works
5. ✅ Database connected

**You're ready to go! 🎉**

## 📝 Next Steps

1. Add more colleges via admin panel
2. Test with multiple users
3. Check weighted voting (vote from different colleges/states)
4. Deploy to production (Vercel + Supabase)
