import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OFFICIAL_NOTICE_DATA,
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

test('validateOfficialNoticeIntegrity verifies all safety conditions without claiming government approval', () => {
  const result = validateOfficialNoticeIntegrity();
  assert.equal(result.isValid, true);
  assert.equal(result.hasRequiredPhrases, true);
  assert.equal(result.noGovernmentClaim, true);
});

test('OFFICIAL_NOTICE_DATA includes structured sections for emergency, legal, documents, and non-certification', () => {
  const ids = OFFICIAL_NOTICE_DATA.sections.map((s) => s.id);
  assert.ok(ids.includes('medical-emergency'));
  assert.ok(ids.includes('legal-asylum'));
  assert.ok(ids.includes('official-documents'));
  assert.ok(ids.includes('non-certification'));
});
