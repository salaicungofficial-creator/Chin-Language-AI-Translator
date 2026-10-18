import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PHRASE_CATEGORIES,
  CLINICAL_LEGAL_PHRASES,
  filterPhrases,
} from './phrase-pack-data.ts';

test('PHRASE_CATEGORIES contains triage, consultation, prescription, asylum, and rights', () => {
  const ids = PHRASE_CATEGORIES.map((c) => c.id);
  assert.ok(ids.includes('medical-triage'), 'Must include medical-triage');
  assert.ok(ids.includes('doctor-consultation'), 'Must include doctor-consultation');
  assert.ok(ids.includes('prescription-dosage'), 'Must include prescription-dosage');
  assert.ok(ids.includes('asylum-court'), 'Must include asylum-court');
  assert.ok(ids.includes('police-rights'), 'Must include police-rights');
});

test('CLINICAL_LEGAL_PHRASES covers essential emergency, clinical and legal statements', () => {
  assert.ok(CLINICAL_LEGAL_PHRASES.length >= 10, 'Must have at least 10 high-value phrases');

  for (const phrase of CLINICAL_LEGAL_PHRASES) {
    assert.ok(phrase.id, 'Phrase must have an id');
    assert.ok(phrase.english, 'Phrase must have english text');
    assert.ok(phrase.cnh, 'Phrase must have Hakha Chin translation');
    assert.ok(phrase.cfm, 'Phrase must have Falam translation');
    assert.ok(phrase.ctd, 'Phrase must have Tedim translation');
    assert.ok(phrase.matu, 'Phrase must have Matu translation');
    assert.ok(phrase.mrh, 'Phrase must have Mara translation');
    assert.ok(phrase.my, 'Phrase must have Burmese translation');
    assert.ok(phrase.pronunciationCnh, 'Phrase must have phonetic guide');
    assert.ok(phrase.clinicalNote, 'Phrase must have clinical or legal context note');
  }
});

test('filterPhrases filters accurately by category and query', () => {
  // Category filter
  const triageOnly = filterPhrases(CLINICAL_LEGAL_PHRASES, '', 'medical-triage');
  assert.ok(triageOnly.length > 0);
  assert.ok(triageOnly.every((p) => p.category === 'medical-triage'));

  // Search filter
  const chestSearch = filterPhrases(CLINICAL_LEGAL_PHRASES, 'chest pain', 'all');
  assert.ok(chestSearch.length >= 1);
  assert.equal(chestSearch[0].id, 'triage-chest-pain');

  // Chin word search
  const chinSearch = filterPhrases(CLINICAL_LEGAL_PHRASES, 'antibiotic', 'all');
  assert.ok(chinSearch.length >= 1);
  assert.equal(chinSearch[0].id, 'rx-finish-antibiotics');
});
