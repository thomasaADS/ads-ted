// API utilities for AdSync
// These are mock implementations - will be replaced with real Supabase edge functions

interface BrandData {
  name: string;
  website?: string;
  tone: string;
  langs: string[];
  whatsapp?: string;
}

interface BriefData {
  industry: string;
  city: string;
  offer: string;
  objective: string;
  platforms?: Platform[];
}

interface GenerateRequest {
  brand: BrandData;
  brief: BriefData;
}

export type Platform = 'meta' | 'google' | 'taboola' | 'outbrain' | 'tiktok' | 'linkedin' | 'twitter' | 'sms' | 'email';

export interface PlatformConfig {
  label: string;
  icon: string;
  iconName: 'Users' | 'Search' | 'Music' | 'Briefcase' | 'Twitter' | 'Newspaper' | 'BarChart3' | 'Mail' | 'MessageSquare';
  gradient: string;
  glowColor: string;
  color: string;
  description: string;
  image_requirements: Record<string, string>;
  copy_requirements: Record<string, string>;
  howToPublish?: string[];
  bestPractices: string[];
  audienceTips: string[];
  budgetGuide: {
    min: number;
    recommended: number;
    note: string;
  };
}

export const platformConfig: Record<Platform, PlatformConfig> = {
  meta: {
    label: 'מטא (פייסבוק/אינסטגרם)',
    icon: 'Meta',
    iconName: 'Users',
    gradient: 'icon-gradient-meta',
    glowColor: 'shadow-blue-500/50',
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    description: 'טון ידידותי ומשכנע. תמונות: 1:1, 4:5. טקסט ראשי ≤150 מילים, כותרת ≤7 מילים.',
    image_requirements: {
      square: '1080x1080',
      portrait: '1080x1350',
    },
    copy_requirements: {
      primary_text: 'עד 150 מילים',
      headline: 'מקסימום 7 מילים',
      description: 'מקסימום 15 מילים',
    },
    howToPublish: [
      'עבור למנהל המודעות של מטא',
      'צור קמפיין חדש עם המטרה שלך',
      'הדבק כותרת, טקסט ראשי ותיאור',
      'העלה תמונות והגדר את הקהל שלך',
      'בדוק ופרסם'
    ],
    bestPractices: [
      'השתמש בויזואלים בולטים עם מינימום טקסט (כלל 20%)',
      'בדוק 3-5 וריאציות למודעה לכל קמפיין לביצועים מיטביים',
      'מקד קהלים דומים (Lookalike) מבוססים על הלקוחות הטובים ביותר שלך',
      'תוכן וידאו מקבל פי 2 יותר מעורבות מתמונות סטטיות',
      'כלול כפתורי CTA ברורים והצעות ערך ב-2 השורות הראשונות'
    ],
    audienceTips: [
      'גיל 25-54 עובד הכי טוב לרוב העסקים B2C',
      'שלב מיקוד תחומי עניין עם קהלים מותאמים אישית',
      'הוצא מתחרים, עובדים וקבוצות לא רלוונטיות',
      'מקד מחדש מבקרי אתר תוך 30 יום להמרה מיטבית',
      'השתמש במיקוד רחב עם אופטימיזציית תקציב קמפיין (CBO)'
    ],
    budgetGuide: {
      min: 300,
      recommended: 1500,
      note: 'התחל עם $50 ליום לבדיקות, ואז הגדל את המנצחים',
    },
  },
  google: {
    label: 'גוגל אדס',
    icon: '🔍',
    iconName: 'Search',
    gradient: 'icon-gradient-google',
    glowColor: 'shadow-blue-500/30',
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
    description: 'מונחה כוונה, תמציתי. RSA: עד 15 כותרות, 4 תיאורים. תמונות: 1.91:1, 1:1.',
    image_requirements: {
      landscape: '1200x628',
      square: '1200x1200',
    },
    copy_requirements: {
      headline: '30 תווים (עד 15)',
      description: '90 תווים (עד 4)',
    },
    howToPublish: [
      'פתח את לוח המחוונים של Google Ads',
      'צור מודעת חיפוש רספונסיבית חדשה',
      'הוסף את כל הכותרות והתיאורים שנוצרו',
      'העלה תמונות תצוגה אם משתמש בתצוגה',
      'הגדר מילות מפתח והשק'
    ],
    bestPractices: [
      'כלול מילות מפתח יעד בכותרות לציון איכות טוב יותר',
      'השתמש בכל משבצות הכותרות והתיאורים הזמינים',
      'הוסף תוספי קישורי אתר ל-CTR גבוה ב-30%',
      'הגדר מעקב המרות לפני השקה',
      'התחל עם מילות מפתח בהתאמה מדויקת, ואז הרחב להתאמת ביטוי'
    ],
    audienceTips: [
      'שכבת קהלים בעלי זיקה ובשוק על מילות מפתח',
      'הוצא מיקומי אפליקציות מובייל לקמפיינים בתצוגה',
      'מקד מילות מפתח של מותג מתחרה עם הצעת ערך ייחודית',
      'השתמש ב-RLSA (רשימות רימרקטינג למודעות חיפוש) להצעות גבוהות יותר למבקרים קודמים',
      'מקד גיאוגרפית בטווח של 10-20 מייל לעסקים מקומיים'
    ],
    budgetGuide: {
      min: 500,
      recommended: 2000,
      note: 'מינימום $10 ליום לכל קמפיין כדי שגוגל תוכל לבצע אופטימיזציה',
    },
  },
  tiktok: {
    label: 'טיקטוק',
    icon: '🎵',
    iconName: 'Music',
    gradient: 'icon-gradient-tiktok',
    glowColor: 'shadow-pink-500/50',
    color: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    description: 'וידאו אנכי 9:16 (1080×1920), 15-60 שניות. וו טרנדי, האשטאגים, CTA ב-3-5 השניות הראשונות.',
    image_requirements: {
      portrait: '1080x1920',
    },
    copy_requirements: {
      caption: '150 תווים',
      hashtags: '5-8 האשטאגים',
    },
    howToPublish: [
      'עבור למנהל המודעות של TikTok',
      'צור קמפיין חדש',
      'העלה קריאייטיב וידאו אנכי',
      'הוסף כיתוב עם האשטאגים',
      'הגדר קהל ותקציב'
    ],
    bestPractices: [
      'תופסים צופים ב-3 השניות הראשונות או שהם גוללים הלאה',
      'השתמש בתוכן שנראה טבעי, לא מודעות מלוטשות',
      'הוסף צלילים ומוזיקה טרנדיים להגעה טובה יותר',
      'בדוק סרטונים בסגנון תוכן שנוצר על ידי משתמשים (UGC)',
      'שמור על סרטונים בין 9-15 שניות לביצועים הטובים ביותר'
    ],
    audienceTips: [
      'גיל 18-34 הוא הנקודה המתוקה עבור TikTok',
      'השתמש במיקוד תחומי עניין + מיקוד התנהגות יחד',
      'צור קהלים דומים ממבקרי אתר',
      'בדוק מיקוד רחב - האלגוריתם של TikTok חכם',
      'הוצא גילאי 13-17 אלא אם כן ממוקד במיוחד לבני נוער'
    ],
    budgetGuide: {
      min: 500,
      recommended: 1500,
      note: 'מינימום $20 ליום לכל קבוצת מודעות לאופטימיזציה',
    },
  },
  linkedin: {
    label: 'לינקדאין',
    icon: 'LinkedIn',
    iconName: 'Briefcase',
    gradient: 'icon-gradient-linkedin',
    glowColor: 'shadow-blue-600/50',
    color: 'bg-blue-600/10 text-blue-600 border-blue-600/20',
    description: 'טון מקצועי B2B. תמונה: 1200×627. כלול רמזי אמינות.',
    image_requirements: {
      landscape: '1200x627',
    },
    copy_requirements: {
      intro_text: '150 תווים',
      headline: '70 תווים',
    },
    howToPublish: [
      'גש למנהל הקמפיינים של LinkedIn',
      'צור קמפיין חדש',
      'בחר פורמט מודעה (תוכן ממומן)',
      'העלה תמונה והוסף טקסט',
      'מקד אנשי מקצוע לפי תפקיד/תעשייה'
    ],
    bestPractices: [
      'הוביל עם הצעת ערך בשורה הראשונה',
      'השתמש בויזואלים מקצועיים עם טקסט מינימלי',
      'בדוק מודעות מסמכים לייצור לידים B2B',
      'כלול CTA ברור והתאמת דף נחיתה',
      'פרסם בשעות העבודה (שלישי-חמישי 10:00-14:00 הכי טוב)'
    ],
    audienceTips: [
      'מקד לפי תפקיד + רמת בכירות עבור B2B',
      'השתמש במסנני גודל חברה ותעשייה',
      'שכב מיקוד כישורים לדיוק',
      'צור קהלים מותאמים מרשימות מייל',
      'הוצא מחפשי עבודה אם מוכר שירותי B2B'
    ],
    budgetGuide: {
      min: 1000,
      recommended: 3000,
      note: 'CPCs גבוהים יותר מפלטפורמות אחרות, אבל לידים B2B איכותיים',
    },
  },
  twitter: {
    label: 'טוויטר/X',
    icon: '🐦',
    iconName: 'Twitter',
    gradient: 'icon-gradient-twitter',
    glowColor: 'shadow-sky-500/50',
    color: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
    description: 'מקסימום 280 תווים. תמונה: 1200×675. תמציתי + האשטאגים.',
    image_requirements: {
      landscape: '1200x675',
    },
    copy_requirements: {
      tweet: '280 תווים',
      hashtags: '2-3 האשטאגים',
    },
    howToPublish: [
      'עבור ל-Twitter Ads',
      'צור קמפיין חדש',
      'חבר ציוץ עם טקסט',
      'צרף תמונה',
      'הגדר מיקוד והשק'
    ],
    bestPractices: [
      'שמור על טקסט תמציתי ופותח שיחה',
      'השתמש באשטאגים אסטרטגית (1-2 רלוונטיים)',
      'צייץ בשעות השיא (9:00-15:00 שעה מקומית)',
      'בדוק ציוצים ממומנים ממיטב הביצועים האורגניים',
      'התעסק עם תגובות כדי לחזק הגעה אורגנית'
    ],
    audienceTips: [
      'מקד עוקבים של חשבונות מתחרים',
      'השתמש במיקוד מילות מפתח לכוונה בזמן אמת',
      'שכב מיקוד תחומי עניין + התנהגות',
      'מקד נושאי שיחה רלוונטיים להצעה שלך',
      'מקד מחדש מעורבים מציוצים קודמים'
    ],
    budgetGuide: {
      min: 300,
      recommended: 1000,
      note: 'נהדר למודעות, פחות להמרות ישירות',
    },
  },
  taboola: {
    label: 'טאבולה',
    icon: '📰',
    iconName: 'Newspaper',
    gradient: 'icon-gradient-taboola',
    glowColor: 'shadow-orange-500/40',
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    description: 'גילוי נייטיב. כותרת 25-100 תווים. תמונה: 1200×628. טון מעניין אך תואם.',
    image_requirements: {
      landscape: '1200x628',
    },
    copy_requirements: {
      headline: '25-100 תווים',
    },
    howToPublish: [
      'גש ללוח המחוונים של Taboola Ads',
      'צור קמפיין חדש',
      'העלה תמונה וכותרת',
      'הגדר הצעת CPC ומיקוד',
      'שלח לבדיקה'
    ],
    bestPractices: [
      'השתמש בכותרות פער סקרנות שרומזות אבל לא חושפות',
      'בדוק תמונות שנראות טבעיות, לא מודעות ברורות',
      'צור דפי נחיתה ייעודיים תואמים לטון המודעה',
      'הפעל לפחות 10 וריאציות כותרות לכל קמפיין',
      'התמקד בסגנון עיתונאי, לא טקסט מוכר'
    ],
    audienceTips: [
      'מקד אתרי מפרסמים פרימיום לתנועה איכותית',
      'השתמש במיקוד הקשרי לפי נושא מאמר',
      'הוצא מיקומים באיכות נמוכה לאחר ניתוח נתונים',
      'שכב מיקוד גיאו + מכשיר לתוצאות הטובות ביותר',
      'תנועת מחשב שולחני לעתים קרובות ממירה טוב יותר ממובייל'
    ],
    budgetGuide: {
      min: 500,
      recommended: 2000,
      note: 'CPCs נמוכים יותר, התמקד בנפח ואופטימיזציית דף נחיתה',
    },
  },
  outbrain: {
    label: 'אאוטבריין',
    icon: 'Outbrain',
    iconName: 'BarChart3',
    gradient: 'icon-gradient-outbrain',
    glowColor: 'shadow-purple-500/50',
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    description: 'פרסום נייטיב. כותרת 25-100 תווים. תמונה: 1200×628. ראוי ללחיצה אך תואם.',
    image_requirements: {
      landscape: '1200x628',
    },
    copy_requirements: {
      headline: '25-100 תווים',
    },
    howToPublish: [
      'התחבר ללוח המחוונים של Outbrain',
      'צור קמפיין חדש',
      'הוסף כותרת ותמונה',
      'בחר אפשרויות מיקוד',
      'השק קמפיין'
    ],
    bestPractices: [
      'הוביל עם ערך, לא קליקביית - Outbrain מעניש מעורבות נמוכה',
      'השתמש בתמונות איכותיות בסגנון עיתונאי',
      'בדוק רשימות ותוכן הוראות לביצועים הטובים ביותר',
      'התאם תוכן דף נחיתה להבטחת הכותרת בדיוק',
      'הפעל לפחות 5-8 וריאציות לכל קמפיין'
    ],
    audienceTips: [
      'מקד על בסיס תחומי עניין וקטגוריות תוכן',
      'התמקד במחשב שולחני לתוכן ארוך יותר',
      'הוצא תנועת אפליקציות מובייל אם ממוקד המרה',
      'שכב מסנני דמוגרפיה לדיוק',
      'השתמש בקהלים דומים ממבקרי אתר'
    ],
    budgetGuide: {
      min: 500,
      recommended: 1800,
      note: 'דומה ל-Taboola - משחק נפח עם התמקדות דף נחיתה',
    },
  },
  sms: {
    label: 'קמפיינים ב-SMS',
    icon: 'TikTok',
    iconName: 'MessageSquare',
    gradient: 'icon-gradient-sms',
    glowColor: 'shadow-purple-500/50',
    color: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
    description: 'מקסימום 160 תווים. URL קצר. טון דחוף/ברור.',
    image_requirements: {},
    copy_requirements: {
      message: 'מקסימום 160 תווים',
      url: 'URL מקוצר',
    },
    howToPublish: [
      'השתמש בספק SMS (Twilio וכו\')',
      'העלה רשימת אנשי קשר',
      'הדבק הודעה עם קישור מקוצר',
      'תזמן או שלח מיידית',
      'עקוב אחר שיעורי קליקים'
    ],
    bestPractices: [
      'תמיד כלול שם מותג מראש',
      'השתמש בקישורים מעוקבים מקוצרים (bit.ly וכו\')',
      'שלח הצעות רגישות לזמן לדחיפות',
      'שמור על 1-2 הודעות בשבוע מקסימום',
      'תמיד ספק אפשרות ביטול (STOP להסרה)'
    ],
    audienceTips: [
      'שלח הודעה רק לאישורי הסכמה כדי להימנע מדגלי ספאם',
      'פלח לפי רכישות אחרונות להתאמה אישית',
      'השתמש למכירות בזק והצעות לזמן מוגבל',
      'שלח במהלך שעות העבודה (10:00-20:00)',
      'בדוק MMS עם תמונות ל-2x מעורבות גבוהה יותר'
    ],
    budgetGuide: {
      min: 200,
      recommended: 800,
      note: 'תשלום לפי SMS שנשלח - ממוקד מאוד, שיעורי פתיחה גבוהים (98%)',
    },
  },
  email: {
    label: 'שיווק במייל',
    icon: 'Email',
    iconName: 'Mail',
    gradient: 'icon-gradient-email',
    glowColor: 'shadow-green-500/50',
    color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    description: 'נושא ≤50 תווים. גוף ≤500 תווים. כפתור CTA ברור וכותרת משנה.',
    image_requirements: {
      landscape: '600x400',
    },
    copy_requirements: {
      subject: '50 תווים',
      preheader: '100 תווים',
      body: '500 תווים',
    },
    howToPublish: [
      'פתח כלי שיווק במייל (SendGrid, Mailchimp)',
      'צור קמפיין חדש',
      'הדבק נושא וגוף הטקסט',
      'הוסף כפתור CTA',
      'שלח בדיקה ופרסם'
    ],
    bestPractices: [
      'התאם אישית שורת נושא עם שם או התנהגות',
      'שמור על טקסט תצוגה מקדימה מעניין - הוא מופיע בתיבת הדואר',
      'השתמש בפריסת עמודה אחת לתגובתיות מובייל',
      'כפתור CTA אחד ברור מעל הקיפול',
      'שלח במהלך שלישי-חמישי 10:00-14:00 לשיעורי פתיחה הטובים ביותר'
    ],
    audienceTips: [
      'פלח לפי היסטוריית רכישה ורמת מעורבות',
      'שלח סדרת קבלת פנים למנויים חדשים מיידית',
      'מעורב מחדש מנויים לא פעילים עם קמפיינים לזכייה חזרה',
      'בדוק A/B שורות נושא בכל קמפיין',
      'נקה רשימה רבעונית - הסר לא-פותחים'
    ],
    budgetGuide: {
      min: 100,
      recommended: 500,
      note: 'עלויות פלטפורמה + ESP אופציונלי - ערוץ ROI הגבוה ביותר',
    },
  },
};

export interface AdVariant {
  platform: Platform;
  primary_text: string;
  headline: string;
  description: string;
  cta: string;
  final_url: string;
  utm?: {
    source: string;
    medium: string;
    campaign: string;
    content?: string;
  };
  audience?: {
    geo?: {
      city: string;
      country: string;
      radius_km?: number;
    };
    age_range?: {
      min: number;
      max: number;
    };
    interests?: string[];
  };
  image_urls?: {
    square?: string;
    portrait?: string;
    landscape?: string;
  };
}

// Mock generation - creates realistic variants based on input
export async function generateCampaign(data: GenerateRequest): Promise<{ objective: string; variants: AdVariant[] }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const isHebrew = data.brand.langs.includes("he");
  const city = data.brief.city;
  const industry = data.brief.industry;
  const offer = data.brief.offer;
  const finalUrl = data.brand.website || data.brand.whatsapp || "#";
  const platforms = data.brief.platforms || ['meta', 'google'];

  // Generate UTM campaign slug
  const campaignSlug = `${data.brand.name.toLowerCase().replace(/\s+/g, '-')}-${city.toLowerCase()}-${industry.toLowerCase()}`.substring(0, 50);

  // Create 2-3 variants per platform
  const variants: AdVariant[] = [];

  // Generate variants for each selected platform
  platforms.forEach(platform => {
    if (platform === 'meta') {
      // Meta variants - visual, emoji-rich
      if (isHebrew) {
        variants.push({
          platform: 'meta',
          primary_text: `מחפשים ${industry} מקצועי ב${city}? ${offer}! ${data.brand.name} - השירות שמבין אותך. קביעת תור בלחיצה!`,
          headline: `${industry} ב${city}`,
          description: offer,
          cta: "BOOK_NOW",
          final_url: finalUrl,
          utm: { source: "facebook", medium: "cpc", campaign: campaignSlug, content: "meta-variant-1" },
          audience: { geo: { city, country: "IL", radius_km: 15 }, age_range: { min: 25, max: 55 }, interests: ["Business", "Services", industry] }
        });
        variants.push({
          platform: 'meta',
          primary_text: `${data.brand.name} - ${industry} שמציב רף חדש ב${city}! ${offer} - רק השבוע. אל תפספסו!`,
          headline: `${offer} - מבצע מיוחד`,
          description: `${data.brand.name} ב${city}`,
          cta: "LEARN_MORE",
          final_url: finalUrl,
          utm: { source: "instagram", medium: "cpc", campaign: campaignSlug, content: "meta-variant-2" },
          audience: { geo: { city, country: "IL", radius_km: 20 }, age_range: { min: 22, max: 50 }, interests: ["Shopping", "Lifestyle", industry] }
        });
      } else {
        variants.push({
          platform: 'meta',
          primary_text: `Looking for professional ${industry} in ${city}? ${offer}! Book with ${data.brand.name} today.`,
          headline: `${industry} in ${city}`,
          description: offer,
          cta: "BOOK_NOW",
          final_url: finalUrl,
          utm: { source: "facebook", medium: "cpc", campaign: campaignSlug, content: "meta-variant-1" },
          audience: { geo: { city, country: "IL", radius_km: 15 }, age_range: { min: 25, max: 55 }, interests: ["Business", "Services", industry] }
        });
      }
    }

    if (platform === 'google') {
      // Google RSA variants - shorter, punchier headlines
      if (isHebrew) {
        variants.push({
          platform: 'google',
          primary_text: `${industry} ב${city} | ${offer} | ${data.brand.name}`,
          headline: `${industry} ב${city}`,
          description: `${offer}. שירות מקצועי ומהיר.`,
          cta: "קבע תור",
          final_url: finalUrl,
          utm: { source: "google", medium: "cpc", campaign: campaignSlug, content: "google-variant-1" },
          audience: { geo: { city, country: "IL", radius_km: 20 }, interests: [industry, "Local Services"] }
        });
        variants.push({
          platform: 'google',
          primary_text: `${data.brand.name} - מומחים ל${industry}`,
          headline: `${offer} - ${city}`,
          description: `תוצאות מובטחות. התקשרו עכשיו.`,
          cta: "התקשר עכשיו",
          final_url: finalUrl,
          utm: { source: "google", medium: "cpc", campaign: campaignSlug, content: "google-variant-2" },
          audience: { geo: { city, country: "IL", radius_km: 25 }, interests: [industry, "Professional Services"] }
        });
      } else {
        variants.push({
          platform: 'google',
          primary_text: `${industry} in ${city} | ${offer} | ${data.brand.name}`,
          headline: `${industry} ${city}`,
          description: `${offer}. Fast & Professional Service.`,
          cta: "Book Now",
          final_url: finalUrl,
          utm: { source: "google", medium: "cpc", campaign: campaignSlug, content: "google-variant-1" },
          audience: { geo: { city, country: "IL", radius_km: 20 }, interests: [industry, "Local Services"] }
        });
      }
    }

    if (platform === 'taboola') {
      // Taboola variants - clickbait style, curiosity-driven
      if (isHebrew) {
        variants.push({
          platform: 'taboola',
          primary_text: `תושבי ${city}: הסוד ל${industry} מושלם נחשף`,
          headline: `${industry} ב${city} - הדרך החכמה`,
          description: `${offer}. ${data.brand.name} חושף את הטיפים שכולם מחפשים.`,
          cta: "גלה עכשיו",
          final_url: finalUrl,
          utm: { source: "taboola", medium: "native", campaign: campaignSlug, content: "taboola-variant-1" },
          audience: { geo: { city, country: "IL" }, interests: [industry, "Lifestyle", "Tips & Advice"] }
        });
        variants.push({
          platform: 'taboola',
          primary_text: `למה אנשים ב${city} עוברים ל-${data.brand.name}?`,
          headline: `${industry} שמשנה את המשחק`,
          description: `${offer} - המומחים מסבירים למה זה עובד.`,
          cta: "קרא עוד",
          final_url: finalUrl,
          utm: { source: "taboola", medium: "native", campaign: campaignSlug, content: "taboola-variant-2" },
          audience: { geo: { city, country: "IL" }, interests: [industry, "Innovation", "Local Business"] }
        });
      } else {
        variants.push({
          platform: 'taboola',
          primary_text: `${city} Residents: The Secret to Perfect ${industry} Revealed`,
          headline: `${industry} in ${city} - The Smart Way`,
          description: `${offer}. ${data.brand.name} reveals what everyone's looking for.`,
          cta: "Discover Now",
          final_url: finalUrl,
          utm: { source: "taboola", medium: "native", campaign: campaignSlug, content: "taboola-variant-1" },
          audience: { geo: { city, country: "IL" }, interests: [industry, "Lifestyle", "Tips & Advice"] }
        });
      }
    }

    if (platform === 'outbrain') {
      // Outbrain variants - native content style
      if (isHebrew) {
        variants.push({
          platform: 'outbrain',
          primary_text: `המדריך המלא: איך לבחור ${industry} ב${city}`,
          headline: `הטעויות שכולם עושים ב${industry}`,
          description: `${data.brand.name} מסביר איך לעשות זאת נכון. ${offer}`,
          cta: "למדריך המלא",
          final_url: finalUrl,
          utm: { source: "outbrain", medium: "native", campaign: campaignSlug, content: "outbrain-variant-1" },
          audience: { geo: { city, country: "IL" }, interests: [industry, "Education", "How-to Guides"] }
        });
        variants.push({
          platform: 'outbrain',
          primary_text: `5 דברים שחייבים לדעת לפני שבוחרים ${industry} ב${city}`,
          headline: `${industry}: המדריך לצרכן החכם`,
          description: `מומחי ${data.brand.name} חושפים. ${offer}`,
          cta: "קרא כאן",
          final_url: finalUrl,
          utm: { source: "outbrain", medium: "native", campaign: campaignSlug, content: "outbrain-variant-2" },
          audience: { geo: { city, country: "IL" }, interests: [industry, "Consumer Tips", "Research"] }
        });
      } else {
        variants.push({
          platform: 'outbrain',
          primary_text: `The Complete Guide: How to Choose ${industry} in ${city}`,
          headline: `Common ${industry} Mistakes Everyone Makes`,
          description: `${data.brand.name} explains how to do it right. ${offer}`,
          cta: "Read Full Guide",
          final_url: finalUrl,
          utm: { source: "outbrain", medium: "native", campaign: campaignSlug, content: "outbrain-variant-1" },
          audience: { geo: { city, country: "IL" }, interests: [industry, "Education", "How-to Guides"] }
        });
      }
    }
  });

  // Add placeholder images (platform-specific sizes)
  variants.forEach((variant) => {
    if (variant.platform === 'meta') {
      variant.image_urls = {
        square: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1024&h=1024&fit=crop&q=80`,
        portrait: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1024&h=1280&fit=crop&q=80`
      };
    } else if (variant.platform === 'google' || variant.platform === 'taboola' || variant.platform === 'outbrain') {
      variant.image_urls = {
        landscape: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=628&fit=crop&q=80`,
        square: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1024&h=1024&fit=crop&q=80`
      };
    }
  });

  return {
    objective: data.brief.objective,
    variants
  };
}

// Mock publish to Meta
export async function publishToMeta(variant: AdVariant): Promise<{ success: boolean; adset: any; creative: any; ad: any }> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    success: true,
    adset: {
      id: `adset_${Date.now()}`,
      name: `AdSync Set ${new Date().toISOString()}`,
      status: "PAUSED"
    },
    creative: {
      id: `creative_${Date.now()}`,
      name: `AdSync Creative ${new Date().toISOString()}`
    },
    ad: {
      id: `ad_${Date.now()}`,
      name: `AdSync Ad ${new Date().toISOString()}`,
      status: "PAUSED"
    }
  };
}

// Mock image generation
export async function generateImage(prompt: string, aspect: string = "1:1"): Promise<{ url: string }> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return Unsplash placeholder matching the prompt theme
  const width = aspect === "4:5" ? 1024 : 1024;
  const height = aspect === "4:5" ? 1280 : 1024;
  
  return {
    url: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=${width}&h=${height}&fit=crop&q=80`
  };
}
