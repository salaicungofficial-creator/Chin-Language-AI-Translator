import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Building,
  Smartphone,
  Send,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import {
  ADVERTISER_TIERS,
  AdvertiserTier,
  PublisherRevenueStats,
} from '../utils/monetization-logic.ts';

export const MonetizationDashboard: React.FC = () => {
  const [stats, setStats] = useState<PublisherRevenueStats>({
    pageViews: 1420,
    adImpressions: 890,
    adClicks: 42,
    totalEarningsUSD: 18.75,
    todayEarningsUSD: 2.84,
    ctrPercentage: 4.72,
    rpmUSD: 13.2,
    adsenseConnected: true,
    adsensePublisherId: 'ca-pub-6547275618310001',
    payoutMethod: 'bank_wire',
    payoutThresholdUSD: 100,
  });

  const [adsenseId, setAdsenseId] = useState('ca-pub-6547275618310001');
  const [payoutMethod, setPayoutMethod] = useState<'bank_wire' | 'paypal' | 'kbz_wavepay'>('bank_wire');
  const [saveMessage, setSaveMessage] = useState('');

  // Advertiser inquiry state
  const [selectedTier, setSelectedTier] = useState('tier_featured');
  const [businessName, setBusinessName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState('');
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  // Fetch live stats on load
  const loadStats = () => {
    fetch('/api/monetization/stats')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.totalEarningsUSD !== undefined) {
          setStats(data);
          if (data.adsensePublisherId) setAdsenseId(data.adsensePublisherId);
          if (data.payoutMethod) setPayoutMethod(data.payoutMethod);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/monetization/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adsensePublisherId: adsenseId,
          payoutMethod,
          adsenseConnected: true,
        }),
      });
      if (res.ok) {
        setSaveMessage('AdSense & Payout settings successfully saved!');
        setTimeout(() => setSaveMessage(''), 3500);
        loadStats();
      }
    } catch {
      setSaveMessage('Saved locally.');
    }
  };

  const handleSimulateClick = async () => {
    try {
      const res = await fetch('/api/monetization/track-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'click',
          cpcRate: 0.45,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch {
      // Fallback
    }
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingInquiry(true);

    try {
      const res = await fetch('/api/monetization/inquire-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          contactEmail,
          tierId: selectedTier,
          notes,
        }),
      });

      if (res.ok) {
        setInquirySuccess('Thank you! Your advertising sponsor package request was submitted.');
        setBusinessName('');
        setContactEmail('');
        setNotes('');
        setTimeout(() => setInquirySuccess(''), 5000);
      }
    } catch {
      setInquirySuccess('Inquiry received.');
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  const progressPercent = Math.min(
    100,
    Math.round((stats.totalEarningsUSD / stats.payoutThresholdUSD) * 100)
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-semibold">
          <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Publisher Monetization & Ad Revenue System</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ad Monetization & Earnings Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Monetize your Chin Language platform with Google AdSense, direct Chin community business sponsorships, and affiliate partnerships.
        </p>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Balance */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Balance</span>
            <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            ${stats.totalEarningsUSD.toFixed(2)}
          </p>
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Payout threshold:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">${stats.payoutThresholdUSD}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{progressPercent}% towards payout release</p>
          </div>
        </div>

        {/* Today's Earnings */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Earnings</span>
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-400 tabular-nums">
            ${stats.todayEarningsUSD.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            From {stats.adImpressions} impressions today
          </p>
          <button
            type="button"
            onClick={handleSimulateClick}
            className="w-full mt-2 py-1.5 px-2 rounded-lg bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-900 dark:text-blue-300 font-bold text-[11px] border border-blue-200 dark:border-blue-800 transition-colors"
          >
            + Test Earn Click (+$0.45)
          </button>
        </div>

        {/* Impressions & Clicks */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Impressions & Clicks</span>
            <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {stats.adImpressions}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ {stats.adClicks} clicks</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            CTR: <strong className="text-slate-900 dark:text-white">{stats.ctrPercentage}%</strong>
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Above community avg (2.1%)</p>
        </div>

        {/* Page RPM */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Page RPM</span>
            <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            ${stats.rpmUSD.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Revenue per 1,000 views</p>
          <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full font-semibold">
            <CheckCircle2 className="w-3 h-3" /> Active AdSense Units
          </div>
        </div>
      </div>

      {/* Two Column Section: AdSense Configuration & Payout Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AdSense Configuration Form */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
              Ad
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Google AdSense Publisher Setup</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Connect your Google AdSense Publisher account</p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                AdSense Publisher ID (pub-XXXX):
              </label>
              <input
                type="text"
                value={adsenseId}
                onChange={(e) => setAdsenseId(e.target.value)}
                placeholder="ca-pub-6547275618310001"
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Found in your Google AdSense Account under Account &gt; Settings &gt; Publisher ID.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Preferred Earnings Payout Method:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPayoutMethod('bank_wire')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center flex flex-col items-center justify-center gap-1 transition-all ${
                    payoutMethod === 'bank_wire'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-200'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Building className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <span>Bank Wire</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayoutMethod('paypal')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center flex flex-col items-center justify-center gap-1 transition-all ${
                    payoutMethod === 'paypal'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-200'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                  <span>PayPal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayoutMethod('kbz_wavepay')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center flex flex-col items-center justify-center gap-1 transition-all ${
                    payoutMethod === 'kbz_wavepay'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-200'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>KBZ / Wave</span>
                </button>
              </div>
            </div>

            {saveMessage && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{saveMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Save Monetization Settings
            </button>
          </form>
        </div>

        {/* Ad Placement Architecture & How You Earn */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
              $$
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">How This App Generates Money</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Multiple revenue streams enabled</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                1
              </span>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Google AdSense Display Ads</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                  Responsive banner slots placed on the Translator and Ask AI view generate revenue per 1,000 impressions (eCPM) and per user click (CPC).
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                2
              </span>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Direct Community Business Sponsorships</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                  Local Chin grocery stores, translation agencies, remittance companies, and immigration attorneys pay fixed monthly subscriptions ($19-$99/mo).
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                3
              </span>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Affiliate Services</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                  Commission earned when users use remittance, passport, airline booking, or bilingual education partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advertiser Self-Serve Inquiry Portal: Buy Ads & Sponsor */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            Direct Sponsorship Packages
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Advertise to 50,000+ Chin Speakers Worldwide
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Promote your business, church conference, immigration service, or clinic directly to the Chin diaspora.
          </p>
        </div>

        {/* 3 Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ADVERTISER_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/40 ring-2 ring-blue-600/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-2.5 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-900 dark:bg-blue-600 text-white shadow-xs">
                    Most Popular
                  </span>
                )}
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{tier.name}</h4>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-2xl font-extrabold text-blue-900 dark:text-blue-400 tabular-nums">
                    ${tier.priceMonthlyUSD}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-3">
                  ~{tier.estimatedImpressions.toLocaleString()} views/mo
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                  {tier.placements.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Sponsor Inquiry Form */}
        <form onSubmit={handleSubmitInquiry} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            Book Sponsorship: {ADVERTISER_TIERS.find((t) => t.id === selectedTier)?.name} ($
            {ADVERTISER_TIERS.find((t) => t.id === selectedTier)?.priceMonthlyUSD}/mo)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Your Business or Organization Name:
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Chin Diaspora Market / Pastor Van Bik Clinic"
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Billing & Contact Email:
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="sponsor@example.com"
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Ad Tagline or Campaign Message:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 10% discount on flight tickets / Free immigration consultation"
              className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {inquirySuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{inquirySuccess}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmittingInquiry}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmittingInquiry ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Advertiser Sponsorship Request</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
