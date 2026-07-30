import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('creator_lang') || 'uz';
  });

  useEffect(() => {
    localStorage.setItem('creator_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'uz' ? 'en' : 'uz'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['uz']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
