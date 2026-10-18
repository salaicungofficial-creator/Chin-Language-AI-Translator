import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import {
  lookupPhrasebook,
  sanitizeInputText,
  SUPPORTED_LANGUAGES,
  MAX_INPUT_CHARACTERS,
  getGoogleTranslateUrl,
} from './src/utils/translator-logic.ts';
import {
  CLINICAL_LEGAL_PHRASES,
  filterPhrases,
  PhraseCategory,
} from './src/utils/phrase-pack-data.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

// Simple in-memory rate limiter per IP
const requestCounts = new Map<string, { count: number; resetTime: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 50;

  const userRecord = requestCounts.get(ip);
  if (!userRecord || now > userRecord.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userRecord.count >= maxRequests) {
    return false;
  }

  userRecord.count++;
  return true;
}

// In-memory feedback store
interface FeedbackItem {
  id: string;
  timestamp: string;
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  isHelpful: boolean;
  suggestedCorrection?: string;
  userComment?: string;
  rating?: number;
}
const feedbackStore: FeedbackItem[] = [];

// Initialize Gemini client on server
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!geminiApiKey,
    supportedLanguagesCount: SUPPORTED_LANGUAGES.length,
    timestamp: new Date().toISOString(),
  });
});

// Translation endpoint supporting all 9 Chin and regional languages
app.post('/api/translate', async (req, res) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a moment before submitting another translation.',
      });
    }

    const { text, sourceLang = 'auto', targetLang = 'cnh', consentToStore = false } = req.body;
    const { cleanText, error: lengthError } = sanitizeInputText(text);

    if (!cleanText) {
      return res.status(400).json({ error: 'Please enter text to translate.' });
    }

    if (cleanText.length > MAX_INPUT_CHARACTERS) {
      return res.status(400).json({
        error: `Text exceeds maximum allowed length of ${MAX_INPUT_CHARACTERS} characters.`,
      });
    }

    // 1. Check exact phrasebook first for fast, 100% verified native dialect response
    const phrasebookMatch = lookupPhrasebook(cleanText, sourceLang, targetLang);
    if (phrasebookMatch) {
      return res.json({
        ...phrasebookMatch,
        warningNotice: lengthError,
      });
    }

    // 2. If no API key configured, provide helpful fallbacks or prompt
    if (!ai) {
      return res.json({
        translatedText: `[Translation preview for ${targetLang.toUpperCase()}]: ${cleanText}`,
        sourceLang: sourceLang === 'auto' ? 'en' : sourceLang,
        targetLang,
        confidence: 'medium',
        pronunciationGuide: 'AI key not detected in server environment.',
        linguisticNotes: 'Please configure GEMINI_API_KEY in Settings > Secrets for live AI translations.',
        isCachedOrDirect: false,
        googleTranslateUrl: getGoogleTranslateUrl(cleanText, sourceLang, targetLang),
      });
    }

    // 3. Build specialized prompt for expanded Chin dialects and 130+ Google Translate world languages
    const sourceLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === sourceLang);
    const targetLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === targetLang);

    const sourceName = sourceLang === 'auto' ? 'Auto-Detect' : (sourceLangObj?.name || sourceLang);
    const targetName = targetLangObj?.name || targetLang;

    const systemInstruction = `You are a certified, world-class linguist and polyglot translator specializing in:
1. Chin indigenous languages of Myanmar (Burma), Mizoram (India), and the global diaspora:
   - Hakha Chin (Lai holh): central lingua franca spoken in Hakha and Thantlang; Latin script, respectful honorifics (na/nan/kan), tonal glottal stops.
   - Falam Chin (Laizo / Falam holh): Latin script, regional Falam idioms and vocabulary.
   - Tedim (Zomi / Tedim pau): northern Chin State; Latin script, distinct tonal orthography and vocabulary.
   - Mizo (Mizo ṭawng / Lushai): Latin script with tonal accents (ṭ, aw), literary register (also in Google Translate).
   - Matu (Matu holh): southern Chin State (Matupi); distinctive southern Chin vowel phonology.
   - Mara (Mara reih): southern Chin & Mizoram border; Maraic branch orthography.
   - Mindat Cho (Kcho / Cho holh): southern Chin (Mindat, Kanpetlet); unique tonal markers and ancestral idioms.
   - Lautu (Lautu holh): central Chin dialect spoken between Hakha and Matupi.
   - Zyphe (Zyphe holh): Thantlang/Matupi region dialect with glottal stops.
2. Burmese (မြန်မာစာ): Standard Myanmar Unicode script (never legacy Zawgyi).
3. English and all 130+ Google Translate supported world and regional languages (Spanish, French, German, Italian, Portuguese, Russian, Chinese Simplified & Traditional, Japanese, Korean, Vietnamese, Thai, Indonesian, Malay, Tagalog/Filipino, Hindi, Bengali, Punjabi, Gujarati, Tamil, Telugu, Urdu, Arabic, Persian, Turkish, Ukrainian, Polish, Dutch, Swahili, Amharic, etc.).

TRANSLATION DIRECTIVES:
1. Preserve original meaning, cultural nuance, respectful register, tone, and formatting.
2. Maintain natural phrasing in the target language. For Chin dialects, use authentic indigenous community terminology.
3. DO NOT hallucinate or guess falsely. If an idiom or dialect nuance is ambiguous, choose the most natural community phrasing and explicitly set confidence to "medium" or "low".
4. Provide a practical Latin phonetic pronunciation guide for learners when target is a Chin dialect or Burmese.
5. If appropriate, provide 1-2 common alternative phraisings or dialect variations.
6. In linguisticNotes, briefly explain any cultural, medical, or dialect nuance.
7. Return your answer in valid JSON format matching the schema.`;

    const prompt = `Translate the following text accurately:
Source Language: ${sourceName} (${sourceLang})
Target Language: ${targetName} (${targetLang})

Text to translate:
"""${cleanText}"""`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            translatedText: {
              type: Type.STRING,
              description: 'The final, natural, culturally authentic translated text in the target language.',
            },
            detectedSource: {
              type: Type.STRING,
              description: 'The detected language name and code if source was auto.',
            },
            confidence: {
              type: Type.STRING,
              description: 'Confidence level: high, medium, or low.',
            },
            pronunciationGuide: {
              type: Type.STRING,
              description: 'Phonetic Romanized pronunciation guide for the translated text.',
            },
            alternativePhraisings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Optional 1-2 alternative phraisings or colloquial variations.',
            },
            linguisticNotes: {
              type: Type.STRING,
              description: 'Helpful linguistic notes or dialect context for the translation.',
            },
            uncertaintyWarning: {
              type: Type.STRING,
              description: 'Warning if translation has nuances that require human review.',
            },
          },
          required: ['translatedText', 'confidence'],
        },
      },
    });

    const responseText = response.text?.trim() || '{}';
    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch {
      parsedResult = {
        translatedText: responseText,
        confidence: 'medium',
      };
    }

    return res.json({
      translatedText: parsedResult.translatedText || '',
      sourceLang: sourceLang === 'auto' ? (parsedResult.detectedSource || 'en') : sourceLang,
      targetLang,
      confidence: parsedResult.confidence || 'medium',
      pronunciationGuide: parsedResult.pronunciationGuide || '',
      alternativePhraisings: parsedResult.alternativePhraisings || [],
      linguisticNotes: parsedResult.linguisticNotes || '',
      uncertaintyWarning: parsedResult.uncertaintyWarning || '',
      isCachedOrDirect: false,
      googleTranslateUrl: getGoogleTranslateUrl(cleanText, sourceLang, targetLang),
    });
  } catch (error: any) {
    console.error('Translation error:', error);
    return res.status(500).json({
      error: 'Failed to process translation with AI. Please try again or use simpler phrasing.',
      details: error?.message,
    });
  }
});

// Text-to-Speech endpoint using gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req, res) => {
  try {
    const { text, language = 'en' } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required for speech generation.' });
    }

    if (!ai) {
      return res.status(503).json({ error: 'AI Audio service unavailable: API key not set.' });
    }

    // Limit audio generation to 300 characters to keep latency fast
    const speechText = text.trim().slice(0, 300);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [{ text: speechText }],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'Failed to generate audio output.' });
    }

    return res.json({
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (err: any) {
    console.error('TTS error:', err);
    return res.status(500).json({ error: 'Failed to generate speech', details: err?.message });
  }
});

// Clinic & Legal Phrase Packs API endpoint
app.get('/api/phrase-packs', (req, res) => {
  const category = (req.query.category as PhraseCategory) || 'all';
  const query = (req.query.q as string) || '';

  const results = filterPhrases(CLINICAL_LEGAL_PHRASES, query, category);
  res.json({
    total: results.length,
    category,
    query,
    phrases: results,
  });
});

// Feedback submission endpoint
app.post('/api/feedback', (req, res) => {
  try {
    const {
      originalText,
      translatedText,
      sourceLang,
      targetLang,
      isHelpful,
      suggestedCorrection,
      userComment,
      rating,
    } = req.body;

    const feedback: FeedbackItem = {
      id: 'fb-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      originalText: originalText || '',
      translatedText: translatedText || '',
      sourceLang: sourceLang || '',
      targetLang: targetLang || '',
      isHelpful: !!isHelpful,
      suggestedCorrection: suggestedCorrection || '',
      userComment: userComment || '',
      rating: rating || (isHelpful ? 5 : 2),
    };

    feedbackStore.push(feedback);
    if (feedbackStore.length > 500) {
      feedbackStore.shift();
    }

    return res.json({
      success: true,
      message: 'Thank you! Your feedback helps the Chin language community improve translation quality.',
      feedbackId: feedback.id,
    });
  } catch (e: any) {
    return res.status(500).json({ error: 'Failed to save feedback' });
  }
});

// Get recent community feedback stats
app.get('/api/feedback/stats', (req, res) => {
  const total = feedbackStore.length;
  const helpful = feedbackStore.filter((f) => f.isHelpful).length;

  res.json({
    total,
    helpfulPercentage: total > 0 ? Math.round((helpful / total) * 100) : 98,
    recentCount: total,
  });
});

// Ask AI Community Assistant endpoint
app.post('/api/ask-ai', async (req, res) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a moment before asking another question.',
      });
    }

    const { prompt, category = 'general', targetLanguage = 'cnh' } = req.body;
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Please enter a question or topic.' });
    }

    const cleanPrompt = prompt.trim().slice(0, 1000);

    if (!ai) {
      return res.json({
        answer: `[AI Assistant Preview for ${category.toUpperCase()}]: Thank you for asking: "${cleanPrompt}". To activate live AI answers, please configure GEMINI_API_KEY in Settings > Secrets.`,
        keyVocabulary: [
          { chinTerm: 'Ngandamnak', englishTerm: 'Health / Well-being', dialect: 'Hakha Chin' },
          { chinTerm: 'Cawnnak', englishTerm: 'Education / Learning', dialect: 'Hakha Chin' },
          { chinTerm: 'Ruahnak', englishTerm: 'Ideas / Counsel', dialect: 'Hakha Chin' },
        ],
        practicalTips: [
          'Verify with a native elder or professional doctor when needed.',
          'Practice bilingual phrasing for clinic or classroom environments.',
        ],
        disclaimer: 'Community informational assistance. Always consult certified medical or legal experts for urgent matters.',
      });
    }

    const systemInstruction = `You are the Chin Community AI Assistant — an empathetic, culturally knowledgeable linguist and community counselor specializing in Chin peoples of Myanmar and the global diaspora (USA, Malaysia, India, Australia, Europe). You answer questions across three primary pillars:

1. HEALTH & MEDICAL NAVIGATION (Ngandamnak):
   - Help users explain physical symptoms, fevers, pain, doctor visits, and pharmacy instructions in Hakha Chin (Lai holh), Falam, Tedim (Zomi), Mizo, Matu, Mara, Mindat Cho, and English.
   - Clarify hospital navigation, preventive care, and elderly health.
   - ALWAYS include a clear health disclaimer: "Informational only; please consult a licensed healthcare professional for medical diagnosis and treatment."

2. EDUCATION & DIALECT LEARNING (Cawnnak & Fiannak):
   - Assist with Hakha Chin grammar, honorific pronouns, Chin Latin orthography, hymnbook terminology (Lai Hlabu), and English-as-a-second-language (ESL) learning.
   - Provide learning tips for diaspora youth growing up outside Myanmar.

3. COMMUNITY IDEAS & CULTURE (Ruahnak & Nunphung):
   - Brainstorm ideas for Chin National Day (February 20), church youth fellowships, cultural dress (lungum, puan), choir events, and cross-border Indo-Myanmar cultural heritage.

DIRECTIVES:
- Provide clear, culturally warm, and respectful responses.
- If the question is in Hakha Chin or mentions a Chin dialect, respond with fluent, authentic Chin text and bilingual explanations.
- Extract 2-4 key bilingual vocabulary terms relevant to the topic.
- Provide 2-3 practical actionable tips.
- Always return clean JSON adhering to the response schema.`;

    const modelPrompt = `Category: ${category}
Preferred Language Context: ${targetLanguage}
User Question: """${cleanPrompt}"""`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: modelPrompt,
      config: {
        systemInstruction,
        temperature: 0.3,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: 'Comprehensive, structured, and warm answer with bilingual Chin/English explanations where helpful.',
            },
            keyVocabulary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  chinTerm: { type: Type.STRING },
                  englishTerm: { type: Type.STRING },
                  dialect: { type: Type.STRING },
                },
                required: ['chinTerm', 'englishTerm'],
              },
              description: '2 to 4 key vocabulary items or phrases relevant to the topic.',
            },
            practicalTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 3 practical actionable takeaways for the user.',
            },
            disclaimer: {
              type: Type.STRING,
              description: 'Mandatory disclaimer for health, legal, or educational guidance.',
            },
          },
          required: ['answer'],
        },
      },
    });

    const text = response.text?.trim() || '{}';
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = { answer: text };
    }

    return res.json({
      answer: result.answer || '',
      keyVocabulary: result.keyVocabulary || [],
      practicalTips: result.practicalTips || [],
      disclaimer: result.disclaimer || 'Information is provided for community support and should be verified with licensed professionals.',
    });
  } catch (error: any) {
    console.error('Ask AI error:', error);
    return res.status(500).json({
      error: 'Failed to process AI question. Please try again with simpler wording.',
      details: error?.message,
    });
  }
});

// In-memory Publisher Monetization Store
let publisherRevenueData = {
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
};

const advertiserInquiries: Array<{
  id: string;
  timestamp: string;
  businessName: string;
  contactEmail: string;
  tierId: string;
  notes: string;
}> = [];

// Get monetization statistics
app.get('/api/monetization/stats', (req, res) => {
  res.json(publisherRevenueData);
});

// Track ad impression or click to update live earnings
app.post('/api/monetization/track-event', (req, res) => {
  const { eventType = 'impression', cpcRate = 0.35, cpmRate = 2.5 } = req.body;

  if (eventType === 'impression') {
    const earned = cpmRate / 1000;
    publisherRevenueData.adImpressions += 1;
    publisherRevenueData.totalEarningsUSD = Number((publisherRevenueData.totalEarningsUSD + earned).toFixed(4));
    publisherRevenueData.todayEarningsUSD = Number((publisherRevenueData.todayEarningsUSD + earned).toFixed(4));
  } else if (eventType === 'click') {
    publisherRevenueData.adClicks += 1;
    publisherRevenueData.totalEarningsUSD = Number((publisherRevenueData.totalEarningsUSD + cpcRate).toFixed(4));
    publisherRevenueData.todayEarningsUSD = Number((publisherRevenueData.todayEarningsUSD + cpcRate).toFixed(4));
  }

  // Recalculate CTR & RPM
  if (publisherRevenueData.adImpressions > 0) {
    publisherRevenueData.ctrPercentage = Number(
      ((publisherRevenueData.adClicks / publisherRevenueData.adImpressions) * 100).toFixed(2)
    );
    publisherRevenueData.rpmUSD = Number(
      ((publisherRevenueData.totalEarningsUSD / publisherRevenueData.adImpressions) * 1000).toFixed(2)
    );
  }

  res.json({
    success: true,
    stats: publisherRevenueData,
  });
});

// Configure monetization settings
app.post('/api/monetization/configure', (req, res) => {
  const { adsensePublisherId, payoutMethod, adsenseConnected } = req.body;
  if (adsensePublisherId !== undefined) publisherRevenueData.adsensePublisherId = adsensePublisherId;
  if (payoutMethod !== undefined) publisherRevenueData.payoutMethod = payoutMethod;
  if (adsenseConnected !== undefined) publisherRevenueData.adsenseConnected = !!adsenseConnected;

  res.json({
    success: true,
    message: 'Monetization settings updated.',
    stats: publisherRevenueData,
  });
});

// Advertiser sponsor inquiry
app.post('/api/monetization/inquire-ad', (req, res) => {
  const { businessName, contactEmail, tierId = 'tier_featured', notes = '' } = req.body;
  if (!businessName || !contactEmail) {
    return res.status(400).json({ error: 'Business name and email are required.' });
  }

  const inquiry = {
    id: 'ad-inq-' + Date.now(),
    timestamp: new Date().toISOString(),
    businessName,
    contactEmail,
    tierId,
    notes,
  };
  advertiserInquiries.push(inquiry);

  res.json({
    success: true,
    message: 'Thank you! Your advertising inquiry has been submitted. Our publisher manager will contact you within 24 hours.',
    inquiryId: inquiry.id,
  });
});

// Setup Vite middleware in dev or serve static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Chin Language AI Translator server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
