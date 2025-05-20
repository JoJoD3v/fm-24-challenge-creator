// /assets/js/script.js

// Funzione per garantire che le variabili d'ambiente siano caricate
function ensureEnvLoaded() {
  return new Promise((resolve) => {
    if (window.ENV && window.ENV.API_URL) {
      resolve();
    } else {
      window.addEventListener('env-loaded', () => resolve(), { once: true });
    }
  });
}

// Funzione per ottenere l'URL dell'API
function getApiUrl() {
  return window.ENV.API_URL || 'https://media.api-sports.io'; // Fallback all'URL hardcoded
}

// Funzione per garantire che le traduzioni siano caricate
function ensureI18nLoaded() {
  return new Promise((resolve) => {
    if (window.i18n && window.i18n.translations[window.i18n.currentLang]) {
      resolve();
    } else {
      const checkInterval = setInterval(() => {
        if (window.i18n && window.i18n.translations[window.i18n.currentLang]) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    }
  });
}

// Funzione per ottenere il testo localizzato di una sfida
function getSfidaText(sfida) {
  // Se il testo è un oggetto con traduzioni
  if (sfida.testo && typeof sfida.testo === 'object') {
    const currentLang = window.i18n.currentLang;
    // Usa la traduzione per la lingua corrente, o fallback all'italiano
    return sfida.testo[currentLang] || sfida.testo.it || Object.values(sfida.testo)[0];
  }
  // Se il testo è una stringa semplice (per retrocompatibilità)
  return sfida.testo;
}

// Funzione per filtrare le sfide in base alla difficoltà selezionata
function filterSfideByDifficulty(sfide, difficolta) {
  if (!difficolta || difficolta === 'all') {
    return sfide;
  }
  return sfide.filter(sfida => sfida.difficolta === difficolta);
}

// Funzione per selezionare casualmente una sfida da un array
function selectRandomSfida(sfide) {
  if (sfide.length === 0) {
    return null;
  }
  return sfide[Math.floor(Math.random() * sfide.length)];
}

async function generaSfida() {
  // Assicuriamoci che le variabili d'ambiente e le traduzioni siano caricate
  await Promise.all([ensureEnvLoaded(), ensureI18nLoaded()]);
  
  const livello = document.getElementById('difficulty').value;
  const difficoltaSfide = document.getElementById('challenge-difficulty').value;
  const squadrePath = `./data/squadre/squadre_${livello}.json`;
  const sfidePath = `./data/sfide/sfide.json`;

  // Mostra un indicatore di caricamento
  document.getElementById('output').innerHTML = `
    <div class="loading">${window.i18n.t('loading')}</div>
  `;

  try {
    const squadre = await fetch(squadrePath).then(r => r.json());
    const sfideTotali = await fetch(sfidePath).then(r => r.json());

    const squadra = squadre[Math.floor(Math.random() * squadre.length)];
    
    // Sostituisci l'URL hardcoded con quello della variabile d'ambiente
    const logoUrl = squadra.logo.replace("https://media.api-sports.io", getApiUrl());

    // Dividi le sfide per categoria e filtra per difficoltà
    const sfideRosa = filterSfideByDifficulty(
      sfideTotali.filter(sfida => sfida.categoria === "rosa"),
      difficoltaSfide
    );
    const sfideTattica = filterSfideByDifficulty(
      sfideTotali.filter(sfida => sfida.categoria === "tattica"),
      difficoltaSfide
    );
    const sfideObiettivi = filterSfideByDifficulty(
      sfideTotali.filter(sfida => sfida.categoria === "obiettivi"),
      difficoltaSfide
    );

    // Controllo se ci sono abbastanza sfide per ciascuna categoria
    if (sfideRosa.length === 0 || sfideTattica.length === 0 || sfideObiettivi.length === 0) {
      document.getElementById('output').innerHTML = `
        <div class="error-container">
          <p class="error">${window.i18n.t('errors.loading')}</p>
          <p>${window.i18n.t('errors.not_enough_challenges')}</p>
        </div>
      `;
      return;
    }

    // Seleziona una sfida da ciascuna categoria
    const sfidaRosa = selectRandomSfida(sfideRosa);
    const sfidaTattica = selectRandomSfida(sfideTattica);
    const sfidaObiettivo = selectRandomSfida(sfideObiettivi);

    // Array con le tre sfide selezionate
    const sfideSelezionate = [sfidaRosa, sfidaTattica, sfidaObiettivo];    document.getElementById('output').innerHTML = `
      <div class="team-info">
        <h2>${squadra.team}</h2>
        <p>${squadra.league} <span class="country">(${squadra.country})</span></p>
        <div class="logo-container">
          <img src="${logoUrl}" alt="Logo ${squadra.team}" class="team-logo" />
        </div>
      </div>

      <div class="challenge-section">
        <h3>${window.i18n.t('challenges.title')}</h3>
        <ul class="challenges">
          <li class="rosa"><span class="category">${window.i18n.t('challenges.categories.rosa')}:</span> ${getSfidaText(sfidaRosa)}</li>
          <li class="tattica"><span class="category">${window.i18n.t('challenges.categories.tattica')}:</span> ${getSfidaText(sfidaTattica)}</li>
          <li class="obiettivi"><span class="category">${window.i18n.t('challenges.categories.obiettivi')}:</span> ${getSfidaText(sfidaObiettivo)}</li>
        </ul>
      </div>
    `;
  } catch (error) {
    console.error('Errore durante il caricamento dei dati:', error);
    document.getElementById('output').innerHTML = `
      <div class="error-container">
        <p class="error">${window.i18n.t('errors.loading')}: ${error.message}</p>
        <p>${window.i18n.t('errors.check_paths')}</p>
      </div>
    `;
  }
}
