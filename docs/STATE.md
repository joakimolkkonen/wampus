# Implementation state

Snapshot for returning to the project after time away. Reference build: `archive/wampus_the_wombat_v0_17.html`.

## First external blind playtest

**Completed** (developer friend). Full notes: `docs/PLAYTEST_NOTES.md`.

**Headline finding:** *The world can be confusing; the game should not be confusing.*

**Addressed this pass:** parser teaching in opening rooms, response-area scrolling, bespoke eat-string-style replies, removed non-well deaths, docs updated.

**Still open:** ASCII map visual-design pass, intra-room movement (idea only), mobile layout/input (desktop-first).

## Architecture

- Vanilla HTML/CSS/JS: `index.html`, `css/style.css`, `js/rooms.js`, `js/game.js`, `js/parser.js`.

## Movement UI

- Global hint: `ARROWS MOVE · SEE SOMETHING · TRY SOMETHING · HELP`.
- Room name + **`EXITS: NORTH · EAST · …`** line.
- Arrow ↓/↑ use DOWN/UP when S/N absent.
- Invalid moves: **`YOU CAN'T GO THAT WAY.`**

## Presentation

- **Persistent room description** (`#roomdesc`); **current response** (`#response`) scrolls internally when long (no full-page scroll, no transcript log).
- Prototype completion: full-screen ending layout + **PLAY AGAIN**.
- Title: **Enter** (desktop) or **tap** prompt (touch).

## Platform

**Desktop/laptop-first.** Mobile can start the game; play is not designed for phones yet.

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

## Deaths (current)

| Trigger | Room | Notes |
|---------|------|--------|
| Jump in well (confirm Y) | `well` | Only death in current build |

## Parser / onboarding (post–playtest #1)

- Early failures: **`THAT DOES NOT COMPUTE.`** + verb hints; context nudges at well/box/corridor.
- After enough successful commands: terse **`THE COMPUTER DOES NOT UNDERSTAND.`** returns.
- Start room line: *TYPE SIMPLE VERBS AT THINGS YOU NOTICE.*

## Development boundary

**End of playable content:** press the black button → prototype ending text (not death).

## Immediate next milestone (deferred)

- Incorporate further playtest feedback without expanding the map.
- Deliberate pass on ASCII map art quality.
- Decide whether intra-room movement is in scope (see PLAYTEST_NOTES).

## Deliberately deferred

- New rooms/story, mobile redesign, intra-room arrow movement, death quota, resolving Wampus mysteries.
