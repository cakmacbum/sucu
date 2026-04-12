import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

export type Language = 'en' | 'tr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en'], params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('fluidity_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('fluidity_lang', language);
  }, [language]);

  const t = (key: keyof typeof translations['en'], params?: Record<string, string | number>) => {
    let value = translations[language][key];
    
    if (!value) {
      value = translations['en'][key]; // fallback
    }
    
    if (!value) return key;
    
    if (params) {
      return Object.entries(params).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        value
      );
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageState, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
