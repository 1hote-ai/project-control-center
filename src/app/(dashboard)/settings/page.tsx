'use client';

import { useState } from 'react';
import { ProfileSection } from '@/widgets/settings-panel/ui/profile-section';
import { NotificationsSection } from '@/widgets/settings-panel/ui/notifications-section';
import { SecuritySection } from '@/widgets/settings-panel/ui/security-section';
import { User, Bell, Shield } from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] mb-1">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex gap-1 bg-gray-100 dark:bg-[#0f172a] rounded-xl p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-[#1e293b] text-[#3b82f6] shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-[#334155]">
        {activeTab === 'profile' && <ProfileSection />}
        {activeTab === 'notifications' && <NotificationsSection />}
        {activeTab === 'security' && <SecuritySection />}
      </div>
    </div>
  );
}
