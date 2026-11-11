# NOTES.md — PizzaFriday

Read NOTES.md first at start of future jobs; keep current; dev only until Marc explicitly approves main.

Notes written 2026-11-08. No earlier NOTES.md. Pizza dough calculator PWA: baker's percentages, automatic yeast scaling, dough-ball sizing, and a step-by-step method with real clock times and bake timers. Manifest name: "PizzaFriday — Pizza Dough Calculator". `start_url` / scope are `/PizzaFriday/`. Share URL in source: https://darcmuff.github.io/PizzaFriday/ . Files are `index.html`, `sw.js`, `manifest.json`, `privacy.html`, and icons. No README.

Privacy page (11 September 2026): developer DuffApps, Android package `com.duffapps.pizzafriday`, on-device data only, notifications only to say a bake timer finished, no analytics or ads. It names GitHub Pages as the web host.

## Current state (checked in git on 2026-11-08)

- Default branch is `main` at `8f5e106` (2026-09-11): privacy policy names DuffApps, PizzaFriday Dough Calc, and the Play package. This `dev` branch was created from that commit. `main` was not changed.
- Latest product commits before that are 2026-07-25 (knead-flow pill, lock recipe during a live bake, session persistence). No commits after 2026-09-11 in the history inspected.
- Another branch, `add-privacy-policy`, exists at `04de380`. This job did not inspect or merge it.
- The page registers Capacitor plugins when present: `Timer`, `BakeNotification`, `Preferences`. Preferences are described as Android SharedPreferences so session state survives the WebView.
- Timer handoff is intentional. In-app guide: the timer pill opens the phone's native clock with the duration, and that works in the Android app only. On the website the pills are progress indicators and do not launch an external timer. A comment says `TimerPlugin.java` rejects if no clock app handles the intent.
- Guide also documents two ferment modes (room temp, slider capped at 30 hours; cold ferment, slider not below 14 hours). Yeast scaling follows kitchen temperature.
- Service worker cache name is `pizzafriday-v2` (bumped from `pizzafriday-v1` so installed copies pick up the dough-total change). Precache paths are under `/PizzaFriday/` (page, manifest, both icons). `privacy.html` is not in that list.
- Total dough is ball size × ball count × 1.02 (2% for scraps left on the bowl and bench). Flour, water, salt, oil, and yeast are shares of that total, with yeast in the baker's-percentage denominator. Weights are in 0.1g steps and flour absorbs the rounding remainder, so the ingredient rows add up to the same total shown under the dough-ball summary and on the ingredients table.
- No `TODO` / `FIXME` markers in the html/js scanned.

## What's next

Nothing in source marks an open task. Do not invent a roadmap. The July–September history above is the last recorded work. Leave the Android clock handoff as designed unless Marc asks to change it.

## Working agreement

Land work on `dev`. Do not merge `main` until Marc explicitly approves. No secrets or customer details in this file.
