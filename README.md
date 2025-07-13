diff --git a//dev/null b/README.md
index 0000000000000000000000000000000000000000..024b6ad38d02eadad4abc1721945097bf3fcec8b 100644
--- a//dev/null
+++ b/README.md
@@ -0,0 +1,19 @@
+# Impostor Ordspill
+
+Dette er en veldig enkel webapplikasjon for å spille et norsk "Impostor"-ordspill lokalt. Alt kjører kun i nettleseren og krever ingen server eller eksterne avhengigheter.
+
+## Hvordan bruke
+
+1. Åpne `index.html` i en nettleser.
+2. Fyll inn antall spillere, antall impostere og et hemmelig ord.
+3. Trykk **Start spill** og la hver spiller trykke for å se sin rolle.
+
+Når alle rollene er delt ut kan spillerne diskutere hvem som er impostoren.
+
+Du kan også starte en enkel lokal server med:
+
+```bash
+python3 -m http.server
+```
+
+og deretter åpne `http://localhost:8000` i nettleseren din.

---

## Travel Project

Dette prosjektet består av en backend i Node.js/Express med Redis caching og integrasjon mot Amadeus, samt et React-basert frontend. Koden ligger i `backend/` og `frontend/`.

### Oppsett

1. Kopier `.env.example` i `backend/` og `frontend/` til `.env` og fyll inn API-nøkler.
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
5. Frontend er tilgjengelig på `http://localhost:3000` og proxyer API-kall til backend.

### Deploy

- Backend kan deployes på Heroku via `Procfile` eller Docker.
- Frontend kan deployes på Netlify med `netlify.toml`.
- GitHub Actions workflow (`.github/workflows/deploy.yml`) viser et eksempel på CI/CD.
