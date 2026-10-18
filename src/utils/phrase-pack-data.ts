/**
 * Medical Clinic & Legal Appointment Phrase Packs
 * High-fidelity community-verified phrases across 9 Chin dialects, Burmese, and English.
 */

export type PhraseCategory =
  | 'medical-triage'
  | 'doctor-consultation'
  | 'prescription-dosage'
  | 'asylum-court'
  | 'police-rights';

export interface PhrasePackCategoryInfo {
  id: PhraseCategory;
  title: string;
  nativeTitle: string;
  badge: string;
  description: string;
  icon: string;
}

export const PHRASE_CATEGORIES: PhrasePackCategoryInfo[] = [
  {
    id: 'medical-triage',
    title: 'Emergency & Triage',
    nativeTitle: 'Khuaruahhar & Chungkhar Ngandamnak',
    badge: 'Urgent Care',
    description: 'Critical life-safety statements, severe acute pain, breathing distress, and allergic reactions.',
    icon: 'HeartPulse',
  },
  {
    id: 'doctor-consultation',
    title: 'Clinic & Doctor Visit',
    nativeTitle: 'Sizung Doctor Sinah Chimning',
    badge: 'Clinical Care',
    description: 'Describing pain scale, symptom onset duration, fever in children, and prior medical history.',
    icon: 'Stethoscope',
  },
  {
    id: 'prescription-dosage',
    title: 'Pharmacy & Medication Dosages',
    nativeTitle: 'Sii Hman ning & Dinnik Phung',
    badge: 'Medication Safety',
    description: 'Exact timing, food requirements, pediatric dosing syringes, antibiotic course completion, and side-effect warnings.',
    icon: 'Pill',
  },
  {
    id: 'asylum-court',
    title: 'Asylum Hearing & Immigration',
    nativeTitle: 'Ramdang Phan & Biaceihzung',
    badge: 'Court & Legal',
    description: 'Requesting specific dialect interpreters, testifying on timeline of events, and sworn testimony precision.',
    icon: 'Scale',
  },
  {
    id: 'police-rights',
    title: 'Detention & Civil Rights',
    nativeTitle: 'Palik & Zungphung Nawl',
    badge: 'Civil Rights',
    description: 'Invoking the right to remain silent, demanding an accredited interpreter, and attorney representation.',
    icon: 'ShieldAlert',
  },
];

export interface ClinicalLegalPhrase {
  id: string;
  category: PhraseCategory;
  english: string;
  cnh: string; // Hakha Chin (Lai)
  cfm: string; // Falam Chin
  ctd: string; // Tedim (Zomi)
  lus: string; // Mizo
  matu: string; // Matu Chin
  mrh: string; // Mara Chin
  cnh_cho: string; // Mindat Cho
  my: string; // Burmese
  pronunciationCnh: string;
  clinicalNote: string;
  importance: 'critical' | 'high' | 'standard';
}

export const CLINICAL_LEGAL_PHRASES: ClinicalLegalPhrase[] = [
  // --- MEDICAL TRIAGE ---
  {
    id: 'triage-chest-pain',
    category: 'medical-triage',
    english: 'I have severe chest pain spreading to my left arm and jaw. Please call 911.',
    cnh: 'Ka tang a fak tuk i ka kut kehlei le ka khahlei ah a karh. Zaangfahnak in 911 auh piak hna.',
    cfm: 'Ka awm a na tuk ih ka kehlam ban le ka kaahlei ah a karh. Zaangfahnak in 911 ko uh.',
    ctd: 'Ka awm nakpi in na a, ka khut veilam le ka khanglam ah kizeel hi. Khawngaih in 911 sam in.',
    lus: 'Ka awm a na lutuk a, ka kut veilam leh ka khabe lamah a kal. Khawngaihin 911 min biaksak rawh.',
    matu: 'Ka tang na tuk aw ka kehlam ban ah a hmu. 911 ko pei uh.',
    mrh: 'Ei tiah paza na ta, ei ku vawilei liata a karh. 911 vaw hrua teh.',
    cnh_cho: 'Ka tang a nat tuk i ka kut veilam ah a feh. 911 auh piak uh.',
    my: 'ကျွန်တော့်ရင်ဘတ် အရမ်းအောင့်ပြီး ဘယ်ဘက်လက်မောင်းနဲ့ မေးရိုးအထိ ပြန့်နေပါတယ်။ ကျေးဇူးပြုပြီး 911 ကို ခေါ်ပေးပါ။',
    pronunciationCnh: 'Kah tahng ah fahk took ee kah koot keh-lay leh kah khah-lay ah ah karh. Zahng-fah-nahk in 911 ow pyahk nah.',
    clinicalNote: 'Suspected Myocardial Infarction (heart attack). Do not delay triage.',
    importance: 'critical',
  },
  {
    id: 'triage-breathing',
    category: 'medical-triage',
    english: 'The patient cannot breathe properly and their lips are turning blue.',
    cnh: 'Mizaw pa/nu hi thawk a khawh ti lo i a hmur a hring/dum dih cang.',
    cfm: 'Mizaw pa/nu thawk a harsa tuk ih a hmur a hring dih zo.',
    ctd: 'Cidamlo pa/nu thawnak hamsa lua a, a muk a vom zihzeh hi.',
    lus: 'Damlo hi a thaw a hah lutuk a, a hmui a duk vek tawh.',
    matu: 'Mizaw thaw kho lo aw a hmur vom dih.',
    mrh: 'Mizawpa thah a ngiah thei leipa ta, a hmur a paw vana.',
    cnh_cho: 'Mizaw thaw kho lo i a hmur vom.',
    my: 'လူနာ အသက်ရှူရ အရမ်းခက်ခဲနေပြီး နှုတ်ခမ်းတွေ ပြာနှမ်းနေပါပြီ။',
    pronunciationCnh: 'Mee-zaw pah/noo hee thawk ah khow tee loh ee ah hmoor ah hring/doom deeh tsahng.',
    clinicalNote: 'Hypoxia / Respiratory arrest warning sign. Requires immediate oxygenation.',
    importance: 'critical',
  },
  {
    id: 'triage-allergic-anaphylaxis',
    category: 'medical-triage',
    english: 'I have a life-threatening peanut/medication allergy. My throat is swelling shut.',
    cnh: 'Sii / Pe nih a ka thah khawhmi phung ka ngei. Ka hrawng a phing i ka thawk khawh ti lo.',
    cfm: 'Sii / Pe ka hmeh khawh lo ruangah ka hrawng a phing ih thawk a har tuk.',
    ctd: 'Sii / Be ka thuakloh manin ka guk a phing a, thaw ka saithei nawn kei hi.',
    lus: 'Damdawi / Be ka ngeih loh avangin ka hrawk a vung a, ka thaw thei tawh lo.',
    matu: 'Sii / Pe ka thoh lo ruangah ka hrawng phing aw thaw harsa.',
    mrh: 'Sii / Pe ei thoh leipa vata ei rawi a vaw vawh na.',
    cnh_cho: 'Sii ka ngai lo ruangah ka hrawng a phing.',
    my: 'ကျွန်တော့်မှာ ဆေး (သို့) မြေပဲဓာတ်မတည့်တဲ့ ပြင်းထန်ရောဂါရှိပါတယ်။ လည်ချောင်းတွေ ရောင်ပြီး အသက်ရှူမရတော့ပါဘူး။',
    pronunciationCnh: 'See / Peh nih ah kah thah khow-mee phoong kah ngey. Kah hrawng ah feeng ee kah thawk khow tee loh.',
    clinicalNote: 'Anaphylactic shock. Immediate Epinephrine auto-injector needed.',
    importance: 'critical',
  },
  {
    id: 'triage-pediatric-fever',
    category: 'medical-triage',
    english: 'My 10-month-old baby has had a fever of 103°F (39.5°C) and is vomiting everything.',
    cnh: 'Ka fale thla 10 a simi a tak a linhnak hi 103°F a si i a ei le a dinmi vialte a luak dih.',
    cfm: 'Ka nauhak thla 10 a simi a tak a sa tuk (103°F) ih a eimi zapi a luak theh.',
    ctd: 'Ka naunge thla 10 mi a sa mahmah (103°F) a, a nek khempeuh luak khia hi.',
    lus: 'Ka naute thla 10 mi hi a khawsik a sang lutuk a (103°F), a ei leh in zawng zawng a luak chhuak vek.',
    matu: 'Ka nauhak thla 10 a tak sa tuk aw a ei mi a luak dih.',
    mrh: 'Ei hawti thla 10 ypa ta thasadih a sang tuk ta, a pati a luah khai.',
    cnh_cho: 'Ka te thla 10 a sa tuk i a luak.',
    my: 'ကျွန်မရဲ့ ၁၀ လအရွယ် ကလေးဟာ ကိုယ်ပူချိန် ၁၀၃ ဒီဂရီအထိ အရမ်းတက်နေပြီး စားသမျှ အကုန်အန်ထုတ်နေပါတယ်။',
    pronunciationCnh: 'Kah fah-lay thlah hrah ah see-mee ah tahk ah leen-nahk hee 103°F ah see ee ah ey leh ah deen-mee vyahl-teh ah lwahk deeh.',
    clinicalNote: 'High pediatric fever with dehydration risk. Evaluate for pediatric sepsis or meningitis.',
    importance: 'critical',
  },

  // --- DOCTOR CONSULTATION ---
  {
    id: 'consult-pain-scale',
    category: 'doctor-consultation',
    english: 'On a scale of 1 to 10, my lower abdomen pain is an 8, sharp and stabbing.',
    cnh: 'Fahnak tahnak 1 in 10 ahcun, ka paw tang fah hi 8 a si, a ka chek dengmang in a fak.',
    cfm: 'Natnak tahnak 1 in 10 ah, ka pum hnuailam nat hi 8 a si, a na tuk hringhran.',
    ctd: 'Natna tehna 1 pan 10 ah, ka gilnuai natna pen 8 hi a, thau in a dawt bangin na hi.',
    lus: 'Na tehna 1 atanga 10 thlengah, ka pum hnuailam na hi 8 a ni a, a chhunin min chhun zawk zawk.',
    matu: 'Fahnak 1 in 10 ah ka pum tang fahnak cu 8 a si.',
    mrh: 'Paza tahna 1 tawhta 10 liata, ei chahry paza he 8 a cha.',
    cnh_cho: 'Natnak 1 in 10 ah ka paw tang nat hi 8 a si.',
    my: 'နာကျင်မှု အတိုင်းအတာ ၁ ကနေ ၁၀ မှာ ကျွန်တော့် ဝမ်းဗိုက်အောက်ပိုင်း နာကျင်မှုဟာ အဆင့် ၈ ရှိပြီး စူးစူးဝါးဝါး ထိုးအောင့်နေပါတယ်။',
    pronunciationCnh: 'Fah-nahk tah-nahk 1 een 10 ah-tsoon, kah pow tahng fah hee 8 ah see, ah kah chehk deng-mahng een ah fahk.',
    clinicalNote: 'Acute lower abdominal pain evaluation (rule out appendicitis or ectopic pregnancy).',
    importance: 'high',
  },
  {
    id: 'consult-symptom-onset',
    category: 'doctor-consultation',
    english: 'These symptoms started 4 days ago after I came home from work and have gotten progressively worse.',
    cnh: 'Hi zawtfahnak hi rian ka ṭuan hnawh inn ka phak hnu ni 4 lio ah khan a thawk i a zual chin lengmang.',
    cfm: 'Himi zawnat hi ni 4 liamta rian ka ṭuan hnu ah a thawk ih a zual vivo.',
    ctd: 'Hih natna pen ni 4 lai nasep zawh inn ka tun ciang kithawk a, zual semsem hi.',
    lus: 'Heng harsatnate hi ni 4 liamta hna ka thawh zawha in ka hawl hnu atangin a intan a, a zual tial tial.',
    matu: 'Hi fahnak hi ni 4 lio rian hnu ah a thawk aw a zual vivo.',
    mrh: 'He chhorana he noh 4 chhôh rai ei hria khai tawhta a vaw thawk ta a chho via lymâ.',
    cnh_cho: 'Ni 4 lio ah a thawk i a zual deuh deuh.',
    my: 'ဒီလက္ခဏာတွေဟာ လွန်ခဲ့တဲ့ ၄ ရက်က အလုပ်ကပြန်ရောက်ပြီးချိန်ကတည်းက စတင်ခဲ့ပြီး တစ်နေ့ထက်တစ်နေ့ ပိုပိုဆိုးလာပါတယ်။',
    pronunciationCnh: 'Hee zowt-fah-nahk hee ryahn kah twahn hnaw een kah phahk hnoo nee 4 lee-oh ah khahn ah thawk ee ah zwahl tsheen leng-mahng.',
    clinicalNote: 'Timeline and clinical trajectory baseline.',
    importance: 'standard',
  },
  {
    id: 'consult-chronic-meds',
    category: 'doctor-consultation',
    english: 'I have high blood pressure and type 2 diabetes. Here is the list of daily medicines I take.',
    cnh: 'Thi-linh (thi-kai) le thlum-zawt ka ngei. Ni fate ka dinnak sii cazin cu hihi a si.',
    cfm: 'Thi-sang le zun-thlum natnak ka ngei. Nikhua tin ka eimi sii cazin cu a hnuai ah a um.',
    ctd: 'Sisan leh zunthlum natna ka nei hi. Ni sim a ka nek sii minte hiah om hi.',
    lus: 'Thisen sang leh zunthlum ka nei a. Nitina ka damdawi ei thin list chu hei hi a ni.',
    matu: 'Thi-kai le thlum zawt ka nei. Ka ei tawnmi sii hi a si.',
    mrh: 'Thisai le thlum zawtna ei hnei. Ei nohpuata sii ei neipa he a cha.',
    cnh_cho: 'Thi-kai le thlum-zawt ka nei. Ka sii hi a si.',
    my: 'ကျွန်တော့်မှာ သွေးတိုးရောဂါနဲ့ ဆီးချိုရောဂါ (Type 2) ရှိပါတယ်။ ဒါကတော့ ကျွန်တော် နေ့တိုင်းသောက်နေတဲ့ ဆေးစာရင်း ဖြစ်ပါတယ်။',
    pronunciationCnh: 'Thee-leen (thee-kye) leh thloom-zowt kah ngey. Nee fah-teh kah deen-nahk see tsah-zeen tsoo hee-hee ah see.',
    clinicalNote: 'Drug interaction check and baseline comorbidity review.',
    importance: 'high',
  },

  // --- PRESCRIPTION DOSAGES ---
  {
    id: 'rx-with-meals',
    category: 'prescription-dosage',
    english: 'Take 1 tablet by mouth twice daily with meals (morning and evening). Do not chew or crush.',
    cnh: 'Rawl ei heh/rawl ei buin ni khat ah voihnih (zing le zan) kual 1 te in din ding. Ṭhial hlah, nawi hlah.',
    cfm: 'Rawl ei thawn ni khat ah voi hnih (zing le zan) mum 1 te in ei ding. Ṭhial hlah, deng nawi hlah.',
    ctd: 'Annek tawh kizom in ni khat vei nih (zingsang le nitak) tang 1 tek in nek ding. Hiam kei in, siik nen kei in.',
    lus: 'Chaw ei rualin ni khatah vawihnih (zing leh zan) mum 1 zelin ei tur. Hmuam hmawm suh, ti dip suh.',
    matu: 'Rawl ei buin ni khat ah voihnih mum 1 te ei ding. Ṭhial hlah.',
    mrh: 'Pati na nie khah ta noh kha liata ei no (my le zaleilâ) tang 1 vaw nie teh. Hmaipha hlah.',
    cnh_cho: 'Rawl ei buin ni khat ah voihnih tang 1 din ding. Ṭhial lo ding.',
    my: 'တစ်နေ့လျှင် ၂ ကြိမ် (မနက်တစ်ကြိမ်၊ ညတစ်ကြိမ်) အစာနှင့်အတူ တစ်ခါသောက် ဆေး ၁ လုံး သောက်ပါ။ ဝါးမစားရ၊ အမှုန့်မကြိတ်ရပါ။',
    pronunciationCnh: 'Rowl ey heh/rowl ey boo-een nee khat ah voy-hneeh (zeeng leh zahn) kwahl 1 teh een deen deeng. Thyal hlah, now-ee hlah.',
    clinicalNote: 'Extended-release gastro-resistant formulation instruction.',
    importance: 'critical',
  },
  {
    id: 'rx-finish-antibiotics',
    category: 'prescription-dosage',
    english: 'Finish all 10 days of this antibiotic medicine, even if you feel completely better.',
    cnh: 'Na dam cikcek ko zongah hi hrik thahnak sii (antibiotic) hi ni 10 tlamtling tein na din dih a herh.',
    cfm: 'Na dam thluh hmanah himi zawt hrik thahnak sii hi ni 10 kim tein na ei theh a tul.',
    ctd: 'Na dam mahmah zongin hih natna khamna sii pen ni 10 sung kicing takin na nek khit ding kisam hi.',
    lus: 'I dam tawh viau pawhin he antibiotic damdawi hi ni 10 chhung chu i zo vek tur a ni.',
    matu: 'Na dam zongah hi sii hi ni 10 tlingte na ei dih a herh.',
    mrh: 'Na pha haw hrasala he hrik thahna sii he noh 10 tlyhpa ta na nie khai awpa a by.',
    cnh_cho: 'Na dam zongah hi sii hi ni 10 tlamtling te din dih ding.',
    my: 'ရောဂါလက္ခဏာ သက်သာပျောက်ကင်းသွားသော်လည်း ဤပဋိဇီဝ (Antibiotic) ပိုးသတ်ဆေးကို ရက်ပြည့်အောင် ၁၀ ရက်လုံး ကုန်သည်အထိ ဆက်သောက်ရပါမည်။',
    pronunciationCnh: 'Nah dahm tseek-tseek koh zong-ah hee hreek thah-nahk see hee nee 10 tlahm-tling tay-een nah deen deeh ah hehr.',
    clinicalNote: 'Preventing antibiotic resistance and recurrent bacterial infection.',
    importance: 'critical',
  },
  {
    id: 'rx-pediatric-syringe',
    category: 'prescription-dosage',
    english: 'Give exactly 3.5 mL using the oral dosing syringe every 6 hours for fever. Shake bottle well.',
    cnh: 'Taklinh caah sii bur hi ṭha tein hnin law, sii hriitnak (syringe) in suimilam 6 dan ah 3.5 mL te pe.',
    cfm: 'Taksa caah sii bur hi ṭha tein thing awla, sii hritnak thawn nazi 6 dan ah 3.5 mL te pe aw.',
    ctd: 'Sa-sat ciang sii luang itha takin thing inla, sii tepna tawh nai 6 sim in 3.5 mL tek pia in.',
    lus: 'Khawsik tan damdawi bur hi tha takin thing la, suiring hmangin darkar 6 dan zelah 3.5 mL zel pe rawh.',
    matu: 'Taklinh caah sii bur hnin law suimilam 6 dan ah 3.5 mL te pe.',
    mrh: 'Thasadih cha ta sii he pha kaw ta thing la, syringe hmata na 6 khata 3.5 mL vaw pie teh.',
    cnh_cho: 'Taklinh caah suimilam 6 dan ah 3.5 mL te pe ding.',
    my: 'အဖျားကျစေရန် ဆေးပုလင်းကို သေချာလှုပ်ပြီး သောက်ဆေးထိုးပြွန် (Syringe) ဖြင့် ၆ နာရီခြားတစ်ကြိမ် ၃.၅ မီလီလီတာ တိတိ တိုက်ကျွေးပါ။',
    pronunciationCnh: 'Tahk-leen tsah see boor hee thah tay-een hneen law, see hreet-nahk een swee-mee-lahm 6 dahn ah 3.5 mL tay peh.',
    clinicalNote: 'Pediatric dosing accuracy prevents acetaminophen or ibuprofen overdose.',
    importance: 'critical',
  },
  {
    id: 'rx-drowsiness-warning',
    category: 'prescription-dosage',
    english: 'This medicine may cause drowsiness and dizziness. Do not drive a car or operate heavy machinery.',
    cnh: 'Hi sii nih hin ih a chuahter khawh i lu a hai khawh. Mawṭaw mawng hlah law seh thil rit heh ṭuan hlah.',
    cfm: 'Himi sii in ihsuk a suahter thei ih lu a hai thei. Mawṭaw khalh hlah awla seh lian hman hlah.',
    ctd: 'Hih sii in ihmut suak sak thei a, lu hai sak thei hi. Mawtaw hawl kei inla, seh golte sem kei in.',
    lus: 'He damdawi hian mut a ti chhuak thei a, lu a ti hai thei bawk. Motor khalh suh la, khawl lian khawih suh.',
    matu: 'Hi sii nih ih a chuahter khawh, mawṭaw khalh hlah.',
    mrh: 'He sii he ta mo a padoh thei ta, luhai a pathei. Motor tlai hlah.',
    cnh_cho: 'Hi sii nih ih a chuahter khawh, mawṭaw khalh hlah.',
    my: 'ဒီဆေးသည် အိပ်ငိုက်ခြင်းနှင့် ခေါင်းမူးခြင်း ဖြစ်စေနိုင်ပါသည်။ ဆေးသောက်ပြီးနောက် ကားမမောင်းရ၊ စက်ယန္တရားကြီးများ မကိုင်တွယ်ရပါ။',
    pronunciationCnh: 'Hee see nih heen eeh ah choo-ah-tehr khow ee loo ah hye khow. Mow-taw mowng hlah law seh theel reet heh twahn hlah.',
    clinicalNote: 'Central nervous system sedation / motor impairment warning.',
    importance: 'high',
  },

  // --- ASYLUM & COURT PROCEEDINGS ---
  {
    id: 'legal-interpreter-demand',
    category: 'asylum-court',
    english: 'I request a sworn interpreter in my exact Chin dialect (Hakha Lai / Falam / Tedim / Mara / Matu). Burmese is not my native language.',
    cnh: 'Biaceihzung ah ka chuahkehnak Lai holh te bak (Hakha Lai / Falam / Tedim / Mara / Matu) a thiammi holhlettuh ka herh. Kawlholh hi ka nu holh a si lo.',
    cfm: 'Biaceihnak ah ka laiholh ngai te a thiammi holh lettu ka tul. Kawlholh cu ka nu holh a si lo.',
    ctd: 'Thukhenna zung ah ka pau ngiatngiat (Tedim / Hakha / Falam) a thiam holh lepte ka kisam hi. Kawlpau pen ka nupau hi lo hi.',
    lus: 'Rorelnaah ka ṭawng dik tak (Lai / Falam / Tedim / Mizo / Mara) thiam ngei letlingtu ka duh a ni. Vai ṭawng / Kawl ṭawng hi ka nu ṭawng a ni lo.',
    matu: 'Ka Matu holh te a thiammi holh lettu ka herh. Kawl holh ka nu holh a si lo.',
    mrh: 'Biaceihna liata ei Mara reih tlyhpa ta a reitheipa lettu ei khoh. Kawl reih he ei nu reih a cha leipa.',
    cnh_cho: 'Ka Cho holh a thiammi holh lettu ka ngai. Kawl holh ka nu holh a si lo.',
    my: 'တရားရုံးတွင် ကျွန်ုပ်၏ မွေးရပ် ချင်းစကားသန့်သန့် (ဟားခါးလိုင် / ဖလမ်း / တီးတိန် / မရာ / မတူ) တတ်ကျွမ်းသော တရားဝင် စကားပြန်တစ်ဦးကို တောင်းဆိုပါသည်။ ဗမာစကားသည် ကျွန်ုပ်၏ မိခင်ဘာသာစကား မဟုတ်ပါ။',
    pronunciationCnh: 'Byah-tseh-zoong ah kah choo-ah-keh-nahk Lye holh tay bahk ah thee-ahm-mee holh-leht-tooh kah hehr. Kowl-holh hee kah noo holh ah see loh.',
    clinicalNote: 'Due process language access declaration in EOIR immigration proceedings.',
    importance: 'critical',
  },
  {
    id: 'legal-persecution-timeline',
    category: 'asylum-court',
    english: 'In March 2021, my church and village were targeted by military airstrikes and artillery shelling, forcing my family to flee into the forest.',
    cnh: 'March 2021 ah khan ralkap nih kan biakinn le kan khua cu vanlawng le meithal ngan in an thlahhnawh i ka chungkhar cu ramlak ah kan zaam.',
    cfm: 'March 2021 ah ralkap pawlin kan biakinn le khua meithal ngan in an kah ruangah kan chungkhar ramlak ah kan tlan.',
    ctd: 'March 2021 kumin galkap ten ko biakinn le ko khua vanleng leh thau gol tawh a kap manun ko innkuan gamlak ah ka taisuk uh hi.',
    lus: 'March 2021 khan sorkar sipaiten kan biakin leh kan khua chu vanlawng leh silai lianin an bei a, kan chhungkua ramhnuai lamah kan tlan bo ta a ni.',
    matu: 'March 2021 ah ralkap nih kan khua an kah ruangah ramlak ah kan zaam.',
    mrh: 'March 2021 liata sypai ta eima biakinn le khih kha thotlô ta vaw kapah ta, eima chhôhkha ngôpâh liata eima paphei.',
    cnh_cho: 'March 2021 ah ralkap nih kan biakinn an kah i ramlak ah kan zaam.',
    my: '၂၀၂၁ ခုနှစ် မတ်လတွင် စစ်တပ်မှ ကျွန်ုပ်တို့၏ ဘုရားကျောင်းနှင့် ရွာကို လေကြောင်းဗုံးကြဲခြင်းနှင့် လက်နက်ကြီးများဖြင့် ပစ်ခတ်တိုက်ခိုက်ခဲ့သောကြောင့် ကျွန်ုပ်၏မိသားစုသည် တောထဲသို့ ထွက်ပြေးတိမ်းရှောင်ခဲ့ရပါသည်။',
    pronunciationCnh: 'March 2021 ah khahn rahl-kahp neeh kahn byahk-een leh kahn khoo-ah tsoo vahn-lowng leh mey-thahl ngahn een ahn thlah-hnawh ee kah tshoong-khar tsoo rahm-lahk ah kahn zahm.',
    clinicalNote: 'Credible fear nexus under 1951 Refugee Convention.',
    importance: 'high',
  },
  {
    id: 'legal-not-understand',
    category: 'asylum-court',
    english: 'I do not understand the interpreter’s phrasing. Please rephrase the question slowly before I answer under oath.',
    cnh: 'Holhlettuh chimmi hi ka fiang lo. Chiatserhnak hmai ah bialehnak ka pek hlan ah zaangfahnak in biahalnak hi tlawmte tlaiter in ka hal ṭhan ko u.',
    cfm: 'Holh lettu biachim hi ka thei thiam lo. Zaangfahnak in a hram thawk in fiangte ih in hal sal hram uh.',
    ctd: 'Holh leppa pau hi ka theician kei hi. Khawngaih in thumaang a ka dawng mateng kiang takin hong dong thak in.',
    lus: 'Letlingtu sawi hi ka hre thiam lo. Khawngaihin thu dik ka sawi hma hian zawhna hi zawimuangin min zawt nawn leh rawh u.',
    matu: 'Holh lettu chimmi ka fiang lo. Zaangfahnak in hal ṭhan ko uh.',
    mrh: 'Lettu reipa he ei pahno thei leipa. Chiatserna hmiata eina hiah thliepata vaw reita.',
    cnh_cho: 'Holh lettu chimmi ka fiang lo. A thar in in hal uh.',
    my: 'စကားပြန်၏ ဘာသာပြန်ဆိုချက်ကို ကျွန်ုပ် ရှင်းလင်းစွာ နားမလည်ပါ။ သစ္စာဆို၍ အစစ်ဆေးမခံမီ ဤမေးခွန်းကို ဖြည်းဖြည်းချင်း ထပ်မံရှင်းပြပေးပါ။',
    pronunciationCnh: 'Holh-leht-tooh tsheem-mee hee kah fyahng loh. Tsah-tsayr-nahk hmy ah byah-leh-nahk kah pehk hlahn ah zahng-fah-nahk een byah-hahl-nahk hee tlowm-teh tly-tehr een kah hahl thahn koh oo.',
    clinicalNote: 'Safeguarding court transcript accuracy and preventing misinterpreted testimony.',
    importance: 'critical',
  },

  // --- POLICE & CIVIL RIGHTS ---
  {
    id: 'rights-silence',
    category: 'police-rights',
    english: 'I am exercising my right to remain silent. I will not answer questions without my lawyer present.',
    cnh: 'Dai tein um khawhnak nawl (right to remain silent) ka hman. Ka sihni (lawyer) a um hlan lo cu biahalnak ka phi lai lo.',
    cfm: 'Dai tein um theinak nawl ka hmang ding. Ka sihni a um hlan cu zianghman ka sim lo ding.',
    ctd: 'Dai dide a omna thupiak ka zang hi. Ka upadi siavuanpa om masa lian thudotna ka dawng kei ding hi.',
    lus: 'Ngawi renga awm theihna dikna ka hmang e. Ka ukil a awm hma chuan zawhna ka chhang dawn lo.',
    matu: 'Dai tein um khawhnak nawl ka hman. Ka sihni um hlan bia ka lehnak lai lo.',
    mrh: 'A thliepa ta yna nawh he ei hmâ. Ei lawyer a y vei khita cha hiahna ei chhy leipa aw.',
    cnh_cho: 'Dai tein um khawhnak ka hman. Ka lawyer um hlan bia ka chim lai lo.',
    my: 'ကျွန်ုပ်သည် နှုတ်ဆိတ်နေပိုင်ခွင့် (Right to remain silent) ကို အသုံးပြုနေပါသည်။ ကျွန်ုပ်၏ ရှေ့နေမရှိဘဲ မည်သည့်မေးခွန်းကိုမျှ ဖြေကြားမည်မဟုတ်ပါ။',
    pronunciationCnh: 'Dye tay-een oom khow-nahk nowl kah hmahn. Kah seeh-nee ah oom hlahn loh tsoo byah-hahl-nahk kah phee lye loh.',
    clinicalNote: 'Constitutional 5th Amendment invocation.',
    importance: 'critical',
  },
  {
    id: 'rights-no-search',
    category: 'police-rights',
    english: 'I do not consent to any search of my person, my vehicle, my bag, or my home.',
    cnh: 'Ka pum, ka mawṭaw, ka zal, le ka inn kawlnak (search) zeihmanh ka sianh hna lo.',
    cfm: 'Ka taksa, ka mawṭaw, ka tang le ka inn dawk velnak hi ka remti hrimhrim lo.',
    ctd: 'Keima pum, ka mawtaw, ka vanzat leh ka inn tawllet dingin ka phal hetkei hi.',
    lus: 'Ka taksa, ka lirthei, ka ipte leh ka in dap hi ka remti lo.',
    matu: 'Ka pum, ka mawṭaw, ka inn kawlnak ka sianh lo.',
    mrh: 'Ei khati, ei motor, ei zal, le ei o he kawl awpa ei hriapa a y vei.',
    cnh_cho: 'Ka taksa, ka mawṭaw, ka inn kawlnak ka sianh lo.',
    my: 'ကျွန်ုပ်၏ ခန္ဓာကိုယ်၊ မော်တော်ယာဉ်၊ အိတ်နှင့် နေအိမ်အား ရှာဖွေစစ်ဆေးခြင်းကို လုံးဝ (လုံးဝ) သဘောမတူပါ။',
    pronunciationCnh: 'Kah poom, kah mow-taw, kah zahl, leh kah een kowl-nahk zey-hmahnh kah syahn hnah loh.',
    clinicalNote: 'Constitutional 4th Amendment refusal of warrantless search.',
    importance: 'critical',
  },
];

/**
 * Filter phrases by category, search text, or importance
 */
export function filterPhrases(
  phrases: ClinicalLegalPhrase[],
  query: string,
  category: PhraseCategory | 'all'
): ClinicalLegalPhrase[] {
  return phrases.filter((phrase) => {
    const matchesCategory = category === 'all' || phrase.category === category;
    if (!matchesCategory) return false;

    if (!query || query.trim().length === 0) return true;

    const lower = query.toLowerCase().trim();
    return (
      phrase.english.toLowerCase().includes(lower) ||
      phrase.cnh.toLowerCase().includes(lower) ||
      phrase.cfm.toLowerCase().includes(lower) ||
      phrase.ctd.toLowerCase().includes(lower) ||
      phrase.lus.toLowerCase().includes(lower) ||
      phrase.matu.toLowerCase().includes(lower) ||
      phrase.mrh.toLowerCase().includes(lower) ||
      phrase.cnh_cho.toLowerCase().includes(lower) ||
      phrase.my.toLowerCase().includes(lower) ||
      phrase.clinicalNote.toLowerCase().includes(lower)
    );
  });
}
