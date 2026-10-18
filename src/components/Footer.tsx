import React from 'react';
import { ShieldCheck, Heart, Globe2, HeartPulse, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'translator' | 'phrase-packs' | 'ask-ai' | 'monetize' | 'about' | 'feedback' | 'privacy' | 'contact' | 'notice') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                CL
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-base">Chin Language AI Translator</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Dedicated to serving Chin communities worldwide through accurate, culturally respectful AI translation across 9 Chin dialects: Hakha Chin (Lai), Falam, Tedim (Zomi), Mizo, Matu, Mara, Mindat Cho, Lautu, and Zyphe.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Free and open for indigenous language empowerment</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Features & Resources</h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('translator')}
                  className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Translator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('phrase-packs')}
                  className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-1.5"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span>Clinic & Legal Phrase Packs</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('ask-ai')}
                  className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Ask Chin AI (Health & Education)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('monetize')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium text-emerald-800 dark:text-emerald-300"
                >
                  Publisher Monetization & Ads
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('notice')}
                  className="hover:text-amber-800 dark:hover:text-amber-300 transition-colors font-semibold text-amber-900 dark:text-amber-400 flex items-center gap-1.5 text-left"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Important Medical, Legal & Official Notice</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  About 9 Chin Dialects
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('feedback')}
                  className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Community Feedback
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy & Disclaimers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Dialects */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              9 Indigenous Dialects
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Hakha Chin (Lai)
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Falam (Laizo)
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Tedim (Zomi)
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Mizo (Lushai)
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Matu Chin
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Mara Chin
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Mindat Cho
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Lautu Chin
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Zyphe Chin
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Burmese
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                English
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Chin Language AI Project. Free-first community tool.</p>
          <button
            type="button"
            onClick={() => onNavigate('notice')}
            className="text-center sm:text-right max-w-md text-amber-900/90 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
          >
            Important Medical, Legal & Official Notice: Automated translations must be verified before critical use →
          </button>
        </div>
      </div>
    </footer>
  );
};
