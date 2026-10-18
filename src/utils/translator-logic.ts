/**
 * Chin Language AI Translator - Core Linguistics & Logic Engine
 * Comprehensive support for 9 Indigenous Chin Dialects, Burmese, English,
 * and 130+ Google Translate Supported World Languages.
 */

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  isChinOrRegional: boolean;
  script: 'latin' | 'myanmar' | 'other' | 'arabic' | 'cyrillic' | 'devanagari' | 'han';
  family?: string;
  region?: string;
  description?: string;
  category?: 'chin' | 'popular' | 'asia-pacific' | 'europe' | 'middle-east-south-asia' | 'africa' | 'americas';
  googleTranslateCode?: string;
  isGoogleTranslateSupported?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  // ==========================================
  // 1. PRIMARY CHIN INDIGENOUS DIALECTS (9)
  // ==========================================
  {
    code: 'cnh',
    name: 'Hakha Chin (Lai)',
    nativeName: 'Lai holh',
    isChinOrRegional: true,
    script: 'latin',
    family: 'Kuki-Chin',
    region: 'Hakha, Thantlang & global diaspora',
    category: 'chin',
    googleTranslateCode: 'cnh',
    isGoogleTranslateSupported: false,
    description: 'Central Chin lingua franca; spoken widely across Hakha, Thantlang, and the global Chin diaspora.',
  },
  {
    code: 'cfm',
    name: 'Falam Chin',
    nativeName: 'Laizo / Falam holh',
    isChinOrRegional: true,
    script: 'latin',
    family: 'Kuki-Chin',
    region: 'Falam township & diaspora',
    category: 'chin',
    googleTranslateCode: 'cfm',
    isGoogleTranslateSupported: false,
    description: 'Spoken in Falam township and surrounding communities; distinctive tonal idioms.',
  },
  {
    code: 'ctd',
    name: 'Tedim (Zomi)',
    nativeName: 'Tedim pau / Zomi',
    isChinOrRegional: true,
    script: 'latin',
    family: 'Kuki-Chin',
    region: 'Tedim, Tonzang & northern Chin State',
    category: 'chin',
    googleTranslateCode: 'ctd',
    isGoogleTranslateSupported: false,
    description: 'Northern Chin dialect featuring distinct tonal orthography and vocabulary.',
  },
  {
    code: 'lus',
    name: 'Mizo (Lushai)',
    nativeName: 'Mizo ṭawng',
    isChinOrRegional: true,
    script: 'latin',
    family: 'Kuki-Chin',
    region: 'Mizoram, India & border communities',
    category: 'chin',
    googleTranslateCode: 'lus',
    isGoogleTranslateSupported: true, // Supported in Google Translate!
    description: 'Official language of Mizoram; closely related to Chin languages with rich literary heritage.',
  },
  {
    code: 'matu',
    name: 'Matu Chin',
    nativeName: 'Matu holh',
    isChinOrRegional: true,
    script: 'latin',
    family: 'Southern Chin',
    region: 'Matupi & southern Chin State',
    category: 'chin',
    googleTranslateCode: 'matu',
    isGoogleTranslateSupported: false,
    description: 'Spoken in Matupi township; features distinct Southern Chin vowel phonology and grammar.',
  },
  {
    code: 'mrh',
    name: 'Mara Chin',
    nativeName: 'Mara reih',
    isChinOrRegional: true,
    script: 'latin',
    family: 'Maraic',
    region: 'Siaha, southern Chin & Mizoram border',
    category: 'chin',
    googleTranslateCode: 'mrh',
    isGoogleTranslateSupported: false,
    description: 'Spoken by the Mara people across southern Chin State and the Mara Autonomous District in India.',
  },
  {
    code: 'cnh-cho',
    name: 'Mindat Cho (Kcho)',
    nativeName: 'Kcho / Cho holh',
    isChinOrRegional: true,
    script: 'latin',
    family: 'Southern Chin (Sho)',
    region: 'Mindat & Kanpetlet townships',
    category: 'chin',
    googleTranslateCode: 'cnh-cho',
    isGoogleTranslateSupported: false,
    description: 'Traditional dialect of southern Chin State with unique pitch accents and ancient idioms.',
  },
  {
    code: 'ltc',
    name: 'Lautu Chin',
    nativeName: 'Lautu holh',
    isChinOrRegional: true,
    script: 'latin',
    family: 'Central Chin',
    region: 'Lautu area, Matupi & Hakha border',
    category: 'chin',
    googleTranslateCode: 'ltc',
    isGoogleTranslateSupported: false,
    description: 'Distinctive community dialect spoken in the Lautu region between Hakha and Matupi.',
  },
  {
    code: 'zyp',
    name: 'Zyphe Chin',
    nativeName: 'Zyphe holh',
    isChinOrRegional: true,
    script: 'latin',
    family: 'Maraic / Central Chin',
    region: 'Thantlang & Matupi border',
    category: 'chin',
    googleTranslateCode: 'zyp',
    isGoogleTranslateSupported: false,
    description: 'Spoken by the Zyphe community; maintains unique phonetic glottal stops.',
  },

  // ==========================================
  // 2. NATIONAL & POPULAR / GLOBAL LANGUAGES
  // ==========================================
  {
    code: 'my',
    name: 'Burmese (Myanmar)',
    nativeName: 'မြန်မာစာ',
    isChinOrRegional: true,
    script: 'myanmar',
    family: 'Burmish',
    region: 'National language of Myanmar',
    category: 'popular',
    googleTranslateCode: 'my',
    isGoogleTranslateSupported: true,
    description: 'Official language of Myanmar; widely used in inter-ethnic, trade, and administrative contexts.',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    isChinOrRegional: true,
    script: 'latin',
    family: 'Germanic',
    region: 'International & diaspora host nations',
    category: 'popular',
    googleTranslateCode: 'en',
    isGoogleTranslateSupported: true,
    description: 'International lingua franca and official language in US, UK, Canada, Australia host communities.',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    isChinOrRegional: false,
    script: 'latin',
    category: 'popular',
    googleTranslateCode: 'es',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    isChinOrRegional: false,
    script: 'latin',
    category: 'popular',
    googleTranslateCode: 'fr',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    isChinOrRegional: false,
    script: 'latin',
    category: 'popular',
    googleTranslateCode: 'de',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'zh-CN',
    name: 'Chinese (Simplified)',
    nativeName: '中文 (简体)',
    isChinOrRegional: false,
    script: 'han',
    category: 'popular',
    googleTranslateCode: 'zh-CN',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'zh-TW',
    name: 'Chinese (Traditional)',
    nativeName: '中文 (繁體)',
    isChinOrRegional: false,
    script: 'han',
    category: 'popular',
    googleTranslateCode: 'zh-TW',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    isChinOrRegional: false,
    script: 'other',
    category: 'popular',
    googleTranslateCode: 'ja',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    isChinOrRegional: false,
    script: 'other',
    category: 'popular',
    googleTranslateCode: 'ko',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    isChinOrRegional: false,
    script: 'devanagari',
    category: 'popular',
    googleTranslateCode: 'hi',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    isChinOrRegional: false,
    script: 'arabic',
    category: 'popular',
    googleTranslateCode: 'ar',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    isChinOrRegional: false,
    script: 'latin',
    category: 'popular',
    googleTranslateCode: 'pt',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'popular',
    googleTranslateCode: 'ru',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    isChinOrRegional: false,
    script: 'latin',
    category: 'popular',
    googleTranslateCode: 'it',
    isGoogleTranslateSupported: true,
  },

  // ==========================================
  // 3. ASIA & PACIFIC (Google Translate)
  // ==========================================
  {
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
    isChinOrRegional: false,
    script: 'other',
    category: 'asia-pacific',
    googleTranslateCode: 'th',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'vi',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'id',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ms',
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'ms',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'tl',
    name: 'Filipino (Tagalog)',
    nativeName: 'Wikang Filipino',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'tl',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'km',
    name: 'Khmer (Cambodian)',
    nativeName: 'ភាសាខ្មែរ',
    isChinOrRegional: false,
    script: 'other',
    category: 'asia-pacific',
    googleTranslateCode: 'km',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'lo',
    name: 'Lao',
    nativeName: 'ພາສາລາວ',
    isChinOrRegional: false,
    script: 'other',
    category: 'asia-pacific',
    googleTranslateCode: 'lo',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'mn',
    name: 'Mongolian',
    nativeName: 'Монгол хэл',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'asia-pacific',
    googleTranslateCode: 'mn',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ceb',
    name: 'Cebuano',
    nativeName: 'Sinugboanon',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'ceb',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ilo',
    name: 'Ilocano',
    nativeName: 'Ilokano',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'ilo',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'jv',
    name: 'Javanese',
    nativeName: 'Basa Jawa',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'jv',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'su',
    name: 'Sundanese',
    nativeName: 'Basa Sunda',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'su',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'hmn',
    name: 'Hmong',
    nativeName: 'Hmoob',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'hmn',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'sm',
    name: 'Samoan',
    nativeName: 'Gagana faʻa Sāmoa',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'sm',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'haw',
    name: 'Hawaiian',
    nativeName: 'ʻŌlelo Hawaiʻi',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'haw',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'mi',
    name: 'Maori',
    nativeName: 'Te Reo Māori',
    isChinOrRegional: false,
    script: 'latin',
    category: 'asia-pacific',
    googleTranslateCode: 'mi',
    isGoogleTranslateSupported: true,
  },

  // ==========================================
  // 4. MIDDLE EAST & SOUTH ASIA (Google Translate)
  // ==========================================
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'bn',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'pa',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'gu',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'ta',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'te',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'kn',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'ml',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    isChinOrRegional: false,
    script: 'devanagari',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'mr',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    isChinOrRegional: false,
    script: 'arabic',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'ur',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
    isChinOrRegional: false,
    script: 'devanagari',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'ne',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'si',
    name: 'Sinhala',
    nativeName: 'සිංහල',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'si',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'as',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'bho',
    name: 'Bhojpuri',
    nativeName: 'भोजपुरी',
    isChinOrRegional: false,
    script: 'devanagari',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'bho',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'doi',
    name: 'Dogri',
    nativeName: 'डोगरी',
    isChinOrRegional: false,
    script: 'devanagari',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'doi',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'gom',
    name: 'Konkani',
    nativeName: 'कोंकणी',
    isChinOrRegional: false,
    script: 'devanagari',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'gom',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'mai',
    name: 'Maithili',
    nativeName: 'मैथिली',
    isChinOrRegional: false,
    script: 'devanagari',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'mai',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'mni-Mtei',
    name: 'Meiteilon (Manipuri)',
    nativeName: 'ꯃꯩꯇꯩꯂꯣꯟ',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'mni-Mtei',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'or',
    name: 'Odia (Oriya)',
    nativeName: 'ଓଡ଼ିଆ',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'or',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'sa',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    isChinOrRegional: false,
    script: 'devanagari',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'sa',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'sd',
    name: 'Sindhi',
    nativeName: 'سنڌي',
    isChinOrRegional: false,
    script: 'arabic',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'sd',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'dv',
    name: 'Dhivehi (Maldivian)',
    nativeName: 'ދިވެހި',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'dv',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'fa',
    name: 'Persian (Farsi)',
    nativeName: 'فارسی',
    isChinOrRegional: false,
    script: 'arabic',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'fa',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    isChinOrRegional: false,
    script: 'latin',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'tr',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'he',
    name: 'Hebrew',
    nativeName: 'עברית',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'iw', // Google Translate uses iw for Hebrew
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ps',
    name: 'Pashto',
    nativeName: 'پښتو',
    isChinOrRegional: false,
    script: 'arabic',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'ps',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ku',
    name: 'Kurdish (Kurmanji)',
    nativeName: 'Kurdî (Kurmancî)',
    isChinOrRegional: false,
    script: 'latin',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'ku',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ckb',
    name: 'Kurdish (Sorani)',
    nativeName: 'کوردی (سۆرانی)',
    isChinOrRegional: false,
    script: 'arabic',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'ckb',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'az',
    name: 'Azerbaijani',
    nativeName: 'Azərbaycan dili',
    isChinOrRegional: false,
    script: 'latin',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'az',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'hy',
    name: 'Armenian',
    nativeName: 'Հայերեն',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'hy',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ka',
    name: 'Georgian',
    nativeName: 'ქართული',
    isChinOrRegional: false,
    script: 'other',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'ka',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'kk',
    name: 'Kazakh',
    nativeName: 'Қазақ тілі',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'kk',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'uz',
    name: 'Uzbek',
    nativeName: 'Oʻzbekcha',
    isChinOrRegional: false,
    script: 'latin',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'uz',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ky',
    name: 'Kyrgyz',
    nativeName: 'Кыргызча',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'ky',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'tg',
    name: 'Tajik',
    nativeName: 'Тоҷикӣ',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'tg',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'tk',
    name: 'Turkmen',
    nativeName: 'Türkmençe',
    isChinOrRegional: false,
    script: 'latin',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'tk',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'tt',
    name: 'Tatar',
    nativeName: 'Татар теле',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'tt',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ug',
    name: 'Uyghur',
    nativeName: 'ئۇيغۇرچە',
    isChinOrRegional: false,
    script: 'arabic',
    category: 'middle-east-south-asia',
    googleTranslateCode: 'ug',
    isGoogleTranslateSupported: true,
  },

  // ==========================================
  // 5. EUROPE (Google Translate)
  // ==========================================
  {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'nl',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'pl',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'uk',
    name: 'Ukrainian',
    nativeName: 'Українська',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'europe',
    googleTranslateCode: 'uk',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'cs',
    name: 'Czech',
    nativeName: 'Čeština',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'cs',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'sv',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'el',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    isChinOrRegional: false,
    script: 'other',
    category: 'europe',
    googleTranslateCode: 'el',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ro',
    name: 'Romanian',
    nativeName: 'Română',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'ro',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'hu',
    name: 'Hungarian',
    nativeName: 'Magyar',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'hu',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'da',
    name: 'Danish',
    nativeName: 'Dansk',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'da',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'fi',
    name: 'Finnish',
    nativeName: 'Suomi',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'fi',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'no',
    name: 'Norwegian',
    nativeName: 'Norsk',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'no',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'sk',
    name: 'Slovak',
    nativeName: 'Slovenčina',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'sk',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'bg',
    name: 'Bulgarian',
    nativeName: 'Български',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'europe',
    googleTranslateCode: 'bg',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'hr',
    name: 'Croatian',
    nativeName: 'Hrvatski',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'hr',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'sr',
    name: 'Serbian',
    nativeName: 'Српски',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'europe',
    googleTranslateCode: 'sr',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'sl',
    name: 'Slovenian',
    nativeName: 'Slovenščina',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'sl',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'lt',
    name: 'Lithuanian',
    nativeName: 'Lietuvių',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'lt',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'lv',
    name: 'Latvian',
    nativeName: 'Latviešu',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'lv',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'et',
    name: 'Estonian',
    nativeName: 'Eesti',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'et',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ga',
    name: 'Irish',
    nativeName: 'Gaeilge',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'ga',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'cy',
    name: 'Welsh',
    nativeName: 'Cymraeg',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'cy',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'is',
    name: 'Icelandic',
    nativeName: 'Íslenska',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'is',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'sq',
    name: 'Albanian',
    nativeName: 'Shqip',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'sq',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'eu',
    name: 'Basque',
    nativeName: 'Euskara',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'eu',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ca',
    name: 'Catalan',
    nativeName: 'Català',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'ca',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'gl',
    name: 'Galician',
    nativeName: 'Galego',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'gl',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'bs',
    name: 'Bosnian',
    nativeName: 'Bosanski',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'bs',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'mk',
    name: 'Macedonian',
    nativeName: 'Македонски',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'europe',
    googleTranslateCode: 'mk',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'be',
    name: 'Belarusian',
    nativeName: 'Беларуская',
    isChinOrRegional: false,
    script: 'cyrillic',
    category: 'europe',
    googleTranslateCode: 'be',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'mt',
    name: 'Maltese',
    nativeName: 'Malti',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'mt',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'lb',
    name: 'Luxembourgish',
    nativeName: 'Lëtzebuergesch',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'lb',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'fy',
    name: 'Frisian',
    nativeName: 'Frysk',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'fy',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'co',
    name: 'Corsican',
    nativeName: 'Corsu',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'co',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'gd',
    name: 'Scots Gaelic',
    nativeName: 'Gàidhlig',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'gd',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'la',
    name: 'Latin',
    nativeName: 'Latina',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'la',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'eo',
    name: 'Esperanto',
    nativeName: 'Esperanto',
    isChinOrRegional: false,
    script: 'latin',
    category: 'europe',
    googleTranslateCode: 'eo',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'yi',
    name: 'Yiddish',
    nativeName: 'ייִדיש',
    isChinOrRegional: false,
    script: 'other',
    category: 'europe',
    googleTranslateCode: 'yi',
    isGoogleTranslateSupported: true,
  },

  // ==========================================
  // 6. AFRICA & AMERICAS (Google Translate)
  // ==========================================
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'sw',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'am',
    name: 'Amharic',
    nativeName: 'አማርኛ',
    isChinOrRegional: false,
    script: 'other',
    category: 'africa',
    googleTranslateCode: 'am',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'so',
    name: 'Somali',
    nativeName: 'Soomaaliga',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'so',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Èdè Yorùbá',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'yo',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ig',
    name: 'Igbo',
    nativeName: 'Asụsụ Igbo',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'ig',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Harshen Hausa',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'ha',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'zu',
    name: 'Zulu',
    nativeName: 'isiZulu',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'zu',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'xh',
    name: 'Xhosa',
    nativeName: 'isiXhosa',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'xh',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'af',
    name: 'Afrikaans',
    nativeName: 'Afrikaans',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'af',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'bm',
    name: 'Bambara',
    nativeName: 'Bamanankan',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'bm',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ny',
    name: 'Chichewa',
    nativeName: 'ChiCheŵa',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'ny',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ee',
    name: 'Ewe',
    nativeName: 'Eʋegbe',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'ee',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'rw',
    name: 'Kinyarwanda',
    nativeName: 'Ikinyarwanda',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'rw',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'kri',
    name: 'Krio',
    nativeName: 'Krio',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'kri',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ln',
    name: 'Lingala',
    nativeName: 'Lingála',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'ln',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'lg',
    name: 'Luganda',
    nativeName: 'Oluganda',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'lg',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'mg',
    name: 'Malagasy',
    nativeName: 'Malagasy',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'mg',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'om',
    name: 'Oromo',
    nativeName: 'Afaan Oromoo',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'om',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'nso',
    name: 'Sepedi (Northern Sotho)',
    nativeName: 'Sepedi',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'nso',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'st',
    name: 'Sesotho (Southern Sotho)',
    nativeName: 'Sesotho',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'st',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'sn',
    name: 'Shona',
    nativeName: 'chiShona',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'sn',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ti',
    name: 'Tigrinya',
    nativeName: 'ትግርኛ',
    isChinOrRegional: false,
    script: 'other',
    category: 'africa',
    googleTranslateCode: 'ti',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ts',
    name: 'Tsonga',
    nativeName: 'Xitsonga',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'ts',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ak',
    name: 'Twi (Akan)',
    nativeName: 'Twi',
    isChinOrRegional: false,
    script: 'latin',
    category: 'africa',
    googleTranslateCode: 'ak',
    isGoogleTranslateSupported: true,
  },
  // Americas Indigenous / Creole (Google Translate)
  {
    code: 'ay',
    name: 'Aymara',
    nativeName: 'Aymar aru',
    isChinOrRegional: false,
    script: 'latin',
    category: 'americas',
    googleTranslateCode: 'ay',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'gn',
    name: 'Guarani',
    nativeName: 'Avañeʼẽ',
    isChinOrRegional: false,
    script: 'latin',
    category: 'americas',
    googleTranslateCode: 'gn',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'ht',
    name: 'Haitian Creole',
    nativeName: 'Kreyòl ayisyen',
    isChinOrRegional: false,
    script: 'latin',
    category: 'americas',
    googleTranslateCode: 'ht',
    isGoogleTranslateSupported: true,
  },
  {
    code: 'qu',
    name: 'Quechua',
    nativeName: 'Runasimi',
    isChinOrRegional: false,
    script: 'latin',
    category: 'americas',
    googleTranslateCode: 'qu',
    isGoogleTranslateSupported: true,
  },
];

export const MAX_INPUT_CHARACTERS = 2000;

export const TOTAL_LANGUAGES_COUNT = SUPPORTED_LANGUAGES.length;
export const GOOGLE_TRANSLATE_LANGUAGES_COUNT = SUPPORTED_LANGUAGES.filter(
  (l) => l.isGoogleTranslateSupported
).length;
export const CHIN_DIALECTS_COUNT = SUPPORTED_LANGUAGES.filter((l) => l.category === 'chin').length;

export interface TranslationResult {
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  confidence: 'high' | 'medium' | 'low';
  pronunciationGuide?: string;
  alternativePhraisings?: string[];
  linguisticNotes?: string;
  uncertaintyWarning?: string;
  isCachedOrDirect?: boolean;
  googleTranslateUrl?: string;
}

export interface PhraseDictionaryEntry {
  key: string;
  cnh: string;
  cfm: string;
  ctd: string;
  lus: string;
  matu?: string;
  mrh?: string;
  cnh_cho?: string;
  ltc?: string;
  zyp?: string;
  my: string;
  en: string;
  pronunciationCnh?: string;
  pronunciationMy?: string;
}

/**
 * Verified offline community phrasebook for high-frequency daily & emergency needs across 9 Chin dialects.
 */
export const ESSENTIAL_PHRASEBOOK: PhraseDictionaryEntry[] = [
  {
    key: 'hello',
    cnh: 'Na dam maw?',
    cfm: 'Na dam maw?',
    ctd: 'Na dam maw?',
    lus: 'Chibai / I dam em?',
    matu: 'Na dam ma?',
    mrh: 'Na pha ma?',
    cnh_cho: 'Nang dam maw?',
    ltc: 'Na dam maw?',
    zyp: 'Na dam maw?',
    my: 'မင်္ဂလာပါ',
    en: 'Hello / How are you?',
    pronunciationCnh: 'Nah dahm maw?',
    pronunciationMy: 'Mingalaba',
  },
  {
    key: 'thank_you',
    cnh: 'Ka lungawi',
    cfm: 'Ka lawm e',
    ctd: 'Ka lungdam hi',
    lus: 'Ka lawm e',
    matu: 'Ka lawm aw',
    mrh: 'Ei ngiachhaih na',
    cnh_cho: 'Ka lunglawm e',
    ltc: 'Ka lungawi',
    zyp: 'Ka lawm e',
    my: 'ကျေးဇူးတင်ပါတယ်',
    en: 'Thank you',
    pronunciationCnh: 'Kah loong-ah-wee',
    pronunciationMy: 'Kyei-zu tin-ba-de',
  },
  {
    key: 'god_bless_you',
    cnh: 'Bawipa nih thluachuah in pe ko seh',
    cfm: 'Pathian in thluachuah lo pe seh',
    ctd: 'Pasian in thupha hong pia hen',
    lus: 'Lalpan malsawm che rawh se',
    matu: 'Khazoh nih thluachuah nang pe seh',
    mrh: 'Abeipa ta thlahpa cha vaw pie mawh sy',
    cnh_cho: 'Bawi Pathian nih thluachuah pe ko seh',
    ltc: 'Bawipa nih thluachuah lo pe seh',
    zyp: 'Pathian nih thluachuah pe ko seh',
    my: 'ဘုရားသခင် ကောင်းချီးပေးပါစေ',
    en: 'God bless you',
    pronunciationCnh: 'Baw-ee-pah nih thloo-ah-choo-ah in peh koh seh',
    pronunciationMy: 'Pha-ya tha-kin kaung-chi pei-ba-zei',
  },
  {
    key: 'need_help',
    cnh: 'Bawmhnak ka herh',
    cfm: 'Bawmnak ka tul',
    ctd: 'Huhuhna ka kisam hi',
    lus: 'Puih ka ngai',
    matu: 'Bawmhnak ka tlaw',
    mrh: 'Bawmna ei khoh',
    cnh_cho: 'Bawmhnak ka ngai',
    ltc: 'Bawmhnak ka tul',
    zyp: 'Bawmhnak ka herh',
    my: 'အကူအညီ လိုအပ်ပါတယ်',
    en: 'I need help',
    pronunciationCnh: 'Bawm-nahk kah hehr',
    pronunciationMy: 'Ah-ku-ah-nyi lo-at-ba-de',
  },
  {
    key: 'hospital',
    cnh: 'Sizung khoika ah dah a um?',
    cfm: 'Si-inn khawi ah a um?',
    ctd: 'Si-inn koi ah om hiam?',
    lus: 'Damdawi in khawnge a awm?',
    matu: 'Si-inn koika ah a am?',
    mrh: 'Dothapakhai khei li a y?',
    cnh_cho: 'Si-inn khoiah a um?',
    ltc: 'Sizung khawi ah a um?',
    zyp: 'Sizung khoika ah a um?',
    my: 'ဆေးရုံ ဘယ်မှာရှိပါသလဲ',
    en: 'Where is the hospital?',
    pronunciationCnh: 'See-zoong khoy-kah ah dah ah oom?',
    pronunciationMy: 'Sei-yon beh-hma shi-ba-dha-le',
  },
  {
    key: 'goodbye',
    cnh: 'Mangtha / Damte in um u',
    cfm: 'Mang tha / Damte in um',
    ctd: 'Mangpha / Dam takin',
    lus: 'Mang tha le',
    matu: 'Mangtha / Damte om o',
    mrh: 'Mawna / Phana y la',
    cnh_cho: 'Damte in um',
    ltc: 'Mangtha',
    zyp: 'Damte in um o',
    my: 'သွားပါဦးမယ်',
    en: 'Goodbye / Stay well',
    pronunciationCnh: 'Mahng-tha',
    pronunciationMy: 'Thwa-ba-ohn-meh',
  },
  {
    key: 'welcome',
    cnh: 'Donnak kan in pe hna',
    cfm: 'Donnak kan lo pe',
    ctd: 'Na hong pai na tungah lungdam',
    lus: 'Lo pawm che u',
    matu: 'Donnak nang pe uh',
    mrh: 'Nama vaw tlyhna liana ei ly',
    cnh_cho: 'Lunglawmte in kan in don',
    ltc: 'Donnak kan lo pe',
    zyp: 'Kan in don',
    my: 'ကြိုဆိုပါတယ်',
    en: 'Welcome',
    pronunciationCnh: 'Don-nahk kahn in peh nah',
    pronunciationMy: 'Kyo-so-ba-de',
  },
  {
    key: 'peace',
    cnh: 'Daihnak',
    cfm: 'Daihnak',
    ctd: 'Lemna / Daihna',
    lus: 'Remna / Daihna',
    matu: 'Daihnak',
    mrh: 'Phaona',
    cnh_cho: 'Daihnak',
    ltc: 'Daihnak',
    zyp: 'Daihnak',
    my: 'ငြိမ်းချမ်းရေး',
    en: 'Peace',
    pronunciationCnh: 'Dye-nahk',
    pronunciationMy: 'Nyein-gyan-yei',
  },
];

/**
 * Clean & normalize text before sending to AI or lookup
 */
export function sanitizeInputText(text: string): { cleanText: string; error?: string } {
  if (!text) {
    return { cleanText: '' };
  }
  const clean = text.trim();
  if (clean.length > MAX_INPUT_CHARACTERS) {
    return {
      cleanText: clean.substring(0, MAX_INPUT_CHARACTERS),
      error: `Text truncated to ${MAX_INPUT_CHARACTERS} characters limit.`,
    };
  }
  return { cleanText: clean };
}

/**
 * Look up exact phrase in verified community phrasebook
 */
export function lookupPhrasebook(
  text: string,
  sourceCode: string,
  targetCode: string
): TranslationResult | null {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return null;

  for (const entry of ESSENTIAL_PHRASEBOOK) {
    const entryRecord = entry as unknown as Record<string, string | undefined>;
    const sourceKey = sourceCode.replace('-', '_');
    const targetKey = targetCode.replace('-', '_');

    const sourceVal = (entryRecord[sourceKey] || entryRecord[sourceCode])?.toLowerCase();
    const englishVal = entry.en.toLowerCase();

    const matchesDirect =
      sourceVal &&
      (normalized === sourceVal || normalized.includes(sourceVal) || sourceVal.includes(normalized));
    const matchesEnglish =
      sourceCode === 'en' && (englishVal.includes(normalized) || normalized.includes(englishVal));

    if (matchesDirect || matchesEnglish) {
      const targetVal = entryRecord[targetKey] || entryRecord[targetCode];
      if (targetVal) {
        return {
          translatedText: targetVal,
          sourceLang: sourceCode,
          targetLang: targetCode,
          confidence: 'high',
          pronunciationGuide:
            targetCode === 'cnh'
              ? entry.pronunciationCnh
              : targetCode === 'my'
              ? entry.pronunciationMy
              : undefined,
          linguisticNotes: 'Verified indigenous Chin community dictionary match.',
          isCachedOrDirect: true,
          googleTranslateUrl: getGoogleTranslateUrl(text, sourceCode, targetCode),
        };
      }
    }
  }

  return null;
}

/**
 * Swap source and target languages safely
 */
export function swapLanguages(
  currentSource: string,
  currentTarget: string
): { source: string; target: string } {
  if (currentSource === 'auto') {
    const newSource = currentTarget;
    const newTarget = currentTarget === 'cnh' ? 'en' : 'cnh';
    return { source: newSource, target: newTarget };
  }
  return { source: currentTarget, target: currentSource };
}

/**
 * Check if text contains Myanmar script characters
 */
export function containsMyanmarScript(text: string): boolean {
  return /[\u1000-\u109F\uAA60-\uAA7F\uA9E0-\uA9FF]/.test(text);
}

/**
 * Get Google Translate code for a given language code
 */
export function getGoogleTranslateCode(code: string): string {
  if (code === 'auto') return 'auto';
  // Check exact code in SUPPORTED_LANGUAGES
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
  if (lang?.googleTranslateCode) return lang.googleTranslateCode;
  // Fallbacks for sub-dialects or variations
  if (code === 'cnh' || code === 'cfm' || code === 'ctd' || code === 'matu' || code === 'mrh' || code === 'cnh-cho' || code === 'ltc' || code === 'zyp') {
    return 'my'; // closest official Myanmar language in Google Translate for fallback
  }
  return code;
}

/**
 * Generate Google Translate web URL prefilled with text and language pair
 */
export function getGoogleTranslateUrl(text: string, sourceLang: string, targetLang: string): string {
  const sourceCode = getGoogleTranslateCode(sourceLang);
  const targetCode = getGoogleTranslateCode(targetLang);
  const encodedText = encodeURIComponent(text || '');
  return `https://translate.google.com/?sl=${sourceCode}&tl=${targetCode}&text=${encodedText}&op=translate`;
}

/**
 * Check if a language code is natively supported in Google Translate
 */
export function isGoogleTranslateSupported(code: string): boolean {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
  return !!lang?.isGoogleTranslateSupported;
}

/**
 * Search across all 140+ supported languages by name, native name, or code
 */
export function searchLanguages(query: string, categoryFilter?: string): LanguageOption[] {
  const clean = query.trim().toLowerCase();
  let list = SUPPORTED_LANGUAGES;

  if (categoryFilter && categoryFilter !== 'all') {
    if (categoryFilter === 'chin') {
      list = list.filter((l) => l.isChinOrRegional && l.category === 'chin');
    } else if (categoryFilter === 'google') {
      list = list.filter((l) => l.isGoogleTranslateSupported);
    } else {
      list = list.filter((l) => l.category === categoryFilter);
    }
  }

  if (!clean) return list;

  return list.filter((lang) => {
    return (
      lang.name.toLowerCase().includes(clean) ||
      lang.nativeName.toLowerCase().includes(clean) ||
      lang.code.toLowerCase().includes(clean) ||
      (lang.region && lang.region.toLowerCase().includes(clean)) ||
      (lang.family && lang.family.toLowerCase().includes(clean))
    );
  });
}

/**
 * Format language label with native name
 */
export function getLanguageName(code: string): string {
  if (code === 'auto') return 'Detect Language (Auto)';
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
  if (!lang) return code.toUpperCase();
  return `${lang.name} (${lang.nativeName})`;
}

/**
 * Get linguistic disclaimer
 */
export function getLinguisticDisclaimer(): string {
  return 'Notice: Chin dialects feature rich regional variations. AI translations are provided for community understanding and must be independently verified before medical, legal, or official use.';
}
