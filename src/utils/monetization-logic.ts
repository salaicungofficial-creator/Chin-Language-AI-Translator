/**
 * Chin Language AI - Ad Monetization & Revenue Logic Engine
 */

export interface AdUnitConfig {
  id: string;
  slotName: string;
  format: 'leaderboard' | 'medium_rectangle' | 'in_feed' | 'sticky_footer';
  network: 'adsense' | 'direct_sponsor';
  adSenseSlotId?: string;
  fallbackSponsor: {
    title: string;
    description: string;
    sponsor: string;
    cta: string;
    url: string;
    cpcRate: number; // USD per click earned
    cpmRate: number; // USD per 1000 impressions
    imageUrl?: string;
  };
}

export interface PublisherRevenueStats {
  pageViews: number;
  adImpressions: number;
  adClicks: number;
  totalEarningsUSD: number;
  todayEarningsUSD: number;
  ctrPercentage: number;
  rpmUSD: number;
  adsenseConnected: boolean;
  adsensePublisherId?: string;
  payoutMethod: 'bank_wire' | 'paypal' | 'kbz_wavepay' | 'undecided';
  payoutThresholdUSD: number;
}

export interface AdvertiserTier {
  id: string;
  name: string;
  priceMonthlyUSD: number;
  estimatedImpressions: number;
  placements: string[];
  popular?: boolean;
}

export const ADVERTISER_TIERS: AdvertiserTier[] = [
  {
    id: 'tier_community',
    name: 'Community Sponsor',
    priceMonthlyUSD: 19,
    estimatedImpressions: 15000,
    placements: ['In-Feed Native Ads', 'Ask AI Resource Recommendations'],
  },
  {
    id: 'tier_featured',
    name: 'Featured Business',
    priceMonthlyUSD: 49,
    estimatedImpressions: 45000,
    placements: ['Top Leaderboard (728x90)', 'In-Feed Native Ads', 'Community Directory'],
    popular: true,
  },
  {
    id: 'tier_premium',
    name: 'Premium Partner',
    priceMonthlyUSD: 99,
    estimatedImpressions: 120000,
    placements: ['Sitewide Header & Sticky Footer', 'Top Placement on Ask AI', 'Featured Sponsor Badge'],
  },
];

export const STANDARD_AD_UNITS: AdUnitConfig[] = [
  {
    id: 'slot-header-leaderboard',
    slotName: 'Top Responsive Leaderboard',
    format: 'leaderboard',
    network: 'direct_sponsor',
    adSenseSlotId: '1234567890',
    fallbackSponsor: {
      title: 'Chin Diaspora Remittance & Travel',
      description: 'Lowest fees and best exchange rates for sending support home to Chin State and Myanmar.',
      sponsor: 'Chin Express Remit & Logistics',
      cta: "Check Today's Exchange Rates",
      url: '#sponsor-remit',
      cpcRate: 0.35,
      cpmRate: 2.2,
    },
  },
  {
    id: 'slot-mid-native',
    slotName: 'Translator In-Feed Native Banner',
    format: 'in_feed',
    network: 'direct_sponsor',
    adSenseSlotId: '9876543210',
    fallbackSponsor: {
      title: 'Chin Community Legal & Asylum Clinic',
      description: 'Pro bono and affordable immigration consultations, work permits, and TPS navigation for Chin families.',
      sponsor: 'Alliance of Chin Advocates (USA & Global)',
      cta: 'Book Confidential Intake',
      url: '#sponsor-legal',
      cpcRate: 0.45,
      cpmRate: 3.5,
    },
  },
  {
    id: 'slot-askai-sponsor',
    slotName: 'Ask AI Health & Education Sponsor',
    format: 'medium_rectangle',
    network: 'direct_sponsor',
    adSenseSlotId: '5432109876',
    fallbackSponsor: {
      title: 'Global Lai Hlabu & Chin Bible App',
      description: 'Audio hymns, scripture concordance in Hakha Chin, Tedim, and Falam. Download free on iOS & Android.',
      sponsor: 'Chin Christian Literature Ministry',
      cta: 'Download Mobile App',
      url: '#sponsor-app',
      cpcRate: 0.28,
      cpmRate: 1.8,
    },
  },
];

/**
 * Calculate publisher revenue metrics
 */
export function calculateRevenueMetrics(impressions: number, clicks: number, earningsUSD: number) {
  const ctrPercentage = impressions > 0 ? (clicks / impressions) * 100 : 0;
  const rpmUSD = impressions > 0 ? (earningsUSD / impressions) * 1000 : 0;
  const cpcUSD = clicks > 0 ? earningsUSD / clicks : 0;

  return {
    ctrPercentage: Number(ctrPercentage.toFixed(2)),
    rpmUSD: Number(rpmUSD.toFixed(2)),
    cpcUSD: Number(cpcUSD.toFixed(2)),
  };
}

/**
 * Simulate ad impression or click revenue increment
 */
export function recordAdEvent(
  current: PublisherRevenueStats,
  eventType: 'impression' | 'click',
  cpcRate: number = 0.35,
  cpmRate: number = 2.5
): PublisherRevenueStats {
  if (eventType === 'impression') {
    const earned = cpmRate / 1000;
    const nextImpressions = current.adImpressions + 1;
    const nextTotalEarnings = Number((current.totalEarningsUSD + earned).toFixed(4));
    const nextTodayEarnings = Number((current.todayEarningsUSD + earned).toFixed(4));
    const { ctrPercentage, rpmUSD } = calculateRevenueMetrics(nextImpressions, current.adClicks, nextTotalEarnings);

    return {
      ...current,
      adImpressions: nextImpressions,
      totalEarningsUSD: nextTotalEarnings,
      todayEarningsUSD: nextTodayEarnings,
      ctrPercentage,
      rpmUSD,
    };
  }

  // Click event
  const earned = cpcRate;
  const nextClicks = current.adClicks + 1;
  const nextTotalEarnings = Number((current.totalEarningsUSD + earned).toFixed(4));
  const nextTodayEarnings = Number((current.todayEarningsUSD + earned).toFixed(4));
  const { ctrPercentage, rpmUSD } = calculateRevenueMetrics(current.adImpressions, nextClicks, nextTotalEarnings);

  return {
    ...current,
    adClicks: nextClicks,
    totalEarningsUSD: nextTotalEarnings,
    todayEarningsUSD: nextTodayEarnings,
    ctrPercentage,
    rpmUSD,
  };
}
