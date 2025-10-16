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
- **Category Filters**: Filter by Engineering, Medical, Arts, etc.
- **State Filters**: View rankings by state
- **Sort Options**: Sort by score, name, or latest additions

### 👨‍💼 Admin Dashboard
- **College Management**: Add or remove colleges
- **Vote Monitoring**: Track voting patterns
- **User Management**: Handle flagged accounts
- **Testnet Integration**: Access and interact with MegaETH testnet
- **Modern UI/UX**: Clean, responsive interface with dark mode support
- **Discord Integration**: Secure authentication and role-based access
- **Responsive Design**: Optimized for both desktop and mobile experiences

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git
- Discord application credentials (for auth features)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fluffle-3d.git
cd fluffle-3d
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file with the following:

```env
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DATABASE_URL=your_database_url
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Ecosystem Directory

The project includes a comprehensive directory of MegaETH ecosystem projects in `src/data/ecosystem.json`. Each project entry follows this structure:

```json
{
  "name": "Project Name",
  "twitter": "twitter_handle", // without @
  "website": "https://project-website.com", // optional
  "discord": "https://discord.gg/invite-code", // optional
  "telegram": "https://t.me/group-name", // optional
  "description": "A brief description of the project",
  "category": "Category",
  "megaMafia": false, // true if it's a MegaMafia project
  "native": true, // true if it's native to MegaETH ecosystem
  "testnet": false // true if the project is on testnet
}
```

### Project Categories

- `NFT`: NFT collections and marketplaces
- `DeFi`: Decentralized finance projects
- `Infrastructure`: Core blockchain infrastructure
- `Community`: Community tools and platforms
- `Gaming`: Gaming and metaverse projects
- `AI`: Artificial Intelligence and agent projects
- `Meme`: Meme coins and related projects

### Project Status Fields

- `megaMafia`: Set to `true` for official MegaMafia projects
- `native`: Set to `true` for projects built specifically for MegaETH
- `testnet`: Set to `true` for projects currently on testnet

### Adding Projects

1. Fork the repository
2. Add your project to `src/data/ecosystem.json`
3. Add your project logo to `/public/avatars/[twitter_handle].jpg`
4. Maintain alphabetical order within the projects array
5. Create a pull request with your changes

## 📦 Project Structure

```
fluffle-3d/
├── src/
│   ├── app/             # Next.js app router pages
│   │   ├── api/         # API routes including Discord auth
│   │   ├── tools/       # Main application tools
│   │   └── ecosystem/   # Ecosystem directory pages
│   ├── components/      # React components
│   │   ├── analytics/   # Analytics components
│   │   ├── builder/     # Builder tool components
│   │   ├── ecosystem/   # Ecosystem directory components
│   │   ├── metaverse/   # 3D viewer components
│   │   ├── nft/         # NFT-related components
│   │   ├── pfp/         # PFP generator components
│   │   ├── testnet/     # Testnet integration components
│   │   └── ui/          # Shared UI components
│   ├── data/           # Static data and configurations
│   ├── lib/            # Shared libraries and utilities
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

## 🛠 Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**:
  - [Three.js](https://threejs.org/)
  - [@pixiv/three-vrm](https://github.com/pixiv/three-vrm)
- **Authentication**: Discord OAuth2
- **Database**: Prisma with PostgreSQL
- **State Management**: React Hooks
- **Deployment**: [Vercel](https://vercel.com)

## 🚢 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a Git repository
2. Import your repository on [Vercel](https://vercel.com/new)
3. Set up the required environment variables:
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - `DATABASE_URL`
4. Vercel will automatically detect Next.js and deploy

## 🤝 Contributing

Contributions are welcome! Please check our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is protected under a custom license that allows viewing, using, and contributing to the original repository while restricting redistribution and commercial use. See the [LICENSE](LICENSE) file for details.

Key points:

- ✅ You can contribute to the project
- ✅ You can use it for private, non-distributed purposes
- ❌ You cannot redistribute it as a standalone application
- ❌ You cannot create public derivative works
- ❌ You cannot use it for commercial purposes without permission

## 🔗 Links

- [Website](https://fluffle.tools)
- [Twitter](https://x.com/0x_ultra)
