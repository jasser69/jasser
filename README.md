# Jasser Portfolio - Sito Web Personale 3D

Questo repository contiene il codice sorgente per il sito web personale di Jasser, un portfolio interattivo 3D creato con Three.js.

## Caratteristiche

- Design 3D immersivo con Three.js
- Modelli 3D interattivi personalizzati
- Effetti di parallasse e animazioni fluide
- Design responsive per tutti i dispositivi
- Sistema di gestione dei contenuti leggero
- Facilmente personalizzabile

## Struttura del Progetto

```
jasser-portfolio/
├── src/
│   ├── css/
│   │   ├── style.css          # Stili principali
│   │   └── responsive.css     # Stili per il design responsive
│   ├── js/
│   │   ├── main.js            # Script principale per Three.js
│   │   ├── models.js          # Definizione dei modelli 3D
│   │   └── content-loader.js  # Sistema di gestione dei contenuti
│   ├── components/
│   │   ├── chi-sono.md        # Contenuto della sezione "Chi sono"
│   │   ├── progetti.md        # Contenuto della sezione "Progetti"
│   │   ├── esperienze.md      # Contenuto della sezione "Esperienze"
│   │   ├── competenze.md      # Contenuto della sezione "Competenze"
│   │   └── contatti.md        # Contenuto della sezione "Contatti"
│   ├── assets/
│   │   └── ...                # Immagini e risorse varie
│   └── index.html             # File HTML principale
└── README.md                  # Questo file
```

## Come Utilizzare

### Visualizzazione Locale

1. Clona questo repository:
   ```
   git clone https://github.com/jasser/jasser-portfolio.git
   cd jasser-portfolio
   ```

2. Avvia un server locale (puoi usare l'estensione Live Server di VS Code o qualsiasi altro server locale)

3. Apri il browser e naviga a `http://localhost:8080` (o l'URL fornito dal tuo server locale)

### Modifica dei Contenuti

Il sito utilizza un sistema di gestione dei contenuti leggero che permette di modificare facilmente i testi:

1. Premi `Ctrl+Shift+A` per attivare la modalità amministratore
2. Seleziona la sezione che vuoi modificare dal menu a tendina
3. Clicca su "Modifica" per aprire l'editor
4. Apporta le modifiche desiderate
5. Clicca su "Salva" per applicare le modifiche

In alternativa, puoi modificare direttamente i file Markdown nella cartella `components/`.

### Personalizzazione del Design 3D

Per personalizzare i modelli 3D e le animazioni:

1. Modifica il file `js/models.js` per cambiare i modelli 3D
2. Modifica il file `js/main.js` per cambiare le animazioni e le interazioni

## Deployment su GitHub Pages

Per pubblicare il sito su GitHub Pages:

1. Crea un repository su GitHub con il nome `username.github.io` (sostituisci "username" con il tuo nome utente GitHub)
2. Carica tutti i file della cartella `src/` nel repository
3. Vai alle impostazioni del repository, sezione "Pages"
4. Seleziona il branch "main" come sorgente
5. Clicca su "Save"
6. Il tuo sito sarà disponibile all'indirizzo `https://username.github.io`

## Tecnologie Utilizzate

- HTML5, CSS3, JavaScript
- Three.js per la grafica 3D
- Sistema di gestione dei contenuti personalizzato basato su Markdown

## Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file LICENSE per maggiori dettagli.

## Contatti

Per qualsiasi domanda o suggerimento, contatta Jasser all'indirizzo email [jasser@example.com](mailto:jasser@example.com).
