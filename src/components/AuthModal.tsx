import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  User,
  Languages,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { SUPPORTED_LANGUAGES } from '../utils/translator-logic.ts';

export interface UserAccount {
  name: string;
  email?: string;
  phone?: string;
  authMethod: 'google' | 'phone';
  is2FAVerified: boolean;
  twoFactorType: 'sms' | 'authenticator';
  consentToStore: boolean;
  savedPhrases: Array<{
    id: string;
    sourceText: string;
    targetText: string;
    sourceLang: string;
    targetLang: string;
    date: string;
  }>;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
}) => {
  const {
    currentUser,
    userProfile,
    authError,
    clearAuthError,
    signUpWithEmail,
    logInWithEmail,
    logInWithGoogle,
    logOut,
    isLoading,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [preferredDialect, setPreferredDialect] = useState('cnh');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  if (!isOpen) return null;

  const chinDialects = SUPPORTED_LANGUAGES.filter((l) => l.isChinOrRegional);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearAuthError();

    if (!email.trim() || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    if (mode === 'signup' && password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password, displayName, preferredDialect);
      } else {
        await logInWithEmail(email, password);
      }
      onClose();
    } catch {
      // Error handled in AuthContext
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalError('');
    clearAuthError();
    try {
      await logInWithGoogle();
      onClose();
    } catch {
      // Error handled in AuthContext
    }
  };

  // If already logged in, show user info & quick links
  if (currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900 dark:bg-blue-600 text-white flex items-center justify-center font-bold text-base">
                {(userProfile?.displayName || currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {userProfile?.displayName || currentUser.displayName || 'Chin Community Member'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{currentUser.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  Authenticated Account
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                  Your translations and phrasebook are securely synced to Google Cloud Firestore.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {onOpenSettings && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSettings();
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Open Account & Profile Settings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={async () => {
                  await logOut();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-900 dark:bg-blue-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-blue-300 dark:text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {mode === 'login' ? 'Sign In to Account' : 'Create Chin AI Account'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Secure cloud storage for translations & phrase packs
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setLocalError('');
                clearAuthError();
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setLocalError('');
                clearAuthError();
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Notice */}
          {(localError || authError) && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{localError || authError}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Your Full Name:
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Salai Van Bik / Mary Ni"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3 py-2 pr-10 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Primary Chin Dialect:
                </label>
                <select
                  value={preferredDialect}
                  onChange={(e) => setPreferredDialect(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  {chinDialects.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{mode === 'login' ? 'Log In' : 'Create My Account'}</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-3">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            <span className="absolute bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400">
              OR
            </span>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-3 transition-colors shadow-2xs disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};
