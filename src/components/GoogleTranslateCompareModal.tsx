import React from 'react';
import {
  ExternalLink,
  Globe2,
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import {
  getGoogleTranslateUrl,
  getLanguageName,
  isGoogleTranslateSupported,
} from '../utils/translator-logic.ts';

interface GoogleTranslateCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  pronunciationGuide?: string;
  linguisticNotes?: string;
}

export const GoogleTranslateCompareModal: React.FC<GoogleTranslateCompareModalProps> = ({
  isOpen,
  onClose,
  sourceText,
  translatedText,
  sourceLang,
  targetLang,
  pronunciationGuide,
  linguisticNotes,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const googleTranslateUrl = getGoogleTranslateUrl(sourceText, sourceLang, targetLang);
  const isTargetGoogleSupported = isGoogleTranslateSupported(targetLang);
  const isSourceGoogleSupported = isGoogleTranslateSupported(sourceLang);

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="compare-modal-title" className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Google Translate Cross-Reference</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                  130+ Languages
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare Chin specialized AI with Google Translate
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close comparison modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          {/* Language Pair Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {getLanguageName(sourceLang)}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-blue-700 dark:text-blue-400">
                {getLanguageName(targetLang)}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {sourceText.length} characters
            </div>
          </div>

          {/* Chin Language AI Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Chin AI Specialized Engine:
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 text-slate-900 dark:text-white text-base font-medium leading-relaxed">
              {translatedText || 'No translation yet.'}
            </div>
            {pronunciationGuide && (
              <div className="text-xs text-blue-800 dark:text-blue-300 font-mono">
                Pronunciation: "{pronunciationGuide}"
              </div>
            )}
            {linguisticNotes && (
              <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                {linguisticNotes}
              </div>
            )}
          </div>

          {/* Google Translate Integration Box */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-xs">
                  G
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Google Translate Official Bridge
                </h3>
              </div>
              {isTargetGoogleSupported ? (
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Directly Supported in Google
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                  Chin Indigenous AI Exclusive
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isTargetGoogleSupported
                ? `Google Translate natively supports ${getLanguageName(targetLang)}. You can open this exact query in Google Translate with one click to verify with Google's cloud neural translator.`
                : `${getLanguageName(targetLang)} is an indigenous Chin dialect with limited or no support in standard Google Translate. Our specialized Chin linguistics AI models bridge this critical gap for the Chin community.`}
            </p>

            <a
              href={googleTranslateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm shadow-blue-500/20"
            >
              <span>Open in Google Translate</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Linguistic Heritage Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Full 130+ Google Translate + 9 Chin Dialects Interoperability</span>
            </div>
            <p className="leading-relaxed">
              You can translate interchangeably between any of Google Translate's 130+ world languages (Spanish, Vietnamese, French, Arabic, German, Russian, Thai, Japanese, Korean, Hindi, etc.) and our 9 native Chin dialects (Hakha, Falam, Tedim, Mizo, Matu, Mara, Mindat Cho, Lautu, Zyphe).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
