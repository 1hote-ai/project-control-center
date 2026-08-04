export type ThemeMode = 'dark' | 'light';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  createdAt: string;
  updatedAt: string;
  teamMembers: User[];
  tasksCount: number;
  completedTasksCount: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline: string;
  assignees: User[];
  progress: number;
  commentsCount: number;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

export interface ActivityData {
  date: string;
  tasks: number;
  completed: number;
}

export interface TaskDistributionData {
  name: string;
  value: number;
  color: string;
}

export interface WeeklyProductivityData {
  week: string;
  completed: number;
  created: number;
}

export interface AnalyticsData {
  taskDistribution: TaskDistributionData[];
  weeklyProductivity: WeeklyProductivityData[];
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface Column {
  id: string;
  title: string;
  status: Task['status'];
  tasks: Task[];
}

export interface FilterState {
  userId: string | null;
  dateRange: [string, string] | null;
  priority: Task['priority'] | null;
  status: Task['status'] | null;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

export interface UserActivity {
  userId: string;
  userName: string;
  tasksCompleted: number;
  tasksCreated: number;
  avgCompletionTime: number; // in hours
  lastActive: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  role: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  dailyDigest: boolean;
}

export interface SecurityFormData {
  currentPassword?: string;
  newPassword?: string;
  twoFactorEnabled: boolean;
}
