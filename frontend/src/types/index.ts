// ==================== API ====================
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

// ==================== User / Auth ====================
export type UserRole = 'student' | 'professional' | 'admin';
export type EducationLevel = 'TENTH' | 'INTERMEDIATE' | 'BTECH';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  educationLevel: EducationLevel;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
  educationLevel?: EducationLevel;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: UserRole;
  educationLevel?: EducationLevel;
}

// ==================== Assessment ====================
export interface AssessmentOption {
  id: string;
  text?: string;
  label?: string;
  value: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  category: string;
  options: AssessmentOption[];
}

export interface AssessmentAnswer {
  questionId: string;
  optionId: string;
  value?: number;
}

export interface AssessmentSubmitPayload {
  answers: AssessmentAnswer[];
}

export interface AssessmentCategoryScore {
  category: string;
  score: number;
}

export interface AssessmentResult {
  id: string;
  educationLevel?: EducationLevel;
  scores: AssessmentCategoryScore[];
  topCategories: string[];
  primaryRecommendation?: string;
  explanation?: string;
  alternativeOptions?: string[];
  recommendedCareers: Career[];
  completedAt: string;
}

// ==================== Career ====================
export type CareerType =
  | 'INTERMEDIATE_STREAM'
  | 'POST_10TH_COURSE'
  | 'DEGREE_COURSE'
  | 'PROFESSIONAL_COURSE'
  | 'COMPETITIVE_PATHWAY'
  | 'JOB_ROLE';

export interface Career {
  id: string;
  title: string;
  category: string;
  branch?: string;
  educationLevel?: EducationLevel;
  careerType?: CareerType;
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  skills?: string[];
  roadmap?: string[];
  demand?: string;
  imageUrl?: string;
}

export interface CareerFilters {
  search?: string;
  category?: string;
  branch?: string;
  educationLevel?: EducationLevel;
  careerType?: CareerType;
  salary?: string;
  maxSalary?: number;
}

// ==================== Roadmap ====================
export type PhaseStatus = 'COMPLETED' | 'CURRENT' | 'LOCKED';

export interface RoadmapTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface RoadmapPhase {
  id: string;
  order: number;
  stage: string;
  title: string;
  description: string;
  status: PhaseStatus;
  tasks: RoadmapTask[];
}

export interface RoadmapStepData {
  id: string;
  phase?: string;
  stage?: string;
  title: string;
  description: string;
  skills?: string[];
  tasks?: string[];
  order?: number;
  status?: 'completed' | 'in-progress' | 'upcoming';
}

export interface Roadmap {
  careerId: string;
  careerTitle: string;
  educationLevel: EducationLevel;
  phases: RoadmapPhase[];
  activePhases?: RoadmapPhase[];
  completedPhases?: RoadmapPhase[];
  steps: RoadmapStepData[];
  progress: number;
  completedPhasesCount: number;
  totalPhasesCount: number;
  currentPhase: RoadmapPhase | null;
  nextAction: string;
  isCompleted: boolean;
  completedStepIds?: string[];
}

export interface DashboardRoadmapInfo {
  activeCareer: {
    id: string;
    title: string;
    educationLevel: EducationLevel;
  } | null;
  roadmapProgress: number;
  completedPhasesCount: number;
  totalPhasesCount: number;
  currentPhase: {
    id: string;
    order: number;
    title: string;
    stage: string;
    description: string;
  } | null;
  nextAction: string;
  isCompleted: boolean;
}

// ==================== Dashboard ====================
export interface DashboardStats {
  assessmentsTaken: number;
  savedCareers: number;
  savedCareersCount?: number;
  roadmapProgress: number;
  chatSessions: number;
}

export interface DashboardData {
  user: User;
  stats: DashboardStats;
  roadmap?: DashboardRoadmapInfo | null;
  recommendedCareers: Career[];
  savedCareers: Career[];
  recentActivity: ActivityItem[];
  progressOverTime?: { label: string; value: number }[];
  latestAssessment?: {
    completedAt: string;
    topCategories: string[];
    primaryRecommendation?: string;
    explanation?: string;
    scores?: Record<string, number> | AssessmentCategoryScore[];
  } | null;
}

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

// ==================== Chat ====================
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'ai';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
}
export type ChatRequestPayload = ChatRequest;

export interface ChatResponse {
  success: boolean;
  reply: string;
}
export type ChatResponsePayload = ChatResponse;

// ==================== Comparison ====================
export interface CareerComparisonResult {
  careerA: Career;
  careerB: Career;
}
