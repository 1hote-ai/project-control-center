'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTaskCard } from './sortable-task-card';
import { Plus } from 'lucide-react';
import type { Column } from '@/shared/types';

interface KanbanColumnProps {
  column: Column;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className={`flex-1 min-w-[300px] flex flex-col rounded-2xl p-4 transition-colors ${
      isOver ? 'bg-[#3b82f6]/10' : 'bg-[#0f172a]/50'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[#f8fafc]">{column.title}</h3>
        <span className="bg-[#1e293b] text-xs font-medium px-2.5 py-1 rounded-full text-[#f8fafc] border border-[#334155]">
          {column.tasks.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-3 min-h-[400px]"
      >
        <SortableContext items={column.tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {column.tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        <button className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[#334155] text-gray-400 hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors">
          <Plus size={16} /> Add Task
        </button>
      </div>
    </div>
  );
}
