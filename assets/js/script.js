// /assets/js/script.js

// Funzione per il tracciamento degli eventi con Google Analytics
function trackEvent(category, action, label) {
  if (typeof gtag === 'function') {
    const cookieConsent = localStorage.getItem('cookie-consent');
    // Traccia solo se l'utente ha accettato i cookie o non ha ancora scelto
    if (cookieConsent === 'accepted') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
  }
}

// Gestione del banner dei cookie
function initCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  
  // Controlla se l'utente ha già fatto una scelta
  const cookieConsent = localStorage.getItem('cookie-consent');
  
  // Se non c'è stata ancora una scelta, mostra il banner
  if (cookieConsent === null) {
    cookieBanner.style.display = 'block';
  }
  
  // Gestione del click sul pulsante Accetta
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookie-consent', 'accepted');
    cookieBanner.style.display = 'none';
    enableGoogleAnalytics();
  });
  
  // Gestione del click sul pulsante Rifiuta
  rejectBtn.addEventListener('click', function() {
    localStorage.setItem('cookie-consent', 'rejected');
    cookieBanner.style.display = 'none';
    disableGoogleAnalytics();
  });
  
  // Controlla lo stato e applica le impostazioni appropriate
  if (cookieConsent === 'accepted') {
    enableGoogleAnalytics();
  } else if (cookieConsent === 'rejected') {
    disableGoogleAnalytics();
  }
}

// Abilita Google Analytics
function enableGoogleAnalytics() {
  // Reinizializza Google Analytics
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
}

// Disabilita Google Analytics
function disableGoogleAnalytics() {
  // Disabilita il tracciamento
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
  }
}

// Spiegazioni delle difficoltà in italiano e inglese
const difficultyExplanations = {
  very_easy: {
    it: "Principali campionati europei e mondiali , comodi per principianti che vogliono imparare a gestire una squadra",
    en: "Major European and World Championships, easy for beginners who want to learn how to manage a team."
  },
  easy: {
    it: "Campionati di leghe subito inferiori, seconde divisioni e campionati meno conosciuti, ideali per chi cerca una leggera sfida.",
    en: "Minor leagues, second divisions and less known championships, ideal for those who want a light challenge."
  },
  medium: {
    it: "Squadre di livello inferiore o squadre di campionati con basso ranking, per chi cerca una squadra da far crescere o vuole cimentarsi in un campionato con giocatori poco conosciuti",
    en: "Mid-level teams with a mix of challenges: limited budget, need for reinforcements in some positions, but with growth potential."
  },
  hard: {
    it: "Campionati quasi del tutto sconosciuti,squadre spesso con basso budget o strutture scadenti. Perfetti per chi cerca una vera sfida.",
    en: "Almost unknown championships, teams often with low budget or poor facilities. Perfect for those who want a real challenge."
  },
  very_hard: {
    it: "Probabilmente vedrai la squadra e la prima cosa che farai sarà cercarla sulla mappa geografica, palloni di stracci e campi di asfalto per la sfida suprema. Dopo dovrai cercarti un vero obiettivo, tipo far vincere un campionato al Manchester United.",
    en: "The first thing you'll do when you see the team is to search for it on the map, balls made of rags and asphalt fields for the ultimate challenge. After that, you can try to win the Premier League with the Manchester United."
  }
};

// Spiegazioni delle difficoltà delle sfide
const challengeDifficultyExplanations = {
  all: {
    it: "Include sfide di ogni livello di difficoltà, dalla più semplice alla più impegnativa.",
    en: "Includes challenges of all difficulty levels, from the simplest to the most demanding."
  },
  facile: {
    it: "Sfide semplici da completare, adatte ai principianti o per una partita rilassata.",
    en: "Simple challenges to complete, suitable for beginners or for a relaxed game."
  },
  media: {
    it: "Sfide di media difficoltà che richiedono una discreta conoscenza del gioco e alcune capacità tattiche.",
    en: "Medium difficulty challenges that require a decent knowledge of the game and some tactical skills."
  },
  difficile: {
    it: "Sfide impegnative che metteranno alla prova anche i manager esperti, richiedendo pianificazione e abilità avanzate.",
    en: "Challenging tasks that will test even experienced managers, requiring planning and advanced skills."
  },
  matta: {
    it: "Ma allora vuoi farti davvero male.Qui dovrai fare scorta di bibite energetiche e fazzoletti per le lacrime che verserai.",
    en: "If you really want to make it hard for yourself. Here you will need to stock up on energy drinks and tissues for the tears you will shed."
  },
  meme: {
    it: "Allora questa modalità non è fatta per essere giocata ma per riderci sopra. Ma come disse il saggio:'Se pensi di non poterti fermare fallo, potresti anche non farlo ma se vuoi farlo allora fallo!'",
    en: "So, this mode is not made to be played but to ride over it. But as the wise man said:'If you think you can't stop, you can also not do it but if you want to do it then do it!'",
  }
};

// Funzione per aggiornare la spiegazione della difficoltà
function updateDifficultyExplanation() {
  console.log("Aggiornamento spiegazione difficoltà");
  
  const selectedDifficulty = document.getElementById('difficulty').value;
  const selectedChallengeDifficulty = document.getElementById('challenge-difficulty').value;
  const currentLang = window.i18n ? window.i18n.currentLang : 'it';
  
  console.log("Difficoltà selezionate:", selectedDifficulty, selectedChallengeDifficulty, "Lingua:", currentLang);
  
  const difficultyText = difficultyExplanations[selectedDifficulty][currentLang];
  const challengeDifficultyText = challengeDifficultyExplanations[selectedChallengeDifficulty][currentLang];
  
  const explanationBox = document.getElementById('difficulty-explanation-box');
  console.log("Box spiegazione trovato:", !!explanationBox);
  
  if (explanationBox) {
    explanationBox.innerHTML = `
      <strong>${window.i18n ? window.i18n.t('difficulties.' + selectedDifficulty) : selectedDifficulty}:</strong> ${difficultyText}
      <br><br>
      <strong>${window.i18n ? window.i18n.t('challenge_difficulties.' + selectedChallengeDifficulty) : selectedChallengeDifficulty}:</strong> ${challengeDifficultyText}
    `;
    console.log("Contenuto aggiornato:", explanationBox.innerHTML);
  } else {
    console.error("Elemento difficulty-explanation-box non trovato!");
  }
}

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

// Funzione per generare e condividere l'immagine della sfida
async function condividiSfida() {
  try {
    // Traccia l'evento di condivisione
    trackEvent('Feature', 'Share', 'Share challenge as image');
    
    const outputElement = document.getElementById('output');
    if (!outputElement) {
      console.error("Elemento output non trovato");
      return;
    }
    
    // Mostra un messaggio di caricamento
    const shareButton = document.getElementById('share-button');
    const originalText = shareButton.innerHTML;
    shareButton.innerHTML = `<span class="button-icon">⏳</span><span class="button-text">${window.i18n.t('loading') || 'Creazione immagine...'}</span>`;
    shareButton.disabled = true;
    
    // Genera l'immagine
    const canvas = await html2canvas(outputElement, {
      backgroundColor: '#283545',
      scale: 2, // Aumenta la qualità
      logging: false,
      useCORS: true // Per immagini esterne come i loghi
    });
    
    // Aggiungiamo un watermark
    const ctx = canvas.getContext('2d');
    ctx.font = '14px Roboto';
    ctx.fillStyle = '#7a8999';
    ctx.textAlign = 'right';
    const watermarkText = 'FM24 Challenge Creator';
    ctx.fillText(watermarkText, canvas.width - 15, canvas.height - 15);
    
    // Converte in URL dati
    const dataUrl = canvas.toDataURL('image/png');
    
    // Crea un nome file con data e ora
    const now = new Date();
    const dateTimeString = now.getFullYear() + 
                          ('0' + (now.getMonth() + 1)).slice(-2) + 
                          ('0' + now.getDate()).slice(-2) + '_' + 
                          ('0' + now.getHours()).slice(-2) + 
                          ('0' + now.getMinutes()).slice(-2) + 
                          ('0' + now.getSeconds()).slice(-2);
    
    // Crea un link per il download con nome file che include data e ora
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `fm24-challenge_${dateTimeString}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Ripristina lo stato del pulsante
    shareButton.innerHTML = originalText;
    shareButton.disabled = false;
    
  } catch (error) {
    console.error('Errore durante la generazione dell\'immagine:', error);
    alert(`Errore durante la generazione dell'immagine: ${error.message}`);
    
    // Ripristina il pulsante in caso di errore
    const shareButton = document.getElementById('share-button');
    if (shareButton) {
      shareButton.innerHTML = `<span class="button-icon">🖼️</span><span class="button-text">${window.i18n.t('share_button') || 'Condividi'}</span>`;
      shareButton.disabled = false;
    }
  }
}

// Oggetto per memorizzare gli elementi bloccati
const lockedElements = {
  team: null,
  squadChallenge: null,
  tacticsChallenge: null,
  objectivesChallenge: null
};

// Flag per tenere traccia se è la prima generazione
let isFirstGeneration = true;

// Funzione per bloccare/sbloccare un elemento
function toggleLock(type, element) {
  // Determina se stiamo bloccando o sbloccando
  const isLocking = !lockedElements[type];
  
  // Aggiorna lo stato di blocco
  lockedElements[type] = isLocking ? element : null;
  
  // Traccia l'evento
  trackEvent('Feature', isLocking ? 'Lock' : 'Unlock', `${type} element`);
  
  // Aggiorna l'interfaccia per mostrare quali elementi sono bloccati
  updateLockUI();
}

// Funzione per aggiornare l'interfaccia in base agli elementi bloccati
function updateLockUI() {
  // Aggiorna il pulsante di blocco della squadra
  const teamLockBtn = document.getElementById('team-lock-btn');
  if (teamLockBtn) {
    teamLockBtn.innerHTML = lockedElements.team ? '🔒' : '🔓';
    teamLockBtn.classList.toggle('locked', !!lockedElements.team);
    teamLockBtn.setAttribute('title', lockedElements.team ? 
      window.i18n.t('unlock_tooltip') : window.i18n.t('lock_tooltip'));
    
    // Aggiorna anche la classe bloccata sul contenitore della squadra
    const teamContainer = document.querySelector('.team-info');
    if (teamContainer) teamContainer.classList.toggle('locked', !!lockedElements.team);
  }
  
  // Aggiorna i pulsanti di blocco delle sfide
  updateChallengeLockBtn('rosa', 'squadChallenge');
  updateChallengeLockBtn('tattica', 'tacticsChallenge');
  updateChallengeLockBtn('obiettivi', 'objectivesChallenge');
  
  // Mostra le istruzioni di blocco
  document.getElementById('lock-instructions').style.display = 'block';
}

// Funzione di supporto per aggiornare un pulsante di blocco della sfida
function updateChallengeLockBtn(className, challengeType) {
  const btn = document.querySelector(`.challenges li.${className} .lock-btn`);
  if (btn) {
    btn.innerHTML = lockedElements[challengeType] ? '🔒' : '🔓';
    btn.classList.toggle('locked', !!lockedElements[challengeType]);
    btn.setAttribute('title', lockedElements[challengeType] ? 
      window.i18n.t('unlock_tooltip') : window.i18n.t('lock_tooltip'));
    
    // Aggiorna anche la classe bloccata sull'elemento della lista
    const listItem = document.querySelector(`.challenges li.${className}`);
    if (listItem) listItem.classList.toggle('locked', !!lockedElements[challengeType]);
  }
}

// Funzione per creare un pulsante di blocco
function createLockButton(type, element) {
  const isLocked = lockedElements[type] !== null;
  const btn = document.createElement('span');
  btn.className = `lock-btn ${isLocked ? 'locked' : ''}`;
  btn.innerHTML = isLocked ? '🔒' : '🔓';
  btn.setAttribute('title', isLocked ? 
    window.i18n.t('unlock_tooltip') : window.i18n.t('lock_tooltip'));
  
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLock(type, element);
    
    // Aggiungi l'animazione di pulsazione
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 300);
  });
  
  return btn;
}

async function generaSfida() {
  // Assicuriamoci che le variabili d'ambiente e le traduzioni siano caricate
  await Promise.all([ensureEnvLoaded(), ensureI18nLoaded()]);
  
  const livello = document.getElementById('difficulty').value;
  const difficoltaSfide = document.getElementById('challenge-difficulty').value;
  const squadrePath = `./data/squadre/squadre_${livello}.json`;
  const sfideRosaPath = `./data/sfide/sfide-rosa.json`;
  const sfideTatticaPath = `./data/sfide/sfide-tattica.json`;
  const sfideObiettiviPath = `./data/sfide/sfide-obiettivi.json`;

  // Traccia l'evento di generazione sfida
  trackEvent('Challenge', 'Generate', `Difficulty: ${livello}, Challenge Difficulty: ${difficoltaSfide}`);

  // Nasconde il pulsante di condivisione durante la generazione
  document.getElementById('share-container').style.display = 'none';
  
  // Nascondi il pulsante di rigenerazione durante la generazione
  document.getElementById('regenerate-container').style.display = 'none';
  
  // Nascondi anche le istruzioni di blocco durante il caricamento
  document.getElementById('lock-instructions').style.display = 'none';

  // Mostra un indicatore di caricamento
  document.getElementById('output').innerHTML = `
    <div class="loading">${window.i18n.t('loading')}</div>
  `;

  try {
    const squadre = await fetch(squadrePath).then(r => r.json());
    const sfideRosaTotali = await fetch(sfideRosaPath).then(r => r.json());
    const sfideTatticaTotali = await fetch(sfideTatticaPath).then(r => r.json());
    const sfideObiettiviTotali = await fetch(sfideObiettiviPath).then(r => r.json());

    // Se la squadra è bloccata, utilizziamo quella
    let squadra = lockedElements.team;
    
    // Altrimenti selezioniamo una squadra casuale
    if (!squadra) {
      squadra = squadre[Math.floor(Math.random() * squadre.length)];
    }
    
    // Sostituisci l'URL hardcoded con quello della variabile d'ambiente
    const logoUrl = squadra.logo.replace("https://media.api-sports.io", getApiUrl());

    // Filtra le sfide per difficoltà
    const sfideRosa = filterSfideByDifficulty(sfideRosaTotali, difficoltaSfide);
    const sfideTattica = filterSfideByDifficulty(sfideTatticaTotali, difficoltaSfide);
    const sfideObiettivi = filterSfideByDifficulty(sfideObiettiviTotali, difficoltaSfide);

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

    // Seleziona le sfide, usando quelle bloccate se presenti
    const sfidaRosa = lockedElements.squadChallenge || selectRandomSfida(sfideRosa);
    const sfidaTattica = lockedElements.tacticsChallenge || selectRandomSfida(sfideTattica);
    const sfidaObiettivo = lockedElements.objectivesChallenge || selectRandomSfida(sfideObiettivi);
    
    // Non blocchiamo più automaticamente gli elementi alla prima generazione
    // Rimosso il codice che impostava automaticamente gli elementi come bloccati

    // Costruisci l'output HTML con i pulsanti di blocco
    document.getElementById('output').innerHTML = `
      <div class="team-info ${lockedElements.team ? 'locked' : ''}" data-lockable="team"
           data-tooltip="${window.i18n.t('clickable_area.lock_tooltip')}"
           data-tooltip-unlock="${window.i18n.t('clickable_area.unlock_tooltip')}">
        <h2 style="text-align: center;">${squadra.team}</h2>
        <div style="text-align: center;">
          <p>${squadra.league} <span class="country">(${squadra.country})</span></p>
          <span id="team-lock-btn" class="lock-btn ${lockedElements.team ? 'locked' : ''}" 
                title="${lockedElements.team ? window.i18n.t('unlock_tooltip') : window.i18n.t('lock_tooltip')}">
            ${lockedElements.team ? '🔒' : '🔓'}
          </span>
        </div>
        <div class="logo-container">
          <img src="${logoUrl}" alt="Logo ${squadra.team}" class="team-logo" crossorigin="anonymous" />
        </div>
      </div>

      <div class="challenge-section">
        <h3>${window.i18n.t('challenges.title')}</h3>
        <ul class="challenges">
          <li class="rosa ${lockedElements.squadChallenge ? 'locked' : ''}" data-lockable="squadChallenge"
              data-tooltip="${window.i18n.t('clickable_area.lock_tooltip')}"
              data-tooltip-unlock="${window.i18n.t('clickable_area.unlock_tooltip')}">
            <div>
              <span class="category">${window.i18n.t('challenges.categories.rosa')}:</span> 
              ${getSfidaText(sfidaRosa)}
              <span class="lock-btn ${lockedElements.squadChallenge ? 'locked' : ''}" 
                    title="${lockedElements.squadChallenge ? window.i18n.t('unlock_tooltip') : window.i18n.t('lock_tooltip')}">
                ${lockedElements.squadChallenge ? '🔒' : '🔓'}
              </span>
            </div>
          </li>
          <li class="tattica ${lockedElements.tacticsChallenge ? 'locked' : ''}" data-lockable="tacticsChallenge"
              data-tooltip="${window.i18n.t('clickable_area.lock_tooltip')}"
              data-tooltip-unlock="${window.i18n.t('clickable_area.unlock_tooltip')}">
            <div>
              <span class="category">${window.i18n.t('challenges.categories.tattica')}:</span> 
              ${getSfidaText(sfidaTattica)}
              <span class="lock-btn ${lockedElements.tacticsChallenge ? 'locked' : ''}" 
                    title="${lockedElements.tacticsChallenge ? window.i18n.t('unlock_tooltip') : window.i18n.t('lock_tooltip')}">
                ${lockedElements.tacticsChallenge ? '🔒' : '🔓'}
              </span>
            </div>
          </li>
          <li class="obiettivi ${lockedElements.objectivesChallenge ? 'locked' : ''}" data-lockable="objectivesChallenge"
              data-tooltip="${window.i18n.t('clickable_area.lock_tooltip')}"
              data-tooltip-unlock="${window.i18n.t('clickable_area.unlock_tooltip')}">
            <div>
              <span class="category">${window.i18n.t('challenges.categories.obiettivi')}:</span> 
              ${getSfidaText(sfidaObiettivo)}
              <span class="lock-btn ${lockedElements.objectivesChallenge ? 'locked' : ''}" 
                    title="${lockedElements.objectivesChallenge ? window.i18n.t('unlock_tooltip') : window.i18n.t('lock_tooltip')}">
                ${lockedElements.objectivesChallenge ? '🔒' : '🔓'}
              </span>
            </div>
          </li>
        </ul>
      </div>
    `;
    
    // Aggiungi event listener all'intero elemento della squadra
    const teamElement = document.querySelector('.team-info');
    const teamLockBtn = document.getElementById('team-lock-btn');
    
    teamElement.addEventListener('click', function(e) {
      // Evita che il click sull'icona attivi due volte l'evento
      if (e.target === teamLockBtn || teamLockBtn.contains(e.target)) {
        return;
      }
      
      // Aggiungi effetto visivo
      teamLockBtn.classList.add('pulse');
      setTimeout(() => teamLockBtn.classList.remove('pulse'), 300);
      
      // Attiva il blocco/sblocco
      toggleLock('team', squadra);
    });
    
    // Manteniamo anche l'event listener per il pulsante stesso
    teamLockBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Previene che l'evento risalga al contenitore
      this.classList.add('pulse');
      setTimeout(() => this.classList.remove('pulse'), 300);
      toggleLock('team', squadra);
    });
    
    // Aggiungi event listener agli elementi delle sfide
    document.querySelectorAll('.challenges li').forEach(li => {
      const btn = li.querySelector('.lock-btn');
      const type = li.dataset.lockable;
      const challenge = type === 'squadChallenge' ? sfidaRosa : 
                        type === 'tacticsChallenge' ? sfidaTattica : sfidaObiettivo;
      
      // Aggiungi event listener all'intero elemento li
      li.addEventListener('click', function(e) {
        // Evita che il click sull'icona attivi due volte l'evento
        if (e.target === btn || btn.contains(e.target)) {
          return;
        }
        
        // Aggiungi effetto visivo
        btn.classList.add('pulse');
        setTimeout(() => btn.classList.remove('pulse'), 300);
        
        // Attiva il blocco/sblocco
        toggleLock(type, challenge);
      });
      
      // Manteniamo anche l'event listener per il pulsante stesso
      if (btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation(); // Previene che l'evento risalga al contenitore
          this.classList.add('pulse');
          setTimeout(() => this.classList.remove('pulse'), 300);
          toggleLock(type, challenge);
        });
      }
    });
    
    // Mostra il pulsante di condivisione
    document.getElementById('share-container').style.display = 'flex';
    
    // Mostra il pulsante di rigenerazione
    document.getElementById('regenerate-container').style.display = 'flex';
    
    // Mostra le istruzioni di blocco
    document.getElementById('lock-instructions').style.display = 'block';
    
    // Scroll automatico verso l'output
    setTimeout(() => {
      const outputElement = document.getElementById('output');
      if (outputElement) {
        outputElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Piccolo ritardo per garantire che l'HTML sia renderizzato
    
    // Imposta a false dopo la prima generazione
    isFirstGeneration = false;
    
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

// Inizializzazione del tracciamento degli eventi e delle spiegazioni
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM caricato, inizializzazione eventi");
  
  // Inizializza il banner dei cookie
  initCookieBanner();
  
  // Garantiamo che la spiegazione venga aggiornata al caricamento
  const initExplanation = function() {
    try {
      console.log("Inizializzazione spiegazione");
      updateDifficultyExplanation();
    } catch (err) {
      console.error("Errore nell'inizializzazione della spiegazione:", err);
    }
  };
  
  // Chiamiamo subito e anche con un leggero ritardo per sicurezza
  initExplanation();
  setTimeout(initExplanation, 500);
  
  // Tracciamento delle select
  document.getElementById('difficulty').addEventListener('change', function() {
    console.log("Cambio difficoltà:", this.value);
    trackEvent('Selection', 'Change Difficulty', this.value);
    updateDifficultyExplanation();
  });

  document.getElementById('challenge-difficulty').addEventListener('change', function() {
    console.log("Cambio difficoltà sfida:", this.value);
    trackEvent('Selection', 'Change Challenge Difficulty', this.value);
    updateDifficultyExplanation();
  });

  // Tracciamento dei clic sui link
  document.querySelector('.coffee-button').addEventListener('click', function() {
    trackEvent('Click', 'Buy Coffee', 'Buy me a coffee button clicked');
  });

  document.querySelector('.feedback-button').addEventListener('click', function() {
    trackEvent('Click', 'Feedback', 'Feedback button clicked');
  });
  
  // Inizializzazione del pulsante di condivisione
  document.getElementById('share-button').addEventListener('click', condividiSfida);
  
  // Gestione delle traduzioni
  if (window.i18n) {
    console.log("i18n trovato, configurazione evento di cambio lingua");
    // Aggiorna la spiegazione quando cambia la lingua
    window.i18n.onLanguageChanged = function(newLang) {
      console.log("Lingua cambiata:", newLang);
      updateDifficultyExplanation();
    };
    
    // Se l'evento i18n-loaded non è ancora stato emesso, attendiamolo
    if (!window.i18n.translations || !window.i18n.translations[window.i18n.currentLang]) {
      console.log("In attesa del caricamento delle traduzioni");
      window.addEventListener('i18n-loaded', function() {
        console.log("Evento i18n-loaded ricevuto");
        updateDifficultyExplanation();
      });
    }
  }
});
