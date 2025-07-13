# Impostor Ordspill

Dette er en enkel webapplikasjon for å spille et norsk "Impostor"-ordspill lokalt. Alt kjører kun i nettleseren og krever ingen server eller eksterne avhengigheter.

## Hvordan bruke
1. Åpne `index.html` i en nettleser.
2. Fyll inn antall spillere, antall impostere og et hemmelig ord.
3. Trykk **Start spill** og la hver spiller trykke for å se sin rolle.

Når alle rollene er delt ut kan spillerne diskutere hvem som er impostoren.

Du kan starte en enkel lokal server med:
```bash
python3 -m http.server
```
og deretter åpne `http://localhost:8000` i nettleseren din.

---

## Travel Project

Dette prosjektet viser et eksempel på en full-stack applikasjon med en Node.js/Express-backend og en React-basert frontend. Backend integrerer mot Amadeus API, cacher hotellsøk i Redis og tilbyr egne endepunkter for vær og nordlys. Frontend er laget med create-react-app og viser hoteller på et Mapbox-kart.

### Oppsett
1. Kopier `.env.example` i `backend/` og `frontend/` til `.env` og fyll inn API-nøkler der. **Ikke legg faktiske nøkler i koden.**
2. Start Redis lokalt.
3. Installer avhengigheter og start backend:
   ```bash
   cd backend
   npm install
   npm start
   ```
4. I en annen terminal, installer avhengigheter og start frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```
5. Frontend kjører på `http://localhost:3000` og proxyer API-kall til backend.

### Deploy
- Backend kan deployes på Heroku via `Procfile` eller Docker.
- Frontend kan deployes på Netlify med `netlify.toml`.
- GitHub Actions workflow (`.github/workflows/deploy.yml`) viser et eksempel på CI/CD.
