---
name: phase-complete
description: Run after the user approves a phase (or a phase follow-up) as done. Marks the phase's own README/follow-up status and checklists complete, updates the root PLAN.md roadmap table, and records what happened in persistent memory so future sessions pick up with full context.
---

# Phase completion checklist

Use this whenever the user signals a phase (or a phase follow-up) is finished and approved — phrases like "good work, move to phase N", "approved", "that's done", or an explicit request to close out a phase.

## 1. Update the phase's own doc

In `phases/NN-slug/README.md` (or `follow-up.md` if this was a follow-up round):

- Set `## Status` to a short, specific done-state (not just "Done" — say what shipped, e.g. "Done — Indigo Pulse palette, real photography, offers-alignment fix shipped and verified by the user.")
- Check off every completed `- [ ]` under Acceptance Criteria and Task Checklist to `- [x]`.
- If something was scoped but deliberately deferred (not a bug, a real scope decision), add a line under `## Notes / Risks` naming what was deferred and to which future phase, so that phase doesn't rediscover it from scratch.

## 2. Update the root `PLAN.md`

In the `## 8. Phased Delivery Roadmap` table, set the just-finished phase's `Status` column to `Done`. If the next phase is about to start, leave its status as `Not Started` — only flip it to `In Progress` once work on it actually begins, not preemptively.

If anything discovered during the phase changes a decision recorded in `## 9. Open Decisions / Assumptions Log` (e.g. scope pulled forward, a plan assumption proven wrong), add or amend a bullet there — this log is the running source of truth for deviations from the original phase breakdown.

## 3. Update persistent memory

Read `MEMORY.md` at `/Users/mac/.claude/projects/-Users-mac-Desktop-Aboda-projects-Raba-center/memory/` (the auto-memory system). Decide what's worth keeping:

- **project memory**: what shipped, any non-obvious decision made during the phase (e.g. a palette choice, a scope trade-off, a bug root-cause) that isn't already fully derivable from reading the code or git log. Skip anything that's just "we built X" if X is obvious from `phases/NN-slug/README.md` itself — only save the _why_ behind non-obvious calls.
- **feedback memory**: any new standing instruction the user gave during the phase about how to work (workflow constraints, things to stop/keep doing). Check `MEMORY.md` first — don't duplicate an existing entry, update it instead if it changed.

Write new/updated memory files following the existing frontmatter format in that directory, then add or update their one-line pointers in `MEMORY.md`.

## 4. Confirm before moving on

Run `npm run typecheck`, `npm run lint`, and `npm run build` to confirm the tree is clean (skip `npm run test:e2e` unless the user explicitly asks — see feedback memory on manual verification). Do not launch a preview server or take screenshots for self-verification unless asked; the user verifies visually themselves.

Then state in one or two sentences what was marked done and which phase is next, and proceed to that next phase's planning/work as instructed.
