# 🎓 Graddit - Student-Driven College Rankings

<div align="center">
  <img src="/public/gradditlogo.png" alt="Graddit Logo" width="500" />
  <p><strong>Fair, transparent, and student-powered college rankings for India</strong></p>
</div>

<div align="center">
  <a href="https://nextjs.org">
    <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js" />
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-5-blue" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com">
    <img src="https://img.shields.io/badge/Tailwind-3-38bdf8" alt="Tailwind CSS" />
  </a>
  <a href="https://www.prisma.io">
    <img src="https://img.shields.io/badge/Prisma-6-2D3748" alt="Prisma" />
  </a>
  <a href="https://www.privy.io">
    <img src="https://img.shields.io/badge/Privy-Auth-6366F1" alt="Privy" />
  </a>
</div>

---

## 🎯 Our Mission

Graddit empowers students to create **fair, transparent college rankings** based on real experiences. By leveraging verified `.edu.in` email authentication and a weighted voting system, we ensure that rankings reflect genuine student sentiment while preventing manipulation.

Traditional college rankings often rely on opaque methodologies, institutional funding, or outdated data. **Graddit puts the power in students' hands** - those who actually experience college life daily.

---

## ✨ Key Features

### 🔐 Verified Student Voting
- **Email Verification**: Only `.edu.in` email addresses can vote
- **Privy Authentication**: Secure, modern auth with email verification
- **One Vote Per College**: Each student can vote once per institution
- **Vote Limit**: Maximum 5 votes per student to prevent spam

### ⚖️ Weighted Voting System
Votes are weighted based on geographic and institutional proximity:
- **Same College (1.5x)**: Students voting for their own college
- **Same State (1.2x)**: Students from the same state  
- **Different State (1.0x)**: Students from other states

This ensures that those most familiar with a college have proportionally more influence.

### 🛡️ Anti-Manipulation Safeguards
- **IP Throttling**: Max 5 votes per IP per hour
- **Time-based Limits**: Minimum 10 seconds between votes
- **Behavioral Analysis**: Automatic blocking for suspicious patterns
- **Vote Tracking**: Complete audit trail for transparency

### 📊 Real-Time Rankings
- **Live Updates**: Scores update instantly after votes
- **Category Filters**: Filter by Engineering, Medical, Arts, Science, etc.
- **State Filters**: View rankings by Indian state
- **Sort Options**: Sort by score, name, or latest additions
- **Glass Morphism UI**: Modern, professional interface with hover effects

### 👨‍💼 Admin Dashboard
- **College Management**: Add or remove colleges
- **Vote Monitoring**: Track voting patterns
- **User Management**: Handle flagged accounts
- **Category Management**: Organize colleges by type

---

## 🔧 How It Works

### 1️⃣ Authentication Flow
```
Student visits Graddit
       ↓
Clicks "Login / Sign Up"
       ↓
Privy verifies .edu.in email
       ↓
Student completes profile:
  - College Name
  - City
  - State
       ↓
User data saved to database
       ↓
Ready to vote! ✅
```

### 2️⃣ Voting Logic

When a student votes:

**Step 1: Validation**
- Check user exists in database
- Verify user not blocked
- Check vote limit not exceeded (5 votes max)
- Verify hasn't voted for this college before

**Step 2: Weight Calculation**
```typescript
function calculateWeight(
  userCollege: string,
  userState: string,
  targetCollege: string,
  targetState: string
): number {
  if (userCollege === targetCollege) return 1.5;  // Same college
  if (userState === targetState) return 1.2;      // Same state
  return 1.0;                                     // Different state
}
```

**Step 3: Anti-Manipulation Checks**
```typescript
// IP throttling
const recentVotesFromIP = await checkIPVotes(ipAddress, lastHour);
if (recentVotesFromIP >= 5) block();

// Time-based throttling
const timeBetweenVotes = currentVote.time - lastVote.time;
if (timeBetweenVotes < 10000ms) block();
```

**Step 4: Score Update**
```typescript
const scoreChange = weight * voteType;  // voteType: +1 or -1
college.score += scoreChange;
college.voteCount += 1;
user.voteCount += 1;
```

### 3️⃣ Ranking Calculation

Colleges are ranked by their **weighted score**:
```
Final Score = Σ (voteType × weight)
```

Example:
- 10 upvotes from same college students: +15 points (10 × 1.5)
- 5 upvotes from same state students: +6 points (5 × 1.2)
- 3 downvotes from other state students: -3 points (3 × 1.0 × -1)
- **Total Score**: 18 points

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Effects**: Glowing borders, glass morphism
- **Icons**: Lucide React
- **Notifications**: Sonner (toast)

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Privy (email verification)

### Database Schema
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  collegeName   String
  city          String
  state         String
  voteCount     Int      @default(0)
  isBlocked     Boolean  @default(false)
  votes         Vote[]
}

model College {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  category    String
  city        String
  state       String
  score       Float    @default(0)
  voteCount   Int      @default(0)
  votes       Vote[]
}

model Vote {
  id        Int      @id @default(autoincrement())
  userId    String
  collegeId Int
  voteType  Int      // +1 or -1
  weight    Float    // 1.0, 1.2, or 1.5
  createdAt DateTime @default(now())
  
  @@unique([userId, collegeId])
}
```

### Deployment
- **Platform**: Vercel
- **Database**: Supabase (PostgreSQL)
- **Domain**: Custom domain support

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database (we recommend Supabase)
- Privy account (for authentication)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/dhruvpyramid/gradditxyz.git
cd gradditxyz
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file:
```env
# Database (Supabase)
DATABASE_URL="postgresql://..."

# Privy Authentication
NEXT_PUBLIC_PRIVY_APP_ID="your_privy_app_id"
PRIVY_APP_SECRET="your_privy_secret"
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed initial colleges (optional)
npx prisma db seed
```

5. **Start development server**
```bash
npm run dev
```

6. **Open in browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
gradditxyz/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data script
├── public/
│   └── gradditlogo.png        # Graddit logo
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx       # Admin dashboard
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/route.ts    # User registration
│   │   │   │   └── user/route.ts        # Get user data
│   │   │   ├── colleges/
│   │   │   │   ├── route.ts             # Get colleges
│   │   │   │   └── vote/route.ts        # Submit vote
│   │   │   └── admin/
│   │   │       └── colleges/route.ts    # Admin college mgmt
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginModal.tsx          # Login UI
│   │   │   └── ProfileSetupChecker.tsx # Auto profile check
│   │   ├── colleges/
│   │   │   ├── CollegeCard.tsx         # College display card
│   │   │   └── CollegeDashboard.tsx    # Main dashboard
│   │   ├── ecosystem/
│   │   │   └── CollegeHeader.tsx       # Header with stats
│   │   ├── FixedHeader.tsx             # Top navigation
│   │   └── Footer.tsx                  # Footer
│   ├── contexts/
│   │   └── PrivyAuthContext.tsx        # Privy auth wrapper
│   ├── data/
│   │   └── indian-states.ts            # States & categories
│   └── lib/
│       ├── prisma.ts                   # Prisma client
│       └── utils.ts                    # Utility functions
├── .env.example                # Environment template
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 🎨 UI Features

### Modern Design
- **Glass Morphism**: Frosted glass effect on cards
- **Glowing Borders**: Hover effects on college cards
- **Animated Gradient**: Flowing gradient on headline
- **Dark Mode**: Full dark mode support
- **Responsive**: Mobile-first design

### User Experience
- **Fixed Navigation**: Header stays at top while scrolling
- **Profile Dropdown**: Easy access to account info
- **Toast Notifications**: Real-time feedback
- **Loading States**: Clear loading indicators
- **Error Handling**: Friendly error messages

---

## 🔒 Security Features

### Authentication
- ✅ Email verification required (.edu.in only)
- ✅ Secure session management with Privy
- ✅ Auto profile setup check
- ✅ Protected API routes

### Vote Protection
- ✅ One vote per student per college
- ✅ Maximum 5 votes per student
- ✅ IP-based rate limiting
- ✅ Time-based throttling
- ✅ Automatic suspicious activity detection
- ✅ User blocking mechanism

### Data Protection
- ✅ Hashed user IDs
- ✅ Environment variables for secrets
- ✅ HTTPS-only in production
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection

---

## 📊 Admin Dashboard

Access at `/admin` (requires admin email in database)

### Features
- **Add Colleges**: Create new college entries
- **Delete Colleges**: Remove colleges from platform
- **View All Colleges**: See complete list with details
- **Quick Search**: Find colleges by name
- **Category Assignment**: Organize by type

### Adding Admin Access
Add your email to the `Admin` table in database:
```sql
INSERT INTO "Admin" (email) VALUES ('your.email@college.edu.in');
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines
- Follow TypeScript best practices
- Write clear commit messages
- Test your changes locally
- Update documentation if needed

---

## 📝 API Documentation

### Get Colleges
```typescript
GET /api/colleges?state=Maharashtra&category=Engineering&sortBy=score

Response:
{
  colleges: [
    {
      id: 1,
      name: "IIT Bombay",
      category: "Engineering",
      city: "Mumbai",
      state: "Maharashtra",
      score: 125.5,
      voteCount: 89
    }
  ]
}
```

### Submit Vote
```typescript
POST /api/colleges/vote
Body: {
  email: "student@college.edu.in",
  collegeId: 1,
  voteType: 1  // 1 for upvote, -1 for downvote
}

Response:
{
  success: true,
  vote: {...},
  college: {
    score: 126.5,
    voteCount: 90
  },
  remainingVotes: 4
}
```

### Register User
```typescript
POST /api/auth/register
Body: {
  email: "student@college.edu.in",
  collegeName: "IIT Bombay",
  city: "Mumbai",
  state: "Maharashtra"
}

Response:
{
  success: true,
  user: {...}
}
```

---

## 🚀 Deployment Guide

### Deploy to Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
- Go to https://vercel.com/new
- Import your repository
- Configure project settings

3. **Add Environment Variables**
```
DATABASE_URL=your_supabase_url
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_id
PRIVY_APP_SECRET=your_privy_secret
```

4. **Deploy**
- Click "Deploy"
- Wait 2-3 minutes
- Your site is live! 🎉

5. **Add Custom Domain** (Optional)
- Go to Project Settings → Domains
- Add your domain
- Update DNS records

---

## 📈 Roadmap

### Phase 1 - MVP (✅ Completed)
- [x] User authentication with .edu.in verification
- [x] Weighted voting system
- [x] Anti-manipulation safeguards
- [x] Real-time rankings
- [x] Admin dashboard

### Phase 2 - Enhancements (🚧 In Progress)
- [ ] College profiles with details
- [ ] Student reviews and comments
- [ ] Comparison tool
- [ ] Historical ranking data
- [ ] Mobile app

### Phase 3 - Expansion
- [ ] Hostel rankings
- [ ] Faculty ratings
- [ ] Placement data integration
- [ ] Campus tour videos
- [ ] Alumni network

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Website**: Coming soon
- **Twitter**: [@graddit_in](https://twitter.com/graddit_in)
- **Email**: contact@graddit.in

---

## 💬 Support

Need help? Have questions?

- Open an [Issue](https://github.com/dhruvpyramid/gradditxyz/issues)
- Email us: support@graddit.in

---

<div align="center">
  <p>Made with ❤️ by students, for students</p>
  <p><strong>Graddit - Fair Rankings, Student Voice</strong></p>
</div>
