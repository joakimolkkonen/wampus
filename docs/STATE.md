# Implementation state

Snapshot for returning to the project after time away. Reference build: `archive/wampus_the_wombat_v0_17.html`.

## Architecture

- Vanilla HTML/CSS/JS: `index.html`, `css/style.css`, `js/rooms.js`, `js/game.js`, `js/parser.js`.
- Active game = v0.17 content plus Playtest 1 fixes and polish (see `CHANGELOG.md`).

## Movement UI

- Arrow keys move **cardinal** exits only (no arrow key = vertical).
- When **UP** or **DOWN** exits exist, labeled buttons appear under the ASCII map; **Page Up / Page Down** also move vertically.
- Context line lists exits as `←W  ↑N  →E  ↓S  ↑UP  ↓DOWN` (not raw `U`/`D` letters).

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
- Board: marble in cup/hole/board → hatch; use **↓ DOWN** (or button) to belowroom.
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

- Exit bar + clearer ASCII map labels (N/E/S/W, DOWN, UP).
- Black button: press in place after opening bag (no forced TAKE).
- Three additional optional deaths (see table).
- Prototype ending unchanged after button press.

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
