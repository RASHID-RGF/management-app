import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Monitor,
  Lock,
  Mail,
  Smartphone,
  Check,
  Cloud,
  Zap,
  Github,
  Slack,
  Save,
  Trash2,
  Key,
  Eye,
  Camera,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

type SettingSection = "profile" | "security" | "notifications" | "appearance" | "billing";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingSection>("profile");
  const [isSaving, setIsSaving] = useState(false);

  // Toggles State
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailUpdates: false,
    publicProfile: true,
    twoFactor: true,
    autoSave: true,
  });

  // Profile State
  const [profile, setProfile] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    role: "User",
    bio: ""
  });

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email,
        photoURL: user.photoURL
      }));
    }
  }, [user]);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // In a real app, you would update Firebase profile here
    // await updateProfile(auth.currentUser, { displayName: profile.name });
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 1500);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: SettingSection, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-left",
        activeTab === id
          ? "bg-primary text-white shadow-lg shadow-primary/20"
          : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800"
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-500 overflow-hidden">
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shrink-0">
        <div className="flex items-center justify-between px-8 h-16 max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-primary flex items-center justify-center shadow-lg">
              <Monitor className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">System Settings</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] -mt-1">Configuration Core</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex max-w-[1400px] mx-auto w-full">
        {/* Settings Sidebar */}
        <aside className="w-64 p-8 border-r border-slate-200/50 dark:border-slate-800/50 shrink-0 space-y-2 hidden md:block">
          <SidebarItem id="profile" icon={User} label="Profile" />
          <SidebarItem id="security" icon={Shield} label="Security" />
          <SidebarItem id="notifications" icon={Bell} label="Notifications" />
          <SidebarItem id="appearance" icon={Palette} label="Appearance" />
          <SidebarItem id="billing" icon={CreditCard} label="Billing" />

          <div className="pt-8 mt-8 border-t border-slate-200/50 dark:border-slate-800/50 space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-4 mb-4 text-left">Information</h3>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all text-left">
              <HelpCircle className="w-4 h-4" /> Help Center
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all text-left"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-12">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <section className="text-left">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Public Profile</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Manage how you appear to your team and workspace.</p>
                  </section>

                  <div className="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b border-slate-200/50 dark:border-slate-800/50">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-4xl font-black text-white border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden relative transition-colors duration-500">
                        {user?.photoURL ? (
                          <img src={user.photoURL} alt={profile.name} className="w-full h-full object-cover" />
                        ) : (
                          getInitials(profile.name)
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg ring-4 ring-slate-50 dark:ring-slate-950">
                        <Plus className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Display Name</label>
                          <input
                            value={profile.name}
                            onChange={e => setProfile({ ...profile, name: e.target.value })}
                            className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-slate-900 dark:text-white shadow-sm"
                          />
                        </div>
                        <div className="space-y-1.5 text-left">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Personal Role</label>
                          <input
                            value={profile.role}
                            onChange={e => setProfile({ ...profile, role: e.target.value })}
                            className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-slate-900 dark:text-white shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          value={profile.email}
                          disabled
                          className="w-full pl-12 pr-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none font-bold text-slate-400 dark:text-slate-500 shadow-sm cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Short Biography</label>
                      <textarea
                        rows={4}
                        value={profile.bio}
                        onChange={e => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700 dark:text-slate-300 shadow-sm resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <section className="text-left">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Security Access</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Protect your account and managed sessions.</p>
                  </section>

                  <div className="space-y-4">
                    <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left transition-colors duration-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <Shield className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Two-Factor Authentication</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Add an extra layer of protection</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggle('twoFactor')}
                          className={cn(
                            "w-14 h-8 rounded-full transition-all relative p-1",
                            settings.twoFactor ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
                          )}
                        >
                          <div className={cn(
                            "w-6 h-6 bg-white rounded-full shadow-md transition-all",
                            settings.twoFactor ? "translate-x-6" : "translate-x-0"
                          )} />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left transition-colors duration-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <Lock className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Change Password</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Last updated 32 days ago</p>
                          </div>
                        </div>
                        <button className="px-5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 text-slate-900 dark:text-white">
                          Update
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sessions Management */}
                  <div className="pt-8 text-left">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      {[
                        { device: "MacBook Pro 16\"", location: "San Francisco, CA", status: "Current Session", icon: Monitor, current: true },
                        { device: "iPhone 15 Pro", location: "London, UK", status: "Active 2h ago", icon: Smartphone, current: false },
                        { device: "Chrome on Windows", location: "Berlin, DE", status: "Active 5d ago", icon: Globe, current: false },
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                              <session.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{session.device}</h4>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{session.location} • {session.status}</p>
                            </div>
                          </div>
                          {!session.current && (
                            <button className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 px-3 py-1.5 rounded-lg transition-all">
                              Revoke
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 text-left">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 mb-4">Integrations Access</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-all">
                        <div className="flex items-center gap-3">
                          <Github className="w-5 h-5 text-slate-900 dark:text-white" />
                          <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">GitHub Sync</span>
                        </div>
                        <Check className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-all">
                        <div className="flex items-center gap-3">
                          <Slack className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">Slack Core</span>
                        </div>
                        <Plus className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <section className="text-left">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Notification Engine</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Control how you receive system alerts and updates.</p>
                  </section>

                  <div className="bg-white/60 dark:bg-slate-900/60 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 p-8 space-y-8 transition-colors duration-500">
                    {[
                      { key: 'pushNotifications', title: "Push Notifications", desc: "Receive real-time desktop alerts", icon: Smartphone },
                      { key: 'emailUpdates', title: "Email Daily Summary", desc: "Automated rollup of active tasks", icon: Mail },
                      { key: 'autoSave', title: "Auto-Save Sync", desc: "Instantly persist data across nodes", icon: Cloud },
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between text-left">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors duration-500">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggle(item.key as any)}
                          className={cn(
                            "w-12 h-6 rounded-full transition-all relative p-1 shrink-0",
                            settings[item.key as keyof typeof settings] ? "bg-primary" : "bg-slate-200 dark:bg-slate-800"
                          )}
                        >
                          <div className={cn(
                            "w-4 h-4 bg-white rounded-full shadow-md transition-all",
                            settings[item.key as keyof typeof settings] ? "translate-x-6" : "translate-x-0"
                          )} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "appearance" && (
                <motion.div
                  key="appearance"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <section className="text-left">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Visual Identity</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors duration-500">Customize the user interface engine settings.</p>
                  </section>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <button
                      onClick={() => setTheme('light')}
                      className={cn(
                        "p-8 rounded-[2.5rem] border-2 transition-all text-left relative overflow-hidden group",
                        theme === 'light' ? "bg-white border-primary shadow-xl shadow-primary/10" : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      )}
                    >
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                      <Monitor className={cn("w-8 h-8 mb-4", theme === 'light' ? "text-primary" : "text-slate-400")} />
                      <h4 className="text-lg font-black text-slate-900 dark:text-white transition-colors duration-500">Neural Light</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors duration-500">Optimized for day productivity</p>
                      {theme === 'light' && <div className="absolute top-6 right-6 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center p-1"><Check className="w-4 h-4" /></div>}
                    </button>

                    <button
                      onClick={() => setTheme('dark')}
                      className={cn(
                        "p-8 rounded-[2.5rem] border-2 transition-all text-left relative overflow-hidden group",
                        theme === 'dark' ? "bg-slate-900 border-primary shadow-xl shadow-primary/10" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-800"
                      )}
                    >
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                      <div className="p-2 rounded-lg bg-slate-800 dark:bg-slate-700 w-fit mb-4">
                        <Zap className={cn("w-6 h-6", theme === 'dark' ? "text-yellow-400" : "text-slate-400")} />
                      </div>
                      <h4 className={cn("text-lg font-black", theme === 'dark' ? "text-white" : "text-slate-900 dark:text-slate-400 transition-colors duration-500")}>Deep Space</h4>
                      <p className="text-xs text-slate-400 font-medium mt-1 transition-colors duration-500">High contrast night focus</p>
                      {theme === 'dark' && <div className="absolute top-6 right-6 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center p-1"><Check className="w-4 h-4" /></div>}
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "billing" && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <section className="text-left">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Billing & Plans</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors duration-500">Manage your workspace subscription and invoicing.</p>
                  </section>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left flex flex-col justify-between transition-colors duration-500">
                      <div>
                        <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 w-fit mb-4 transition-colors duration-500">Current Plan</div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Free Tier</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2 transition-colors duration-500">Up to 3 active projects and basic Neural AI core.</p>
                      </div>
                      <div className="pt-8 space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold transition-colors duration-500">
                          <span className="text-slate-400 dark:text-slate-500">Project Quota</span>
                          <span className="text-slate-900 dark:text-white">2 / 3 used</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors duration-500">
                          <div className="h-full bg-primary w-[66%]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-slate-900 dark:bg-slate-800 text-white shadow-xl shadow-slate-900/20 text-left relative overflow-hidden group transition-colors duration-500">
                      <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                      <div className="relative z-10">
                        <div className="px-3 py-1 rounded-full bg-primary text-[10px] font-black uppercase tracking-widest text-white w-fit mb-4">Recommended</div>
                        <h3 className="text-3xl font-black text-white tracking-tight">Pro Plan</h3>
                        <p className="text-sm text-slate-400 font-medium mt-2">Unlimited projects, advanced analytics, and custom training.</p>
                        <div className="flex items-baseline gap-1 mt-6">
                          <span className="text-4xl font-black">$29</span>
                          <span className="text-slate-500 font-bold text-sm">/ month</span>
                        </div>
                        <button className="w-full mt-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                          Upgrade Workspace
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 text-left">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 mb-4 transition-colors duration-500">Payment Methods</h3>
                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between transition-colors duration-500">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-colors duration-500">
                          <CreditCard className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-500">•••• •••• •••• 4242</h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium transition-colors duration-500">Expires 12/26</p>
                        </div>
                      </div>
                      <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-primary transition-colors">Edit</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
