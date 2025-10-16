# Environment Setup for Graddit

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/graddit"

# Privy Authentication
NEXT_PUBLIC_PRIVY_APP_ID="cmbi8jxhs000zju0mbg0xx3v3"

# Admin Emails (comma-separated)
ADMIN_EMAILS="your-admin-email@example.com"
```

## Database Setup

1. Install PostgreSQL if not already installed
2. Create a database named `graddit`
3. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

## Privy Setup

The Privy App ID is already configured. If you need to change it:
1. Go to https://dashboard.privy.io
2. Create a new app or use existing
3. Update `NEXT_PUBLIC_PRIVY_APP_ID` in `.env`

## Admin Access

To add admin users:
1. Add their email to `ADMIN_EMAILS` in `.env`
2. Or manually insert into the `Admin` table in the database:
   ```sql
   INSERT INTO "Admin" (id, email, "createdAt") 
   VALUES (gen_random_uuid(), 'admin@example.com', NOW());
   ```

## Running the App

```bash
npm run dev
```

Visit http://localhost:3000
