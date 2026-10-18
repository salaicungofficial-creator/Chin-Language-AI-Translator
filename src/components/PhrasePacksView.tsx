import React, { useState, useRef } from 'react';
import {
  HeartPulse,
  Stethoscope,
  Pill,
  Scale,
  ShieldAlert,
  Search,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Bookmark,
  Printer,
  Info,
  AlertTriangle,
  RotateCcw,
  Languages,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  PHRASE_CATEGORIES,
  CLINICAL_LEGAL_PHRASES,
  ClinicalLegalPhrase,
  PhraseCategory,
  filterPhrases,
} from '../utils/phrase-pack-data.ts';
import { UserAccount } from './AuthModal.tsx';

interface PhrasePacksViewProps {
  user: UserAccount | null;
  onOpenAuth: () => void;
  onSavePhrase?: (phrase: {
    sourceText: string;
    targetText: string;
    sourceLang: string;
    targetLang: string;
  }) => void;
  onNavigateTranslator: () => void;
  onNavigateNotice: () => void;
}

export const PhrasePacksView: React.FC<PhrasePacksViewProps> = ({
  user,
  onOpenAuth,
  onSavePhrase,
  onNavigateTranslator,
  onNavigateNotice,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDialect, setActiveDialect] = useState<string>('cnh');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const dialectOptions = [
    { code: 'cnh', label: 'Hakha Chin (Lai)' },
    { code: 'cfm', label: 'Falam' },
    { code: 'ctd', label: 'Tedim (Zomi)' },
    { code: 'lus', label: 'Mizo' },
    { code: 'matu', label: 'Matu' },
    { code: 'mrh', label: 'Mara' },
    { code: 'cnh_cho', label: 'Mindat Cho' },
    { code: 'my', label: 'Burmese' },
  ];

  const filtered = filterPhrases(CLINICAL_LEGAL_PHRASES, searchQuery, selectedCategory);

  const getDialectText = (phrase: ClinicalLegalPhrase, dialectCode: string): string => {
    switch (dialectCode) {
      case 'cfm':
        return phrase.cfm;
      case 'ctd':
        return phrase.ctd;
      case 'lus':
        return phrase.lus;
      case 'matu':
        return phrase.matu;
      case 'mrh':
        return phrase.mrh;
      case 'cnh_cho':
        return phrase.cnh_cho;
      case 'my':
        return phrase.my;
      case 'cnh':
      default:
        return phrase.cnh;
    }
  };

  const handlePlayAudio = async (phrase: ClinicalLegalPhrase) => {
    if (playingId === phrase.id) return;
    setPlayingId(phrase.id);

    const textToSpeak = getDialectText(phrase, activeDialect);

    try {
      // 1. Try Gemini server-side TTS
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, language: activeDialect }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
          audioElementRef.current = audio;
          audio.onended = () => setPlayingId(null);
          audio.onerror = () => setPlayingId(null);
          await audio.play();
          return;
        }
      }

      // 2. Fallback to Web Speech API
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(textToSpeak);
        if (activeDialect === 'my') u.lang = 'my-MM';
        else u.lang = 'en-US';
        u.onend = () => setPlayingId(null);
        u.onerror = () => setPlayingId(null);
        window.speechSynthesis.speak(u);
      } else {
        setPlayingId(null);
      }
    } catch {
      setPlayingId(null);
    }
  };

  const handleCopyBilingual = (phrase: ClinicalLegalPhrase) => {
    const dialectText = getDialectText(phrase, activeDialect);
    const dialectName = dialectOptions.find((d) => d.code === activeDialect)?.label || 'Chin';
    const textToCopy = `English: ${phrase.english}\n${dialectName}: ${dialectText}\nPronunciation: "${phrase.pronunciationCnh}"\nContext: ${phrase.clinicalNote}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSave = (phrase: ClinicalLegalPhrase) => {
    if (!user) {
      onOpenAuth();
      return;
    }

    const dialectText = getDialectText(phrase, activeDialect);
    if (onSavePhrase) {
      onSavePhrase({
        sourceText: phrase.english,
        targetText: dialectText,
        sourceLang: 'en',
        targetLang: activeDialect,
      });

      setSavedIds((prev) => {
        const next = new Set(prev);
        if (next.has(phrase.id)) next.delete(phrase.id);
        else next.add(phrase.id);
        return next;
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 py-2">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 text-xs font-semibold">
          <HeartPulse className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          <span>Verified Clinic Triage, Pharmacy & Asylum Court Packs</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Medical Clinic & Legal Appointment Phrase Packs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Pre-verified, high-precision phrases across 9 Chin dialects for emergency rooms, pediatric visits, prescription dosages, and immigration asylum hearings.
        </p>
      </div>

      {/* Safety Notice Callout */}
      <div className="rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50/80 dark:bg-amber-950/40 p-4 text-xs text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-snug">
            <strong className="font-semibold text-amber-900 dark:text-amber-300">Life-Safety Notice:</strong> In acute life-threatening emergencies, call 911 immediately. Hospitals are legally mandated under Title VI to supply free, qualified human interpreters.
          </div>
        </div>
        <button
          type="button"
          onClick={onNavigateNotice}
          className="text-[11px] font-bold text-amber-900 dark:text-amber-300 hover:underline shrink-0 underline-offset-2"
        >
          Read Full Safety Notice →
        </button>
      </div>

      {/* Controls Bar: Search, Category Filters, Dialect Picker */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-4">
        {/* Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phrases (e.g., chest pain, fever, antibiotics, interpreter, asylum, rights)..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dialect Switcher Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="phrase-dialect-select" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Display Dialect:
            </label>
            <select
              id="phrase-dialect-select"
              value={activeDialect}
              onChange={(e) => setActiveDialect(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            >
              {dialectOptions.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.label}
                </option>
              ))}
            </select>

            {/* Print Card Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors"
              title="Print or Save Triage Summary"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline">Print Pack</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Packs ({CLINICAL_LEGAL_PHRASES.length})
          </button>
          {PHRASE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = CLINICAL_LEGAL_PHRASES.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cat.title}</span>
                <span className="text-[10px] opacity-80">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phrases List Grid */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No matching clinical or legal phrases found.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your search terms or select "All Packs".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((phrase) => {
              const dialectText = getDialectText(phrase, activeDialect);
              const dialectName = dialectOptions.find((d) => d.code === activeDialect)?.label || 'Chin';
              const isPlaying = playingId === phrase.id;
              const isCopied = copiedId === phrase.id;
              const isSaved = savedIds.has(phrase.id);

              return (
                <div
                  key={phrase.id}
                  className={`rounded-2xl border transition-all p-5 shadow-xs bg-white dark:bg-slate-900 space-y-3.5 ${
                    phrase.importance === 'critical'
                      ? 'border-rose-300/80 dark:border-rose-800/60 ring-1 ring-rose-200/50 dark:ring-rose-900/30'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Top Badge & Category */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          phrase.importance === 'critical'
                            ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                            : phrase.category === 'asylum-court' || phrase.category === 'police-rights'
                            ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                            : 'bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                        }`}
                      >
                        {phrase.importance === 'critical' ? 'Critical Triage' : phrase.category.replace('-', ' ')}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500 font-medium text-[11px]">
                        ID: {phrase.id}
                      </span>
                    </div>

                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Target: <strong className="text-slate-800 dark:text-slate-200">{dialectName}</strong>
                    </div>
                  </div>

                  {/* Primary English & Native Text */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                    {/* English Column */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        English (Clinical / Legal)
                      </span>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                        {phrase.english}
                      </p>
                    </div>

                    {/* Native Dialect Column */}
                    <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                          {dialectName} (Native Phrasing)
                        </span>
                        {phrase.importance === 'critical' && (
                          <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                            High Fidelity
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm md:text-base font-semibold text-slate-950 dark:text-white leading-relaxed ${
                          activeDialect === 'my' ? 'font-myanmar leading-loose' : ''
                        }`}
                      >
                        {dialectText}
                      </p>
                    </div>
                  </div>

                  {/* Phonetic Pronunciation Guide & Clinical Context Note */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div className="space-y-0.5 max-w-xl">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1.5">Pronunciation:</span>
                        <span className="font-mono text-blue-900 dark:text-blue-300">"{phrase.pronunciationCnh}"</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1.5">Clinical/Legal Note:</span>
                        <span>{phrase.clinicalNote}</span>
                      </div>
                    </div>

                    {/* Actions Toolbar */}
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      {/* Audio listen */}
                      <button
                        type="button"
                        onClick={() => handlePlayAudio(phrase)}
                        disabled={isPlaying}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                        title="Listen to pronunciation"
                      >
                        {isPlaying ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
                            <span className="text-blue-600 dark:text-blue-400">Playing...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>

                      {/* Copy bilingual */}
                      <button
                        type="button"
                        onClick={() => handleCopyBilingual(phrase)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                        title="Copy bilingual phrase card"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {/* Save to phrasebook */}
                      <button
                        type="button"
                        onClick={() => handleSave(phrase)}
                        className={`p-1.5 rounded-lg border transition-colors shadow-2xs ${
                          isSaved
                            ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        title={user ? 'Save to private phrasebook' : 'Sign in to save'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600 text-blue-600' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom CTA to Translator & Ask AI */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            Need a custom clinic or legal sentence translated?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Open the live translator to translate bespoke sentences with phonetic guides and dialect notes.
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateTranslator}
          className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
        >
          Open Live Translator
        </button>
      </div>
    </div>
  );
};
