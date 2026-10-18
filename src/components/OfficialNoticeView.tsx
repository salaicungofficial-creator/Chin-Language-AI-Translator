import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  HeartPulse,
  Scale,
  FileCheck,
  Printer,
  ArrowLeft,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
  Info,
  HelpCircle,
} from 'lucide-react';
import { OFFICIAL_NOTICE_DATA } from '../utils/notice-data.ts';

interface OfficialNoticeViewProps {
  onNavigateTranslator: () => void;
  onNavigateContact?: () => void;
  onNavigatePhrasePacks?: () => void;
}

export const OfficialNoticeView: React.FC<OfficialNoticeViewProps> = ({
  onNavigateTranslator,
  onNavigateContact,
  onNavigatePhrasePacks,
}) => {
  const data = OFFICIAL_NOTICE_DATA;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-6 animate-fadeIn">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onNavigateTranslator}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Chin Translator</span>
        </button>

        <div className="flex items-center gap-2">
          {onNavigatePhrasePacks && (
            <button
              type="button"
              onClick={onNavigatePhrasePacks}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-800 dark:text-blue-300 text-xs font-semibold shadow-2xs transition-colors"
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>View Clinic & Legal Packs</span>
            </button>
          )}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs transition-colors"
            title="Print or save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Print Notice</span>
          </button>
        </div>
      </div>

      {/* Main Page Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-bold tracking-wide">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          <span>Public Safety & Accuracy Advisory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {data.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Official guidance for users, healthcare personnel, legal representatives, and community members regarding automated Chin language translations.
        </p>
      </div>

      {/* Primary Formal Notice Callout (Exact required copy) */}
      <section
        aria-labelledby="primary-notice-heading"
        className="rounded-2xl border-2 border-amber-300 dark:border-amber-700/80 bg-gradient-to-b from-amber-50/90 dark:from-amber-950/50 to-amber-100/40 dark:to-slate-900/40 p-5 sm:p-7 shadow-xs space-y-4 text-slate-900 dark:text-slate-100"
      >
        <div className="flex items-center gap-2.5 pb-2 border-b border-amber-200/80 dark:border-amber-800/60">
          <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
          <h2 id="primary-notice-heading" className="text-sm font-extrabold text-amber-950 dark:text-amber-300 uppercase tracking-wider">
            Important Notice Text
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
          {data.leadParagraph}
        </p>
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300/80 dark:border-amber-700/80 shadow-2xs">
          <p className="text-sm sm:text-base font-bold text-slate-950 dark:text-white leading-relaxed">
            {data.criticalNotice}
          </p>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-amber-950/90 dark:text-amber-300/90 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-700 dark:bg-amber-400 shrink-0" />
          <span>{data.disclaimer}</span>
        </p>
      </section>

      {/* Community Trust Notice Callout */}
      <section
        aria-labelledby="community-trust-heading"
        className="rounded-2xl border-2 border-blue-200 dark:border-blue-800/80 bg-blue-50/70 dark:bg-blue-950/40 p-5 sm:p-6 shadow-xs space-y-3"
      >
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-blue-200/80 dark:border-blue-900/60">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-700 dark:text-blue-400 shrink-0" />
            <h2 id="community-trust-heading" className="text-sm font-extrabold text-blue-950 dark:text-blue-300 uppercase tracking-wider">
              {data.communityTrustNotice.title}
            </h2>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
            Everyday Standard
          </span>
        </div>
        <blockquote className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 font-medium italic border-l-4 border-blue-500 pl-4 py-1">
          &ldquo;{data.communityTrustNotice.text}&rdquo;
        </blockquote>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          This community trust notice is displayed across the Chin Language AI translation platform to remind all users and community service workers that human native speaker verification is essential before any high-stakes or critical application.
        </p>
      </section>

      {/* Structured Category Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Healthcare & Medical */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 flex items-center justify-center border border-rose-100 dark:border-rose-900">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                Medical & Clinical
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Healthcare & Medication Safety
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
              <li>
                Automated translations can misinterpret critical medical dosages (e.g. milligram amounts, "take with water", "before sleep").
              </li>
              <li>
                In life-threatening medical crises, call local emergency dispatch (e.g., <strong>911</strong> in USA/Canada) immediately.
              </li>
              <li>
                Under Federal Title VI and hospital regulations, hospitals and medical centers are required to supply free, qualified human medical interpreters.
              </li>
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
            <strong>Patient Protocol:</strong> Ask your nurse or doctor for a <em>"Qualified Chin / Lai Interpreter"</em> before signing consents or taking medications.
          </div>
        </div>

        {/* Legal & Asylum Hearings */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Legal & Immigration
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Asylum Hearings & Legal Contracts
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
              <li>
                Asylum testimonies, USCIS interviews, and court hearings hinge on precise dialect nuances (Hakha, Falam, Tedim, Matu, Mara, Mindat Cho, or Mizo).
              </li>
              <li>
                Inaccurate automated translations could introduce contradictions on the official immigration court record.
              </li>
              <li>
                Legal contracts, rental agreements, and powers of attorney require verification by licensed counsel and certified human translators.
              </li>
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
            <strong>Court Protocol:</strong> Inform your attorney or the immigration judge immediately if the assigned interpreter speaks a different Chin dialect than yours.
          </div>
        </div>

        {/* Official Government Documents */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900">
                <FileCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Vital Records
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Government Documents & Vital Records
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
              <li>
                Birth certificates, marriage registrations, household lists, and church baptismal certificates must have certified human translations.
              </li>
              <li>
                A certified translation includes a signed Affidavit of Accuracy by a fluent human translator stating full competence.
              </li>
              <li>
                Government agencies (USCIS, passport offices, social services) will reject uncertified machine translations.
              </li>
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
            <strong>Filing Protocol:</strong> Obtain sworn, notarized translations from accredited translation bureaus or community organizations.
          </div>
        </div>

        {/* Dialect Nuance & Ambiguities */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-100 dark:border-amber-900">
                <Info className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                Linguistic Nuance
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Why Dialect Ambiguities Occur
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
              <li>
                Chin languages possess tonal contrasts, glottal stops, and distinct orthographic conventions (e.g. <em>ṭ</em>, <em>aw</em>, <em>ng</em>).
              </li>
              <li>
                A single word in Hakha Chin may have an entirely distinct connotation in Falam, Tedim (Zomi), Matu, or Burmese.
              </li>
              <li>
                Honorific registers (respectful vs. casual verb forms) can convey unintentional offense if translated without human cultural context.
              </li>
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
            <strong>Community Best Practice:</strong> Use this AI translator for interpersonal, learning, and draft understanding—not as sole legal authority.
          </div>
        </div>
      </div>

      {/* Mandatory Non-Certification & Regulatory Transparency Card */}
      <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 text-slate-200 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Non-Certification & Independence Declaration</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          This software is an independent community project. <strong>This notice and this application are NOT government-approved, legally certified, or endorsed by any judicial body, healthcare board, or immigration agency.</strong>
        </p>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          No attorney-client, doctor-patient, or certified legal relationship is created by the use of this website. All users assume responsibility for verifying critical translations with accredited human professionals.
        </p>
      </div>

      {/* Helpful Action Steps for Users */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Safe Usage Checklist for Chin Language Speakers</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">1. Draft & Compare</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Use our AI to produce initial draft sentences or understand general messages from letters or forms.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">2. Human Review</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Review sensitive phrases with a trusted bilingual family member, elder, or accredited interpreter.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">3. Official Verification</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              For USCIS, medical dosage, or court, insist on a qualified professional interpreter fluent in your specific dialect.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onNavigateTranslator}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Translator</span>
        </button>
        {onNavigateContact && (
          <button
            type="button"
            onClick={onNavigateContact}
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-300 font-semibold transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Have a translation nuance question? Contact Community Support</span>
          </button>
        )}
      </div>
    </div>
  );
};
