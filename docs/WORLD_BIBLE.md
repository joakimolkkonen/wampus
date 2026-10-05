# World Bible — Wampus the Wombat

Durable creative rules for this project. This document records **established design**, not spoilers or final answers.

## Product

- Small retro ASCII browser adventure.
- Player symbol: `@`.
- Core loop: **see something → try something → world responds → learn something → explore further.**
- Exploration over hard puzzles. The world can be strange; the **game** should stay understandable.

## Tone

- Mysterious, sparse, eerie, curious.
- Occasionally absurd; dryly funny when appropriate.
- Responses stay concise. No scrolling transcript; one screen on a normal laptop.

## Core design rules (established)

1. **The world is strange, but not random.** Geography is stable; rooms do not rearrange.
2. **Ordinary things usually behave ordinarily.** Then sometimes they don’t — with purpose, not noise.
3. **The world acknowledges experimentation.** Reasonable attempts get sensible or bespoke replies, not generic parser failures when practical.
4. **Wampus remains ambiguous.** Do not conflate the player, the small furry creature, and the name “Wampus” in lore or copy.
5. **Discovery matters more than explanation.** Unresolved mysteries are intentional.

## Three separate concepts (do not collapse)

| Concept | Notes |
|---------|--------|
| The player (`@`) | Identity deliberately unclear |
| The small furry creature | Not confirmed to be Wampus |
| “Wampus” | Word, box label, title — meaning unresolved |

## Time and death

- No hunger, clock, day/night, NPC schedules, or countdown.
- Death is uncommon, predictable, and can be funny. The well is sufficient for the current prototype.

## Interaction philosophy

- If the game mentions a thing, reasonable phrasings should work (`OPEN LID`, `LOOK BRASS TAG`, `PUT MARBLE IN CUP`, etc.).
- `LOOK` alone must reliably redisplay useful context for the current room and state.
- Arrow keys are the primary movement affordance; N/S/E/W may exist as commands but should not compete visually with arrows.
- Inventory limit: **three objects** (current prototype).

## UI

- Compact CRT/ASCII look; fits one browser screen on a typical laptop.
- No PREV/LATEST message history (historical text could describe the wrong room).

## Unresolved mysteries (not answers)

Treat these as open questions — do not document them as solved:

- `FOR WAMPUS` on the box
- `@` (player vs symbol vs label)
- `///` (scratches and brass tag)
- The silent bell
- The furry creature
- Impossible marble behaviour
- Impossible rain
- Mirror behaviour (figure in the glass)
- The underground tree / root
- The black button and what opens “far away”

## What this prototype is not

- Not a full game yet; content ends with an explicit prototype boundary for playtesters.
- No backend, accounts, analytics, AI features, or framework requirement for the core experience.
