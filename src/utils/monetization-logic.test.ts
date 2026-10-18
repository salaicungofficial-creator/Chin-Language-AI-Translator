import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRevenueMetrics,
  recordAdEvent,
  ADVERTISER_TIERS,
  STANDARD_AD_UNITS,
} from './monetization-logic.ts';
import { ASK_AI_CATEGORIES } from './ask-ai-logic.ts';

test('calculateRevenueMetrics accurately computes CTR and RPM', () => {
  const metrics = calculateRevenueMetrics(1000, 50, 25.0);
  assert.equal(metrics.ctrPercentage, 5.0);
  assert.equal(metrics.rpmUSD, 25.0);
  assert.equal(metrics.cpcUSD, 0.5);
});

test('calculateRevenueMetrics handles zero impressions safely without dividing by zero', () => {
  const metrics = calculateRevenueMetrics(0, 0, 0);
  assert.equal(metrics.ctrPercentage, 0);
  assert.equal(metrics.rpmUSD, 0);
  assert.equal(metrics.cpcUSD, 0);
});

test('recordAdEvent increases impressions and updates earnings correctly', () => {
  const initial = {
    pageViews: 100,
    adImpressions: 100,
    adClicks: 5,
    totalEarningsUSD: 10.0,
    todayEarningsUSD: 2.0,
    ctrPercentage: 5.0,
    rpmUSD: 100.0,
    adsenseConnected: true,
    payoutMethod: 'bank_wire' as const,
    payoutThresholdUSD: 100,
  };
  const updated = recordAdEvent(initial, 'impression', 0.4, 3.0);
  assert.equal(updated.adImpressions, 101);
  assert.ok(updated.totalEarningsUSD > 10.0);
  assert.ok(updated.todayEarningsUSD > 2.0);
});

test('recordAdEvent increases clicks and CPC revenue correctly', () => {
  const initial = {
    pageViews: 100,
    adImpressions: 100,
    adClicks: 5,
    totalEarningsUSD: 10.0,
    todayEarningsUSD: 2.0,
    ctrPercentage: 5.0,
    rpmUSD: 100.0,
    adsenseConnected: true,
    payoutMethod: 'bank_wire' as const,
    payoutThresholdUSD: 100,
  };
  const updated = recordAdEvent(initial, 'click', 0.5, 3.0);
  assert.equal(updated.adClicks, 6);
  assert.equal(updated.totalEarningsUSD, 10.5);
  assert.equal(updated.todayEarningsUSD, 2.5);
});

test('ADVERTISER_TIERS includes community, featured, and premium tiers', () => {
  assert.equal(ADVERTISER_TIERS.length, 3);
  const ids = ADVERTISER_TIERS.map((t) => t.id);
  assert.ok(ids.includes('tier_community'));
  assert.ok(ids.includes('tier_featured'));
  assert.ok(ids.includes('tier_premium'));
});

test('ASK_AI_CATEGORIES supports health, education, and ideas', () => {
  const catIds = ASK_AI_CATEGORIES.map((c) => c.id);
  assert.ok(catIds.includes('health'));
  assert.ok(catIds.includes('education'));
  assert.ok(catIds.includes('ideas'));

  const health = ASK_AI_CATEGORIES.find((c) => c.id === 'health')!;
  assert.ok(health.suggestedQuestions.length >= 2);
  assert.ok(health.suggestedQuestions[0].text.length > 10);
});
