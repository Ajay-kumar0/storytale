# StoryForge AI — Frontend

React + Vite frontend for an AI-generated, choice-based interactive story game.

## Stack

- React 19 + React Router
- Tailwind CSS 4
- Axios (with auth token injection + auto logout on session expiry)
- react-hot-toast for notifications
- Browser SpeechSynthesis API for the "read story aloud" feature

## Setup

```bash
npm install
cp .env.example .env   # point VITE_API_BASE_URL at your backend
npm run dev
```

## Project layout

```
src/
  components/
    auth/      # route guards (ProtectedRoute, PublicOnlyRoute)
    layout/    # Navbar
    player/    # PlayerCard, StatBar
    story/     # StoryCard
    ui/        # Button, LoadingScreen
  context/     # AuthContext -- single source of truth for the auth token
  pages/       # one component per route
  services/    # axios instance + API calls, grouped by resource
```

## Notes

- Requires the backend to be running -- see its own README for setup.
- `VITE_API_BASE_URL` in `.env` should point at your backend's URL (no trailing slash).
- Auth state lives in `AuthContext`, backed by a token in `localStorage`. Routes under
  `ProtectedRoute` redirect to `/` if there's no token; `/` and `/register` redirect to
  `/dashboard` if there already is one.
