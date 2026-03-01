'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { SidebarTrigger } from "@/Components/ui/sidebar";
import { UserProfile } from "@/Components/UserProfile";
import { Save, Bell, Shield, User, Palette } from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [postReminders, setPostReminders] = useState(true);
  const [engagementAlerts, setEngagementAlerts] = useState(false);
  const [autoPost, setAutoPost] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-geist">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-7 w-7 text-[rgba(255,255,255,0.4)] hover:text-[#ededed]" />
            <div>
              <h1 className="text-[16px] font-semibold text-[#ededed]">Settings</h1>
              <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Manage your account and application preferences</p>
            </div>
          </div>
          <UserProfile />
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 animate-fade-up">
        <div className="max-w-4xl mx-auto space-y-4">

          {/* Profile Settings */}
          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-[rgba(255,255,255,0.4)]" />
              <h2 className="text-[14px] font-medium text-[#ededed]">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-1.5">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    defaultValue="John Developer"
                    className="w-full h-9 px-3 text-[13px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)] focus:outline-none focus:border-[rgba(255,255,255,0.12)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-1.5">Email</label>
                  <input
                    id="email"
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full h-9 px-3 text-[13px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)] focus:outline-none focus:border-[rgba(255,255,255,0.12)] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="bio" className="block text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-1.5">Bio</label>
                <textarea
                  id="bio"
                  rows={3}
                  placeholder="Tell us about yourself..."
                  defaultValue="DevOps engineer passionate about infrastructure automation and community engagement."
                  className="w-full px-3 py-2 text-[13px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)] focus:outline-none focus:border-[rgba(255,255,255,0.12)] transition-colors resize-none"
                />
              </div>
              <div>
                <button className="inline-flex items-center gap-2 bg-[#ededed] text-[#0a0a0a] font-medium text-[13px] h-9 px-4 rounded-[7px] hover:bg-white transition-colors">
                  <Save className="h-4 w-4" />
                  Save Profile
                </button>
              </div>
            </div>
          </div>

          {/* Reddit Integration */}
          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-4 w-4 text-[rgba(255,255,255,0.4)]" />
              <h2 className="text-[14px] font-medium text-[#ededed]">Reddit Integration</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="reddit-username" className="block text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-1.5">Reddit Username</label>
                <input
                  id="reddit-username"
                  type="text"
                  placeholder="your_reddit_username"
                  className="w-full h-9 px-3 text-[13px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)] focus:outline-none focus:border-[rgba(255,255,255,0.12)] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="default-engagement" className="block text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-1.5">Default Engagement Template</label>
                <textarea
                  id="default-engagement"
                  rows={3}
                  placeholder="Default template for engagement text..."
                  defaultValue="Hey there! Thanks for bringing this up. We've been working with similar challenges and found that..."
                  className="w-full px-3 py-2 text-[13px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)] focus:outline-none focus:border-[rgba(255,255,255,0.12)] transition-colors resize-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoPost}
                  onClick={() => setAutoPost(!autoPost)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,255,255,0.12)] ${autoPost ? 'bg-[#34d399]' : 'bg-[rgba(255,255,255,0.1)]'}`}
                >
                  <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${autoPost ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
                <label htmlFor="auto-post" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] cursor-pointer" onClick={() => setAutoPost(!autoPost)}>Enable automatic posting</label>
              </div>
              <div>
                <button className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] font-medium text-[13px] h-9 px-4 rounded-[7px] hover:border-[rgba(255,255,255,0.12)] hover:text-[#ededed] transition-all">
                  Connect Reddit Account
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-4 w-4 text-[rgba(255,255,255,0.4)]" />
              <h2 className="text-[14px] font-medium text-[#ededed]">Notifications</h2>
            </div>
            <div className="space-y-4">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-[rgba(255,255,255,0.6)]">Email Notifications</p>
                  <p className="text-[12px] text-[rgba(255,255,255,0.25)] mt-0.5">Receive email updates about your posts</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={emailNotifications}
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,255,255,0.12)] ${emailNotifications ? 'bg-[#34d399]' : 'bg-[rgba(255,255,255,0.1)]'}`}
                >
                  <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${emailNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Post Reminders */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-[rgba(255,255,255,0.6)]">Post Reminders</p>
                  <p className="text-[12px] text-[rgba(255,255,255,0.25)] mt-0.5">Get reminded to post scheduled content</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={postReminders}
                  onClick={() => setPostReminders(!postReminders)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,255,255,0.12)] ${postReminders ? 'bg-[#34d399]' : 'bg-[rgba(255,255,255,0.1)]'}`}
                >
                  <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${postReminders ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Engagement Alerts */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-[rgba(255,255,255,0.6)]">Engagement Alerts</p>
                  <p className="text-[12px] text-[rgba(255,255,255,0.25)] mt-0.5">Notify when posts get high engagement</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={engagementAlerts}
                  onClick={() => setEngagementAlerts(!engagementAlerts)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,255,255,0.12)] ${engagementAlerts ? 'bg-[#34d399]' : 'bg-[rgba(255,255,255,0.1)]'}`}
                >
                  <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${engagementAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-4 w-4 text-[rgba(255,255,255,0.4)]" />
              <h2 className="text-[14px] font-medium text-[#ededed]">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="theme" className="block text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-1.5">Theme Preference</label>
                <Select defaultValue="dark">
                  <SelectTrigger className="w-full h-9 px-3 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] focus:ring-0 focus:ring-offset-0 focus:border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.12)] transition-colors [&>svg]:text-[rgba(255,255,255,0.4)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.06)] rounded-[7px]">
                    <SelectItem value="light" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Light</SelectItem>
                    <SelectItem value="dark" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Dark</SelectItem>
                    <SelectItem value="system" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="posts-per-page" className="block text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-1.5">Posts per page</label>
                <Select defaultValue="10">
                  <SelectTrigger className="w-full h-9 px-3 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] focus:ring-0 focus:ring-offset-0 focus:border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.12)] transition-colors [&>svg]:text-[rgba(255,255,255,0.4)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.06)] rounded-[7px]">
                    <SelectItem value="5" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">5</SelectItem>
                    <SelectItem value="10" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">10</SelectItem>
                    <SelectItem value="25" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">25</SelectItem>
                    <SelectItem value="50" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Save All Settings */}
          <div className="flex justify-end gap-3 pt-2">
            <button className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] font-medium text-[13px] h-9 px-4 rounded-[7px] hover:border-[rgba(255,255,255,0.12)] hover:text-[#ededed] transition-all">
              Reset to Defaults
            </button>
            <button className="inline-flex items-center gap-2 bg-[#ededed] text-[#0a0a0a] font-medium text-[13px] h-9 px-4 rounded-[7px] hover:bg-white transition-colors">
              <Save className="h-4 w-4" />
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
