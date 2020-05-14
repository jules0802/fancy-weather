function saveLanguageToStorage(selectedLang) {
  localStorage.setItem('selectedLanguage', selectedLang);
}

function getLanguageFromStorage() {
  return localStorage.getItem('selectedLanguage') || 'en';
}

function saveScaleToStorage(selectedScale) {
  localStorage.setItem('selectedScale', selectedScale);
}

function getScaleFromStorage() {
  return localStorage.getItem('selectedScale') || 'c';
}

const store = { lang: getLanguageFromStorage(), scale: getScaleFromStorage() };

export {
  saveLanguageToStorage, getLanguageFromStorage, saveScaleToStorage, getScaleFromStorage, store,
};
