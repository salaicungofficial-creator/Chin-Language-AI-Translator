import React from 'react';
import { Info, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMMUNITY_TRUST_NOTICE } from '../utils/notice-data.ts';

export interface CommunityTrustNoticeProps {
  /**
   * 'card': Full-width responsive card placed below the translation tool.
   * 'compact': Streamlined responsive alert placed near translation results.
   * 'inline': Subtle inline banner.
   */
  variant?: 'card' | 'compact' | 'inline';
  onOpenOfficialNotice?: () => void;
  className?: string;
}

export const CommunityTrustNotice: React.FC<CommunityTrustNoticeProps> = ({
  variant = 'card',
  onOpenOfficialNotice,
  className = '',
}) => {
  const notice = COMMUNITY_TRUST_NOTICE;

  if (variant === 'compact') {
    return (
      <aside
        aria-label="Community Trust Notice"
        className={`rounded-xl border border-blue-200/90 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 p-3 sm:p-3.5 transition-colors ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-start gap-2.5 min-w-0">
            <span className="p-1 rounded-md bg-blue-100 dark:bg-blue-900/80 text-blue-700 dark:text-blue-300 shrink-0 mt-0.5">
              <Info className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed min-w-0">
              <span className="font-semibold text-slate-900 dark:text-slate-100 mr-1.5">
                {notice.title}:
              </span>
              <span>{notice.text}</span>
            </div>
          </div>
          {onOpenOfficialNotice && (
            <button
              type="button"
              onClick={onOpenOfficialNotice}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 hover:underline shrink-0 underline-offset-2 self-start sm:self-center transition-colors cursor-pointer"
            >
              <span>Full Notice</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </button>
          )}
        </div>
      </aside>
    );
  }

  // Default 'card' variant: Displayed below translation tool
  return (
    <section
      aria-label="Community Trust Notice"
      className={`w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 sm:p-5 shadow-2xs transition-colors ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        {/* Left icon & text block */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900/80 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                <span>{notice.title}</span>
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Verification Advisory</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {notice.text}
            </p>
          </div>
        </div>

        {/* Right Action Link */}
        {onOpenOfficialNotice && (
          <button
            type="button"
            onClick={onOpenOfficialNotice}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs transition-colors shrink-0 self-start md:self-center cursor-pointer"
          >
            <span>Medical & Legal Notice</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
};
