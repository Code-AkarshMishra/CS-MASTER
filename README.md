# 🎓 4-Year Computer Science Engineering (CSE) Platform

A complete, production-ready, responsive, full-stack learning and resource ecosystem for **4-Year B.Tech Computer Science & Engineering (CSE)** students and faculty.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS + Prisma ORM + PostgreSQL/SQLite + NextAuth (Google OAuth + Secure Credentials)**.

---

## 🚀 Key Features

### 1. 🛡️ Authentication & Security
- **Google OAuth 2.0 / OpenID Sign-In**: Server-side token verification and automatic account linking.
- **Secure Email & Password Authentication**: Cryptographically hashed passwords with **bcrypt (12 salt rounds)**.
- **Disposable Email Firewall**: Server-side & client-side denylist blocking temporary and burner email domains (`tempmail`, `10minutemail`, `mailinator`, `guerrillamail`, etc.).
- **Rate Limiting**: Sliding-window rate limiter on registration, login, and admin actions.
- **Role-Based Access Control (RBAC)**: Strict separation between `STUDENT` and `ADMIN` / faculty roles.
- **Password Reset Flow & Verification Tokens**: Secure password change validation with current password verification.

### 2. 🏛️ Academic Structure (Extracted from 10-Page Official Syllabus PDF)
- **4 Academic Years & 8 Semesters** with exact credit structures:
  - **1st Year** (40.0 Credits: Sem 1 [19.5 C] + Sem 2 [20.5 C]) - Physics, Chemistry, Math I/II, Problem Solving in C, Workshop, Graphics.
  - **2nd Year** (45.0 Credits: Sem 3 [24.0 C] + Sem 4 [21.0 C]) - DSA, OS, COA, Discrete Math, Python, FLT, Specializations (ML, Big Data, IoT, SE).
  - **3rd Year** (44.0 Credits: Sem 5 [23.0 C] + Sem 6 [21.0 C]) - DBMS, DAA, Compiler Design, Computer Networks, OOP, Electives I-III, Open Electives I.
  - **4th Year** (32.0 Credits: Sem 7 [17.0 C] + Sem 8 [15.0 C]) - Distributed Systems, Data Mining, Blockchain, Cloud, Embedded Systems, Capstone Projects I-III.
- **Teaching Scheme & Evaluation Marks**: Exact $L-T-P$ breakdown and $CIE / ESE$ evaluation marks.

### 3. 📖 GFG-Style Technical Concept Reading System
- **Interactive Multi-Language Code Blocks**: C++, C, Python, Java with one-click code copy and live execution terminal simulation.
- **Architectural & Data Flow ASCII Diagrams**: In-depth structural diagrams for memory pointers, process synchronization, graph algorithms, and trees.
- **Time & Space Complexity Matrices**: Complete $O(1)$, $O(\log N)$, $O(N)$ Big-O complexity tables.
- **Examiner Pitfalls & Common Mistakes**: Highlighted warning boxes for viva and end-term exam traps.
- **Interactive Self-Check Practice Quizzes**: Multiple-choice questions with instant answer validation and explanations.
- **Celebratory Confetti**: Instant milestone celebrations when students mark tutorials as completed.

### 4. 📚 Digital Library & Previous Year Questions (PYQ Bank)
- **Handwritten Faculty Notes & Lab Manuals**: In-app PDF reader modal with fullscreen toggle and direct download.
- **Curated Video Lectures**: Embedded responsive YouTube / NPTEL video playlists.
- **University Examination PYQs (2021–2025)**: Mid-Sem and End-Sem past papers with solution keys and "Frequently Repeated" high-yield exam tags.

### 5. 🔍 Global Search (`Ctrl + K` / `Cmd + K`)
- Instant multi-entity search across Subjects, Units, Reading Articles, Notes, and PYQs with keyboard-accessible navigation.

### 6. 🛠️ Administrator & Faculty Studio (`/admin`)
- Real-time platform analytics: total users, courses, articles, and audit logs.
- GFG Technical Article Authoring Studio: Markdown concept editor, C++ code blocks, and practice quiz generator.
- Resource Uploader: Map PDF notes, YouTube lectures, and PYQs to any semester course.
- Student Management: View enrolled undergraduates and toggle roles.

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
- **Node.js**: v18+ (tested on v25.0.0)
- **npm**: v9+ (tested on 11.11.0)

### 2. Clone & Install Dependencies
```bash
git clone <repo-url>
cd shivamyadav
npm install
```

### 3. Setup Environment Variables
Create `.env` (or copy `.env.example`):
```env
# Database Configuration (SQLite for local zero-config, PostgreSQL for production)
DATABASE_URL="file:./dev.db"

# NextAuth Secrets
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="4e89f81ca973b184209fae4860d8a57173b22cf03b1d75c5896"

# Google OAuth Credentials (optional for Google Sign-In)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Initialize Database & Seed Official Curriculum
```bash
# Push schema to SQLite/PostgreSQL
npx prisma db push

# Seed 66 subjects, academic years, semesters, GFG articles, notes, and PYQs
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Pre-Configured Test Accounts (1-Click Login)

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Student** | `student@cse.ac.in` | `Engineering@2026` | 2nd Year ML Track, Dashboard, Notes, PYQs, GFG Articles, Bookmarks |
| **Faculty / Admin** | `admin@cse.ac.in` | `Engineering@2026` | HOD Administrator, Full Admin Studio, Article Creator, Resource Uploader |

*(You can also use the 1-click test buttons directly on the Login page!)*

---

## 📂 Project Directory Structure

```
├── prisma/
│   ├── schema.prisma       # Relational models (User, Subject, Unit, Article, Resource, PYQ, Bookmark, Progress)
│   └── seed.ts             # Complete 4-year curriculum seed script from PDF
├── src/
│   ├── app/
│   │   ├── api/            # REST API endpoints (auth, subjects, articles, resources, pyqs, bookmarks, search, admin)
│   │   ├── admin/          # Admin Studio (Analytics, Article Creator, Resource Uploader, Users)
│   │   ├── bookmarks/      # Saved Resources Repository
│   │   ├── dashboard/      # Student Dashboard with 8-Semester Switcher
│   │   ├── learn/          # GFG-Style Technical Reading Hub & [slug] interactive reader
│   │   ├── login/          # Login Page with Google OAuth & Credentials
│   │   ├── profile/        # Student Profile & Settings
│   │   ├── pyqs/           # Previous Year Questions Bank
│   │   ├── register/       # Registration with Disposable Email Firewall
│   │   ├── resources/      # Handwritten Notes & Video Lectures Hub
│   │   ├── subjects/       # Subjects Directory & [code] detailed course pages
│   │   ├── years/          # Year-wise [yearId] roadmaps (Year 1 to 4)
│   │   ├── globals.css     # Theme tokens, custom scrollbars & glassmorphism
│   │   ├── layout.tsx      # Root layout with search modal & navigation
│   │   └── page.tsx        # Modern Landing Page
│   ├── components/
│   │   ├── academic/       # SubjectCard, YearTimeline
│   │   ├── gfg/            # ArticleReader, CodeBlock with copy/simulation & quiz
│   │   ├── layout/         # Navbar, Footer, Mobile Drawer
│   │   ├── providers/      # NextAuth SessionProvider
│   │   ├── resources/      # PdfViewerModal
│   │   └── search/         # GlobalSearchModal (Ctrl+K)
│   └── lib/
│       ├── auth.ts         # NextAuth configuration
│       ├── disposableEmailBlocker.ts # 150+ burner domain firewall
│       ├── prisma.ts       # Prisma Client singleton
│       ├── rateLimit.ts    # Sliding window rate limiter
│       └── validations.ts  # Zod validation schemas
├── .env.example
├── package.json
└── README.md
```

---

## 🔒 Production Deployment Guidelines (Vercel & PostgreSQL)

1. **Deploy to Vercel**: Connect your repository to Vercel.
2. **Setup PostgreSQL**: Provision a managed PostgreSQL instance (e.g. Supabase, Neon, AWS RDS).
3. **Set `DATABASE_URL`** in Vercel environment variables:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
   ```
4. **Update `prisma/schema.prisma` datasource provider** to `postgresql` if deploying to PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. **Set `NEXTAUTH_SECRET` & `NEXTAUTH_URL`** to your production domain.
6. Run `npx prisma db push && npm run seed` on the production database.
