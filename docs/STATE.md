# Implementation state

Snapshot for returning to the project after time away. Reference build: `archive/wampus_the_wombat_v0_17.html`.

## Architecture

- Vanilla HTML/CSS/JS: `index.html`, `css/style.css`, `js/rooms.js`, `js/game.js`, `js/parser.js`.
- Active game = v0.17 content plus Playtest 1 fixes and polish (see `CHANGELOG.md`).

## Movement UI

- Global hint (top-right): `ARROWS MOVE · TYPE COMMANDS · HELP`.
- Room name + single **`EXITS: NORTH · EAST · …`** line (includes **UP** / **DOWN** when open).
- Arrow keys: **N/E/S/W** when present; if **N** (or **S**) is absent, **↑** (or **↓**) uses **UP** / **DOWN**.
- Invalid moves (arrows or typed): **`YOU CAN'T GO THAT WAY.`**
- No on-screen movement button bar.

## Presentation

- **Persistent room description** (`#roomdesc`) stays visible; command results appear in **`#response`** below it.
- **`LOOK`** refreshes the full room description (does not replace the layout with response-only text).
- Prototype completion: blinking **PLAY AGAIN** control + `PLAY AGAIN` / `RESTART` commands (not a death screen).

## Rooms (implemented)

| ID | Player-facing name | Notes |
|----|-------------------|--------|
| `start` | Small stone room | South to corridor |
| `corridor` | Cross passage | `///` scratches; E well, W box |
| `well` | Well room | Jump death / restart |
| `box` | Box room | `FOR WAMPUS` box; S to stairs |
| `stairs` | Narrow passage | E to creature |
| `creature` | Furry thing | Marble; shout / movement beats |
| `hookroom` | Tiled room | Hook opens E to tree area |
| `beyond` | Tree room | Silent bell → brass tag; N to rain |
| `rainroom` | Rain room | Dry floor; N chair, E mirror |
| `mirrorroom` | Mirror room | Reflection absent / other figure |
| `chairroom` | Chair room | Sit / floor message; E board |
| `boardroom` | Board room | Cups + hole; marble opens hatch down |
| `belowroom` | Under the board | Bag, root, black button |

## Important interactions (non-exhaustive)

- Box: open, take bell / string / half apple.
- Well: bell on string, lower/raise, jump Y/N death.
- Creature: approach timing, shout, take marble when safe.
- Hook room: pull hook → secret east; label `@`.
- Beyond: ring bell → brass tag with `///`.
- Rain / mirror / chair: room-specific LOOK and TRY verbs.
- Board: marble in cup/hole/board → hatch; **↓** (no south exit) descends to belowroom.
- Below: untie bag → black button on floor; **PRESS BUTTON** works without TAKE → **prototype end** (not a death).

## Deaths (current)

| Trigger | Room | Notes |
|---------|------|--------|
| Jump in well (confirm Y) | `well` | Original death |
| `CLIMB TREE` | `beyond` | Deliberate; endless trunk |
| `ENTER MIRROR` / step-into variants | `mirrorroom` | Deliberate |
| `LIE IN RAIN` / `LIE DOWN IN RAIN` | `rainroom` | Deliberate |

All deaths: short message, **PLAY AGAIN? Y/N**.

## Playtest 1 polish (latest)

- Simplified navigation UI (no exit button bar); arrow ↓/↑ fallback for DOWN/UP.
- Split room description vs command response panel.
- Simpler spatial ASCII maps (`?` passages, no compass letters on map).
- Marble phrasing + incomplete `USE … WITH` hints.
- Prototype ending + **PLAY AGAIN**.

## Known issues / limits

- Content after the button press is **not implemented** (teased only: “something large opens”).
- `wellSolved` appears in well LOOK paths but is not set elsewhere (legacy / unused flag).
- Hook room marble roll logic references `__oldhook` (unused room id) — hook puzzle uses pull hook only.

## Development boundary

**End of playable content:** press the black button (in hand or in the bag), then read the prototype ending text. Successful completion of the current build — not a death.

## Immediate next milestone (deferred)

- Post–Playtest 1 feedback: bug/confusion fixes only unless explicitly scoped.
- First content beat after the button — **not started**.

## Deliberately deferred

- New rooms, puzzles, lore reveals, sound, frameworks, backend, saves, analytics.
- Resolving Wampus / creature / `@` mysteries.
- Scrolling log or message history UI.
