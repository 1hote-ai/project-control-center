'use client';

import { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const passwordSchema = z
  .object({
    current: z.string().min(1, 'Current password is required'),
    newPw: z
      .string()
      .min(8, 'Must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[a-z]/, 'Must contain a lowercase letter')
      .regex(/[0-9]/, 'Must contain a number')
      .regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
    confirm: z.string(),
  })
  .refine((data) => data.newPw === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

type PasswordErrors = Partial<Record<string, string>>;

function getPasswordStrength(password: string): { label: string; width: string; color: string } {
  if (password.length === 0) return { label: '', width: '0%', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: 'Weak', width: '33%', color: 'bg-[#ef4444]' };
  if (score <= 3) return { label: 'Fair', width: '50%', color: 'bg-[#eab308]' };
  if (score <= 4) return { label: 'Good', width: '75%', color: 'bg-[#3b82f6]' };
  return { label: 'Strong', width: '100%', color: 'bg-[#22c55e]' };
}

export function SecuritySection() {
  const [form, setForm] = useState({ current: '', newPw: '', confirm: '' });
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [tfa, setTfa] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const strength = getPasswordStrength(form.newPw);

  const handleSubmit = () => {
    const result = passwordSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: PasswordErrors = {};
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
    toast.success('Password updated successfully');
    setForm({ current: '', newPw: '', confirm: '' });
  };

  const sessions = [
    { device: 'MacBook Pro — Chrome', location: 'Moscow, Russia', current: true },
    { device: 'iPhone 15 — Safari', location: 'Moscow, Russia', current: false },
  ];

  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="text-xl font-bold text-[#0f172a] dark:text-[#f8fafc]">
        Security Settings
      </h2>

      {/* Change Password */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-[#0f172a] dark:text-[#f8fafc]">
          Change Password
        </h3>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={form.current}
              onChange={(e) => setForm({ ...form, current: e.target.value })}
              className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.current && (
            <p className="text-[#ef4444] text-xs mt-1">{errors.current}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={form.newPw}
              onChange={(e) => setForm({ ...form, newPw: e.target.value })}
              className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {form.newPw.length > 0 && (
            <div className="mt-2">
              <div className="w-full h-1.5 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                  style={{ width: strength.width }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Strength: {strength.label}</p>
            </div>
          )}
          {errors.newPw && (
            <p className="text-[#ef4444] text-xs mt-1">{errors.newPw}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#0f172a] dark:text-[#f8fafc] focus:ring-2 focus:ring-[#3b82f6] outline-none"
          />
          {errors.confirm && (
            <p className="text-[#ef4444] text-xs mt-1">{errors.confirm}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg font-medium transition-colors"
        >
          Update Password
        </button>
      </div>

      <hr className="border-gray-200 dark:border-[#334155]" />

      {/* Two-Factor Authentication */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#0f172a] dark:text-[#f8fafc]">
            Two-Factor Authentication
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add an extra layer of security to your account.
          </p>
        </div>
        <button
          onClick={() => {
            setTfa(!tfa);
            toast.success(tfa ? '2FA disabled' : '2FA enabled');
          }}
          className={`w-11 h-6 rounded-full relative transition-colors ${
            tfa ? 'bg-[#22c55e]' : 'bg-gray-300 dark:bg-[#334155]'
          }`}
          role="switch"
          aria-checked={tfa}
          aria-label="Toggle two-factor authentication"
        >
          <span
            className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
              tfa ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <hr className="border-gray-200 dark:border-[#334155]" />

      {/* Active Sessions */}
      <div>
        <h3 className="text-base font-semibold text-[#0f172a] dark:text-[#f8fafc] mb-3">
          Active Sessions
        </h3>
        <div className="space-y-3">
          {sessions.map((session, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-[#334155] bg-gray-50 dark:bg-[#0f172a]/50"
            >
              <div>
                <p className="text-sm font-medium text-[#0f172a] dark:text-[#f8fafc]">
                  {session.device}
                  {session.current && (
                    <span className="ml-2 text-xs bg-[#22c55e]/10 text-[#22c55e] px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {session.location}
                </p>
              </div>
              {!session.current && (
                <button className="text-xs text-[#ef4444] hover:text-[#dc2626] font-medium transition-colors">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
