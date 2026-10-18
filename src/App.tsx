import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { TranslatorPanel } from './components/TranslatorPanel.tsx';
import { PhrasePacksView } from './components/PhrasePacksView.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import { AboutView } from './components/AboutView.tsx';
import { FeedbackView } from './components/FeedbackView.tsx';
import { PrivacyView } from './components/PrivacyView.tsx';
import { ContactView } from './components/ContactView.tsx';
import { Footer } from './components/Footer.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { AskAIView } from './components/AskAIView.tsx';
import { MonetizationDashboard } from './components/MonetizationDashboard.tsx';
import { DisplayAdSlot } from './components/DisplayAdSlot.tsx';
import { OfficialNoticeView } from './components/OfficialNoticeView.tsx';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Languages,
  ArrowRight,
  HeartPulse,
  Scale,
  GraduationCap,
  Lightbulb,
  DollarSign,
  AlertTriangle,
  Moon,
  Sun,
  Settings,
} from 'lucide-react';

function AppContent() {
  const { currentUser, userProfile, savePhraseToCloud } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'translator' | 'phrase-packs' | 'ask-ai' | 'monetize' | 'about' | 'feedback' | 'privacy' | 'contact' | 'notice' | 'settings'
  >('translator');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // High-Contrast Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('chin_dark_mode');
      if (savedTheme !== null) {
        return savedTheme === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply dark class to document element on toggle
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('chin_dark_mode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('chin_dark_mode', 'false');
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [isDarkMode]);

  // Sync profile appearance if set
  useEffect(() => {
    if (userProfile?.appearance) {
      if (userProfile.appearance === 'dark') setIsDarkMode(true);
      else if (userProfile.appearance === 'light') setIsDarkMode(false);
    }
  }, [userProfile?.appearance]);

  const toggleDarkMode = (mode?: 'light' | 'dark' | 'system') => {
    if (mode === 'dark') setIsDarkMode(true);
    else if (mode === 'light') setIsDarkMode(false);
    else if (mode === 'system') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } else {
      setIsDarkMode((prev) => !prev);
    }
  };

  const handleNavigate = (
    tab: 'translator' | 'phrase-packs' | 'ask-ai' | 'monetize' | 'about' | 'feedback' | 'privacy' | 'contact' | 'notice' | 'settings'
  ) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save phrase handler - saves to cloud when authenticated
  const handleSavePhrase = (phrase: {
    sourceText: string;
    targetText: string;
    sourceLang: string;
    targetLang: string;
    category?: string;
  }) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    savePhraseToCloud(phrase);
  };

  // Convert Firebase user to backward-compatible format for existing subcomponents
  const legacyUser = currentUser
    ? {
        name: userProfile?.displayName || currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
        email: currentUser.email || undefined,
        is2FAVerified: true,
        authMethod: 'google' as const,
        twoFactorType: 'authenticator' as const,
        consentToStore: true,
        savedPhrases: [],
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 dark:bg-black text-slate-300 text-[11px] py-1.5 px-4 text-center border-b border-slate-800 flex flex-wrap items-center justify-center gap-2">
        <span className="font-semibold text-blue-400">Chin Language AI Translator</span>
        <span className="text-slate-600 hidden sm:inline">·</span>
        <span>Secure Firebase Auth · User Settings & Notifications · 9 Chin Dialects</span>
        <span className="text-slate-600 hidden md:inline">·</span>
        <button
          type="button"
          onClick={() => handleNavigate('notice')}
          className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
        >
          Medical & Legal Notice
        </button>
      </div>

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'translator' && (
          <div className="space-y-6">
            {/* Top Display Ad Leaderboard */}
            <DisplayAdSlot
              slotId="slot-header-leaderboard"
              onOpenMonetizationPortal={() => handleNavigate('monetize')}
            />

            {/* Hero Intro */}
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Chin Language AI Translator
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Fast, reliable translation preserving indigenous dialects, respectful honorifics, and cultural nuance across Hakha Chin (Lai), Falam, Tedim, Mizo, Matu, Mara, Mindat Cho, and more.
              </p>
            </div>

            {/* Translator Dual Panes */}
            <TranslatorPanel
              user={legacyUser}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onSavePhrase={handleSavePhrase}
              onOpenNotice={() => handleNavigate('notice')}
              onOpenPhrasePacks={() => handleNavigate('phrase-packs')}
            />

            {/* Feature Spotlight: Medical Clinic & Legal Appointment Phrase Packs */}
            <div className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-gradient-to-r from-rose-50 via-white to-indigo-50 dark:from-slate-900 dark:via-rose-950/20 dark:to-slate-900 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span>Essential Healthcare & Legal Access</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Medical Clinic & Legal Appointment Phrase Packs
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Verified emergency triage statements, pediatric fever guides, prescription dosage schedules, and asylum court declarations ready in 9 Chin dialects with 1-click audio and bilingual copy.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavigate('phrase-packs')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 shrink-0"
              >
                <span>Browse Phrase Packs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mid-Content Native Ad Slot */}
            <DisplayAdSlot
              slotId="slot-mid-native"
              onOpenMonetizationPortal={() => handleNavigate('monetize')}
            />

            {/* Key Features Callout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center shrink-0">
                  <Languages className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">9 Indigenous Dialects</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Designed to support Hakha Chin, Falam, Tedim, Mizo, Matu, Mara, Mindat Cho, Lautu, and Zyphe with phonetic guides.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Secure Cloud Storage</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Google Cloud Firebase authentication, encrypted user profiles, and private phrasebook storage.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4 text-purple-700 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Customizable Settings</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Manage profile dialects, notification preferences, font sizing, and appearance themes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'phrase-packs' && (
          <PhrasePacksView
            user={legacyUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onSavePhrase={handleSavePhrase}
            onNavigateTranslator={() => handleNavigate('translator')}
            onNavigateNotice={() => handleNavigate('notice')}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onNavigateTranslator={() => handleNavigate('translator')}
            onNavigateNotice={() => handleNavigate('notice')}
          />
        )}

        {activeTab === 'ask-ai' && <AskAIView onNavigateContact={() => handleNavigate('contact')} />}
        {activeTab === 'monetize' && <MonetizationDashboard />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'feedback' && <FeedbackView />}
        {activeTab === 'privacy' && <PrivacyView />}
        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'notice' && (
          <OfficialNoticeView
            onNavigateTranslator={() => handleNavigate('translator')}
            onNavigateContact={() => handleNavigate('contact')}
            onNavigatePhrasePacks={() => handleNavigate('phrase-packs')}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onOpenSettings={() => handleNavigate('settings')}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
