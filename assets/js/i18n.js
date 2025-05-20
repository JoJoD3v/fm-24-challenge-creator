// Gestore delle traduzioni
class I18n {
  constructor() {
    this.translations = {};
    this.currentLang = localStorage.getItem('language') || 'it'; // Default: italiano
    this.supportedLangs = ['it', 'en'];
    this.onLanguageChanged = null; // Callback per quando la lingua cambia
  }

  // Carica le traduzioni per una lingua
  async loadTranslations(lang) {
    try {
      const response = await fetch(`./assets/i18n/${lang}.json`);
      const translations = await response.json();
      this.translations[lang] = translations;
      return translations;
    } catch (error) {
      console.error(`Errore nel caricamento delle traduzioni per ${lang}:`, error);
      return {};
    }
  }

  // Imposta la lingua corrente
  async setLanguage(lang) {
    if (!this.supportedLangs.includes(lang)) {
      console.error(`Lingua non supportata: ${lang}`);
      return false;
    }

    // Carica le traduzioni se non esistono
    if (!this.translations[lang]) {
      await this.loadTranslations(lang);
    }

    this.currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Aggiorna tutti gli elementi con attributo data-i18n
    this.updatePageTranslations();
    
    // Aggiorna il selettore lingua
    const langSelector = document.getElementById('language-selector');
    if (langSelector) langSelector.value = lang;
    
    // Notifica del cambio lingua tramite evento
    window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
    
    // Esegui il callback se definito
    if (typeof this.onLanguageChanged === 'function') {
      this.onLanguageChanged(lang);
    }
    
    return true;
  }

  // Ottieni una traduzione
  t(key) {
    if (!this.translations[this.currentLang]) {
      return key;
    }
    
    // Supporta chiavi annidate come "challenges.title"
    const keyParts = key.split('.');
    let translation = this.translations[this.currentLang];
    
    for (const part of keyParts) {
      if (translation && translation[part] !== undefined) {
        translation = translation[part];
      } else {
        console.warn(`Chiave di traduzione non trovata: ${key}`);
        return key;
      }
    }
    
    return translation;
  }

  // Aggiorna tutte le traduzioni nella pagina
  updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.t(key);
    });

    // Traduci gli attributi placeholder, title, ecc.
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
      const attrData = element.getAttribute('data-i18n-attr').split(',');
      attrData.forEach(item => {
        const [attr, key] = item.trim().split(':');
        if (attr && key) {
          element.setAttribute(attr, this.t(key));
        }
      });
    });
  }
}

// Istanza globale del gestore traduzioni
window.i18n = new I18n();

// Inizializza il gestore traduzioni al caricamento della pagina
window.addEventListener('DOMContentLoaded', async () => {
  // Assicuriamoci che le variabili d'ambiente siano caricate prima
  if (window.ensureEnvLoaded) {
    await ensureEnvLoaded();
  }
  
  // Carica la lingua salvata o quella di default
  await window.i18n.setLanguage(window.i18n.currentLang);
  
  // Aggiorna le traduzioni nella pagina
  window.i18n.updatePageTranslations();
  
  // Notifica che le traduzioni sono state caricate
  window.dispatchEvent(new CustomEvent('i18n-loaded'));
}); 