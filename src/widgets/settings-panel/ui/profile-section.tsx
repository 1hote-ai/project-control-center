'use client';

import { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone format')
    .optional()
    .or(z.literal('')),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
});

type ProfileFormErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function ProfileSection() {
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1234567890',
    bio: 'Senior Frontend Architect with 8+ years of experience building scalable web applications.',
  });
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const handleSave = () => {
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: ProfileFormErrors = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0];
        if (typeof path === 'string') {
          fieldErrors[path as keyof ProfileFormErrors] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    toast.success('Profile saved successfully');
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ProfileFormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof ProfileFormErrors];
        return next;
      });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-[#0f172a] dark:text-[#f8fafc]">
        Profile Information
      </h2>

      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white text-2xl font-bold cursor-pointer hover:opacity-90 transition-opacity">
          AJ
        </div>
        <div>
          <p className="text-sm font-medium text-[#0f172a] dark:text-[#f8fafc]">
            Profile Photo
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Click to upload a new photo
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none transition-shadow"
          />
          {errors.name && (
            <p className="text-[#ef4444] text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none transition-shadow"
          />
          {errors.email && (
            <p className="text-[#ef4444] text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none transition-shadow"
          />
          {errors.phone && (
            <p className="text-[#ef4444] text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => updateField('bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none transition-shadow resize-none"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg font-medium transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
}
