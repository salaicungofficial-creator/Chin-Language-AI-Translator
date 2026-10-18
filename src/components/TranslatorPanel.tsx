import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeftRight,
  Copy,
  Check,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Info,
  Languages,
  BookOpen,
  ClipboardPaste,
  ShieldAlert,
  HeartPulse,
  Globe2,
  ExternalLink,
  Search,
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  LanguageOption,
  MAX_INPUT_CHARACTERS,
  TOTAL_LANGUAGES_COUNT,
  GOOGLE_TRANSLATE_LANGUAGES_COUNT,
  CHIN_DIALECTS_COUNT,
  containsMyanmarScript,
  swapLanguages,
  getLanguageName,
  getGoogleTranslateUrl,
  isGoogleTranslateSupported,
} from '../utils/translator-logic.ts';
import { DiacriticsBar } from './DiacriticsBar.tsx';
import { UserAccount } from './AuthModal.tsx';
import { LanguagePickerModal } from './LanguagePickerModal.tsx';
import { GoogleTranslateCompareModal } from './GoogleTranslateCompareModal.tsx';

interface TranslatorPanelProps {
  user: UserAccount | null;
  onOpenAuth: () => void;
  onSavePhrase?: (phrase: { sourceText: string; targetText: string; sourceLang: string; targetLang: string }) => void;
  onOpenNotice?: () => void;
  onOpenPhrasePacks?: () => void;
}

export const TranslatorPanel: React.FC<TranslatorPanelProps> = ({
  user,
  onOpenAuth,
  onSavePhrase,
  onOpenNotice,
  onOpenPhrasePacks,
}) => {
  const [sourceLang, setSourceLang] = useState<string>('cnh');
  const [targetLang, setTargetLang] = useState<string>('en');
  const [sourceText, setSourceText] = useState<string>('Na dam maw?');
  const [translatedText, setTranslatedText] = useState<string>('Hello / How are you?');
  const [pronunciationGuide, setPronunciationGuide] = useState<string>('Nah dahm maw?');
  const [confidence, setConfidence] = useState<'high' | 'medium' | 'low'>('high');
  const [linguisticNotes, setLinguisticNotes] = useState<string>(
    'Verified traditional Chin community dictionary match.'
  );
  const [alternativePhraisings, setAlternativePhraisings] = useState<string[]>([]);
  const [uncertaintyWarning, setUncertaintyWarning] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'helpful' | 'incorrect' | null>(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);
  const [correctionText, setCorrectionText] = useState<string>('');
  const [feedbackSuccessNotice, setFeedbackSuccessNotice] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Modals for Google Translate & Full Language Picker
  const [pickerMode, setPickerMode] = useState<'source' | 'target' | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Quick preset Chin and regional dialects & popular Google Translate languages
  const quickLangs = [
    { code: 'cnh', label: 'Hakha Lai' },
    { code: 'cfm', label: 'Falam' },
    { code: 'ctd', label: 'Tedim' },
    { code: 'lus', label: 'Mizo' },
    { code: 'matu', label: 'Matu' },
    { code: 'mrh', label: 'Mara' },
    { code: 'my', label: 'Burmese' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'vi', label: 'Vietnamese' },
    { code: 'th', label: 'Thai' },
    { code: 'tl', label: 'Tagalog' },
  ];

  // Quick preset sentences to try
  const samplePrompts = [
    { text: 'Na dam maw?', lang: 'cnh', target: 'en' },
    { text: 'Ka lungawi tuk hringhran', lang: 'cnh', target: 'en' },
    { text: 'Where is the nearest medical clinic?', lang: 'en', target: 'cnh' },
    { text: '¿Dónde está el hospital más cercano?', lang: 'es', target: 'cnh' },
    { text: 'မင်္ဂလာပါ', lang: 'my', target: 'cnh' },
  ];

  // Check if text is saved
  useEffect(() => {
    if (user && translatedText) {
      const exists = user.savedPhrases?.some(
        (p: { sourceText: string; targetText: string }) => p.sourceText === sourceText && p.targetText === translatedText
      );
      setIsSaved(!!exists);
    } else {
      setIsSaved(false);
    }
  }, [user, sourceText, translatedText]);

  // Handle Translate execution
  const handleTranslate = async (textToTranslate?: string) => {
    const text = textToTranslate !== undefined ? textToTranslate : sourceText;
    if (!text || text.trim().length === 0) {
      setErrorMessage('Please enter text to translate.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);
    setFeedbackGiven(null);
    setFeedbackSuccessNotice('');

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLang,
          targetLang,
          consentToStore: user?.consentToStore || false,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Translation request failed (${res.status})`);
      }

      const data = await res.json();
      setTranslatedText(data.translatedText || '');
      setConfidence(data.confidence || 'medium');
      setPronunciationGuide(data.pronunciationGuide || '');
      setAlternativePhraisings(data.alternativePhraisings || []);
      setLinguisticNotes(data.linguisticNotes || '');
      setUncertaintyWarning(data.uncertaintyWarning || '');
    } catch (err: any) {
      setErrorMessage(err.message || 'Translation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Swap source and target
  const handleSwap = () => {
    const { source, target } = swapLanguages(sourceLang, targetLang);
    setSourceLang(source);
    setTargetLang(target);
    const tempSource = sourceText;
    setSourceText(translatedText);
    setTranslatedText(tempSource);
    setPronunciationGuide('');
    setAlternativePhraisings([]);
    setLinguisticNotes('');
  };

  // Insert character from diacritics bar
  const handleInsertChar = (char: string) => {
    if (!textareaRef.current) {
      setSourceText((prev) => prev + char);
      return;
    }
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = sourceText;
    const newText = text.substring(0, start) + char + text.substring(end);
    setSourceText(newText);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + char.length, start + char.length);
      }
    }, 0);
  };

  // Copy text to clipboard
  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Paste text
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setSourceText(text);
      }
    } catch {
      // Ignore paste permissions error
    }
  };

  // Play Audio Pronunciation (TTS)
  const handlePlayAudio = async () => {
    if (!translatedText || isPlayingAudio) return;

    try {
      setIsPlayingAudio(true);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: translatedText,
          languageCode: targetLang,
        }),
      });

      if (!res.ok) {
        throw new Error('TTS not supported for this dialect yet');
      }

      const data = await res.json();
      if (data.audioData) {
        const audioSrc = `data:${data.mimeType || 'audio/mp3'};base64,${data.audioData}`;
        if (!audioElementRef.current) {
          audioElementRef.current = new Audio(audioSrc);
        } else {
          audioElementRef.current.src = audioSrc;
        }

        audioElementRef.current.onended = () => setIsPlayingAudio(false);
        audioElementRef.current.onerror = () => setIsPlayingAudio(false);
        await audioElementRef.current.play();
      } else {
        setIsPlayingAudio(false);
      }
    } catch {
      setIsPlayingAudio(false);
      // Browser SpeechSynthesis fallback
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(translatedText);
        if (targetLang === 'en') utterance.lang = 'en-US';
        else if (targetLang === 'es') utterance.lang = 'es-ES';
        else if (targetLang === 'my') utterance.lang = 'my-MM';
        else if (targetLang === 'fr') utterance.lang = 'fr-FR';
        else if (targetLang === 'zh-CN') utterance.lang = 'zh-CN';
        else utterance.lang = 'en-US';
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Handle Feedback
  const handleFeedback = async (isHelpful: boolean) => {
    setFeedbackGiven(isHelpful ? 'helpful' : 'incorrect');
    if (!isHelpful) {
      setCorrectionText('');
      setFeedbackModalOpen(true);
      return;
    }

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText: sourceText,
          translatedText,
          sourceLang,
          targetLang,
          isHelpful: true,
          rating: 5,
        }),
      });
      setFeedbackSuccessNotice('Thank you! Marked as helpful.');
      setTimeout(() => setFeedbackSuccessNotice(''), 3000);
    } catch {
      // Silent error
    }
  };

  const submitCorrection = async () => {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText: sourceText,
          translatedText,
          sourceLang,
          targetLang,
          isHelpful: false,
          suggestedCorrection: correctionText,
          rating: 1,
        }),
      });
      setFeedbackModalOpen(false);
      setFeedbackSuccessNotice('Correction submitted for community linguist review.');
      setTimeout(() => setFeedbackSuccessNotice(''), 4000);
    } catch {
      setFeedbackModalOpen(false);
    }
  };

  // Save Phrase
  const handleToggleBookmark = () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    if (onSavePhrase && sourceText && translatedText) {
      onSavePhrase({
        sourceText,
        targetText: translatedText,
        sourceLang,
        targetLang,
      });
      setIsSaved(!isSaved);
    }
  };

  const isBurmeseSource = containsMyanmarScript(sourceText) || sourceLang === 'my';
  const isBurmeseTarget = targetLang === 'my' || containsMyanmarScript(translatedText);

  // Filter groups for standard select dropdown
  const chinLanguages = SUPPORTED_LANGUAGES.filter((l) => l.category === 'chin');
  const popularLanguages = SUPPORTED_LANGUAGES.filter((l) => l.category === 'popular');
  const asiaPacificLanguages = SUPPORTED_LANGUAGES.filter((l) => l.category === 'asia-pacific');
  const europeLanguages = SUPPORTED_LANGUAGES.filter((l) => l.category === 'europe');
  const middleEastSouthAsiaLanguages = SUPPORTED_LANGUAGES.filter((l) => l.category === 'middle-east-south-asia');
  const africaAmericasLanguages = SUPPORTED_LANGUAGES.filter((l) => l.category === 'africa' || l.category === 'americas');

  return (
    <div className="space-y-6">
      {/* Google Translate & Community Trust Notice Banner */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/90 dark:bg-blue-950/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-blue-900 dark:text-blue-200 text-sm">
                Google Translate Supported (130+ Languages) + 9 Chin Dialects
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-200/80 dark:bg-blue-900/80 text-blue-900 dark:text-blue-300">
                140+ Total
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              Translate between world languages (Spanish, French, Vietnamese, Tagalog, Arabic, Ukrainian, etc.) and native Chin dialects (Hakha Lai, Falam, Tedim, Matu, Mara, Mindat Cho, Lautu, Zyphe).
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPickerMode('target')}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-2xs text-xs"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Browse 140+ Languages</span>
        </button>
      </div>

      {/* Quick Dialect & Language Selector Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full scrollbar-thin">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Quick:
          </span>
          {quickLangs.map((item) => {
            const isSelected = targetLang === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  if (sourceLang === item.code) {
                    handleSwap();
                  } else {
                    setTargetLang(item.code);
                    handleTranslate();
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setPickerMode('target')}
            className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center gap-1 shrink-0"
          >
            <span>+ 130 More</span>
          </button>
        </div>

        {/* Example prompts button */}
        <div className="hidden xl:flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <span className="text-slate-400 dark:text-slate-500">Try:</span>
          {samplePrompts.slice(0, 3).map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSourceLang(prompt.lang);
                setTargetLang(prompt.target);
                setSourceText(prompt.text);
                handleTranslate(prompt.text);
              }}
              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 hover:text-blue-900 dark:hover:text-blue-300 text-slate-600 dark:text-slate-300 transition-colors truncate max-w-[130px]"
            >
              {prompt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual Panels Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        {/* Language Selection Header Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60">
          {/* Source Lang Controls */}
          <div className="p-3.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <label htmlFor="source-lang-select" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
                From:
              </label>
              <select
                id="source-lang-select"
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs truncate max-w-[220px]"
              >
                <option value="auto">Auto-Detect Language</option>
                <optgroup label="Chin Indigenous Dialects (9)">
                  {chinLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Popular World Languages (Google Translate)">
                  {popularLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Asia & Pacific (Google Translate)">
                  {asiaPacificLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Europe (Google Translate)">
                  {europeLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Middle East & South Asia (Google Translate)">
                  {middleEastSouthAsiaLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Africa & Americas (Google Translate)">
                  {africaAmericasLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
              </select>

              {/* Quick Search Dialog Trigger */}
              <button
                type="button"
                onClick={() => setPickerMode('source')}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                title="Search all 140+ languages"
                aria-label="Search all languages for source"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
            {sourceText && (
              <button
                type="button"
                onClick={() => {
                  setSourceText('');
                  setTranslatedText('');
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-medium flex items-center gap-1 shrink-0"
                title="Clear input text"
                aria-label="Clear source text"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>

          {/* Swap & Target Lang Controls */}
          <div className="p-3.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap source and target languages"
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs transition-colors shrink-0"
                title="Swap languages"
              >
                <ArrowLeftRight className="w-4 h-4 text-blue-900 dark:text-blue-400" />
              </button>
              <label htmlFor="target-lang-select" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
                To:
              </label>
              <select
                id="target-lang-select"
                value={targetLang}
                onChange={(e) => {
                  setTargetLang(e.target.value);
                  handleTranslate();
                }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs truncate max-w-[220px]"
              >
                <optgroup label="Chin Indigenous Dialects (9)">
                  {chinLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Popular World Languages (Google Translate)">
                  {popularLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Asia & Pacific (Google Translate)">
                  {asiaPacificLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Europe (Google Translate)">
                  {europeLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Middle East & South Asia (Google Translate)">
                  {middleEastSouthAsiaLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Africa & Americas (Google Translate)">
                  {africaAmericasLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </optgroup>
              </select>

              {/* Quick Search Dialog Trigger */}
              <button
                type="button"
                onClick={() => setPickerMode('target')}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                title="Search all 140+ languages"
                aria-label="Search all languages for target"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Confidence Badge */}
            {translatedText && (
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    confidence === 'high'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : confidence === 'medium'
                      ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      : 'bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                  }`}
                  title={
                    confidence === 'high'
                      ? 'High Confidence: Standard vocabulary'
                      : 'Medium Confidence: Dialect variations may apply'
                  }
                >
                  {confidence === 'high'
                    ? '● High'
                    : confidence === 'medium'
                    ? '▲ Review'
                    : '■ Low'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Dual Input/Output Textareas */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 min-h-[260px]">
          {/* Source Text Area */}
          <div className="flex flex-col p-4 relative bg-white dark:bg-slate-900">
            <textarea
              ref={textareaRef}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text to translate (supports 130+ Google Translate languages and 9 Chin dialects)..."
              rows={7}
              className={`w-full flex-1 resize-none bg-transparent text-slate-900 dark:text-white text-base md:text-lg focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                isBurmeseSource ? 'font-myanmar text-base' : ''
              }`}
              maxLength={MAX_INPUT_CHARACTERS}
            />
            {/* Bottom bar of source area */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>Paste</span>
                </button>
              </div>
              <div className="font-mono text-slate-400 dark:text-slate-500 tabular-nums">
                {sourceText.length} / {MAX_INPUT_CHARACTERS}
              </div>
            </div>
          </div>

          {/* Target / Output Text Area */}
          <div className="flex flex-col p-4 relative bg-slate-50/50 dark:bg-slate-950/40">
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400 space-y-3">
                <div className="w-8 h-8 border-3 border-blue-900 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-400">
                  Translating with Chin AI & Polyglot Model...
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Bridging Google Translate world languages with Chin indigenous dialects
                </p>
              </div>
            ) : translatedText ? (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div
                    className={`text-slate-900 dark:text-slate-100 text-base md:text-lg font-medium whitespace-pre-wrap select-text ${
                      isBurmeseTarget ? 'font-myanmar text-lg leading-relaxed' : ''
                    }`}
                  >
                    {translatedText}
                  </div>

                  {/* Pronunciation guide card */}
                  {pronunciationGuide && (
                    <div className="mt-3 p-2.5 rounded-lg bg-blue-50/80 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-xs">
                      <span className="font-semibold text-blue-900 dark:text-blue-300 mr-1.5 uppercase tracking-wider text-[10px]">
                        Pronunciation Guide:
                      </span>
                      <span className="font-mono text-blue-950 dark:text-blue-200 font-medium">
                        "{pronunciationGuide}"
                      </span>
                    </div>
                  )}

                  {/* Linguistic Notes */}
                  {linguisticNotes && (
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                      <span>{linguisticNotes}</span>
                    </div>
                  )}

                  {/* Uncertainty Warning */}
                  {uncertaintyWarning && (
                    <div className="mt-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>{uncertaintyWarning}</span>
                    </div>
                  )}

                  {/* Alternative suggestions */}
                  {alternativePhraisings && alternativePhraisings.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Alternative Dialect Phrasings:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {alternativePhraisings.map((alt, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs"
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Short Warning Near Results */}
                  <div className="mt-3.5 p-3 rounded-xl bg-amber-50/95 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/80 text-xs text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-2xs">
                    <div className="flex items-start gap-2 leading-relaxed">
                      <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-bold text-amber-950 dark:text-amber-200">Important Medical & Legal Notice:</strong> Do not rely solely on automated translations for medical emergencies, medication dosage instructions, asylum hearings, or legal contracts without qualified verification.
                      </span>
                    </div>
                    {onOpenNotice && (
                      <button
                        type="button"
                        onClick={onOpenNotice}
                        className="text-[11px] font-bold text-amber-900 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 hover:underline shrink-0 underline-offset-2 whitespace-nowrap flex items-center gap-1"
                      >
                        <span>Official Notice</span>
                        <span>→</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom toolbar for translated result */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Speak / Audio */}
                    <button
                      type="button"
                      onClick={handlePlayAudio}
                      disabled={isPlayingAudio}
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs transition-colors flex items-center gap-1.5 text-xs font-semibold"
                      title="Listen to pronunciation"
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                          <span className="text-blue-700 dark:text-blue-300">Playing...</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>

                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs transition-colors flex items-center gap-1.5 text-xs font-semibold"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-700 dark:text-emerald-300">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {/* Save to Phrasebook */}
                    <button
                      type="button"
                      onClick={handleToggleBookmark}
                      className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-2xs ${
                        isSaved
                          ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700'
                      }`}
                      title={user ? 'Save to private phrasebook' : 'Sign in to save'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-700 text-blue-700 dark:fill-blue-400 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>

                    {/* Google Translate Direct Cross-Reference Button */}
                    <a
                      href={getGoogleTranslateUrl(sourceText, sourceLang, targetLang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-800 dark:text-blue-300 shadow-2xs transition-colors flex items-center gap-1.5 text-xs font-semibold"
                      title="Open query directly in Google Translate"
                    >
                      <Globe2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Google Translate</span>
                      <ExternalLink className="w-3 h-3 text-blue-500" />
                    </a>

                    {/* Compare Modal Button */}
                    <button
                      type="button"
                      onClick={() => setIsCompareModalOpen(true)}
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-2xs transition-colors"
                      title="Compare Chin AI with Google Translate"
                    >
                      Compare
                    </button>
                  </div>

                  {/* Feedback: Helpful / Incorrect */}
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 mr-1 hidden sm:inline">Feedback:</span>
                    <button
                      type="button"
                      onClick={() => handleFeedback(true)}
                      className={`p-1.5 rounded-lg border transition-colors text-xs flex items-center gap-1 ${
                        feedbackGiven === 'helpful'
                          ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 font-semibold'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      title="This translation is helpful"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="hidden sm:inline">Helpful</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFeedback(false)}
                      className={`p-1.5 rounded-lg border transition-colors text-xs flex items-center gap-1 ${
                        feedbackGiven === 'incorrect'
                          ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700 font-semibold'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      title="Report incorrect translation"
                    >
                      <ThumbsDown className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      <span className="hidden sm:inline">Incorrect</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-500 text-center">
                <Globe2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-2 stroke-1" />
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Translation will appear here</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
                  Supports 130+ Google Translate languages + 9 indigenous Chin dialects.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Diacritics insertion strip for Chin/Mizo orthography */}
        <DiacriticsBar onInsertChar={handleInsertChar} targetLang={sourceLang} />

        {/* Error message banner */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/80 border-t border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success message banner */}
        {feedbackSuccessNotice && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border-t border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{feedbackSuccessNotice}</span>
          </div>
        )}

        {/* Bottom Prominent Translate Action Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
            <span>Powered by <strong className="text-slate-800 dark:text-slate-200">Gemini 3.8 Flash</strong> · 140+ Languages Supported</span>
            {onOpenPhrasePacks && (
              <>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">·</span>
                <button
                  type="button"
                  onClick={onOpenPhrasePacks}
                  className="text-blue-700 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>Clinic & Legal Packs</span>
                </button>
              </>
            )}
            {onOpenNotice && (
              <>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">·</span>
                <button
                  type="button"
                  onClick={onOpenNotice}
                  className="text-amber-800 dark:text-amber-400 hover:underline font-medium"
                >
                  Official Notice
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleTranslate()}
            disabled={isLoading || !sourceText.trim()}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Translating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-400 dark:text-white group-hover:rotate-12 transition-transform" />
                <span>Translate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Suggest Correction Modal */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Suggest a Better Translation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Help our Chin language community linguists improve the accuracy for{' '}
              <strong className="text-slate-700 dark:text-slate-300">{getLanguageName(targetLang)}</strong>.
            </p>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
              <p className="text-slate-400 dark:text-slate-500 uppercase text-[10px] font-semibold">Original:</p>
              <p className="font-medium text-slate-800 dark:text-slate-200">{sourceText}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Your Suggested Translation / Correction:
              </label>
              <textarea
                value={correctionText}
                onChange={(e) => setCorrectionText(e.target.value)}
                placeholder="Write the correct or more natural phrasing..."
                rows={3}
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setFeedbackModalOpen(false)}
                className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitCorrection}
                className="flex-1 py-2 rounded-lg bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white text-xs font-semibold shadow-xs"
              >
                Submit Correction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Picker Modal for 140+ Languages */}
      <LanguagePickerModal
        isOpen={pickerMode !== null}
        onClose={() => setPickerMode(null)}
        selectedCode={pickerMode === 'source' ? sourceLang : targetLang}
        onSelectLanguage={(code) => {
          if (pickerMode === 'source') {
            setSourceLang(code);
          } else {
            setTargetLang(code);
            handleTranslate();
          }
        }}
        title={pickerMode === 'source' ? 'Select Source Language' : 'Select Target Language'}
        allowAuto={pickerMode === 'source'}
      />

      {/* Google Translate Comparison Modal */}
      <GoogleTranslateCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        sourceText={sourceText}
        translatedText={translatedText}
        sourceLang={sourceLang}
        targetLang={targetLang}
        pronunciationGuide={pronunciationGuide}
        linguisticNotes={linguisticNotes}
      />
    </div>
  );
};
