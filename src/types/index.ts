// User types
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  photo?: string;
  bio?: string;
  totalXP: number;
  currentLevel: number;
  streakCount: number;
  badges: Badge[];
  createdAt: Date;
}

// Gamification types
export interface Badge {
  id: string;
  name: "Gold" | "Silver" | "Bronze" | "Fire";
  icon: string;
  description: string;
  earnedAt: Date;
}

export interface XPData {
  amount: number;
  reason: "lesson" | "unit" | "section" | "challenge" | "weekly-win" | "daily-streak" | "long-streak";
  activityId?: string;
}

export interface StreakData {
  count: number;
  lastActivityDate: Date;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  totalXP: number;
  rank: number;
  badge?: string;
}

// Learning Architecture types
export interface Section {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  units: Unit[];
  isUnlocked: boolean;
  completionPercentage: number;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  sectionId: string;
  order: number;
  lessons: Lesson[];
  isUnlocked: boolean;
  completionPercentage: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  unitId: string;
  order: number;
  videoUrl?: string;
  duration?: number;
  isCompleted: boolean;
  completionPercentage: number;
}

// Assessment types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  sectionId?: string;
  unitId?: string;
  order: number;
  passingScore: number;
  questions: Question[];
}

export interface Question {
  id: string;
  quizId: string;
  question: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options: QuizOption[];
  order: number;
}

export interface QuizOption {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  passed: boolean;
  attemptedAt: Date;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  id: string;
  attemptId: string;
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
}

// Project types
export interface Project {
  id: string;
  userId?: string;
  title: string;
  description: string;
  sectionId: string;
  unitId?: string;
  content: string;
  portfolioUrl?: string;
  submittedAt?: Date;
  createdAt: Date;
}

// Notes types
export interface Note {
  id: string;
  userId: string;
  lessonId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// AI types
export interface ProgressReport {
  id: string;
  userId: string;
  reportType: "weekly" | "monthly";
  strengths: string;
  weaknesses: string;
  recommendations: string;
  generatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Challenge types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon?: string;
  xpReward: number;
  createdAt: Date;
}

// Certificate types
export interface Certificate {
  id: string;
  userId: string;
  title: string;
  sectionTitle: string;
  issuedDate: Date;
  certificateUrl: string;
}
