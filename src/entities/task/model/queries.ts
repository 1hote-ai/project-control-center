'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksApi } from '../api/task-api'
import toast from 'react-hot-toast'
import { Task } from '@/shared/types'
import { moveTaskPure } from '../lib/task-utils'

export function useTasksQuery() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const data = await tasksApi.getAll()
      return data
    }
  })
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => tasksApi.create(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task created successfully')
    },
    onError: () => {
      toast.error('Failed to create task')
    }
  })
}

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => tasksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task updated successfully')
    },
    onError: () => {
      toast.error('Failed to update task')
    }
  })
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => tasksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete task')
    }
  })
}

export function useMoveTaskMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ taskId, newStatus, newOrder }: { taskId: string; newStatus: Task['status']; newOrder: number }) => 
      tasksApi.reorder(taskId, newStatus, newOrder),
    onMutate: async ({ taskId, newStatus, newOrder }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      
      if (previousTasks) {
        const newTasks = moveTaskPure(previousTasks, taskId, newStatus, newOrder)
        queryClient.setQueryData<Task[]>(['tasks'], newTasks)
      }
      return { previousTasks }
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(['tasks'], context.previousTasks)
      }
      toast.error('Failed to move task')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}
