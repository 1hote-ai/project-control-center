'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-[#334155] last:border-0">
      <div>
        <span className="text-sm font-medium text-[#0f172a] dark:text-[#f8fafc]">
          {label}
        </span>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => {
          onChange(!checked);
          toast.success(`${label} ${!checked ? 'enabled' : 'disabled'}`);
        }}
        className={`w-11 h-6 rounded-full relative transition-colors ${
          checked ? 'bg-[#3b82f6]' : 'bg-gray-300 dark:bg-[#334155]'
        }`}
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

interface NotificationPrefs {
  email: boolean;
  push: boolean;
  assignments: boolean;
  updates: boolean;
  weekly: boolean;
}

export function NotificationsSection() {
  const [prefs, setPrefs] = useState<NotificationPrefs>({
    email: true,
    push: true,
    assignments: true,
    updates: false,
    weekly: true,
  });

  const updatePref = (key: keyof NotificationPrefs, value: boolean) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-[#0f172a] dark:text-[#f8fafc]">
        Notification Preferences
      </h2>

      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155] p-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Channels
        </h3>
        <Toggle
          label="Email Notifications"
          description="Receive updates via email"
          checked={prefs.email}
          onChange={(v) => updatePref('email', v)}
        />
        <Toggle
          label="Push Notifications"
          description="Get push notifications in your browser"
          checked={prefs.push}
          onChange={(v) => updatePref('push', v)}
        />
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155] p-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Activity
        </h3>
        <Toggle
          label="Task Assignments"
          description="When you are assigned to a new task"
          checked={prefs.assignments}
          onChange={(v) => updatePref('assignments', v)}
        />
        <Toggle
          label="Task Updates"
          description="When a task you follow is updated"
          checked={prefs.updates}
          onChange={(v) => updatePref('updates', v)}
        />
        <Toggle
          label="Weekly Reports"
          description="Receive a weekly summary of your activity"
          checked={prefs.weekly}
          onChange={(v) => updatePref('weekly', v)}
        />
      </div>
    </div>
  );
}
