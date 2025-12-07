# twitterdemo — Next.js Twitter-like demo

Lightweight Twitter clone built with Next.js and MongoDB. This repo contains a working UI and API routes (Next app dir) with authentication, user/tweet models, and example pages so you can run locally and adapt it for learning or prototypes.

## What this project includes
- Next.js (App Router) front-end in `app/`
- API routes under `app/api/` for auth, tweets, and news
- MongoDB connection helper in `lib/mongodb.js`
- Mongoose models in `models/`
- Simple auth flow (NextAuth / custom) — see `app/api/auth` and `context/AuthContext.js`
- Example components in `app/components/`

## Quick start (developer)

Requirements
- Node.js >= 20
- npm (or yarn / pnpm)
- A MongoDB database (Atlas or local)

1) Install dependencies

```bash
cd /Users/kunnath/Projects/twitterclone-01
npm install
```

2) Create environment variables

Copy `.env.example` (not included) or create a `.env.local` in the project root with the minimum values below:

```
MONGODB_URI="your-mongodb-connection-string"
NEXTAUTH_SECRET="a long random string (use openssl or node:crypto)"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..." # if using Google auth
GOOGLE_CLIENT_SECRET="..." # if using Google auth
```

3) Run development server

```bash
npm run dev
# Open http://localhost:3000
```

Notes
- The project uses `next` and `mongoose`. Check `lib/mongodb.js` and `models/` to understand the DB wiring.

## Scripts
- npm run dev — local development
- npm run build — production build
- npm run start — start built app
- npm run lint — run ESLint (if configured)

See `package.json` for the full list of scripts.

## Environment variables (important)
- MONGODB_URI — MongoDB connection string used by `lib/mongodb.js`
- NEXTAUTH_SECRET — NextAuth secret used to sign session tokens
- NEXTAUTH_URL — base URL for NextAuth callbacks (e.g., http://localhost:3000)
- GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET — if using Google sign-in (see `GOOGLE_AUTH_SETUP.md`)

Keep credentials out of version control. Use `.env.local` for local development and configure secrets in your hosting platform for production.

## Auth & Google setup
- There's a `GOOGLE_AUTH_QUICK_REF.txt` and `GOOGLE_AUTH_SETUP.md` in the repo. Follow those notes to configure OAuth credentials and redirect URIs. Typical redirect for local NextAuth is `http://localhost:3000/api/auth/callback/google`.

## Database notes
- The app uses Mongoose models (see `models/User.js`, `models/Tweet.js`). Ensure `MONGODB_URI` points to a database you control. For quick testing, MongoDB Atlas free tier works well.

## Reinitializing Git and pushing to a new repository
If you've removed Git metadata and want to reinitialize and push to a new remote:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-remote-url>
git push -u origin main
```

If you don't have a `.gitignore`, add a typical Node/Next ignore (recommended):

```
node_modules/
.next/
.env
.env.local
dist/
coverage/
```

## Deploying
- Vercel is the easiest way to deploy Next apps. Set environment variables in the Vercel dashboard (MONGODB_URI, NEXTAUTH_SECRET, OAuth secrets).
- For other providers, build and run the app in a Node environment (see `npm run build` and `npm run start`).

## Troubleshooting
- If pages fail to connect to the DB, confirm `MONGODB_URI` is valid and accessible.
- If auth callbacks fail, confirm OAuth redirect URIs and `NEXTAUTH_URL` are set correctly.

## Contributing / next steps
- Add `.gitignore` before committing if missing.
- Hide secrets and rotate them if they were accidentally committed.
- Add tests (unit/integration) and a CI workflow for automated checks.

---

If you'd like, I can replace `README.md` with this improved version (I can overwrite it and remove the old content). Let me know if you want me to proceed and/or create a `.gitignore` and push to a new remote.