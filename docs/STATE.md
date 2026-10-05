# Implementation state

Snapshot for returning to the project after time away. Reference build: `archive/wampus_the_wombat_v0_17.html`.

## Architecture

- Vanilla HTML/CSS/JS, split into `index.html`, `css/style.css`, `js/rooms.js`, `js/game.js`, `js/parser.js`.
- Behaviour matches v0.17 except Playtest 1 fixes noted in `CHANGELOG.md`.

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
- Board: marble in cup/hole/board → hatch; descend to belowroom.
- Below: untie bag → black button; press button → **prototype end message**.

## Playtest 1 fixes (this milestone)

- Board/marble: flexible `PUT` / `PLACE` / `USE … WITH BOARD` phrasing (including `HOLE`, articles, `CLAY MARBLE`).
- Prototype boundary: after pressing the black button, show unmistakable end-of-content message.

## Known issues / limits

- Content after the button press is **not implemented** (teased only: “something large opens”).
- `wellSolved` appears in well LOOK paths but is not set elsewhere (legacy / unused flag).
- Hook room marble roll logic references `__oldhook` (unused room id) — hook puzzle uses pull hook only.
- Single-file v0.16 remains in repo root; canonical reference is v0.17 in `archive/`.

## Development boundary

**End of playable content:** player obtains the black button in `belowroom`, presses it, receives in-world click + distant “something opens,” then the prototype ending text.

Nothing beyond that is playable; playtesters should not hunt for further rooms.

## Immediate next milestone (deferred)

- Post–Playtest 1: incorporate blind playtest notes only where they fix confusion or bugs — **no world expansion** until explicitly planned.
- First content beat after the button (whatever “something large opens” leads to) — **not started**.

## Deliberately deferred

- New rooms, puzzles, lore reveals, sound, frameworks, backend, saves, analytics.
- Resolving Wampus / creature / `@` mysteries.
- Scrolling log or message history UI.
