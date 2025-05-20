// Funzione per caricare le variabili d'ambiente da config.env
async function loadEnv() {
  try {
    const response = await fetch('./config.env');
    const text = await response.text();
    
    // Parsing manuale del file .env
    const envVars = {};
    text.split('\n').forEach(line => {
      // Ignora le linee vuote o commenti
      if (!line || line.startsWith('#')) return;
      
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('Errore nel caricamento delle variabili d\'ambiente:', error);
    return {}; // Ritorna un oggetto vuoto in caso di errore
  }
}

// Espone le variabili d'ambiente globalmente
window.ENV = {};

// Carica le variabili d'ambiente all'avvio
(async function() {
  window.ENV = await loadEnv();
  // Emetti un evento per notificare che le variabili d'ambiente sono state caricate
  window.dispatchEvent(new Event('env-loaded'));
})(); 