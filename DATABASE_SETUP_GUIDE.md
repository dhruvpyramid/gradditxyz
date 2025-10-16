# Free Database Setup for Graddit

## Option 1: Supabase (Recommended - 5 minutes setup)

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub/Google (free)

### Step 2: Create New Project
1. Click "New Project"
2. Name: `graddit`
3. Database Password: (create a strong password - SAVE THIS!)
4. Region: Choose closest to you
5. Click "Create new project" (takes ~2 minutes)

### Step 3: Get Database URL
1. Go to Project Settings (gear icon)
2. Click "Database" in sidebar
3. Scroll to "Connection string"
4. Copy the "URI" (starts with `postgresql://`)
5. Replace `[YOUR-PASSWORD]` with your actual password

### Step 4: Add to .env
Create `.env` file in project root:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"
NEXT_PUBLIC_PRIVY_APP_ID="cmbi8jxhs000zju0mbg0xx3v3"
```

### Step 5: Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 6: Add Yourself as Admin
```bash
# Replace with your email
npx prisma db execute --stdin <<EOF
INSERT INTO "Admin" (id, email, "createdAt") 
VALUES (gen_random_uuid(), 'your-email@example.com', NOW());
EOF
```

---

## Option 2: Neon (Alternative - Also Free)

### Step 1: Create Neon Account
1. Go to https://neon.tech
2. Sign up with GitHub/Google
3. Click "Create a project"

### Step 2: Get Connection String
1. After project creation, copy the connection string
2. It looks like: `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb`

### Step 3: Add to .env
```env
DATABASE_URL="your-neon-connection-string"
NEXT_PUBLIC_PRIVY_APP_ID="cmbi8jxhs000zju0mbg0xx3v3"
```

### Step 4: Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## Option 3: Railway (Another Alternative)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"

### Step 2: Get Connection String
1. Click on PostgreSQL service
2. Go to "Connect" tab
3. Copy "Postgres Connection URL"

### Step 3: Add to .env
```env
DATABASE_URL="your-railway-connection-string"
NEXT_PUBLIC_PRIVY_APP_ID="cmbi8jxhs000zju0mbg0xx3v3"
```

### Step 4: Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## After Database Setup

### 1. Restart Dev Server
```bash
npm run dev
```

### 2. Add Yourself as Admin
Go to your database (Supabase/Neon/Railway dashboard) and run:

```sql
INSERT INTO "Admin" (id, email, "createdAt") 
VALUES (gen_random_uuid(), 'your-email@example.com', NOW());
```

Or use Prisma Studio:
```bash
npx prisma studio
```
Then manually add an admin record.

### 3. Add Some Test Colleges
1. Go to http://localhost:3000/admin
2. Login with your admin email
3. Add colleges using the form

---

## Comparison

| Service | Free Tier | Setup Time | Best For |
|---------|-----------|------------|----------|
| **Supabase** | 500MB, 2 projects | 5 min | Easiest, has dashboard |
| **Neon** | 3GB, unlimited projects | 3 min | Most generous |
| **Railway** | $5 credit/month | 5 min | Simple, clean UI |

**Recommendation**: Start with **Supabase** - it's the easiest and has a great dashboard to view your data.

---

## Troubleshooting

### "Can't connect to database"
- Check if DATABASE_URL is correct in .env
- Make sure you replaced [YOUR-PASSWORD] with actual password
- Try pinging the database host

### "Prisma migrate failed"
- Make sure .env file exists
- Check DATABASE_URL format
- Ensure database is accessible

### "Admin not working"
- Make sure you added your email to Admin table
- Check email matches exactly what you login with
- Use Prisma Studio to verify: `npx prisma studio`

---

## Quick Start (Copy-Paste)

After getting your DATABASE_URL:

```bash
# 1. Create .env
echo 'DATABASE_URL="your-connection-string-here"' > .env
echo 'NEXT_PUBLIC_PRIVY_APP_ID="cmbi8jxhs000zju0mbg0xx3v3"' >> .env

# 2. Run migrations
npx prisma migrate dev --name init
npx prisma generate

# 3. Restart server
npm run dev

# 4. Open Prisma Studio to add admin
npx prisma studio
```

Then go to http://localhost:3000 and start using Graddit! 🎉
