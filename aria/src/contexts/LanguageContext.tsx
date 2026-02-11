import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'he' | 'en' | 'ar' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

// Import translations directly
const translations: Record<Language, Record<string, any>> = {
  he: {
    "nav.home": "בית",
    "nav.platforms": "פלטפורמות",
    "nav.howItWorks": "איך זה עובד",
    "nav.howItWork": "איך זה עובד",
    "nav.pricing": "תמחור",
    "nav.about": "אודות",
    "nav.getStarted": "התחל חינם",
    "nav.login": "התחבר",
    "nav.dashboard": "לוח בקרה",
    "nav.settings": "הגדרות",
    "nav.logout": "התנתק",
    "brand.name": "AdSync",
    "hero.headline": "שיווק חכם שמביא לך לקוחות בקליק אחד",
    "hero.subheadline": "אסטרטגיה, קמפיינים ותוכן שבנויים בדיוק לקהל שלך - קבל הצעה מיידית ותתחיל לראות תוצאות",
    "hero.title": "צור קמפיינים רב-ערוציים בדקות",
    "hero.subtitle": "ברייף אחד. כל הפלטפורמות. אוטומטי לגמרי.",
    "hero.cta": "קבל את ההצעה שלך עכשיו",
    "hero.getStarted": "התחל עכשיו",
    "hero.secondary": "ראה תוצאות אמיתיות",
    "hero.watchDemo": "צפה בדמו",
    "hero.trust.1": "אין צורך בהתקנה",
    "hero.trust.2": "תוצאות מיידיות",
    "hero.trust.3": "בשימוש של +1000 עסקים",
    "auth.welcome": "ברוכים הבאים ל-AdSync",
    "auth.subtitle": "התחבר או הירשם כדי להתחיל ליצור קמפיינים",
    "auth.login": "התחברות",
    "auth.signup": "הרשמה",
    "auth.email": "אימייל",
    "auth.emailPlaceholder": "your@email.com",
    "auth.password": "סיסמה",
    "auth.passwordPlaceholder": "לפחות 6 תווים",
    "auth.confirmPassword": "אימות סיסמה",
    "auth.confirmPasswordPlaceholder": "הזן סיסמה שוב",
    "auth.fullName": "שם מלא",
    "auth.fullNamePlaceholder": "דני לוי",
    "auth.loginButton": "התחבר",
    "auth.signupButton": "הירשם",
    "auth.loading": "טוען...",
    "auth.passwordMismatch": "הסיסמאות אינן תואמות",
    "cta.title": "מוכן לשנות את השיווק שלך?",
    "cta.button": "התחל ליצור קמפיינים",
    "footer.about": "אודות",
    "footer.contact": "צור קשר",
    "footer.privacy": "פרטיות",
    "footer.terms": "תנאי שימוש",
    "footer.copyright": "© 2025 AdSync. כל הזכויות שמורות.",
    "footer.term": "תנאי שימוש"
  },
  en: {
    "nav.home": "Home",
    "nav.platforms": "Platforms",
    "nav.howItWorks": "How It Works",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.getStarted": "Get Started Free",
    "nav.login": "Login",
    "nav.dashboard": "Dashboard",
    "nav.settings": "Settings",
    "nav.logout": "Logout",
    "brand.name": "Boosti",
    "hero.headline": "Smart Marketing That Brings You Customers in One Click",
    "hero.subheadline": "Strategy, campaigns, and content built exactly for your audience - get instant proposal and start seeing results",
    "auth.welcome": "Welcome to Boosti",
    "auth.subtitle": "Login or sign up to start creating campaigns",
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.emailPlaceholder": "your@email.com",
    "auth.password": "Password",
    "auth.passwordPlaceholder": "At least 6 characters",
    "auth.confirmPassword": "Confirm Password",
    "auth.confirmPasswordPlaceholder": "Enter password again",
    "auth.fullName": "Full Name",
    "auth.fullNamePlaceholder": "John Doe",
    "auth.loginButton": "Login",
    "auth.signupButton": "Sign Up",
    "auth.loading": "Loading...",
    "auth.passwordMismatch": "Passwords do not match",
    "cta.title": "Ready to Transform Your Marketing?",
    "cta.button": "Start Creating Campaigns",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms of Service",
    "footer.copyright": "© 2025 Boosti. All rights reserved."
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.platforms": "المنصات",
    "nav.howItWorks": "كيف يعمل",
    "nav.pricing": "التسعير",
    "nav.about": "معلومات عنا",
    "nav.getStarted": "ابدأ مجانًا",
    "nav.login": "تسجيل الدخول",
    "nav.dashboard": "لوحة التحكم",
    "nav.settings": "الإعدادات",
    "nav.logout": "تسجيل الخروج",
    "brand.name": "بوستي",
    "auth.welcome": "مرحبًا بك في بوستي",
    "auth.subtitle": "قم بتسجيل الدخول أو التسجيل لبدء إنشاء الحملات",
    "auth.login": "تسجيل الدخول",
    "auth.signup": "إنشاء حساب",
    "auth.email": "البريد الإلكتروني",
    "auth.emailPlaceholder": "your@email.com",
    "auth.password": "كلمة المرور",
    "auth.passwordPlaceholder": "6 أحرف على الأقل",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.confirmPasswordPlaceholder": "أدخل كلمة المرور مرة أخرى",
    "auth.fullName": "الاسم الكامل",
    "auth.fullNamePlaceholder": "محمد أحمد",
    "auth.loginButton": "تسجيل الدخول",
    "auth.signupButton": "إنشاء حساب",
    "auth.loading": "جارٍ التحميل...",
    "auth.passwordMismatch": "كلمات المرور غير متطابقة",
    "cta.title": "هل أنت مستعد لتحويل تسويقك؟",
    "cta.button": "ابدأ في إنشاء الحملات",
    "footer.about": "حول",
    "footer.contact": "اتصل",
    "footer.privacy": "الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.copyright": "© 2025 بوستي. جميع الحقوق محفوظة."
  },
  ru: {
    "nav.home": "Главная",
    "nav.platforms": "Платформы",
    "nav.howItWorks": "Как это работает",
    "nav.pricing": "Цены",
    "nav.about": "О нас",
    "nav.getStarted": "Начать бесплатно",
    "nav.login": "Войти",
    "nav.dashboard": "Панель управления",
    "nav.settings": "Настройки",
    "nav.logout": "Выйти",
    "brand.name": "Boosti",
    "auth.welcome": "Добро пожаловать в Boosti",
    "auth.subtitle": "Войдите или зарегистрируйтесь, чтобы начать создавать кампании",
    "auth.login": "Вход",
    "auth.signup": "Регистрация",
    "auth.email": "Email",
    "auth.emailPlaceholder": "your@email.com",
    "auth.password": "Пароль",
    "auth.passwordPlaceholder": "Минимум 6 символов",
    "auth.confirmPassword": "Подтверждение пароля",
    "auth.confirmPasswordPlaceholder": "Введите пароль снова",
    "auth.fullName": "Полное имя",
    "auth.fullNamePlaceholder": "Иван Иванов",
    "auth.loginButton": "Войти",
    "auth.signupButton": "Зарегистрироваться",
    "auth.loading": "Загрузка...",
    "auth.passwordMismatch": "Пароли не совпадают",
    "cta.title": "Готовы трансформировать ваш маркетинг?",
    "cta.button": "Начать создавать кампании",
    "footer.about": "О нас",
    "footer.contact": "Контакты",
    "footer.privacy": "Конфиденциальность",
    "footer.terms": "Условия использования",
    "footer.copyright": "© 2025 Boosti. Все права защищены."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Force Hebrew as the only language
  const language: Language = 'he';

  // Set document attributes for Hebrew (RTL)
  useEffect(() => {
    document.documentElement.lang = 'he';
    document.documentElement.dir = 'rtl';
  }, []);

  // No-op function for compatibility
  const setLanguage = () => {
    // Language is locked to Hebrew
  };

  const t = (key: string): string => {
    // First try direct lookup (for flat keys like "nav.home")
    const directValue = translations[language][key];
    if (typeof directValue === 'string') {
      return directValue;
    }
    
    // Then try nested lookup (for backwards compatibility)
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const dir = language === 'he' || language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};