#!/bin/bash
BASE_DIR="/Users/egor/Desktop/1 тз/project-control-center"

mkdir -p "$BASE_DIR/src/features/theme-toggle/ui" \
         "$BASE_DIR/src/features/search/ui" \
         "$BASE_DIR/src/features/notifications/ui" \
         "$BASE_DIR/src/features/kanban/ui" \
         "$BASE_DIR/src/widgets/header/ui" \
         "$BASE_DIR/src/widgets/sidebar/ui" \
         "$BASE_DIR/src/widgets/stat-cards/ui" \
         "$BASE_DIR/src/widgets/activity-chart/ui" \
         "$BASE_DIR/src/widgets/kanban-board/ui" \
         "$BASE_DIR/src/widgets/analytics-dashboard/ui" \
         "$BASE_DIR/src/widgets/settings-panel/ui"

cat << 'EOF' > "$BASE_DIR/src/features/theme-toggle/index.ts"
export * from './ui/theme-toggle';
EOF

cat << 'EOF' > "$BASE_DIR/src/features/theme-toggle/ui/theme-toggle.tsx"
'use client';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from '@/entities/user/model/store';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </button>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/features/search/index.ts"
export * from './ui/search-bar';
EOF

cat << 'EOF' > "$BASE_DIR/src/features/search/ui/search-bar.tsx"
'use client';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md hidden md:block">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects, tasks..."
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all"
      />
    </div>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/features/notifications/index.ts"
export * from './ui/notification-bell';
EOF

cat << 'EOF' > "$BASE_DIR/src/features/notifications/ui/notification-bell.tsx"
'use client';
import { Bell, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'info', title: 'New Task', message: 'You have a new task assigned.', time: '5m ago', read: false },
  { id: '2', type: 'alert', title: 'Task Overdue', message: 'Project Alpha deadline passed.', time: '1h ago', read: false },
];

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const getIcon = (type: string) => {
    if (type === 'alert') return <AlertTriangle className="text-[#ef4444] w-4 h-4" />;
    if (type === 'success') return <CheckCircle2 className="text-[#22c55e] w-4 h-4" />;
    return <Info className="text-[#3b82f6] w-4 h-4" />;
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc]">
        <Bell size={20} />
        {unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ef4444] rounded-full border-2 border-white dark:border-[#1e293b]" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1e293b] rounded-xl shadow-lg border border-gray-200 dark:border-[#334155] overflow-hidden z-50">
            <div className="p-4 border-b border-gray-200 dark:border-[#334155]"><h3 className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">Notifications</h3></div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map(n => (
                <div key={n.id} onClick={() => markAsRead(n.id)} className={`p-4 border-b border-gray-200 dark:border-[#334155] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#334155]/50 transition-colors ${!n.read ? 'bg-[#3b82f6]/5 dark:bg-[#3b82f6]/10' : ''}`}>
                  <div className="flex gap-3">
                    <div className="mt-1">{getIcon(n.type)}</div>
                    <div>
                      <p className="text-sm font-medium text-[#0f172a] dark:text-[#f8fafc]">{n.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.message}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/features/kanban/index.ts"
export * from './ui/task-modal';
EOF

cat << 'EOF' > "$BASE_DIR/src/features/kanban/ui/task-modal.tsx"
'use client';
import { useState } from 'react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '@/shared/ui';
import { useTaskStore } from '@/entities/task/model/store';
import { useUpdateTaskMutation } from '@/entities/task/model/queries';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.string(),
  priority: z.string(),
});

export const TaskModal = () => {
  const { isModalOpen, selectedTask, closeModal } = useTaskStore();
  const { mutate: updateTask } = useUpdateTaskMutation();
  const [formData, setFormData] = useState({ 
    title: selectedTask?.title || '', 
    description: selectedTask?.description || '', 
    status: selectedTask?.status || 'todo',
    priority: selectedTask?.priority || 'medium'
  });
  const [errors, setErrors] = useState<any>({});

  if (!isModalOpen) return null;

  const handleSave = () => {
    try {
      taskSchema.parse(formData);
      if (selectedTask) updateTask({ id: selectedTask.id, ...formData });
      closeModal();
    } catch (e: any) {
      setErrors(e.errors.reduce((acc: any, curr: any) => ({ ...acc, [curr.path[0]]: curr.message }), {}));
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-[#334155] w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-[#0f172a] dark:text-[#f8fafc]">Edit Task</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Title</label>
            <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-[#334155] p-2 rounded-lg text-[#0f172a] dark:text-[#f8fafc]" />
            {errors.title && <span className="text-xs text-[#ef4444]">{errors.title}</span>}
          </div>
          <div>
            <label className="text-sm text-gray-500">Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-[#334155] p-2 rounded-lg text-[#0f172a] dark:text-[#f8fafc]" rows={4} />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={handleSave} className="flex-1 bg-[#3b82f6] hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">Save</button>
            <button onClick={closeModal} className="flex-1 bg-gray-200 dark:bg-[#334155] hover:bg-gray-300 dark:hover:bg-gray-700 text-[#0f172a] dark:text-[#f8fafc] py-2 rounded-lg transition-colors">Cancel</button>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/header/index.ts"
export * from './ui/header';
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/header/ui/header.tsx"
'use client';
import { SearchBar } from '@/features/search';
import { NotificationBell } from '@/features/notifications';
import { ThemeToggle } from '@/features/theme-toggle';
import { Menu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl border-b border-gray-200 dark:border-[#334155] flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-[#0f172a] dark:text-[#f8fafc]">
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">PCC</h1>
      </div>
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <SearchBar />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <NotificationBell />
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] overflow-hidden border-2 border-white dark:border-[#1e293b]">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/sidebar/index.ts"
export * from './ui/sidebar';
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/sidebar/ui/sidebar.tsx"
'use client';
import { LayoutDashboard, KanbanSquare, BarChart3, Settings, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Kanban', icon: KanbanSquare, href: '/kanban' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside initial={false} animate={{ width: isCollapsed ? 64 : 240 }} className="hidden lg:flex flex-col h-screen sticky top-0 bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-[#334155] overflow-hidden">
      <div className="p-4 flex justify-between items-center h-16 border-b border-gray-200 dark:border-[#334155]">
        {!isCollapsed && <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">Navigation</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-[#334155]/50 text-gray-500">
          <Menu size={20} />
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 rounded-lg py-3 px-4 transition-colors ${isActive ? 'bg-[#3b82f6]/10 text-[#3b82f6] border-l-2 border-[#3b82f6]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#334155]/50 hover:text-[#0f172a] dark:hover:text-[#f8fafc]'}`}>
                <item.icon size={20} className="shrink-0" />
                {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] shrink-0" />
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] truncate">Egor Admin</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Frontend Architect</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/stat-cards/index.ts"
export * from './ui/stat-cards';
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/stat-cards/ui/stat-cards.tsx"
'use client';
import { FolderKanban, ListTodo, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const MOCK_DATA = [
  { title: 'Total Projects', value: '12', change: '+2.5%', isPositive: true, icon: FolderKanban, data: [{ v: 5 }, { v: 7 }, { v: 8 }, { v: 10 }, { v: 12 }] },
  { title: 'Active Tasks', value: '48', change: '+12%', isPositive: true, icon: ListTodo, data: [{ v: 20 }, { v: 30 }, { v: 35 }, { v: 40 }, { v: 48 }] },
  { title: 'Overdue Tasks', value: '3', change: '-1%', isPositive: true, icon: AlertTriangle, data: [{ v: 5 }, { v: 4 }, { v: 4 }, { v: 3 }, { v: 3 }] },
  { title: 'Completed', value: '124', change: '+18%', isPositive: true, icon: CheckCircle2, data: [{ v: 80 }, { v: 90 }, { v: 100 }, { v: 110 }, { v: 124 }] },
];

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {MOCK_DATA.map((card, i) => (
        <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.3 }} className="h-[140px] rounded-2xl p-6 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] hover:border-[#3b82f6]/50 hover:shadow-lg hover:shadow-[#3b82f6]/5 transition-all duration-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
              <p className={`text-3xl font-bold mt-1 ${card.title === 'Overdue Tasks' ? 'text-[#ef4444]' : card.title === 'Completed' ? 'text-[#22c55e]' : 'text-[#0f172a] dark:text-[#f8fafc]'}`}>{card.value}</p>
            </div>
            <div className="p-2 rounded-lg bg-[#f8fafc] dark:bg-[#0f172a]/50 text-[#3b82f6]">
              <card.icon size={24} />
            </div>
          </div>
          <div className="flex items-end justify-between h-8">
            <div className={`flex items-center gap-1 text-sm ${card.isPositive ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
              {card.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{card.change}</span>
            </div>
            <div className="w-16 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={card.data}>
                  <Area type="monotone" dataKey="v" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/activity-chart/index.ts"
export * from './ui/activity-chart';
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/activity-chart/ui/activity-chart.tsx"
'use client';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_DATA = [
  { name: 'Mon', tasks: 40, completed: 24 },
  { name: 'Tue', tasks: 30, completed: 13 },
  { name: 'Wed', tasks: 20, completed: 38 },
  { name: 'Thu', tasks: 27, completed: 39 },
  { name: 'Fri', tasks: 18, completed: 48 },
  { name: 'Sat', tasks: 23, completed: 38 },
  { name: 'Sun', tasks: 34, completed: 43 },
];

export const ActivityChart = () => {
  const [period, setPeriod] = useState('7D');
  const isLoading = false; // Mocking useActivityDataQuery

  return (
    <div className="w-full bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-[#334155]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#0f172a] dark:text-[#f8fafc]">Activity Overview</h2>
        <div className="flex bg-gray-100 dark:bg-[#0f172a] rounded-full p-1">
          {['7D', '30D', '90D'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${period === p ? 'bg-white dark:bg-[#1e293b] text-[#3b82f6] shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-[#0f172a] dark:hover:text-[#f8fafc]'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="w-full h-full flex flex-col gap-4 animate-pulse">
            <div className="w-full h-1/3 bg-gray-100 dark:bg-[#334155]/50 rounded" />
            <div className="w-full h-1/3 bg-gray-100 dark:bg-[#334155]/50 rounded" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }} itemStyle={{ color: '#f8fafc' }} />
              <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/kanban-board/index.ts"
export * from './ui/kanban-board';
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/kanban-board/ui/kanban-board.tsx"
'use client';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { KanbanColumn } from './kanban-column';
import { TaskCard } from '@/entities/task';
import { useTaskStore } from '@/entities/task/model/store';
import { useMoveTaskMutation } from '@/entities/task/model/queries';

export const KanbanBoard = () => {
  const { tasks, columns, optimisticMove } = useTaskStore();
  const { mutate: moveTask } = useMoveTaskMutation();
  const [activeTask, setActiveTask] = useState<any>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t: any) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {};

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    const overColumnId = columns.find((c: any) => c.id === overId)?.id || tasks.find((t: any) => t.id === overId)?.columnId;

    if (overColumnId) {
      optimisticMove(activeId, overColumnId);
      moveTask({ taskId: activeId, columnId: overColumnId });
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4 w-full h-full min-h-[600px]">
        {columns.map((col: any) => (
          <KanbanColumn key={col.id} column={col} tasks={tasks.filter((t: any) => t.columnId === col.id)} />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? <div className="opacity-80 rotate-2 cursor-grabbing"><TaskCard task={activeTask} /></div> : null}
      </DragOverlay>
    </DndContext>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/kanban-board/ui/kanban-column.tsx"
'use client';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTaskCard } from './sortable-task-card';
import { Plus } from 'lucide-react';

export const KanbanColumn = ({ column, tasks }: { column: any, tasks: any[] }) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="flex-1 min-w-[300px] flex flex-col bg-[#0f172a]/50 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">{column.title}</h3>
        <span className="bg-white dark:bg-[#1e293b] text-xs font-medium px-2 py-1 rounded-full text-[#0f172a] dark:text-[#f8fafc] border border-gray-200 dark:border-[#334155]">
          {tasks.length}
        </span>
      </div>
      <div ref={setNodeRef} className="flex-1 flex flex-col gap-3 min-h-[500px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => <SortableTaskCard key={task.id} task={task} />)}
        </SortableContext>
        <button className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-[#334155] text-gray-500 dark:text-gray-400 hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors">
          <Plus size={16} /> Add Task
        </button>
      </div>
    </div>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/kanban-board/ui/sortable-task-card.tsx"
'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from '@/entities/task';

export const SortableTaskCard = ({ task }: { task: any }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/analytics-dashboard/index.ts"
export * from './ui/task-distribution-chart';
export * from './ui/productivity-chart';
export * from './ui/user-activity-table';
export * from './ui/analytics-filters';
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/analytics-dashboard/ui/task-distribution-chart.tsx"
'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const MOCK_DATA = [
  { name: 'To Do', value: 400, color: '#94a3b8' },
  { name: 'In Progress', value: 300, color: '#3b82f6' },
  { name: 'Done', value: 300, color: '#22c55e' },
];

export const TaskDistributionChart = () => (
  <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-[#334155] h-[400px] flex flex-col">
    <h3 className="font-semibold text-lg text-[#0f172a] dark:text-[#f8fafc] mb-4">Task Distribution</h3>
    <div className="flex-1 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={MOCK_DATA} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
            {MOCK_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-8">
        <div className="text-center">
          <p className="text-3xl font-bold text-[#0f172a] dark:text-[#f8fafc]">1000</p>
          <p className="text-sm text-gray-500">Total Tasks</p>
        </div>
      </div>
    </div>
  </div>
);
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/analytics-dashboard/ui/productivity-chart.tsx"
'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_DATA = [
  { name: 'Week 1', created: 40, completed: 24 },
  { name: 'Week 2', created: 30, completed: 35 },
  { name: 'Week 3', created: 20, completed: 20 },
  { name: 'Week 4', created: 27, completed: 39 },
];

export const ProductivityChart = () => (
  <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-[#334155] h-[400px] flex flex-col">
    <h3 className="font-semibold text-lg text-[#0f172a] dark:text-[#f8fafc] mb-4">Weekly Productivity</h3>
    <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={MOCK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: 'rgba(51, 65, 85, 0.2)' }} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }} />
          <Bar dataKey="created" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/analytics-dashboard/ui/user-activity-table.tsx"
'use client';
import { useState } from 'react';
import { Search, Download } from 'lucide-react';

const MOCK_DATA = [
  { id: 1, name: 'Alice Smith', completed: 45, created: 12, avgTime: '2.5 days', lastActive: '2 mins ago' },
  { id: 2, name: 'Bob Jones', completed: 32, created: 28, avgTime: '3.1 days', lastActive: '1 hr ago' },
];

export const UserActivityTable = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(MOCK_DATA));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "user-activity.json");
    dlAnchorElem.click();
  };

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-200 dark:border-[#334155] overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-[#334155] flex justify-between items-center">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input placeholder="Search users..." className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-[#334155] text-sm text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none" />
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6]/10 text-[#3b82f6] rounded-lg text-sm font-medium hover:bg-[#3b82f6]/20 transition-colors">
          <Download size={16} /> Export JSON
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#0f172a]/50 text-gray-500 dark:text-gray-400 text-sm">
              <th className="p-4 w-12"><input type="checkbox" className="rounded" /></th>
              <th className="p-4 font-medium">User Name</th>
              <th className="p-4 font-medium">Tasks Completed</th>
              <th className="p-4 font-medium">Tasks Created</th>
              <th className="p-4 font-medium">Avg Time</th>
              <th className="p-4 font-medium">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#334155]">
            {MOCK_DATA.map(user => (
              <tr key={user.id} className="text-sm text-[#0f172a] dark:text-[#f8fafc] hover:bg-gray-50 dark:hover:bg-[#334155]/20 transition-colors">
                <td className="p-4"><input type="checkbox" className="rounded" checked={selected.includes(user.id)} onChange={(e) => {
                  setSelected(prev => e.target.checked ? [...prev, user.id] : prev.filter(id => id !== user.id))
                }} /></td>
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.completed}</td>
                <td className="p-4">{user.created}</td>
                <td className="p-4">{user.avgTime}</td>
                <td className="p-4 text-gray-500">{user.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/analytics-dashboard/ui/analytics-filters.tsx"
'use client';
export const AnalyticsFilters = () => (
  <div className="flex flex-wrap gap-4 mb-6">
    <select className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]">
      <option>All Users</option>
      <option>Alice</option>
      <option>Bob</option>
    </select>
    <div className="flex items-center gap-2">
      <input type="date" className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] rounded-lg px-4 py-2 text-sm outline-none" />
      <span className="text-gray-500">-</span>
      <input type="date" className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] rounded-lg px-4 py-2 text-sm outline-none" />
    </div>
    <select className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] text-[#0f172a] dark:text-[#f8fafc] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]">
      <option>All Priorities</option>
      <option>High</option>
      <option>Medium</option>
    </select>
    <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-[#0f172a] dark:hover:text-[#f8fafc] transition-colors ml-auto">
      Reset Filters
    </button>
  </div>
);
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/settings-panel/index.ts"
export * from './ui/profile-section';
export * from './ui/notifications-section';
export * from './ui/security-section';
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/settings-panel/ui/profile-section.tsx"
'use client';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone format').optional().or(z.literal('')),
  bio: z.string().max(500).optional(),
});

export const ProfileSection = () => {
  const [formData, setFormData] = useState({ name: 'Egor Admin', email: 'egor@example.com', phone: '', bio: '' });
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    try {
      schema.parse(formData);
      setErrors({});
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) {
      setErrors(e.errors.reduce((acc: any, curr: any) => ({ ...acc, [curr.path[0]]: curr.message }), {}));
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-[#0f172a] dark:text-[#f8fafc]">Profile Information</h2>
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-[#0f172a] border-2 border-dashed border-gray-300 dark:border-[#334155] flex items-center justify-center cursor-pointer hover:border-[#3b82f6] transition-colors">
          <span className="text-xs text-gray-500">Avatar</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none" />
          {errors.name && <p className="text-[#ef4444] text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none" />
          {errors.email && <p className="text-[#ef4444] text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
          <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none" />
          {errors.phone && <p className="text-[#ef4444] text-xs mt-1">{errors.phone}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
          <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={handleSave} className="px-6 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg font-medium transition-colors">Save Changes</button>
        {success && <p className="text-[#22c55e] text-sm">Saved successfully!</p>}
      </div>
    </div>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/settings-panel/ui/notifications-section.tsx"
'use client';
import { useState } from 'react';

const Toggle = ({ label, checked, onChange }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-[#334155]">
    <span className="text-sm text-[#0f172a] dark:text-[#f8fafc]">{label}</span>
    <button onClick={() => onChange(!checked)} className={`w-11 h-6 rounded-full relative transition-colors ${checked ? 'bg-[#3b82f6]' : 'bg-gray-300 dark:bg-[#334155]'}`}>
      <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

export const NotificationsSection = () => {
  const [prefs, setPrefs] = useState({ email: true, push: true, assignments: true, updates: false, weekly: true });
  const update = (key: string, val: boolean) => setPrefs({ ...prefs, [key]: val });

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-[#0f172a] dark:text-[#f8fafc]">Notification Preferences</h2>
      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155] p-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">Channels</h3>
        <Toggle label="Email Notifications" checked={prefs.email} onChange={(v: boolean) => update('email', v)} />
        <Toggle label="Push Notifications" checked={prefs.push} onChange={(v: boolean) => update('push', v)} />
      </div>
      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155] p-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">Activity</h3>
        <Toggle label="Task Assignments" checked={prefs.assignments} onChange={(v: boolean) => update('assignments', v)} />
        <Toggle label="Task Updates" checked={prefs.updates} onChange={(v: boolean) => update('updates', v)} />
        <Toggle label="Weekly Reports" checked={prefs.weekly} onChange={(v: boolean) => update('weekly', v)} />
      </div>
    </div>
  );
};
EOF

cat << 'EOF' > "$BASE_DIR/src/widgets/settings-panel/ui/security-section.tsx"
'use client';
import { useState } from 'react';
import { z } from 'zod';

const pwSchema = z.object({
  current: z.string().min(1, 'Required'),
  newPw: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
  confirm: z.string()
}).refine(data => data.newPw === data.confirm, { message: "Passwords don't match", path: ['confirm'] });

export const SecuritySection = () => {
  const [form, setForm] = useState({ current: '', newPw: '', confirm: '' });
  const [errors, setErrors] = useState<any>({});
  const [tfa, setTfa] = useState(false);

  const handleSubmit = () => {
    try {
      pwSchema.parse(form);
      setErrors({});
    } catch (e: any) {
      setErrors(e.errors.reduce((acc: any, curr: any) => ({ ...acc, [curr.path[0]]: curr.message }), {}));
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-[#0f172a] dark:text-[#f8fafc]">Security Settings</h2>
      <div className="space-y-4">
        <h3 className="text-md font-semibold text-[#0f172a] dark:text-[#f8fafc]">Change Password</h3>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
          <input type="password" value={form.current} onChange={e => setForm({...form, current: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none" />
          {errors.current && <p className="text-[#ef4444] text-xs mt-1">{errors.current}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">New Password</label>
          <input type="password" value={form.newPw} onChange={e => setForm({...form, newPw: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none" />
          {errors.newPw && <p className="text-[#ef4444] text-xs mt-1">Must be 8+ chars with uppercase, lowercase, number, special char</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
          <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none" />
          {errors.confirm && <p className="text-[#ef4444] text-xs mt-1">{errors.confirm}</p>}
        </div>
        <button onClick={handleSubmit} className="px-6 py-2 bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] rounded-lg font-medium">Update Password</button>
      </div>
      <hr className="border-gray-200 dark:border-[#334155]" />
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-md font-semibold text-[#0f172a] dark:text-[#f8fafc]">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
        </div>
        <button onClick={() => setTfa(!tfa)} className={`w-11 h-6 rounded-full relative transition-colors ${tfa ? 'bg-[#22c55e]' : 'bg-gray-300 dark:bg-[#334155]'}`}>
          <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${tfa ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>
    </div>
  );
};
EOF
chmod +x "$BASE_DIR/build_fsd.sh"
echo "Done"
