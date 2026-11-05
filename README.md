# Dal riuso alla vita · Progetto Natale

Versione in consultazione del progetto «Dal riuso alla vita: Natale sostenibile e orto condiviso»
(Dipartimento di Inclusione, scuola secondaria di primo grado, IC «F. Vivona» di Calatafimi Segesta, a.s. 2026/27).

**Indirizzo del sito:** https://liviodifranco-source.github.io/progetto-natale/

La pagina mostra le cose da fare, il cronoprogramma, il calendario dei laboratori, la situazione delle classi e la cassa.
Si apre da computer e da telefono, senza account.

## Come si aggiorna

La pagina di lavoro resta su Claude: lì i referenti e i colleghi invitati modificano attività, incontri, classi e cassa.
Questo sito ne mostra una copia, letta dal file `dati.json`.

1. Nella pagina di lavoro su Claude, in fondo, premi **Scarica dati.json**.
2. Qui su GitHub: **Add file → Upload files**, trascina `dati.json` e premi **Commit changes**.
3. Dopo uno o due minuti il sito mostra i dati nuovi. In alto compare la data dell'ultimo aggiornamento.

Se il download non è disponibile, nella pagina su Claude premi **Copia i dati**. Poi qui apri `dati.json`,
premi la matita (*Edit this file*), seleziona tutto il testo, incolla e premi **Commit changes**.

Il file `index.html` non va modificato.

## File

| File | Contenuto |
|---|---|
| `index.html` | la pagina |
| `dati.json` | i dati del progetto |
| `README.md` | queste istruzioni |

Lo storico dei commit di `dati.json` mostra quando è stato fatto ogni aggiornamento e che cosa è cambiato.

## Attenzione

Il sito è visibile a chiunque abbia il link. La pagina chiede ai motori di ricerca di non indicizzarla,
ma il repository e i dati restano pubblici. Nella pagina non vanno mai nomi o dati degli alunni.
