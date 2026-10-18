import React, { useState, useEffect } from 'react';
import {
  User,
  Bell,
  Palette,
  Shield,
  CheckCircle2,
  Save,
  LogOut,
  Trash2,
  Download,
  AlertTriangle,
  Languages,
  Moon,
  Sun,
  Laptop,
  Mail,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Info,
} from 'lucide-react';
import { useAuth, UserProfileData, UserNotificationPreferences } from '../context/AuthContext.tsx';
import { SUPPORTED_LANGUAGES } from '../utils/translator-logic.ts';

interface SettingsViewProps {
  isDarkMode: boolean;
  onToggleDarkMode: (mode?: 'light' | 'dark' | 'system') => void;
  onOpenAuth: () => void;
  onNavigateTranslator: () => void;
  onNavigateNotice: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onOpenAuth,
  onNavigateTranslator,
  onNavigateNotice,
}) => {
  const {
    currentUser,
    userProfile,
    savedPhrases,
    logOut,
    updateUserProfile,
    updateNotificationPreferences,
    clearAllSavedPhrases,
  } = useAuth();

  const [activeSection, setActiveSection] = useState<'profile' | 'appearance' | 'notifications' | 'account'>('profile');

  // Profile form state
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [preferredDialect, setPreferredDialect] = useState(userProfile?.preferredDialect || 'cnh');
  const [communityRole, setCommunityRole] = useState(userProfile?.communityRole || 'Community Member');
  const [region, setRegion] = useState(userProfile?.region || '');

  // Notifications state
  const [notifications, setNotifications] = useState<UserNotificationPreferences>({
    emailAlerts: userProfile?.notifications?.emailAlerts ?? true,
    weeklyDigest: userProfile?.notifications?.weeklyDigest ?? true,
    communityUpdates: userProfile?.notifications?.communityUpdates ?? false,
  });

  // Appearance state
  const [themePreference, setThemePreference] = useState<'light' | 'dark' | 'system'>(
    userProfile?.appearance || (isDarkMode ? 'dark' : 'light')
  );
  const [fontSize, setFontSize] = useState<'standard' | 'large'>(userProfile?.fontSize || 'standard');
  const [showPronunciation, setShowPronunciation] = useState<boolean>(userProfile?.showPronunciation ?? true);

  // Status feedback
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Keep state synced with loaded profile
  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || '');
      setPreferredDialect(userProfile.preferredDialect || 'cnh');
      setCommunityRole(userProfile.communityRole || 'Community Member');
      setRegion(userProfile.region || '');
      if (userProfile.notifications) {
        setNotifications(userProfile.notifications);
      }
      if (userProfile.appearance) {
        setThemePreference(userProfile.appearance);
      }
    }
  }, [userProfile]);

  const chinDialects = SUPPORTED_LANGUAGES.filter((l) => l.isChinOrRegional);

  // Handle Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserProfile({
        displayName: displayName.trim(),
        preferredDialect,
        communityRole,
        region: region.trim(),
        appearance: themePreference,
        fontSize,
        showPronunciation,
      });
      setSaveSuccessNotice('Profile settings updated successfully!');
      setTimeout(() => setSaveSuccessNotice(''), 3500);
    } catch {
      setSaveSuccessNotice('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Save Notifications
  const handleSaveNotifications = async () => {
    setIsSaving(true);
    try {
      await updateNotificationPreferences(notifications);
      setSaveSuccessNotice('Notification preferences saved!');
      setTimeout(() => setSaveSuccessNotice(''), 3500);
    } catch {
      setSaveSuccessNotice('Failed to save notification preferences.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Theme Change
  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    setThemePreference(mode);
    onToggleDarkMode(mode);
    if (currentUser) {
      updateUserProfile({ appearance: mode }).catch(() => {});
    }
  };

  // Export Saved Phrases to JSON file
  const handleExportPhrases = () => {
    if (savedPhrases.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedPhrases, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `chin_saved_phrases_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Application & Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Manage your Chin dialect profile, appearance themes, email notifications, and private phrasebook storage.
        </p>
      </div>

      {/* Guest Sign In Callout Banner if not authenticated */}
      {!currentUser && (
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-300 flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Sign in to sync your profile across devices
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Save private phrasebook items securely with Firebase, customize notifications, and preserve dialect settings.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenAuth}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors whitespace-nowrap shrink-0"
          >
            Sign In or Sign Up
          </button>
        </div>
      )}

      {/* Success Notification Banner */}
      {saveSuccessNotice && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2 font-medium animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Dual Column Layout: Section Tabs & Content Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs Sidebar */}
        <div className="md:col-span-1 space-y-1">
          <button
            type="button"
            onClick={() => setActiveSection('profile')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
              activeSection === 'profile'
                ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Profile & Dialect</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('appearance')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
              activeSection === 'appearance'
                ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Appearance & Theme</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('notifications')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
              activeSection === 'notifications'
                ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Notifications</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('account')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
              activeSection === 'account'
                ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Account & Privacy</span>
          </button>
        </div>

        {/* Section Content Panel */}
        <div className="md:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          {/* 1. PROFILE SECTION */}
          {activeSection === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Profile & Dialect Preferences</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Customize how your translations, clinic phrasebooks, and community contributions are identified.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Display Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Salai Van Bik / Mary Ni"
                    className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    disabled
                    value={currentUser?.email || 'Guest User (Not Signed In)'}
                    className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Primary / Preferred Chin Dialect:
                  </label>
                  <select
                    value={preferredDialect}
                    onChange={(e) => setPreferredDialect(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {chinDialects.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name} ({lang.nativeName})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Sets the default target dialect on the translator and phrase packs.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Community Role / Affiliation:
                  </label>
                  <select
                    value={communityRole}
                    onChange={(e) => setCommunityRole(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="Community Member">Community Member</option>
                    <option value="Healthcare Navigator / Clinic Worker">Healthcare Navigator / Clinic Worker</option>
                    <option value="Church Elder / Pastor">Church Elder / Pastor</option>
                    <option value="Immigration & Legal Paralegal">Immigration & Legal Paralegal</option>
                    <option value="Student / Youth Learner">Student / Youth Learner</option>
                    <option value="Linguist / Dialect Translator">Linguist / Dialect Translator</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Diaspora City / Region (Optional):
                </label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="e.g. Indianapolis, IN; Dallas-Fort Worth, TX; Kuala Lumpur; Hakha"
                  className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving || !currentUser}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
                </button>
                {!currentUser && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1.5">
                    Sign in to persist your profile to your cloud account.
                  </p>
                )}
              </div>
            </form>
          )}

          {/* 2. APPEARANCE SECTION */}
          {activeSection === 'appearance' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Appearance & Theme Options</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Configure high-contrast night reading, typography sizing, and phonetic guide visibility.
                </p>
              </div>

              {/* Theme Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Color Mode:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleThemeChange('light')}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      themePreference === 'light'
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Sun className="w-5 h-5 text-amber-500" />
                      {themePreference === 'light' && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    </div>
                    <span className="font-bold text-xs">Light Mode</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Crisp daytime contrast</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleThemeChange('dark')}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      themePreference === 'dark'
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      {themePreference === 'dark' && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    </div>
                    <span className="font-bold text-xs">High-Contrast Dark</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">OLED #0b0f19 night reading</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleThemeChange('system')}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      themePreference === 'system'
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Laptop className="w-5 h-5 text-slate-500" />
                      {themePreference === 'system' && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    </div>
                    <span className="font-bold text-xs">Match System</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Sync with device OS</span>
                  </button>
                </div>
              </div>

              {/* Font Size & Reading Density */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Chin Translation Text Size:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFontSize('standard');
                      if (currentUser) updateUserProfile({ fontSize: 'standard' });
                    }}
                    className={`p-3 rounded-xl border text-left ${
                      fontSize === 'standard'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <p className="text-sm">Standard (16px)</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Optimized for phones & laptops</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFontSize('large');
                      if (currentUser) updateUserProfile({ fontSize: 'large' });
                    }}
                    className={`p-3 rounded-xl border text-left ${
                      fontSize === 'large'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <p className="text-base font-bold">Large (18px)</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Recommended for clinic reading & elders</p>
                  </button>
                </div>
              </div>

              {/* Show Pronunciation Guides Toggle */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phonetic Pronunciation Guides
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Show Romanized phonetic pronunciation below translated text
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPronunciation}
                    onChange={(e) => {
                      setShowPronunciation(e.target.checked);
                      if (currentUser) updateUserProfile({ showPronunciation: e.target.checked });
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}

          {/* 3. NOTIFICATIONS SECTION */}
          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Notification Preferences</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Choose which alerts and digest updates you receive from the Chin Language community.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      Verified Dialect Correction Alerts
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Receive notifications when community linguists verify a dialect phrasing or update a clinical translation.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={notifications.emailAlerts}
                      onChange={(e) =>
                        setNotifications((prev) => ({ ...prev, emailAlerts: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      Weekly Clinical & Legal Phrasebook Digest
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      A curated email summary of high-yield medical triage statements, pharmacy dosage terms, and asylum hearing guidelines.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyDigest}
                      onChange={(e) =>
                        setNotifications((prev) => ({ ...prev, weeklyDigest: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      Community Event Reminders
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Updates regarding Chin National Day (Feb 20), youth cultural festivals, and diaspora language education classes.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={notifications.communityUpdates}
                      onChange={(e) =>
                        setNotifications((prev) => ({ ...prev, communityUpdates: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveNotifications}
                  disabled={isSaving || !currentUser}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Notification Preferences'}</span>
                </button>
              </div>
            </div>
          )}

          {/* 4. ACCOUNT & PRIVACY SECTION */}
          {activeSection === 'account' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Account & Cloud Privacy</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Review your cloud credentials, export private phrasebooks, and control data privacy.
                </p>
              </div>

              {/* Status overview */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Account Status:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    {currentUser ? 'Active (Firebase Authenticated)' : 'Guest Session'}
                  </span>
                </div>
                {currentUser && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400">User ID (UID):</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">{currentUser.uid.slice(0, 16)}...</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400">Sign-in Provider:</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {currentUser.providerData?.[0]?.providerId || 'email/password'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400">Saved Cloud Phrases:</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{savedPhrases.length} items</span>
                    </div>
                  </>
                )}
              </div>

              {/* Export Data */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    Export Private Phrasebook
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Download a copy of all your saved translations in standard JSON format.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleExportPhrases}
                  disabled={savedPhrases.length === 0}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON ({savedPhrases.length})</span>
                </button>
              </div>

              {/* Log Out */}
              {currentUser && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => logOut()}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out of Account</span>
                  </button>
                </div>
              )}

              {/* Danger Zone: Clear Phrases / Delete Data */}
              {currentUser && (
                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Danger Zone</span>
                  </div>
                  <p className="text-xs text-rose-900 dark:text-rose-300">
                    Permanently delete all saved phrases from your private cloud storage. This action cannot be reversed.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All Saved Phrases</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Clearing Data */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Clear Saved Phrases?</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete all {savedPhrases.length} saved phrases from your account? This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  await clearAllSavedPhrases();
                  setShowDeleteModal(false);
                  setSaveSuccessNotice('All saved phrases cleared.');
                  setTimeout(() => setSaveSuccessNotice(''), 3000);
                }}
                className="flex-1 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
