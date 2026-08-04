'use client';

import { KanbanBoard } from '@/widgets/kanban-board';
import { useTasksQuery } from '@/entities/task/model/queries';

export default function KanbanPage() {
  useTasksQuery();

  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] mb-1">
          Kanban Board
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage and track your tasks across different stages.
        </p>
      </div>
      <KanbanBoard />
    </div>
  );
}
