'use client';

import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import { TaskModal } from '@/features/kanban';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#f8fafc] dark:bg-[#0f172a]">
          {children}
        </main>
      </div>
      <TaskModal />
    </div>
  );
}
