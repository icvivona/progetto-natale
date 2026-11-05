/**
 * Progetto «Dal riuso alla vita» – archivio delle modifiche della pagina su GitHub Pages.
 *
 * Dove si incolla: nel Foglio Google che conserva i dati, menu Estensioni → Apps Script.
 * Pubblicazione: Esegui il deployment → Nuovo deployment → App web,
 *   «Esegui come: Me», «Chi può accedere: Chiunque».
 * L'indirizzo che termina con /exec va in config.json, nel repository su GitHub.
 *
 * Il codice qui sotto è l'unica cosa da cambiare. Non va mai pubblicato su GitHub.
 */
const CODICE_MODIFICA = 'natale';

const FOGLIO_DATI = 'Dati';
const FOGLIO_STORICO = 'Storico';
const PEZZO = 40000;            // caratteri per cella (il limite di Fogli è 50.000)
const MAX_CARATTERI = 2000000;  // dimensione massima accettata per i dati

/** Lettura dei dati: chiunque abbia il link della pagina può vederli. */
function doGet() {
  const stato = leggi_();
  return risposta_({ ok: true, versione: stato.versione, dati: stato.dati });
}

/** Verifica del codice e salvataggio, con controllo che nessuno abbia salvato nel frattempo. */
function doPost(e) {
  let richiesta;
  try {
    richiesta = JSON.parse(e.postData.contents);
  } catch (err) {
    return risposta_({ ok: false, errore: 'richiesta' });
  }
  if (CODICE_MODIFICA === 'cambia-questo-codice' || !CODICE_MODIFICA) {
    return risposta_({ ok: false, errore: 'codice-non-impostato' });
  }
  if (String(richiesta.codice || '') !== CODICE_MODIFICA) {
    return risposta_({ ok: false, errore: 'codice' });
  }
  if (richiesta.azione === 'verifica') return risposta_({ ok: true });

  const dati = richiesta.dati;
  if (richiesta.azione !== 'salva' || !dati || !Array.isArray(dati.tasks) || !Array.isArray(dati.classi)) {
    return risposta_({ ok: false, errore: 'richiesta' });
  }
  const testo = JSON.stringify(dati);
  if (testo.length > MAX_CARATTERI) return risposta_({ ok: false, errore: 'troppo-grande' });

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return risposta_({ ok: false, errore: 'occupato' });
  }
  try {
    const stato = leggi_();
    if (Number(richiesta.versioneBase) !== stato.versione) {
      return risposta_({ ok: false, errore: 'conflitto', versione: stato.versione, dati: stato.dati });
    }
    const nuova = stato.versione + 1;
    scrivi_(testo, nuova, String(richiesta.autore || '').slice(0, 60));
    return risposta_({ ok: true, versione: nuova });
  } finally {
    lock.releaseLock();
  }
}

/** Da eseguire una volta dall'editor (pulsante Esegui) per concedere le autorizzazioni. */
function provaArchivio() {
  const stato = leggi_();
  Logger.log('Archivio pronto. Versione attuale: ' + stato.versione);
}

function foglio_(nome) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(nome) || ss.insertSheet(nome);
}

function leggi_() {
  const sh = foglio_(FOGLIO_DATI);
  const versione = Number(sh.getRange('B1').getValue()) || 0;
  const righe = sh.getLastRow();
  if (!versione || righe < 2) return { versione: 0, dati: null };
  const testo = sh.getRange(2, 1, righe - 1, 1).getValues()
    .map(function (r) { return String(r[0]).replace(/^~/, ''); })
    .join('');
  return { versione: versione, dati: JSON.parse(testo) };
}

function scrivi_(testo, versione, autore) {
  // Ogni pezzo inizia con «~» perché Fogli non lo scambi per una formula, un numero o una data.
  const pezzi = [];
  for (let i = 0; i < testo.length; i += PEZZO) pezzi.push('~' + testo.slice(i, i + PEZZO));
  const sh = foglio_(FOGLIO_DATI);
  sh.clearContents();
  sh.getRange(1, 1, 1, 3).setValues([['versione', versione, new Date()]]);
  sh.getRange(2, 1, pezzi.length, 1).setValues(pezzi.map(function (p) { return [p]; }));

  const st = foglio_(FOGLIO_STORICO);
  if (st.getLastRow() === 0) st.appendRow(['data e ora', 'versione', 'chi', 'dati (copia completa)']);
  st.appendRow([new Date(), versione, autore].concat(pezzi));
}

function risposta_(oggetto) {
  return ContentService.createTextOutput(JSON.stringify(oggetto)).setMimeType(ContentService.MimeType.JSON);
}
