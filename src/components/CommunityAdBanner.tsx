import React, { useState } from 'react';
import { Sparkles, ExternalLink, X, HeartHandshake, ShieldCheck, Info } from 'lucide-react';
import { COMMUNITY_ADS, CommunityAd } from '../utils/ask-ai-logic.ts';

interface CommunityAdBannerProps {
  category?: 'healthcare' | 'education' | 'services' | 'culture' | 'all';
  variant?: 'banner' | 'card' | 'inline';
  onNavigateContact?: () => void;
}

export const CommunityAdBanner: React.FC<CommunityAdBannerProps> = ({
  category = 'all',
  variant = 'banner',
  onNavigateContact,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  if (isDismissed) return null;

  const filteredAds =
    category === 'all'
      ? COMMUNITY_ADS
      : COMMUNITY_ADS.filter((a) => a.category === category);
  const ad: CommunityAd = filteredAds[0] || COMMUNITY_ADS[0];

  if (variant === 'card') {
    return (
      <div className="relative rounded-2xl bg-gradient-to-br from-blue-900/5 via-slate-50 to-indigo-900/5 dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-800/80 border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {ad.badge}
            </span>
            <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">{ad.sponsorName}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowInfoModal(true)}
            className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
            title="Ad transparency info"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">Ad</span>
          </button>
        </div>

        {/* Content */}
        <div className="pt-3 space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{ad.title}</h4>
          <p className="text-xs font-semibold text-blue-900 dark:text-blue-400">{ad.tagline}</p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ad.description}</p>
        </div>

        {/* CTA */}
        <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => {
              if (onNavigateContact) onNavigateContact();
            }}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 group"
          >
            <span>{ad.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Hide
          </button>
        </div>

        {/* Sponsor disclosure modal */}
        {showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Community Advertising</h4>
                <button
                  type="button"
                  onClick={() => setShowInfoModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Advertisements on Chin Language AI are strictly vetted community services, clinics, and non-profits dedicated to Chin refugee and diaspora empowerment.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowInfoModal(false);
                    if (onNavigateContact) onNavigateContact();
                  }}
                  className="w-full py-2 bg-blue-900 dark:bg-blue-600 text-white font-semibold text-xs rounded-xl"
                >
                  Inquire to Sponsor or Advertise
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Top banner variant
  return (
    <div className="relative rounded-xl border border-blue-200 dark:border-blue-800/80 bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-slate-50 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 p-3 sm:p-3.5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2.5">
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-900 dark:bg-blue-600 text-white">
            {ad.badge}
          </span>
          <div>
            <span className="font-bold text-slate-900 dark:text-white mr-2">{ad.title}:</span>
            <span className="text-slate-600 dark:text-slate-300 font-medium">{ad.tagline}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => {
              if (onNavigateContact) onNavigateContact();
            }}
            className="font-bold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group text-xs"
          >
            <span>{ad.ctaText}</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50"
            title="Dismiss ad"
            aria-label="Dismiss advertisement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
