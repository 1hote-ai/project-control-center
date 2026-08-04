'use client';

import { useState } from 'react';
import { z } from 'zod';

import { Modal } from '@/shared/ui';
import { useTaskStore } from '@/entities/task/model/store';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '@/entities/task/model/queries';
import { Trash2, Upload, MessageSquare } from 'lucide-react';
import type { Task } from '@/shared/types';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['backlog', 'in-progress', 'review', 'done']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
});

type ValidationErrors = Partial<Record<string, string>>;

export function TaskModal() {
  const isModalOpen = useTaskStore(state => state.isModalOpen);
  const selectedTask = useTaskStore(state => state.selectedTask);
  const closeModal = useTaskStore(state => state.closeModal);
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTaskMutation();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTaskMutation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'backlog' as Task['status'],
    priority: 'medium' as Task['priority'],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [newComment, setNewComment] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [prevSelectedTask, setPrevSelectedTask] = useState<Task | null>(null);

  if (selectedTask !== prevSelectedTask) {
    setPrevSelectedTask(selectedTask);
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status,
        priority: selectedTask.priority,
      });
      setErrors({});
      setShowDeleteConfirm(false);
      setUploadedFiles([]);
      setNewComment('');
    }
  }

  if (!isModalOpen || !selectedTask) return null;

  const handleSave = () => {
    const result = taskSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: ValidationErrors = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0];
        if (typeof path === 'string') {
          fieldErrors[path] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    updateTask(
      { id: selectedTask.id, data: formData },
      { onSuccess: () => closeModal() }
    );
  };

  const handleDelete = () => {
    deleteTask(selectedTask.id, {
      onSuccess: () => closeModal(),
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const names = Array.from(files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...names]);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Task" size="lg">
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-[#0f172a] border border-[#334155] p-2.5 rounded-lg text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none"
          />
          {errors.title && <span className="text-xs text-[#ef4444] mt-1">{errors.title}</span>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#0f172a] border border-[#334155] p-2.5 rounded-lg text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none"
            rows={3}
          />
        </div>

        {/* Status & Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
              className="w-full bg-[#0f172a] border border-[#334155] p-2.5 rounded-lg text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none"
            >
              <option value="backlog">Backlog</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
              className="w-full bg-[#0f172a] border border-[#334155] p-2.5 rounded-lg text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <MessageSquare size={14} /> Comments ({selectedTask.commentsCount})
          </label>
          <div className="flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-[#0f172a] border border-[#334155] p-2 rounded-lg text-[#f8fafc] text-sm focus:ring-2 focus:ring-[#3b82f6] outline-none"
            />
            <button
              onClick={() => setNewComment('')}
              className="px-4 py-2 bg-[#334155] text-[#f8fafc] rounded-lg text-sm hover:bg-[#475569] transition-colors"
            >
              Post
            </button>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Upload size={14} className="inline mr-1" /> Attachments
          </label>
          <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-[#334155] rounded-xl cursor-pointer hover:border-[#3b82f6] transition-colors">
            <input type="file" multiple onChange={handleFileUpload} className="hidden" />
            <span className="text-sm text-gray-400">Click to upload files</span>
          </label>
          {uploadedFiles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {uploadedFiles.map((name, i) => (
                <span key={i} className="text-xs bg-[#334155] text-[#f8fafc] px-2 py-1 rounded">{name}</span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 text-white py-2.5 rounded-lg font-medium transition-colors"
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={closeModal}
            className="flex-1 bg-[#334155] hover:bg-[#475569] text-[#f8fafc] py-2.5 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          {showDeleteConfirm ? (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-lg font-medium transition-colors"
            >
              {isDeleting ? 'Deleting...' : 'Confirm'}
            </button>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2.5 text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors"
              title="Delete task"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
