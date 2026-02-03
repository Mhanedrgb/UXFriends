# UXFriends - Gamified UX/UI Learning Platform

A Duolingo-inspired learning platform for UX/UI design featuring structured learning paths, gamification elements, AI-powered features, and social leaderboards.

## Project Overview

UXFriends is a comprehensive full-stack web application built to help users learn UX/UI design through:

- **Structured Learning Path**: Sections  Units  Lessons with progression logic
- **Gamification**: XP system, badges, streaks, and weekly leaderboards
- **Assessment**: Quizzes, projects, and certificates
- **Personal Notes**: CRUD operations on lesson notes
- **Daily Challenges**: Static and dynamic challenges with XP rewards
- **AI Agent**: Personalized progress reports, recommendations, and dynamic quizzes
- **Social Features**: Leaderboards with sharing capabilities

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks + Next.js context

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Language**: TypeScript
- **Authentication**: NextAuth.js

### Database
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Provider**: Supabase or Railway

### AI/External Services
- **AI Provider**: OpenAI API

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 12+ or Supabase account
- OpenAI API key

### 1. Install Dependencies
\\\ash
npm install
\\\

### 2. Setup Environment Variables

Create \.env.local\:
\\\
DATABASE_URL="postgresql://user:password@localhost:5432/uxfriends"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-char-secret-key"
OPENAI_API_KEY="sk-..."
\\\

### 3. Setup Database

\\\ash
# Generate Prisma client
npx prisma generate

# Create tables
npx prisma migrate dev --name init
\\\

### 4. Run Development Server

\\\ash
npm run dev
\\\

Visit http://localhost:3000

## Key Features

### Learning Architecture
- Sections > Units > Lessons with progression logic
- Unlock system: complete all lessons to unlock next unit
- Completion percentages at each level

### Gamification
- **XP System**: 10 XP (lesson), 50 XP (unit), 100 XP (section), 30 XP (challenge), 70 XP (weekly win), 5 XP (daily streak), 15 XP (long streak)
- **Badges**: Bronze (100+ XP), Silver (500+ XP), Gold (1000+ XP), Fire  (7+ day streak)
- **Streaks**: Daily engagement tracking
- **Leaderboards**: Weekly rankings by XP

### Assessment
- Quizzes with configurable passing score (default 70%)
- Projects with submission tracking
- Auto-generated certificates on completion

### Notes
CRUD operations for personal lesson notes

### AI Features
- Personalized progress reports (weekly/monthly)
- Strength/weakness analysis
- Study recommendations
- Dynamic quiz generation

### Daily Challenges
Static challenges displayed daily to encourage engagement

## Project Structure

\\\
src/
 app/
    api/
       auth/          # Authentication
       learning/      # Learning APIs
       gamification/  # Gamification
       assessment/    # Quizzes/projects
       notes/         # Notes CRUD
       challenges/    # Challenges
       profile/       # Profile
       ai/            # AI endpoints
    dashboard/         # Dashboard page
    learn/             # Learning page
    profile/           # Profile pages
    challenges/        # Challenges page
    leaderboard/       # Leaderboard
    auth/              # Auth pages
 components/            # React components
 lib/                   # Utilities
    auth.ts           # NextAuth config
    prisma.ts         # Prisma client
    ai.ts             # OpenAI integration
 utils/                # Helper functions
    gamification.ts   # XP, badges, streaks
    learning.ts       # Progression logic
 types/                # TypeScript types
 constants/            # App constants

prisma/
 schema.prisma         # Database schema
\\\

## API Endpoints

### Authentication
- \POST /api/auth/signup\ - Register
- \POST /api/auth/signin\ - Login
- \POST /api/auth/signout\ - Logout

### Learning
- \GET /api/learning/sections\ - All sections
- \GET /api/learning/lessons/[lessonId]\ - Lesson details
- \POST /api/learning/lessons/[lessonId]\ - Complete lesson

### Gamification
- \GET /api/gamification/stats\ - User stats
- \GET /api/gamification/leaderboard\ - Rankings

### Assessment
- \POST /api/assessment/submit-quiz\ - Submit quiz

### Notes
- \GET /api/notes?lessonId=...\ - List notes
- \POST /api/notes\ - Create
- \PATCH /api/notes/[noteId]\ - Update
- \DELETE /api/notes/[noteId]\ - Delete

### Challenges
- \GET /api/challenges\ - Today's challenges

### Profile
- \GET /api/profile/[userId]\ - Profile
- \PATCH /api/profile/[userId]\ - Update profile

### AI
- \POST /api/ai/progress-report\ - Generate report
- \GET /api/ai/recommendations\ - Get recommendations

## Deployment

### Vercel (Frontend + Backend)
\\\ash
npm install -g vercel
vercel
\\\

### Railway/Render (Backend Only)
1. Push to GitHub
2. Connect repository
3. Set environment variables
4. Deploy

## Development Commands

\\\ash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Linting
npm run lint

# Type checking
npm run type-check
\\\

## Database Schema

Key models:
- **User**: Authentication and profile
- **Section, Unit, Lesson**: Learning hierarchy
- **LessonCompletion**: Completion tracking
- **Quiz, Question, QuizOption, QuizAttempt**: Assessments
- **Note**: User notes
- **Project**: Projects
- **XPHistory**: XP tracking
- **Badge**: Badges
- **Streak**: Streaks
- **LeaderboardEntry**: Rankings
- **ProgressReport**: AI reports

## Next Steps

1. Create seed data (sections, units, lessons)
2. Build frontend pages and components
3. Add Framer Motion animations
4. Implement payment/premium features
5. Setup email notifications
6. Deploy to production

---

**Built with  for UX/UI designers**
