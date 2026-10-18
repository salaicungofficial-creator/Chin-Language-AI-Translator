import React, { useEffect, useState } from 'react';
import { ExternalLink, Info, DollarSign, TrendingUp, Sparkles } from 'lucide-react';
import { STANDARD_AD_UNITS, AdUnitConfig } from '../utils/monetization-logic.ts';

interface DisplayAdSlotProps {
  slotId: 'slot-header-leaderboard' | 'slot-mid-native' | 'slot-askai-sponsor';
  onAdClicked?: (earned: number) => void;
  onOpenMonetizationPortal?: () => void;
}

export const DisplayAdSlot: React.FC<DisplayAdSlotProps> = ({
  slotId,
  onAdClicked,
  onOpenMonetizationPortal,
}) => {
  const [hasTrackedImpression, setHasTrackedImpression] = useState(false);
  const [clickNotice, setClickNotice] = useState<string | null>(null);

  const adConfig: AdUnitConfig =
    STANDARD_AD_UNITS.find((u) => u.id === slotId) || STANDARD_AD_UNITS[0];

  useEffect(() => {
    if (!hasTrackedImpression) {
      setHasTrackedImpression(true);
      fetch('/api/monetization/track-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'impression',
          cpmRate: adConfig.fallbackSponsor.cpmRate,
        }),
      }).catch(() => {});
    }
  }, [hasTrackedImpression, adConfig]);

  const handleAdClick = () => {
    fetch('/api/monetization/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'click',
        cpcRate: adConfig.fallbackSponsor.cpcRate,
      }),
    }).catch(() => {});

    setClickNotice(`+$${adConfig.fallbackSponsor.cpcRate.toFixed(2)} ad revenue earned!`);
    setTimeout(() => setClickNotice(null), 3000);

    if (onAdClicked) {
      onAdClicked(adConfig.fallbackSponsor.cpcRate);
    }
  };

  if (adConfig.format === 'leaderboard') {
    return (
      <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-2xs overflow-hidden">
        {/* Top Ad Label */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold">
              ADVERTISEMENT
            </span>
            <span>Google AdSense & Community Network</span>
          </div>
          {onOpenMonetizationPortal && (
            <button
              type="button"
              onClick={onOpenMonetizationPortal}
              className="hover:text-blue-700 dark:hover:text-blue-400 flex items-center gap-1 font-semibold text-blue-900 dark:text-blue-300"
            >
              <DollarSign className="w-3 h-3" />
              <span>Publisher Earnings Portal</span>
            </button>
          )}
        </div>

        {/* Ad Body */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900 dark:text-white">{adConfig.fallbackSponsor.title}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{adConfig.fallbackSponsor.description}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Sponsor: {adConfig.fallbackSponsor.sponsor}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {clickNotice && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-bounce">
                {clickNotice}
              </span>
            )}
            <button
              type="button"
              onClick={handleAdClick}
              className="px-4 py-2 rounded-lg bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>{adConfig.fallbackSponsor.cta}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // In-Feed Native format
  return (
    <div className="rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-r from-blue-50/50 via-slate-50 to-indigo-50/40 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900 p-4 sm:p-5 shadow-2xs">
      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-200/60 dark:border-slate-800 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 font-bold">
            SPONSORED AD
          </span>
          <span>Earns Revenue to Fund Free Chin AI</span>
        </div>
        {onOpenMonetizationPortal && (
          <button
            type="button"
            onClick={onOpenMonetizationPortal}
            className="hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 text-blue-900 dark:text-blue-400 font-bold"
          >
            <TrendingUp className="w-3 h-3" />
            <span>Ad Dashboard</span>
          </button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{adConfig.fallbackSponsor.title}</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
            {adConfig.fallbackSponsor.description}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Verified Partner: <strong>{adConfig.fallbackSponsor.sponsor}</strong>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {clickNotice && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
              {clickNotice}
            </span>
          )}
          <button
            type="button"
            onClick={handleAdClick}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>{adConfig.fallbackSponsor.cta}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
