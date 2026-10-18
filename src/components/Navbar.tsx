import React from 'react';
import {
  Languages,
  ShieldCheck,
  User,
  LogIn,
  LogOut,
  Menu,
  X,
  BookOpen,
  MessageSquare,
  Phone,
  Info,
  Sparkles,
  DollarSign,
  Sun,
  Moon,
  HeartPulse,
  AlertTriangle,
  Settings,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

interface NavbarProps {
  activeTab: 'translator' | 'phrase-packs' | 'ask-ai' | 'monetize' | 'about' | 'feedback' | 'privacy' | 'contact' | 'notice' | 'settings';
  setActiveTab: (tab: 'translator' | 'phrase-packs' | 'ask-ai' | 'monetize' | 'about' | 'feedback' | 'privacy' | 'contact' | 'notice' | 'settings') => void;
  onOpenAuth: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const { currentUser, userProfile, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  const navItems = [
    { id: 'translator', label: 'Translator', icon: Languages },
    { id: 'phrase-packs', label: 'Clinic & Legal Packs', icon: HeartPulse },
    { id: 'ask-ai', label: 'Ask Chin AI', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'monetize', label: 'Earn / Ads', icon: DollarSign },
    { id: 'notice', label: 'Official Notice', icon: AlertTriangle },
    { id: 'about', label: 'Dialects', icon: Info },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ] as const;

  const displayName = userProfile?.displayName || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Wordmark Zone */}
          <button
            type="button"
            onClick={() => setActiveTab('translator')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-blue-600 border border-slate-800 dark:border-blue-500 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-900 transition-colors">
              <span className="font-extrabold text-sm tracking-tight text-blue-400 dark:text-white">CL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight whitespace-nowrap">
                Chin Language AI
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 hidden sm:inline border border-blue-200 dark:border-blue-800">
                140+ Langs
              </span>
            </div>
          </button>

          {/* Desktop Single-Line Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Dark Mode Toggle & User Auth */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* High-Contrast Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to High-Contrast Dark Mode'}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to High-Contrast Dark Mode'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* User / Auth State Button */}
            <div className="hidden sm:flex items-center relative">
              {currentUser ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-900 dark:bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white truncate max-w-[100px]">
                        {displayName}
                      </p>
                      <div className="flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Cloud</span>
                      </div>
                    </div>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg py-1 z-50 animate-fadeIn text-xs">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">{displayName}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('settings');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-medium"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Account Settings</span>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          setUserDropdownOpen(false);
                          await logOut();
                        }}
                        className="w-full px-3 py-2 text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white shadow-2xs transition-colors whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In / Sign Up</span>
                </button>
              )}
            </div>

            {/* Mobile hamburger button */}
            <div className="flex xl:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 dark:text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {currentUser ? (
              <div className="w-full space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('settings');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-900 dark:bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">{displayName}</p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Settings & Profile</p>
                    </div>
                  </div>
                  <Settings className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logOut();
                  }}
                  className="w-full py-2 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 dark:bg-blue-600 text-white"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In or Sign Up</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
