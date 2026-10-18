import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SUPPORTED_LANGUAGES,
  TOTAL_LANGUAGES_COUNT,
  GOOGLE_TRANSLATE_LANGUAGES_COUNT,
  CHIN_DIALECTS_COUNT,
  sanitizeInputText,
  lookupPhrasebook,
  swapLanguages,
  containsMyanmarScript,
  getLanguageName,
  getGoogleTranslateUrl,
  getGoogleTranslateCode,
  isGoogleTranslateSupported,
  searchLanguages,
} from './translator-logic.ts';

test('supported languages include expanded Chin dialects, Burmese, English and 130+ Google Translate languages', () => {
  const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
  // Chin Dialects
  assert.ok(codes.includes('cnh'), 'Must include Hakha Chin');
  assert.ok(codes.includes('cfm'), 'Must include Falam Chin');
  assert.ok(codes.includes('ctd'), 'Must include Tedim');
  assert.ok(codes.includes('lus'), 'Must include Mizo');
  assert.ok(codes.includes('matu'), 'Must include Matu Chin');
  assert.ok(codes.includes('mrh'), 'Must include Mara Chin');
  assert.ok(codes.includes('cnh-cho'), 'Must include Mindat Cho');
  assert.ok(codes.includes('ltc'), 'Must include Lautu Chin');
  assert.ok(codes.includes('zyp'), 'Must include Zyphe Chin');
  assert.ok(codes.includes('my'), 'Must include Burmese');
  assert.ok(codes.includes('en'), 'Must include English');

  // Google Translate languages
  assert.ok(codes.includes('es'), 'Must include Spanish');
  assert.ok(codes.includes('fr'), 'Must include French');
  assert.ok(codes.includes('de'), 'Must include German');
  assert.ok(codes.includes('it'), 'Must include Italian');
  assert.ok(codes.includes('pt'), 'Must include Portuguese');
  assert.ok(codes.includes('ru'), 'Must include Russian');
  assert.ok(codes.includes('zh-CN'), 'Must include Chinese Simplified');
  assert.ok(codes.includes('ja'), 'Must include Japanese');
  assert.ok(codes.includes('ko'), 'Must include Korean');
  assert.ok(codes.includes('vi'), 'Must include Vietnamese');
  assert.ok(codes.includes('th'), 'Must include Thai');
  assert.ok(codes.includes('tl'), 'Must include Tagalog / Filipino');
  assert.ok(codes.includes('uk'), 'Must include Ukrainian');
  assert.ok(codes.includes('ar'), 'Must include Arabic');
  assert.ok(codes.includes('hi'), 'Must include Hindi');
  assert.ok(codes.includes('sw'), 'Must include Swahili');
  assert.ok(codes.includes('am'), 'Must include Amharic');

  // Counts verification
  assert.ok(TOTAL_LANGUAGES_COUNT >= 135, `Total languages (${TOTAL_LANGUAGES_COUNT}) should exceed 135`);
  assert.ok(GOOGLE_TRANSLATE_LANGUAGES_COUNT >= 125, `Google Translate languages (${GOOGLE_TRANSLATE_LANGUAGES_COUNT}) should exceed 125`);
  assert.equal(CHIN_DIALECTS_COUNT, 9, 'Must have exactly 9 indigenous Chin dialects');
});

test('Google Translate URL generation produces valid translate.google.com links', () => {
  const url1 = getGoogleTranslateUrl('Hello world', 'en', 'es');
  assert.ok(url1.startsWith('https://translate.google.com/'));
  assert.ok(url1.includes('sl=en'));
  assert.ok(url1.includes('tl=es'));
  assert.ok(url1.includes('Hello%20world'));

  // Test Burmese
  const urlMy = getGoogleTranslateUrl('မင်္ဂလာပါ', 'my', 'en');
  assert.ok(urlMy.includes('sl=my'));
  assert.ok(urlMy.includes('tl=en'));

  // Test Auto detect
  const urlAuto = getGoogleTranslateUrl('Test', 'auto', 'fr');
  assert.ok(urlAuto.includes('sl=auto'));
  assert.ok(urlAuto.includes('tl=fr'));
});

test('isGoogleTranslateSupported correctly checks official Google Translate status', () => {
  assert.equal(isGoogleTranslateSupported('es'), true);
  assert.equal(isGoogleTranslateSupported('vi'), true);
  assert.equal(isGoogleTranslateSupported('my'), true);
  assert.equal(isGoogleTranslateSupported('lus'), true); // Mizo is in Google Translate
  assert.equal(isGoogleTranslateSupported('cnh'), false); // Hakha Chin is specialized Chin AI engine
  assert.equal(isGoogleTranslateSupported('matu'), false);
});

test('searchLanguages filters effectively across names, native scripts, and categories', () => {
  const tagalogSearch = searchLanguages('tagalog');
  assert.ok(tagalogSearch.some((l) => l.code === 'tl'));

  const spanishSearch = searchLanguages('Español');
  assert.ok(spanishSearch.some((l) => l.code === 'es'));

  const chinOnly = searchLanguages('', 'chin');
  assert.equal(chinOnly.length, 9);

  const googleOnly = searchLanguages('', 'google');
  assert.ok(googleOnly.length >= 125);
});

test('sanitizeInputText handles empty string and trims whitespace', () => {
  assert.deepEqual(sanitizeInputText(''), { cleanText: '' });
  assert.deepEqual(sanitizeInputText('   Na dam maw?   '), { cleanText: 'Na dam maw?' });
});

test('sanitizeInputText truncates excessively long text', () => {
  const longText = 'A'.repeat(2500);
  const result = sanitizeInputText(longText);
  assert.equal(result.cleanText.length, 2000);
  assert.ok(result.error?.includes('truncated'));
});

test('lookupPhrasebook retrieves verified community translations across dialects', () => {
  // Test Thank you in Hakha Chin to English
  const result = lookupPhrasebook('Ka lungawi', 'cnh', 'en');
  assert.ok(result !== null);
  assert.equal(result?.confidence, 'high');
  assert.equal(result?.translatedText, 'Thank you');
  assert.ok(result?.googleTranslateUrl?.includes('translate.google.com'));

  // Test Hello in English to Hakha Chin
  const helloResult = lookupPhrasebook('Hello', 'en', 'cnh');
  assert.ok(helloResult !== null);
  assert.equal(helloResult?.translatedText, 'Na dam maw?');

  // Test Hello in English to Mara Chin
  const maraHello = lookupPhrasebook('Hello', 'en', 'mrh');
  assert.ok(maraHello !== null);
  assert.equal(maraHello?.translatedText, 'Na pha ma?');

  // Test Thank you in English to Matu Chin
  const matuThanks = lookupPhrasebook('Thank you', 'en', 'matu');
  assert.ok(matuThanks !== null);
  assert.equal(matuThanks?.translatedText, 'Ka lawm aw');

  // Test Hello in Burmese
  const burmeseResult = lookupPhrasebook('မင်္ဂလာပါ', 'my', 'en');
  assert.ok(burmeseResult !== null);
  assert.equal(burmeseResult?.translatedText, 'Hello / How are you?');
});

test('swapLanguages properly inverts source and target, handling auto-detect', () => {
  const regular = swapLanguages('cnh', 'en');
  assert.deepEqual(regular, { source: 'en', target: 'cnh' });

  const fromAuto = swapLanguages('auto', 'cnh');
  assert.deepEqual(fromAuto, { source: 'cnh', target: 'en' });
});

test('containsMyanmarScript accurately detects Myanmar Unicode characters', () => {
  assert.equal(containsMyanmarScript('မင်္ဂလာပါ'), true);
  assert.equal(containsMyanmarScript('Lai holh cu tha tuk'), false);
  assert.equal(containsMyanmarScript('Mingalaba Myanmar'), false);
  assert.equal(containsMyanmarScript('ဆေးရုံ'), true);
});

test('getLanguageName provides friendly native and English labels', () => {
  assert.equal(getLanguageName('auto'), 'Detect Language (Auto)');
  assert.ok(getLanguageName('cnh').includes('Hakha Chin'));
  assert.ok(getLanguageName('cnh').includes('Lai holh'));
  assert.ok(getLanguageName('matu').includes('Matu'));
  assert.ok(getLanguageName('es').includes('Spanish'));
});
