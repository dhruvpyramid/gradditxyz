# 📤 Push Graddit to GitHub

## ✅ Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `graddit`
3. Description: "Student-driven college rankings platform for India"
4. Make it **Private** or **Public** (your choice)
5. **DON'T** check "Initialize with README"
6. Click "Create repository"

---

## 🚀 Step 2: Push Your Code

After creating the repo, GitHub will give you a URL like:
```
https://github.com/YOUR_USERNAME/graddit.git
```

### Run these commands:

```bash
cd /Users/dhruv/Downloads/graddit-simple

# Add your new GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/graddit.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## ✅ Verify It Worked

1. Go to: https://github.com/YOUR_USERNAME/graddit
2. You should see all your code!
3. Check that `gradditlogo.png` is there
4. Verify no `.env` file (should be ignored)

---

## 🎯 Next: Deploy to Vercel

After pushing to GitHub:

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `graddit` repo
4. Add environment variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_PRIVY_APP_ID`
   - `PRIVY_APP_SECRET`
5. Click "Deploy"

---

## 🔑 Quick Reference

### Your Repo URL (after creation):
```
https://github.com/YOUR_USERNAME/graddit
```

### Commands to Push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/graddit.git
git push -u origin main
```

### Vercel Import:
```
https://vercel.com/new
```

---

**Ready? Create the GitHub repo first, then run the commands!** 🚀
