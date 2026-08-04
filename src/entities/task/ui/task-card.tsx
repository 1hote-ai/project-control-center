'use client'

import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import type { Task } from '@/shared/types'
import { useTaskStore } from '../model/store'
import { MessageSquare, Calendar } from 'lucide-react'
import Image from 'next/image'

interface TaskCardProps {
  task: Task
  isDragging?: boolean
}

const PRIORITY_COLORS: Record<Task['priority'], string> = {
  critical: 'bg-[#ef4444] text-white',
  high: 'bg-[#f97316] text-white',
  medium: 'bg-[#eab308] text-black',
  low: 'bg-[#22c55e] text-white',
}

function formatShortDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(dateStr))
}

export const TaskCard = React.memo(function TaskCard({ task, isDragging }: TaskCardProps) {
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask)
  const openModal = useTaskStore((state) => state.openModal)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedTask(task)
    openModal()
  }, [task, setSelectedTask, openModal])

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'done'

  return (
    <motion.div
      layoutId={task.id}
      onClick={handleClick}
      className={`
        bg-[#1e293b] rounded-xl p-4 border border-[#334155] cursor-pointer
        hover:border-[#3b82f6] transition-all duration-200 flex flex-col gap-3
        ${isDragging ? 'opacity-50 scale-105 shadow-2xl ring-2 ring-[#3b82f6]' : ''}
      `}
    >
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-medium text-[#f8fafc] truncate flex-1">{task.title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-400 line-clamp-2">{task.description}</p>
      )}

      {task.progress > 0 && task.progress < 100 && (
        <div className="w-full bg-[#0f172a] rounded-full h-1.5">
          <div
            className="bg-[#3b82f6] h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-1">
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-[#ef4444]' : 'text-gray-400'}`}>
            <Calendar size={12} />
            {formatShortDate(task.deadline)}
          </span>
          {task.commentsCount > 0 && (
            <span className="flex items-center gap-1 text-gray-400 text-xs">
              <MessageSquare size={12} />
              {task.commentsCount}
            </span>
          )}
        </div>

        <div className="flex -space-x-2 overflow-hidden">
          {task.assignees?.slice(0, 3).map((assignee) => (
            <div
              key={assignee.id}
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[#1e293b] bg-gray-600 shrink-0 overflow-hidden"
              title={assignee.name}
            >
              {assignee.avatar ? (
              <Image src={assignee.avatar} alt={assignee.name} width={24} height={24} className="h-full w-full rounded-full object-cover" />
            ) : (
                <div className="h-full w-full flex items-center justify-center text-[10px] text-white font-medium">
                  {assignee.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ))}
          {task.assignees && task.assignees.length > 3 && (
            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#1e293b] bg-[#334155] flex items-center justify-center text-[10px] text-white z-10">
              +{task.assignees.length - 3}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
})
