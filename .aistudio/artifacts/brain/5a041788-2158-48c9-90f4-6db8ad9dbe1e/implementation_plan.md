# Chin Language AI — Expanded Dialects, Clinical/Legal Phrase Packs & High-Contrast Dark Mode

This plan details the expansion of the Chin Language AI Translator to incorporate deeper indigenous dialect coverage, specialized phrase packs for high-stakes healthcare and legal consultations, and a night-friendly high-contrast dark theme.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following three product and UX choices were confirmed directly with the user in Phase 1:

- **Confirmed Decision 1: Expanded Chin Dialects & Sub-Dialects**: Expand beyond core Hakha Chin (Lai), Falam (Laizo), Tedim (Zomi), and Mizo (Lushai) to include **Matu**, **Mara**, **Mindat Cho (Kcho)**, **Lautu**, and **Zyphe**, equipping both the translation engine and server prompting with authentic linguistic markers, script rules, and region metadata.
- **Confirmed Decision 2: Medical Clinic & Legal Appointment Phrase Packs**: Dedicated, interactive phrasebook suite tailored for doctor visits, hospital triage, prescription dosages, asylum merits interviews, and court testimony with audio playback, bilingual copy, and pronunciation guidance.
- **Confirmed Decision 3: High-Contrast Dark Mode**: System-wide theme switcher with dark mode (`#0b0f19` background canvas, `#1e293b` borders, high-contrast `#f8fafc` text meeting WCAG AAA legibility, and eye-strain reduction for evening study and hospital settings).

---

## 1. Overview & Core Concept

- **What It Does**: Enhances the Chin Language AI platform with 5 additional Chin regional dialects, an offline-ready categorized phrase pack for medical triage and legal appointments, and an accessible high-contrast dark theme.
- **Target Audience**: Chin diaspora families, asylum seekers, healthcare navigators, clinic nurses, immigration paralegals, community translators, and church elders worldwide (Indianapolis, Dallas, Kuala Lumpur, Aizawl, Melbourne, Europe, and Myanmar).
- **Key Value**: Provides zero-latency, culturally accurate dialect phrasing for urgent clinic and legal scenarios where precision prevents medical errors and court misinterpretation, packaged in an accessible interface that works day and night.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Dialect Selection & Translation**:
   - The user selects from the expanded dialect roster: Hakha Chin (Lai), Falam, Tedim (Zomi), Mizo, Matu, Mara, Mindat Cho, Lautu, Zyphe, Burmese, and English.
   - The system adapts orthographic rules (Latin diacritics bar updates with dialect-specific consonants such as `ṭ`, `th`, `aw`, `ng`, and glottal markers).
   - Real-time translations render with confidence ratings, Latin phonetic pronunciation guides, and cultural notes.

2. **Medical Clinic & Legal Appointment Phrase Packs**:
   - Users navigate to a dedicated **Clinic & Legal Packs** tab or launch quick packs directly below the translator.
   - **Medical Categories**: Emergency Triage, Pediatric Fever & Illness, Pain Mapping (head, chest, abdomen), Pharmacy & Dosage Instructions ("once daily after food"), Chronic Conditions (Diabetes, Hypertension).
   - **Legal & Asylum Categories**: Asylum Story Narrative ("Dates, Locations, Events"), Court Rights & Objection Declarations, Immigration Forms (USCIS/EOIR terminology), Police & Detention Encounters.
   - Each phrase features: English, Native Dialect text, Romanized pronunciation, 1-click audio playback, and copy action.

3. **High-Contrast Dark Mode Switching**:
   - Accessible from the top navigation bar (Sun/Moon icon toggle).
   - Switches theme seamlessly without page reload; persists preference in `localStorage`.
   - Adheres to WCAG AAA contrast ratios: `#0b0f19` dark canvas, `#151e2e` surface containers, `#f8fafc` primary text, and `#38bdf8` / `#60a5fa` accents.

### Visual Identity & Theme Tokens

- **Light Mode**: 60% Canvas (`#f8fafc`), 30% Structural Surfaces (`#ffffff`, border `#e2e8f0`), 10% Accents (`#0f172a` primary, `#1d4ed8` blue).
- **Dark Mode**: 60% Canvas (`#0b0f19`), 30% Structural Surfaces (`#131c2e`, border `#1e293b`), 10% Accents (`#38bdf8` azure, `#f1f5f9` text).
- **Typography**: Inter paired with Noto Sans Myanmar for clean Unicode rendering; tabular numerals (`tabular-nums`) for dosages, stats, and character counts.
- **Anti-Slop Restraint**: Zero floating capsule badges; unboxed text metadata with `·` separators; single-line navigation controls; no decorative pulsing dots.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dialect Prompting Strategy**:
  - *Chosen Approach*: Expand server-side `gemini-3.8-flash` system instructions with explicit linguistic taxonomies for Matu (Southern Chin, distinctive vowel phonology), Mara (Tlosai dialect orthography), Mindat Cho (Mun/Kcho tonology), Lautu, and Zyphe, alongside existing Hakha Lai, Falam, Tedim, and Mizo.
  - *Why*: Large language models excel at low-resource Sino-Tibetan dialects when given authentic orthographic constraints and regional context in system instructions.
- **Decision 2: Curated Phrase Packs with Local Instant Filtering**:
  - *Chosen Approach*: Pre-index 50+ verified medical and legal phrases in a structured TypeScript data dictionary for instant offline access and search, with dynamic AI fallback for custom queries.
  - *Why*: Critical clinic and court moments cannot wait for server roundtrips or risk network drops; instant offline access ensures life-safety reliability.
- **Decision 3: Dark Mode Implementation**:
  - *Chosen Approach*: Class-based Tailwind dark mode (`<html class="dark">`) using semantic CSS utility classes across all components, synced with `localStorage`.
  - *Why*: Zero flickering, instant theme transitions, and full compatibility with Tailwind CSS v4.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│  [Chin Language AI] ── [Translator | Phrase Packs | Ask AI | Notice] ─ [Dark/Light Toggle]  │
└────────────────────────────────────────────────────────────────────────┘
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
┌───────────────────────────────────┐   ┌───────────────────────────────────┐
│     Main Translation View         │   │   Clinical & Legal Phrase Packs   │
│  • Dialect Selector (9 Dialects)  │   │  • Medical Triage & Pediatric     │
│  • Dual-Pane Input / Output       │   │  • Prescription Dosage Guide      │
│  • Diacritics Touch Bar           │   │  • Asylum Merits & Court Rights   │
│  • Phonetic Guide & Audio TTS     │   │  • 1-Click Bilingual Copy/Audio   │
└───────────────────────────────────┘   └───────────────────────────────────┘
         │                                                       │
         └───────────────────────────┬───────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Express API Server (server.ts)                     │
│  • POST /api/translate  (gemini-3.8-flash with expanded Chin dialects) │
│  • POST /api/tts        (gemini-3.8-flash-lite-tts audio synthesis)    │
│  • POST /api/ask-ai     (Clinic, Legal & Community Guidance)           │
│  • GET  /api/phrases    (Curated Medical & Legal Dictionary)           │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State Additions

- **Dialect Model**: Added `matu` (Matu), `mrh` (Mara), `cnh-cho` (Mindat Cho), `ltc` (Lautu), and `zyp` (Zyphe) to `SUPPORTED_LANGUAGES`.
- **Phrase Pack Model**: New `PhraseCategory` schema supporting `medical-triage`, `medication-dosage`, `asylum-court`, `police-rights`, and `emergency`.
- **Theme State**: `theme: 'light' | 'dark'` managed at app root, persisted in `localStorage('chin_ai_theme')`, injecting `.dark` class onto document element.
