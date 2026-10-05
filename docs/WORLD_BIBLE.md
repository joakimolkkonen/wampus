# World Bible — Wampus the Wombat

Durable creative rules for this project. This document records **established design**, not spoilers or final answers.

## Product

- Small retro ASCII browser adventure.
- Player symbol: `@`.
- Core loop: **see something → try something → world responds → learn something → explore further.**
- Exploration over hard puzzles. The world can be strange; the **game** should stay understandable.

**Design principle (playtest #1):** *The world can be confusing. The game should not be confusing.* Mystery lives in the fiction; the parser and UI should invite experimentation, not fight it.

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
- Death is **uncommon**, **predictable**, and may be dryly funny when the player **clearly chooses** something dangerous (the well jump).
- No “death quota.” Remove or avoid deaths that punish curiosity without fair warning. Future deaths should emerge from obviously reckless experiments the player understands.

## Interaction philosophy — a game about verbs

Internally, treat Wampus as **a game about verbs**: simple commands aimed at things the description mentions.

Target player realization: *I see something in the text → I type a simple verb at it → I try things.*

Examples: `LOOK`, `LOOK WALL`, `LOOK SCRATCHES`, `OPEN BOX`, `TAKE APPLE`, `DROP APPLE`, `EAT APPLE`, `RING BELL`, `USE STRING WITH BELL`, `PULL HOOK`, `SHOUT`.

Opening rooms should **teach this through play**, not a heavy tutorial overlay.

- If the game mentions a thing, reasonable phrasings should work (`OPEN LID`, `LOOK BRASS TAG`, `PUT MARBLE IN CUP`, etc.).
- **Experimentation** deserves acknowledgement — bespoke dry replies beat generic parser failure when the intent is obvious (e.g. eating non-food objects).
- Parser personality may use retro **`COMPUTER DOES NOT UNDERSTAND.`**, but early failures should gently teach the verb grammar; do not spam unhelpful failures in the opening sequence.
- `LOOK` alone must reliably redisplay useful context for the current room and state.
- Arrow keys move **between rooms** (not inside rooms — see product ideas in `PLAYTEST_NOTES.md`).
- Inventory limit: **three objects** (current prototype).

## Identity ambiguity (seed, do not answer)

Relatively early, the fiction should allow the player to wonder:

- Whether **Wampus** is something they are seeking (`FOR WAMPUS`, title, rumours).
- Whether the **furry creature** is Wampus (do not confirm or deny).
- Whether the player **`@`** might be Wampus (label `@`, mirror, symbol — do not confirm or deny).

Do **not** use explicit quiz text (e.g. “ARE YOU WAMPUS?”). Let `@`, the creature, and the word *Wampus* stay three separate questions.

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
