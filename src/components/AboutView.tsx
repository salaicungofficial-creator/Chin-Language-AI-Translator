import React from 'react';
import { BookOpen, Globe2, ShieldCheck, Heart, Sparkles, Languages, CheckCircle2, MapPin } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/translator-logic.ts';

export const AboutView: React.FC = () => {
  const chinLanguages = SUPPORTED_LANGUAGES.filter((l) => l.isChinOrRegional);

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Indigenous Language Preservation & AI Access</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About Chin Language AI Translator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Bridging communication for Chin communities across western Myanmar (Hakha, Falam, Tedim, Matupi, Mindat, Kanpetlet, Thantlang), Mizoram (India), and the global diaspora in the United States, Malaysia, Australia, and Europe.
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center">
            <Heart className="w-5 h-5 text-blue-700 dark:text-blue-400" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Community-Centered</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Built directly for Chin families, church elders, students, refugees, and healthcare navigators who require accurate, culturally respectful translation.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
            <Globe2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">9 Chin Dialects Supported</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Mainstream translation engines overlook or conflate Chin languages. We support Hakha Lai, Falam, Tedim, Mizo, Matu, Mara, Mindat Cho, Lautu, and Zyphe.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Clinic & Legal Focus</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Specialized phrase packs and prompt safeguards designed to prevent medical misdosages and court translation errors.
          </p>
        </div>
      </div>

      {/* Detailed Dialects Overview */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Supported Chin & Regional Dialects</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            The Chin peoples encompass diverse ethnolinguistic groups across western Myanmar and border regions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chinLanguages.map((lang) => (
            <div
              key={lang.code}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{lang.name}</h4>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100/70 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                  {lang.nativeName}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{lang.description}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400 dark:text-slate-500">
                <span>Family: {lang.family || 'Kuki-Chin'}</span>
                <span>·</span>
                <span>Region: {lang.region || 'Chin State'}</span>
                <span>·</span>
                <span>Script: {lang.script.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Translate 130+ Languages Interoperability */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            G
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Full Google Translate Interoperability (130+ Languages)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cross-dialect translation connecting the Chin diaspora with every corner of the world.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          While traditional machine translation tools such as Google Translate support major world languages (Spanish, French, German, Japanese, Korean, Vietnamese, Thai, Tagalog, Ukrainian, Arabic, Hindi, etc.), they lack fine-grained coverage for indigenous Chin languages. This app integrates Google Translate's full 130+ language catalog and pairs it with specialized community-verified Chin linguistic models, enabling direct translation between any Chin dialect and global languages.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 text-center">
            130+ World Languages
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 text-center">
            9 Chin Dialects
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 text-center">
            1-Click Google Web Sync
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 text-center">
            Side-by-Side Compare
          </div>
        </div>
      </div>

      {/* Unicode & Linguistic Technology */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Languages className="w-5 h-5 text-blue-800 dark:text-blue-400" />
          <span>Unicode & Orthography Standards</span>
        </h2>
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Chin languages employ both Latin alphabets and standard Myanmar Unicode (Padauk / Noto Sans Myanmar). In Latin orthography, Chin and Mizo use distinct glottal markings, tones, and special consonants such as <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-800 dark:text-blue-300 font-bold">ṭ</code> (retroflex t), <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-800 dark:text-blue-300 font-bold">th</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-800 dark:text-blue-300 font-bold">aw</code>, and vowel accents (<code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-800 dark:text-blue-300 font-bold">â, ê, î, ô, û</code>).
          </p>
          <p>
            Our interface is built with native Unicode compliance, preventing broken font encoding (such as legacy Zawgyi font overlap) and guaranteeing readability on both smartphones and desktop computers.
          </p>
        </div>
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Strict Standard Unicode 15.0</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Mobile-First Touchscreen Diacritics</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>High-Contrast Dark Mode for Night Reading</span>
          </div>
        </div>
      </div>
    </div>
  );
};
