import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, EyeOff, CheckCircle2, FileText, HeartHandshake } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Trust & Privacy Commitment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy & Disclaimers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          We believe high-quality translation tools for Chin communities must respect your privacy, dignity, and personal communication.
        </p>
      </div>

      {/* Critical Medical & Legal Disclaimer Banner */}
      <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border-2 border-amber-200/80 dark:border-amber-700/60 space-y-2 text-amber-950 dark:text-amber-200">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
          <h3 className="font-bold text-sm text-amber-900 dark:text-amber-300 uppercase tracking-wide">
            Important Medical, Legal & Official Notice
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-amber-900 dark:text-amber-200">
          Translations provided by this application are generated through artificial intelligence models designed for language assistance and cultural communication. Automated translations can contain dialect nuances, ambiguities, or inaccuracies.
        </p>
        <p className="text-xs leading-relaxed font-semibold text-amber-900 dark:text-amber-300">
          Do not rely solely on automated translations for medical emergencies, dosage instructions, asylum hearings, legal contracts, or official government documents without verification by a certified human Chin interpreter.
        </p>
      </div>

      {/* Core Privacy Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center">
            <EyeOff className="w-5 h-5 text-blue-700 dark:text-blue-400" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">No Data Retention Without Consent</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            By default, your translation queries are processed in memory and immediately discarded. We never log or store your private text on our servers unless you explicitly toggle the <em>"Save translation history"</em> option in your authenticated account settings.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Free-First Principle</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Chin Language AI Translator is completely free to use. There are no subscriptions, paywalls, credit card requirements, or artificial usage limits on core community translation features.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center">
            <Lock className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Server-Side Security</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            All AI API credentials and security keys are strictly managed on the protected backend server. No API secrets are exposed to the client browser, safeguarding against key theft and tampering.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-700 dark:text-purple-400" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Community Volunteer Feedback</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            When you choose to report an incorrect translation or submit a phrase improvement via the Feedback form, only the submitted phrase and your suggestion are reviewed by community linguists to refine dialect models.
          </p>
        </div>
      </div>

      {/* Account & 2FA Security Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Account Safety & Two-Factor Authentication</h2>
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            When logging in with a Google account or phone number, Two-Factor Authentication (2FA) verification adds a crucial second layer of security. This prevents unauthorized access to any saved phrases or account preferences.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">No Selling of Personal Data</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">We do not sell user data, contacts, or translation logs to third-party ad brokers.</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Right to Delete</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">You can erase all your saved phrases and profile information at any time in one click.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
