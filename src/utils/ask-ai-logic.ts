/**
 * Chin Language AI - Ask AI, Health, Education, Ideas & Sponsor Logic
 */

export interface AskAICategory {
  id: 'health' | 'education' | 'ideas' | 'general';
  title: string;
  nativeTitle: string;
  description: string;
  suggestedQuestions: Array<{
    text: string;
    nativeText: string;
    lang: string;
  }>;
}

export const ASK_AI_CATEGORIES: AskAICategory[] = [
  {
    id: 'health',
    title: 'Health & Medical Navigation',
    nativeTitle: 'Ngandamnak & Sizung',
    description: 'Bilingual medical phrasing, doctor visit preparation, first aid terms, and wellness guidance in Chin dialects.',
    suggestedQuestions: [
      {
        text: 'How do I tell an English doctor that my child has a fever and stomach ache in Hakha Chin?',
        nativeText: 'Ka fale pum fak le taklinh cu sizung doctor sinah chim ning zeitindah a si?',
        lang: 'cnh',
      },
      {
        text: 'Common medical vocabulary: Hakha Chin to English translation for clinic visits',
        nativeText: 'Sizung ah hman tawnmi Chin-English biatlang hna',
        lang: 'cnh',
      },
      {
        text: 'Healthy nutrition and hydration tips for elders in Chin language',
        nativeText: 'Upale ngandamnak caah rawl le ti din ning ruahnak',
        lang: 'cnh',
      },
    ],
  },
  {
    id: 'education',
    title: 'Education & Dialect Learning',
    nativeTitle: 'Fiannak, Cawnnak & Ca Thiang',
    description: 'Learn Chin grammar, ESL resources for immigrants, youth scholarship advice, and traditional reading.',
    suggestedQuestions: [
      {
        text: 'What are the basic greeting and pronoun rules in Hakha Chin (Lai holh)?',
        nativeText: 'Lai holh cawn hramthoknak: Chibai le Minung kohning phungphai',
        lang: 'cnh',
      },
      {
        text: 'How can young Chin diaspora children practice reading Chin Latin script?',
        nativeText: 'Ramdang chuak Chin ngakchia hna nih Lai ca cawn ning phung',
        lang: 'cnh',
      },
      {
        text: 'Key differences between Hakha Chin, Falam, and Tedim dialects',
        nativeText: 'Lai holh, Falam holh le Tedim pau thleidannak hna',
        lang: 'en',
      },
    ],
  },
  {
    id: 'ideas',
    title: 'Community Ideas & Culture',
    nativeTitle: 'Khua Ruahnak & Nunphung',
    description: 'Ideas for Chin National Day, church youth programs, cultural preservation, and Indo-Myanmar community projects.',
    suggestedQuestions: [
      {
        text: 'Creative ideas for celebrating Chin National Day (February 20) with youth and diaspora',
        nativeText: 'Chin Miphun Ni (Feb 20) tuah ning ruahnak thar hna',
        lang: 'cnh',
      },
      {
        text: 'Traditional Chin cultural instruments and heritage preservation ideas',
        nativeText: 'Chin phungki rimhawi (tumtah) le nunphung kilven ning',
        lang: 'cnh',
      },
      {
        text: 'Ideas for community fundraising and supporting newly arrived families',
        nativeText: 'Ram thar phan Chin chungkhar hna bawmhnak ruahnak',
        lang: 'cnh',
      },
    ],
  },
];

export interface CommunityAd {
  id: string;
  badge: 'Sponsor' | 'Community Partner' | 'Featured';
  title: string;
  tagline: string;
  description: string;
  category: 'healthcare' | 'education' | 'services' | 'culture';
  ctaText: string;
  targetUrl: string;
  sponsorName: string;
}

export const COMMUNITY_ADS: CommunityAd[] = [
  {
    id: 'ad-health-clinic',
    badge: 'Sponsor',
    title: 'Chin Health & Wellness Alliance',
    tagline: 'Bilingual Medical Interpretation & Navigators',
    description: 'Providing free health screenings, clinic appointment translators, and Medicare/Medicaid navigation in Indianapolis, Dallas, and online.',
    category: 'healthcare',
    ctaText: 'Learn More & Find Help',
    targetUrl: '#health-resources',
    sponsorName: 'Chin Healthcare Network',
  },
  {
    id: 'ad-chin-academy',
    badge: 'Featured',
    title: 'Lai Ca Online Academy',
    tagline: 'Learn Hakha Chin, Falam, and Tedim from Home',
    description: 'Weekly interactive Zoom classes for diaspora children and adults. Preserving mother tongue literacy across generations.',
    category: 'education',
    ctaText: 'Join Free Class',
    targetUrl: '#education-academy',
    sponsorName: 'Global Chin Heritage Project',
  },
  {
    id: 'ad-community-market',
    badge: 'Community Partner',
    title: 'Chin Cultural Handcrafts & Books',
    tagline: 'Traditional clothing, hymnbooks, and Chin dictionaries',
    description: 'Authentic Chin lungum, traditional waistcoats, Christian songbooks (Lai Hlabu), and modern phrasebooks.',
    category: 'culture',
    ctaText: 'Browse Community Shop',
    targetUrl: '#community-shop',
    sponsorName: 'Chin Community Arts Guild',
  },
];

/**
 * Filter questions by search query
 */
export function filterQuestions(
  query: string,
  questions: Array<{ text: string; nativeText: string; lang: string }>
) {
  if (!query || query.trim().length === 0) return questions;
  const lower = query.toLowerCase().trim();
  return questions.filter(
    (q) => q.text.toLowerCase().includes(lower) || q.nativeText.toLowerCase().includes(lower)
  );
}

/**
 * Validate prompt length and sanitize
 */
export function sanitizeAskPrompt(prompt: string): { cleanPrompt: string; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return { cleanPrompt: '', error: 'Question cannot be empty.' };
  }
  const clean = prompt.trim();
  if (clean.length > 1000) {
    return {
      cleanPrompt: clean.substring(0, 1000),
      error: 'Question shortened to maximum 1,000 characters.',
    };
  }
  return { cleanPrompt: clean };
}
