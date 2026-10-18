import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OFFICIAL_NOTICE_DATA,
  COMMUNITY_TRUST_NOTICE,
  validateOfficialNoticeIntegrity,
} from './notice-data.ts';

test('OFFICIAL_NOTICE_DATA contains exact verbatim text specified by requirements', () => {
  assert.equal(
    OFFICIAL_NOTICE_DATA.title,
    'Important Medical, Legal & Official Notice'
  );
  assert.equal(
    OFFICIAL_NOTICE_DATA.leadParagraph,
    'Translations provided by this application are generated through artificial intelligence models designed for language assistance and cultural communication. Automated translations can contain dialect nuances, ambiguities, or inaccuracies.'
  );
  assert.equal(
    OFFICIAL_NOTICE_DATA.criticalNotice,
    'Do not rely solely on automated translations for medical emergencies, medication dosage instructions, asylum hearings, legal contracts, or official government documents without verification by a qualified professional or a competent human interpreter fluent in the relevant Chin language and dialect.'
  );
  assert.equal(
    OFFICIAL_NOTICE_DATA.disclaimer,
    'This application does not provide certified translations or professional medical or legal advice.'
  );
});

test('COMMUNITY_TRUST_NOTICE contains exact verbatim wording from prompt requirements', () => {
  assert.equal(COMMUNITY_TRUST_NOTICE.title, 'Community Trust Notice');
  assert.equal(
    COMMUNITY_TRUST_NOTICE.text,
    'Translations are generated using AI models designed to support Chin language translation and communication. Please verify translations with a fluent native speaker before using them for critical legal, medical, immigration, or official purposes.'
  );
  assert.equal(
    OFFICIAL_NOTICE_DATA.communityTrustNotice.text,
    COMMUNITY_TRUST_NOTICE.text
  );
  // Ensure no unconfirmed claims of fine-tuning exist
  assert.equal(COMMUNITY_TRUST_NOTICE.text.toLowerCase().includes('fine-tuned'), false);
});

test('validateOfficialNoticeIntegrity verifies all safety conditions and community trust notice without claiming government approval', () => {
  const result = validateOfficialNoticeIntegrity();
  assert.equal(result.isValid, true);
  assert.equal(result.hasRequiredPhrases, true);
  assert.equal(result.noGovernmentClaim, true);
  assert.equal(result.hasCommunityTrustNotice, true);
});

test('OFFICIAL_NOTICE_DATA includes structured sections for emergency, legal, documents, and non-certification', () => {
  const ids = OFFICIAL_NOTICE_DATA.sections.map((s) => s.id);
  assert.ok(ids.includes('medical-emergency'));
  assert.ok(ids.includes('legal-asylum'));
  assert.ok(ids.includes('official-documents'));
  assert.ok(ids.includes('non-certification'));
});
