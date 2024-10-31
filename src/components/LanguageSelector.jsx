import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} className="p-2 border rounded bg-white text-gray-700">
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="uz">Oʻzbekcha</option>
    </select>
  );
}

export default LanguageSelector;