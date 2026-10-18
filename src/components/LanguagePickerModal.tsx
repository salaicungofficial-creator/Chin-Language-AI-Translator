import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Globe2,
  Check,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  LanguageOption,
  TOTAL_LANGUAGES_COUNT,
  GOOGLE_TRANSLATE_LANGUAGES_COUNT,
  CHIN_DIALECTS_COUNT,
} from '../utils/translator-logic.ts';

interface LanguagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCode: string;
  onSelectLanguage: (code: string) => void;
  title: string;
  allowAuto?: boolean;
}

type CategoryTab =
  | 'all'
  | 'chin'
  | 'google'
  | 'popular'
  | 'asia-pacific'
  | 'europe'
  | 'middle-east-south-asia'
  | 'africa'
  | 'americas';

export const LanguagePickerModal: React.FC<LanguagePickerModalProps> = ({
  isOpen,
  onClose,
  selectedCode,
  onSelectLanguage,
  title,
  allowAuto = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');

  // Filter languages based on search and active tab
  const filteredLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return SUPPORTED_LANGUAGES.filter((lang) => {
      // 1. Tab filter
      if (activeTab === 'chin' && lang.category !== 'chin') return false;
      if (activeTab === 'google' && !lang.isGoogleTranslateSupported) return false;
      if (activeTab === 'popular' && lang.category !== 'popular' && lang.category !== 'chin') return false;
      if (
        activeTab !== 'all' &&
        activeTab !== 'chin' &&
        activeTab !== 'google' &&
        activeTab !== 'popular' &&
        lang.category !== activeTab
      ) {
        return false;
      }

      // 2. Search query filter
      if (!q) return true;
      return (
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q) ||
        (lang.region && lang.region.toLowerCase().includes(q)) ||
        (lang.family && lang.family.toLowerCase().includes(q)) ||
        (lang.description && lang.description.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activeTab]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-picker-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            </div>
            <div>
              <h2 id="language-picker-title" className="text-lg font-bold text-slate-900 dark:text-white">
                {title}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {TOTAL_LANGUAGES_COUNT} Languages Available
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                  {GOOGLE_TRANSLATE_LANGUAGES_COUNT} Google Translate
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                  {CHIN_DIALECTS_COUNT} Chin Dialects
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close language selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by language (e.g. Spanish, Hakha Chin, Tagalog, မြန်မာ, Ukrainian, ru)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-thin">
            {[
              { id: 'all', label: `All (${TOTAL_LANGUAGES_COUNT})` },
              { id: 'chin', label: `Chin Dialects (${CHIN_DIALECTS_COUNT})` },
              { id: 'google', label: `Google Translate (${GOOGLE_TRANSLATE_LANGUAGES_COUNT})` },
              { id: 'popular', label: 'Popular' },
              { id: 'asia-pacific', label: 'Asia & Pacific' },
              { id: 'europe', label: 'Europe' },
              { id: 'middle-east-south-asia', label: 'Mid-East & S. Asia' },
              { id: 'africa', label: 'Africa' },
              { id: 'americas', label: 'Americas' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as CategoryTab)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Auto-detect option if allowed */}
          {allowAuto && !searchQuery && activeTab === 'all' && (
            <div className="mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  onSelectLanguage('auto');
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                  selectedCode === 'auto'
                    ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/50'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      Detect Language (Auto)
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Automatically detects 140+ languages and Chin dialects
                    </div>
                  </div>
                </div>
                {selectedCode === 'auto' && (
                  <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            </div>
          )}

          {filteredLanguages.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Globe2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No languages found matching "{searchQuery}"
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Try searching by common English name, native script, or ISO language code.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredLanguages.map((lang) => {
                const isSelected = selectedCode === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onSelectLanguage(lang.code);
                      onClose();
                    }}
                    className={`text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-50/90 dark:bg-blue-950/60 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 shadow-2xs'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {lang.name}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                          {lang.code}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {lang.nativeName}
                      </div>

                      {/* Badges */}
                      <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                        {lang.isChinOrRegional && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Chin Indigenous</span>
                          </span>
                        )}
                        {lang.isGoogleTranslateSupported && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900">
                            Google Translate
                          </span>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>
              Supports <strong>130+ Google Translate languages</strong> + <strong>9 indigenous Chin dialects</strong>.
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
