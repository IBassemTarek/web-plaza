"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState("en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Dynamic import for translations
        const translationData = await import(`../locales/${locale}.json`);
        setTranslations(translationData.default || translationData);
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };

    loadTranslations();
  }, [locale]);

  const t = (key) => {
    return translations[key] || key;
  };

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    // Optionally save locale preference to localStorage
    localStorage.setItem("locale", newLocale);
    // If you're changing text direction, you might need to update the HTML dir attribute
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
  };

  return (
    <LocaleContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
