import { useLanguage } from '@/contexts/LanguageContext';

export const useTranslation = () => {
  return useLanguage();
};

// Keep the old hook for backward compatibility
export const useHebrewText = useTranslation;
