import { User, Project, Task, ActivityData, UserActivity, Notification, TaskDistributionData, WeeklyProductivityData } from '../types';
import { generateId } from '../lib/utils';
import { CHART_COLORS } from '../config';

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Alice Smith', email: 'alice@example.com', avatar: 'https://ui-avatars.com/api/?name=Alice+Smith&background=0D8ABC&color=fff', role: 'Frontend Engineer' },
  { id: 'user-2', name: 'Bob Johnson', email: 'bob@example.com', avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=1D9E74&color=fff', role: 'Backend Engineer' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=E55353&color=fff', role: 'Product Manager' },
  { id: 'user-4', name: 'Diana Prince', email: 'diana@example.com', avatar: 'https://ui-avatars.com/api/?name=Diana+Prince&background=6F42C1&color=fff', role: 'UX Designer' },
  { id: 'user-5', name: 'Ethan Hunt', email: 'ethan@example.com', avatar: 'https://ui-avatars.com/api/?name=Ethan+Hunt&background=FD7E14&color=fff', role: 'DevOps Engineer' },
  { id: 'user-6', name: 'Fiona Gallagher', email: 'fiona@example.com', avatar: 'https://ui-avatars.com/api/?name=Fiona+Gallagher&background=20C997&color=fff', role: 'QA Engineer' },
];

export const mockProjects: Project[] = Array.from({ length: 8 }, (_, i) => ({
  id: `proj-${i + 1}`,
  name: `Project ${String.fromCharCode(65 + i)}`,
  description: `Detailed description for Project ${String.fromCharCode(65 + i)} covering core objectives.`,
  status: i % 3 === 0 ? 'completed' : i % 4 === 0 ? 'on-hold' : 'active',
  progress: Math.floor(Math.random() * 100),
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  updatedAt: new Date().toISOString(),
  teamMembers: mockUsers.slice(0, Math.floor(Math.random() * 4) + 1),
  tasksCount: Math.floor(Math.random() * 50) + 10,
  completedTasksCount: Math.floor(Math.random() * 10),
}));

const statuses: Task['status'][] = ['backlog', 'in-progress', 'review', 'done'];
const priorities: Task['priority'][] = ['low', 'medium', 'high', 'critical'];

export const mockTasks: Task[] = Array.from({ length: 24 }, (_, i) => {
  const status = statuses[i % 4];
  return {
    id: `task-${i + 1}`,
    title: `Task ${i + 1}: Implement Feature ${i + 1}`,
    description: `Detailed requirements and sub-tasks for task ${i + 1}.`,
    status,
    priority: priorities[i % 4],
    deadline: new Date(Date.now() + (Math.random() * 20 - 5) * 86400000).toISOString(),
    assignees: [mockUsers[i % 6], mockUsers[(i + 1) % 6]].slice(0, Math.floor(Math.random() * 2) + 1),
    progress: status === 'done' ? 100 : status === 'backlog' ? 0 : Math.floor(Math.random() * 80) + 10,
    commentsCount: Math.floor(Math.random() * 5),
    projectId: mockProjects[i % 8].id,
    createdAt: new Date(Date.now() - Math.random() * 5000000000).toISOString(),
    updatedAt: new Date().toISOString(),
    order: Math.floor(i / 4),
  };
});

export const mockActivityData: ActivityData[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (89 - i));
  return {
    date: date.toISOString().split('T')[0],
    tasks: Math.floor(Math.random() * 20) + 5,
    completed: Math.floor(Math.random() * 15),
  };
});

export const mockTaskDistribution: TaskDistributionData[] = [
  { name: 'Backlog', value: 8, color: CHART_COLORS.slate },
  { name: 'In Progress', value: 6, color: CHART_COLORS.primary },
  { name: 'Review', value: 4, color: CHART_COLORS.warning },
  { name: 'Done', value: 6, color: CHART_COLORS.success },
];

export const mockWeeklyProductivity: WeeklyProductivityData[] = Array.from({ length: 12 }, (_, i) => ({
  week: `Week ${i + 1}`,
  completed: Math.floor(Math.random() * 40) + 10,
  created: Math.floor(Math.random() * 45) + 15,
}));

export const mockUserActivities: UserActivity[] = Array.from({ length: 15 }, (_, i) => {
  const user = mockUsers[i % mockUsers.length];
  return {
    userId: user.id,
    userName: user.name,
    tasksCompleted: Math.floor(Math.random() * 100),
    tasksCreated: Math.floor(Math.random() * 120),
    avgCompletionTime: Number((Math.random() * 40 + 4).toFixed(1)),
    lastActive: new Date(Date.now() - Math.random() * 86400000).toISOString(),
  };
});

export const mockNotifications: Notification[] = Array.from({ length: 8 }, (_, i) => {
  const types: Notification['type'][] = ['info', 'warning', 'error', 'success'];
  return {
    id: `notif-${i + 1}`,
    title: `Notification Title ${i + 1}`,
    message: `This is the detailed message for notification ${i + 1}.`,
    type: types[i % 4],
    read: i > 2,
    createdAt: new Date(Date.now() - Math.random() * 172800000).toISOString(),
  };
});
