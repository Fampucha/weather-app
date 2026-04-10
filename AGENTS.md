# AGENTS.md

## Purpose
This file defines how AI coding agents should work in this repository.
Goal: ship safe, small, reviewable changes for the weather app.

## Project Snapshot
- Stack: React 19 + Vite 8 + Sass
- Package manager: npm (`package-lock.json` present)
- Main app entry: `src/main.jsx`
- Main UI container: `src/App.jsx`
- Weather API service: `src/services/weatherService.js`
- Theming and weather mapping: `src/constants/weatherThemes.js`, `src/utils/*`

## Runbook
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Lint: `npm run lint`
- Build production bundle: `npm run build`
- Preview production build: `npm run preview`

## Environment
- Required env var: `VITE_WEATHER_API_KEY`
- Put it in `.env` at repo root.
- Never commit secrets.
- Never print API keys in logs or UI.

## Coding Rules For Agents
- Prefer meaningful refactors when they improve readability, structure, and maintainability.
- It is acceptable to reorganize modules/components when this reduces complexity.
- Keep refactors intentional and explain them clearly in change notes.
- Prefer functional React components and hooks.
- Use existing folder structure; do not introduce new architecture without need.
- Reuse helpers in `src/utils` and constants in `src/constants` before adding new logic.
- Keep API calls in `src/services`.
- Keep styles in `src/styles` (SCSS), following existing theme/component split.
- Remove dead/commented code when touching the same area, if safe.
- Do not break existing public behavior unless task explicitly requests it.

## Quality Checklist Before Finishing
- `npm run lint` passes.
- App starts with `npm run dev`.
- `npm run build` passes.
- Weather data flow still works (fetch, parse, render path).
- No secret values exposed.
- No obvious console errors in touched flow.

## Pull Request / Change Notes
When an agent completes work, include:
- What changed.
- Why it changed.
- Any assumptions made.
- How it was verified (commands run).
- Follow-up items (if any).

## Known Context (Current State)
- `src/App.jsx` contains experimental and commented blocks.
- Prefer incremental cleanup instead of large rewrites unless explicitly requested.
- Use `getWeather(city)` from `src/services/weatherService.js` as the primary weather fetch helper.

## Out Of Scope Unless Asked
- Migrating to TypeScript.
- Replacing weather API provider.
- Large-scale design system rewrite.
- Dependency major-version migrations.
