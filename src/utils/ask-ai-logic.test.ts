import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ASK_AI_CATEGORIES,
  COMMUNITY_ADS,
  filterQuestions,
  sanitizeAskPrompt,
} from './ask-ai-logic.ts';

test('ASK_AI_CATEGORIES includes health, education, and community ideas', () => {
  const ids = ASK_AI_CATEGORIES.map((c) => c.id);
  assert.ok(ids.includes('health'), 'Must include health category');
  assert.ok(ids.includes('education'), 'Must include education category');
  assert.ok(ids.includes('ideas'), 'Must include ideas category');
});

test('COMMUNITY_ADS contains valid sponsor and community ads with disclosures', () => {
  assert.ok(COMMUNITY_ADS.length >= 3, 'Must contain community ad items');
  for (const ad of COMMUNITY_ADS) {
    assert.ok(ad.title && ad.description && ad.sponsorName);
    assert.ok(['Sponsor', 'Community Partner', 'Featured'].includes(ad.badge));
  }
});

test('sanitizeAskPrompt validates empty input and trims whitespace', () => {
  const emptyRes = sanitizeAskPrompt('   ');
  assert.ok(emptyRes.error);
  assert.equal(emptyRes.cleanPrompt, '');

  const validRes = sanitizeAskPrompt('  Doctor zoh ning  ');
  assert.equal(validRes.cleanPrompt, 'Doctor zoh ning');
  assert.equal(validRes.error, undefined);
});

test('sanitizeAskPrompt truncates excessively long questions', () => {
  const longPrompt = 'Q'.repeat(1200);
  const res = sanitizeAskPrompt(longPrompt);
  assert.equal(res.cleanPrompt.length, 1000);
  assert.ok(res.error?.includes('shortened'));
});

test('filterQuestions finds matching questions in both English and Chin text', () => {
  const questions = [
    { text: 'Doctor visit preparation', nativeText: 'Sizung doctor zoh ning', lang: 'cnh' },
    { text: 'Chin National Day celebration ideas', nativeText: 'Chin Miphun Ni', lang: 'cnh' },
  ];
  const searchDoctor = filterQuestions('doctor', questions);
  assert.equal(searchDoctor.length, 1);
  assert.equal(searchDoctor[0].text, 'Doctor visit preparation');

  const searchMiphun = filterQuestions('miphun', questions);
  assert.equal(searchMiphun.length, 1);
  assert.equal(searchMiphun[0].nativeText, 'Chin Miphun Ni');
});
