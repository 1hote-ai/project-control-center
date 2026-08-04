import { Column, Task } from '../types';

export const API_DELAY_MIN = 500;
export const API_DELAY_MAX = 1500;
export const API_ERROR_RATE = 0.2;

export const COLUMNS: Omit<Column, 'tasks'>[] = [
  { id: 'col-backlog', title: 'Backlog', status: 'backlog' },
  { id: 'col-in-progress', title: 'In Progress', status: 'in-progress' },
  { id: 'col-review', title: 'Review', status: 'review' },
  { id: 'col-done', title: 'Done', status: 'done' },
];

export const PRIORITIES: Task['priority'][] = ['low', 'medium', 'high', 'critical'];

export const NAV_ITEMS = [
  { icon: 'LayoutDashboard', label: 'Dashboard', path: '/dashboard' },
  { icon: 'Kanban', label: 'Kanban Board', path: '/board' },
  { icon: 'BarChart2', label: 'Analytics', path: '/analytics' },
  { icon: 'Settings', label: 'Settings', path: '/settings' },
];

export const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
  info: '#0ea5e9',
  slate: '#64748b',
};

export const PAGE_SIZES = [10, 25, 50];
