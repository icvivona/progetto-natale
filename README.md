# Dal riuso alla vita · Progetto Natale

Pagina di lavoro del progetto «Dal riuso alla vita: Natale sostenibile e orto condiviso»
(Dipartimento di Inclusione, scuola secondaria di primo grado, IC «F. Vivona» di Calatafimi Segesta, a.s. 2026/27).

**Indirizzo del sito:** https://icvivona.github.io/progetto-natale/

Chiunque abbia il link vede cose da fare, cronoprogramma, laboratori, classi e cassa.
Chi conosce il **codice per modificare** preme «Modifica la pagina» e aggiorna tutto dal browser,
da computer o da telefono. Le modifiche si salvano da sole in un Foglio Google della scuola e arrivano a tutti.

## Come funziona

| File | A cosa serve |
|---|---|
| `index.html` | la pagina |
| `config.json` | l'indirizzo dell'archivio (Apps Script). Se è vuoto, la pagina è in sola consultazione |
| `dati.json` | i dati di partenza, usati finché l'archivio è vuoto |
| `archivio-apps-script.gs` | copia di riferimento dello script dell'archivio |
| `README.md` | queste istruzioni |

## Attivare le modifiche dal sito (una volta sola, circa 10 minuti)

### 1. Creare l'archivio
1. Con l'account Google della scuola apri Drive e crea un nuovo **Foglio Google** chiamato «Progetto Natale – archivio».
2. Nel foglio apri **Estensioni → Apps Script**, cancella il testo che c'è e incolla tutto il contenuto di `archivio-apps-script.gs`.
3. Nella riga `const CODICE_MODIFICA = 'cambia-questo-codice';` scrivi il codice da dare ai colleghi
   (almeno 8 caratteri, non ovvio). Salva con l'icona del dischetto.
4. In alto scegli la funzione `provaArchivio` e premi **Esegui**. Google chiede le autorizzazioni: concedile.
   Se compare «Google non ha verificato questa app», premi *Avanzate* e poi *Vai a…*.
5. Premi **Esegui il deployment → Nuovo deployment**, scegli il tipo **App web** e imposta
   *Esegui come*: **Me**, *Chi può accedere*: **Chiunque**. Premi **Esegui il deployment** e copia l'**URL dell'app web**
   (finisce con `/exec`).

Se la voce «Chiunque» non c'è, il dominio della scuola non la consente: rifai i passaggi 1–5 con un account Google personale.

### 2. Collegare la pagina
1. Nella pagina su Claude premi **Scarica dati.json** e carica qui il file (**Add file → Upload files → Commit changes**):
   così l'archivio parte dai dati più recenti.
2. Qui su GitHub apri `config.json`, premi la matita, incolla l'URL tra le virgolette e premi **Commit changes**:
   ```json
   {
     "backend": "https://script.google.com/macros/s/…/exec"
   }
   ```
3. Dopo un paio di minuti apri il sito: in alto compare **Modifica la pagina**.
4. Da questo momento le modifiche si fanno solo sul sito, non più nella pagina su Claude.

Il codice si comunica ai colleghi a voce o in privato: non va scritto nella pagina né in questo repository.

## Gestione

- **Cambiare il codice**: in Apps Script modifica `CODICE_MODIFICA`, salva, poi **Esegui il deployment → Gestisci deployment**,
  matita, *Versione*: **Nuova versione**, **Esegui il deployment**. L'indirizzo resta lo stesso; i colleghi reinseriscono il nuovo codice.
- **Storico**: il foglio «Storico» registra ogni salvataggio con data, versione, nome di chi ha salvato e una copia completa dei dati.
- **Due colleghi insieme**: le modifiche su righe diverse si uniscono da sole. Se due persone cambiano la stessa riga, vale l'ultimo salvataggio.
- **Tornare alla sola consultazione**: svuota l'indirizzo in `config.json`.

## Attenzione

Il sito è visibile a chiunque abbia il link. La pagina chiede ai motori di ricerca di non indicizzarla,
ma il repository e i dati restano pubblici. Nella pagina non vanno mai nomi o dati degli alunni.
