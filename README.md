# Wampus the Wombat

A tiny browser adventure inspired loosely by early text adventures and *Hunt the Wumpus*. You wake somewhere unfamiliar as `@`, without knowing who you are, why you are here, or what “Wampus” means.

**Tone:** mysterious, sparse, eerie, curious, occasionally absurd, dryly funny.

**Status:** early prototype — Playtest 1 preparation (migration from single-file HTML to a small maintainable layout).

## Run locally

No build step. From this folder:

```bash
npx --yes serve .
```

Then open the URL shown (usually `http://localhost:3000`) and press **Enter** on the title screen.

Or open `index.html` directly in a browser (a local static server is more reliable for some browsers).

## Project structure

| Path | Purpose |
|------|---------|
| `index.html` | Shell UI |
| `css/style.css` | CRT / ASCII presentation |
| `js/rooms.js` | Room definitions (map, art, exits) |
| `js/game.js` | State, movement, rendering, inventory |
| `js/parser.js` | Command parser and interactions |
| `archive/wampus_the_wombat_v0_17.html` | Frozen reference prototype |
| `docs/WORLD_BIBLE.md` | Durable design rules and tone |
| `docs/STATE.md` | Implementation snapshot and boundary |
| `docs/CHANGELOG.md` | Version history |

## Playtest 1 goal

Ship a blind-playtest build that:

1. Preserves current prototype behaviour (reference: `archive/wampus_the_wombat_v0_17.html`).
2. Fixes natural board/marble phrasing (`PUT MARBLE IN CUP`, `PUT MARBLE IN HOLE`, etc.).
3. Shows an explicit message at the end of currently implemented content (after the black button).
4. Deploys as static files (e.g. Vercel) — **not pushed until local review.**

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com) as a **static** project.
3. Build command: *(none)* · Output directory: `.` (root) or leave default if using “Other” with no build.
4. The play URL will be the project’s production domain.

*(Production URL will be added here after first deploy.)*
