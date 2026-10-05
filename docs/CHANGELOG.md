# Changelog

## Prototype lineage (recovered)

- **v0.16** — Single-file HTML prototype (`wampus_the_wombat_v0_16.html` in repo root).
- **v0.17** — Latest playable single-file prototype before migration (`archive/wampus_the_wombat_v0_17.html`). Reference for behaviour and content through the board room, below-room bag, and black button.

Earlier numbered versions are not present in this repository.

## [Unreleased] — Migration & Playtest 1 prep

- Preserved v0.17 in `archive/`.
- Migrated active game to `index.html` + `css/style.css` + `js/` modules.
- Added project docs: `README.md`, `docs/WORLD_BIBLE.md`, `docs/STATE.md`.
- **Fix:** Board room accepts natural marble phrasing (`PUT MARBLE IN CUP`, `PUT MARBLE IN HOLE`, `PLACE …`, `USE MARBLE WITH BOARD`, plus common articles/clay variants).
- **Fix:** Prototype ending message after pressing the black button (current content boundary).
- Published to GitHub (`main`); Vercel deploy from `main`.

## Playtest 1 polish — external playtest build

- **Navigation:** on-screen **↑ UP / ↓ DOWN** (and cardinal) exit buttons; context line uses readable labels; Page Up/Down for vertical moves; arrows only fire when that cardinal exit exists.
- **Maps:** ASCII room diagrams label exits (N/E/S/W, UP, DOWN); board room shows open hatch path.
- **Interactions:** `PRESS BUTTON` works when the button is on the floor after opening the bag (no TAKE required); `LOOK BUTTON` when reachable.
- **Deaths added:** climb tree (`beyond`); step into mirror (`mirrorroom`); lie down in rain (`rainroom`). Well jump unchanged.
- **Docs:** `STATE.md`, `CHANGELOG.md`, README controls section.

## Playtest 1 final UX pass

- Removed exit button bar; single global hint + `EXITS:` line only.
- Arrow **↓** / **↑** use DOWN/UP when S/N absent; invalid moves always feedback.
- Persistent room description + separate command response; **`LOOK`** refreshes description.
- Simpler ASCII maps (spatial `?` connections, not letter-labeled).
- Board marble matcher tolerates **`THE`** / **`CLAY`** variants; **`USE … WITH`** partial prompts.
- Prototype end: blinking **PLAY AGAIN** + **`RESTART`** (not death).
