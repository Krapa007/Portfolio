# CLAUDE.md — Kalyan Krapa Portfolio (Full Project Context)

This file exists so a new Claude session can load full project context instantly without re-reading every source file. Read this first before touching anything.

---

## What This Project Is

A personal developer portfolio website for **Kalyan Krapa** — a Junior Software Developer at Stackular, India. It is a single-page React app with heavy custom Canvas 2D animation, a Dalmatian dog mascot that chases the cursor, glassmorphism UI, light/dark theming, and 11 easter eggs hidden throughout. It is **not** a template — every pixel is intentional.

**Live URL:** https://kalyan-krapa-portfolio.netlify.app/  
**GitHub repo (portfolio):** https://github.com/Krapa007/Portfolio  
**Deployed on:** Netlify (frontend SPA with redirect rule for client-side routing)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18.3.1 |
| Build tool | Vite 5.4.2 |
| Styling | Pure CSS-in-JS (inline styles) + CSS Variables — **no Tailwind, no CSS modules** |
| Fonts | Sora (headings/body), Fira Code (monospace/code UI) — loaded via Google Fonts in index.html |
| Animation | Canvas 2D API (two separate canvas layers) |
| Deployment | Netlify — `npm run build` → `dist/` folder |
| Package manager | npm |

**No external UI libraries.** No Tailwind, no MUI, no Framer Motion. Everything is hand-coded.

---

## Project Structure

```
portfolio-clean/
├── index.html                  # Entry HTML — loads Google Fonts, mounts #root
├── vite.config.js              # Just { plugins: [react()] }
├── package.json                # name: kalyan-portfolio, React 18 + Vite
├── netlify.toml                # build: npm run build, publish: dist, SPA redirect /*
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── dist/                       # Production build output (do not edit)
└── src/
    ├── main.jsx                # ReactDOM.createRoot → <App />
    ├── App.jsx                 # Root component (see below)
    ├── App.css                 # Global CSS variables, keyframes, base styles
    ├── index.css               # Resets, body, scrollbar
    ├── data/
    │   └── constants.js        # ALL site content lives here (ROLES, PROJECTS, SKILLS, CERTS, GLASS_STYLE)
    ├── hooks/
    │   ├── useGimmicks.js      # All easter eggs + spawnConfetti + showToast
    │   ├── useTypewriter.js    # Cycling typewriter for ROLES array
    │   ├── useReveal.js        # IntersectionObserver scroll-reveal for .rv elements
    │   └── useActiveSection.js # Tracks which section is in view for nav highlight
    └── components/
        ├── BackgroundCanvas.jsx # Canvas layer 1: particles, aurora, grid, meteors
        ├── DogCanvas.jsx        # Canvas layer 2: Dalmatian dog mascot
        ├── Navbar.jsx           # Fixed top nav with theme toggle
        ├── ScrollProgress.jsx   # 2px top progress bar
        ├── Hero.jsx             # Landing section with JSON panel + typewriter
        ├── Projects.jsx         # 3 project rows
        ├── Skills.jsx           # 7 skill rows
        ├── Certifications.jsx   # 3 cert cards
        ├── About.jsx            # Bio + award + details table
        ├── Contact.jsx          # Glass CTA card with email copy
        └── Footer.jsx           # Minimal footer
```

---

## App.jsx — Root Component

**Key responsibilities:**
- Manages `light` (boolean) theme state and `prefersReducedMotion` state
- Detects touch devices once on mount (`(hover: none) and (pointer: coarse)`) — if touch, **skips both canvas layers entirely**
- Injects the custom cursor ball `div#kk-ball` that follows the mouse (desktop only)
- Respects OS `prefers-reduced-motion` — passes `reducedMotion` prop to Hero, toggles `reduced-motion` body class
- Renders both canvas layers via `createPortal` directly onto `document.body` (so they sit at z-index 0, behind everything)
- All page sections sit inside a `div` with `position: relative; zIndex: 1`

**Canvas injection pattern (important):**
```jsx
{!isTouch && createPortal(<BackgroundCanvas />, document.body)}
{!isTouch && createPortal(<DogCanvas />, document.body)}
```
This is intentional. The portals are rendered to body so they never create a stacking context that traps the cursor ball (z-index 99999). Do NOT move them inside the content div.

---

## CSS Design System (App.css)

All theming is done via CSS custom properties on `:root`. Dark mode is default; light mode activates when `body.light` is present.

**Key variables:**
```css
--accent: #ff4500       /* Orange — primary accent everywhere */
--accent2: #ff6b35      /* Lighter orange — hover states */
--green: #4ade80        /* "Available" pill, live demo dots */
--white: #f0ece4        /* Headings */
--text: #c8c2b8         /* Body text */
--muted: #a0a0b0        /* Secondary text */
--muted2: #707080       /* Tertiary text */
--code: #a8ff78         /* Code-coloured text in typewriter */
--outline-stroke: ...   /* For webkit-text-stroke outlines */
```

**Key keyframes:**
- `gdot` — pulsing green dot animation (available pill, live demo)
- `bc` — blinking cursor animation
- `rv-in` — reveal animation for `.rv` elements (translateY + opacity)

**Scroll reveal:** Any element with class `rv` starts invisible and fades in when it enters the viewport. The `useReveal` hook adds class `in` via IntersectionObserver.

---

## All Site Content — `src/data/constants.js`

**This is the single source of truth for all content.** To update text, links, or add a skill/project/cert — only edit this file.

### ROLES (typewriter cycling)
```js
["Junior Software Developer @ Stackular", "MERN Stack Developer", "React Specialist",
 "Node.js Engineer", ".NET Explorer", "Vibe Coder"]
```

### PROJECTS (3 projects)
| # | Name | Stack | GitHub | Live |
|---|---|---|---|---|
| 01 | Vibezee | React, Tailwind, Node, Express, MongoDB, Stream API, JWT, Google OAuth | github.com/Krapa007/Vibezee-Project | vibezee-frontend.onrender.com |
| 02 | Recipe Hub | React, HTML5, CSS3, JS | github.com/Krapa007/RecipeBook-Project | tastifybuds.netlify.app |
| 03 | Portfolio | React 18, Vite, Canvas 2D, CSS Variables | github.com/Krapa007/Portfolio | kalyan-krapa-portfolio.netlify.app |

Each project object: `{ num, tags[], name, desc, tech[], gh, live }`

### SKILLS (7 skills)
React.js, Node.js & Express, MongoDB, HTML5 & CSS3, JavaScript, Real-time & Stream, MySQL & .NET

Each skill object: `{ name, cat, desc, chips[], projs[], signal: {r,g,b} }`

The `signal` color is dispatched as a `bg:accent` custom event when hovering a skill row — it tints the BackgroundCanvas accent colour.

### CERTS (3 certifications)
| Icon | Name | Org | Google Drive URL |
|---|---|---|---|
| 🐍 | Programming Essentials in Python | OPEN EDG | drive.google.com/file/d/1wIxrDdare2oCFnQKIk1cJ3vfKtYNv3mz |
| 🌐 | Introduction to Networks | CISCO | drive.google.com/file/d/1e7LrigONlBXWZPSz-j8AOHLiIvfBgbbz |
| ⚡ | The Complete JavaScript Course | Udemy | drive.google.com/file/d/19FeplLBZ_laiLOiWMblTLzwhTzXw3BEw |

### GLASS_STYLE
Reusable glassmorphism style object used across several components:
```js
{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)",
  backdropFilter: "blur(32px) saturate(160%)", WebkitBackdropFilter: "...",
  boxShadow: "0 0 0 1px rgba(255,255,255,.07) inset, 0 8px 40px rgba(0,0,0,.35)" }
```

---

## About Kalyan (Person)

- **Full name:** Kalyan Krapa
- **Email:** krapa.kalyan@gmail.com
- **GitHub:** github.com/Krapa007
- **LinkedIn:** linkedin.com/in/kalyan-krapa-556282229/
- **Location:** India (Hyderabad)
- **Education:** B.Tech IT, DIET, 2024
- **Current job:** Junior Software Developer at Stackular
- **Status:** Open to Work
- **Award:** 🏆 Best Paper Award — ICRIET Conference (Comment Classification using Sentiment Analysis, final year team of 4)

---

## Components — Detailed Notes

### Navbar.jsx
- Fixed, z-index 5000, frosted glass background
- Logo `KC.` → click dispatches `logo:click` event (used for double-click easter egg), scrolls to `#home`
- Nav links: Projects → `#projects`, Skills → `#stack` (note: section ID is "stack" not "skills"), Certs → `#certs`, About → `#about`
- Theme toggle pill: shows "☀️ Light" / "🌙 Dark" — calls `toggleLight()` from App
- "Hire Me" button → scrolls to `#contact`
- Hamburger menu (`☰`) appears at ≤ 900px, mobile menu includes all links + theme toggle
- `useActiveSection` hook highlights the active link

### Hero.jsx
- Two-column layout (stacks on mobile)
- Left: Available pill, subtitle, giant name, typewriter, bio paragraph, two CTA buttons, stats glass bar (3 Live Projects, 3+ Certifications, 1 Award Won)
- Right: Animated `profile.json` panel (hides on mobile via `@media(max-width:768px)`) — lines type in one by one at 120ms intervals
- `useTypewriter` hook cycles through ROLES
- `useGimmicks` hook is called here (attaches all easter egg listeners)

### Projects.jsx
- Section id: `projects`
- Enters `dog:tether:projects` event on mouseEnter → dog runs to bottom-left
- Each `ProjectRow` shows: tags, name, description, tech chips, GitHub button, Live Demo button
- Hover state: left orange accent bar, glass background
- Mobile: grid collapses to 1 column, buttons go full-width

### Skills.jsx
- Section id: `stack`
- Enters `dog:tether:skills` event on mouseEnter → dog runs to bottom-right
- Each `SkillRow` dispatches `bg:accent` with the skill's `signal` colour on hover — this tints the background canvas
- Grid: auto-fit columns, min 180px

### Certifications.jsx
- Section id: `certs`
- Each card is a link (`<a>`) to Google Drive PDF, opens in new tab
- Hover: card lifts with orange border

### About.jsx
- Section id: `about`
- Left: bio paragraphs + 🏆 award callout block
- Right: key-value table (Name, Role, Company, Education, Location, Status) + soft skill tags

### Contact.jsx
- Section id: `contact`
- Click on email text (`krapa.kalyan@gmail.com`) → copies to clipboard + shows toast "📋 Copied to clipboard!"
- Three buttons: GitHub (secondary), LinkedIn (secondary), Email Me (primary orange)
- Glass card with shimmer top line and diagonal refraction overlay

### Footer.jsx
- Logo `KC.`, copyright, GitHub + LinkedIn links + "Hyderabad, India" text

### ScrollProgress.jsx
- 2px fixed bar at top of viewport (z-index 6000 — above Navbar)
- Tracks `scrollY / (scrollHeight - clientHeight)` as percentage
- Orange gradient fill with glow shadow

### BackgroundCanvas.jsx
**Full-screen fixed canvas, z-index 0, pointer-events none.**

Renders 10 layers on every `requestAnimationFrame`:
1. **Aurora bands** — 5 sine-wave gradient bands across screen
2. **Grid** — 80px dot grid, brightens near cursor
3. **Cursor blob + 3 orbiters** — radial gradient follows cursor with lag; orbiters rotate around cursor position
4. **Magnetic field lines** — 12 lines emanating from cursor (dark mode only)
5. **Ambient blobs** — 3 slow-drifting radial gradients
6. **Meteors** — 9 streaking meteor trails, reset when off-screen
7. **Particles** — 130 floating particles, repel from cursor within 120px radius, burst on click
8. **Connection lines** — lines drawn between nearby particles, brighter near cursor
9. **Cursor spotlight** — soft glow at cursor position
10. **Click ripples** — 3 concentric ring ripples on click

**Custom events listened to:**
- `bg:accent` — changes the accent colour (orange by default). Fired by Skills hover and by rave easter egg. Decays back to orange at 0.94× per frame.
- `bg:matrix` — activates Matrix rain mode (Katakana characters falling, 5 seconds)

**Light mode:** Aurora opacity halved, grid/blob alpha reduced, static fallback drawn when `reduced-motion` is on.

### DogCanvas.jsx
**Full-screen fixed canvas, z-index 999998, pointer-events none.**

A hand-drawn Dalmatian dog with spring physics — drawn entirely with Canvas 2D paths (no images/sprites).

**Dog states:** `sit`, `run`, `spin` (360° rotation), `backflip` (faster 360°), `sleepy` (blue nightcap, triggered 0–4 AM)

**Physics:** `dvx/dvy` spring toward cursor position (or tether position), damping factor 0.76. Min speed 50px from edges.

**Paw trail:** Left every 32px of travel, fades out over time. Hearts instead of paws when `heartsActive`.

**Speech bubble:** Shows when tethered and speed < 2 ("studying 📚", "inspecting 🔍", "that's all folks! 🐾") or after click ("woof! 🐾")

**Custom events listened to:**
- `dog:tether:skills` — dog runs to bottom-right corner (W-80, H-80), bubble: "studying 📚"
- `dog:tether:projects` — dog runs to bottom-left corner (80, H-80), bubble: "inspecting 🔍"
- `dog:untether` — releases dog back to cursor chase
- `dog:spin` — triggers 90-frame spin animation
- `dog:backflip` — triggers 120-frame backflip (faster spin)
- `dog:hearts` — activates heart paw trail for 3 seconds
- `dog:footer` — tethers dog to bottom-right with "that's all folks! 🐾" bubble
- `dog:footer:leave` — releases from footer tether
- `dog:latenight` — puts dog in sleepy state when stationary

---

## Custom Hooks

### useTypewriter({ disabled })
Cycles through `ROLES` array with character-by-character type/delete animation at 72ms per char, 2000ms pause at full string. Returns current string. Disabled when `reducedMotion` is true (returns first role statically).

### useReveal()
Sets up a single `IntersectionObserver` (threshold: 0.1) on all `.rv` elements. Adds class `in` when in view. Used for scroll-reveal fade-up animations on section headings and rows.

### useActiveSection()
Listens to scroll events, iterates `SECTIONS = ["home", "projects", "stack", "certs", "about", "contact"]`. Returns whichever section's `offsetTop - 150` the scroll position is past. Used by Navbar to highlight the active link.

### useGimmicks()
Called once in Hero.jsx. Attaches all easter egg event listeners. Also exports `spawnConfetti(colors?)` and `showToast(msg, duration?)` as named exports.

---

## Easter Eggs — Complete List (11 total)

| # | Trigger | Effect | Implementation |
|---|---|---|---|
| 1 | Double-click `KC.` logo (2 clicks in 2000ms) | "You found the developer. Now hire them." modal with Email + LinkedIn CTAs | `logo:click` event → `logoClicks >= 2` → `showSecretMessage()` |
| 2 | Konami code: ↑↑↓↓←→←→BA | Matrix rain mode on background canvas for 5s | `bg:matrix` event → `BackgroundCanvas` |
| 3 | Type `hireme` (anywhere on page, not in input) | Confetti burst + "🎉 You found the easter egg!" toast + dog spin | `spawnConfetti()` + `dog:spin` event |
| 4 | Type `dog` | Dog backflip + "✨ that's me!" toast | `dog:backflip` event |
| 5 | Type `kalyan` | Text glitch effect scrambles all page text for 1s | `triggerGlitch()` |
| 6 | Type `404` | Full-screen fake 404 overlay (click to dismiss, auto-clears in 4s) | `show404()` |
| 7 | Type `rave` | Rainbow accent colour cycling every 180ms for 5s | `triggerRave()` |
| 8 | Triple-click anywhere (3 clicks in 500ms) | Heart paw trail from dog for 3s + "❤️ sending love!" toast | `dog:hearts` event |
| 9 | Visit on July 12 (Kalyan's birthday) | Confetti + "🎂 Happy Birthday Kalyan! 🎉" toast (1200ms delay) | Date check on mount |
| 10 | Visit between 0:00–3:59 AM | Dog wears nightcap and appears sleepy | `dog:latenight` event |
| 11 | Scroll to bottom of page | Dog runs to footer corner with "that's all folks! 🐾" bubble | scroll listener → `dog:footer` event |

**Bonus passive:** 3 seconds after first load (once per session), toast hint: "💡 Hint: try the Konami code — ↑↑↓↓←→←→BA". Stored in `sessionStorage` key `kk-hint` so it only shows once.

**Important implementation detail — `showSecretMessage()` modal:** It uses a plain dark `rgba` overlay (NOT `backdrop-filter`) because `backdrop-filter` creates a new stacking context that would trap the cursor ball (z-index 99999) behind it. The card itself has its own `backdrop-filter` but since the ball is not a child of the card, this is safe.

---

## Custom Event System (window events)

Events dispatched on `window` to decouple components:

| Event | Direction | Payload | Used by |
|---|---|---|---|
| `bg:accent` | Skills/Gimmicks → BackgroundCanvas | `{ detail: { color: [r,g,b] } }` or `{}` to reset | BackgroundCanvas |
| `bg:matrix` | Gimmicks → BackgroundCanvas | none | BackgroundCanvas |
| `dog:tether:skills` | Skills → DogCanvas | none | DogCanvas |
| `dog:tether:projects` | Projects → DogCanvas | none | DogCanvas |
| `dog:untether` | Skills/Projects → DogCanvas | none | DogCanvas |
| `dog:spin` | Gimmicks → DogCanvas | none | DogCanvas |
| `dog:backflip` | Gimmicks → DogCanvas | none | DogCanvas |
| `dog:hearts` | Gimmicks → DogCanvas | none | DogCanvas |
| `dog:footer` | Gimmicks → DogCanvas | none | DogCanvas |
| `dog:footer:leave` | Gimmicks → DogCanvas | none | DogCanvas |
| `dog:latenight` | Gimmicks → DogCanvas | none | DogCanvas |
| `logo:click` | Navbar → Gimmicks | none | useGimmicks (double-click counter) |

---

## Section IDs (for scroll targeting)

| Section | ID | Nav label |
|---|---|---|
| Hero / top | `home` | (logo click) |
| Projects | `projects` | Projects |
| Skills | `stack` | Skills ← note: ID is "stack" not "skills" |
| Certifications | `certs` | Certs |
| About | `about` | About |
| Contact | `contact` | (Hire Me button) |

---

## Deployment

**Netlify config (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The redirect rule ensures the SPA works when users refresh on any route. `npm run build` uses Vite to produce `dist/assets/index-*.js` and `dist/assets/index-*.css`.

**To run locally:**
```bash
npm install
npm run dev     # → http://localhost:5173
npm run build   # → dist/
npm run preview # → preview production build
```

---

## QA & Testing Status (as of April 8, 2026)

Full QA was performed via code analysis. Results: **26/26 features passing (100%)**.

Tested categories:
- Navigation (7 features) ✅
- Hero CTAs (2) ✅
- Project links — GitHub + Live Demo (6) ✅
- Certification card links (3) ✅
- Contact elements — email copy, GitHub, LinkedIn, Email Me (4) ✅
- Footer links (2) ✅
- Easter eggs — secret modal + Konami code (2) ✅

**No broken links detected.** All 15 external URLs validated.

Accessibility status: Respects `prefers-reduced-motion`, touch detection, semantic HTML, keyboard navigation (Escape to close modal), `rel="noopener noreferrer"` on all external links.

---

## Known Patterns & Quirks

1. **Cursor is hidden everywhere** — `cursor: none` is set globally; the custom `#kk-ball` div replaces it. On touch/mobile this is skipped entirely. Do not add `cursor: auto` to any interactive element except in the `@media(hover: none) and (pointer: coarse)` block.

2. **Canvas z-index hierarchy:**
   - BackgroundCanvas: z-index 0
   - DogCanvas: z-index 999998
   - Cursor ball (`#kk-ball`): z-index 99999 (set in App.css)
   - ScrollProgress: z-index 6000
   - Navbar: z-index 5000
   - Secret modal card: z-index 99981 (intentionally below cursor ball)

3. **Skills section ID is `stack`** — the nav label says "Skills" but `document.getElementById("stack")` is what's used. Keep them in sync if ever renaming.

4. **No testing framework installed** — there are no Jest/Vitest/Playwright tests. All QA was manual/code-analysis based. `package.json` has no `test` script.

5. **All styling is inline or in App.css** — there are no `.module.css` files, no Tailwind classes. The design system lives entirely in CSS custom properties in App.css.

6. **`useGimmicks` is called in `Hero.jsx`** — even though its effects are global. This is intentional: Hero is always mounted, so the listeners are always active for the full session.

7. **`spawnConfetti` and `showToast` are named exports** from `useGimmicks.js` — they can be imported independently anywhere without calling the hook.

8. **Light mode on BackgroundCanvas:** When `body.light` class is present, the canvas alpha values are significantly reduced (e.g., `isLt() ? 0.08 : 0.18`) to avoid the background being too heavy on the light cream theme.

---

## Files You Should NOT Edit

- `dist/` — build output, auto-generated
- `node_modules/` — dependencies
- `package-lock.json` — lock file

---

## Common Tasks & Where to Make Changes

| Task | File to edit |
|---|---|
| Change project info (name, desc, links) | `src/data/constants.js` → PROJECTS array |
| Add a new skill | `src/data/constants.js` → SKILLS array (add signal RGB too) |
| Add/remove a certification | `src/data/constants.js` → CERTS array |
| Change personal info (bio, job, location) | `src/components/About.jsx` + `src/data/constants.js` ROLES |
| Change contact email | `src/components/Contact.jsx` (two places: copy button + mailto href) |
| Change accent colour | `src/App.css` → `--accent` and `--accent2` variables |
| Add a new easter egg | `src/hooks/useGimmicks.js` → add to `WORDS` object or add new listener in `useGimmicks()` |
| Add a new section | Create component, add to `App.jsx`, add section ID to `SECTIONS` in `useActiveSection.js`, add nav link to `NAV_LINKS` in `Navbar.jsx` |
| Change dog behaviour | `src/components/DogCanvas.jsx` → `drawDog()` function or the `loop()` animation |
| Change background canvas effects | `src/components/BackgroundCanvas.jsx` → `tick()` function |
