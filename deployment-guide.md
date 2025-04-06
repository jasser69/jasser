# Guida al Deployment

Questa guida ti aiuterà a pubblicare il tuo sito web personale su GitHub Pages.

## Prerequisiti

1. Un account GitHub
2. Git installato sul tuo computer

## Passaggi per il Deployment

### 1. Creare un nuovo repository su GitHub

1. Vai su [GitHub](https://github.com) e accedi al tuo account
2. Clicca sul pulsante "+" in alto a destra e seleziona "New repository"
3. Nomina il repository `tuonome.github.io` (sostituisci "tuonome" con il tuo nome utente GitHub)
4. Scegli l'opzione "Public"
5. Clicca su "Create repository"

### 2. Preparare i file per il deployment

1. Assicurati che tutti i file siano nella cartella `src/`
2. Verifica che i percorsi nei file HTML, CSS e JavaScript siano corretti (relativi alla root del sito)

### 3. Caricare i file su GitHub

Apri il terminale e esegui i seguenti comandi:

```bash
# Clona il repository vuoto
git clone https://github.com/tuonome/tuonome.github.io.git
cd tuonome.github.io

# Copia tutti i file dalla cartella src
cp -r /percorso/al/progetto/jasser-portfolio/src/* .

# Aggiungi tutti i file al repository
git add .

# Crea un commit con i file
git commit -m "Initial commit"

# Carica i file su GitHub
git push origin main
```

### 4. Configurare GitHub Pages

1. Vai alla pagina del tuo repository su GitHub
2. Clicca su "Settings" (in alto a destra)
3. Scorri fino alla sezione "GitHub Pages"
4. Nella sezione "Source", seleziona il branch "main"
5. Clicca su "Save"

### 5. Verifica il deployment

Dopo alcuni minuti, il tuo sito sarà disponibile all'indirizzo:
```
https://tuonome.github.io
```

## Aggiornare il sito

Per aggiornare il sito dopo aver apportato modifiche:

1. Modifica i file localmente
2. Esegui i seguenti comandi:
   ```bash
   git add .
   git commit -m "Descrizione delle modifiche"
   git push origin main
   ```

## Utilizzare un dominio personalizzato (opzionale)

Se desideri utilizzare un dominio personalizzato:

1. Acquista un dominio da un registrar (GoDaddy, Namecheap, ecc.)
2. Nella sezione "GitHub Pages" delle impostazioni del repository, inserisci il tuo dominio personalizzato
3. Configura i record DNS del tuo dominio seguendo le istruzioni di GitHub

## Risoluzione dei problemi

Se riscontri problemi durante il deployment:

1. Verifica che il nome del repository sia esattamente `tuonome.github.io`
2. Controlla che tutti i percorsi nei file siano corretti
3. Assicurati che il branch selezionato nelle impostazioni di GitHub Pages sia "main"
4. Controlla la console del browser per eventuali errori JavaScript
5. Verifica che tutti i file necessari siano stati caricati su GitHub
