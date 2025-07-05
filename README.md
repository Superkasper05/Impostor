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
