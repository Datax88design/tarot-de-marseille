// src/i18n/i18n.js
import React, { createContext, useContext, useState } from 'react';
import fr from './fr.json';
import en from './en.json';

const translations = { fr, en };
const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('fr');
  const t = (key) => translations[lang][key] || key;
  const cards = translations[lang].cards || [];

  return (
    <I18nContext.Provider value={{ lang, setLang, t, cards }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
