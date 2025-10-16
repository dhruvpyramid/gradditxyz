# Graddit Implementation Guide

## Overview
Graddit is a college ranking platform where students vote for colleges using their .edu.in emails. The system uses weighted voting based on the voter's relationship to the college.

## What Has Been Implemented

### 1. Database Schema (Prisma)
- **User Model**: Stores student information with anonymized IDs
- **College Model**: Stores college information and scores
- **Vote Model**: Tracks all votes with weights
- **Admin Model**: Manages admin access

### 2. API Routes Created

#### Authentication
- `POST /api/auth/verify-email` - Verify .edu.in email
- `POST /api/auth/register` - Register new user with college verification
- `GET /api/auth/user` - Get current user info

#### Colleges
- `GET /api/colleges` - Get all colleges with filters (state, category, sortBy)
- `POST /api/colleges/vote` - Submit a vote for a college

#### Admin
- `POST /api/admin/colleges` - Add new college (admin only)
- `DELETE /api/admin/colleges?id={id}` - Delete college (admin only)

### 3. Vote Weighting System
- Same college: **1.5x** weight
- Same state: **1.2x** weight  
- Different state: **1.0x** weight

### 4. Anti-Manipulation Features
- Maximum 5 votes per user
- IP-based rate limiting (5 votes/hour per IP)
- Rapid voting detection (blocks if < 10 seconds between votes)
- Email domain verification (college name must match email)
- Automatic user blocking for suspicious activity

### 5. Privy Integration
- Email-only authentication
- .edu.in email verification
- No wallet creation (disabled)

## What Needs to Be Done

### Frontend Components to Create/Update

#### 1. Login/Registration Flow
Create `src/components/auth/LoginModal.tsx`:
- Use Privy's `useLogin()` hook
- Show email input for .edu.in emails
- After Privy auth, show profile setup form
- Collect: College Name, City, State
- Verify college name matches email domain
- Call `/api/auth/register`

#### 2. College Listing (Update Ecosystem Dashboard)
Update `src/components/ecosystem/EcosystemDashboard.tsx`:
- Fetch from `/api/colleges` instead of JSON
- Replace "projects" with "colleges"
- Show college score and vote count
- Add vote buttons (upvote/downvote)

#### 3. College Card (Update Project Card)
Update `src/components/ecosystem/ProjectCard.tsx`:
- Show college name, description, category
- Display score and ranking
- Add upvote/downvote buttons
- Show user's remaining votes

#### 4. Filters (Update Filter Controls)
Update `src/components/ecosystem/FilterControls.tsx`:
- Replace categories with college categories (Engineering, Medical, Arts, etc.)
- Keep state filter but use Indian states
- Update sort options (Score, A-Z, Latest)

#### 5. Admin Dashboard
Create `src/app/admin/page.tsx`:
- Form to add new colleges
- List of all colleges with delete option
- Check admin status via email

#### 6. User Profile/Dashboard
Create `src/components/user/UserDashboard.tsx`:
- Show remaining votes (5 - voteCount)
- List of colleges user has voted for
- User's college and state info

### Text Updates Needed

#### Update Hero Component
`src/components/Hero.tsx`:
- Change "Fluffle Tools" → "Graddit"
- Change description to college ranking theme
- Remove NFT/MegaETH references
- Update social links

#### Update Footer
`src/components/Footer.tsx`:
- Update GitHub link
- Update branding text

#### Update Main Page
`src/app/page.tsx`:
- Remove NFT viewer, analytics, PFP, etc.
- Keep only "ecosystem" view (rename to "colleges")
- Simplify navigation

## Step-by-Step Implementation

### Phase 1: Setup (DONE ✓)
- [x] Database schema
- [x] API routes
- [x] Privy integration
- [x] Anti-manipulation logic

### Phase 2: Frontend (TODO)
1. Create login/registration modal with Privy
2. Update Hero component text
3. Update EcosystemDashboard to fetch from API
4. Update ProjectCard to show college data and voting
5. Update filters for Indian states and college categories
6. Create admin dashboard
7. Create user dashboard

### Phase 3: Testing (TODO)
1. Test registration flow
2. Test voting with different scenarios
3. Test anti-manipulation (rapid voting, IP limits)
4. Test admin functions

### Phase 4: Deployment (TODO)
1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations
4. Deploy to Vercel/similar

## Key Files Modified

- `prisma/schema.prisma` - New database schema
- `src/app/layout.tsx` - Updated to use Privy
- `src/contexts/PrivyAuthContext.tsx` - New Privy provider
- `src/data/indian-states.ts` - Indian states and college categories
- `src/data/colleges.json` - Empty colleges file (will be managed via admin)

## Key Files to Create/Update Next

1. `src/components/auth/LoginModal.tsx` - Login/registration
2. `src/components/auth/ProfileSetup.tsx` - Profile setup form
3. `src/components/colleges/CollegeCard.tsx` - College display with voting
4. `src/components/colleges/VoteButton.tsx` - Voting interface
5. `src/app/admin/page.tsx` - Admin dashboard
6. Update `src/components/Hero.tsx` - Graddit branding
7. Update `src/components/ecosystem/*` - College listing

## Database Migration

Run this to create the database tables:

```bash
npx prisma migrate dev --name init
```

## Adding First Admin

After database is set up, add yourself as admin:

```sql
INSERT INTO "Admin" (id, email, "createdAt") 
VALUES (gen_random_uuid(), 'your-email@example.com', NOW());
```

## Testing the APIs

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@iitd.edu.in",
    "collegeName": "IIT Delhi",
    "city": "Delhi",
    "state": "Delhi"
  }'
```

### Add a College (as admin)
```bash
curl -X POST http://localhost:3000/api/admin/colleges \
  -H "Content-Type: application/json" \
  -H "x-admin-email: your-admin@example.com" \
  -d '{
    "name": "IIT Delhi",
    "category": "Engineering",
    "city": "Delhi",
    "state": "Delhi",
    "website": "https://iitd.ac.in",
    "description": "Premier engineering institute"
  }'
```

### Vote for a College
```bash
curl -X POST http://localhost:3000/api/colleges/vote \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@iitd.edu.in",
    "collegeId": 1,
    "voteType": 1
  }'
```

## Next Steps

1. Run `npx prisma migrate dev --name init` to create database
2. Add yourself as admin in the database
3. Start implementing the frontend components listed above
4. Test the complete flow
5. Deploy!
