/**
 * Official Medical, Legal & Official Notice data and configuration.
 * All text strictly adheres to professional standards and user guidelines:
 * - Includes verbatim required notice text.
 * - Does not claim government-approved or legally certified status.
 */

export interface OfficialNoticeContent {
  title: string;
  leadParagraph: string;
  criticalNotice: string;
  disclaimer: string;
  shortWarning: string;
  sections: {
    id: string;
    title: string;
    badge: string;
    icon: string;
    content: string[];
    actionGuidance: string;
  }[];
}

export const OFFICIAL_NOTICE_DATA: OfficialNoticeContent = {
  title: 'Important Medical, Legal & Official Notice',
  leadParagraph:
    'Translations provided by this application are generated through artificial intelligence models designed for language assistance and cultural communication. Automated translations can contain dialect nuances, ambiguities, or inaccuracies.',
  criticalNotice:
    'Do not rely solely on automated translations for medical emergencies, medication dosage instructions, asylum hearings, legal contracts, or official government documents without verification by a qualified professional or a competent human interpreter fluent in the relevant Chin language and dialect.',
  disclaimer:
    'This application does not provide certified translations or professional medical or legal advice.',
  shortWarning:
    'AI Translation Notice: Do not rely solely on automated translations for medical emergencies, medication dosages, asylum hearings, or legal documents. Verify with a qualified human Chin interpreter.',
  sections: [
    {
      id: 'medical-emergency',
      title: 'Medical Emergencies & Medication Dosages',
      badge: 'Healthcare & Life Safety',
      icon: 'HeartPulse',
      content: [
        'Automated AI translations must never substitute for a trained medical interpreter or licensed healthcare provider.',
        'In medical crises, call local emergency services immediately (911 in the United States/Canada, 999 in the UK, 112 in Europe, or your local emergency hotline). Most hospital systems and emergency response services are legally required to provide certified on-demand interpreters at zero cost to patients.',
        'Critical medication instructions including dosage frequencies (e.g., "take once daily with meals"), milligram concentrations, antibiotic schedules, pediatric drops, and allergy warnings must be verified directly by a licensed pharmacist or physician before administration.',
        'Dialect differences between Hakha Chin, Falam, Tedim, Matu, Mara, Mindat Cho, and Mizo may use different anatomical and symptom terminology that automated systems could misinterpret.',
      ],
      actionGuidance:
        'Always request a qualified human medical interpreter at your hospital, clinic, or pharmacy under Title VI / patient language access rights.',
    },
    {
      id: 'legal-asylum',
      title: 'Asylum Hearings, Immigration & Court Proceedings',
      badge: 'Immigration & Justice',
      icon: 'Scale',
      content: [
        'Immigration court proceedings (such as EOIR master calendar and individual merits hearings in the US, Home Office interviews in the UK, or UNHCR refugee status determination) require accurate, sworn interpretation.',
        'Chin asylum applicants speak distinct regional dialects (e.g., Hakha Lai, Falam Laizo, Tedim Zomi, Matu, Mara, Mindat Cho, Lautu, Zyphe, or Mizo). An error in nuance, temporal sequence ("when/where"), or political terminology can introduce perceived inconsistencies on the official record.',
        'Automated translations cannot be submitted as certified evidence or used as substitute interpretation in judicial or quasi-judicial hearings.',
        'Legal contracts, rental agreements, loan instruments, and powers of attorney should be reviewed by licensed legal counsel and translated by a certified professional translator.',
      ],
      actionGuidance:
        'Request an official court interpreter who speaks your specific Chin dialect before beginning any asylum interview or legal testimony.',
    },
    {
      id: 'official-documents',
      title: 'Official Government Documents & Vital Records',
      badge: 'Certified Records',
      icon: 'FileCheck',
      content: [
        'Government agencies including USCIS, passport offices, social security agencies, consulates, and registrar offices require certified translations for foreign documents (birth certificates, marriage certificates, church baptismal records, national registration cards, household registries).',
        'A certified translation requires a formal signed and notarized certification of accuracy by a human translator who certifies their competency in both languages.',
        'Translations produced by this or any other automated AI software are not certified translations and will be rejected by official agencies without professional human certification.',
      ],
      actionGuidance:
        'Obtain certified, notarized human translations from recognized translation agencies or accredited community interpreters for all official government submissions.',
    },
    {
      id: 'non-certification',
      title: 'Community Tool Disclaimer & Non-Certification Notice',
      badge: 'Regulatory Transparency',
      icon: 'ShieldAlert',
      content: [
        'This application is an independent community language preservation and communication tool powered by artificial intelligence models.',
        'This notice and the translations generated by this software are NOT government-approved, legally certified, or sponsored by any court or state authority.',
        'No attorney-client, doctor-patient, or fiduciary relationship is created by using this website or its translation services.',
        'All users are advised to exercise independent discretion and seek competent professional assistance for high-stakes decisions.',
      ],
      actionGuidance:
        'Use this platform for educational, cultural, interpersonal communication, and community dialect learning.',
    },
  ],
};

/**
 * Validates that the official notice meets all required textual and legal constraints.
 */
export function validateOfficialNoticeIntegrity(): {
  isValid: boolean;
  hasRequiredPhrases: boolean;
  noGovernmentClaim: boolean;
} {
  const data = OFFICIAL_NOTICE_DATA;
  const fullText = [
    data.title,
    data.leadParagraph,
    data.criticalNotice,
    data.disclaimer,
    data.shortWarning,
    ...data.sections.flatMap((s) => s.content),
  ].join(' ');

  const hasRequiredPhrases =
    fullText.includes('Important Medical, Legal & Official Notice') &&
    fullText.includes(
      'Translations provided by this application are generated through artificial intelligence models'
    ) &&
    fullText.includes(
      'medical emergencies, medication dosage instructions, asylum hearings, legal contracts'
    ) &&
    fullText.includes(
      'This application does not provide certified translations or professional medical or legal advice'
    );

  const lower = fullText.toLowerCase();
  const noGovernmentClaim =
    lower.includes('not government-approved') &&
    !lower.includes('this notice is government-approved') &&
    !lower.includes('this application is government-approved') &&
    !lower.includes('legally certified application');

  return {
    isValid: hasRequiredPhrases && noGovernmentClaim,
    hasRequiredPhrases,
    noGovernmentClaim,
  };
}
