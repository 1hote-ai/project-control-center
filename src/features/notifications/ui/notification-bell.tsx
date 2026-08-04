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
