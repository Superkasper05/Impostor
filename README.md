# Impostor Ordspill

Dette er en veldig enkel webapplikasjon for å spille et norsk "Impostor"-ordspill lokalt. Alt kjører kun i nettleseren og krever ingen server eller eksterne avhengigheter.

## Hvordan bruke

1. Åpne `index.html` i en nettleser.
2. Fyll inn antall spillere, antall impostere og et hemmelig ord.
3. Trykk **Start spill** og la hver spiller trykke for å se sin rolle.

Når alle rollene er delt ut kan spillerne diskutere hvem som er impostoren.

Du kan også starte en enkel lokal server med:

```bash
python3 -m http.server
```

og deretter åpne `http://localhost:8000` i nettleseren din.

## Legg til filene i ditt git-repo

1. Initialiser et nytt repo med `git init` hvis du ikke allerede har et.
2. Kopier filene `index.html`, `script.js`, `style.css` og `README.md` inn i mappen.
3. Kjør `git add index.html script.js style.css README.md` for å legge dem til indeksen.
4. Commit med `git commit -m "Legg til Impostor ordspill"`.
5. Til slutt kan du pushe til en fjernserver med `git push` (for eksempel GitHub).

