# Playtest notes

Separate log of playtest sessions. **Observed** = what happened; **Interpretation** = our read; **Ideas** = not decided, not implemented.

---

## External blind playtest #1 (developer friend)

### Observed

- Early confusion: many **`COMPUTER DOES NOT UNDERSTAND.`** responses; player unsure the game was parsing input at all.
- Stuck at the **well** after *“SOMETHING GLITTERS FAR BELOW.”* — tried to solve it immediately rather than explore elsewhere.
- After a small hint to move/explore, continued successfully.
- Jumped into the **well** and found the death/restart flow.
- Explored further; used inventory; **ate the apple**; tried to **eat the string** (generic failure at the time).
- Met the **furry creature**; reacted with humour.
- Reached **hook room**; discovered **`PULL HOOK`** without help.
- Reported **long response text clipping** (hook passage message cited).
- Liked the **mix of ASCII map + text**.
- Expected/wished to **move inside rooms with arrow keys** (between-room movement is arrows today).

### Interpretation

- **Parser/UI clarity** mattered more than world mystery in the first ten minutes.
- The well glitter reads as a puzzle; the prototype expects **exploration first**.
- The verb + thing model works once discovered (`PULL HOOK`, eat apple).
- Response clipping undermines trust in the UI.
- ASCII map is valued; **spatial readability** of the art is still weak (separate from the map+text combo).

### Ideas (not decided)

- **Intra-room movement** with arrows: `@` moving inside larger ASCII rooms vs abstract room graph — major design fork; could enrich or undermine the verb-driven room model.
- **ASCII visual-design pass**: corridor/room readability without abandoning minimal retro look.
- **Mobile**: tap-to-start helps; full phone play needs layout + input redesign — treat as **desktop/laptop-first** for now.
- More deaths only when **obviously dangerous** and player-chosen (well model), not a quota.

### Follow-up implemented (see CHANGELOG)

- Parser teaching hints in opening areas; well/glitter nudges.
- `EAT STRING` (and related) bespoke replies.
- Scrollable `#response` region (not full-page transcript).
- Removed tree/mirror/rain arbitrary deaths; kept well death.
- Documentation of identity ambiguity and “game about verbs” in WORLD_BIBLE.
