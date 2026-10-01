# Kalyan Krapa Portfolio

Shared by every coding agent (Claude Code, Cursor, others). Claude Code reads this file through the `@AGENTS.md` import at the top of `CLAUDE.md`. **Edit shared rules here, not in `CLAUDE.md`** — `CLAUDE.md` holds only Claude-specific additions.

Single-page React 18 + Vite 5 portfolio for Kalyan Krapa: two Canvas 2D layers (animated background and a Dalmatian mascot that chases the cursor), glassmorphism UI, light/dark theme, and 11 easter eggs. Everything is hand-coded and intentional — treat visual details as requirements, not a template.

- Live: https://kalyan-krapa-portfolio.netlify.app/ · Repo: https://github.com/Krapa007/Portfolio
- Netlify builds `npm run build` and publishes `dist/`; `netlify.toml` has the SPA redirect `/* → /index.html`.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview  # serve the production build
```

There is no test framework and no `test` script. Verify changes in the browser (`npm run dev`), on desktop and at mobile width.

## Stack rules

- No UI or styling libraries: no Tailwind, MUI, Framer Motion or CSS modules. Styles are inline style objects plus CSS custom properties.
- Theme tokens (`--accent`, `--text`, …), keyframes, the cursor ball and resets live in `src/index.css`. Dark is the default; `App.jsx` toggles `body.light` for light mode.
- Reusable glass style: `GLASS_STYLE` in `src/data/constants.js`.
- Fonts (Sora, Fira Code) load from Google Fonts in `index.html`.

## Where to make changes

| Task | File |
|---|---|
| Project, skill, cert, role text and links | `src/data/constants.js` (`PROJECTS`, `SKILLS`, `CERTS`, `ROLES`) — the single source of site content. A new skill needs a `signal: {r,g,b}` colour |
| Bio, job, location | `src/components/About.jsx` + `ROLES` in `constants.js` |
| Contact email | `src/components/Contact.jsx` — update every occurrence (copy-to-clipboard text and `mailto:` href) |
| Accent colour | `--accent` / `--accent2` in `src/index.css` |
| New easter egg | `src/hooks/useGimmicks.js` — add to the `WORDS` object (typed triggers) or add a listener in `useGimmicks()` |
| New section | New component → add to `App.jsx` → add its ID to `SECTIONS` in `src/hooks/useActiveSection.js` → add a link to `NAV_LINKS` in `Navbar.jsx` |
| Dog behaviour | `src/components/DogCanvas.jsx` (`drawDog()`, `loop()`) |
| Background effects | `src/components/BackgroundCanvas.jsx` (`tick()`) |

Don't hand-edit `dist/` (build output, regenerate with `npm run build`), `node_modules/` or `package-lock.json`.

## Invariants and gotchas

1. **Canvases are portalled to `document.body`** in `App.jsx`:
   ```jsx
   {!isTouch && createPortal(<BackgroundCanvas />, document.body)}
   {!isTouch && createPortal(<DogCanvas />, document.body)}
   ```
   Keep them there. Moving them inside the content `div` (`position: relative; zIndex: 1`) creates a stacking context that traps the cursor ball.
2. **Stacking order** (keep it when adding fixed or overlay UI):
   | Layer | z-index |
   |---|---|
   | Cursor ball `#kk-ball` (`src/index.css`) | 999999 |
   | DogCanvas | 999998 |
   | Secret modal card (`useGimmicks.js`) | 99981 |
   | ScrollProgress | 6000 |
   | Navbar | 5000 |
   | Content wrapper | 1 |
   | BackgroundCanvas | 0 |
3. **No `backdrop-filter` on full-screen overlays.** It creates a stacking context that traps the cursor ball. The secret modal's overlay is a plain dark `rgba`; only its small card has `backdrop-filter`. Follow the same pattern for new overlays.
4. **The native cursor is hidden globally** (`cursor: none` in `src/index.css`); `#kk-ball` replaces it. Only the `@media (hover: none) and (pointer: coarse)` block restores the cursor.
5. **Touch devices skip both canvases.** `App.jsx` checks `(hover: none) and (pointer: coarse)` once on mount and renders no canvas or cursor ball.
6. **Reduced motion is respected.** `App.jsx` reads `prefers-reduced-motion`, passes `reducedMotion` to `Hero`, and toggles `body.reduced-motion`. New animations must check it. `useTypewriter` returns the first role statically when disabled.
7. **The Skills section ID is `stack`**, not `skills` (nav label "Skills", link `#stack`, `SECTIONS` entry `stack`). Rename all three together if ever.
8. **`useGimmicks()` is called in `Hero.jsx`** even though its effects are global: Hero is always mounted, so the listeners live for the whole session. `spawnConfetti` and `showToast` are named exports usable without the hook.
9. **Light mode lowers canvas alpha.** `BackgroundCanvas` checks `body.light` via `isLt()` (e.g. `isLt() ? 0.08 : 0.18`). Give new canvas effects a light-mode value.
10. **Scroll reveal:** add class `rv` to an element; `useReveal` adds `in` when it enters the viewport.

## Window event bus

Components talk through `window` custom events. Keep names and payloads stable; rename a sender and its listener together.

| Event | Sender → listener | Effect |
|---|---|---|
| `bg:accent` | Skills hover, rave egg → BackgroundCanvas | Tint accent: `{ detail: { color: [r,g,b] } }`, `{}` resets; decays to orange |
| `bg:matrix` | Konami egg → BackgroundCanvas | Matrix rain for 5 s |
| `dog:tether:projects` / `dog:tether:skills` | Section `mouseEnter` → DogCanvas | Dog runs to bottom-left / bottom-right with a speech bubble |
| `dog:untether` | Section `mouseLeave` → DogCanvas | Dog chases the cursor again |
| `dog:spin` · `dog:backflip` · `dog:hearts` | Gimmicks → DogCanvas | Spin, faster spin, heart paw trail (3 s) |
| `dog:footer` / `dog:footer:leave` | Gimmicks scroll listener → DogCanvas | Tether to footer corner ("that's all folks! 🐾") / release |
| `dog:latenight` | Gimmicks → DogCanvas | Sleepy dog with nightcap |
| `logo:click` | Navbar logo → useGimmicks | Double-click counter for the secret modal |

## Easter eggs (11)

All wired in `src/hooks/useGimmicks.js`. Don't break them when touching input, click or scroll handlers.

1. Double-click the `KC.` logo (within 2 s): "You found the developer. Now hire them." modal.
2. Konami code ↑↑↓↓←→←→BA: Matrix rain (`bg:matrix`).
3. Type `hireme`: confetti, toast, dog spin.
4. Type `dog`: dog backflip and toast.
5. Type `kalyan`: page text glitch for 1 s.
6. Type `404`: fake 404 overlay (click or 4 s to dismiss).
7. Type `rave`: rainbow accent cycling for 5 s.
8. Triple-click anywhere (within 500 ms): heart paw trail and toast.
9. Visit on July 12: birthday confetti and toast.
10. Visit 00:00–03:59: sleepy dog (`dog:latenight`).
11. Scroll to the bottom: dog runs to the footer corner.

Typed triggers ignore keystrokes inside inputs. A one-time Konami hint toast shows 3 s after first load (`sessionStorage` key `kk-hint`).

## Tools

The repo is indexed by three MCP servers: gitnexus (impact / change analysis), codebase-memory-mcp "CBM" (symbols, callers, architecture) and lean-ctx (compressed file read, search, shell). Prefer them over built-in read/search/shell for code exploration. Fall back to built-ins when an MCP call errors or returns empty, and say so.
- In Cursor, call MCP tools with `CallMcpTool` (schemas under `mcps/<server>/tools/`).
- gitnexus repo: `Portfolio`. Pass `repo: "Portfolio"` on every gitnexus call — several repos are indexed on this machine.
- CBM project: path-mangled from the repo path — get the exact name from `list_projects`.
- Reindex gitnexus with `npx gitnexus analyze --index-only`. `--index-only` stops gitnexus from rewriting `AGENTS.md`, `CLAUDE.md` and `.claude/skills/`. Don't run it while a gitnexus MCP call is in flight.

## gitnexus rules

- Run `impact({target, direction: "upstream", repo: "Portfolio"})` before you edit a symbol other files use (exported/public), a shared component or helper, or a change that spans 3+ files. Report callers and risk. Warn on HIGH/CRITICAL before editing, and don't use `riskSharedAxes` to waive it.
- `risk: UNKNOWN` or an empty caller set is not "safe". Callers can be unresolvable (dynamic dispatch, reflection/DI, plain-object property access). Confirm with a text search before you change or delete the symbol.
- Before a commit: `detect_changes({scope: "all"})`. `partial: true` or `truncated: true` is not a clean result — re-run it.
- Rename symbols with gitnexus `rename` (run it with `dry_run: true` first), not find-and-replace.
- Impact scored against a stale index is worse than none. If the index is behind HEAD, reindex first.
- Concepts and flows: `query`. One named symbol: `context`. Overview: `gitnexus://repo/Portfolio/context` (also `/clusters`, `/processes`).
