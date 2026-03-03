import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { translations, type Lang } from '../i18n/translations';

type TranslationType = typeof translations.he;

interface LanguageContextType {
  lang: Lang;
  t: TranslationType;
  toggleLang: () => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('he');

  const toggleLang = useCallback(() => {
    setLang(prev => (prev === 'he' ? 'en' : 'he'));
  }, []);

  const isRtl = lang === 'he';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [lang, isRtl]);

  const value: LanguageContextType = {
    lang,
    t: translations[lang] as TranslationType,
    toggleLang,
    isRtl,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
