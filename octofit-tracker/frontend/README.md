# OctoFit Tracker presentation tier

React 19 and Vite presentation tier for the OctoFit Tracker application.

## Environment

When running in GitHub Codespaces, `VITE_CODESPACE_NAME` must be defined so the presentation tier can reach the forwarded API on port `8000`. Add it to `.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes this value through `import.meta.env.VITE_CODESPACE_NAME`. When it is unset, the application safely falls back to `http://localhost:8000`.

## Commands

```bash
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
npm run lint --prefix octofit-tracker/frontend
```