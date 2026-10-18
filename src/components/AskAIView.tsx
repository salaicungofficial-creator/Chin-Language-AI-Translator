import React, { useState } from 'react';
import {
  Sparkles,
  HeartPulse,
  GraduationCap,
  Lightbulb,
  Send,
  HelpCircle,
  Copy,
  Check,
  Volume2,
  VolumeX,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { ASK_AI_CATEGORIES, AskAICategory } from '../utils/ask-ai-logic.ts';
import { DiacriticsBar } from './DiacriticsBar.tsx';
import { CommunityAdBanner } from './CommunityAdBanner.tsx';

interface AskAIViewProps {
  onNavigateContact?: () => void;
}

export const AskAIView: React.FC<AskAIViewProps> = ({ onNavigateContact }) => {
  const [activeCategory, setActiveCategory] = useState<'health' | 'education' | 'ideas' | 'all'>('health');
  const [prompt, setPrompt] = useState<string>(
    'How do I tell an English doctor that my child has a fever and stomach ache in Hakha Chin?'
  );
  const [preferredLang, setPreferredLang] = useState<string>('cnh');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseResult, setResponseResult] = useState<{
    answer: string;
    keyVocabulary?: Array<{ chinTerm: string; englishTerm: string; dialect?: string }>;
    practicalTips?: string[];
    disclaimer?: string;
  } | null>({
    answer:
      'In Hakha Chin (Lai holh), explaining a child\'s fever and stomach pain to a clinic doctor involves clear, direct phrasing:\n\n• For fever: "Ka fale hi a tak a lin tuk" (My child has a high fever) or "Taklinh a ngei" (Has a fever).\n• For stomach pain: "A paw a fak tuk" (His/her stomach hurts very much).\n• Duration: "Nizan thawk in a zual" (It started getting worse since yesterday).\n\nWhen speaking with English-speaking medical staff, you can say:\n"Hello doctor, my child has had a high fever and severe stomach ache since yesterday. We need help checking for infection."',
    keyVocabulary: [
      { chinTerm: 'Taklinh', englishTerm: 'Fever / High temperature', dialect: 'Hakha Chin' },
      { chinTerm: 'Paw fak', englishTerm: 'Stomach ache / Abdominal pain', dialect: 'Hakha Chin' },
      { chinTerm: 'Sizung / Si-inn', englishTerm: 'Hospital / Clinic', dialect: 'Lai & Falam' },
      { chinTerm: 'Sii thawn', englishTerm: 'Medicine dosage / Prescription', dialect: 'Hakha Chin' },
    ],
    practicalTips: [
      'Write down the exact temperature (e.g. 101°F / 38.3°C) and the time it started on paper.',
      'Bring all current vitamins or medications your child has taken in the past 24 hours to the clinic.',
      'Ask the clinic receptionist for a free telephonic Chin/Lai interpreter if English is difficult.',
    ],
    disclaimer:
      'This guidance is for community education and language navigation only. For acute pain, difficulty breathing, or high fever over 103°F, seek emergency medical care immediately.',
  });

  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentCategoryObj = ASK_AI_CATEGORIES.find((c) => c.id === activeCategory);

  const handleAsk = async (questionToAsk?: string) => {
    const q = questionToAsk !== undefined ? questionToAsk : prompt;
    if (!q || q.trim().length === 0) {
      setErrorMessage('Please type a question or choose one of the suggestions below.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: q,
          category: activeCategory === 'all' ? 'general' : activeCategory,
          targetLanguage: preferredLang,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to retrieve answer from Chin AI');
      }

      const data = await res.json();
      setResponseResult(data);
    } catch (err: any) {
      console.error('Ask AI error:', err);
      setErrorMessage(err?.message || 'Unable to connect to AI assistant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!responseResult?.answer) return;
    navigator.clipboard.writeText(responseResult.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayAudio = async () => {
    if (!responseResult?.answer || isPlayingAudio) return;
    setIsPlayingAudio(true);

    try {
      const textToSpeak = responseResult.answer.slice(0, 300);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, language: 'en' }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
          audio.onended = () => setIsPlayingAudio(false);
          audio.onerror = () => setIsPlayingAudio(false);
          await audio.play();
          return;
        }
      }

      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(textToSpeak);
        u.onend = () => setIsPlayingAudio(false);
        u.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(u);
      } else {
        setIsPlayingAudio(false);
      }
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const handleInsertChar = (char: string) => {
    setPrompt((prev) => prev + char);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      <CommunityAdBanner category="healthcare" variant="banner" onNavigateContact={onNavigateContact} />

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Chin Community AI Assistant</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ask Chin AI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Dedicated assistance for Health & Medical Navigation, Education & Dialect Learning, and Community Ideas in Hakha Chin, Falam, Tedim, Mizo, Matu, Mara, and English.
        </p>
      </div>

      {/* Category Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory('health')}
          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
            activeCategory === 'health'
              ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 shadow-2xs font-semibold'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-xs font-bold">Health & Clinic</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Ngandamnak & Sizung</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('education')}
          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
            activeCategory === 'education'
              ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 shadow-2xs font-semibold'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold">Education</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Fiannak & Cawnnak</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('ideas')}
          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
            activeCategory === 'ideas'
              ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 shadow-2xs font-semibold'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span className="text-xs font-bold">Community Ideas</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Khua Ruahnak & Nunphung</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
            activeCategory === 'all'
              ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 shadow-2xs font-semibold'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold">General Q&A</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Zapi ca biahalnak</span>
        </button>
      </div>

      {/* Suggested Questions Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Suggested Prompts for {activeCategory.toUpperCase()}:
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
            Click any prompt to ask
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(currentCategoryObj?.suggestedQuestions || ASK_AI_CATEGORIES[0].suggestedQuestions).map(
            (item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(item.text);
                  handleAsk(item.text);
                }}
                className="text-left text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 text-slate-700 dark:text-slate-200 transition-colors flex items-start gap-2 group"
              >
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.text}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal mt-0.5 italic">{item.nativeText}</p>
                </div>
              </button>
            )
          )}
        </div>
      </div>

      {/* Ask Question Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="ask-ai-prompt" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Your Question / Request:
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Answer language:</span>
            <select
              value={preferredLang}
              onChange={(e) => setPreferredLang(e.target.value)}
              className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="cnh">Hakha Chin (Lai)</option>
              <option value="cfm">Falam Chin</option>
              <option value="ctd">Tedim (Zomi)</option>
              <option value="lus">Mizo</option>
              <option value="matu">Matu</option>
              <option value="mrh">Mara</option>
              <option value="cnh-cho">Mindat Cho</option>
              <option value="my">Burmese (Myanmar)</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <textarea
          id="ask-ai-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question about symptoms, clinic appointments, Chin grammar, scholarship advice, or community ideas..."
          rows={4}
          maxLength={1000}
          className="w-full p-3.5 text-xs sm:text-sm md:text-base border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />

        <DiacriticsBar onInsertChar={handleInsertChar} targetLang={preferredLang} />

        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {prompt.length} / 1000 characters
          </span>
          <button
            type="button"
            onClick={() => handleAsk()}
            disabled={isLoading || !prompt.trim()}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Consulting Chin AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-400 dark:text-white" />
                <span>Ask Chin AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Response Display Card */}
      {responseResult && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Chin Community Assistant Response</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Designed to support Chin diaspora community needs</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePlayAudio}
                disabled={isPlayingAudio}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1"
                title="Listen to audio"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
                    <span>Listening...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                    <span>Listen</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1"
                title="Copy response"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Answer Content */}
          <div className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {responseResult.answer}
          </div>

          {/* Key Vocabulary Pills */}
          {responseResult.keyVocabulary && responseResult.keyVocabulary.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Key Vocabulary & Phrasing (Biatlang Hna):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {responseResult.keyVocabulary.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-blue-900 dark:text-blue-300">{item.chinTerm}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">{item.englishTerm}</p>
                    </div>
                    {item.dialect && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                        {item.dialect}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical Actionable Tips */}
          {responseResult.practicalTips && responseResult.practicalTips.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Practical Steps & Recommendations:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {responseResult.practicalTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mandatory Disclaimer Box */}
          {responseResult.disclaimer && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-950 dark:text-amber-100 mr-1">Important Notice:</span>
                {responseResult.disclaimer}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Embedded Community Sponsor Card */}
      <div className="pt-2">
        <CommunityAdBanner category="education" variant="card" onNavigateContact={onNavigateContact} />
      </div>
    </div>
  );
};
